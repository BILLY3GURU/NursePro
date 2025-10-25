// Hamburger toggle for mobile
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

if (hamburger && navLinks) {
  hamburger.setAttribute("aria-expanded", "false");
  hamburger.setAttribute("aria-controls", "primary-navigation");
  navLinks.setAttribute("id", "primary-navigation");

  hamburger.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("active");
    hamburger.classList.toggle("active", isOpen);
    hamburger.setAttribute("aria-expanded", String(isOpen));
  });
}

// Dropdown toggle for mobile
const dropdownParents = document.querySelectorAll(".nav-links ul li");

dropdownParents.forEach((parent) => {
  const dropdown = parent.querySelector(".dropdown");
  if (dropdown) {
    parent.addEventListener("click", (e) => {
      const target = e.target;
      if (
        target &&
        target.tagName === "A" &&
        target.nextElementSibling === dropdown
      ) {
        e.preventDefault();
        // Close other open dropdowns on mobile for a cleaner experience
        if (window.matchMedia("(max-width: 768px)").matches) {
          parent.parentElement
            .querySelectorAll(".dropdown.show")
            .forEach((openEl) => {
              if (openEl !== dropdown) openEl.classList.remove("show");
            });
        }
        dropdown.classList.toggle("show");
      }
    });
  }
});

// Blog slider functionality
const slides = document.querySelectorAll(".blog-slide");
const dotsContainer = document.querySelector(".slider-dots");

let currentIndex = 0;

// Create dots based on number of slides
slides.forEach((_, index) => {
  const dot = document.createElement("div");
  dot.classList.add("dot");
  if (index === 0) dot.classList.add("active");
  dot.addEventListener("click", () => {
    goToSlide(index);
    resetAutoSlide();
  });
  dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll(".dot");

function goToSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
    dots[i].classList.toggle("active", i === index);
  });
  currentIndex = index;
}

// Auto slide every 5 seconds
let slideInterval = setInterval(nextSlide, 5000);

function nextSlide() {
  let nextIndex = (currentIndex + 1) % slides.length;
  goToSlide(nextIndex);
}

function resetAutoSlide() {
  clearInterval(slideInterval);
  slideInterval = setInterval(nextSlide, 5000);
}

// API Base URL
const API_BASE_URL = "http://localhost:3000/api";

// Fetch and display testimonials
async function fetchTestimonials() {
  try {
    const response = await fetch(`${API_BASE_URL}/testimonials`);
    if (!response.ok) throw new Error("Failed to fetch testimonials");
    const testimonials = await response.json();
    displayTestimonials(testimonials);
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    // Fallback to static content if API fails
  }
}

function displayTestimonials(testimonials) {
  const container = document.querySelector(".testimonial-container");
  if (!container) return;
  container.innerHTML = "";
  testimonials.forEach((testimonial) => {
    const card = document.createElement("div");
    card.className = "testimonial-card";
    const ratingStars =
      "★".repeat(testimonial.rating || 5) +
      "☆".repeat(5 - (testimonial.rating || 5));
    card.innerHTML = `
      <img src="image/stud1.jpg" alt="${testimonial.client_name}" class="testimonial-img">
      <p>"${testimonial.content}"</p>
      <div class="rating">${ratingStars}</div>
      <h4>- ${testimonial.client_name}, <span>Student</span></h4>
    `;
    container.appendChild(card);
  });
}

// Fetch and display services
async function fetchServices() {
  try {
    const response = await fetch(`${API_BASE_URL}/services`);
    if (!response.ok) throw new Error("Failed to fetch services");
    const services = await response.json();
    displayServices(services);
  } catch (error) {
    console.error("Error fetching services:", error);
    // Fallback to static content if API fails
  }
}

function displayServices(services) {
  const container = document.querySelector(".core-services-container");
  if (!container) return;
  container.innerHTML = "";
  services.forEach((service) => {
    const card = document.createElement("div");
    card.className = "core-service-card";
    card.innerHTML = `
      <div class="core-card-inner">
        <div class="core-card-front">
          <h3>${service.title}</h3>
        </div>
        <div class="core-card-back">
          <p>${service.description}</p>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  fetchTestimonials();
  fetchServices();
});
