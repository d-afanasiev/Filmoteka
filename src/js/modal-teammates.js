import teammateTpl from '../templates/teammate.hbs';
import teammatesData from './json/teammates.json';
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

const teammatesHTML = teammateTpl(
  teammatesData.map(teammate => {
    teammate.role = teammate.role.toUpperCase();
    teammate.name = teammate.name
      .split('-')
      .map(word => `${word[0].toUpperCase()}${word.slice(1).toLowerCase()}`)
      .join(' ');
    return teammate;
  }),
);
const footerTeamLink = document.querySelector('.footer__team-link');
const lightboxRef = document.querySelector('.js-team-lightbox');
const closeLightboxBtn = document.querySelector('button[data-action="modal-close"]');
const teamList = document.querySelector('.js-team-list');
const lightboxOverlay = document.querySelector('.lightbox--teammates .lightbox__overlay');

teamList.insertAdjacentHTML('beforeend', teammatesHTML);

footerTeamLink.addEventListener('click', onFooterTeamLinkClick);

function onFooterTeamLinkClick(e) {
  e.preventDefault();
  lightboxRef.classList.add('is-opened');

  closeLightboxBtn.addEventListener('click', closeLightbox);
  lightboxRef.addEventListener('click', onlightboxRefClick);
  window.addEventListener('keydown', onEscBtnKeydown);

  disableBodyScroll(lightboxRef);
}

function onlightboxRefClick(e) {
  const isLightbox__overlayClicked = e.target === lightboxOverlay;

  if (isLightbox__overlayClicked) {
    closeLightbox();
  }
}

function closeLightbox() {
  lightboxRef.classList.remove('is-opened');
  closeLightboxBtn.removeEventListener('click', closeLightbox);
  lightboxRef.removeEventListener('click', onlightboxRefClick);
  window.removeEventListener('keydown', onEscBtnKeydown);

  enableBodyScroll(lightboxRef);
  clearAllBodyScrollLocks();
}

function onEscBtnKeydown(e) {
  const isEscBtnClicked = e.key === 'Escape';

  if (isEscBtnClicked) {
    closeLightbox();
  }
}
