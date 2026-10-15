// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Index-with-preview: selecting a service row drives the preview photo,
// the mobile inline image, and prefills the quote form.
const serviceRows = document.querySelectorAll('.service-row');
const previewImgs = document.querySelectorAll('.ticket-preview-frame img');
const previewLabel = document.getElementById('previewLabel');
const messageField = document.getElementById('message');

function activateRow(row) {
  serviceRows.forEach((r) => {
    const isTarget = r === row;
    r.classList.toggle('is-active', isTarget);
    r.querySelector('.service-row-btn').setAttribute('aria-expanded', String(isTarget));
  });

  const path = row.dataset.image;
  previewImgs.forEach((img) => img.classList.toggle('is-on', img.getAttribute('src') === path));
  if (previewLabel) previewLabel.innerHTML = row.dataset.label;

  if (messageField && !messageField.value) {
    messageField.placeholder = `Tell us about your ${row.querySelector('h3').textContent.toLowerCase()} job…`;
  }
}

serviceRows.forEach((row) => {
  const btn = row.querySelector('.service-row-btn');
  btn.addEventListener('click', () => activateRow(row));
  btn.addEventListener('focus', () => activateRow(row));
});

// Scroll reveal
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          obs.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '0px 0px -12% 0px', threshold: 0.1 }
  );
  document.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el));
} else {
  document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-in'));
}

// Honest contact form handler — no backend yet, no fabricated success state
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const note = contactForm.querySelector('.form-note');
  note.innerHTML = 'This form isn&rsquo;t connected yet. Please call <a href="tel:+17022340745">(702) 234-0745</a> so we can help right away.';
});
