
  
  // Function to dynamically add a new research project
  function addResearchProject() {
    const projectTitle = prompt("Enter research project title:");
    if (projectTitle) {
      const newCard = document.createElement("div");
      newCard.className = "card";
      newCard.textContent = `${projectTitle} - Status: Proposed`;
      document.getElementById("research-list").appendChild(newCard);
      
      // Update Dashboard Statistics after adding a new research project
      updateDashboardStatistics(1);  // Increase total research count by 1
  }
  
  // Function to update the dashboard statistics
  function updateDashboardStatistics(increaseBy) {
    const totalResearchCountElement = document.querySelector(".count-up[data-type='research']");
    const newCount = parseInt(totalResearchCountElement.textContent) + increaseBy;
    totalResearchCountElement.textContent = newCount;
    
    // Optionally update the pie chart data dynamically if needed
    statsPieChart.data.datasets[0].data[0] = newCount;  // Update Research Projects in the pie chart
    statsPieChart.update();  // Re-render the pie chart with updated data
  }
  }  
  document.addEventListener("DOMContentLoaded", () => {
    const ctx = document.getElementById('researchPieChart').getContext('2d');
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['AI & ML', 'Sustainability', 'Healthcare', 'Cybersecurity', 'Architecture'],
        datasets: [{
          label: 'Research Areas',
          data: [25, 20, 15, 30, 10],
          backgroundColor: [
            '#6A67CE',
            '#42C2FF',
            '#60D394',
            '#F2BE22',
            '#FF595E'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'right',
            labels: {
              color: '#333',
              font: {
                size: 14
              }
            }
          },
          title: {
            display: true,
            text: 'Research Domain Distribution',
            color: '#444',
            font: {
              size: 18,
              weight: 'bold'
            }
          }
        }
      }
    });
  });
  