const btnRight = document.querySelector('.btn-right'),
      btnLeft = document.querySelector('.btn-left'),
      slider = document.querySelector('.slider'),
      products = document.querySelector('.products'),
      blockSlider = document.querySelector('.slider__highway'),
      linksSlider = document.querySelectorAll('.products__description-link'),
      cardsSlider = document.querySelectorAll('.cards'),
      cardsTt = document.querySelector('.cards-tt'),

      inputHeader = document.querySelector('.footer__input-email'),
      btnInputHeader = document.querySelector('.footer__input-btn'),
      body = document.querySelector('.pages'),
      btnTheme = document.querySelector('.switch__checkbox');

const blockSliderWidth = document.querySelector('.slider__highway').offsetWidth;

let position = 0;

btnTheme.addEventListener('click', () => {
  if (btnTheme.checked === true) {
    addClass(body, 'pages_theme_black');
  } else {
    deleteClass(body, 'pages_theme_black')
  }
})

inputHeader.oninput = function() {
  if (this.value === '') {
    btnInputHeader.style.opacity = '0';
  } else {
    btnInputHeader.style.opacity = '1';
  }
}
function submitFormHandler (evt) {
  evt.preventDefault();
  inputHeader.value = 'Круто!';
  btnInputHeader.style.opacity = '0';
}

btnInputHeader.addEventListener('click', submitFormHandler);

const checkBtns = () => {
  btnLeft.disabled = position === 0;
  btnRight.disabled = position <= -(2 * blockSliderWidth);
}
checkBtns();

function setPosition() {
  slider.style.transform = `translateX(${position}px)`;
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


//***********
btnRight.addEventListener('click', () => {
  position -= blockSliderWidth;
  setPosition();
  checkBtns();
})

btnLeft.addEventListener('click', () => {
  position += blockSliderWidth;
  setPosition();
  checkBtns();
})

for (let i = 0; i < linksSlider.length; i++) {
  linksSlider[i].addEventListener('click', () => {
    deleteAllClass(linksSlider, 'products__description-link_active');
    deleteAllClass(cardsSlider, 'cards_active');
    addClass(cardsSlider[i], 'cards_active');
    addClass(linksSlider[i], 'products__description-link_active');
  });
}
