(() => {
    const TxtType = function (el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    };

    TxtType.prototype.tick = function () {

        let i = this.loopNum % this.toRotate.length;
        let fullTxt = this.toRotate[i];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

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
        for (let i = 0; i < elements.length; i++) {
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

        links.forEach(link => {

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

    const onPortfolioImgClick = () => {
        const portfolioImages = document.querySelectorAll(".single-work");
        const portfolioImagesArr = [...portfolioImages];
        
        portfolioImagesArr.forEach(img => {
            img.addEventListener("click", event => {
                openPortfolioModal(event.currentTarget.dataset.id)
            })
        })
    }

    const openPortfolioModal = (id) => {
        const modal = document.querySelector(`#${id}`);
        modal.style.display = "block";
    }

    const clickToCloseModal = () => {
        const buttons = document.querySelectorAll(".close-modal");
        const buttonsArr = [...buttons];
        const modals = document.querySelectorAll(".modal");
        const modalsArr = [...modals];

        modalsArr.forEach(modal => {
            modal.addEventListener("click", event => {
                event.stopPropagation();
                if(event.target.classList.contains("modal")){
                    closeModal()
                }   
            })
        })
        
        buttonsArr.forEach(button => {
            button.addEventListener("click", event => {
                
                closeModal()  
            })
        })
    }

    const closeModal = () => {

        const modals = document.querySelectorAll(".modal");
        const modalsArr = [...modals];
        modalsArr.forEach((modal) => {
            modal.style.display = "none";
        })
    }

    const reorderMenuList = () => {
        const pageWidth = window.innerWidth;
        const navNode = document.querySelector("nav .my-container");
        const mobileNav = document.createElement("div");
        mobileNav.classList.add("mobile-nav");
        const navigation = document.querySelector(".my-navigation");
        const navigationInsideMobile = document.querySelector(".mobile-nav ul");

        if(pageWidth <= 800){
            navNode.insertAdjacentElement("beforeend", mobileNav);
            mobileNav.insertAdjacentElement("beforeend", navigation);
            navigation.classList.remove("my-navigation");
            navigation.classList.add("my-mobile-navigation");   
        } else {
            navNode.insertAdjacentElement("afterbegin", navigation);
            navigation.classList.add("my-navigation");
            navigation.classList.remove("my-mobile-navigation");
        }    
    }

    const mobileNavigation = () => {
        const mobileNav = document.querySelector(".mobile-nav")
        const navButton = document.querySelector(".nav-btn");
        
        navButton.addEventListener("click", event => {
            
            
            
            mobileNav.classList.toggle("my-mobile-navigation-opened");

            const buttonI = document.querySelector(".nav-btn i")

            if(buttonI.classList.contains("fa-bars")){
                buttonI.classList.remove("fa-bars");
                buttonI.classList.add("fa-times");               
            } else {
                buttonI.classList.remove("fa-times");
                buttonI.classList.add("fa-bars");
            }
        })
    }

    const init = () => {
        typewriter();
        window.addEventListener("scroll", navOnScroll);
        navOnScroll();
        onNavClick();
        onPortfolioImgClick();
        clickToCloseModal()
        reorderMenuList();
        mobileNavigation();
    }

    window.addEventListener("load", init)

})();
