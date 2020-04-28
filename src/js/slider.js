export default {
    index: 0,
    timeSlide: 1000,
    timeToChange: 5000,
    countToChange: 0,
    bannerAtual: null,
    autoPlay: true,
    proxBanner: null,
    timerObj: null,
    timerStarted: false,
    direction: '',
    getControls() {
        this.carrouselSlider = document.querySelector('.slider-carrousel');
        this.banners = document.querySelectorAll('.banner-slide .carousel-item');
        this.nextBtn = document.querySelector('.banner-nav.next-slide');
        this.prevBtn = document.querySelector('.banner-nav.prev-slide');
        this.bulletsNav = document.querySelectorAll('.bullet-item');
        this.card = document.querySelector('.banner-card')
        this.cardTitle = document.querySelector('.banner-card .card-title')
        this.cardBody = document.querySelector('.banner-card .card-body')
        this.cardFooter = document.querySelector('.banner-card .card-footer')
    },
    getData() {
        this.dataCards = [].map.call(this.banners, function(item) {
            let banner = {
                id: item.getAttribute('id'),
                title: item.querySelector('.card-title').innerHTML,
                body: item.querySelector('.card-body').innerHTML,
                link: item.querySelector('.card-footer a').getAttribute('href')
            }
            return banner;
        })
    },
    actions() {
        this.nextBtn.onclick = () => this.next();
        this.prevBtn.onclick = () => this.prev();
        this.bulletsNav.forEach((element, i) => {
            element.addEventListener('click', () => { this.show(i) })
        });
    },
    update() {
        if (this.banners.length <= 0) return;
        //if (this.bannerAtual === null) bannerAtual = this.banners[this.index];

        //banners
        // this.banners.forEach(banner => {
        //     banner.classList.remove('active');
        // });
        if (this.direction === 'next') {
            let b = this.banners[this.index]
            b.classList.add('carousel-item-next', 'carousel-item-left');
            setTimeout(() => {
                b.classList.remove('carousel-item-next', 'carousel-item-left');
                b.classList.add('active');
            }, this.timeSlide)
        } else if (this.direction === 'prev') {
            let b = this.banners[this.index]
            b.classList.add('carousel-item-prev', 'carousel-item-right');
            setTimeout(() => {
                b.classList.remove('carousel-item-prev', 'carousel-item-right');
                b.classList.add('active');
            }, this.timeSlide)
        } else {
            this.banners[this.index].classList.add('active');
        }

        this.bannerAtual = this.banners[this.index];

        //bullets de navegação
        this.bulletsNav.forEach(b => {
            b.classList.remove('active');
        });
        this.bulletsNav[this.index].classList.add('active');
        this.populateCard(this.index);
        this.countToChange = 0;
        if (this.autoPlay) this.resetTimer();
    },
    slide() {
        //this.carrouselSlider.style.transition = "transform .5s ease-in-out";
        if (this.direction === 'next') {
            let b = this.bannerAtual
            b.classList.add('carousel-item-left');
            setTimeout(() => { b.classList.remove('active', 'carousel-item-left'); }, this.timeSlide)
        } else if (this.direction === 'prev') {
            let b = this.bannerAtual
            b.classList.add('carousel-item-right');
            setTimeout(() => {
                b.classList.remove('active', 'carousel-item-right');
            }, this.timeSlide)
        }

        this.update();
    },
    next() {
        this.direction = 'next';
        (this.index == this.banners.length - 1) ? this.index = 0: this.index++;
        this.slide();
    },
    prev() {
        this.direction = 'prev';
        (this.index == 0) ? this.index = this.banners.length - 1: this.index--;
        this.slide();
    },
    populateCard(index) {
        this.cardTitle.innerHTML = this.dataCards[index].title
        this.cardBody.innerHTML = this.dataCards[index].body
        this.cardFooter.querySelector('.btn-card').setAttribute('href', this.dataCards[index].link)
    },
    show(index) {
        if (index == this.index) return;
        this.direction = (index > this.index) ? 'next' : 'prev';
        this.index = index;
        this.slide();
    },
    anima() {
        this.countToChange++;
        if (this.countToChange >= this.maxToChange) {
            this.countToChange = 0;
            this.next();
        }
    },
    startTimer() {
        if (!this.timerObj && !this.timerStarted) {
            this.stopTimer();
            this.timerObj = setInterval(() => { this.next() }, this.timeToChange);
            this.timerStarted = true;
        }
    },
    stopTimer() {
        if (this.timerObj) {
            clearInterval(this.timerObj);
            this.timerObj = null;
            this.timerStarted = false;
        }
    },
    resetTimer() {
        this.stopTimer();
        this.startTimer();
    },
    start() {
        this.getControls();
        if (this.carrouselSlider === null) return
        this.getData();
        this.actions();
        this.update();
    }

}