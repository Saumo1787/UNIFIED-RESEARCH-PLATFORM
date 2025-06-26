document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.getElementById('search-form');
  const featureCards = document.querySelectorAll('.feature-card');

  searchForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const query = this.query.value.toLowerCase().trim();

    featureCards.forEach(card => {
      const title = card.querySelector('h2').textContent.toLowerCase();
      const byText = card.querySelector('p strong').parentNode.textContent.toLowerCase();
      const description = card.querySelectorAll('p')[1].textContent.toLowerCase();

      if (title.includes(query) || byText.includes(query) || description.includes(query)) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  });
});
