// Custom Scripts
// Отримуємо всі елементи, які потрібно анімувати
const circleAnimation = document.querySelector(".circle__animation");
const circleAnimationItems = document.querySelectorAll(
  ".circle__animation-item"
);
const itemTop = document.querySelector(".item__top");
const itemCenter = document.querySelector(".item__center");
const title = document.getElementById("title");
const arrowContainer = document.querySelector(".down-arrow-container");
const arrow = document.querySelector(".down-arrow");
const arrowWhite = document.querySelector(".down-arrow-white");

// Створюємо анімацію GSAP
const tl = gsap.timeline({ paused: true });
tl.to(circleAnimation, { rotation: 360, duration: 15, ease: "linear" });

// Активуємо анімацію при досягненні 100% на каунтері
const counterElement = document.querySelector(".counter");
let counterValue = 0;

function updateCounter() {
  counterValue++;
  if (counterValue <= 100) {
    counterElement.textContent = `${counterValue}%`;
    tl.progress(counterValue / 100); // Оновлюємо прогрес анімації GSAP
  } else {
    clearInterval(counterInterval);
    // При досягненні 100% змінюємо opacity елементів circleAnimationItems
    gsap.to(circleAnimationItems, { opacity: 0, duration: 0.5 });

    // Змінюємо бекграунд на background1.jpg з анімацією
    // Змінюємо бекграунд на background1.jpg з анімацією
    gsap.to(".section__preloader", {
      opacity: 0,
      duration: 0.5,
      delay: 0.5,
      onComplete: () => {
        const preloader = document.querySelector(".section__preloader");
        if (preloader) {
          preloader.style.backgroundImage = "url('./img/background1.jpg')";
          preloader.style.backgroundRepeat = "no-repeat";
          preloader.style.objectFit = "contain";
          preloader.style.backgroundSize = "cover";
          gsap.to(preloader, { opacity: 1, duration: 0.5 });
        }

        // Замінюємо каунтер текстом "Scroll Down"
        counterElement.style.display = "none";
        const scrollDownText = document.createElement("p");
        scrollDownText.innerText = "Scroll Down";
        scrollDownText.classList.add("scroll-down-text");
        document.body.appendChild(scrollDownText);

        // Змінюємо колір title на білий
        gsap.to(title, { color: "white", duration: 1 });

        // Змінюємо стиль стрілки на білу версію
        arrow.style.display = "none";
        arrowWhite.style.display = "block";
      },
    });
  }
}

const counterInterval = setInterval(updateCounter, 50);

// itemTop GSAP
gsap.from(itemTop, { opacity: 0, y: "0", duration: 2 });

// itemCenter GSAP
gsap.from(itemCenter, { opacity: 0, width: 0, duration: 10 });

// Title GSAP
gsap.from(title, { opacity: 0, fontSize: "0px", duration: 7 });

// Arrow GSAP
gsap.from(arrow, { opacity: 0, fontSize: "0px", duration: 7 });

