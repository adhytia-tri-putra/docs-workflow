const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('#navigation');

menuButton.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

navigation.addEventListener('click', () => {
  navigation.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
});

document.querySelectorAll('.copy-button').forEach((button) => {
  button.addEventListener('click', async () => {
    const code = button.parentElement.querySelector('code').textContent;
    await navigator.clipboard.writeText(code);
    button.textContent = 'Tersalin';
    setTimeout(() => { button.textContent = 'Salin'; }, 1400);
  });
});

const sidebarLinks = [...document.querySelectorAll('.sidebar a')];
const sections = sidebarLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    sidebarLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
    });
  });
}, { rootMargin: '-20% 0px -70%' });

sections.forEach((section) => observer.observe(section));
