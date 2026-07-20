const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const standardFooterMarkup = `
  <div class="container footer-grid">
    <div class="footer-column">
      <h3 class="footer-brand"><span aria-hidden="true">💚</span> MediTrack</h3>
      <div class="footer-links">
        <h4>Quick Links</h4>
        <a href="index.html">Home</a>
        <a href="about.html">About</a>
        <a href="learn.html">Learn</a>
        <a href="medication.html">Medication</a>
        <a href="tips.html">Tips</a>
      </div>
    </div>
    <div class="footer-column footer-resources">
      <h4>Resources</h4>
      <a href="faq.html">FAQ</a>
      <a href="resources.html">Trusted Sources</a>
      <a href="contact.html">Contact</a>
    </div>
  </div>
  <p class="copyright">© 2026 MediTrack. All rights reserved.</p>
`;

document.querySelectorAll('.site-footer').forEach((footer) => {
  footer.innerHTML = standardFooterMarkup;
});
const imageDirectory = 'imgs/';
const teamMembers = [
  { name: 'Beauty Maposa', image: 'student1.jpg' },
  { name: 'Nakisani Ditshameko', image: 'student2.jpg' },
  { name: 'Gontse Motsumi', image: 'student3.jfif' },
  { name: 'Olgah Ratlhogo', image: 'student4.jpg' },
  { name: 'Arona Allison Sebidile', image: 'student5.jpg' },
  { name: 'Emmanuel Samuel', image: 'student6.jpg' },
  { name: 'Karabo Dubekile', image: 'student7.jpg' },
  { name: 'Gomolemo Rantshoke', image: 'student8.jpg' },
  { name: 'Hope Nguasena', image: 'student9.jpg' },
  { name: 'Losika Bone Buti', image: 'student10.jpg' },
];

const teamGrid = document.querySelector('#team-grid');
if (teamGrid) {
  teamGrid.innerHTML = teamMembers.map(({ name, image }) => `
    <article class="team-card">
      <img width="300" height="200" loading="lazy" src="${imageDirectory}${image}" alt="${name}" class="team-img" />
      <h3>${name}</h3>
    </article>
  `).join('');
}

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
