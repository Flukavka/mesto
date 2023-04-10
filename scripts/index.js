'use strict'

import {
  initialCards, popupProfile, popupCard, btnProfileEdit,
  btnCardAdd, placeName, placeImage, userName, userNameInput,
  userProfession, userProfessionInput, formProfile, formCardPlace, cardsContainer,
  cardTemplate, popups, config
} from './constants.js';

import Card from './Card.js';

import FormValidator from './FormValidator.js';

/**
 * Функция принимает объект с карточкой на вход и добавляет её на страницу
 * @param {object} card объект с карточкой
 */
function prependCard(card) {
  cardsContainer.prepend(card);
};

/**
 * Функция принимает объект-эвент, проверяет его и закрывает попап по нажатию
 * клавиши Escape
 */
export function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    hidePopup(openedPopup);
  }
};

/**
 * Функция принимает текущий объект из DOM и открывает попап
 * @param {object} currentPopup текущий объект - попап
 */
function showPopup(currentPopup) {
  currentPopup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
};

/**
 * Функция принимает текущий объект из DOM и закрывает попап
 * @param {object} currentPopup текущий объект - попап
 */
function hidePopup(currentPopup) {
  currentPopup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
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
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  userName.textContent = userNameInput.value;
  userProfession.textContent = userProfessionInput.value;
  hidePopup(popupProfile);
};

/**
 * Функция отключает кнопку отправки у попапа с добавлением карточки
 * @param {object} evt объект-эвент
 */
function disableSubmitButton(evt) {
  evt.submitter.classList.add('popup__button_disabled');
  evt.submitter.disabled = true;
};

/**
 * Функция принимает данные и передаёт их в виде объекта функции создания карты
 * и добавляет карточку на страницу
 * @param {string} placeName string - Наименование карточки
 * @param {string} placeImage string - Ссылка на изображение
 * @param {string} alt string - Значение атрибута alt
 */
function createNewCard(placeName, placeImage) {

  const cardData = {};
  cardData.name = placeName;
  cardData.link = placeImage;
  prependCard(createCard(cardData, cardTemplate));
};

/**
 * Функция сохраняет данные введённые пользователем, вызывает функцию создания
 * объекта и отправляет данные формы на сервер,после чего закрывает попап
 */
function handleCardFormSubmit(evt) {
  evt.preventDefault();

  createNewCard(placeName.value, placeImage.value);
  disableSubmitButton(evt);
  hidePopup(popupCard);
  formCardPlace.reset();
};

function createCard(cardData, cardTemplate) {
  const card = new Card(cardData, cardTemplate);

  const cardItem = card.generateCard();
  return cardItem;
}

//Добавляет карточки из объекта cards.js
initialCards.forEach((cardData) => {
  const cardItem = new Card(cardData, cardTemplate);

  prependCard(cardItem.generateCard());
})

//Открыть попап с профилем
btnProfileEdit.addEventListener('click', () => {
  importUserInfoInPopup();
  showPopup(popupProfile);
});

// Закрывает попапы
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup__close')
      || evt.target.classList.contains('overlay')) {
      hidePopup(popup)
    };
  });
});

//Добавить карточку
btnCardAdd.addEventListener('click', () => {
  showPopup(popupCard);
});

formProfile.addEventListener('submit', handleProfileFormSubmit);

formCardPlace.addEventListener('submit', handleCardFormSubmit);

const profileFormValidator = new FormValidator(config, formProfile);
const newCardFormValidator = new FormValidator(config, formCardPlace);

profileFormValidator.enableValidation();
newCardFormValidator.enableValidation();
