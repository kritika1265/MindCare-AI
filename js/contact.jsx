import React, { useState } from 'react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    category: 'general',
    message: '',
    urgent: false
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      alert('Please fill in all required fields.');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          category: 'general',
          message: '',
          urgent: false
        });
      }, 3000);
    }, 1500);
  };

  const contactMethods = [
    {
      icon: 'fas fa-headset',
      title: '24/7 AI Support',
      description: 'Instant mental health assistance through our AI chatbot',
      action: 'Chat Now',
      color: 'from-blue-500 to-purple-600'
    },
    {
      icon: 'fas fa-phone',
      title: 'Crisis Hotline',
      description: 'Immediate help for mental health emergencies',
      action: 'Call: 988',
      color: 'from-red-500 to-pink-600'
    },
    {
      icon: 'fas fa-envelope',
      title: 'Email Support',
      description: 'Get detailed responses within 24 hours',
      action: 'support@mindcareai.edu',
      color: 'from-green-500 to-teal-600'
    },
    {
      icon: 'fas fa-calendar',
      title: 'Book Appointment',
      description: 'Schedule with licensed mental health professionals',
      action: 'Schedule Now',
      color: 'from-orange-500 to-yellow-600'
    }
  ];

  const emergencyResources = [
    { name: 'National Suicide Prevention Lifeline', number: '988', available: '24/7' },
    { name: 'Crisis Text Line', number: 'Text HOME to 741741', available: '24/7' },
    { name: 'Campus Counseling Center', number: '(555) 123-HELP', available: 'Mon-Fri 8AM-8PM' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <nav className="bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <i className="fas fa-brain text-yellow-300 text-2xl"></i>
              <span className="text-white text-xl font-bold">MindCare AI</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <button className="text-white hover:text-yellow-300 transition-colors">Home</button>
              <button className="text-white hover:text-yellow-300 transition-colors">Features</button>
              <button className="text-white hover:text-yellow-300 transition-colors">AI Assistant</button>
              <button className="text-white hover:text-yellow-300 transition-colors">About</button>
              <button className="text-white hover:text-yellow-300 transition-colors">Resources</button>
              <button className="text-yellow-300 font-semibold">Contact</button>
            </div>
            <div className="flex space-x-4">
              <button className="text-white border border-white px-4 py-2 rounded-full hover:bg-white hover:text-purple-600 transition-all">
                Login
              </button>
              <button className="bg-white text-purple-600 px-4 py-2 rounded-full hover:bg-yellow-300 transition-all">
                Register
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="mb-6">
            <span className="bg-white bg-opacity-20 text-white px-4 py-2 rounded-full text-sm font-medium">
              <i className="fas fa-heart mr-2"></i>
              We're Here to Help
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Get the Support You Need
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Whether you need immediate crisis support or want to learn more about our AI-powered mental health platform, 
            our team is available 24/7 to assist you.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all transform hover:scale-105">
              <i className="fas fa-exclamation-triangle mr-2"></i>
              Crisis Support
            </button>
            <button className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all">
              <i className="fas fa-comments mr-2"></i>
              Start AI Chat
            </button>
          </div>
        </div>
      </div>

      {/* Emergency Notice */}
      <div className="bg-red-50 border-l-4 border-red-500 p-6 mx-4 my-8 rounded-r-lg">
        <div className="flex items-center">
          <i className="fas fa-exclamation-circle text-red-500 text-2xl mr-4"></i>
          <div>
            <h3 className="text-red-800 font-semibold text-lg">In a Mental Health Crisis?</h3>
            <p className="text-red-700">
              If you're experiencing thoughts of self-harm or suicide, please reach out for immediate help. 
              Call <span className="font-bold underline cursor-pointer" onClick={() => window.open('tel:988')}>988</span> for the Suicide & Crisis Lifeline or visit your nearest emergency room.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Methods */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">How Can We Help You?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the support method that works best for your situation
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {contactMethods.map((method, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2">
              <div className={`w-16 h-16 bg-gradient-to-r ${method.color} rounded-2xl flex items-center justify-center mb-6 mx-auto`}>
                <i className={`${method.icon} text-white text-2xl`}></i>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">{method.title}</h3>
              <p className="text-gray-600 mb-6 text-center">{method.description}</p>
              <button 
                className={`w-full bg-gradient-to-r ${method.color} text-white py-3 rounded-full font-semibold hover:opacity-90 transition-all`}
                onClick={() => {
                  if (method.title === 'Crisis Hotline') {
                    window.open('tel:988');
                  } else if (method.title === 'Email Support') {
                    window.open('mailto:support@mindcareai.edu');
                  } else {
                    alert(`${method.title}: This feature will be available in the full application.`);
                  }
                }}
              >
                {method.action}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Form */}
      <div className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Send Us a Message</h2>
            <p className="text-xl text-gray-600">
              Fill out the form below and we'll get back to you within 24 hours
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-3xl p-8 shadow-lg">
            {!isSubmitted ? (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      <i className="fas fa-user mr-2"></i>Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      <i className="fas fa-envelope mr-2"></i>Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder="your.email@university.edu"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      <i className="fas fa-phone mr-2"></i>Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      <i className="fas fa-tags mr-2"></i>Category *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="support">Technical Support</option>
                      <option value="mental-health">Mental Health Resources</option>
                      <option value="crisis">Crisis Support</option>
                      <option value="feedback">Feedback</option>
                      <option value="partnership">Partnership</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    <i className="fas fa-subject mr-2"></i>Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="Brief description of your inquiry"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    <i className="fas fa-comment-alt mr-2"></i>Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                    placeholder="Please provide details about your inquiry. If this is a crisis situation, please call 988 immediately."
                  ></textarea>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="urgent"
                    checked={formData.urgent}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
                  />
                  <label className="ml-3 text-gray-700 font-semibold cursor-pointer" onClick={() => setFormData(prev => ({ ...prev, urgent: !prev.urgent }))}>
                    <i className="fas fa-exclamation-triangle text-orange-500 mr-2"></i>
                    This is urgent and requires immediate attention
                  </label>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <i className="fas fa-spinner animate-spin mr-2"></i>
                      Sending Message...
                    </span>
                  ) : (
                    <span>
                      <i className="fas fa-paper-plane mr-2"></i>
                      Send Message
                    </span>
                  )}
                </button>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="fas fa-check text-white text-3xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Message Sent Successfully!</h3>
                <p className="text-gray-600 mb-6">
                  Thank you for reaching out. We'll respond to your message within 24 hours.
                  {formData.urgent && (
                    <span className="block mt-2 text-orange-600 font-semibold">
                      Since you marked this as urgent, we'll prioritize your request.
                    </span>
                  )}
                </p>
                <div className="bg-blue-50 rounded-xl p-4 text-blue-800">
                  <i className="fas fa-info-circle mr-2"></i>
                  If you need immediate support, please use our 24/7 AI chat or call our crisis hotline.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Emergency Resources */}
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Emergency Resources</h2>
            <p className="text-xl text-gray-300">
              If you're in crisis, help is available immediately
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {emergencyResources.map((resource, index) => (
              <div key={index} className="bg-gray-800 rounded-2xl p-8 text-center hover:bg-gray-700 transition-colors cursor-pointer"
                   onClick={() => {
                     if (resource.number.includes('988')) {
                       window.open('tel:988');
                     } else if (resource.number.includes('741741')) {
                       window.open('sms:741741?body=HOME');
                     } else if (resource.number.includes('555')) {
                       window.open('tel:555-123-4357');
                     }
                   }}>
                <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="fas fa-phone text-white text-2xl"></i>
                </div>
                <h3 className="text-xl font-bold mb-3">{resource.name}</h3>
                <p className="text-2xl font-bold text-red-400 mb-2">{resource.number}</p>
                <p className="text-gray-400">Available {resource.available}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <i className="fas fa-brain text-yellow-400 text-2xl"></i>
                <span className="text-xl font-bold">MindCare AI</span>
              </div>
              <p className="text-gray-400 mb-4">
                Revolutionizing student mental health support through advanced artificial intelligence.
              </p>
              <div className="flex space-x-4">
                <button className="text-gray-400 hover:text-purple-400 text-xl">
                  <i className="fab fa-facebook"></i>
                </button>
                <button className="text-gray-400 hover:text-purple-400 text-xl">
                  <i className="fab fa-twitter"></i>
                </button>
                <button className="text-gray-400 hover:text-purple-400 text-xl">
                  <i className="fab fa-linkedin"></i>
                </button>
                <button className="text-gray-400 hover:text-purple-400 text-xl">
                  <i className="fab fa-instagram"></i>
                </button>
              </div>
            </div>
            <div>
              <h3 className="font-bold mb-4">Platform Access</h3>
              <div className="space-y-2">
                <button className="block text-gray-400 hover:text-white transition-colors">Student Login</button>
                <button className="block text-gray-400 hover:text-white transition-colors">Create Account</button>
                <button className="block text-gray-400 hover:text-white transition-colors">Admin Portal</button>
                <button className="block text-gray-400 hover:text-white transition-colors">Mobile App</button>
              </div>
            </div>
            <div>
              <h3 className="font-bold mb-4">AI Features</h3>
              <div className="space-y-2">
                <button className="block text-gray-400 hover:text-white transition-colors">AI Assistant</button>
                <button className="block text-gray-400 hover:text-white transition-colors">Smart Assessment</button>
                <button className="block text-gray-400 hover:text-white transition-colors">Mood Analytics</button>
                <button className="block text-gray-400 hover:text-white transition-colors">Crisis Detection</button>
              </div>
            </div>
            <div>
              <h3 className="font-bold mb-4">Support</h3>
              <div className="space-y-2">
                <button className="block text-gray-400 hover:text-white transition-colors">Help Center</button>
                <button className="block text-gray-400 hover:text-white transition-colors" onClick={() => window.open('tel:988')}>Crisis Hotline: 988</button>
                <button className="block text-gray-400 hover:text-white transition-colors">Resource Library</button>
                <button className="block text-gray-400 hover:text-white transition-colors" onClick={() => window.open('mailto:support@mindcareai.edu')}>Email Support</button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2025 MindCare AI. All rights reserved. | HIPAA Compliant • End-to-End Encrypted • 24/7 AI Support</p>
          </div>
        </div>
      </footer>

      {/* Floating AI Chat Button */}
      <button 
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-110 z-50 animate-pulse"
        onClick={() => alert('AI Chat: Connecting you to our 24/7 mental health support assistant...')}
      >
        <i className="fas fa-comments text-xl"></i>
      </button>
    </div>
  );
};
export default ContactPage;
