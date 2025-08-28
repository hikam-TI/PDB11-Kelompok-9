// ===== Mobile menu toggle =====
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
menuBtn?.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));

// Close mobile menu after click
mobileMenu?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => mobileMenu.classList.add('hidden'));
});

// ===== Smooth reveal on scroll =====
const revealEls = document.querySelectorAll('.reveal-up');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target); } });
}, { threshold: .18, rootMargin: '0px 0px -60px 0px' });
revealEls.forEach(el => io.observe(el));

// ===== Parallax effect (hero image) =====
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!prefersReduced){
  const parallaxEls = document.querySelectorAll('.parallax');
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    parallaxEls.forEach(el => {
      const speed = parseFloat(el.dataset.parallaxSpeed || '0.2');
      el.style.transform = `translate3d(0, ${y * speed * 0.5}px, 0)`;
    });
  }, { passive: true });
}

// ===== Order buttons -> WhatsApp =====
const WA_NUMBER = '6282230425429';
document.querySelectorAll('.order-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const name = btn.getAttribute('data-name') || 'Tahu Walik';
    const price = btn.getAttribute('data-price') || '';
    const msg = `Halo, saya mau pesan ${name} (${price}). Apakah tersedia hari ini?`;
    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  });
});

// ===== Swiper (testimonial slider) =====
const swiper = new Swiper('.mySwiper', {
  loop: true,
  effect: 'fade',
  autoplay: { delay: 3500, disableOnInteraction: false },
  pagination: { el: '.swiper-pagination', clickable: true },
});

// ===== Active nav link on scroll =====
const sections = ['home','menu','testimonial','contact'].map(id => document.getElementById(id));
const navLinks = document.querySelectorAll('.nav-link');
const setActive = () => {
  let current = 'home';
  const scrollPos = window.scrollY + 120;
  sections.forEach(sec => {
    if (sec && scrollPos >= sec.offsetTop) current = sec.id;
  });
  navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${current}`));
};
setActive(); window.addEventListener('scroll', setActive, { passive: true });
