document.addEventListener("DOMContentLoaded", () => {
    loadInitialData();
});

function loadInitialData() {
    const researchList = document.getElementById("research-list");
    researchList.innerHTML = `
        <div class="card">AI in Healthcare - Status: Ongoing</div>
        <div class="card">Smart City Optimization - Status: Completed</div>
    `;

    const iprList = document.getElementById("ipr-list");
    iprList.innerHTML = `<li>Patent on Smart Irrigation - Filed</li>`;

    const innovationFeed = document.getElementById("innovation-feed");
    innovationFeed.innerHTML = `<div class="card">Solar-powered delivery drone</div>`;

    const startupList = document.getElementById("startup-list");
    startupList.innerHTML = `<div class="card"><strong>GreenTech</strong><br>AI-based eco solutions</div>`;
}

function addResearchProject() {
    const projectTitle = prompt("Enter research project title:");
    if (projectTitle) {
        const newCard = document.createElement("div");
        newCard.className = "card";
        newCard.textContent = `${projectTitle} - Status: Proposed`;
        document.getElementById("research-list").appendChild(newCard);
    }
}

function addIPR() {
    const iprTitle = document.getElementById("ipr-input").value.trim();
    if (iprTitle) {
        const li = document.createElement("li");
        li.textContent = `${iprTitle} - Submitted`;
        document.getElementById("ipr-list").appendChild(li);
        document.getElementById("ipr-input").value = "";
    }
}

function submitInnovation() {
    const idea = document.getElementById("innovation-input").value.trim();
    if (idea) {
        const div = document.createElement("div");
        div.className = "card";
        div.textContent = idea;
        document.getElementById("innovation-feed").appendChild(div);
        document.getElementById("innovation-input").value = "";
    }
}

function addStartup() {
    const name = document.getElementById("startup-name").value.trim();
    const desc = document.getElementById("startup-desc").value.trim();
    if (name && desc) {
        const div = document.createElement("div");
        div.className = "card";
        div.innerHTML = `<strong>${name}</strong><br>${desc}`;
        document.getElementById("startup-list").appendChild(div);
        document.getElementById("startup-name").value = "";
        document.getElementById("startup-desc").value = "";
    }
}
function toggleMenu() {
    const menu = document.getElementById("popupMenu");
    menu.style.display = menu.style.display === "flex" ? "none" : "flex";
  }
  
  document.addEventListener("click", function (event) {
    const menu = document.getElementById("popupMenu");
    const toggle = document.querySelector(".menu-toggle");
  
    if (!toggle.contains(event.target) && !menu.contains(event.target)) {
      menu.style.display = "none";
    }
  });
  // Trigger animations on scroll
window.addEventListener("scroll", () => {
    document.querySelectorAll(".panel").forEach((panel, index) => {
      const pos = panel.getBoundingClientRect().top;
      if (pos < window.innerHeight - 150) {
        panel.style.opacity = 1;
        panel.style.transform = "translateY(0)";
      }
    });
  });
  
  // Flickering geo-square color (extra feel)
  setInterval(() => {
    document.querySelector(".geo-square").style.boxShadow =
      Math.random() > 0.5
        ? "0 0 1rem var(--yellow)"
        : "0 0 1rem var(--light-yellow)";
  }, 1500);
  
  // Toggle the popup menu visibility
function toggleMenu() {
    const menu = document.getElementById('popupMenu');
    // Toggle between display: flex and display: none
    menu.style.display = (menu.style.display === 'flex') ? 'none' : 'flex';
  }
  