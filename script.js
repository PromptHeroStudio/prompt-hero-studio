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
      // No preventDefault: let Formspree handle submission
      setTimeout(() => {
        orderPromptForm.reset();
      }, 500);
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
    contactForm.addEventListener('submit', function () {
      setTimeout(() => {
        contactForm.reset();
      }, 500); // Clear form after short delay to allow Formspree redirect/thank you
    });
  }

  // Prompts Details Modal (skeleton for all 22 prompts)
  // ...implement modal logic for prompt details as needed...
});
