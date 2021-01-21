let doc = document;
let mainSlider = document.querySelector('.main-slider');
let mainSliderCount = 0;
let mainSliderSlides = mainSlider.querySelector('.slides');
let mainSliderSlidesMax = mainSliderSlides.querySelectorAll('.slide').length;
let mainSliderSlidesBubbles = mainSlider.querySelectorAll('.bubbles .slide');
for (let i = 0; i < mainSliderSlidesBubbles.length; i++) {
    mainSliderSlidesBubbles[i].addEventListener('click', function () {
        if (!this.classList.contains('selected')) {
            clearInterval(mainSliderTimer);
            switchSlide(i);
            mainSliderTimer = setInterval(mainSliderTimerFunc, 5000);
        }
    });
}
let mainSliderTimer = setInterval(mainSliderTimerFunc, 5000);
function mainSliderTimerFunc() {
    mainSliderCount++;
    if (mainSliderCount >= mainSliderSlidesMax) {
        mainSliderCount = 0;
    }
    switchSlide(mainSliderCount);
}
function switchSlide(num) {
    mainSliderSlides.style.left = `-${100 * num}%`;
    mainSlider.querySelector('.bubbles .selected').classList.remove('selected');
    mainSliderSlidesBubbles[num].classList.add('selected');
}
doc.querySelector('.main-slider .arrow-l').addEventListener('click', switchSlideRight);
doc.querySelector('.main-slider .arrow-r').addEventListener('click', switchSlideLeft);

mainSlider.addEventListener('touchmove', function(e) {
    handleTouchMove(e, switchSlideLeft, switchSlideRight);
});
function switchSlideRight() {
    clearInterval(mainSliderTimer);
    mainSliderCount--;
    if (mainSliderCount < 0) {
        mainSliderCount = mainSliderSlidesMax - 1;
    }
    switchSlide(mainSliderCount);
    mainSliderTimer = setInterval(mainSliderTimerFunc, 5000);
}
function switchSlideLeft() {
    clearInterval(mainSliderTimer);
    mainSliderCount++;
    if (mainSliderCount >= mainSliderSlidesMax) {
        mainSliderCount = 0;
    }
    switchSlide(mainSliderCount);
    mainSliderTimer = setInterval(mainSliderTimerFunc, 5000);
}

doc.addEventListener('touchstart', handleTouchStart, false);
let xDown = null;
let yDown = null;
function handleTouchStart(evt) {
    xDown = evt.touches[0].clientX;
    yDown = evt.touches[0].clientY;
};
function handleTouchMove(evt, left, right, up, down) {
    if (!xDown || !yDown) {
        return;
    }
    let xUp = evt.touches[0].clientX;
    let yUp = evt.touches[0].clientY;
    let xDiff = xDown - xUp;
    let yDiff = yDown - yUp;
    if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if ( xDiff > 0 ) {
            if (left) {
                left();
            }
        } else {
            if (right) {
                right();
            }
        }
    } else {
        if ( yDiff > 0 ) {
            if (down) {
                up();
            }
        } else {
            if (down) {
                down();
            }
        }
    }
    xDown = null;
    yDown = null;
};