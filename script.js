'use strict';
// Calgary observes Mountain Standard Time (UTC-7) on January 3, 2027.
const weddingTime = Date.parse('2027-01-04T01:00:00Z');
const $ = (id) => document.getElementById(id);

function updateCountdown() {
  const remaining = Math.max(0, weddingTime - Date.now());
  const values = [Math.floor(remaining/86400000), Math.floor(remaining/3600000)%24, Math.floor(remaining/60000)%60, Math.floor(remaining/1000)%60];
  ['days','hours','minutes','seconds'].forEach((id,i) => { $(id).textContent = String(values[i]).padStart(2,'0'); });
  if (remaining === 0) $('countdown-caption').textContent = 'Our celebration day is here — Alhamdulillah!';
}
updateCountdown();
setInterval(updateCountdown,1000);

if ('IntersectionObserver' in window) {
  const watcher = new IntersectionObserver((entries) => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); watcher.unobserve(entry.target); }
  }), {threshold:.09});
  document.querySelectorAll('.reveal').forEach(el => watcher.observe(el));
} else { document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible')); }
let framePending = false;
function updateHeroFlowers() {
  const progress = Math.min(1, Math.max(0, scrollY / Math.max(1, innerHeight * .82)));
  const convergence = Math.min(innerWidth * .31, 390) * progress;
  document.documentElement.style.setProperty('--flower-left-shift', `${convergence * 1.6}px`);
  document.documentElement.style.setProperty('--flower-right-shift', `${-convergence}px`);
  document.documentElement.style.setProperty('--flower-left-turn', `${-12 - progress * 38}deg`);
  document.documentElement.style.setProperty('--flower-right-turn', `${-12 + progress * 38}deg`);
  document.documentElement.style.setProperty('--flower-lift', `${-progress * 52}px`);
  document.documentElement.style.setProperty('--hero-copy-fade', `${1 - progress * .16}`);
}
updateHeroFlowers();
addEventListener('scroll', () => {
  if (framePending) return;
  framePending = true;
  requestAnimationFrame(() => {
    const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    $('reading-progress').style.width = `${Math.min(100,Math.max(0,scrollY/max*100))}%`;
    updateHeroFlowers();
    framePending = false;
  });
}, { passive:true });
addEventListener('resize', updateHeroFlowers, { passive:true });
let toastTimer;
function toast(message) {
  const el = $('toast'); el.textContent=message; el.classList.add('show');
  clearTimeout(toastTimer); toastTimer=setTimeout(()=>el.classList.remove('show'),3200);
}
const rsvpForm = $('rsvp-form');
const rsvpAttendance = rsvpForm.elements.attendance;
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');

function showRsvpEffect(attendance) {
  if (reducedMotion.matches) return;
  const effects = {
    definitely: ['🎆', '✨', '🍾', '🥂', '✦'],
    maybe: ['⌛', '⏳', '⌛', '⏳'],
    declined: ['😢', '💔', '🥺', '💔']
  };
  const isCelebration = attendance === 'definitely';
  const layer = document.createElement('div');
  layer.className = `rsvp-effects ${isCelebration ? 'rsvp-effects--celebration' : 'rsvp-effects--falling'}`;
  layer.setAttribute('aria-hidden', 'true');
  const particles = isCelebration ? 18 : 14;
  for (let index = 0; index < particles; index += 1) {
    const particle = document.createElement('span');
    particle.className = 'rsvp-effect';
    particle.textContent = effects[attendance][index % effects[attendance].length];
    particle.style.setProperty('--x', `${8 + Math.random() * 84}%`);
    particle.style.setProperty('--y', `${isCelebration ? 18 + Math.random() * 54 : -8 - Math.random() * 18}%`);
    particle.style.setProperty('--delay', `${Math.random() * 0.55}s`);
    particle.style.setProperty('--drift', `${-90 + Math.random() * 180}px`);
    particle.style.setProperty('--turn', `${-40 + Math.random() * 80}deg`);
    layer.appendChild(particle);
  }
  document.body.appendChild(layer);
  setTimeout(() => layer.remove(), 3000);
}

rsvpAttendance.addEventListener('change', () => showRsvpEffect(rsvpAttendance.value));

rsvpForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(rsvpForm);
  const name = formData.get('name').trim();
  const attendance = formData.get('attendance');
  const response = $('rsvp-response');
  const submitButton = rsvpForm.querySelector('[type="submit"]');
  const messages = {
    definitely: `Thank you so much ${name}, we both look forward to seeing you on our special day.`,
    maybe: `Thank you so much ${name}. Take your time, and please let us know when you can — we would love to celebrate with you.`,
    declined: `Thank you so much ${name}. We will miss you dearly, but we are sending you lots of love and duas.`
  };
  submitButton.disabled = true;
  submitButton.textContent = 'SENDING…';
  try {
    const submission = new URLSearchParams(formData).toString();
    const result = await fetch('/', { method:'POST', headers:{'Content-Type':'application/x-www-form-urlencoded'}, body:submission });
    if (!result.ok) throw new Error('Submission failed');
    response.textContent = messages[attendance];
    response.classList.add('visible');
    rsvpForm.reset();
  } catch (error) {
    response.textContent = 'Sorry — the RSVP could not be sent. Please try again once the invitation is published.';
    response.classList.add('visible');
  } finally {
    submitButton.disabled = false;
    submitButton.innerHTML = 'SEND RSVP <span aria-hidden="true">↗</span>';
  }
});
$('calendar-button').addEventListener('click', () => {
  const ics = [
    'BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Rafid and Afsana//Nikkah Invitation//EN','CALSCALE:GREGORIAN','METHOD:PUBLISH',
    'BEGIN:VEVENT','UID:rafid-afsana-nikkah-20270103@invitation.local','DTSTAMP:20261121T000000Z',
    'DTSTART:20270104T010000Z','DTEND:20270104T040000Z',
    'SUMMARY:Nikkah of Rafid & Afsana',
    'DESCRIPTION:Join us to celebrate the Nikkah of Md Rafid Mohtasim Bin Saif and Afsana Mumtarin Asha. Celebration begins at 6 PM Calgary time.',
    'LOCATION:Banff Trail Community Association\\, Calgary\\, Alberta\\, Canada',
    'END:VEVENT','END:VCALENDAR'
  ].join('\r\n');
  const url = URL.createObjectURL(new Blob([ics], {type:'text/calendar;charset=utf-8'}));
  const a=document.createElement('a'); a.href=url; a.download='Rafid-Afsana-Nikkah.ics'; document.body.appendChild(a); a.click(); a.remove();
  setTimeout(()=>URL.revokeObjectURL(url),1000); toast('Calendar event downloaded!');
});
