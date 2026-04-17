const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzi_A12N-KEm-uwsSJiTIZmEblWXyimlIVC4Q73Pfrpn82rM3J-X22g8WT3LeZgSfJqag/exec';

// TAB SWITCHING
const tabButtons = document.querySelectorAll('.tab-button');
const tabPanels = document.querySelectorAll('.tab-panel');

tabButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const key = button.dataset.tab;
    tabButtons.forEach((btn) => btn.classList.remove('active'));
    tabPanels.forEach((panel) => panel.classList.remove('active'));

    button.classList.add('active');
    document.getElementById(`tab-${key}`).classList.add('active');
  });
});

// GALLERY
const galleryItems = [
  {
    title: 'Learning Spaces',
    desc: 'Bright, child-friendly classrooms designed for curiosity and comfort.',
    img: 'assets/6-LearningSpace.png',
    alt: 'Learning Spaces'
  },
  {
    title: 'Creative Activities',
    desc: 'Art, music, sensory play, and hands-on experiences every day.',
    img: 'assets/7-Creative.png',
    alt: 'Creative Activities'
  },
  {
    title: 'Play & Discovery',
    desc: 'Safe spaces that encourage movement, imagination, and social growth.',
    img: 'assets/8-PlayDiscover.png',
    alt: 'Play and Discovery'
  },
  {
    title: 'Care & Routine',
    desc: 'A nurturing environment that balances structure, warmth, and learning.',
    img: 'assets/9-DailyRoutine.png',
    alt: 'Care and Daily Routine'
  }
];

let galleryIndex = 0;
const galleryTitle = document.getElementById('gallery-title');
const galleryDesc = document.getElementById('gallery-desc');
const galleryIndexEl = document.getElementById('gallery-index');
const galleryThumbs = document.getElementById('gallery-thumbs');
const galleryPrev = document.getElementById('gallery-prev');
const galleryNext = document.getElementById('gallery-next');
const galleryMainImg = document.getElementById('gallery-main-img');

function renderGallery() {
  const item = galleryItems[galleryIndex];
  galleryTitle.textContent = item.title;
  galleryDesc.textContent = item.desc;
  galleryIndexEl.textContent = String(galleryIndex + 1);

  if (galleryMainImg) {
    galleryMainImg.src = item.img;
    galleryMainImg.alt = item.alt;
  }

  galleryThumbs.innerHTML = '';
  galleryItems.forEach((entry, index) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `gallery-thumb${index === galleryIndex ? ' active' : ''}`;
    btn.textContent = entry.title;
    btn.addEventListener('click', () => {
      galleryIndex = index;
      renderGallery();
    });
    galleryThumbs.appendChild(btn);
  });
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
const form = document.getElementById('admission-form');
const formStatus = document.getElementById('form-status');
const submitBtn = document.getElementById('submit-btn');

if (form) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const params = new URLSearchParams();
    params.append('childName', formData.get('childName') || '');
    params.append('childDOB', formData.get('childDOB') || '');
    params.append('parentName', formData.get('parentName') || '');
    params.append('email', formData.get('email') || '');
    params.append('phone', formData.get('phone') || '');
    params.append('area', formData.get('area') || '');
    params.append('programme', formData.get('programme') || '');
    params.append('message', formData.get('message') || 'Hi, please contact me as I would like to know more about your centre.');
    params.append('page_url', window.location.href);
    params.append('user_agent', navigator.userAgent);
    params.append('utm_source', new URLSearchParams(window.location.search).get('utm_source') || '');
    params.append('utm_medium', new URLSearchParams(window.location.search).get('utm_medium') || '');
    params.append('utm_campaign', new URLSearchParams(window.location.search).get('utm_campaign') || '');

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
