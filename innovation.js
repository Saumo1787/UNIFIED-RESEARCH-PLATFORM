// Sample data for innovations (can be fetched from backend)
let sampleInventions = [
    {
      title: "Smart Irrigation System",
      bg: "url('https://source.unsplash.com/featured/?irrigation,smart')",
      author: "Aritra Sen",
      date: "2024-10-11",
      domain: "AgriTech",
      team: "Team AquaGrow"
    },
    {
      title: "AI-Powered Drone",
      bg: "url('https://source.unsplash.com/featured/?drone,technology')",
      author: "Nisha Roy",
      date: "2024-11-05",
      domain: "Aerospace",
      team: "FlyAI"
    },
    {
      title: "Plastic Waste to Fuel",
      bg: "url('https://source.unsplash.com/featured/?plastic,recycle')",
      author: "Sourav Mukherjee",
      date: "2024-09-28",
      domain: "Green Energy",
      team: "EcoInnovators"
    },
    {
      title: "Portable Water Purifier",
      bg: "url('https://source.unsplash.com/featured/?water,purifier')",
      author: "Priya Das",
      date: "2024-08-19",
      domain: "HealthTech",
      team: "CleanStream"
    },
    {
      title: "AI Legal Assistant",
      bg: "url('https://source.unsplash.com/featured/?law,AI')",
      author: "Ravi Malhotra",
      date: "2024-12-01",
      domain: "LegalTech",
      team: "JusticeBot"
    },
    {
      title: "Bionic Arm with Sensors",
      bg: "url('https://source.unsplash.com/featured/?bionic,prosthetics')",
      author: "Swati Singh",
      date: "2025-01-15",
      domain: "Biomechanics",
      team: "BioBotics"
    }
  ];
  
  // Pagination variables
  let currentPage = 1;
  const cardsPerPage = 3;
  
  // Render invention cards
  function renderCards() {
    const container = document.getElementById("inventionSection");
    container.innerHTML = "";
    const start = (currentPage - 1) * cardsPerPage;
    const end = start + cardsPerPage;
    const pageItems = sampleInventions.slice(start, end);
  
    pageItems.forEach((inv, index) => {
      const card = document.createElement("div");
      card.className = "invention-card";
      card.style.backgroundImage = inv.bg;
      card.onclick = () => openModal(inv);
  
      const overlay = document.createElement("div");
      overlay.className = "overlay";
      overlay.innerHTML = `
        <strong>${inv.title}</strong><br>
        Author: ${inv.author}<br>
        Date: ${inv.date}<br>
        Domain: ${inv.domain}<br>
        Team: ${inv.team}
      `;
  
      card.appendChild(overlay);
      container.appendChild(card);
    });
  
    renderPagination();
  }
  
  // Render pagination
  function renderPagination() {
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = "";
    const totalPages = Math.ceil(sampleInventions.length / cardsPerPage);
  
    for (let i = 1; i <= totalPages; i++) {
      const page = document.createElement("span");
      page.textContent = i;
      if (i === currentPage) page.classList.add("active");
      page.onclick = () => {
        currentPage = i;
        renderCards();
      };
      pagination.appendChild(page);
    }
  }
  
  // Upload innovation form logic
  document.getElementById("uploadForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const title = document.getElementById("title").value;
    const bg = `url('https://source.unsplash.com/featured/?innovation,${encodeURIComponent(title)}')`;
    const author = document.getElementById("author").value;
    const date = document.getElementById("date").value;
    const domain = document.getElementById("domain").value;
    const team = document.getElementById("team").value;
  
    sampleInventions.unshift({ title, bg, author, date, domain, team });
  
    currentPage = 1;
    renderCards();
    this.reset();
  });
  
  // Theme toggle logic
  document.getElementById("themeToggle").addEventListener("click", function () {
    document.body.classList.toggle("dark-theme");
  });
  
  // Modal logic
  function openModal(inv) {
    document.getElementById("modalTitle").textContent = inv.title;
    document.getElementById("modalAuthor").textContent = inv.author;
    document.getElementById("modalDate").textContent = inv.date;
    document.getElementById("modalDomain").textContent = inv.domain;
    document.getElementById("modalTeam").textContent = inv.team;
  
    const imgUrl = inv.bg.match(/url\(['"]?(.*?)['"]?\)/)[1];
    document.getElementById("modalImage").src = imgUrl;
  
    document.getElementById("innovationModal").style.display = "flex";
  }
  
  function closeModal() {
    document.getElementById("innovationModal").style.display = "none";
  }
  // Toggle Theme Function
const themeToggleButton = document.getElementById('themeToggle');
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
  document.documentElement.setAttribute('data-theme', currentTheme);
}

// Set initial theme state
themeToggleButton.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  
  if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'light');
    themeToggleButton.classList.remove('active');
    localStorage.setItem('theme', 'light');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggleButton.classList.add('active');
    localStorage.setItem('theme', 'dark');
  }
});

  
  // Init
  renderCards();
  