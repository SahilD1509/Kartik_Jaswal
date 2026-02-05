import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const particlesRef = useRef(null);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Update active section based on scroll position
      const sections = ['home', 'about', 'education', 'subjects', 'interests', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Loading screen
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };



  if (isLoading) {
    return (
      <div className="loader">
        <div className="loader-content">
          <div className="loader-spinner"></div>
          <h2>Loading Portfolio...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      {/* Animated Background */}
      <div className="animated-background"></div>
      
      {/* Floating Particles Background */}
      <div className="particles-container" ref={particlesRef}>
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="floating-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${Math.random() * 10 + 15}s`
            }}
          ></div>
        ))}
      </div>

      {/* Navigation */}
      <nav className={`navbar ${scrollY > 50 ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="logo">
            <span className="logo-text">KJ</span>
            <span className="logo-subtitle">Portfolio</span>
          </div>
          
          <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <a 
              href="#home" 
              className={activeSection === 'home' ? 'active' : ''} 
              onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}
            >
              Home
            </a>
            <a 
              href="#about" 
              className={activeSection === 'about' ? 'active' : ''} 
              onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}
            >
              About
            </a>
            <a 
              href="#education" 
              className={activeSection === 'education' ? 'active' : ''} 
              onClick={(e) => { e.preventDefault(); scrollToSection('education'); }}
            >
              Education
            </a>
            <a 
              href="#subjects" 
              className={activeSection === 'subjects' ? 'active' : ''} 
              onClick={(e) => { e.preventDefault(); scrollToSection('subjects'); }}
            >
              Subjects
            </a>
            <a 
              href="#interests" 
              className={activeSection === 'interests' ? 'active' : ''} 
              onClick={(e) => { e.preventDefault(); scrollToSection('interests'); }}
            >
              Interests
            </a>
            <a 
              href="#contact" 
              className={activeSection === 'contact' ? 'active' : ''} 
              onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}
            >
              Contact
            </a>
          </div>

          <div className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                <span className="greeting">Hello, I'm</span>
                <span className="name">Kartik Jaswal</span>
              </h1>
              <h2 className="hero-subtitle">Arts Stream Student | Class 12</h2>
              <p className="hero-description">
                A passionate learner with strong analytical skills, creative thinking, and a deep 
                interest in humanities, technology, and automotive innovation. Currently pursuing 
                senior secondary education while exploring diverse interests from anime to automobiles.
              </p>
              
              <div className="hero-stats">
                <div className="stat-item">
                  <span className="stat-number">91%</span>
                  <span className="stat-label">Class 10 Marks</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">5</span>
                  <span className="stat-label">Core Subjects</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">12</span>
                  <span className="stat-label">Current Class</span>
                </div>
              </div>

              <div className="cta-buttons">
                <button className="btn btn-primary" onClick={() => scrollToSection('contact')}>
                  <span>Get in Touch</span>
                  <span className="btn-icon">→</span>
                </button>
                <button className="btn btn-secondary" onClick={() => scrollToSection('about')}>
                  <span>Learn More</span>
                  <span className="btn-icon">↓</span>
                </button>
              </div>
            </div>

            <div className="hero-visual">
              <div className="profile-card">
                <div className="profile-image-container">
                  <img 
                    src="/profile.jpg" 
                    alt="Kartik Jaswal" 
                    className="profile-image"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = '<div class="profile-placeholder">KJ</div>';
                    }}
                  />
                  <div className="profile-ring"></div>
                  <div className="profile-ring-2"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="scroll-indicator" onClick={() => scrollToSection('about')}>
            <span className="scroll-text">Scroll Down</span>
            <div className="scroll-arrow">↓</div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">About Me</h2>
            <p className="section-subtitle">Discover my journey, values, and what drives me forward</p>
          </div>

          <div className="about-grid">
            <div className="about-card" data-aos="fade-up">
              <div className="card-icon">🎓</div>
              <h3 className="card-title">Academic Excellence</h3>
              <p className="card-description">
                Achieved 91% in Class 10 with First Division from Sait Rudraksh Convent School, Barot. 
                Currently excelling in Arts stream at Government Senior Secondary School, Barot, with 
                subjects including History, Political Science, English, Sanskrit, and Computer Studies. 
                My dedication to academics reflects in my consistent performance and growing knowledge base.
              </p>
              <div className="card-glow"></div>
            </div>

            <div className="about-card" data-aos="fade-up" data-aos-delay="100">
              <div className="card-icon">💡</div>
              <h3 className="card-title">Curious Mind</h3>
              <p className="card-description">
                I thrive on exploring new ideas and innovative concepts. My curiosity extends from 
                understanding historical events and political systems to staying updated with modern 
                automotive technology and design trends. I believe continuous learning is the key to 
                personal growth and meaningful contributions to society.
              </p>
              <div className="card-glow"></div>
            </div>

            <div className="about-card" data-aos="fade-up" data-aos-delay="200">
              <div className="card-icon">🎨</div>
              <h3 className="card-title">Creative Thinker</h3>
              <p className="card-description">
                Anime and storytelling have significantly enhanced my imagination and creative thinking 
                abilities. I enjoy analyzing narratives, character development, and visual aesthetics, 
                which has improved my critical thinking and appreciation for different forms of art and 
                expression across various media.
              </p>
              <div className="card-glow"></div>
            </div>

            <div className="about-card" data-aos="fade-up" data-aos-delay="300">
              <div className="card-icon">👨‍👩‍👦</div>
              <h3 className="card-title">Family Values</h3>
              <p className="card-description">
                Family plays a central role in my life. I cherish spending quality time with my loved 
                ones, engaging in meaningful conversations, and sharing light-hearted moments. These 
                connections keep me grounded, motivated, and provide essential support for my ambitions 
                and personal development journey.
              </p>
              <div className="card-glow"></div>
            </div>

            <div className="about-card" data-aos="fade-up" data-aos-delay="400">
              <div className="card-icon">🚗</div>
              <h3 className="card-title">Automotive Passion</h3>
              <p className="card-description">
                Deeply fascinated by automobiles - from classic designs to cutting-edge electric vehicles. 
                I follow automotive trends, study engineering innovations, performance specifications, and 
                design philosophy. This interest reflects my appreciation for technology, innovation, and 
                the evolution of transportation engineering.
              </p>
              <div className="card-glow"></div>
            </div>

            <div className="about-card" data-aos="fade-up" data-aos-delay="500">
              <div className="card-icon">🌟</div>
              <h3 className="card-title">Positive Outlook</h3>
              <p className="card-description">
                I approach life with optimism and enthusiasm. Every challenge is an opportunity to learn, 
                and every experience contributes to personal development. I'm eager to explore new 
                opportunities, embrace change, and grow both academically and as an individual with a 
                clear vision for the future.
              </p>
              <div className="card-glow"></div>
            </div>
          </div>

          {/* Detailed Profile Section */}
          <div className="profile-details" data-aos="fade-up">
            <div className="profile-content">
              <h3 className="profile-heading">Who I Am</h3>
              <p className="profile-text">
                My name is Kartik Jaswal, and I am currently a Class 12 student pursuing the Arts stream 
                at Government Senior Secondary School, Barot. My academic journey has been marked by 
                dedication, curiosity, and a genuine passion for learning. The subjects I study - History, 
                English, Sanskrit, Political Science, and Computer Studies - have helped me develop a 
                well-rounded perspective that combines humanities with technology.
              </p>
              <p className="profile-text">
                Beyond the classroom, I am a creative and curious individual who enjoys exploring diverse 
                interests. From watching anime that sparks my imagination to learning about the latest 
                developments in automotive technology, I believe in nurturing multiple passions. These 
                interests not only provide relaxation but also contribute to my creative thinking and 
                problem-solving abilities.
              </p>
              <p className="profile-text">
                I come from a supportive family environment where values of hard work, respect, and 
                continuous improvement are emphasized. Spending quality time with my family, engaging in 
                meaningful discussions, and sharing moments of joy help me stay balanced and motivated in 
                my academic pursuits and personal growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="education-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Educational Journey</h2>
            <p className="section-subtitle">A timeline of academic achievements and milestones</p>
          </div>

          <div className="timeline">
            <div className="timeline-line"></div>
            
            <div className="timeline-item" data-aos="fade-right">
              <div className="timeline-content">
                <div className="timeline-marker">
                  <div className="marker-dot"></div>
                  <div className="marker-ring"></div>
                </div>
                <div className="timeline-card">
                  <div className="timeline-badge">Present</div>
                  <h3 className="timeline-title">Government Senior Secondary School, Barot</h3>
                  <p className="timeline-period">Class 12 | Arts Stream</p>
                  <div className="timeline-details">
                    <p>
                      Currently pursuing senior secondary education with a comprehensive focus on 
                      humanities and technology. My coursework includes in-depth study of History, 
                      Political Science, English, Sanskrit, and Computer Studies.
                    </p>
                    <p>
                      This phase of my education is crucial as I develop advanced analytical skills, 
                      strengthen my communication abilities, and prepare for higher education opportunities. 
                      I am actively engaged in understanding complex concepts, participating in discussions, 
                      and applying theoretical knowledge to real-world scenarios.
                    </p>
                    <div className="achievement-tags">
                      <span className="tag">Arts Stream</span>
                      <span className="tag">5 Core Subjects</span>
                      <span className="tag">Senior Secondary</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="timeline-item" data-aos="fade-left">
              <div className="timeline-content">
                <div className="timeline-marker">
                  <div className="marker-dot"></div>
                  <div className="marker-ring"></div>
                </div>
                <div className="timeline-card">
                  <div className="timeline-badge completed">Completed</div>
                  <h3 className="timeline-title">Sait Rudraksh Convent School, Barot</h3>
                  <p className="timeline-period">Class 10 | First Division</p>
                  <div className="timeline-details">
                    <p>
                      Successfully completed Class 10 education with outstanding results, achieving 91% 
                      marks and securing First Division. This achievement demonstrates my dedication to 
                      academics and ability to perform consistently under various academic challenges.
                    </p>
                    <p>
                      My time at Sait Rudraksh Convent School laid a strong foundation for my academic 
                      journey. It was here that I developed essential study habits, learned the importance 
                      of discipline, and discovered my interests in various subjects. The supportive 
                      environment and quality education prepared me well for senior secondary challenges.
                    </p>
                    <div className="achievement-tags">
                      <span className="tag highlight">91% Marks</span>
                      <span className="tag highlight">First Division</span>
                      <span className="tag">Class 10</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subjects Section */}
      <section id="subjects" className="subjects-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Academic Subjects</h2>
            <p className="section-subtitle">Exploring diverse fields of knowledge in Class 12 Arts Stream</p>
          </div>

          <div className="subjects-grid">
            <div className="subject-card" data-aos="zoom-in">
              <div className="subject-icon-wrapper">
                <span className="subject-icon">📜</span>
                <div className="icon-bg"></div>
              </div>
              <h3 className="subject-title">History</h3>
              <p className="subject-description">
                Understanding past civilizations, events, and their impact on modern society. Analyzing 
                historical trends, cultural developments, and the evolution of human societies across 
                different eras and regions.
              </p>
              <div className="subject-skills">
                <span className="skill-tag">Critical Analysis</span>
                <span className="skill-tag">Research</span>
                <span className="skill-tag">Context Understanding</span>
              </div>
            </div>

            <div className="subject-card" data-aos="zoom-in" data-aos-delay="100">
              <div className="subject-icon-wrapper">
                <span className="subject-icon">📚</span>
                <div className="icon-bg"></div>
              </div>
              <h3 className="subject-title">English</h3>
              <p className="subject-description">
                Developing advanced communication, literature analysis, and writing skills. Exploring 
                diverse literary works, enhancing vocabulary, and mastering the art of effective written 
                and verbal expression.
              </p>
              <div className="subject-skills">
                <span className="skill-tag">Communication</span>
                <span className="skill-tag">Literary Analysis</span>
                <span className="skill-tag">Creative Writing</span>
              </div>
            </div>

            <div className="subject-card" data-aos="zoom-in" data-aos-delay="200">
              <div className="subject-icon-wrapper">
                <span className="subject-icon">🕉️</span>
                <div className="icon-bg"></div>
              </div>
              <h3 className="subject-title">Sanskrit</h3>
              <p className="subject-description">
                Exploring ancient language, literature, and cultural heritage. Understanding classical 
                texts, grammatical structures, and the rich philosophical traditions embedded in Sanskrit 
                literature and scriptures.
              </p>
              <div className="subject-skills">
                <span className="skill-tag">Language Mastery</span>
                <span className="skill-tag">Cultural Knowledge</span>
                <span className="skill-tag">Translation</span>
              </div>
            </div>

            <div className="subject-card" data-aos="zoom-in" data-aos-delay="300">
              <div className="subject-icon-wrapper">
                <span className="subject-icon">⚖️</span>
                <div className="icon-bg"></div>
              </div>
              <h3 className="subject-title">Political Science</h3>
              <p className="subject-description">
                Analyzing governance systems, political theories, and contemporary issues. Understanding 
                democratic processes, international relations, constitutional frameworks, and the dynamics 
                of power and policy-making.
              </p>
              <div className="subject-skills">
                <span className="skill-tag">Policy Analysis</span>
                <span className="skill-tag">Civic Awareness</span>
                <span className="skill-tag">Debate Skills</span>
              </div>
            </div>

            <div className="subject-card" data-aos="zoom-in" data-aos-delay="400">
              <div className="subject-icon-wrapper">
                <span className="subject-icon">💻</span>
                <div className="icon-bg"></div>
              </div>
              <h3 className="subject-title">Computer Studies</h3>
              <p className="subject-description">
                Building technological literacy and foundational programming knowledge. Learning about 
                computer systems, software applications, basic coding, and the role of technology in 
                modern society and future innovations.
              </p>
              <div className="subject-skills">
                <span className="skill-tag">Programming Basics</span>
                <span className="skill-tag">Digital Literacy</span>
                <span className="skill-tag">Problem Solving</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interests Section */}
      <section id="interests" className="interests-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Interests & Passions</h2>
            <p className="section-subtitle">What fuels my curiosity and creativity beyond academics</p>
          </div>

          <div className="interests-grid">
            <div className="interest-card large" data-aos="flip-left">
              <div className="interest-content">
                <div className="interest-icon-large">📺</div>
                <h3 className="interest-title">Anime Enthusiast</h3>
                <p className="interest-description">
                  Passionate about Japanese animation and storytelling. Anime has significantly enhanced 
                  my imagination, creativity, and appreciation for complex narratives. I enjoy analyzing 
                  character development, plot structures, and artistic styles, which has broadened my 
                  perspective on visual storytelling and cultural expression.
                </p>
                <p className="interest-description">
                  Beyond entertainment, anime teaches valuable life lessons, explores philosophical themes, 
                  and presents diverse cultural perspectives. This interest has improved my critical 
                  thinking as I analyze themes, symbolism, and narrative techniques used in different series.
                </p>
                <div className="interest-tags">
                  <span className="int-tag">Storytelling</span>
                  <span className="int-tag">Character Analysis</span>
                  <span className="int-tag">Visual Arts</span>
                </div>
              </div>
              <div className="interest-overlay"></div>
            </div>

            <div className="interest-card large" data-aos="flip-right">
              <div className="interest-content">
                <div className="interest-icon-large">🏎️</div>
                <h3 className="interest-title">Automotive Technology</h3>
                <p className="interest-description">
                  Deeply fascinated by cars and bikes - from classic designs to modern innovations. I 
                  actively follow automotive industry trends, study engine technologies, aerodynamics, 
                  electric vehicle developments, and performance engineering. This interest reflects my 
                  curiosity about innovation and the future of transportation.
                </p>
                <p className="interest-description">
                  I'm particularly interested in how automotive design has evolved over decades, the 
                  engineering behind high-performance vehicles, and the shift toward sustainable mobility 
                  solutions. Understanding these concepts connects my interest in technology with real-world 
                  applications.
                </p>
                <div className="interest-tags">
                  <span className="int-tag">Engineering</span>
                  <span className="int-tag">Innovation</span>
                  <span className="int-tag">Design</span>
                </div>
              </div>
              <div className="interest-overlay"></div>
            </div>

            <div className="interest-card" data-aos="fade-up">
              <div className="interest-content">
                <div className="interest-icon-medium">🏍️</div>
                <h3 className="interest-title">Motorcycle Design</h3>
                <p className="interest-description">
                  Captivated by motorcycle engineering and aesthetics. I appreciate the blend of form and 
                  function in bike design, from sportbikes to cruisers. Understanding mechanics, performance 
                  specifications, and design philosophy enhances my technical knowledge.
                </p>
                <div className="interest-tags">
                  <span className="int-tag">Mechanics</span>
                  <span className="int-tag">Performance</span>
                </div>
              </div>
              <div className="interest-overlay"></div>
            </div>

            <div className="interest-card" data-aos="fade-up" data-aos-delay="100">
              <div className="interest-content">
                <div className="interest-icon-medium">💡</div>
                <h3 className="interest-title">Innovation & Ideas</h3>
                <p className="interest-description">
                  I love working on new concepts and innovative projects that encourage creative 
                  problem-solving. Whether brainstorming solutions to everyday challenges or exploring 
                  futuristic technologies, I enjoy the process of turning ideas into practical applications.
                </p>
                <div className="interest-tags">
                  <span className="int-tag">Creativity</span>
                  <span className="int-tag">Innovation</span>
                </div>
              </div>
              <div className="interest-overlay"></div>
            </div>

            <div className="interest-card" data-aos="fade-up" data-aos-delay="200">
              <div className="interest-content">
                <div className="interest-icon-medium">📡</div>
                <h3 className="interest-title">Entertainment & Media</h3>
                <p className="interest-description">
                  Staying updated with entertainment trends, television shows, and general knowledge through 
                  various media platforms. This helps me relax while keeping me informed about cultural 
                  trends, current events, and diverse perspectives.
                </p>
                <div className="interest-tags">
                  <span className="int-tag">Media</span>
                  <span className="int-tag">Trends</span>
                </div>
              </div>
              <div className="interest-overlay"></div>
            </div>

            <div className="interest-card" data-aos="fade-up" data-aos-delay="300">
              <div className="interest-content">
                <div className="interest-icon-medium">🎯</div>
                <h3 className="interest-title">Personal Growth</h3>
                <p className="interest-description">
                  Committed to continuous self-improvement through reading, learning new skills, and 
                  stepping out of my comfort zone. I believe that personal development is a lifelong 
                  journey, and I actively seek opportunities to expand my knowledge.
                </p>
                <div className="interest-tags">
                  <span className="int-tag">Learning</span>
                  <span className="int-tag">Development</span>
                </div>
              </div>
              <div className="interest-overlay"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Get in Touch</h2>
            <p className="section-subtitle">Let's connect and explore opportunities together</p>
          </div>

          <div className="contact-container">
            <div className="contact-info" data-aos="fade-up">
              <div className="contact-intro">
                <h3>Let's Start a Conversation</h3>
                <p>
                  I'm always open to discussing new opportunities, collaborations, or simply having 
                  a meaningful conversation. Feel free to reach out through any of the channels below.
                </p>
              </div>

              <div className="contact-methods">
                <div className="contact-item">
                  <div className="contact-item-icon">📧</div>
                  <div className="contact-item-content">
                    <h4>Email</h4>
                    <a href="mailto:jaswalkartikey@gmail.com">jaswalkartikey@gmail.com</a>
                    <p>Best for detailed inquiries</p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-item-icon">📞</div>
                  <div className="contact-item-content">
                    <h4>Phone</h4>
                    <a href="tel:+919015059490">+91 9015059490</a>
                    <p>Available for calls and messages</p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-item-icon">📍</div>
                  <div className="contact-item-content">
                    <h4>Location</h4>
                    <p>Barot, India</p>
                    <p>Open to remote opportunities</p>
                  </div>
                </div>
              </div>

              <div className="quick-stats">
                <div className="quick-stat-item">
                  <span className="quick-stat-value">&lt; 24h</span>
                  <span className="quick-stat-label">Response Time</span>
                </div>
                <div className="quick-stat-item">
                  <span className="quick-stat-value">100%</span>
                  <span className="quick-stat-label">Engagement</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-brand">
              <h3 className="footer-logo">Kartik Jaswal</h3>
              <p className="footer-tagline">Student | Learner | Innovator</p>
            </div>

            <div className="footer-links">
              <h4>Quick Links</h4>
              <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>Home</a>
              <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>About</a>
              <a href="#education" onClick={(e) => { e.preventDefault(); scrollToSection('education'); }}>Education</a>
              <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>Contact</a>
            </div>

            <div className="footer-contact">
              <h4>Contact</h4>
              <p>📧 jaswalkartikey@gmail.com</p>
              <p>📞 +91 9015059490</p>
              <p>📍 Barot, India</p>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2026 Kartik Jaswal. All rights reserved.</p>
            <p className="footer-note">Designed with passion and creativity</p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <button 
        className={`scroll-to-top ${scrollY > 500 ? 'visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        ↑
      </button>
    </div>
  );
}

export default App;