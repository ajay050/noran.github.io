"use strict";

document.addEventListener("DOMContentLoaded", () => {
  /* ===============================
     Footer Year
  =============================== */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ===============================
     Mobile Nav Toggle
  =============================== */
  const navToggle = document.getElementById("navToggle");
  const mainNav = document.getElementById("mainNav");

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", () => {
      mainNav.classList.toggle("open");
    });

    // Optional: close menu after clicking a link (mobile UX)
    mainNav.addEventListener("click", (e) => {
      const t = e.target;
      if (t && t.classList && t.classList.contains("nav-link")) {
        mainNav.classList.remove("open");
      }
    });
  }

  /* ===============================
     Auto Highlight Active Nav Link
     (works with clean URLs)
  =============================== */
  const links = document.querySelectorAll(".main-nav .nav-link");
  const path = window.location.pathname;

  const normalize = (p) => (p.endsWith("/") ? p : p + "/");

  links.forEach((link) => {
    const href = link.getAttribute("href");
    if (!href) return;

    const isActive =
      normalize(href) === normalize(path) ||
      (href === "/" && (path === "/" || path === "/index.html"));

    link.classList.toggle("active", isActive);
  });

  /* ===============================
     Home Carousel (Auto + Manual)
  =============================== */
  const slides = document.getElementsByClassName("carousel-slide");
  const dots = document.getElementsByClassName("dot");
  const prevBtn = document.querySelector(".carousel-prev");
  const nextBtn = document.querySelector(".carousel-next");

  let slideIndex = 0;
  let carouselTimer = null;

  function hideAllSlides() {
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (let i = 0; i < dots.length; i++) {
      dots[i].classList.remove("active");
    }
  }

  function showSlide(n) {
    if (!slides.length) return;

    // wrap
    if (n >= slides.length) slideIndex = 0;
    else if (n < 0) slideIndex = slides.length - 1;
    else slideIndex = n;

    hideAllSlides();

    slides[slideIndex].style.display = "block";
    if (dots[slideIndex]) dots[slideIndex].classList.add("active");
  }

  function startCarousel() {
    if (!slides.length) return;

    // clear any old timer
    if (carouselTimer) clearTimeout(carouselTimer);

    function loop() {
      showSlide(slideIndex + 1);
      carouselTimer = setTimeout(loop, 3000);
    }

    // initial show
    showSlide(0);
    carouselTimer = setTimeout(loop, 3000);
  }

  // Manual controls (if buttons exist in HTML)
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      showSlide(slideIndex - 1);
      startCarousel(); // reset timer after manual action
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      showSlide(slideIndex + 1);
      startCarousel();
    });
  }

  // Dot click support
  if (dots.length) {
    Array.from(dots).forEach((dot, i) => {
      dot.addEventListener("click", () => {
        showSlide(i);
        startCarousel();
      });
    });
  }

  // Start only if carousel exists on the page
  if (slides.length) {
    startCarousel();
  }

  /* ===============================
     Contact Form (EmailJS)
  =============================== */
  const contactForm = document.getElementById("contactForm");
  const statusEl = document.getElementById("contactStatus");
  const submitBtn = document.getElementById("contactSubmit");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const nameEl = document.getElementById("name");
      const emailEl = document.getElementById("email");
      const messageEl = document.getElementById("message");

      const name = nameEl ? nameEl.value.trim() : "";
      const email = emailEl ? emailEl.value.trim() : "";
      const message = messageEl ? messageEl.value.trim() : "";

      if (!name || !email || !message) {
        if (statusEl) statusEl.textContent = "Please fill in all fields.";
        return;
      }

      if (submitBtn) submitBtn.disabled = true;
      if (statusEl) statusEl.textContent = "Sending...";

      const ownerParams = { name, email, message };

      // Make sure EmailJS is loaded + initialized on the contact page
      if (typeof emailjs === "undefined") {
        if (statusEl) {
          statusEl.textContent =
            "Email service not loaded. Please try again later.";
        }
        if (submitBtn) submitBtn.disabled = false;
        return;
      }

      emailjs
        .send("service_781v238", "template_x2rcb97", ownerParams)
        .then(() => {
          const replyParams = { name, email };
          return emailjs.send(
            "service_781v238",
            "template_5bdrc5v",
            replyParams
          );
        })
        .then(() => {
          if (statusEl) statusEl.textContent = "Your message has been sent successfully.";
          contactForm.reset();
        })
        .catch((err) => {
          console.error("EmailJS Error:", err);
          if (statusEl) statusEl.textContent =
            "Error sending message. Please try again later.";
        })
        .finally(() => {
          if (submitBtn) submitBtn.disabled = false;
        });
    });
  }
});
