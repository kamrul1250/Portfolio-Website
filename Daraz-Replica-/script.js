document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.slide');
  const leftArrow = document.querySelector('.left-arrow');
  const rightArrow = document.querySelector('.right-arrow');

  let currentIndex = 0;
  const totalSlides = slides.length;
  let autoSlideInterval = setInterval(nextSlide,2000);

  if (totalSlides === 0) {
    console.warn('No slides found!');
    return;
  }

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
    console.log('Showing slide', index);
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    showSlide(currentIndex);
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    showSlide(currentIndex);
  }

  function startAutoSlide() {
    if (autoSlideInterval) clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(nextSlide, 5000);
    console.log('Auto slide started');
  }

  function stopAutoSlide() {
    if (autoSlideInterval) {
      clearInterval(autoSlideInterval);
      autoSlideInterval = null;
      console.log('Auto slide stopped');
    }
  }

  showSlide(currentIndex);
  startAutoSlide();

  if (rightArrow) {
    rightArrow.addEventListener('click', () => {
      console.log('Right arrow clicked');
      nextSlide();
      stopAutoSlide();
      startAutoSlide();
    });
  } else {
    console.warn('Right arrow not found!');
  }

  if (leftArrow) {
    leftArrow.addEventListener('click', () => {
      console.log('Left arrow clicked');
      prevSlide();
      stopAutoSlide();
      startAutoSlide();
    });
  } else {
    console.warn('Left arrow not found!');
  }
});



document.addEventListener('DOMContentLoaded', () => {
  const flashSaleContainer = document.getElementById('flashSaleProducts');
  const flashLeft = document.querySelector('.flash-left');
  const flashRight = document.querySelector('.flash-right');

  if (!flashSaleContainer) return;

  const productWidth = 170; // width of one product card
  const gap = 16;           // gap between cards
  const scrollAmount = productWidth + gap;

  let scrollPosition = 0;
  let maxScroll = flashSaleContainer.scrollWidth - flashSaleContainer.clientWidth;
  let autoSlideInterval;

  function slideNext() {
    scrollPosition += scrollAmount;
    if (scrollPosition > maxScroll) {
      scrollPosition = 0; // loop back to start
    }
    flashSaleContainer.scrollTo({ left: scrollPosition, behavior: 'smooth' });
  }

  function slidePrev() {
    scrollPosition -= scrollAmount;
    if (scrollPosition < 0) {
      scrollPosition = maxScroll; // loop to end
    }
    flashSaleContainer.scrollTo({ left: scrollPosition, behavior: 'smooth' });
  }

  // Auto slide every 4 seconds
  function startAutoSlide() {
    if (autoSlideInterval) clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(slideNext, 2000);
  }

  function stopAutoSlide() {
    if (autoSlideInterval) clearInterval(autoSlideInterval);
  }

  // Arrow click events
  if (flashRight) {
    flashRight.addEventListener('click', () => {
      slideNext();
      stopAutoSlide();
      startAutoSlide();
    });
  }

  if (flashLeft) {
    flashLeft.addEventListener('click', () => {
      slidePrev();
      stopAutoSlide();
      startAutoSlide();
    });
  }

  // Update maxScroll on window resize
  window.addEventListener('resize', () => {
    maxScroll = flashSaleContainer.scrollWidth - flashSaleContainer.clientWidth;
  });

  // Start auto sliding
  startAutoSlide();
});



document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");

  // Create error message elements
  const usernameError = document.createElement("div");
  const passwordError = document.createElement("div");
  usernameError.className = "error-text";
  passwordError.className = "error-text";
  usernameInput.insertAdjacentElement("afterend", usernameError);
  passwordInput.insertAdjacentElement("afterend", passwordError);

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Clear previous errors
    usernameError.textContent = "";
    passwordError.textContent = "";
    usernameInput.classList.remove("input-error");
    passwordInput.classList.remove("input-error");

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(username);
    const isPhone = /^01[3-9]\d{8}$/.test(username);
    const isValidPassword = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/.test(password);

    let hasError = false;

    if (!username) {
      usernameError.textContent = "Username is required.";
      usernameInput.classList.add("input-error");
      hasError = true;
    } else if (!isEmail && !isPhone) {
      usernameError.textContent = "Enter a valid email or Bangladeshi phone number.";
      usernameInput.classList.add("input-error");
      hasError = true;
    }

    if (!password) {
      passwordError.textContent = "Password is required.";
      passwordInput.classList.add("input-error");
      hasError = true;
    } else if (!isValidPassword) {
      passwordError.textContent = "Password must be at least 6 characters, include a letter and a number.";
      passwordInput.classList.add("input-error");
      hasError = true;
    }

    if (!hasError) {
      alert("✅ Form is valid. Submitting...");
      // form.submit(); // Uncomment to allow real submission
    }
  });
});







document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('register-form');
  const submitBtn = form.querySelector('.submit-btn');
  const agreeCheckbox = form.agree;

  // Enable submit button only if Terms & Privacy checked
  submitBtn.disabled = !agreeCheckbox.checked;
  agreeCheckbox.addEventListener('change', () => {
    submitBtn.disabled = !agreeCheckbox.checked;
  });

  function showError(input, message) {
    input.classList.add('error');
    let errorEl = input.nextElementSibling;
    if (!errorEl || !errorEl.classList.contains('error-msg')) {
      errorEl = document.createElement('div');
      errorEl.className = 'error-msg';
      input.after(errorEl);
    }
    errorEl.textContent = message;
  }

  function clearError(input) {
    input.classList.remove('error');
    let errorEl = input.nextElementSibling;
    if (errorEl && errorEl.classList.contains('error-msg')) {
      errorEl.textContent = '';
    }
  }

  // Validation helpers
  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  }
  function validatePhone(phone) {
    return /^\d{10,}$/.test(phone.trim());
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let valid = true;

    // Country
    if (!form.country.value) {
      showError(form.country, 'Please select your country');
      valid = false;
    } else {
      clearError(form.country);
    }

    // Email
    if (!validateEmail(form.email.value)) {
      showError(form.email, 'Please enter a valid email');
      valid = false;
    } else {
      clearError(form.email);
    }

    // Email Code
    if (!form.emailCode.value.trim()) {
      showError(form.emailCode, 'Please enter the email code');
      valid = false;
    } else {
      clearError(form.emailCode);
    }

    // Password
    if (form.password.value.length < 6) {
      showError(form.password, 'Password must be at least 6 characters');
      valid = false;
    } else {
      clearError(form.password);
    }

    // Phone
    if (!validatePhone(form.phone.value)) {
      showError(form.phone, 'Please enter a valid phone number');
      valid = false;
    } else {
      clearError(form.phone);
    }

    // SMS Code
    if (!form.smsCode.value.trim()) {
      showError(form.smsCode, 'Please enter the SMS code');
      valid = false;
    } else {
      clearError(form.smsCode);
    }

    // Terms checkbox
    if (!agreeCheckbox.checked) {
      alert('You must agree to Terms & Privacy');
      valid = false;
    }

    if (valid) {
      alert('Registration successful (demo only)');
      form.reset();
      submitBtn.disabled = true;
    }
  });
});

