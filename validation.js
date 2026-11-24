document.addEventListener('DOMContentLoaded', () => {
  const emailInput = document.getElementById('userEmail');
  const phoneInput = document.getElementById('userPhone');

  if (!emailInput || !phoneInput) {
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const mobileNumberRegex = /^[6-9]\d{9}$/;

  const validateEmail = () => {
    const email = emailInput.value.trim();
    emailInput.setCustomValidity(
      !email || emailRegex.test(email) ? '' : 'Enter a valid email address.'
    );
  };

  const validatePhone = () => {
    const digitsOnly = phoneInput.value.replace(/\D/g, '').slice(0, 10);
    if (phoneInput.value !== digitsOnly) {
      phoneInput.value = digitsOnly;
    }

    phoneInput.setCustomValidity(
      !digitsOnly || mobileNumberRegex.test(digitsOnly)
        ? ''
        : 'Enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9.'
    );
  };

  emailInput.addEventListener('input', validateEmail);
  phoneInput.addEventListener('input', validatePhone);

  const loginForm = emailInput.closest('form');
  if (loginForm) {
    loginForm.addEventListener('submit', (event) => {
      validateEmail();
      validatePhone();
      if (!loginForm.checkValidity()) {
        event.preventDefault();
        loginForm.reportValidity();
      }
    }, true);
  }
});
