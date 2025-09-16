from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import openai
import os
from dotenv import load_dotenv
import logging

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Database Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///mindcare.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'your-secret-key-here'

db = SQLAlchemy(app)

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# OpenAI API key (you can also use other AI services)
openai.api_key = os.getenv('OPENAI_API_KEY')

# Database Models
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    conversations = db.relationship('Conversation', backref='user', lazy=True)

class Conversation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    message = db.Column(db.Text, nullable=False)
    response = db.Column(db.Text, nullable=False)
    sentiment_score = db.Column(db.Float)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

class MoodEntry(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    mood_level = db.Column(db.Integer, nullable=False)  # 1-10 scale
    mood_description = db.Column(db.String(100))
    notes = db.Column(db.Text)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

# Mental Health Response Templates
MENTAL_HEALTH_PROMPTS = {
    "system": """You are a compassionate AI mental health assistant for MindCare. Your role is to:
    1. Provide emotional support and validation
    2. Offer practical coping strategies
    3. Encourage professional help when needed
    4. Maintain a warm, empathetic tone
    5. Never provide medical diagnoses
    6. Focus on mindfulness, self-care, and positive psychology
    
    Always remember:
    - Listen actively and validate feelings
    - Provide hope and encouragement
    - Suggest healthy coping mechanisms
    - Know your limitations and refer to professionals when appropriate
    """,
    
    "crisis": """If someone expresses thoughts of self-harm or suicide, immediately:
    1. Express care and concern
    2. Encourage them to reach out to crisis helplines
    3. Provide emergency resources
    4. Suggest contacting a trusted person
    """
}

# Crisis keywords for detection
CRISIS_KEYWORDS = ['suicide', 'kill myself', 'end it all', 'self-harm', 'hurt myself', 'no point living']

def detect_crisis(message):
    """Detect if message contains crisis indicators"""
    message_lower = message.lower()
    return any(keyword in message_lower for keyword in CRISIS_KEYWORDS)

def analyze_sentiment(message):
    """Simple sentiment analysis (can be replaced with more sophisticated models)"""
    positive_words = ['happy', 'good', 'great', 'better', 'hopeful', 'grateful', 'thankful']
    negative_words = ['sad', 'depressed', 'anxious', 'worried', 'scared', 'angry', 'hopeless']
    
    message_lower = message.lower()
    positive_count = sum(1 for word in positive_words if word in message_lower)
    negative_count = sum(1 for word in negative_words if word in message_lower)
    
    if positive_count > negative_count:
        return 0.6 + (positive_count * 0.1)
    elif negative_count > positive_count:
        return 0.4 - (negative_count * 0.1)
    else:
        return 0.5

def get_ai_response(message, user_context=None):
    """Generate AI response using OpenAI or fallback responses"""
    try:
        # Check for crisis indicators
        if detect_crisis(message):
            return """I'm really concerned about what you're sharing. Your life has value and there are people who want to help.
            
Please consider reaching out to:
🆘 National Suicide Prevention Lifeline: 988
🆘 Crisis Text Line: Text HOME to 741741
🆘 International Association for Suicide Prevention: https://www.iasp.info/resources/Crisis_Centres/

You don't have to go through this alone. Would you like to talk about what's making you feel this way?"""

        # Use OpenAI API if available
        if openai.api_key:
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": MENTAL_HEALTH_PROMPTS["system"]},
                    {"role": "user", "content": message}
                ],
                max_tokens=300,
                temperature=0.7
            )
            return response.choices[0].message.content
        
        # Fallback responses for common mental health topics
        else:
            return get_fallback_response(message)
    
    except Exception as e:
        logger.error(f"Error generating AI response: {str(e)}")
        return get_fallback_response(message)

def get_fallback_response(message):
    """Provide fallback responses when AI service is unavailable"""
    message_lower = message.lower()
    
    if any(word in message_lower for word in ['anxious', 'anxiety', 'worried']):
        return """I understand you're feeling anxious. Here are some techniques that might help:
        
🌬️ **Deep Breathing**: Try the 4-7-8 technique - inhale for 4, hold for 7, exhale for 8
🧘 **Mindfulness**: Focus on your present surroundings using your 5 senses
📝 **Write it down**: Sometimes putting worries on paper helps organize thoughts
🚶 **Movement**: Even a short walk can help reduce anxiety

Would you like to try one of these techniques together?"""
    
    elif any(word in message_lower for word in ['sad', 'depressed', 'down']):
        return """I hear that you're feeling down, and I want you to know that your feelings are valid. Depression can feel overwhelming, but you're not alone.
        
Some gentle suggestions:
💡 **Small steps**: Try one tiny positive action today
🤗 **Reach out**: Connect with someone you trust
☀️ **Light and nature**: Spend a few minutes outside if possible
💤 **Rest**: Make sure you're getting adequate sleep

Remember, it's okay to not be okay. Have you considered speaking with a mental health professional?"""
    
    elif any(word in message_lower for word in ['stressed', 'overwhelmed']):
        return """Feeling overwhelmed is a sign that you're carrying a lot right now. Let's work on breaking things down:
        
🎯 **Prioritize**: What's the most important thing today?
⏰ **Break it down**: Divide big tasks into smaller, manageable steps
🛑 **Pause**: Take regular breaks to breathe and reset
🙅 **Boundaries**: It's okay to say no to additional commitments

What's one small thing you could do right now to feel a bit more in control?"""
    
    else:
        return """Thank you for sharing with me. I'm here to listen and support you. Everyone faces challenges, and reaching out shows strength.
        
How are you feeling right now? I'm here to help you work through whatever you're experiencing. Remember:
- Your feelings are valid
- You're not alone in this
- Small steps forward still count as progress
- It's okay to ask for help

What would be most helpful for you today?"""

# API Routes
@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({"status": "healthy", "message": "MindCare AI Backend is running"})

@app.route('/api/chat', methods=['POST'])
def chat():
    """Main chat endpoint"""
    try:
        data = request.json
        message = data.get('message', '').strip()
        user_id = data.get('user_id')
        
        if not message:
            return jsonify({"error": "Message is required"}), 400
        
        # Analyze sentiment
        sentiment = analyze_sentiment(message)
        
        # Generate AI response
        response = get_ai_response(message)
        
        # Save conversation to database if user_id provided
        if user_id:
            try:
                conversation = Conversation(
                    user_id=user_id,
                    message=message,
                    response=response,
                    sentiment_score=sentiment
                )
                db.session.add(conversation)
                db.session.commit()
            except Exception as e:
                logger.error(f"Error saving conversation: {str(e)}")
        
        return jsonify({
            "response": response,
            "sentiment": sentiment,
            "timestamp": datetime.utcnow().isoformat(),
            "is_crisis": detect_crisis(message)
        })
    
    except Exception as e:
        logger.error(f"Error in chat endpoint: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500

@app.route('/api/mood', methods=['POST'])
def log_mood():
    """Endpoint to log user mood"""
    try:
        data = request.json
        user_id = data.get('user_id')
        mood_level = data.get('mood_level')
        mood_description = data.get('mood_description', '')
        notes = data.get('notes', '')
        
        if not user_id or mood_level is None:
            return jsonify({"error": "user_id and mood_level are required"}), 400
        
        mood_entry = MoodEntry(
            user_id=user_id,
            mood_level=mood_level,
            mood_description=mood_description,
            notes=notes
        )
        
        db.session.add(mood_entry)
        db.session.commit()
        
        return jsonify({"message": "Mood logged successfully", "id": mood_entry.id})
    
    except Exception as e:
        logger.error(f"Error logging mood: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500

@app.route('/api/mood-history/<int:user_id>', methods=['GET'])
def get_mood_history(user_id):
    """Get user's mood history"""
    try:
        moods = MoodEntry.query.filter_by(user_id=user_id).order_by(MoodEntry.timestamp.desc()).limit(30).all()
        
        mood_data = [{
            "id": mood.id,
            "mood_level": mood.mood_level,
            "mood_description": mood.mood_description,
            "notes": mood.notes,
            "timestamp": mood.timestamp.isoformat()
        } for mood in moods]
        
        return jsonify(mood_data)
    
    except Exception as e:
        logger.error(f"Error retrieving mood history: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500

@app.route('/api/conversation-history/<int:user_id>', methods=['GET'])
def get_conversation_history(user_id):
    """Get user's conversation history"""
    try:
        conversations = Conversation.query.filter_by(user_id=user_id).order_by(Conversation.timestamp.desc()).limit(20).all()
        
        conversation_data = [{
            "id": conv.id,
            "message": conv.message,
            "response": conv.response,
            "sentiment_score": conv.sentiment_score,
            "timestamp": conv.timestamp.isoformat()
        } for conv in conversations]
        
        return jsonify(conversation_data)
    
    except Exception as e:
        logger.error(f"Error retrieving conversation history: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500

@app.route('/api/resources', methods=['GET'])
def get_resources():
    """Get mental health resources"""
    resources = {
        "crisis_hotlines": [
            {"name": "National Suicide Prevention Lifeline", "number": "988", "available": "24/7"},
            {"name": "Crisis Text Line", "contact": "Text HOME to 741741", "available": "24/7"},
            {"name": "SAMHSA National Helpline", "number": "1-800-662-4357", "available": "24/7"}
        ],
        "coping_techniques": [
            {
                "name": "Deep Breathing",
                "description": "4-7-8 breathing technique for anxiety relief",
                "steps": ["Inhale for 4 counts", "Hold for 7 counts", "Exhale for 8 counts", "Repeat 3-4 times"]
            },
            {
                "name": "Grounding Exercise",
                "description": "5-4-3-2-1 technique to stay present",
                "steps": ["5 things you can see", "4 things you can touch", "3 things you can hear", "2 things you can smell", "1 thing you can taste"]
            },
            {
                "name": "Progressive Muscle Relaxation",
                "description": "Systematically tense and relax muscle groups",
                "steps": ["Start with toes", "Tense for 5 seconds", "Release and relax", "Move up through body"]
            }
        ],
        "self_care_tips": [
            "Maintain a regular sleep schedule",
            "Stay hydrated and eat nutritious meals",
            "Engage in regular physical activity",
            "Practice mindfulness or meditation",
            "Connect with supportive friends and family",
            "Limit social media and news consumption",
            "Engage in hobbies you enjoy",
            "Consider journaling your thoughts and feelings"
        ]
    }
    
    return jsonify(resources)

# Initialize database
@app.before_first_request
def create_tables():
    db.create_all()

if __name__ == '__main__':
    # Create tables
    with app.app_context():
        db.create_all()
    
    # Run the app
    app.run(debug=True, host='0.0.0.0', port=5000)