let slideIndex = 0;
showSlides();

function showSlides() {
    let slides = document.getElementsByClassName("carousel-slide");
    let dots = document.getElementsByClassName("dot");

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    slideIndex++;

    if (slideIndex > slides.length) { slideIndex = 1 }

    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove("active");
    }

    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].classList.add("active");

    setTimeout(showSlides, 3000); // Change slide every 3 seconds
}

document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");
  const statusEl = document.getElementById("contactStatus");
  const submitBtn = document.getElementById("contactSubmit");

  if (contactForm) {
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

      const ownerParams = {
        name: name,
        email: email,
        message: message
      };

      emailjs
        .send("service_781v238", "template_x2rcb97", ownerParams)
        .then(() => {
          // 2️⃣ Send acknowledgement to USER
          const replyParams = {
            name: name,
            email: email
          };

          return emailjs.send(
            "service_781v238",
            "template_5bdrc5v",
            replyParams
          );
        })
        .then(() => {
          statusEl.textContent = "Your message has been sent successfully.";
          contactForm.reset();
        })
        .catch((err) => {
          console.error("EmailJS Error:", err);
          statusEl.textContent =
            "Error sending message. Please try again later.";
        })
        .finally(() => {
          submitBtn.disabled = false;
        });
    });
  }
});
