document.addEventListener("DOMContentLoaded", function () {
  // === Mobile Navigation ===
  const navToggle = document.getElementById("navToggle");
  const mainNav = document.getElementById("mainNav");

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", () => {
      mainNav.classList.toggle("open");
    });
  }

  // === Contact Form Handling ===
  const contactForm = document.getElementById("contactForm");
  const statusEl = document.getElementById("contactStatus");
  const submitBtn = document.getElementById("contactSubmit");

  if (contactForm && statusEl && submitBtn && window.emailjs) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      if (!name || !email || !message) {
        statusEl.textContent = "Please fill in all fields.";
        return;
      }

      submitBtn.disabled = true;
      statusEl.textContent = "Sending...";

      // Only send the variables defined in your template
      const params = {
        name: name,
        email: email
      };

      emailjs
        .send("service_781v238", "template_5bdrc5v", params)
        .then(function () {
          statusEl.textContent = "Thank you! Your message has been sent.";
          contactForm.reset();
        })
        .catch(function (error) {
          console.error("EmailJS error:", error);
          statusEl.textContent =
            "Sorry, there was a problem sending your message.";
        })
        .finally(function () {
          submitBtn.disabled = false;
        });
    });
  }
});
