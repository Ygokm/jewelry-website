class Slider {
    constructor() {
        this.slides = document.querySelectorAll('.slide');
        this.prevBtn = document.querySelector('.slider-btn.prev');
        this.nextBtn = document.querySelector('.slider-btn.next');
        this.currentSlide = 0;
        
        this.init();
    }
    
    init() {
        this.showSlide(this.currentSlide);
        
        this.prevBtn.addEventListener('click', () => {
            this.prevSlide();
        });
        
        this.nextBtn.addEventListener('click', () => {
            this.nextSlide();
        });
        
        // Автопрокрутка
        setInterval(() => {
            this.nextSlide();
        }, 5000);
    }
    
    showSlide(index) {
        this.slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        this.slides[index].classList.add('active');
    }
    
    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
        this.showSlide(this.currentSlide);
    }
    
    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.showSlide(this.currentSlide);
    }
}

// Инициализация слайдера при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.slider')) {
        new Slider();
    }
});