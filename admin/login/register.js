document.getElementById('registerForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const alertBox = document.getElementById('alertBox');

  if (password !== confirmPassword) {
    alertBox.className = 'alert alert-error';
    alertBox.textContent = 'Password dan konfirmasi tidak cocok.';
    alertBox.style.display = 'block';
    return;
  }

  let admins = JSON.parse(localStorage.getItem('admins')) || [];

  const existing = admins.find(a => a.username === username);
  if (existing) {
    alertBox.className = 'alert alert-error';
    alertBox.textContent = 'Username sudah digunakan.';
    alertBox.style.display = 'block';
    return;
  }

  admins.push({ username, password });
  localStorage.setItem('admins', JSON.stringify(admins));

  alertBox.className = 'alert alert-success';
  alertBox.textContent = 'Pendaftaran berhasil! Silakan login.';
  alertBox.style.display = 'block';

  setTimeout(() => {
    window.location.href = 'login_html.html';
  }, 1500);
});
