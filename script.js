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
addEventListener('scroll', () => {
  if (framePending) return;
  framePending = true;
  requestAnimationFrame(() => {
    const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    $('reading-progress').style.width = `${Math.min(100,Math.max(0,scrollY/max*100))}%`;
    framePending = false;
  });
}, { passive:true });
let toastTimer;
function toast(message) {
  const el = $('toast'); el.textContent=message; el.classList.add('show');
  clearTimeout(toastTimer); toastTimer=setTimeout(()=>el.classList.remove('show'),3200);
}
$('share-button').addEventListener('click', async () => {
  const payload = {title:'Rafid & Afsana — Nikkah Invitation', text:'You are invited to our Nikkah on Sunday, January 3, 2027 at 6 PM at Banff Trail Community Association, Calgary.', url:location.href};
  try {
    if (navigator.share) { await navigator.share(payload); return; }
    if (navigator.clipboard && location.protocol !== 'file:') { await navigator.clipboard.writeText(location.href); toast('Invitation link copied!'); return; }
    toast('Copy the page address to share your invitation.');
  } catch(err) { if(err.name !== 'AbortError') toast('Please copy the website address to share.'); }
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
