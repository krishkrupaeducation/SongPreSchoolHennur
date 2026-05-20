const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzi_A12N-KEm-uwsSJiTIZmEblWXyimlIVC4Q73Pfrpn82rM3J-X22g8WT3LeZgSfJqag/exec';

// TAB SWITCHING (About section)
document.querySelectorAll('.tab-button').forEach((button) => {
  button.addEventListener('click', () => {
    const key = button.dataset.tab;
    document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    button.classList.add('active');
    document.getElementById('tab-' + key).classList.add('active');
  });
});

// ENVIRONMENTS (same pattern as gallery)
const envItems = [
  {
    age: 'Toddler | 2 to 3 years',
    name: 'Bright',
    desc: 'Our Toddler environment, Bright, is a warm, nurturing space where children take their first confident steps into learning. Through sensory play, stories, movement, music, and simple routines, children begin building independence, communication, curiosity, and comfort in a safe preschool setting.',
    img: 'assets/3-HalfDay.png'
  },
  {
    age: 'Pre-KG | 3 to 4 years',
    name: 'Shine',
    desc: 'Our Pre-KG environment, Shine, helps children grow through joyful exploration and guided play. With hands-on activities, early language, creative expression, social interaction, and discovery-based learning, children begin to shine as confident, curious, and expressive learners.',
    img: 'assets/4-FullDay.png'
  },
  {
    age: 'Jr. KG | 4 to 5 years',
    name: 'Spark',
    desc: 'Our Jr. KG environment, Spark, encourages children to ask questions, solve problems, create, and collaborate. Through project-based activities, early literacy and numeracy, storytelling, art, music, and purposeful play, children build strong foundations for school readiness and independent thinking.',
    img: 'assets/5-AfterSchoolCare.png'
  },
  {
    age: 'Sr. KG | 5 to 6 years',
    name: 'Ignite',
    desc: 'Our Sr. KG environment, Ignite, prepares children for the next stage of formal schooling with confidence. Children strengthen literacy, numeracy, communication, independence, creativity, and classroom readiness through meaningful projects, hands-on learning, collaboration, and age-appropriate academic foundations.',
    img: 'assets/6-LearningSpace.png'
  }
];

let envIndex = 0;
const envMainImg   = document.getElementById('env-main-img');
const envIndexEl   = document.getElementById('env-index');
const envAge       = document.getElementById('env-age');
const envName      = document.getElementById('env-name');
const envDesc      = document.getElementById('env-desc');
const envThumbs    = document.getElementById('env-thumbs');
const envPrev      = document.getElementById('env-prev');
const envNext      = document.getElementById('env-next');

function renderEnv() {
  const item = envItems[envIndex];
  if (envMainImg) { envMainImg.src = item.img; envMainImg.alt = item.name; }
  if (envIndexEl) envIndexEl.textContent = String(envIndex + 1);
  if (envAge)  envAge.textContent  = item.age;
  if (envName) envName.textContent = item.name;
  if (envDesc) envDesc.textContent = item.desc;

  if (envThumbs) {
    envThumbs.innerHTML = '';
    envItems.forEach((entry, i) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'env-thumb' + (i === envIndex ? ' active' : '');
      btn.textContent = entry.name;
      btn.addEventListener('click', () => { envIndex = i; renderEnv(); });
      envThumbs.appendChild(btn);
    });
  }
}

if (envPrev && envNext) {
  envPrev.addEventListener('click', () => {
    envIndex = (envIndex - 1 + envItems.length) % envItems.length;
    renderEnv();
  });
  envNext.addEventListener('click', () => {
    envIndex = (envIndex + 1) % envItems.length;
    renderEnv();
  });
  renderEnv();
}

// TEAM (same pattern as gallery)
const teamItems = [
  {
    name: 'Karuna G',
    designation: 'Chief Academic Officer',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    img: 'https://placehold.co/340x400/e8f4fd/3399cc?text=Karuna+G',
    contact: false
  },
  {
    name: 'Kavitha Y',
    designation: 'Centre Head',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    img: 'https://placehold.co/340x400/e8f4fd/3399cc?text=Kavitha+Y',
    contact: true
  },
  {
    name: 'Zaheerunnisa A',
    designation: 'Teacher',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    img: 'https://placehold.co/340x400/e8f4fd/3399cc?text=Zaheerunnisa+A',
    contact: false
  },
  {
    name: 'Viji',
    designation: 'Support Staff',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    img: 'https://placehold.co/340x400/e8f4fd/3399cc?text=Viji',
    contact: false
  },
  {
    name: 'Raghu B',
    designation: 'CEO',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    img: 'https://placehold.co/340x400/e8f4fd/3399cc?text=Raghu+B',
    contact: false
  },
  {
    name: 'Varun B',
    designation: 'COO',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    img: 'https://placehold.co/340x400/e8f4fd/3399cc?text=Varun+B',
    contact: false
  }
];

let teamIndex = 0;
const teamMainPhoto   = document.getElementById('team-main-photo');
const teamIndexEl     = document.getElementById('team-index');
const teamNameEl      = document.getElementById('team-name');
const teamDesigEl     = document.getElementById('team-designation');
const teamBioEl       = document.getElementById('team-bio');
const teamContactWrap = document.getElementById('team-contact-wrap');
const teamThumbs      = document.getElementById('team-thumbs');
const teamPrev        = document.getElementById('team-prev');
const teamNext        = document.getElementById('team-next');

function renderTeam() {
  const item = teamItems[teamIndex];
  if (teamMainPhoto) { teamMainPhoto.src = item.img; teamMainPhoto.alt = item.name; }
  if (teamIndexEl)  teamIndexEl.textContent  = String(teamIndex + 1);
  if (teamNameEl)   teamNameEl.textContent   = item.name;
  if (teamDesigEl)  teamDesigEl.textContent  = item.designation;
  if (teamBioEl)    teamBioEl.textContent    = item.bio;
  if (teamContactWrap) teamContactWrap.style.display = item.contact ? 'flex' : 'none';

  if (teamThumbs) {
    teamThumbs.innerHTML = '';
    teamItems.forEach((entry, i) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'team-thumb' + (i === teamIndex ? ' active' : '');
      btn.textContent = entry.name;
      btn.addEventListener('click', () => { teamIndex = i; renderTeam(); });
      teamThumbs.appendChild(btn);
    });
  }
}

if (teamPrev && teamNext) {
  teamPrev.addEventListener('click', () => {
    teamIndex = (teamIndex - 1 + teamItems.length) % teamItems.length;
    renderTeam();
  });
  teamNext.addEventListener('click', () => {
    teamIndex = (teamIndex + 1) % teamItems.length;
    renderTeam();
  });
  renderTeam();
}

// GALLERY
const galleryItems = [
  { title: 'Learning Spaces', desc: 'Bright, child-friendly classrooms designed for curiosity and comfort.', img: 'assets/6-LearningSpace.png', alt: 'Learning Spaces' },
  { title: 'Creative Activities', desc: 'Art, music, sensory play, and hands-on experiences every day.', img: 'assets/7-Creative.png', alt: 'Creative Activities' },
  { title: 'Play & Discovery', desc: 'Safe spaces that encourage movement, imagination, and social growth.', img: 'assets/8-PlayDiscover.png', alt: 'Play and Discovery' },
  { title: 'Care & Routine', desc: 'A nurturing environment that balances structure, warmth, and learning.', img: 'assets/9-DailyRoutine.png', alt: 'Care and Daily Routine' }
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
  if (galleryTitle) galleryTitle.textContent = item.title;
  if (galleryDesc)  galleryDesc.textContent  = item.desc;
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
  galleryPrev.addEventListener('click', () => {
    galleryIndex = (galleryIndex - 1 + galleryItems.length) % galleryItems.length;
    renderGallery();
  });
  galleryNext.addEventListener('click', () => {
    galleryIndex = (galleryIndex + 1) % galleryItems.length;
    renderGallery();
  });
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
    params.append('childName',    formData.get('childName') || '');
    params.append('childDOB',     formData.get('childDOB') || '');
    params.append('parentName',   formData.get('parentName') || '');
    params.append('email',        formData.get('email') || '');
    params.append('phone',        formData.get('phone') || '');
    params.append('area',         formData.get('area') || '');
    params.append('programme',    formData.get('programme') || '');
    params.append('message',      formData.get('message') || 'Hi, please contact me as I would like to know more about your centre.');
    params.append('page_url',     window.location.href);
    params.append('user_agent',   navigator.userAgent);
    const qs = new URLSearchParams(window.location.search);
    params.append('utm_source',   qs.get('utm_source') || '');
    params.append('utm_medium',   qs.get('utm_medium') || '');
    params.append('utm_campaign', qs.get('utm_campaign') || '');

    formStatus.textContent = 'Submitting your enquiry...';
    formStatus.className = 'form-status';
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';

    try {
      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString()
      });
      await response.text();
      formStatus.textContent = 'Thank you. Our team will contact you shortly.';
      formStatus.className = 'form-status success';
      form.reset();
      if (typeof fbq !== 'undefined') fbq('track', 'Lead');
    } catch (error) {
      formStatus.textContent = 'Something went wrong. Please try again or contact us on WhatsApp.';
      formStatus.className = 'form-status error';
      console.error(error);
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Submit Enquiry';
    }
  });
}
