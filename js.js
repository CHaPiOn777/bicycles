
const btnRight = document.querySelector('.btn-right'),
      btnLeft = document.querySelector('.btn-left'),
      sliderContent = document.querySelector('.slider'),
      sliderTitle = sliderContent.querySelector('.block-text__title'),
      sliderText = sliderContent.querySelector('.block-text__text'),
      slider = document.querySelector('.slider__img'),
      sliderIcon = document.querySelector('.slider__img-item-icon'),

      products = document.querySelector('.products'),
      linksSlider = document.querySelectorAll('.products__link'),

      inputFooter = document.querySelector('.footer__input-email'),
      btnInputFooter = document.querySelector('.footer__input-btn'),
      body = document.querySelector('.pages'),
      btnTheme = document.querySelector('.switch__checkbox'),

      navigation = document.querySelector('.products__navigation'),
      arrowNav = document.querySelector('.products__arrow'),
      navigationList = document.querySelector('.products__list'),
      navListItem = document.querySelectorAll('.products__list-item'),

      cardsSlider = document.querySelectorAll('.cards'),
      cardsSliderOne = document.querySelector('.cards'),
      cardItem = document.querySelector('.card-item');


// document.addEventListener('mousemove', swipeAction, false);
// document.addEventListener('mouseup', swipeEnd, false);

let blockSliderWidth = document.querySelector('.slider__img-item').offsetWidth;
let position = 0;

let posInit = 0,
    trfRegExp = /[-0-9.]+(?=px)/,
    posX1 = 0,
    posX2 = 0,
    posFinal = 0,
    slideWidth = cardItem.offsetWidth,
    slideIndex = 0,
    posThreshold = slideWidth * .35,
    slide = function() {
      if (cardsSliderOne.style.transition) {
        cardsSliderOne.style.transition = 'transform .5s';
      }
      cardsSliderOne.style.transform = `translateX(-${slideIndex * (slideWidth + 30)}px)`;
    };

let getEvent = function () {
  return event.changedTouches[0] !== -1 ? event.changedTouches[0] : event;
}
let swipeStart = function() {
  let touch = getEvent();

  posInit = posX1 = touch.clientX;
  cardItem.style.transition = '';

  cardsSliderOne.addEventListener('touchmove', swipeAction);
  cardsSliderOne.addEventListener('touchend', swipeEnd);

}


let swipeAction = function() {
  let touch = getEvent(),
  style = cardItem.style.transform;
  transform = +style.match(trfRegExp);

  posX2 = posX1 - touch.clientX;
  posX1 = touch.clientX;

  cardsSliderOne.style.transform = `translateX(${transform - posX2}px)`;
}
swipeEnd = function() {
  // финальная позиция курсора
  posFinal = posInit - posX1;

  cardsSliderOne.removeEventListener('touchmove', swipeAction);
  cardsSliderOne.removeEventListener('touchend', swipeEnd);

  // убираем знак минус и сравниваем с порогом сдвига слайда
  if (Math.abs(posFinal) > posThreshold) {
    // если мы тянули вправо, то уменьшаем номер текущего слайда
    if (posInit < posX1) {
      slideIndex--;
    // если мы тянули влево, то увеличиваем номер текущего слайда
    } else if (posInit > posX1) {
      slideIndex++;
    }
  }

  // если курсор двигался, то запускаем функцию переключения слайдов
  if (posInit !== posX1) {
    slide();
  }

};
cardsSliderOne.style.transform = 'translateX(0px)';

cardsSliderOne.addEventListener('touchstart', swipeStart);
cardsSliderOne.addEventListener('mousedown', swipeStart);

function submitFormHandler (evt) {
  evt.preventDefault();
  inputFooter.value = 'Круто!';
  btnInputFooter.style.opacity = '0';
}
function addClass (when, what) {
  when.classList.add(what);
}
function toggleClass (when, what) {
  when.classList.toggle(what);
}
function deleteClass (when, what) {
  when.classList.remove(what);
}
function deleteAllClass(when, what) {
  when.forEach((item) => {
    deleteClass(item, what)
  })
}
function toggleAllClass(when, what) {
  when.forEach((item) => {
    toggleClass(item, what)
  })
}

function transformListItem () {
  for (let i = 0; i < navListItem.length; i++) {
    navListItem[i].addEventListener('click', () => {
      navigationList.prepend(navListItem[i]);
      deleteAllClass(navListItem, 'products__link_active');
      addClass(navListItem[0], 'products__link_active')
      deleteClass(navigation, 'products__navigation_active');
    });

  }
}

function addSliderContent (title, text) {
  sliderTitle.innerHTML = title;
  sliderText.innerHTML = text;
}

btnTheme.addEventListener('click', () => {
  if (btnTheme.checked === true) {
    addClass(body, 'pages_theme_black');
  } else {
    deleteClass(body, 'pages_theme_black')
  }
})

inputFooter.oninput = function() {
  if (this.value === '') {
    btnInputFooter.style.opacity = '0';
    btnInputFooter.style.visibility = 'hidden';
  } else {
    btnInputFooter.style.opacity = '1';
    btnInputFooter.style.visibility = 'visible';
  }
}



function setPosition() {
  slider.style.transform = `translateX(${position}px)`;
}

function swipeSlider () {
  if (position === blockSliderWidth) {
    position = -blockSliderWidth * 2;
    sliderIcon.style.left = `${-position}px`;
    sliderIcon.style.backgroundImage = 'url(./img/TT_icon.svg)';
  }
  if (position / blockSliderWidth === -1) {
    addSliderContent('Грэвел', `Грэвел похож на&nbsp;шоссейный велосипед, но&nbsp;конструкция рамы немного
    отличается, и&nbsp;на&nbsp;нём стоят более широкие покрышки, всё для того чтобы проехать по&nbsp;лёгкому
    бездорожью.`);
    sliderIcon.style.left = `${-position}px`;
    sliderIcon.style.backgroundImage = 'url(./img/grevel_icon.svg)';
  }
  if (position / blockSliderWidth === -2) {
    addSliderContent('ТТ', `ТТ&nbsp;&mdash; это велосипед для триатлона или раздельного старта, гооняют
    на&nbsp;таком велике только по&nbsp;равнинному асфальту, велик очень быстрые и&nbsp;аэродинамичный.`);
    sliderIcon.style.left = `${-position}px`;
    sliderIcon.style.backgroundImage = 'url(./img/TT_icon.svg)';
  }
  if (position / blockSliderWidth === -3) {
    position = 0;
  }
  if (position / blockSliderWidth === 0) {
    addSliderContent('Шоссе', `На&nbsp;шоссейном велосипеде можно ездить по асфальту на&nbsp;разных
    градиентах: будь то&nbsp;горы или равнины. Гонки проходят в&nbsp;командном пелотоне, но&nbsp;тренироваться
    можно и&nbsp;самостоятельно.`);
    sliderIcon.style.left = `${-position}px`;
    sliderIcon.style.backgroundImage = 'url(./img/Shosse_icon.svg)';
  }
  setPosition();
}

//***********
btnRight.addEventListener('click', () => {
  position -= blockSliderWidth;
  swipeSlider();
})


btnLeft.addEventListener('click', () => {
  position += blockSliderWidth;
  swipeSlider();
})

for (let i = 0; i < linksSlider.length; i++) {
  linksSlider[i].addEventListener('click', () => {
    deleteAllClass(linksSlider, 'products__link_active');
    deleteAllClass(cardsSlider, 'cards_active');
    addClass(cardsSlider[i], 'cards_active');
    addClass(linksSlider[i], 'products__link_active');
  });
}

arrowNav.addEventListener('touchend', () => {
  toggleClass(navigation, 'products__navigation_active');
  transformListItem();
}, false)

btnInputFooter.addEventListener('click', submitFormHandler);
