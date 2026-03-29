/**
 * Kesar Securities - Contact Form Handler (Simplified)
 * No jQuery Validate dependency required
 */

document.addEventListener('DOMContentLoaded', function() {
    const API_URL = 'https://kesarsecurities.vercel.app/api/contact';
    
    const form = document.getElementById('frmContactus');
    const submitBtn = document.getElementById('submit');
    const msgDiv = document.getElementById('msg');
    
    // Form submission handler
    form.addEventListener('submit', function(e) {
      e.preventDefault(); // CRITICAL: Prevent default form submission
      
      // Clear previous messages
      msgDiv.innerHTML = '';
      
      // Get form values
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const message = document.getElementById('message').value.trim();
      
      // Basic validation
      if (!name || name.length < 2) {
        showMessage('error', 'Please enter a valid name (at least 2 characters)');
        return;
      }
      
      if (!email || !isValidEmail(email)) {
        showMessage('error', 'Please enter a valid email address');
        return;
      }
      
      if (!phone || phone.length !== 10 || !/^[6-9]\d{9}$/.test(phone)) {
        showMessage('error', 'Please enter a valid 10-digit phone number');
        return;
      }
      
      if (!message || message.length < 10) {
        showMessage('error', 'Please enter a message (at least 10 characters)');
        return;
      }
      
      // Disable submit button
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending...';
      
      // Prepare data
      const formData = {
        name: name,
        email: email,
        phone: phone,
        message: message
      };
      
      console.log('Sending contact form:', formData);
      
      // Send POST request
      fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      .then(response => {
        console.log('Response status:', response.status);
        return response.json();
      })
      .then(data => {
        console.log('Response data:', data);
        
        if (data.success) {
          showMessage('success', data.message || 'Thank you! Your message has been sent successfully. We will get back to you within 24-48 hours.');
          form.reset();
          
          // Scroll to message
          msgDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
          showMessage('warning', data.message || 'Something went wrong. Please try again.');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        showMessage('error', 'Failed to send message. Please try again or contact us directly at support@kesarsecurities.in or call 98191 53214.');
      })
      .finally(() => {
        // Re-enable submit button
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      });
    });
    
    // Email validation helper
    function isValidEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    
    // Show message helper
    function showMessage(type, message) {
      let alertClass = 'alert-info';
      let icon = 'bi-info-circle-fill';
      
      if (type === 'success') {
        alertClass = 'alert-success';
        icon = 'bi-check-circle-fill';
      } else if (type === 'error') {
        alertClass = 'alert-danger';
        icon = 'bi-x-circle-fill';
      } else if (type === 'warning') {
        alertClass = 'alert-warning';
        icon = 'bi-exclamation-triangle-fill';
      }
      
      msgDiv.innerHTML = `
        <div class="alert ${alertClass} alert-dismissible fade show mt-3" role="alert">
          <i class="bi ${icon} me-2"></i>
          <strong>${type === 'success' ? 'Success!' : type === 'error' ? 'Error!' : 'Warning!'}</strong> ${message}
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      `;
      
      // Auto-hide after 10 seconds
      setTimeout(() => {
        const alert = msgDiv.querySelector('.alert');
        if (alert) {
          alert.classList.remove('show');
          setTimeout(() => msgDiv.innerHTML = '', 150);
        }
      }, 10000);
    }
    
    // Phone number formatting - only digits
    const phoneInput = document.getElementById('phone');
    phoneInput.addEventListener('input', function(e) {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length > 10) {
        value = value.slice(0, 10);
      }
      e.target.value = value;
    });
    
    // Character counter for message
    const messageInput = document.getElementById('message');
    messageInput.addEventListener('input', function(e) {
      const maxLength = 1000;
      const currentLength = e.target.value.length;
      const remaining = maxLength - currentLength;
      
      // Remove existing counter
      const existingCounter = document.getElementById('charCounter');
      if (existingCounter) {
        existingCounter.remove();
      }
      
      // Add counter
      if (currentLength > 0) {
        const counter = document.createElement('small');
        counter.id = 'charCounter';
        counter.className = remaining < 50 ? 'text-danger' : remaining < 100 ? 'text-warning' : 'text-muted';
        counter.textContent = `${remaining} characters remaining`;
        messageInput.parentNode.appendChild(counter);
      }
    });
    
    console.log('Kesar Securities Contact Form - Ready (Vanilla JS)');
  });