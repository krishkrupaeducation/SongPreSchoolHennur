const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzi_A12N-KEm-uwsSJiTIZmEblWXyimlIVC4Q73Pfrpn82rM3J-X22g8WT3LeZgSfJqag/exec';

// HERO CAROUSEL
// To add photos: put them in assets/hero/ named hero-2, hero-3, ... hero-12.
// Any of these endings works: .jpg .jpeg .png .webp (upper or lower case, e.g. hero-6.JPG).
// Any number that doesn't exist yet is skipped automatically, so you can add photos one at a time.
// Recommended: landscape, 1600 x 1200 px, under 300 KB each.
// Write a short, true description for each photo below (it helps Google and screen readers).
const HERO_FOLDER = 'assets/hero/';
const HERO_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp', 'JPG', 'JPEG', 'PNG', 'WEBP'];
const HERO_PHOTOS = [
  { name: 'hero-2',  alt: 'Children learning in a classroom at S.O.N.G. Preschool Hennur' },
  { name: 'hero-3',  alt: 'Play-based learning activity at S.O.N.G. Preschool, Kalyan Nagar' },
  { name: 'hero-4',  alt: 'Toddler playgroup corner at S.O.N.G. Preschool Hennur' },
  { name: 'hero-5',  alt: 'Montessori materials at S.O.N.G. Preschool Hennur' },
  { name: 'hero-6',  alt: 'Art and craft activity at S.O.N.G. Preschool Bangalore' },
  { name: 'hero-7',  alt: 'Daycare rest and reading area at S.O.N.G. Hennur' },
  { name: 'hero-8',  alt: 'Outdoor play area at S.O.N.G. Preschool Hennur' },
  { name: 'hero-9',  alt: 'Celebration day at S.O.N.G. Preschool Hennur' },
  { name: 'hero-10', alt: 'Activity time at S.O.N.G. Preschool Hennur' },
  { name: 'hero-11', alt: 'Learning space at S.O.N.G. Preschool Hennur' },
  { name: 'hero-12', alt: 'Children at play at S.O.N.G. Preschool Hennur' }
];

(function initHeroCarousel() {
  const root  = document.getElementById('hero-carousel');
  const track = document.getElementById('hero-track');
  if (!root || !track) return;
  const prev  = document.getElementById('hero-prev');
  const next  = document.getElementById('hero-next');
  const dotsEl = document.getElementById('hero-dots');
  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const INTERVAL = 5000;
  let index = 0, timer = null, paused = false;

  const slides = () => Array.from(track.querySelectorAll('.hero-slide'));

  function show(i) {
    const all = slides();
    if (!all.length) return;
    index = (i + all.length) % all.length;
    all.forEach((s, n) => {
      const on = n === index;
      s.classList.toggle('is-active', on);
      s.setAttribute('aria-hidden', on ? 'false' : 'true');
    });
    Array.from(dotsEl.children).forEach((d, n) => d.classList.toggle('active', n === index));
  }

  function renderDots() {
    const all = slides();
    dotsEl.innerHTML = '';
    all.forEach((_, n) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'hero-dot' + (n === index ? ' active' : '');
      b.setAttribute('aria-label', 'Show photo ' + (n + 1));
      b.addEventListener('click', () => { show(n); restart(); });
      dotsEl.appendChild(b);
    });
    const multi = all.length > 1;
    prev.hidden = next.hidden = dotsEl.hidden = !multi;
  }

  function start() { if (!reduceMotion && !paused && slides().length > 1) timer = setInterval(() => show(index + 1), INTERVAL); }
  function stop()  { clearInterval(timer); timer = null; }
  function restart() { stop(); start(); }

  prev.addEventListener('click', () => { show(index - 1); restart(); });
  next.addEventListener('click', () => { show(index + 1); restart(); });
  root.addEventListener('mouseenter', () => { paused = true; stop(); });
  root.addEventListener('mouseleave', () => { paused = false; restart(); });
  root.addEventListener('focusin',  () => { paused = true; stop(); });
  root.addEventListener('focusout', () => { paused = false; restart(); });
  document.addEventListener('visibilitychange', () => { document.hidden ? stop() : restart(); });

  // swipe on phones
  let x0 = null;
  root.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, { passive: true });
  root.addEventListener('touchend', e => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 40) { show(index + (dx < 0 ? 1 : -1)); restart(); }
    x0 = null;
  });

  // Load extra photos only after the page has finished loading, keep the ones that exist, in order.
  // For each photo, try each file ending in turn and keep the first one that exists.
  function findPhoto(p) {
    return new Promise(res => {
      let i = 0;
      const tryNext = () => {
        if (i >= HERO_EXTENSIONS.length) return res(null);
        const src = HERO_FOLDER + p.name + '.' + HERO_EXTENSIONS[i++];
        const img = new Image();
        img.onload = () => res({ src, alt: p.alt });
        img.onerror = tryNext;
        img.src = src;
      };
      tryNext();
    });
  }

  function loadExtras() {
    Promise.all(HERO_PHOTOS.map(findPhoto)).then(found => {
      found.filter(Boolean).forEach(p => {
        const fig = document.createElement('figure');
        fig.className = 'hero-slide';
        fig.setAttribute('aria-hidden', 'true');
        const img = document.createElement('img');
        img.src = p.src; img.alt = p.alt; img.className = 'hero-main-img'; img.decoding = 'async';
        fig.appendChild(img);
        track.appendChild(fig);
      });
      renderDots();
      start();
    });
  }
  if (document.readyState === 'complete') loadExtras();
  else window.addEventListener('load', loadExtras);
})();

// ABOUT TAB SWITCHING
document.querySelectorAll('.tab-button[data-tab]').forEach((button) => {
  button.addEventListener('click', () => {
    const key = button.dataset.tab;
    document.querySelectorAll('.tab-button[data-tab]').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    button.classList.add('active');
    document.getElementById('tab-' + key).classList.add('active');
  });
});

// DAYCARE TAB SWITCHING
document.querySelectorAll('.tab-button[data-daytab]').forEach((button) => {
  button.addEventListener('click', () => {
    const key = button.dataset.daytab;
    document.querySelectorAll('.tab-button[data-daytab]').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('[id^="daytab-"]').forEach(p => p.classList.remove('active'));
    button.classList.add('active');
    document.getElementById('daytab-' + key).classList.add('active');
  });
});

// ENVIRONMENTS
const envItems = [
  { age: 'Toddler / Playgroup | 2 to 3 years', name: 'Bright', desc: 'Our Toddler environment, Bright, is a warm, nurturing space where children take their first confident steps into learning. Through sensory play, stories, movement, music, and simple routines, children begin building independence, communication, curiosity, and comfort in a safe preschool setting.' },
  { age: 'Pre-KG / Nursery | 3 to 4 years', name: 'Shine', desc: 'Our Pre-KG environment, Shine, helps children grow through joyful exploration and guided play. With hands-on activities, storytelling, early language development, creative expression, social interaction, and discovery-based learning, each child is encouraged to explore at their own pace, build meaningful friendships, and develop a genuine love for learning. Children begin to shine as confident, curious, and expressive learners who are ready to take on new challenges.' },
  { age: 'Jr. KG / LKG | 4 to 5 years', name: 'Spark', desc: 'Our Jr. KG environment, Spark, encourages children to ask questions, solve problems, create, and collaborate. Through project-based activities, early literacy and numeracy, storytelling, art, music, and purposeful play, children build strong foundations for school readiness and independent thinking.' },
  { age: 'Sr. KG / UKG | 5 to 6 years', name: 'Ignite', desc: 'Our Sr. KG environment, Ignite, prepares children for the next stage of formal schooling with confidence. Children strengthen literacy, numeracy, communication, independence, creativity, and classroom readiness through meaningful projects, hands-on learning, collaboration, and age-appropriate academic foundations.' }
];

let envIndex = 0;
const envAge     = document.getElementById('env-age');
const envName    = document.getElementById('env-name');
const envDesc    = document.getElementById('env-desc');
const envIndexEl = document.getElementById('env-index');
const envThumbs  = document.getElementById('env-thumbs');

function renderEnv() {
  const item = envItems[envIndex];
  if (envAge)     envAge.textContent     = item.age;
  if (envName)    envName.textContent    = item.name;
  if (envDesc)    envDesc.textContent    = item.desc;
  if (envIndexEl) envIndexEl.textContent = String(envIndex + 1);
  if (envThumbs) {
    envThumbs.innerHTML = '';
    envItems.forEach((entry, i) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'env-thumb' + (i === envIndex ? ' active' : '');
      btn.innerHTML = '<span class="env-thumb-name">' + entry.name + '</span><span class="env-thumb-age">' + entry.age + '</span>';
      btn.addEventListener('click', () => { envIndex = i; renderEnv(); });
      envThumbs.appendChild(btn);
    });
  }
}
if (envThumbs) renderEnv();

// TEAM
const teamItems = [
  {
    name: 'Karuna G',
    designation: 'Chief Academic Officer',
    img: 'assets/10-Karuna.png',
    bio: 'Karuna brings over 15 years of experience in education, with deep expertise in early childhood learning, Montessori practice, and child development. She is AMI-trained for both the 3 to 6 and 12 to 18 age groups, and also brings training in child psychology and RIE. As CAO, Karuna guides the academic vision, curriculum approach, and learning philosophy across the preschool.'
  },
  {
    name: 'Surekha P',
    designation: 'Centre Head',
    img: 'assets/17-Surekha.png',
    bio: 'Surekha brings over three years of hands-on experience in early childhood settings, including her time as a Leap Teacher at Koala Preschool and as a Senior Supermam at Footprints Preschool and Daycare. She holds Montessori Teacher\'s Training and brings strong multilingual capability across Telugu, Kannada, Hindi, English, and Tamil - an asset in Bangalore\'s diverse parent community. At S.O.N.G., Surekha leads and oversees the day-to-day running of the centre, implementation of the curriculum, and ensures that the environment being fostered make every child and family feel welcomed, supported, and cared for.'
  },
  {
    name: 'Zaheerunnisa A',
    designation: 'Teacher',
    img: 'assets/13-Zaheerunnisa.png',
    bio: 'Zaheerunnisa is an early childhood educator with over 6 years of experience working with young children across preschool and nursery settings. She holds a BA degree and has completed her Montessori Teachers Training. Before joining S.O.N.G., she worked as a facilitator at Little Millennium Preschool and at St. Paul Nursery School. Her experience helps her create a structured, caring, and engaging classroom where children feel supported and ready to learn.'
  },
  {
    name: 'Amreen',
    designation: 'Teacher',
    img: 'assets/11-Amreen.png',
    bio: 'Amreen is a passionate pre-primary educator with over 6 years of experience working with young children across preschool and school environments. She has previously worked with El Santos Preschool and Chrysalis High, Horamavu, bringing strong classroom experience and a child-centered approach to early learning. She holds a BCA and a B.Ed. in History and English, combining academic strength with practical teaching experience. At S.O.N.G, Amreen is dedicated to creating a safe, nurturing, and engaging classroom.'
  },
  {
    name: 'Vijji',
    designation: 'Support Staff',
    img: 'assets/14-Vijji.png',
    bio: 'Vijji brings prior experience working in a preschool and daycare environment, where she has supported young children through their daily routines. At S.O.N.G., she helps create a clean, safe, and caring space for children throughout the day. Her warm presence and attentiveness make her a trusted support for both children and teachers, ensuring children feel comfortable, cared for, and secure.'
  },
  {
    name: 'Varun B',
    designation: 'COO',
    img: 'assets/16-Varun.png',
    bio: 'Varun supports S.O.N.G. on centre setup, operations, marketing, and growth, bringing a hands-on approach to building from the ground up. His background spans healthcare entrepreneurship, fintech founding teams, venture building, and strategic advisory for early-stage startups. He has previously advised education groups on innovation ecosystems and has founded two ed-tech initiatives, working closely with teams to turn plans into action.'
  }
];

let teamIndex = 0;
const teamPhoto      = document.getElementById('team-main-photo');
const teamName       = document.getElementById('team-name');
const teamDesig      = document.getElementById('team-designation');
const teamBio        = document.getElementById('team-bio');
const teamIndexEl    = document.getElementById('team-index');
const teamPrev       = document.getElementById('team-prev');
const teamNext       = document.getElementById('team-next');

function renderTeam() {
  const item = teamItems[teamIndex];
  if (teamPhoto)   { teamPhoto.src = item.img; teamPhoto.alt = item.name; }
  if (teamName)    teamName.textContent  = item.name;
  if (teamDesig)   teamDesig.textContent = item.designation;
  if (teamBio)     teamBio.textContent   = item.bio;
  if (teamIndexEl) teamIndexEl.textContent   = String(teamIndex + 1);
}

if (teamPrev && teamNext) {
  teamPrev.addEventListener('click', () => { teamIndex = (teamIndex - 1 + teamItems.length) % teamItems.length; renderTeam(); });
  teamNext.addEventListener('click', () => { teamIndex = (teamIndex + 1) % teamItems.length; renderTeam(); });
  renderTeam();
}

// GALLERY
const galleryItems = [
  { title: 'Learning Spaces',    desc: 'Bright, child-friendly classrooms designed for curiosity and comfort.',         img: 'assets/6-LearningSpace.png', alt: 'Learning Spaces' },
  { title: 'Creative Activities',desc: 'Art, music, sensory play, and hands-on experiences every day.',                 img: 'assets/7-Creative.png',      alt: 'Creative Activities' },
  { title: 'Play & Discovery',   desc: 'Safe spaces that encourage movement, imagination, and social growth.',          img: 'assets/8-PlayDiscover.png',  alt: 'Play and Discovery' },
  { title: 'Care & Routine',     desc: 'A nurturing environment that balances structure, warmth, and learning.',        img: 'assets/9-DailyRoutine.png',  alt: 'Care and Daily Routine' }
];

let galleryIndex = 0;
const galleryTitle   = document.getElementById('gallery-title');
const galleryDesc    = document.getElementById('gallery-desc');
const galleryIndexEl = document.getElementById('gallery-index');
const galleryThumbs  = document.getElementById('gallery-thumbs');
const galleryPrev    = document.getElementById('gallery-prev');
const galleryNext    = document.getElementById('gallery-next');
const galleryMainImg = document.getElementById('gallery-main-img');

function renderGallery() {
  const item = galleryItems[galleryIndex];
  if (galleryTitle)   galleryTitle.textContent   = item.title;
  if (galleryDesc)    galleryDesc.textContent    = item.desc;
  if (galleryIndexEl) galleryIndexEl.textContent = String(galleryIndex + 1);
  if (galleryMainImg) { galleryMainImg.src = item.img; galleryMainImg.alt = item.alt; }
  if (galleryThumbs) {
    galleryThumbs.innerHTML = '';
    galleryItems.forEach((entry, i) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'gallery-thumb' + (i === galleryIndex ? ' active' : '');
      btn.textContent = entry.title;
      btn.addEventListener('click', () => { galleryIndex = i; renderGallery(); });
      galleryThumbs.appendChild(btn);
    });
  }
}
if (galleryPrev && galleryNext) {
  galleryPrev.addEventListener('click', () => { galleryIndex = (galleryIndex - 1 + galleryItems.length) % galleryItems.length; renderGallery(); });
  galleryNext.addEventListener('click', () => { galleryIndex = (galleryIndex + 1) % galleryItems.length; renderGallery(); });
  renderGallery();
}

// ADMISSION FORM
const form       = document.getElementById('admission-form');
const formStatus = document.getElementById('form-status');
const submitBtn  = document.getElementById('submit-btn');

if (form) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const params = new URLSearchParams();
    ['childName','childDOB','parentName','email','phone','area','programme','message'].forEach(k => params.append(k, formData.get(k) || ''));
    params.append('message', formData.get('message') || 'Hi, please contact me as I would like to know more about your centre.');
    params.append('page_url', window.location.href);
    params.append('user_agent', navigator.userAgent);
    const qs = new URLSearchParams(window.location.search);
    ['utm_source','utm_medium','utm_campaign'].forEach(k => params.append(k, qs.get(k) || ''));

    formStatus.textContent = 'Submitting your enquiry...';
    formStatus.className = 'form-status';
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';

    try {
      await fetch(SCRIPT_URL, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: params.toString() });
      formStatus.textContent = 'Thank you. Our team will contact you shortly.';
      formStatus.className = 'form-status success';
      form.reset();
      if (typeof fbq !== 'undefined') fbq('track', 'Lead');
      if (typeof gtag !== 'undefined') gtag('event', 'conversion', {'send_to': 'AW-18223381052/bMoxCInryrscELz0yvFD'});
    } catch (error) {
      formStatus.textContent = 'Something went wrong. Please try again or contact us on WhatsApp.';
      formStatus.className = 'form-status error';
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Submit Enquiry';
    }
  });
}


// INSTAGRAM FEED (Behold) — loads only when the section is about to scroll into view
(function initInstagramFeed() {
  const box = document.getElementById('ig-feed');
  if (!box) return;
  const feedId = (box.dataset.feedId || '').trim();
  if (!feedId) { box.hidden = true; return; }

  let loaded = false;
  function load() {
    if (loaded) return;
    loaded = true;
    const w = document.createElement('behold-widget');
    w.setAttribute('feed-id', feedId);
    box.appendChild(w);
    const s = document.createElement('script');
    s.type = 'module';
    s.src = 'https://w.behold.so/widget.js';
    document.head.appendChild(s);
  }
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      if (entries.some(e => e.isIntersecting)) { load(); io.disconnect(); }
    }, { rootMargin: '400px' });
    io.observe(box);
  } else {
    load();
  }
})();
