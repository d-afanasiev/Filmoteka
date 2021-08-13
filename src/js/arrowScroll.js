const refs = {
  arrowTop: document.querySelector('.arrow-top'),
  headerHome: document.querySelector('.header-home'),
};

function arrowScrollTop() {
  if (window.scrollY > 50) {
    refs.arrowTop.classList.add('arrow-show');
    refs.arrowTop.classList.remove('arrow-hidden');
  } else {
    refs.arrowTop.classList.add('arrow-hidden');
    refs.arrowTop.classList.remove('arrow-show');
  }

  refs.arrowTop.addEventListener('click', () => {
    refs.headerHome.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  });
}

window.addEventListener('scroll', arrowScrollTop);
