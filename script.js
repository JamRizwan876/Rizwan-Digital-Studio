
// Mobile Navigation
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", function () {
  navLinks.classList.toggle("active");
});

// Close menu after clicking a link
document.querySelectorAll(".nav-links a").forEach(function(link) {
  link.addEventListener("click", function() {
    navLinks.classList.remove("active");
  });
});

// Automatic copyright year
document.getElementById("year").textContent =
  new Date().getFullYear();

// Portfolio Project Filtering

const filterButtons = document.querySelectorAll(".filter-btn");

const projectCards = document.querySelectorAll(
  ".portfolio-grid .project-card"
);

filterButtons.forEach(function(button) {

  button.addEventListener("click", function() {

    // Remove active class
    filterButtons.forEach(function(btn) {
      btn.classList.remove("active");
    });

    // Add active class
    button.classList.add("active");

    const filterValue = button.dataset.filter;

    projectCards.forEach(function(card) {

      const category = card.dataset.category;

      if (filterValue === "all" || category === filterValue) {
        card.classList.remove("hidden");
      } else {
        card.classList.add("hidden");
      }

    });

  });

});

// Contact Form - WhatsApp Order
const orderForm = document.getElementById("orderForm");

if (orderForm) {
    const params = new URLSearchParams(window.location.search);

    const serviceField = document.getElementById("service");

    if (params.get("service")) {
        serviceField.value = params.get("service");
    }

    orderForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const formData = new FormData(orderForm);

        const name = formData.get("name");
        const email = formData.get("email");
        const phone = formData.get("phone");
        const service = formData.get("service");
        const budget = formData.get("budget");
        const message = formData.get("message");

        const whatsappMessage =
`New Website Order - Rizwan Digital Studio

Name: ${name}
Email: ${email}
Phone: ${phone}
Website Type: ${service}
Budget: ${budget}

Project Details:
${message}`;

        const whatsappURL =
            "https://wa.me/923294705876?text=" +
            encodeURIComponent(whatsappMessage);

        window.open(whatsappURL, "_blank");
    });
}

// 1. Dark Mode
const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {
    themeToggle.addEventListener("click", function() {
        document.body.classList.toggle("dark-mode");

        const isDark = document.body.classList.contains("dark-mode");

        themeToggle.textContent = isDark ? "☀️" : "🌙";

        localStorage.setItem("websiteTheme", isDark ? "dark" : "light");
    });

    if (localStorage.getItem("websiteTheme") === "dark") {
        document.body.classList.add("dark-mode");
        themeToggle.textContent = "☀️";
    }
}

// 2. Back To Top
const backToTop = document.getElementById("backToTop");

if (backToTop) {
    window.addEventListener("scroll", function() {
        backToTop.style.display =
            window.scrollY > 300 ? "block" : "none";
    });

    backToTop.addEventListener("click", function() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

// 3. Website Search
const searchBtn = document.getElementById("searchBtn");

if (searchBtn) {
    searchBtn.addEventListener("click", function() {
        const searchInput = document.getElementById("siteSearch");
        const searchMessage = document.getElementById("searchMessage");

        const query = searchInput.value.trim().toLowerCase();

        const pages = [
            { name: "Home", url: "index.html", keywords: "home" },
            { name: "About", url: "about.html", keywords: "about us" },
            { name: "Services", url: "services.html", keywords: "services website development seo" },
            { name: "Portfolio", url: "portfolio.html", keywords: "portfolio projects work" },
            { name: "Pricing", url: "pricing.html", keywords: "pricing price packages budget" },
            { name: "Blog", url: "blog.html", keywords: "blog articles seo tips" },
            { name: "Contact", url: "contact.html", keywords: "contact order booking" }
        ];

        const result = pages.find(function(page) {
            return page.name.toLowerCase().includes(query) ||
                   page.keywords.includes(query);
        });

        if (result && query !== "") {
            window.location.href = result.url;
        } else {
            searchMessage.textContent = "No matching page found. Try another word.";
        }
    });
}
