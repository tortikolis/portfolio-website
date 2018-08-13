(() => {
const TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    
    let i = this.loopNum % this.toRotate.length;
    let fullTxt = this.toRotate[i];

    if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    let delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
    }

    setTimeout(() => {
        this.tick();
        }, delta);

};

const typewriter = () => {
    const elements = document.getElementsByClassName('typewrite');
    for (let i=0; i<elements.length; i++) {
        let toRotate = elements[i].getAttribute('data-type');
        let period = elements[i].getAttribute('data-period');
        if (toRotate) {
          new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    const css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff; animation: blink-caret 1s step-end infinite;}";
    document.body.appendChild(css);
};

const navOnScroll = () => {
    const bodyPosition = document.body.scrollTop || document.documentElement.scrollTop;
    const nav = document.querySelector("nav");
    
    bodyPosition > 0 
    ? nav.classList.add("nav-scroll")
    : nav.classList.remove("nav-scroll");
}

const onNavClick = () => {
    const linksSelection = document.querySelectorAll(".selection-link");
    const links = [...linksSelection];
    
    links.forEach( link => {
        
        link.addEventListener("click", event => {
            const href = event.target.getAttribute("href") || event.target.dataset.href;
            
            event.preventDefault();
            scrollHandler(href)
        });
    })
}

const scrollHandler = location => {
    const locationPosition = location === "#" ? 0 : document.querySelector(location).offsetTop;

    window.scrollTo({
        left: 0,
        top: locationPosition,
        behavior: "smooth"
    })
}


const init = () => {
    typewriter();
    window.addEventListener("scroll", navOnScroll);
    onNavClick();
}

window.addEventListener("load", init)

})();
