(() => {
  class TxtType {
    constructor(el, toRotate, period) {
      this.toRotate = toRotate;
      this.el = el;
      this.loopNum = 0;
      this.period = parseInt(period, 10) || 2000;
      this.txt = '';
      this.tick();
      this.isDeleting = false;
    }

    tick() {
      const i = this.loopNum % this.toRotate.length;
      const fullTxt = this.toRotate[i];
      if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
      } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
      }

      this.el.innerHTML = `<span class="wrap">${this.txt}</span>`;

      let delta = 200 - Math.random() * 100;

      if (this.isDeleting) { delta /= 2; }

      if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
      } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum += 1;
        delta = 500;
      }

      setTimeout(() => {
        this.tick();
      }, delta);
    }
  }

  const typewriter = () => {
    const elements = document.getElementsByClassName('typewrite');
    for (let i = 0; i < elements.length; i += 1) {
      const toRotate = elements[i].getAttribute('data-type');
      const period = elements[i].getAttribute('data-period');
      if (toRotate) {
        new TxtType(elements[i], JSON.parse(toRotate), period);
      }
    }
    // INJECT CSS
    const css = document.createElement('style');
    css.type = 'text/css';
    css.innerHTML = '.typewrite > .wrap { border-right: 0.08em solid #fff; animation: blink-caret 1s step-end infinite;}';
    document.body.appendChild(css);
  };

  const navOnScroll = () => {
    const bodyPosition = document.body.scrollTop || document.documentElement.scrollTop;
    const nav = document.querySelector('nav');

    bodyPosition > 0 
      ? nav.classList.add('nav-scroll')
      : nav.classList.remove('nav-scroll');
  };

  const scrollHandler = (location) => {
    const locationPosition = location === '#' ? 0 : document.querySelector(location).offsetTop;

    window.scrollTo({
      left: 0,
      top: locationPosition,
      behavior: 'smooth',
    });
  };

  const onNavClick = () => {
    const linksSelection = document.querySelectorAll('.selection-link');
    const links = [...linksSelection];

    links.forEach((link) => {
      link.addEventListener('click', (event) => {
        const href = event.target.getAttribute('href') || event.target.dataset.href;

        event.preventDefault();
        scrollHandler(href);
      });
    });
  };

  const openPortfolioModal = (id) => {
    const modal = document.querySelector(`#${id}`);
    modal.style.display = 'block';
  };

  const onPortfolioImgClick = () => {
    const portfolioImages = document.querySelectorAll('.single-work');
    const portfolioImagesArr = [...portfolioImages];
    portfolioImagesArr.forEach((img) => {
      img.addEventListener('click', (event) => {
        openPortfolioModal(event.currentTarget.dataset.id);
      });
    });
  };

  const closeModal = () => {
    const modals = document.querySelectorAll('.modal');
    const modalsArr = [...modals];
    modalsArr.forEach((modal) => {
      modal.style.display = 'none';
    });
  };

  const clickToCloseModal = () => {
    const buttons = document.querySelectorAll('.close-modal');
    const buttonsArr = [...buttons];
    const modals = document.querySelectorAll('.modal');
    const modalsArr = [...modals];

    modalsArr.forEach((modal) => {
      modal.addEventListener('click', (event) => {
        event.stopPropagation();
        if (event.target.classList.contains('modal')) {
          closeModal();
        }
      });
    });

    buttonsArr.forEach((button) => {
      button.addEventListener('click', () => {
        closeModal();
      });
    });
  };

  const mobileNavigation = () => {
    const mobileNav = document.querySelector('.mobile-nav');
    const navButton = document.querySelector('.nav-btn');

    navButton.addEventListener('click', () => {
      mobileNav.classList.toggle('my-mobile-navigation-opened');
      const buttonI = document.querySelector('.nav-btn i');

      if (buttonI.classList.contains('fa-bars')) {
        buttonI.classList.remove('fa-bars');
        buttonI.classList.add('fa-times');
      } else {
        buttonI.classList.remove('fa-times');
        buttonI.classList.add('fa-bars');
      }
    });
  };

  const init = () => {
    typewriter();
    window.addEventListener('scroll', navOnScroll);
    navOnScroll();
    onNavClick();
    onPortfolioImgClick();
    clickToCloseModal();
    mobileNavigation();
  };

  window.addEventListener('load', init);
})();
