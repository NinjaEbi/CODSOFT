const form = document.getElementById("signupForm");
const errorMsg = document.getElementById("error");
const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("passwordInput");
const darkModeToggle = document.getElementById("darkModeToggle");

function applyTheme() {
  const theme = localStorage.getItem("theme");
  if (theme === "dark") {
    document.body.classList.add("dark");
    if (darkModeToggle) darkModeToggle.textContent = "🌞";
  } else {
    document.body.classList.remove("dark");
    if (darkModeToggle) darkModeToggle.textContent = "🌙";
  }
}

if (darkModeToggle) {
  darkModeToggle.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    darkModeToggle.textContent = isDark ? "🌞" : "🌙";
  });
}

applyTheme();



// Signup
if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const password = passwordInput.value.trim();

    if (!name || !email || !password) {
      errorMsg.classList.remove("hidden");
      return;
    }

    localStorage.setItem("signupName", name);
    localStorage.setItem("signupEmail", email);
    localStorage.setItem("signupPassword", password);

    window.location.href = "success.html";
  });
}

// Login
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const storedEmail = localStorage.getItem("signupEmail");
    const storedPassword = localStorage.getItem("signupPassword");

    if (email === storedEmail && password === storedPassword) {
      window.location.href = "dashboard.html";
    } else {
      document.getElementById("loginError").classList.remove("hidden");
    }
  });
}
