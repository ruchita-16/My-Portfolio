// Default configuration
    const defaultConfig = {
      hero_name: 'Ruchita Rathod',
      hero_title: 'Computer Science Student (AI & ML)',
      hero_tagline: 'Turning data into insights using Machine Learning and intelligent systems.',
      about_text: "I am a Computer Science Engineering (AI & ML) student at Adani University currently in my third year. I have a strong interest in Machine Learning and Data Science and enjoy working with data to uncover insights and build predictive models. Through academic projects and practical implementations, I have developed experience in data analysis, machine learning models, and building intelligent systems that solve real-world problems. I am particularly interested in applying AI and data-driven solutions to improve decision making and automation.",
      contact_email: 'ruchirathod2747@gmail.com',
      background_color: '#0a0a0f',
      surface_color: '#12121a',
      text_color: '#e8e8ed',
      accent_color: '#6366f1',
      accent_secondary_color: '#22d3ee',
      font_family: 'Syne',
      font_size: 16
    };

    // Initialize Element SDK
    if (window.elementSdk) {
      window.elementSdk.init({
        defaultConfig,
        onConfigChange: async (config) => {
          // Update hero section
          const heroNameFirst = document.getElementById('hero-name-first');
          const heroNameLast = document.getElementById('hero-name-last');
          const navName = document.getElementById('nav-name');
          const heroTitle = document.getElementById('hero-title');
          const heroTagline = document.getElementById('hero-tagline');
          const aboutText = document.getElementById('about-text');
          const contactEmail = document.getElementById('contact-email');

          const name = config.hero_name || defaultConfig.hero_name;
          const nameParts = name.trim().split(/\s+/);
          const firstName = nameParts.shift() || '';
          const lastName = nameParts.join(' ') || '';
          if (heroNameFirst) {
            heroNameFirst.textContent = firstName;
            heroNameFirst.setAttribute('data-text', firstName);
          }
          if (heroNameLast) {
            heroNameLast.textContent = lastName;
            heroNameLast.setAttribute('data-text', lastName);
          }
          if (navName) navName.textContent = firstName;
          if (heroTitle) heroTitle.textContent = config.hero_title || defaultConfig.hero_title;
          if (heroTagline) heroTagline.textContent = config.hero_tagline || defaultConfig.hero_tagline;
          if (aboutText) aboutText.textContent = config.about_text || defaultConfig.about_text;
          if (contactEmail) {
            const email = config.contact_email || defaultConfig.contact_email;
            contactEmail.textContent = email;
            if (contactEmail.tagName === 'A') {
              contactEmail.setAttribute('href', `mailto:${email}`);
            }
          }

          // Update colors via CSS variables
          const root = document.documentElement;
          root.style.setProperty('--bg-primary', config.background_color || defaultConfig.background_color);
          root.style.setProperty('--surface', config.surface_color || defaultConfig.surface_color);
          root.style.setProperty('--text-primary', config.text_color || defaultConfig.text_color);
          root.style.setProperty('--accent', config.accent_color || defaultConfig.accent_color);
          root.style.setProperty('--accent-secondary', config.accent_secondary_color || defaultConfig.accent_secondary_color);

          // Update fonts
          const customFont = config.font_family || defaultConfig.font_family;
          document.body.style.fontFamily = `${customFont}, sans-serif`;

          const baseSize = config.font_size || defaultConfig.font_size;
          document.body.style.fontSize = `${baseSize}px`;
        },
        mapToCapabilities: (config) => ({
          recolorables: [
            {
              get: () => config.background_color || defaultConfig.background_color,
              set: (value) => window.elementSdk.setConfig({ background_color: value })
            },
            {
              get: () => config.surface_color || defaultConfig.surface_color,
              set: (value) => window.elementSdk.setConfig({ surface_color: value })
            },
            {
              get: () => config.text_color || defaultConfig.text_color,
              set: (value) => window.elementSdk.setConfig({ text_color: value })
            },
            {
              get: () => config.accent_color || defaultConfig.accent_color,
              set: (value) => window.elementSdk.setConfig({ accent_color: value })
            },
            {
              get: () => config.accent_secondary_color || defaultConfig.accent_secondary_color,
              set: (value) => window.elementSdk.setConfig({ accent_secondary_color: value })
            }
          ],
          borderables: [],
          fontEditable: {
            get: () => config.font_family || defaultConfig.font_family,
            set: (value) => window.elementSdk.setConfig({ font_family: value })
          },
          fontSizeable: {
            get: () => config.font_size || defaultConfig.font_size,
            set: (value) => window.elementSdk.setConfig({ font_size: value })
          }
        }),
        mapToEditPanelValues: (config) => new Map([
          ['hero_name', config.hero_name || defaultConfig.hero_name],
          ['hero_title', config.hero_title || defaultConfig.hero_title],
          ['hero_tagline', config.hero_tagline || defaultConfig.hero_tagline],
          ['about_text', config.about_text || defaultConfig.about_text],
          ['contact_email', config.contact_email || defaultConfig.contact_email]
        ])
      });
    }

    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu when clicking a link
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });

    // Section reveal animation on scroll
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.reveal-section').forEach(section => {
      observer.observe(section);
    });

    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      
      // Show success message (demo)
      formStatus.classList.remove('hidden', 'text-red-400');
      formStatus.classList.add('text-emerald-400');
      formStatus.textContent = `Thanks ${name}! Your message has been received. I'll get back to you soon!`;
      
      // Reset form
      contactForm.reset();
      
      // Hide message after 5 seconds
      setTimeout(() => {
        formStatus.classList.add('hidden');
      }, 5000);
    });

    // Animate skill bars on scroll
    const skillBars = document.querySelectorAll('.skill-bar');
    const skillsSection = document.getElementById('skills');

    const skillsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0%';
            setTimeout(() => {
              bar.style.width = width;
            }, 100);
          });
        }
      });
    }, { threshold: 0.3 });

    skillsObserver.observe(skillsSection);

(function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.__CF$cv$params={r:'9da260c5c7965677',t:'MTc3MzE0NjMyMy4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();
