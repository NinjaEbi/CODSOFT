// Theme Toggle Logic
document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('themeToggle');

  if (toggleBtn) {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark');
      toggleBtn.textContent = '☀️';
    } else {
      toggleBtn.textContent = '🌙';
    }

    toggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      const isDark = document.body.classList.contains('dark');
      toggleBtn.textContent = isDark ? '☀️' : '🌙';
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  }

  // Category filter logic (only if menu section is present)
  const categoryButtons = document.querySelectorAll('.categories button');
  const menuItems = document.querySelectorAll('.menu-items .item');

  if (categoryButtons.length && menuItems.length) {
    categoryButtons.forEach(button => {
      button.addEventListener('click', () => {
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const category = button.getAttribute('data-category');

        menuItems.forEach(item => {
          const match = category === 'all' || item.getAttribute('data-category') === category;
          item.style.display = match ? 'block' : 'none';
        });
      });
    });
  }
});
