import React, { useState, useEffect } from 'react';

const ResourcesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredResources, setFilteredResources] = useState([]);

  const resources = [
    {
      id: 1,
      title: "24/7 Crisis Support Hotlines",
      category: "crisis",
      type: "Emergency Support",
      description: "Immediate professional help available around the clock for mental health emergencies and crisis situations.",
      content: [
        "National Suicide Prevention Lifeline: 988",
        "Crisis Text Line: Text HOME to 741741",
        "National Sexual Assault Hotline: 1-800-656-HOPE (4673)",
        "LGBTQ National Hotline: 1-888-843-4564",
        "Student Mental Health Crisis Line: 1-800-273-8255"
      ],
      icon: "fas fa-phone-alt",
      color: "#FF6B6B",
      urgent: true
    },
    {
      id: 2,
      title: "Stress Management Techniques",
      category: "coping",
      type: "Self-Help Guide",
      description: "Evidence-based techniques to help manage academic stress, anxiety, and daily pressures effectively.",
      content: [
        "Deep breathing exercises (4-7-8 technique)",
        "Progressive muscle relaxation",
        "Mindfulness meditation practices",
        "Time management strategies",
        "Study break scheduling",
        "Physical exercise routines"
      ],
      icon: "fas fa-leaf",
      color: "#4ECDC4"
    },
    {
      id: 3,
      title: "Anxiety & Depression Resources",
      category: "conditions",
      type: "Educational Material",
      description: "Comprehensive information about common mental health conditions affecting students and available treatments.",
      content: [
        "Understanding anxiety disorders",
        "Recognizing depression symptoms",
        "Cognitive Behavioral Therapy (CBT) basics",
        "Medication information and side effects",
        "Campus counseling services directory",
        "Peer support group locations"
      ],
      icon: "fas fa-heart",
      color: "#667eea"
    },
    {
      id: 4,
      title: "Academic Success & Mental Health",
      category: "academic",
      type: "Study Guide",
      description: "Strategies to maintain mental wellness while achieving academic goals and managing coursework pressure.",
      content: [
        "Balanced study schedules",
        "Exam anxiety management",
        "Perfectionism vs. healthy achievement",
        "Academic accommodation services",
        "Study group mental health tips",
        "Grade-related stress reduction"
      ],
      icon: "fas fa-graduation-cap",
      color: "#45B7D1"
    },
    {
      id: 5,
      title: "Sleep & Mental Health",
      category: "wellness",
      type: "Health Guide",
      description: "Understanding the critical connection between quality sleep and mental wellness for students.",
      content: [
        "Sleep hygiene fundamentals",
        "Creating optimal sleep environment",
        "Managing screen time before bed",
        "Dealing with racing thoughts at night",
        "Power napping strategies",
        "Sleep disorder recognition"
      ],
      icon: "fas fa-moon",
      color: "#9B59B6"
    },
    {
      id: 6,
      title: "Building Social Connections",
      category: "social",
      type: "Relationship Guide",
      description: "Tips for developing healthy relationships and combating loneliness in academic environments.",
      content: [
        "Overcoming social anxiety",
        "Joining clubs and organizations",
        "Building meaningful friendships",
        "Healthy relationship boundaries",
        "Dealing with peer pressure",
        "Supporting friends in crisis"
      ],
      icon: "fas fa-users",
      color: "#F39C12"
    },
    {
      id: 7,
      title: "Mindfulness & Meditation",
      category: "wellness",
      type: "Practice Guide",
      description: "Guided practices and techniques for developing mindfulness skills and emotional regulation.",
      content: [
        "5-minute daily meditation routine",
        "Mindful breathing exercises",
        "Body scan relaxation",
        "Mindful walking techniques",
        "Emotional awareness practices",
        "Apps and online resources"
      ],
      icon: "fas fa-spa",
      color: "#2ECC71"
    },
    {
      id: 8,
      title: "Financial Stress Management",
      category: "practical",
      type: "Life Skills",
      description: "Resources for managing financial pressures that commonly affect student mental health.",
      content: [
        "Budgeting for students",
        "Financial aid counseling",
        "Emergency financial assistance",
        "Part-time work balance",
        "Student loan anxiety management",
        "Free campus resources"
      ],
      icon: "fas fa-dollar-sign",
      color: "#E67E22"
    }
  ];

  const categories = [
    { id: 'all', name: 'All Resources', icon: 'fas fa-th-large' },
    { id: 'crisis', name: 'Crisis Support', icon: 'fas fa-exclamation-triangle' },
    { id: 'coping', name: 'Coping Strategies', icon: 'fas fa-tools' },
    { id: 'conditions', name: 'Mental Health Conditions', icon: 'fas fa-brain' },
    { id: 'academic', name: 'Academic Support', icon: 'fas fa-book' },
    { id: 'wellness', name: 'Wellness & Self-Care', icon: 'fas fa-heart' },
    { id: 'social', name: 'Social Support', icon: 'fas fa-users' },
    { id: 'practical', name: 'Practical Life Skills', icon: 'fas fa-life-ring' }
  ];

  useEffect(() => {
    let filtered = resources;
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(resource => resource.category === selectedCategory);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(resource => 
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.content.some(item => item.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    setFilteredResources(filtered);
  }, [selectedCategory, searchTerm]);

  const ResourceCard = ({ resource }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
      <div className={`resource-card ${resource.urgent ? 'urgent' : ''}`}>
        <div className="resource-header">
          <div 
            className="resource-icon" 
            style={{ backgroundColor: resource.color }}
          >
            <i className={resource.icon}></i>
          </div>
          <div className="resource-meta">
            <h3>{resource.title}</h3>
            <span className="resource-type">{resource.type}</span>
            {resource.urgent && (
              <span className="urgent-badge">
                <i className="fas fa-exclamation-circle"></i>
                Immediate Help
              </span>
            )}
          </div>
        </div>
        
        <p className="resource-description">{resource.description}</p>
        
        <button 
          className="expand-btn"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <i className={`fas fa-chevron-${isExpanded ? 'up' : 'down'}`}></i>
          {isExpanded ? 'Show Less' : 'View Details'}
        </button>
        
        {isExpanded && (
          <div className="resource-content">
            <ul>
              {resource.content.map((item, index) => (
                <li key={index}>
                  <i className="fas fa-check-circle"></i>
                  {item}
                </li>
              ))}
            </ul>
            {resource.urgent && (
              <div className="crisis-note">
                <i className="fas fa-info-circle"></i>
                <strong>Remember:</strong> If you're in immediate danger, call 911 or go to your nearest emergency room.
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', lineHeight: 1.6, color: '#333' }}>
      {/* Header */}
      <header style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #6B73FF 100%)',
        color: 'white',
        padding: '1rem 0',
        position: 'relative'
      }}>
        <nav style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 2rem'
        }}>
          <a href="#" style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: '2.2rem',
            fontWeight: '800',
            color: 'white',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <i className="fas fa-brain" style={{ fontSize: '2rem', color: '#FFD700' }}></i>
            MindCare AI
          </a>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <div style={{ display: 'flex', gap: '2rem' }}>
              <a href="#" style={{ color: 'white', textDecoration: 'none', fontWeight: '500' }}>Features</a>
              <a href="#" style={{ color: 'white', textDecoration: 'none', fontWeight: '500' }}>AI Assistant</a>
              <a href="#" style={{ color: 'white', textDecoration: 'none', fontWeight: '500' }}>About</a>
              <a href="#" style={{ color: 'white', textDecoration: 'none', fontWeight: '500', borderBottom: '2px solid #FFD700' }}>Resources</a>
              <a href="#" style={{ color: 'white', textDecoration: 'none', fontWeight: '500' }}>Contact</a>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '4rem 0',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.2)',
            padding: '0.5rem 1rem',
            borderRadius: '25px',
            display: 'inline-block',
            marginBottom: '1.5rem',
            backdropFilter: 'blur(10px)'
          }}>
            <i className="fas fa-book-medical" style={{ marginRight: '0.5rem' }}></i>
            Mental Health Resource Library
          </div>
          
          <h1 style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: '3.5rem',
            fontWeight: '800',
            marginBottom: '1.5rem',
            lineHeight: '1.2'
          }}>
            Your Complete Mental Wellness Toolkit
          </h1>
          
          <p style={{
            fontSize: '1.2rem',
            opacity: '0.9',
            lineHeight: '1.7',
            marginBottom: '2rem'
          }}>
            Access evidence-based resources, emergency support, and practical tools designed specifically for student mental health and wellbeing.
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section style={{
        background: '#f8f9ff',
        padding: '3rem 0',
        borderBottom: '1px solid #e6f0ff'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
            <input
              type="text"
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                maxWidth: '500px',
                padding: '1rem 1.5rem',
                borderRadius: '50px',
                border: '2px solid #e6f0ff',
                fontSize: '1.1rem',
                outline: 'none',
                transition: 'border-color 0.3s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e6f0ff'}
            />
          </div>
          
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.5rem',
            justifyContent: 'center'
          }}>
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                style={{
                  padding: '0.7rem 1.5rem',
                  border: 'none',
                  borderRadius: '25px',
                  background: selectedCategory === category.id 
                    ? 'linear-gradient(135deg, #667eea, #764ba2)' 
                    : 'white',
                  color: selectedCategory === category.id ? 'white' : '#667eea',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontWeight: '600',
                  fontSize: '0.9rem',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                }}
                onMouseEnter={(e) => {
                  if (selectedCategory !== category.id) {
                    e.target.style.background = '#f0f4ff';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedCategory !== category.id) {
                    e.target.style.background = 'white';
                  }
                }}
              >
                <i className={category.icon} style={{ marginRight: '0.5rem' }}></i>
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section style={{ padding: '4rem 0', background: '#ffffff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          {filteredResources.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 0', color: '#666' }}>
              <i className="fas fa-search" style={{ fontSize: '3rem', marginBottom: '1rem', opacity: '0.3' }}></i>
              <h3>No resources found</h3>
              <p>Try adjusting your search terms or category filter.</p>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
              gap: '2rem'
            }}>
              {filteredResources.map(resource => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Emergency Notice */}
      <section style={{
        background: 'linear-gradient(135deg, #FF6B6B, #FF8E8E)',
        color: 'white',
        padding: '3rem 0',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 2rem' }}>
          <i className="fas fa-exclamation-triangle" style={{ fontSize: '3rem', marginBottom: '1rem' }}></i>
          <h2 style={{ fontFamily: 'Poppins, sans-serif', marginBottom: '1rem' }}>
            In Crisis? Get Immediate Help
          </h2>
          <p style={{ fontSize: '1.2rem', marginBottom: '2rem', opacity: '0.9' }}>
            If you're experiencing thoughts of self-harm or suicide, please reach out for help immediately.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
            <a href="tel:988" style={{
              background: 'white',
              color: '#FF6B6B',
              padding: '1rem 2rem',
              borderRadius: '50px',
              textDecoration: 'none',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
            }}>
              <i className="fas fa-phone"></i>
              Call 988 - Suicide & Crisis Lifeline
            </a>
            <a href="sms:741741&body=HOME" style={{
              background: 'rgba(255,255,255,0.2)',
              color: 'white',
              padding: '1rem 2rem',
              borderRadius: '50px',
              textDecoration: 'none',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              border: '2px solid white'
            }}>
              <i className="fas fa-comment"></i>
              Text HOME to 741741
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        background: '#1a1a1a',
        color: 'white',
        padding: '4rem 0 2rem'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '3rem',
            marginBottom: '3rem'
          }}>
            <div>
              <h3 style={{
                fontFamily: 'Poppins, sans-serif',
                marginBottom: '1.5rem',
                color: '#667eea',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <i className="fas fa-brain" style={{ color: '#FFD700' }}></i>
                MindCare AI
              </h3>
              <p style={{ marginBottom: '1.5rem', lineHeight: '1.7', color: '#ccc' }}>
                Revolutionizing student mental health support through advanced artificial intelligence, providing personalized care and professional connections when you need them most.
              </p>
            </div>
            
            <div>
              <h3 style={{ fontFamily: 'Poppins, sans-serif', marginBottom: '1.5rem', color: '#667eea' }}>
                Quick Access
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <a href="#" style={{ color: '#ccc', textDecoration: 'none' }}>Crisis Support Resources</a>
                <a href="#" style={{ color: '#ccc', textDecoration: 'none' }}>AI Mental Health Assistant</a>
                <a href="#" style={{ color: '#ccc', textDecoration: 'none' }}>Student Counseling Services</a>
                <a href="#" style={{ color: '#ccc', textDecoration: 'none' }}>Wellness Tools & Guides</a>
              </div>
            </div>
          </div>
          
          <div style={{
            textAlign: 'center',
            paddingTop: '2rem',
            borderTop: '1px solid #333',
            color: '#888'
          }}>
            <p>&copy; 2025 MindCare AI. All rights reserved. | Privacy Policy | Terms of Service</p>
            <p style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>
              <i className="fas fa-shield-alt" style={{ color: '#4CAF50', marginRight: '0.5rem' }}></i>
              HIPAA Compliant • End-to-End Encrypted • 24/7 AI Support
            </p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .resource-card {
          background: white;
          border-radius: 20px;
          padding: 2rem;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
          border: 1px solid rgba(102, 126, 234, 0.1);
          position: relative;
          overflow: hidden;
        }

        .resource-card.urgent {
          border-left: 5px solid #FF6B6B;
          background: linear-gradient(135deg, #fff5f5 0%, #ffffff 100%);
        }

        .resource-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(102, 126, 234, 0.15);
        }

        .resource-header {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .resource-icon {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.5rem;
          flex-shrink: 0;
        }

        .resource-meta h3 {
          font-family: 'Poppins', sans-serif;
          font-size: 1.4rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: #333;
        }

        .resource-type {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          padding: 0.3rem 0.8rem;
          border-radius: 15px;
          font-size: 0.8rem;
          font-weight: 600;
          display: inline-block;
        }

        .urgent-badge {
          background: #FF6B6B;
          color: white;
          padding: 0.3rem 0.8rem;
          border-radius: 15px;
          font-size: 0.8rem;
          font-weight: 600;
          display: inline-block;
          margin-left: 0.5rem;
          animation: pulse 2s infinite;
        }

        .resource-description {
          color: #666;
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .expand-btn {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          border: none;
          padding: 0.8rem 1.5rem;
          border-radius: 25px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .expand-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
        }

        .resource-content {
          border-top: 2px solid #f0f4ff;
          padding-top: 1.5rem;
          animation: slideDown 0.3s ease-out;
        }

        .resource-content ul {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .resource-content li {
          display: flex;
          align-items: flex-start;
          gap: 0.8rem;
          margin-bottom: 1rem;
          padding: 0.5rem;
          border-radius: 8px;
          transition: background 0.2s ease;
        }

        .resource-content li:hover {
          background: #f8f9ff;
        }

        .resource-content li i {
          color: #4CAF50;
          margin-top: 0.2rem;
          flex-shrink: 0;
        }

        .crisis-note {
          background: linear-gradient(135deg, #FFE5E5, #FFF0F0);
          border: 2px solid #FF6B6B;
          border-radius: 10px;
          padding: 1rem;
          margin-top: 1.5rem;
          color: #D32F2F;
        }

        .crisis-note i {
          margin-right: 0.5rem;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }

        @media (max-width: 768px) {
          .resource-card {
            padding: 1.5rem;
          }
          
          .resource-header {
            flex-direction: column;
            text-align: center;
            gap: 1rem;
          }
          
          .resource-meta h3 {
            font-size: 1.2rem;
          }
        }
      `}</style>
    </div>
  );
};
export default ResourcesPage;
