const footerTeamLink = document.querySelector('.footer__team-link');
const lightboxRef = document.querySelector('.js-lightbox');
const closeLightboxBtn = document.querySelector('button[data-action="close-lightbox"]');

footerTeamLink.addEventListener('click', onFooterTeamLinkClick);

function onFooterTeamLinkClick(e) {
  e.preventDefault();
  lightboxRef.classList.add('is-open');

  lightboxRef.addEventListener('click', onlightboxRefClick);
  window.addEventListener('keydown', onEscBtnKeydown);
}

function onlightboxRefClick(e) {
  const isCloseBtnClicked = e.target.dataset.action === 'close-lightbox';

  if (isCloseBtnClicked) {
    closeLightbox();
  }

  const lightbox__overlayRef = document.querySelector('.lightbox__overlay');
  const isLightbox__overlayClicked = e.target === lightbox__overlayRef;

  if (isLightbox__overlayClicked) {
    closeLightbox();
  }
}

function closeLightbox() {
  lightboxRef.classList.remove('is-open');
  closeLightboxBtn.removeEventListener('click', onlightboxRefClick);
  window.removeEventListener('keydown', onEscBtnKeydown);
}

function onEscBtnKeydown(e) {
  const isEscBtnClicked = e.code === 'Escape';

  if (isEscBtnClicked) {
    closeLightbox();
  }
}
