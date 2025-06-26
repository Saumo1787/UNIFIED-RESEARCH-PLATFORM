// Client-side login handling for SignIn.html

document.addEventListener('DOMContentLoaded', function () {
  const signinForm = document.getElementById('signinForm');

  signinForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    if (!email || !password) {
      alert('Please enter both email and password.');
      return;
    }

    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        alert('Invalid email or password.');
        return;
      }

      const data = await response.json();
      const token = data.token;

      // Store token in localStorage
      localStorage.setItem('token', token);

      // Redirect to index or dashboard
      window.location.href = 'index.html';

    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred during login. Please try again.');
    }
  });
});
