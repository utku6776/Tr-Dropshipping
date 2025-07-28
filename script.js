// Menü ikonuna tıklayınca resp-buts açılır, ekranda menü dışında herhangi bir yere tıklanınca kapanır, menüde bir yere tıklanınca kapanmaz
const menuIcon = document.getElementById('menu-icon');
const respButs = document.getElementById('resp-buts');
// Menü sayfa açılışında kapalı gelsin
respButs.style.display = 'none';

function closeMenuOnBodyClick(e) {
  // Eğer tıklanan yer menü veya menü ikonunun kendisi değilse menüyü kapat
  if (!respButs.contains(e.target) && e.target !== menuIcon) {
    respButs.style.display = 'none';
    document.body.removeEventListener('click', closeMenuOnBodyClick);
  }
}

function addMenuCloseListener() {
  setTimeout(() => {
    document.addEventListener('click', closeMenuOnBodyClick);
  }, 0);
}

menuIcon.addEventListener('click', function(e) {
  e.stopPropagation();
  if (respButs.style.display === 'flex') {
    respButs.style.display = 'none';
    document.removeEventListener('click', closeMenuOnBodyClick);
  } else {
    respButs.style.display = 'flex';
    addMenuCloseListener();
  }
});
// Menüde bir yere tıklanınca event'in yayılmasını engelle
respButs.addEventListener('click', function(e) {
  e.stopPropagation();
});

// Responsive menü flex-direction
respButs.style.flexDirection = 'column';

// Slider ile ilgili kodlar silindi.
// Menü açma/kapatma kodları burada kalabilir.

// Sade slider geçişi + dokunmatik swipe desteği
const sliderItems = document.querySelectorAll('.slider-item');
const prevBtn = document.querySelector('.slider-btn.prev');
const nextBtn = document.querySelector('.slider-btn.next');
let currentIndex = 0;
let startX = 0;
let isDragging = false;

function showSlide(index) {
  sliderItems.forEach((item, i) => {
    item.classList.toggle('active', i === index);
  });
  currentIndex = index;
}
function nextSlide() {
  let next = (currentIndex + 1) % sliderItems.length;
  showSlide(next);
}
function prevSlide() {
  let prev = (currentIndex - 1 + sliderItems.length) % sliderItems.length;
  showSlide(prev);
}
nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// Dokunmatik swipe
const slider = document.querySelector('.slider');
slider.addEventListener('touchstart', function(e) {
  startX = e.touches[0].clientX;
  isDragging = true;
});
slider.addEventListener('touchmove', function(e) {
  if (!isDragging) return;
  let moveX = e.touches[0].clientX;
  let diff = moveX - startX;
  if (Math.abs(diff) > 50) {
    if (diff < 0) nextSlide();
    else prevSlide();
    isDragging = false;
  }
});
slider.addEventListener('touchend', function() {
  isDragging = false;
});
showSlide(0);

// BEDENLER SLIDER
const bedenlerSlider = document.querySelector('.bedenler-slider');
const bedenlerItems = document.querySelectorAll('.bedenler-slider-item');
const bedenlerPrevBtn = document.querySelector('.bedenler-slider-btn.prev');
const bedenlerNextBtn = document.querySelector('.bedenler-slider-btn.next');
let bedenlerIndex = 0;

function showBedenlerSlide(index) {
  bedenlerItems.forEach((item, i) => {
    item.classList.toggle('active', i === index);
  });
  bedenlerIndex = index;
}
function nextBedenlerSlide() {
  let next = (bedenlerIndex + 1) % bedenlerItems.length;
  showBedenlerSlide(next);
}
function prevBedenlerSlide() {
  let prev = (bedenlerIndex - 1 + bedenlerItems.length) % bedenlerItems.length;
  showBedenlerSlide(prev);
}
bedenlerNextBtn.addEventListener('click', nextBedenlerSlide);
bedenlerPrevBtn.addEventListener('click', prevBedenlerSlide);
showBedenlerSlide(0);

// BEDENLER MOBILE SLIDER
const bedenlerMobileItems = document.querySelectorAll('.bedenler-mobile-item');
const bedenlerMobilePrevBtn = document.querySelector('.bedenler-mobile-btn.prev');
const bedenlerMobileNextBtn = document.querySelector('.bedenler-mobile-btn.next');
let bedenlerMobileIndex = 0;

function showBedenlerMobileSlide(index) {
  bedenlerMobileItems.forEach((item, i) => {
    item.classList.toggle('active', i === index);
  });
  bedenlerMobileIndex = index;
}
function nextBedenlerMobileSlide() {
  let next = (bedenlerMobileIndex + 1) % bedenlerMobileItems.length;
  showBedenlerMobileSlide(next);
}
function prevBedenlerMobileSlide() {
  let prev = (bedenlerMobileIndex - 1 + bedenlerMobileItems.length) % bedenlerMobileItems.length;
  showBedenlerMobileSlide(prev);
}
bedenlerMobileNextBtn.addEventListener('click', nextBedenlerMobileSlide);
bedenlerMobilePrevBtn.addEventListener('click', prevBedenlerMobileSlide);
showBedenlerMobileSlide(0);

// HEADER BUTONLARI SCROLL (Tüm responsive menü butonları için de çalışacak şekilde)
function scrollToSection(targetSelector) {
  const target = document.querySelector(targetSelector);
  if (target) {
    // Header yüksekliğini hesaba kat (ör: 100px)
    const headerOffset = 100;
    const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - headerOffset;
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
}

// Tüm butonlar için (hem header hem responsive menü)
const scrollMap = [
  { selector: '#head-but_1', target: '.slider' },
  { selector: '#head-but_2', target: '.bedenler-slider' },
  { selector: '#head-but_3', target: '.urun-cesitleri-section' },
  { selector: '#head-but_4', target: '.contact-section' }
];

scrollMap.forEach(({ selector, target }) => {
  document.querySelectorAll(selector).forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      scrollToSection(target);
      // Responsive menüde tıklandıysa menüyü kapat
      if (window.innerWidth < 895 && respButs.style.display === 'flex') {
        respButs.style.display = 'none';
      }
    });
  });
});
