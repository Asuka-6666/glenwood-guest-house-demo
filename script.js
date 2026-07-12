const header = document.querySelector('#siteHeader');
const menuButton = document.querySelector('#menuButton');
const siteNav = document.querySelector('#siteNav');
const menuBackdrop = document.querySelector('#menuBackdrop');
const bookingOverlay = document.querySelector('#bookingOverlay');
const galleryOverlay = document.querySelector('#galleryOverlay');
const roomOverlay = document.querySelector('#roomOverlay');
const bookingForm = document.querySelector('#bookingForm');
const bookingResults = document.querySelector('#bookingResults');
const config = window.siteConfig;

document.querySelectorAll('a[href^="tel:"]').forEach(link => { link.href = config.property.phoneHref; });
document.querySelectorAll('a[href*="google.com/maps"], a[href*="maps.google.com"]').forEach(link => { link.href = config.links.googleMaps; });
document.querySelectorAll('a[href*="booking.com/hotel/gb/glenwood-guest-house"]').forEach(link => { link.href = config.links.bookingReviews; });
document.querySelectorAll('a[target="_blank"]').forEach(link => { link.rel = 'noopener noreferrer'; });
const configuredAddress = document.querySelector('#propertyAddress');
if (configuredAddress) configuredAddress.textContent = config.property.address;
document.querySelectorAll('.score-line strong, .mobile-review-score > strong').forEach(element => { element.textContent = config.reviews.booking.score; });
document.querySelectorAll('.score-line b, .mobile-review-score > b').forEach(element => {
  const label = element.querySelector('small');
  element.replaceChildren(document.createTextNode(String(config.reviews.booking.count)), label);
});
document.querySelector('#primaryReviewQuote').textContent = `“${config.reviews.booking.quote}”`;
document.querySelector('#primaryReviewSource').textContent = config.reviews.booking.quoteSource;
document.querySelector('#googleReviewStack').innerHTML = config.reviews.google.entries.map(entry => `<a class="google-review-card" href="${config.links.googleReviews}" target="_blank" rel="noopener noreferrer"><header><span class="review-avatar${entry.tone === 'green' ? ' avatar-green' : entry.tone === 'rust' ? ' avatar-rust' : ''}">${entry.initial}</span><span class="review-identity"><strong>${entry.name}</strong><small>Google review · ${entry.date}</small></span><b class="google-mark">G</b></header><div class="google-stars" aria-label="${entry.stars} out of 5 stars">${'★'.repeat(entry.stars)}</div><p>“${entry.text}”</p><footer><span>Read on Google</span><span>↗</span></footer></a>`).join('');
document.querySelector('#faqAccordion').innerHTML = config.faq.map(([question, answer]) => `<details class="reveal"><summary>${question}</summary><p>${answer}</p></details>`).join('');

const setHeader = () => header.classList.toggle('scrolled', window.scrollY > 40);
setHeader();
window.addEventListener('scroll', setHeader, { passive: true });

const fullReviewScore = document.querySelector('.review-score');
const mobileReviewScore = document.querySelector('.mobile-review-score');
if (fullReviewScore && mobileReviewScore) {
  const scoreObserver = new IntersectionObserver(entries => {
    const scoreHasPassed = !entries[0].isIntersecting && entries[0].boundingClientRect.bottom < 84;
    mobileReviewScore.classList.toggle('show', scoreHasPassed && window.innerWidth <= 620);
  }, { threshold: 0.05 });
  scoreObserver.observe(fullReviewScore);
  window.addEventListener('resize', () => {
    if (window.innerWidth > 620) mobileReviewScore.classList.remove('show');
  });
}

menuButton.addEventListener('click', () => {
  const open = siteNav.classList.toggle('open');
  menuBackdrop.classList.toggle('open', open);
  document.body.classList.toggle('no-scroll', open);
  menuButton.setAttribute('aria-expanded', String(open));
  if (open) siteNav.querySelector('a')?.focus();
});
siteNav.addEventListener('click', () => {
  siteNav.classList.remove('open');
  menuBackdrop.classList.remove('open');
  document.body.classList.remove('no-scroll');
  menuButton.setAttribute('aria-expanded', 'false');
});
menuBackdrop.addEventListener('click', () => {
  siteNav.classList.remove('open');
  menuBackdrop.classList.remove('open');
  document.body.classList.remove('no-scroll');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.focus();
});

let lastFocusedElement = null;
const openOverlay = (overlay) => {
  lastFocusedElement = document.activeElement;
  overlay.hidden = false;
  document.body.classList.add('no-scroll');
  overlay.querySelector('button, input, [href]')?.focus();
};
const closeOverlay = (overlay) => {
  overlay.hidden = true;
  document.body.classList.remove('no-scroll');
  lastFocusedElement?.focus();
};

document.querySelectorAll('[data-book]').forEach(button => button.addEventListener('click', () => {
  bookingForm.elements.room.value = button.dataset.roomPreselect || '';
  bookingResults.hidden = true;
  document.querySelectorAll('.booking-progress span').forEach((step, index) => step.classList.toggle('active', index === 0));
  openOverlay(bookingOverlay);
}));
bookingOverlay.querySelectorAll('[data-close]').forEach(button => button.addEventListener('click', () => closeOverlay(bookingOverlay)));
document.querySelector('#openGallery').addEventListener('click', () => openOverlay(galleryOverlay));
document.querySelector('[data-gallery-close]').addEventListener('click', () => closeOverlay(galleryOverlay));

bookingForm.addEventListener('submit', event => {
  event.preventDefault();
  const errors = [];
  const checkInDate = new Date(`${bookingForm.elements.checkin.value}T12:00:00`);
  const checkOutDate = new Date(`${bookingForm.elements.checkout.value}T12:00:00`);
  const startOfToday = new Date(); startOfToday.setHours(0, 0, 0, 0);
  const adults = Number(bookingForm.elements.adults.value);
  const children = Number(bookingForm.elements.children.value);
  if (!bookingForm.elements.checkin.value || !bookingForm.elements.checkout.value) errors.push('Please choose both your check-in and check-out dates.');
  if (bookingForm.elements.checkin.value && checkInDate < startOfToday) errors.push('Please choose a check-in date that is not in the past.');
  if (bookingForm.elements.checkout.value && bookingForm.elements.checkin.value && checkOutDate <= checkInDate) errors.push('Please choose a check-out date after your check-in date.');
  if (adults < 1) errors.push('At least one adult is required.');
  if (bookingForm.elements.room.value === 'double' && adults + children > 2) errors.push('The Double Room is shown for a maximum of two guests. Choose another preference or reduce the number of guests.');
  if (bookingForm.elements.room.value === 'twin' && adults + children > 2) errors.push('The Twin Room is shown for a maximum of two guests. Choose another preference or reduce the number of guests.');
  const errorBox = document.querySelector('#bookingErrors');
  errorBox.innerHTML = errors.map(error => `<p>${error}</p>`).join('');
  errorBox.hidden = errors.length === 0;
  if (errors.length) {
    errorBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    return;
  }
  const submitButton = bookingForm.querySelector('.form-submit');
  const originalButtonText = submitButton.textContent;
  submitButton.disabled = true;
  submitButton.textContent = 'Searching…';
  bookingResults.hidden = true;
  document.querySelector('#bookingContinue').hidden = true;
  const selectedRoom = bookingForm.elements.room.value;
  const resultsContainer = bookingResults;
  const resultCards = [...document.querySelectorAll('[data-result-room]')];
  resultCards.forEach(card => {
    card.classList.remove('is-selected');
    card.querySelector('[data-choose-room]').textContent = 'Choose this room';
  });
  window.setTimeout(() => {
    resultCards.forEach(card => { card.hidden = false; });
    const preferredCard = resultCards.find(card => card.dataset.resultRoom === selectedRoom);
    if (preferredCard) resultsContainer.querySelector('.results-heading').after(preferredCard);
    document.querySelectorAll('.booking-progress span').forEach((step, index) => step.classList.toggle('active', index === 1));
    submitButton.disabled = false;
    submitButton.textContent = originalButtonText;
    bookingResults.hidden = false;
    bookingResults.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 350);
});

const formatStayDate = value => new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(`${value}T12:00:00`));
document.querySelectorAll('[data-choose-room]').forEach(button => button.addEventListener('click', () => {
  const continuePanel = document.querySelector('#bookingContinue');
  document.querySelectorAll('[data-result-room]').forEach(card => {
    const selected = card === button.closest('[data-result-room]');
    card.classList.toggle('is-selected', selected);
    card.querySelector('[data-choose-room]').textContent = selected ? 'Selected' : 'Choose this room';
  });
  const adults = Number(bookingForm.elements.adults.value);
  const children = Number(bookingForm.elements.children.value);
  document.querySelector('#summaryDates').textContent = `${formatStayDate(bookingForm.elements.checkin.value)} — ${formatStayDate(bookingForm.elements.checkout.value)}`;
  document.querySelector('#summaryGuests').textContent = `${adults} adult${adults === 1 ? '' : 's'} · ${children} ${children === 1 ? 'child' : 'children'}`;
  document.querySelector('#summaryRoom').textContent = button.dataset.roomLabel;
  document.querySelectorAll('.booking-progress span').forEach((step, index) => step.classList.toggle('active', index === 2));
  document.querySelector('#demoContinueMessage').hidden = true;
  bookingResults.hidden = true;
  continuePanel.hidden = false;
  continuePanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
}));

document.querySelector('#backToRooms').addEventListener('click', () => {
  document.querySelector('#bookingContinue').hidden = true;
  bookingResults.hidden = false;
  document.querySelectorAll('.booking-progress span').forEach((step, index) => step.classList.toggle('active', index === 1));
  bookingResults.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

document.querySelector('#demoContinue').addEventListener('click', () => {
  document.querySelector('#demoContinueMessage').hidden = false;
});

const galleryFigures = [...document.querySelectorAll('.gallery-grid figure')];
galleryFigures.forEach(figure => {
  const image = figure.querySelector('img');
  const markLoaded = () => figure.classList.add('loaded');
  if (image.complete) markLoaded(); else image.addEventListener('load', markLoaded, { once: true });
});
const galleryFilters = [...document.querySelectorAll('[data-filter]')];
const applyGalleryFilter = filter => {
  galleryFilters.forEach(button => button.classList.toggle('active', button.dataset.filter === filter));
  galleryFigures.forEach(figure => { figure.hidden = filter !== 'all' && figure.dataset.category !== filter; });
};
galleryFilters.forEach(button => button.addEventListener('click', () => applyGalleryFilter(button.dataset.filter)));

let activeRoomKey = null;
const roomModalImages = document.querySelector('#roomModalImages');
const roomImageProgress = document.querySelector('#roomImageProgress');
const roomMediaControls = document.querySelector('.room-media-controls');
let roomImageIndex = 0;
const showRoomImage = index => {
  const total = roomModalImages.children.length || 1;
  roomImageIndex = (index + total) % total;
  [...roomModalImages.children].forEach((image, imageIndex) => { image.hidden = imageIndex !== roomImageIndex; });
  roomImageProgress.textContent = `${roomImageIndex + 1} / ${total}`;
  roomMediaControls.hidden = total <= 1;
};
const openRoomDetails = roomKey => {
  const room = config.rooms[roomKey];
  if (!room) return;
  activeRoomKey = roomKey;
  document.querySelector('#roomModalTitle').textContent = room.name;
  document.querySelector('#roomModalGuests').textContent = `Sleeps up to ${room.capacity}`;
  document.querySelector('#roomModalBed').textContent = room.bed;
  document.querySelector('#roomModalBathroom').textContent = room.bathroom;
  document.querySelector('#roomModalDescription').textContent = room.summary;
  roomModalImages.innerHTML = room.images.map(([src, alt]) => `<img src="${src}" alt="${alt}" loading="lazy">`).join('');
  showRoomImage(0);
  openOverlay(roomOverlay);
};
document.querySelector('#roomImagePrev').addEventListener('click', () => showRoomImage(roomImageIndex - 1));
document.querySelector('#roomImageNext').addEventListener('click', () => showRoomImage(roomImageIndex + 1));
document.querySelectorAll('button.room-detail, button.booking-action-room-link').forEach(button => {
  button.addEventListener('click', () => openRoomDetails(button.dataset.room));
});
roomOverlay.querySelectorAll('[data-room-close]').forEach(button => button.addEventListener('click', () => closeOverlay(roomOverlay)));
document.querySelector('#roomModalBook').addEventListener('click', () => {
  closeOverlay(roomOverlay);
  bookingForm.elements.room.value = activeRoomKey || '';
  bookingResults.hidden = true;
  openOverlay(bookingOverlay);
});

const lightbox = document.querySelector('#lightbox');
const lightboxImage = lightbox.querySelector('img');
const lightboxCaption = lightbox.querySelector('figcaption');
const lightboxProgress = lightbox.querySelector('.lightbox-progress');
let lightboxItems = [];
let lightboxIndex = 0;
const showLightboxImage = index => {
  if (!lightboxItems.length) return;
  lightboxIndex = (index + lightboxItems.length) % lightboxItems.length;
  const item = lightboxItems[lightboxIndex];
  lightboxImage.src = item.src;
  lightboxImage.alt = item.alt;
  lightboxCaption.textContent = item.caption;
  lightboxProgress.textContent = `${lightboxIndex + 1} / ${lightboxItems.length}`;
};
const openLightbox = (items, startIndex = 0) => {
  if (!items.length) return;
  lightboxItems = items;
  showLightboxImage(startIndex);
  lastFocusedElement = document.activeElement;
  lightbox.hidden = false;
  document.body.classList.add('no-scroll');
  lightbox.querySelector('.lightbox-close').focus();
};
const roomLightboxItems = roomKey => {
  const room = config.rooms[roomKey];
  if (!room) return [];
  return room.images.map(([src, alt]) => ({ src, alt, caption: `${room.name} · ${alt}` }));
};
galleryFigures.forEach(figure => figure.addEventListener('click', () => {
  const visible = galleryFigures.filter(item => !item.hidden);
  openLightbox(visible.map(item => {
    const image = item.querySelector('img');
    return { src: image.src, alt: image.alt, caption: item.querySelector('figcaption').textContent };
  }), visible.indexOf(figure));
}));
document.querySelectorAll('.booking-view-room').forEach(button => {
  button.addEventListener('click', () => openLightbox(roomLightboxItems(button.dataset.room), 0));
});
document.querySelectorAll('.booking-room-gallery > img').forEach(image => {
  image.style.cursor = 'zoom-in';
  image.addEventListener('click', () => {
    const roomKey = image.closest('[data-result-room]')?.dataset.resultRoom;
    if (roomKey) openLightbox(roomLightboxItems(roomKey), 0);
  });
});
roomModalImages.addEventListener('click', event => {
  if (event.target.tagName !== 'IMG' || !activeRoomKey) return;
  openLightbox(roomLightboxItems(activeRoomKey), roomImageIndex);
});
const closeLightbox = () => {
  lightbox.hidden = true;
  if (bookingOverlay.hidden && roomOverlay.hidden && galleryOverlay.hidden && !siteNav.classList.contains('open')) {
    document.body.classList.remove('no-scroll');
  }
  lastFocusedElement?.focus();
};
lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
lightbox.querySelector('.lightbox-prev').addEventListener('click', () => showLightboxImage(lightboxIndex - 1));
lightbox.querySelector('.lightbox-next').addEventListener('click', () => showLightboxImage(lightboxIndex + 1));
let lightboxTouchStartX = 0;
lightbox.addEventListener('touchstart', event => { lightboxTouchStartX = event.changedTouches[0].clientX; }, { passive: true });
lightbox.addEventListener('touchend', event => {
  const distance = event.changedTouches[0].clientX - lightboxTouchStartX;
  if (Math.abs(distance) < 45) return;
  showLightboxImage(lightboxIndex + (distance < 0 ? 1 : -1));
}, { passive: true });

const copyAddress = document.querySelector('#copyAddress');
copyAddress.addEventListener('click', async () => {
  const address = document.querySelector('#propertyAddress').textContent.trim();
  try {
    await navigator.clipboard.writeText(address);
    copyAddress.textContent = 'Address copied';
  } catch {
    copyAddress.textContent = address;
  }
  window.setTimeout(() => { copyAddress.textContent = 'Copy address'; }, 2200);
});

const faqItems = [...document.querySelectorAll('.accordion details')];
faqItems.forEach((details, index) => {
  const summary = details.querySelector('summary');
  const answer = details.querySelector('p');
  const answerId = `faq-answer-${index + 1}`;
  answer.id = answerId;
  summary.setAttribute('aria-controls', answerId);
  summary.setAttribute('aria-expanded', String(details.open));
  details.addEventListener('toggle', () => {
    summary.setAttribute('aria-expanded', String(details.open));
    if (details.open) faqItems.filter(item => item !== details && item.open).forEach(item => { item.open = false; });
  });
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && siteNav.classList.contains('open')) {
    siteNav.classList.remove('open');
    menuBackdrop.classList.remove('open');
    document.body.classList.remove('no-scroll');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.focus();
    return;
  }
  if (!lightbox.hidden && event.key === 'ArrowLeft') showLightboxImage(lightboxIndex - 1);
  if (!lightbox.hidden && event.key === 'ArrowRight') showLightboxImage(lightboxIndex + 1);
  if (event.key === 'Escape') {
    if (!lightbox.hidden) closeLightbox();
    else if (!roomOverlay.hidden) closeOverlay(roomOverlay);
    else if (!bookingOverlay.hidden) closeOverlay(bookingOverlay);
    else if (!galleryOverlay.hidden) closeOverlay(galleryOverlay);
  }
  if (event.key === 'Tab') {
    const activeLayer = !lightbox.hidden ? lightbox : !roomOverlay.hidden ? roomOverlay : !bookingOverlay.hidden ? bookingOverlay : !galleryOverlay.hidden ? galleryOverlay : siteNav.classList.contains('open') ? siteNav : null;
    if (!activeLayer) return;
    const focusable = [...activeLayer.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), details summary')].filter(item => item.offsetParent !== null);
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: .08 });
document.querySelectorAll('.reveal').forEach(element => observer.observe(element));

const today = new Date();
const tomorrow = new Date(today); tomorrow.setDate(today.getDate() + 1);
const dayAfter = new Date(today); dayAfter.setDate(today.getDate() + 3);
const toDateInput = date => date.toISOString().split('T')[0];
const checkin = bookingForm.elements.checkin;
const checkout = bookingForm.elements.checkout;
checkin.min = toDateInput(today); checkin.value = toDateInput(tomorrow);
checkout.min = toDateInput(tomorrow); checkout.value = toDateInput(dayAfter);
checkin.addEventListener('change', () => {
  const next = new Date(`${checkin.value}T12:00:00`); next.setDate(next.getDate() + 1);
  checkout.min = toDateInput(next);
  if (checkout.value < checkout.min) checkout.value = checkout.min;
});
