let token = null;

// --- Регистрация ---
const regForm = document.getElementById('registerForm');
const regEmailInput = document.getElementById('regEmail');
const regUsernameInput = document.getElementById('regUsername');
const regPasswordInput = document.getElementById('regPassword');
const regMessage = document.getElementById('regMessage');

const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

// Валидация email при вводе
regEmailInput.addEventListener('input', () => {
  if (EMAIL_REGEXP.test(regEmailInput.value)) {
    regEmailInput.style.borderColor = 'green';
  } else {
    regEmailInput.style.borderColor = 'red';
  }
});

// Обработка формы регистрации
regForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = regUsernameInput.value.trim();
  const email = regEmailInput.value.trim();
  const password = regPasswordInput.value.trim();

  if (!EMAIL_REGEXP.test(email)) {
    regMessage.style.color = 'red';
    regMessage.textContent = 'Некорректный email';
    return;
  }

  const res = await fetch('/api/users/register', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ username, email, password }),
  });

  const data = await res.json();

  if (res.ok) {
    regMessage.style.color = 'green';
    regMessage.textContent = 'Регистрация успешна!';
  } else {
    regMessage.style.color = 'red';
    regMessage.textContent = data.message || 'Ошибка регистрации';
  }
});



const loginForm = document.getElementById('loginForm');
const loginEmailInput = document.getElementById('loginEmail');
const loginPasswordInput = document.getElementById('loginPassword');
const loginMessage = document.getElementById('loginMessage');

// Валидация email при вводе
loginEmailInput.addEventListener('input', () => {
  if (EMAIL_REGEXP.test(loginEmailInput.value)) {
    loginEmailInput.style.borderColor = 'green';
  } else {
    loginEmailInput.style.borderColor = 'red';
  }
});

// Обработка формы логина
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = loginEmailInput.value.trim();
  const password = loginPasswordInput.value.trim();

  if (!EMAIL_REGEXP.test(email)) {
    loginMessage.style.color = 'red';
    loginMessage.textContent = 'Некорректный email';
    return;
  }

  const res = await fetch('/api/users/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (res.ok) {
    loginMessage.style.color = 'green';
    loginMessage.textContent = 'Вход успешен!';
    localStorage.setItem('token', data.token);
  } else {
    loginMessage.style.color = 'red';
    loginMessage.textContent = data.message || 'Ошибка входа';
  }
});
