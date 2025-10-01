document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const tamagotchi = document.getElementById('tamagotchi');
    const tamagotchiSound = document.getElementById('tamagotchiSound');
    const trackCards = document.querySelectorAll('.tv-item');
    const heroVideo = document.querySelector('.hero-video');

    // --- Movie Carousel Elements ---
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    const carouselTrack = document.querySelector('.carousel-track');
    const carouselPrevBtn = document.getElementById('carouselPrevBtn');
    const carouselNextBtn = document.getElementById('carouselNextBtn');

    // --- Moments Carousel Elements ---
    const momentsSlides = document.querySelectorAll('.moments-slide');
    const momentsIndicators = document.querySelectorAll('.moments-indicator');
    const momentsCarouselTrack = document.querySelector('.moments-carousel-track');
    const momentsPrevBtn = document.getElementById('momentsPrevBtn');
    const momentsNextBtn = document.getElementById('momentsNextBtn');

    // --- Movie Carousel State ---
    let currentSlide = 0;
    let autoPlayInterval;

    // --- Moments Carousel State ---
    let currentMomentsSlide = 0;
    let momentsAutoPlayInterval;

    // --- Tamagotchi Dragging Functionality ---
    let isDragging = false;
    let dragOffset = { x: 0, y: 0 };

    const startDrag = (e) => {
        isDragging = true;
        const rect = tamagotchi.getBoundingClientRect();
        dragOffset.x = e.clientX - rect.left;
        dragOffset.y = e.clientY - rect.top;
        tamagotchi.style.cursor = 'grabbing';
    };

    const drag = (e) => {
        if (!isDragging) return;
        
        const x = e.clientX - dragOffset.x;
        const y = e.clientY - dragOffset.y;
        
        // Ограничиваем перемещение в пределах окна
        const maxX = window.innerWidth - tamagotchi.offsetWidth;
        const maxY = window.innerHeight - tamagotchi.offsetHeight;
        
        tamagotchi.style.left = Math.max(0, Math.min(x, maxX)) + 'px';
        tamagotchi.style.top = Math.max(0, Math.min(y, maxY)) + 'px';
    };

    const stopDrag = () => {
        isDragging = false;
        tamagotchi.style.cursor = 'grab';
    };

    // --- Movie Carousel Functions ---
    function createInfiniteCarousel() {
        if (slides.length === 0) return;
        
        // Clone first and last slides for infinite effect
        const firstSlide = slides[0].cloneNode(true);
        const lastSlide = slides[slides.length - 1].cloneNode(true);
        
        // Add cloned slides
        carouselTrack.appendChild(firstSlide);
        carouselTrack.insertBefore(lastSlide, slides[0]);
        
        // Update track width for extra slides
        carouselTrack.style.width = `${(slides.length + 2) * 100}%`;
        
        // Update slide widths
        const allSlides = carouselTrack.querySelectorAll('.carousel-slide');
        allSlides.forEach(slide => {
            slide.style.width = `${100 / (slides.length + 2)}%`;
        });
        
        // Start at first real slide (index 1 because of cloned last slide)
        currentSlide = 0;
        carouselTrack.style.transform = `translateX(-${100 / (slides.length + 2)}%)`;
    }

    function updateSlideClasses() {
        const allSlides = carouselTrack.querySelectorAll('.carousel-slide');
        
        // Remove all classes
        allSlides.forEach(slide => {
            slide.classList.remove('center', 'adjacent');
        });
        
        // Find center slide (accounting for cloned slides)
        const centerIndex = currentSlide + 1; // +1 because of cloned last slide at start
        
        if (allSlides[centerIndex]) {
            allSlides[centerIndex].classList.add('center');
        }
        
        // Add adjacent classes
        if (allSlides[centerIndex - 1]) {
            allSlides[centerIndex - 1].classList.add('adjacent');
        }
        if (allSlides[centerIndex + 1]) {
            allSlides[centerIndex + 1].classList.add('adjacent');
        }
    }

    function showSlide(index, instant = false) {
        const totalSlides = slides.length + 2; // including cloned slides
        const slideWidth = 100 / totalSlides;
        const translateX = -((index + 1) * slideWidth); // +1 because of cloned last slide at start
        
        // Apply transform to carousel track
        if (carouselTrack) {
            if (instant) {
                carouselTrack.style.transition = 'none';
                carouselTrack.style.transform = `translateX(${translateX}%)`;
                // Force reflow
                carouselTrack.offsetHeight;
                carouselTrack.style.transition = 'transform 0.5s ease-in-out';
            } else {
                carouselTrack.style.transform = `translateX(${translateX}%)`;
            }
        }
        
        // Remove active class from all indicators
        indicators.forEach(indicator => {
            indicator.classList.remove('active');
        });
        
        // Activate current indicator
        if (indicators[index]) {
            indicators[index].classList.add('active');
        }
        
        currentSlide = index;
        updateSlideClasses();
    }

    function changeSlide(direction) {
        let newIndex = currentSlide + direction;
        
        // Handle infinite loop
        if (newIndex >= slides.length) {
            // Going forward past last slide
            showSlide(newIndex);
            setTimeout(() => {
                showSlide(0, true); // Jump to first slide instantly
            }, 500);
            newIndex = 0;
        } else if (newIndex < 0) {
            // Going backward past first slide
            showSlide(newIndex);
            setTimeout(() => {
                showSlide(slides.length - 1, true); // Jump to last slide instantly
            }, 500);
            newIndex = slides.length - 1;
        } else {
            showSlide(newIndex);
        }
        
        // Update currentSlide after timeout for infinite loop
        setTimeout(() => {
            currentSlide = newIndex;
        }, 500);
    }

    function goToSlide(index) {
        showSlide(index);
        resetAutoPlay();
    }

    function startAutoPlay() {
        autoPlayInterval = setInterval(() => {
            changeSlide(1);
        }, 4000); // Change slide every 4 seconds
    }

    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
        }
    }

    function resetAutoPlay() {
        stopAutoPlay();
        startAutoPlay();
    }

    // --- Moments Carousel Functions ---
    function showMomentsSlide(index) {
        const slideWidth = 100 / momentsSlides.length; // 20% for 5 slides
        const translateX = -(index * slideWidth);
        
        // Apply transform to moments carousel track
        if (momentsCarouselTrack) {
            momentsCarouselTrack.style.transform = `translateX(${translateX}%)`;
        }
        
        // Remove active class from all moments indicators
        momentsIndicators.forEach(indicator => {
            indicator.classList.remove('active');
        });
        
        // Activate current moments indicator
        if (momentsIndicators[index]) {
            momentsIndicators[index].classList.add('active');
        }
        
        currentMomentsSlide = index;
    }

    function changeMomentsSlide(direction) {
        let newIndex = currentMomentsSlide + direction;
        
        // Loop back to first slide if we go past the last one
        if (newIndex >= momentsSlides.length) {
            newIndex = 0;
        }
        // Loop to last slide if we go before the first one
        if (newIndex < 0) {
            newIndex = momentsSlides.length - 1;
        }
        
        showMomentsSlide(newIndex);
    }

    function goToMomentsSlide(index) {
        showMomentsSlide(index);
        resetMomentsAutoPlay();
    }

    function startMomentsAutoPlay() {
        momentsAutoPlayInterval = setInterval(() => {
            changeMomentsSlide(1);
        }, 5000); // Change slide every 5 seconds
    }

    function stopMomentsAutoPlay() {
        if (momentsAutoPlayInterval) {
            clearInterval(momentsAutoPlayInterval);
        }
    }

    function resetMomentsAutoPlay() {
        stopMomentsAutoPlay();
        startMomentsAutoPlay();
    }



    // --- Movie Carousel Event Listeners ---
    if (carouselPrevBtn) {
        carouselPrevBtn.addEventListener('click', () => changeSlide(-1));
    }
    
    if (carouselNextBtn) {
        carouselNextBtn.addEventListener('click', () => changeSlide(1));
    }
    
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => goToSlide(index));
    });

    // --- Moments Carousel Event Listeners ---
    if (momentsPrevBtn) {
        momentsPrevBtn.addEventListener('click', () => changeMomentsSlide(-1));
    }
    
    if (momentsNextBtn) {
        momentsNextBtn.addEventListener('click', () => changeMomentsSlide(1));
    }
    
    momentsIndicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => goToMomentsSlide(index));
    });

    // --- Tamagotchi Sound Function ---
    function playTamagotchiSound() {
        if (tamagotchiSound) {
            tamagotchiSound.currentTime = 0; // Reset to beginning
            tamagotchiSound.play().catch(error => {
                console.log('Audio play failed:', error);
            });
        }
    }

    // --- Tamagotchi Event Listeners ---
    if (tamagotchi) {
        tamagotchi.addEventListener('mousedown', startDrag);
        tamagotchi.addEventListener('click', playTamagotchiSound);
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', stopDrag);
    }

    // --- Smooth Scroll ---
    window.scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // --- Initialize Movie Carousel ---
    if (slides.length > 0 && carouselTrack) {
        createInfiniteCarousel();
        updateSlideClasses();
        startAutoPlay();
        
        // Pause auto-play when user hovers over carousel
        const carousel = document.querySelector('.movie-carousel');
        if (carousel) {
            carousel.addEventListener('mouseenter', stopAutoPlay);
            carousel.addEventListener('mouseleave', startAutoPlay);
        }
    }

    // --- Initialize Moments Carousel ---
    if (momentsSlides.length > 0 && momentsCarouselTrack) {
        showMomentsSlide(0);
        startMomentsAutoPlay();
        
        // Pause auto-play when user hovers over moments carousel
        const momentsCarousel = document.querySelector('.moments-carousel');
        if (momentsCarousel) {
            momentsCarousel.addEventListener('mouseenter', stopMomentsAutoPlay);
            momentsCarousel.addEventListener('mouseleave', startMomentsAutoPlay);
        }
    }

    // --- Floating Background Images Interaction ---
    const floatingImages = document.querySelectorAll('.floating-img');
    
    // Add parallax effect on mouse move
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        floatingImages.forEach((img, index) => {
            const speed = (index + 1) * 0.5;
            const x = (mouseX - 0.5) * speed * 20;
            const y = (mouseY - 0.5) * speed * 20;
            
            img.style.transform += ` translate(${x}px, ${y}px)`;
        });
    });

    // Add hover effects to floating images
    floatingImages.forEach(img => {
        img.addEventListener('mouseenter', () => {
            img.style.opacity = '0.8';
            img.style.transform += ' scale(1.2)';
        });
        
        img.addEventListener('mouseleave', () => {
            img.style.opacity = '0.3';
            img.style.transform = img.style.transform.replace(' scale(1.2)', '');
        });
    });

    // --- Hero Video Loop Playback ---
    if (heroVideo) {
        // Добавляем анимацию плавного движения вверх-вниз через 1 секунду
        setTimeout(() => {
            const heroContent = document.querySelector('.hero-content');
            if (heroContent) {
                heroContent.classList.add('animated');
            }
        }, 1000);
        
        // Настраиваем воспроизведение по кругу
        heroVideo.addEventListener('ended', () => {
            // Когда видео заканчивается, начинаем его заново
            heroVideo.currentTime = 0;
            heroVideo.play().catch(error => {
                console.log('Video replay failed:', error);
            });
        });

        // Убеждаемся, что видео воспроизводится автоматически и по кругу
        heroVideo.loop = true;
        heroVideo.muted = true; // Должно быть muted для автовоспроизведения
    }

    // --- TV Video Click Handler ---
    const tvItem = document.querySelector('.tv-item');
    if (tvItem) {
        const videos = [
            'img/video/nickelodeon.mp4',
            'img/video/foxkids.mp4', 
            'img/video/cartoonnet.mp4'
        ];
        let currentVideoIndex = 0;
        let isFirstClick = true;

        tvItem.addEventListener('click', () => {
            const videoElement = tvItem.querySelector('.tv-video');
            const overlay = tvItem.querySelector('.tv-play-overlay');
            
            if (videoElement) {
                if (isFirstClick) {
                    // Первый клик - скрываем overlay и начинаем воспроизведение
                    if (overlay) {
                        overlay.classList.add('hidden');
                    }
                    videoElement.play().catch(error => {
                        console.log('Video play failed:', error);
                    });
                    videoElement.muted = false;
                    isFirstClick = false;
                } else {
                    // Последующие клики - переключаем видео
                    currentVideoIndex = (currentVideoIndex + 1) % videos.length;
                    videoElement.src = videos[currentVideoIndex];
                    videoElement.load();
                    videoElement.play().catch(error => {
                        console.log('Video play failed:', error);
                    });
                    videoElement.muted = false;
                }
            }
        });

        // Автоматическое переключение видео по окончании
        const videoElement = tvItem.querySelector('.tv-video');
        if (videoElement) {
            videoElement.addEventListener('ended', () => {
                currentVideoIndex++;
                
                if (currentVideoIndex < videos.length) {
                    // Переключаем на следующее видео
                    videoElement.src = videos[currentVideoIndex];
                    videoElement.load();
                    videoElement.play().catch(error => {
                        console.log('Video play failed:', error);
                    });
                    videoElement.muted = false;
                } else {
                    // Показываем черный экран после последнего видео
                    videoElement.style.backgroundColor = 'black';
                    videoElement.style.display = 'block';
                    
                    // Создаем черный экран
                    const blackScreen = document.createElement('div');
                    blackScreen.style.position = 'absolute';
                    blackScreen.style.top = '0';
                    blackScreen.style.left = '0';
                    blackScreen.style.width = '100%';
                    blackScreen.style.height = '100%';
                    blackScreen.style.backgroundColor = 'black';
                    blackScreen.style.zIndex = '10';
                    
                    const tvScreen = tvItem.querySelector('.tv-screen');
                    if (tvScreen) {
                        tvScreen.appendChild(blackScreen);
                    }
                }
            });
        }
    }

    // --- Launch Nostalgia Button Handler ---
    const launchNostalgiaBtn = document.querySelector('.nostalgia-btn');
    if (launchNostalgiaBtn) {
        launchNostalgiaBtn.addEventListener('click', () => {
            // Плавная прокрутка к секции soundtrack
            const soundtrackSection = document.getElementById('soundtrack');
            if (soundtrackSection) {
                soundtrackSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}); 