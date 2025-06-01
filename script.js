// script.js for Prompt Hero Studio SPA
// Handles modal, form, and accessibility logic

document.addEventListener('DOMContentLoaded', function () {
  // Modal logic
  const orderPromptBtn = document.getElementById('orderPromptBtn');
  const orderPromptModal = document.getElementById('orderPromptModal');
  const closeOrderPromptModal = document.getElementById('closeOrderPromptModal');
  const orderPromptForm = document.getElementById('orderPromptForm');
  const orderPromptSuccess = document.getElementById('orderPromptSuccess');

  // Open modal
  if (orderPromptBtn) {
    orderPromptBtn.addEventListener('click', function () {
      orderPromptModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      // Focus first input
      setTimeout(() => {
        const firstInput = orderPromptForm.querySelector('input, textarea, select');
        if (firstInput) firstInput.focus();
      }, 100);
    });
  }

  // Close modal
  function closeModal() {
    orderPromptModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  if (closeOrderPromptModal) {
    closeOrderPromptModal.addEventListener('click', closeModal);
  }
  orderPromptModal.addEventListener('click', function (e) {
    if (e.target.classList.contains('phs-modal-overlay')) closeModal();
  });
  document.addEventListener('keydown', function (e) {
    if (orderPromptModal.getAttribute('aria-hidden') === 'false' && e.key === 'Escape') closeModal();
  });

  // Timestamp auto-fill
  const orderTimestamp = document.getElementById('orderTimestamp');
  if (orderTimestamp) {
    orderTimestamp.value = new Date().toISOString();
  }

  // Form submission logic
  if (orderPromptForm) {
    orderPromptForm.addEventListener('submit', function (e) {
      e.preventDefault();
      emailjs.sendForm('service_qpme1bs', 'template_hw06jdh', orderPromptForm)
        .then(function() {
          document.getElementById('orderPromptSuccess').textContent = 'Thank you! Your prompt creation request has been submitted.';
          document.getElementById('orderPromptSuccess').style.display = 'block';
          orderPromptForm.reset();
        }, function(error) {
          alert('There was an error sending your order. Error details: ' + (error && error.text ? error.text : JSON.stringify(error)));
        });
    });
  }

  // Accessibility: trap focus in modal
  orderPromptModal.addEventListener('keydown', function (e) {
    if (orderPromptModal.getAttribute('aria-hidden') === 'false' && e.key === 'Tab') {
      const focusable = orderPromptModal.querySelectorAll('input, textarea, button, [tabindex]:not([tabindex="-1"])');
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
  });

  // FAQ Accordion
  document.querySelectorAll('.phs-faq-question').forEach(btn => {
    btn.addEventListener('click', function () {
      const expanded = this.getAttribute('aria-expanded') === 'true';
      document.querySelectorAll('.phs-faq-question').forEach(b => {
        b.setAttribute('aria-expanded', 'false');
        b.querySelector('.phs-faq-icon').textContent = '+';
        b.parentElement.querySelector('.phs-faq-answer').hidden = true;
      });
      if (!expanded) {
        this.setAttribute('aria-expanded', 'true');
        this.querySelector('.phs-faq-icon').textContent = '–';
        this.parentElement.querySelector('.phs-faq-answer').hidden = false;
      }
    });
  });

  // Contact Form Submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      emailjs.sendForm('service_qpme1bs', 'template_7g37ku6', contactForm)
        .then(function() {
          document.getElementById('contactSuccess').style.display = 'block';
          contactForm.reset();
        }, function(error) {
          alert('There was an error sending your message. Error details: ' + (error && error.text ? error.text : JSON.stringify(error)));
        });
    });
  }

  // Prompts Details Modal (skeleton for all 22 prompts)
  // Prompt details data
  const phsPromptDetailsData = {
    'banking-insights': {
      img: 'prompt_banking_insights_image.png',
      title: 'Banking Insights',
      short: 'Precision Banking Insights & Hyper-Personalized Client Engagement Suite',
      desc: 'Unlock actionable banking analytics and deliver tailored client experiences with this advanced prompt suite.',
      struct: `{
  "client_data": ..., 
  "analysis_type": "personalized_report",
  "output_format": "Markdown"
}`
    },
    'german-curriculum': {
      img: 'prompt_german_curriculum_image.png',
      title: 'German Curriculum Planner',
      short: 'Structured German Curriculum Planner for Educational Excellence',
      desc: 'Design comprehensive German language curricula for any level or institution with ease.',
      struct: `{
  "level": ..., 
  "goals": ..., 
  "constraints": ...,
  "output": "JSON"
}`
    },
    'business-concierge': {
      img: 'prompt_business_concierge_image.png',
      title: 'Business Concierge',
      short: 'Executive Business Concierge: Legal & Administrative AI Assistant',
      desc: 'Streamline your daily operations and boost productivity with this versatile AI assistant.',
      struct: `{
  "task": "legal_review",
  "input": ..., 
  "output_format": "Markdown"
}`
    },
    'travel-architect': {
      img: 'prompt_travel_architect_image.png',
      title: 'Travel Architect',
      short: 'Elite Travel Architect: Tailored Itineraries & Destination Intelligence',
      desc: 'Create personalized travel plans and discover hidden gems for any destination.',
      struct: `{
  "destination": ..., 
  "preferences": ..., 
  "output": "JSON itinerary"
}`
    },
    'lab-analyst': {
      img: 'prompt_lab_analyst_image.png',
      title: 'Lab Analyst',
      short: 'AI Laboratory Analyst: Scientific Research Design & Data Structuring',
      desc: 'Accelerate research with structured experiment design and data analysis prompts.',
      struct: `{
  "experiment": ..., 
  "data_format": "CSV",
  "output": ...
}`
    },
    'market-intelligence': {
      img: 'prompt_market_intelligence_image.png',
      title: 'Market Intelligence',
      short: 'Strategic Market Intelligence: Sales & Marketing Optimization Engine',
      desc: 'Gain actionable insights for sales and marketing strategies in any industry.',
      struct: `{
  "industry": ..., 
  "metrics": ..., 
  "output": "Markdown table"
}`
    },
    'logistics-hub': {
      img: 'prompt_logistics_hub_image.png',
      title: 'Logistics Hub',
      short: 'Smart Logistics Hub: AI-Driven Inventory & Dispatch Orchestration',
      desc: 'Optimize inventory and dispatch with intelligent, automated logistics prompts.',
      struct: `{
  "inventory": ..., 
  "dispatch_rules": ..., 
  "output": "JSON"
}`
    },
    'production-optimizer': {
      img: 'prompt_production_optimizer_image.png',
      title: 'Production Optimizer',
      short: 'Shift-Aware Production Flow Optimizer: Material & Workforce Planner',
      desc: 'Plan and optimize production flows, materials, and workforce allocation.',
      struct: `{
  "shifts": ..., 
  "resources": ..., 
  "output": "Markdown"
}`
    },
    'retail-dynamics-ai': {
      img: 'prompt_retail_dynamics_ai_image.png',
      title: 'Retail Dynamics AI',
      short: 'Retail Dynamics Engine: Real-Time Inventory Refill & Shelf Strategy AI',
      desc: 'Automate inventory refills and optimize shelf strategies for retail success.',
      struct: `{
  "shelf_data": ..., 
  "refill_rules": ..., 
  "output": "JSON"
}`
    },
    'pharmascope-ai': {
      img: 'prompt_pharmascope_ai_image.png',
      title: 'PharmaScope AI',
      short: 'PharmaScope AI: Drug Market Entry & Competitive Intelligence Platform',
      desc: 'Navigate drug market entry and competition with targeted AI insights.',
      struct: `{
  "drug": ..., 
  "market": ..., 
  "output": "Markdown report"
}`
    },
    'call-center-monitor': {
      img: 'prompt_call_center_monitor_image.png',
      title: 'Call Center Monitor',
      short: 'Conversational Quality Monitor: AI Call Center Interaction Evaluator',
      desc: 'Evaluate and improve call center interactions with AI-driven analysis.',
      struct: `{
  "call_data": ..., 
  "evaluation_criteria": ..., 
  "output": "JSON"
}`
    },
    'finance-strategist': {
      img: 'prompt_finance_strategist_image.png',
      title: 'Finance Strategist',
      short: 'Intelligent Personal Finance Strategist (Secure & User-Centric)',
      desc: 'Take control of personal finances with secure, user-focused AI prompts.',
      struct: `{
  "user_profile": ..., 
  "goals": ..., 
  "output": "Markdown"
}`
    },
    'task-orchestrator': {
      img: 'prompt_task_orchestrator_image.png',
      title: 'Task Orchestrator',
      short: 'Interactive Task Orchestrator: Smart To-Do & Progress Dashboard',
      desc: 'Organize tasks and track progress with interactive AI dashboards.',
      struct: `{
  "tasks": [...], 
  "progress": ..., 
  "output": "JSON"
}`
    },
    'language-institute-manager': {
      img: 'prompt_language_institute_manager_image.png',
      title: 'Language Institute Manager',
      short: 'AI-Powered Language Institute Manager: Program & Student Operations',
      desc: 'Manage language programs and student operations with AI efficiency.',
      struct: `{
  "programs": [...], 
  "students": ..., 
  "output": "Markdown"
}`
    },
    'labchain-monitor': {
      img: 'prompt_labchain_monitor_image.png',
      title: 'LabChain Monitor',
      short: 'LabChain Monitor: Real-Time Sample Flow & Analytical Reporting AI',
      desc: 'Monitor lab sample flows and generate analytical reports in real time.',
      struct: `{
  "samples": ..., 
  "analysis": ..., 
  "output": "JSON"
}`
    },
    'wellness-architect': {
      img: 'prompt_wellness_architect_image.png',
      title: 'Wellness Architect',
      short: 'Wellness Architect: Client-Centric Fitness Needs & Program Designer',
      desc: 'Design personalized fitness and wellness programs for any client.',
      struct: `{
  "client": ..., 
  "fitness_goals": ..., 
  "output": "Markdown"
}`
    },
    'investigation-engine': {
      img: 'prompt_investigation_engine_image.png',
      title: 'Investigation Engine',
      short: 'Deep Investigation Engine: AI for Journalistic Research & Analysis',
      desc: 'Empower research and analysis for journalism and investigations.',
      struct: `{
  "topic": ..., 
  "sources": [...], 
  "output": "Markdown"
}`
    },
    'paper-coauthor': {
      img: 'prompt_paper_coauthor_image.png',
      title: 'Paper Co-Author',
      short: 'Scholarly Paper Co-Author: Research Structuring & Academic Writing AI',
      desc: 'Collaborate on academic writing and research structuring with AI.',
      struct: `{
  "research_area": ..., 
  "structure": ..., 
  "output": "Markdown"
}`
    },
    'content-generator': {
      img: 'prompt_content_generator_image.png',
      title: 'Content Generator',
      short: 'Precision Content Generator: Audience-Tuned Writing Assistant',
      desc: 'Generate tailored content for any audience or platform.',
      struct: `{
  "topic": ..., 
  "audience": ..., 
  "output": "Markdown"
}`
    },
    'curriculum-craft-ai': {
      img: 'prompt_curriculum_craft_ai_image.png',
      title: 'Curriculum Craft AI',
      short: 'Curriculum Craft AI: Structured Textbook Writing Assistant',
      desc: 'Assist in writing and structuring textbooks and curricula with AI.',
      struct: `{
  "subject": ..., 
  "chapters": [...], 
  "output": "JSON"
}`
    },
    'visual-generator': {
      img: 'prompt_visual_generator_image.png',
      title: 'Visual Generator',
      short: 'Visual Intelligence Generator: Conceptual & Commercial Image Creator',
      desc: 'Create conceptual and commercial images with AI-driven prompts.',
      struct: `{
  "concept": ..., 
  "style": ..., 
  "output": "Markdown image"
}`
    },
    'midjourney-muse': {
      img: 'prompt_midjourney_muse_image.png',
      title: 'Midjourney Muse',
      short: 'Midjourney Muse: Therapeutic Art Prompt Generator for AI Expression',
      desc: 'Inspire creative and therapeutic art with AI-generated prompts.',
      struct: `{
  "theme": ..., 
  "medium": ..., 
  "output": "Markdown"
}`
    }
  };

  // Prompt details modal logic
  const promptDetailsModal = document.getElementById('phsPromptDetailsModal');
  const promptDetailsImg = document.getElementById('phsPromptDetailsImg');
  const promptDetailsTitle = document.getElementById('phsPromptDetailsTitle');
  const promptDetailsShort = document.getElementById('phsPromptDetailsShort');
  const promptDetailsDesc = document.getElementById('phsPromptDetailsDesc');
  const promptDetailsStruct = document.getElementById('phsPromptDetailsStruct');
  const closePromptDetailsModal = document.getElementById('closePromptDetailsModal');

  document.querySelectorAll('.phs-prompt-details-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      const key = btn.getAttribute('data-prompt');
      const data = phsPromptDetailsData[key];
      if (data) {
        promptDetailsImg.src = data.img;
        promptDetailsImg.alt = data.title + ' illustration';
        promptDetailsTitle.textContent = data.title;
        promptDetailsShort.textContent = data.short;
        promptDetailsDesc.textContent = data.desc;
        promptDetailsStruct.textContent = data.struct;
        promptDetailsModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        closePromptDetailsModal.focus();
      }
    });
  });
  function closePromptDetails() {
    promptDetailsModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  closePromptDetailsModal.addEventListener('click', closePromptDetails);
  promptDetailsModal.querySelector('.phs-modal-overlay').addEventListener('click', closePromptDetails);
  document.addEventListener('keydown', function (e) {
    if (promptDetailsModal.getAttribute('aria-hidden') === 'false' && e.key === 'Escape') {
      closePromptDetails();
    }
  });

  // Scroll to top button logic
  const scrollTopBtn = document.getElementById('phs-scroll-top');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 300) {
      scrollTopBtn.style.display = 'flex';
    } else {
      scrollTopBtn.style.display = 'none';
    }
  });
  scrollTopBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    scrollTopBtn.blur();
  });
  scrollTopBtn.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      scrollTopBtn.blur();
    }
  });

  // Enhance form success messages for accessibility
  if (document.getElementById('orderPromptSuccess')) {
    document.getElementById('orderPromptSuccess').setAttribute('aria-live', 'polite');
  }
  if (document.getElementById('contactSuccess')) {
    document.getElementById('contactSuccess').setAttribute('aria-live', 'polite');
  }
});
