'use strict'
const popup = document.querySelector('.popup');
const popupProfile = document.querySelector('.popup-profile');
const popupElement = document.querySelector('.popup-element');
const btnProfileEdit = document.querySelector('.profile__info-edit');
const btnElementAddPlace = document.querySelector('.profile__btn-add');
const btnPopupProfileClose = document.querySelector('.popup-profile_close');
const btnPopupElementClose = document.querySelector('.popup-element_close');

let userName = document.querySelector('.profile__username');
let userProfession = document.querySelector('.profile__profession');
let userNameInput = document.querySelector('.popup__input_field_username');
let userProfessionInput = document.querySelector('.popup__input_field_profession');
let formElement = document.querySelector('.popup__form');
let formElementPlace = document.querySelector('.popup-element__form');
const elementsList = document.querySelector('.elements__list');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    alt: 'Фотография Архыз'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
    alt: 'Фотография Челябинской области'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
    alt: 'Фотография города Иваново'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
    alt: 'Фотография Камчатки'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
    alt: 'Фотография Холмогорского района'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
    alt: 'Фотография Байкала'
  }
];

/**
 * Функция принимает объект из массива initialCards и добавляет его в DOM
 * @param {object} card объект
 */
function createdElement(card) {
  const element = document.querySelector('.element-template').content.cloneNode(true);
  const elementTitle = element.querySelector('.element__title');
  const elementImage = element.querySelector('.element__image');
  const popupImageWrapper = element.querySelector('.popup-image');
  const popupImage = element.querySelector('.popup__image');
  const popupTitle = element.querySelector('.popup__image-title');

  elementImage.setAttribute('src', card.link);
  elementImage.setAttribute('alt', card.alt);
  elementTitle.textContent = card.name;

  popupImage.setAttribute('src', card.link);
  popupImage.setAttribute('alt', card.alt);
  popupTitle.textContent = card.name;

  element.querySelector('.element__btn').addEventListener('click', (evt) => {
    evt.target.classList.toggle('element__btn_active');
  });

  element.querySelector('.element__btn-delete').addEventListener('click',
    (evt) => {
      let card = evt.target.closest('.element');
      card.remove();
    }
  );

  element.querySelector('.element__image').addEventListener('click', () => {
    popupShow(popupImageWrapper);
  });

  element.querySelector('.popup-image_close').addEventListener('click', () => {
    popupHidden(popupImageWrapper);
  });

  elementsList.append(element);
};

/**
 * Функция принимает текущий объект из DOM и открывает попап
 * @param {object} currentPopup текущий объект - попап
 */
function popupShow(currentPopup) {
  if (currentPopup.classList.contains('popup_opened')) {
    currentPopup.classList.remove('popup_opened');
  }
};

/**
 * Функция принимает текущий объект из DOM и закрывает попап
 * @param {object} currentPopup текущий объект - попап
 */
function popupHidden(currentPopup) {
  if (!currentPopup.classList.contains('popup_opened')) {
    currentPopup.classList.add('popup_opened');
  }
};

/**
 * Функция получает значения имени и профессии пользователя из DOM
 * и устанавливает их в полях ввода попапа
 */
function importUserInfoInPopup() {
  userNameInput.value = userName.textContent;
  userProfessionInput.value = userProfession.textContent;
};

/**
 * Функция сохраняет информацию внесенную пользователем в профиле и отправляет
 * данные формы на сервер,после чего закрывает попап
 */
function formSubmitHandler(evt) {
  evt.preventDefault();

  userName.textContent = userNameInput.value;
  userProfession.textContent = userProfessionInput.value;
  popupHidden(popupProfile);
};

/**
 * Функция сохраняет данные введённые пользователем, вызывает функцию создания
 * объекта и отправляет данные формы на сервер,после чего закрывает попап
 */
function formCreatElementHandler(evt) {
  evt.preventDefault();

  const placeName = document.querySelector('.popup__input_field_place-name').value;
  const placeImage = document.querySelector('.popup__input_field_place-image').value;
  creatNewElement(placeName, placeImage);
  popupHidden(popupElement);
};

/**
 * Функция принимает данные и создаёт из них объект, добавляет объект в массив и
 * вызывыает функцию доюавляющую новую карточку на страницу
 * @param {string} placeName string - Наименование карточки
 * @param {string} placeImage string - Ссылка на изображение
 */
function creatNewElement(placeName, placeImage) {
  let elementIndex = initialCards.length;
  initialCards.push({ name: placeName, link: placeImage, alt: 'Фотография пользователя' });
  createdElement(initialCards[elementIndex]);
};

importUserInfoInPopup();
initialCards.forEach(createdElement);

btnProfileEdit.addEventListener('click', () => {
  popupShow(popupProfile);
});

btnElementAddPlace.addEventListener('click', () => {
  popupShow(popupElement);
});

btnPopupProfileClose.addEventListener('click', () => {
  popupHidden(popupProfile);
});

btnPopupElementClose.addEventListener('click', () => {
  popupHidden(popupElement);
});

formElement.addEventListener('submit', formSubmitHandler);

formElementPlace.addEventListener('submit', formCreatElementHandler);
