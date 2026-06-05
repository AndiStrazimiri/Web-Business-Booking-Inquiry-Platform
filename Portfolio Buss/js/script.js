     // Ticker
    const tickerItems = ['Web Design','Web Development','E-Commerce','SEO','Mobile-First','Performance','WordPress','Tirana'];
    const ticker = document.getElementById('ticker');
    const repeated = [...tickerItems, ...tickerItems, ...tickerItems, ...tickerItems];
    ticker.innerHTML = repeated.map(t => `<span class="ticker-item"><span class="ticker-dot"></span>${t}</span>`).join('');

    // Navbar
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
      document.getElementById('backTop').classList.toggle('visible', window.scrollY > 400);
    });

    // Mobile nav
    const toggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        toggle.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });

    // Scroll reveal
    const reveals = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    reveals.forEach(r => io.observe(r));

    // Form submit
    function handleSubmit(btn) {
      btn.textContent = 'Sending...';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = '✓ Message sent!';
        btn.style.background = '#2A7F4F';
      }, 1500);
    }

// booking section button
    function openCal() {
  window.open("https://cal.eu/andi-strazimiri-pc5fy1", "_blank");
}



// ── CONTACT FORM: Validation + EmailJS ──
(function () {
  const form        = document.getElementById('contactForm');
  if (!form) return; // guard — safe if section absent

  const nameInput    = document.getElementById('name');
  const emailInput   = document.getElementById('email');
  const titleInput   = document.getElementById('title');
  const messageInput = document.getElementById('message');

  const nameError    = document.getElementById('nameError');
  const emailError   = document.getElementById('emailError');
  const titleError   = document.getElementById('titleError');
  const messageError = document.getElementById('messageError');
  const formSuccess  = document.getElementById('formSuccess');
  const formLoading  = document.getElementById('formLoading');

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function showError(el, msg) {
    el.textContent = msg;
    el.style.display = 'block';
  }

  function clearError(el) {
    el.textContent = '';
    el.style.display = 'none';
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    let valid = true;

    // Name
    const nameVal = nameInput.value.trim();
    if (!nameVal) {
      showError(nameError, 'Name is required.'); valid = false;
    } else if (!/^[A-Za-z\s]+$/.test(nameVal)) {
      showError(nameError, 'Name must contain only letters.'); valid = false;
    } else { clearError(nameError); }

    // Email
    if (!validateEmail(emailInput.value)) {
      showError(emailError, 'Enter a valid email.'); valid = false;
    } else { clearError(emailError); }

    // Subject
    if (titleInput.value.trim().length < 3) {
      showError(titleError, 'Subject must be at least 3 characters.'); valid = false;
    } else { clearError(titleError); }

    // Message
    if (messageInput.value.trim().length < 5) {
      showError(messageError, 'Message must be at least 5 characters.'); valid = false;
    } else { clearError(messageError); }

    if (!valid) return;

    // Stamp time
    form.querySelector('input[name="time"]').value = new Date().toLocaleString();

    formLoading.style.display = 'block';
    formSuccess.style.display = 'none';

    emailjs.sendForm('service_fii4zfx', 'template_4fy0mdk', '#contactForm')
      .then(function () {
        formLoading.style.display = 'none';
        formSuccess.style.display = 'block';
        formSuccess.style.color   = '#4ade80'; // green, visible on dark bg
        formSuccess.textContent   = '✓ Message sent successfully!';
        form.reset();
      })
      .catch(function (err) {
        formLoading.style.display = 'none';
        formSuccess.style.display = 'block';
        formSuccess.style.color   = 'var(--accent)'; // red-orange
        formSuccess.textContent   = '✕ Failed to send. Please try again.';
        console.error('EmailJS error:', err);
      });
  });

  // Clear success message on any input
  [nameInput, emailInput, titleInput, messageInput].forEach(function (input) {
    input.addEventListener('input', function () {
      formSuccess.style.display = 'none';
    });
  });
})();
