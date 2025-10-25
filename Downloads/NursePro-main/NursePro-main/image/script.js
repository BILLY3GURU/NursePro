// ===== Smooth Scroll for Navbar Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
  });
});

// ===== Testimonials Auto-Slider =====
let currentTestimonial = 0;
const testimonials = document.querySelectorAll(".testimonial");

function showTestimonial(index) {
  testimonials.forEach((t, i) => t.classList.remove("active"));
  testimonials[index].classList.add("active");
}

function nextTestimonial() {
  currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  showTestimonial(currentTestimonial);
}

// Start testimonial slider
if (testimonials.length > 0) {
  showTestimonial(currentTestimonial);
  setInterval(nextTestimonial, 5000); // every 5 seconds
}

// ===== Contact Form Validation =====
const form = document.querySelector(".contact form");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = form.querySelector("input[placeholder='Your Name']");
    const email = form.querySelector("input[placeholder='Your Email']");
    const message = form.querySelector("textarea[placeholder='Your Message']");

    if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!email.value.match(emailPattern)) {
      alert("Please enter a valid email address.");
      return;
    }

    alert("Thank you! Your message has been sent.");
    form.reset();
  });
}

// ===== Stats Animation =====
const counters = document.querySelectorAll(".stat-card h3");
const speed = 200;

counters.forEach(counter => {
  const animate = () => {
    const value = +counter.getAttribute("data-target");
    const current = +counter.innerText.replace(/\D/g,'');
    const increment = Math.ceil(value / speed);

    if (current < value) {
      counter.innerText = `${current + increment}+`;
      setTimeout(animate, 20);
    } else {
      counter.innerText = `${value}+`;
    }
  };
  animate();
});

// ===== Blog Slider =====
const blogSlides = document.querySelectorAll(".blog-slide");
const blogDotsContainer = document.querySelector(".slider-dots");

let currentBlog = 0;

// Create dots for blogs
blogSlides.forEach((_, i) => {
  const dot = document.createElement("span");
  dot.addEventListener("click", () => showBlogSlide(i));
  blogDotsContainer.appendChild(dot);
});

const blogDots = document.querySelectorAll(".slider-dots span");
if(blogDots.length > 0) blogDots[0].classList.add("active");

function showBlogSlide(index) {
  blogSlides.forEach(slide => slide.classList.remove("active"));
  blogDots.forEach(dot => dot.classList.remove("active"));
  blogSlides[index].classList.add("active");
  blogDots[index].classList.add("active");
  currentBlog = index;
}

// Start auto slide for blogs
if(blogSlides.length > 0) {
  showBlogSlide(currentBlog);
  setInterval(() => {
    currentBlog = (currentBlog + 1) % blogSlides.length;
    showBlogSlide(currentBlog);
  }, 5000);
}
