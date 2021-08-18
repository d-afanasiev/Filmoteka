import teammateTpl from '../templates/teammate.hbs';
import teammatesData from './json/teammates.json';
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import { refs } from './refs';

const { footerTeamLink, lightboxRef, closeLightboxBtn, teamList, lightboxOverlay } = refs;

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
