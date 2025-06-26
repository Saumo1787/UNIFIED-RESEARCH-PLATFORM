console.log('ipr.js script loaded and running'); // Diagnostic log at top level

document.addEventListener('DOMContentLoaded', function () {
  console.log('DOMContentLoaded event fired in ipr.js'); // Diagnostic log

  const iprList = document.getElementById('iprList');
  const loginPrompt = document.getElementById('loginPrompt');
  const submitSection = document.getElementById('submit-section');
  const iprSubmissionForm = document.getElementById('iprSubmissionForm');

  // Helper to get token from localStorage
  function getToken() {
    return localStorage.getItem('token');
  }

  // Helper to create IPR card element
  function createIprCard(ipr) {
    const card = document.createElement('div');
    card.className = 'ipr-card';

    const statusClass = ipr.status === 'published' ? 'status-published' : (ipr.status === 'fileed' || ipr.status === 'filed' ? 'status-filed' : 'status-rejected');
    const statusIcon = ipr.status === 'published' ? 'fa-check-circle' : (ipr.status === 'fileed' || ipr.status === 'filed' ? 'fa-clock' : 'fa-times-circle');
    const statusText = ipr.status.charAt(0).toUpperCase() + ipr.status.slice(1);

    card.innerHTML = `
      <div class="card-header">
        <h3>${ipr.title}</h3>
        <span class="status-badge ${statusClass}"><i class="fas ${statusIcon}"></i> ${statusText}</span>
      </div>
      <p class="card-domain"><i class="fas fa-tag"></i> <strong>Domain:</strong> ${ipr.domain}</p>
      <p class="card-description">${ipr.abstract}</p>
      <div class="card-meta">
        <span><i class="fas fa-user"></i> <strong>Inventor:</strong> ${ipr.inventor}</span>
        <span><i class="fas fa-calendar-alt"></i> <strong>Filing:</strong> ${new Date(ipr.filingDate).toISOString().split('T')[0]}</span>
      </div>
      <div class="card-footer">
        <span><i class="fas fa-file-alt"></i> <strong>Patent #:</strong> ${ipr.patentNumber || 'N/A'}</span>
        <div class="card-actions">
          <button class="action-btn view-details"><i class="fas fa-eye"></i> Details</button>
          <button class="action-btn download-btn"><i class="fas fa-download"></i></button>
        </div>
      </div>
    `;
    return card;
  }

  // Fetch and render IPR cards from backend
  async function loadIprCards() {
    const token = getToken();
    if (!token) {
      iprList.innerHTML = '';
      loginPrompt.style.display = 'block';
      submitSection.style.display = 'none';
      return;
    }

    loginPrompt.style.display = 'none';
    submitSection.style.display = 'block';

    try {
      const response = await fetch('/ipr', {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch IPRs');
      }
      const iprs = await response.json();

      // Clear existing cards
      iprList.innerHTML = '';

      // Render each IPR card
      iprs.forEach(ipr => {
        const card = createIprCard(ipr);
        iprList.appendChild(card);
      });
    } catch (error) {
      console.error('Error loading IPR cards:', error);
      iprList.innerHTML = '<p>Error loading IPR cards. Please try again later.</p>';
    }
  }

  // Handle IPR submission form
  iprSubmissionForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const submissionStatus = document.getElementById('submissionStatus');
    const submitButton = iprSubmissionForm.querySelector('.btn-submit');

    console.log('IPR submission form submitted'); // Added log

    if (submissionStatus) {
      submissionStatus.textContent = '';
      submissionStatus.style.color = '';
    }
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Submitting...';
    }

    const token = getToken();
    if (!token) {
      alert('Please sign in to submit an IPR.');
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = 'Submit Application ';
      }
      return;
    }

    // Gather form data
    const title = document.getElementById('iprTitle').value.trim();
    const domain = document.getElementById('iprDomain').value;
    const abstract = document.getElementById('iprAbstract').value.trim();
    const inventor = document.getElementById('inventorName').value.trim();

    if (!title || !domain || !abstract || !inventor) {
      alert('Please fill in all required fields.');
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = 'Submit Application ';
      }
      return;
    }

    try {
      const response = await fetch('/ipr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({ title, domain, abstract, inventor })
      });

      console.log('IPR submission response status:', response.status); // Added log

      if (!response.ok) {
        throw new Error('Failed to submit IPR');
      }

      const newIpr = await response.json();

      console.log('New IPR created:', newIpr); // Added log

      // Remove creation and insertion of new IPR card as requested

      // Reset form and show success message
      iprSubmissionForm.reset();

      const submissionStatus = document.getElementById('submissionStatus');
      if (submissionStatus) {
        submissionStatus.textContent = 'IPR submitted successfully!';
        submissionStatus.style.color = 'green';
      }

      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = 'Submit Application ';
      }

      // Show success modal instead of alert
      const successModal = document.getElementById('successModal');
      if (successModal) {
        successModal.style.display = 'block';
      }

    } catch (error) {
      console.error('Error submitting IPR:', error);
      if (submissionStatus) {
        submissionStatus.textContent = 'Error submitting IPR. Please try again later.';
        submissionStatus.style.color = 'red';
      }
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = 'Submit Application ';
      }
    }
  });

  // Initial load
  loadIprCards();
});
