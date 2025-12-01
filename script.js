// Simple mobile navigation toggle
document.addEventListener("DOMContentLoaded", function () {
  const navToggle = document.getElementById("navToggle");
  const mainNav = document.getElementById("mainNav");

  if (!navToggle || !mainNav) return;

  navToggle.addEventListener("click", () => {
    mainNav.classList.toggle("open");
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const navToggle = document.getElementById("navToggle");
  const mainNav = document.getElementById("mainNav");

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", () => {
      mainNav.classList.toggle("open");
    });
  }

  // === Contact form email sending ===
  const contactForm = document.getElementById("contactForm");
  const statusEl = document.getElementById("contactStatus");
  const submitBtn = document.getElementById("contactSubmit");

  if (contactForm && statusEl && submitBtn && window.emailjs) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();
      const sendCopy = document.getElementById("sendCopy").checked;

      if (!name || !email || !message) {
        statusEl.textContent = "Please fill in all fields.";
        return;
      }

      submitBtn.disabled = true;
      statusEl.textContent = "Sending...";

      // Params for your email (to you)
      const ownerParams = {
        from_name: name,
        from_email: email,
        message: message,
        send_copy: sendCopy ? "Yes" : "No",
        user_email: email
      };

      // 1) Send email to you
      emailjs
        .send("service_781v238", "template_5bdrc5v", ownerParams)
        .then(function () {
          // 2) Optionally send copy to user
          if (sendCopy) {
            const userParams = {
              from_name: name,
              from_email: email,
              message: message,
              user_email: email
            };

            return emailjs.send(
              "service_781v238",
              "template_5bdrc5v",
              userParams
            );
          }
        })
        .then(function () {
          statusEl.textContent =
            "Thank you! Your message has been sent.";
          contactForm.reset();
        })
        .catch(function (error) {
          console.error("EmailJS error:", error);
          statusEl.textContent =
            "Sorry, there was a problem sending your message. Please try again later.";
        })
        .finally(function () {
          submitBtn.disabled = false;
        });
    });
  }
});

