const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzi_A12N-KEm-uwsSJiTIZmEblWXyimlIVC4Q73Pfrpn82rM3J-X22g8WT3LeZgSfJqag/exec';

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
  { age: 'Toddler | 2 to 3 years', name: 'Bright', desc: 'Our Toddler environment, Bright, is a warm, nurturing space where children take their first confident steps into learning. Through sensory play, stories, movement, music, and simple routines, children begin building independence, communication, curiosity, and comfort in a safe preschool setting.' },
  { age: 'Pre-KG | 3 to 4 years', name: 'Shine', desc: 'Our Pre-KG environment, Shine, helps children grow through joyful exploration and guided play. With hands-on activities, storytelling, early language development, creative expression, social interaction, and discovery-based learning, each child is encouraged to explore at their own pace, build meaningful friendships, and develop a genuine love for learning. Children begin to shine as confident, curious, and expressive learners who are ready to take on new challenges.' },
  { age: 'Jr. KG | 4 to 5 years', name: 'Spark', desc: 'Our Jr. KG environment, Spark, encourages children to ask questions, solve problems, create, and collaborate. Through project-based activities, early literacy and numeracy, storytelling, art, music, and purposeful play, children build strong foundations for school readiness and independent thinking.' },
  { age: 'Sr. KG | 5 to 6 years', name: 'Ignite', desc: 'Our Sr. KG environment, Ignite, prepares children for the next stage of formal schooling with confidence. Children strengthen literacy, numeracy, communication, independence, creativity, and classroom readiness through meaningful projects, hands-on learning, collaboration, and age-appropriate academic foundations.' }
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
    name: 'Kavitha Y',
    designation: 'Centre Head',
    img: 'assets/11-Kavitha.png',
    bio: 'Kavitha is an early childhood education professional with over 5 years of experience across leading preschool environments, including KLAY and Vivero. She brings strong experience in administration, teacher guidance, curriculum support, and parent engagement. With her calm leadership style and child-first approach, Kavitha works closely with teachers and families to create a warm, well-run centre where children can grow with confidence, curiosity, and joy.'
  },
  {
    name: 'Zaheerunnisa A',
    designation: 'Teacher',
    img: 'assets/13-Zaheerunnisa.png',
    bio: 'Zaheerunnisa is an early childhood educator with over 6 years of experience working with young children across preschool and nursery settings. She holds a BA degree and has completed her Montessori Teachers Training. Before joining S.O.N.G., she worked as a facilitator at Little Millennium Preschool and at St. Paul Nursery School. Her experience helps her create a structured, caring, and engaging classroom where children feel supported and ready to learn.'
  },
  {
    name: 'Vijji',
    designation: 'Support Staff',
    img: 'assets/14-Vijji.png',
    bio: 'Vijji brings prior experience working in a preschool and daycare environment, where she has supported young children through their daily routines. At S.O.N.G., she helps create a clean, safe, and caring space for children throughout the day. Her warm presence and attentiveness make her a trusted support for both children and teachers, ensuring children feel comfortable, cared for, and secure.'
  },
  {
    name: 'Raghu B',
    designation: 'Strategic Advisor & Chairman',
    img: 'assets/15-Raghu.png',
    bio: 'Raghu brings a strong cross-sector background spanning healthcare, investment banking, health-tech entrepreneurship, and startup advisory. As Strategic Advisor and Chairman at S.O.N.G., he provides guidance on long-term vision, governance, growth, and institutional partnerships. His experience as a founder and advisor gives him a practical understanding of building organisations from the ground up, while his healthcare background brings a deep appreciation for care, trust, and child wellbeing.'
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
    } catch (error) {
      formStatus.textContent = 'Something went wrong. Please try again or contact us on WhatsApp.';
      formStatus.className = 'form-status error';
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Submit Enquiry';
    }
  });
}
