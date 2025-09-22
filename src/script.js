// WhatsApp numbers for different regions
const whatsappNumbers = {
  norte: "5585999989851", 
  sul: "5515991875145",
};

// Open region selection modal
function openRegionModal() {
  document.getElementById("regionModal").classList.add("active");
  document.body.style.overflow = "hidden";

  // Track event
  if (typeof gtag !== "undefined") {
    gtag("event", "region_modal_open", {
      event_category: "engagement",
      event_label: "region_selection",
    });
  }
}

// Close region selection modal
function closeRegionModal() {
  document.getElementById("regionModal").classList.remove("active");
  document.body.style.overflow = "auto";
}

// WhatsApp function with region
function openWhatsApp(region, message) {
  const phone = whatsappNumbers[region];
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");

  // Close modal
  closeRegionModal();

  // Track event
  if (typeof gtag !== "undefined") {
    gtag("event", "whatsapp_click", {
      event_category: "engagement",
      event_label: `whatsapp_${region}`,
      region: region,
    });
  }
}

// Close modal when clicking outside
document.getElementById("regionModal").addEventListener("click", function (e) {
  if (e.target === this) {
    closeRegionModal();
  }
});

// Close modal with Escape key
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeRegionModal();
  }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// Intersection Observer for animations
const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe elements for scroll animations
document
  .querySelectorAll(".card, .coverage-item, .partner-card")
  .forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });

// Show WhatsApp button after 3 seconds
setTimeout(() => {
  document.querySelector(".whatsapp-btn").style.display = "flex";
}, 3000);

// Google Analytics (replace with your tracking ID)
window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
gtag("js", new Date());
gtag("config", "GA_MEASUREMENT_ID");

// Track button clicks
document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    if (typeof gtag !== "undefined") {
      gtag("event", "button_click", {
        event_category: "engagement",
        event_label: this.textContent.trim(),
      });
    }
  });
});

// Performance optimization
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => console.log("SW registered"))
      .catch((err) => console.log("SW registration failed"));
  });
}
