import { refs } from './refs';

const { arrowTop, headerHome } = refs;

function arrowScrollTop() {
  if (window.scrollY > 50) {
    arrowTop.classList.add('arrow-show');
    arrowTop.classList.remove('arrow-hidden');
  } else {
    arrowTop.classList.add('arrow-hidden');
    arrowTop.classList.remove('arrow-show');
  }

  arrowTop.addEventListener('click', () => {
    headerHome.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  });
}

window.addEventListener('scroll', arrowScrollTop);
