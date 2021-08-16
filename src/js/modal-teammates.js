import teammateTpl from '../templates/teammate.hbs';
import teammatesData from './json/teammates.json';
console.log('🚀 ~ teammatesData', teammatesData);

console.log('🚀 ~  teammateTpl', teammateTpl);

const teammatesHTML = teammateTpl(teammatesData);
console.log('🚀 ~  teammatesHTML', teammatesHTML);

const footerTeamLink = document.querySelector('.footer__team-link');
const lightboxRef = document.querySelector('.js-team-lightbox');
const closeLightboxBtn = document.querySelector('button[data-action="close-lightbox"]');
const teamList = document.querySelector('.js-team-list');

teamList.insertAdjacentHTML('beforeend', teammatesHTML);

footerTeamLink.addEventListener('click', onFooterTeamLinkClick);

function onFooterTeamLinkClick(e) {
  e.preventDefault();
  lightboxRef.classList.add('is-open');

  lightboxRef.addEventListener('click', onlightboxRefClick);
  window.addEventListener('keydown', onEscBtnKeydown);

  const scrollY = document.documentElement.style.getPropertyValue('--scroll-y');
  const body = document.body;
  body.style.position = 'fixed';
  body.style.top = `-${scrollY}`;
}

function onlightboxRefClick(e) {
  const isCloseBtnClicked = e.target.dataset.action === 'close-lightbox';

  if (isCloseBtnClicked) {
    closeLightbox();
  }

  const isLightbox__overlayClicked = e.target === document.querySelector('.lightbox-team__overlay');

  if (isLightbox__overlayClicked) {
    closeLightbox();
  }
}

function closeLightbox() {
  lightboxRef.classList.remove('is-open');
  closeLightboxBtn.removeEventListener('click', onlightboxRefClick);
  window.removeEventListener('keydown', onEscBtnKeydown);

  const body = document.body;
  const scrollY = body.style.top;
  body.style.position = '';
  body.style.top = '';
  window.scrollTo(0, parseInt(scrollY || '0') * -1);
}

function onEscBtnKeydown(e) {
  const isEscBtnClicked = e.code === 'Escape';

  if (isEscBtnClicked) {
    closeLightbox();
  }
}

window.addEventListener('scroll', () => {
  document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`);
});
