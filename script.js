const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

function openVideoLink(videoBox) {
  const card = videoBox.closest('.video-card');
  const watchLink = card ? card.querySelector('.watch-link') : null;
  const videoId = videoBox.dataset.videoId;
  const url = watchLink?.href || (videoId ? `https://www.youtube.com/watch?v=${videoId}` : '');

  if (!url) return;
  window.location.href = url;
}

document.querySelectorAll('.video-placeholder').forEach((videoBox) => {
  videoBox.addEventListener('click', () => openVideoLink(videoBox));
  videoBox.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openVideoLink(videoBox);
    }
  });
});

// Colourful scroll reveal animation
const revealItems = document.querySelectorAll('.mini-card, .feature-card, .info-card, .panel, .video-card, .source-card, .resources-card, .motivation-card, details');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index % 6, 5) * 70}ms`;
    revealObserver.observe(item);
  });
} else {
  revealItems.forEach((item) => item.classList.add('reveal'));
}
