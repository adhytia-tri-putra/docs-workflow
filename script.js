const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('#navigation');

const closeMenu = () => {
  navigation?.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
};

menuButton?.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

navigation?.addEventListener('click', closeMenu);

document.addEventListener('click', (event) => {
  if (!navigation?.contains(event.target) && !menuButton?.contains(event.target)) closeMenu();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});

const copyText = async (text) => {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.setAttribute('readonly', '');
  textArea.style.position = 'fixed';
  textArea.style.opacity = '0';
  document.body.appendChild(textArea);
  textArea.select();

  const copied = document.execCommand('copy');
  textArea.remove();
  if (!copied) throw new Error('Clipboard tidak tersedia');
};

document.querySelectorAll('.copy-button').forEach((button) => {
  button.addEventListener('click', async () => {
    const code = button.parentElement.querySelector('code')?.textContent;
    if (!code) return;

    try {
      await copyText(code);
      button.textContent = 'Tersalin';
    } catch {
      button.textContent = 'Gagal';
    }

    setTimeout(() => { button.textContent = 'Salin'; }, 1400);
  });
});

const sidebarLinks = [...document.querySelectorAll('.sidebar a')];
const sections = sidebarLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      sidebarLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
      });
    });
  }, { rootMargin: '-20% 0px -70%' });

  sections.forEach((section) => observer.observe(section));
}
