const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");
const dropdownLinks = document.querySelectorAll(".has-dropdown > a");
const navLinks = document.querySelectorAll(".nav-links a");

// Toggle menu
hamburger.addEventListener("click", (e) => {
  e.stopPropagation();
  navMenu.classList.toggle("active");
  hamburger.classList.toggle("active");
});

// Dropdowns on mobile
dropdownLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    if (window.innerWidth <= 992) {
      e.preventDefault();
      link.parentElement.classList.toggle("active");
    }
  });
});

// Close when clicking a link
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    closeMenu();
  });
});

// Click outside to close
document.addEventListener("click", (e) => {
  if (
    navMenu.classList.contains("active") &&
    !navMenu.contains(e.target) &&
    !hamburger.contains(e.target)
  ) {
    closeMenu();
  }
});

// ESC key closes menu
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeMenu();
  }
});

function closeMenu() {
  navMenu.classList.remove("active");
  hamburger.classList.remove("active");

  // Close all dropdowns
  document.querySelectorAll(".has-dropdown").forEach(item => {
    item.classList.remove("active");
  });
}




const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
const nextBtn = document.querySelector(".carousel-btn.next");
const prevBtn = document.querySelector(".carousel-btn.prev");

let currentSlide = 0;
let autoSlideInterval = setInterval(nextSlide, 3000);

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
    dots[i].classList.toggle("active", i === index);
  });
  currentSlide = index;
}

function nextSlide() {
  let index = (currentSlide + 1) % slides.length;
  showSlide(index);
}

function prevSlide() {
  let index = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(index);
}

nextBtn.addEventListener("click", () => {
  nextSlide();
  resetAutoSlide();
});

prevBtn.addEventListener("click", () => {
  prevSlide();
  resetAutoSlide();
});

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    showSlide(index);
    resetAutoSlide();
  });
});

function resetAutoSlide() {
  clearInterval(autoSlideInterval);
  autoSlideInterval = setInterval(nextSlide, 3000);
}





(() => {
  const track = document.getElementById("productsTrack");
  const wrapper = document.getElementById("productsWrapper");
  const prev = document.getElementById("productPrev");
  const next = document.getElementById("productNext");

  if (!track) return;

  let index = 0;
  const cardWidth = 328;
  const visible = 4;
  const total = track.children.length;

  function move() {
    track.style.transform = `translateX(-${index * cardWidth}px)`;
  }

  next?.addEventListener("click", () => {
    index = index < total - visible ? index + 1 : 0;
    move();
  });

  prev?.addEventListener("click", () => {
    index = index > 0 ? index - 1 : total - visible;
    move();
  });

  // Auto slide
  setInterval(() => next?.click(), 3500);

  // Mobile swipe
  let startX = 0;

  wrapper.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
  });

  wrapper.addEventListener("touchend", e => {
    const endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) next?.click();
    if (endX - startX > 50) prev?.click();
  });
})();






(() => {
  const counters = document.querySelectorAll(".stat-item h2");
  const section = document.querySelector(".stats-section");

  if (!section || counters.length === 0) return;

  const animateCount = (el) => {
    const target = +el.getAttribute("data-target");
    const duration = 1800; // ms
    const startTime = performance.now();

    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const value = Math.floor(progress * target);

      el.textContent = value.toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target.toLocaleString();
      }
    };

    requestAnimationFrame(update);
  };

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          counters.forEach(counter => animateCount(counter));
          obs.disconnect(); // run once only
        }
      });
    },
    { threshold: 0.4 }
  );

  observer.observe(section);
})();






