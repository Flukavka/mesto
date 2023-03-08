'use strict'
const popupProfile = document.querySelector('.popup-profile');
const popupCard = document.querySelector('.popup-element');
const popupImageWrapper = document.querySelector('.popup-image');
const btnProfileEdit = document.querySelector('.profile__info-edit');
const btnCardAdd = document.querySelector('.profile__btn-add');
const btnPopupProfileClose = document.querySelector('.popup__close-profile');
const btnPopupCardClose = document.querySelector('.popup__close-element'); //
const btnPopupImageClose = document.querySelector('.popup-image__close');
const placeName = document.querySelector('.popup__input_field_place-name');
const placeImage = document.querySelector('.popup__input_field_place-image');
const popupImage = document.querySelector('.popup__image');
const popupTitle = document.querySelector('.popup__image-title');
const userName = document.querySelector('.profile__username');
const userNameInput = document.querySelector('.popup__input_field_username');
const userProfession = document.querySelector('.profile__profession');
const userProfessionInput = document.querySelector('.popup__input_field_profession');
const formProfile = document.querySelector('.popup-profile__form');
const formCardPlace = document.querySelector('.popup-element__form');
const cardsContainer = document.querySelector('.elements__list');
const cardTemplate = document.querySelector('.element-template');

/**
 * Функция принимает объект из массива initialCards, добавляет его в массив
 * и возвращает массив
 * @param {object} cardData объект
 */
function createCard(cardData) {
  const card = cardTemplate.content.cloneNode(true);
  const cardTitle = card.querySelector('.element__title');
  const cardImage = card.querySelector('.element__image');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.alt;
  cardTitle.textContent = cardData.name;

  //Событие лайка карточки
  const buttonLike = card.querySelector('.element__btn');
  buttonLike.addEventListener("click", () => handleLikeCard(buttonLike));


  //Событие удаления карточки
  const buttonDeleteCard = card.querySelector('.element__btn-delete');
  buttonDeleteCard.addEventListener('click', () => handleDeleteCard(buttonDeleteCard));

  cardImage.addEventListener('click', () => createImagePopup(cardData));

  return prependCard(card);
};

/**
 * Функция принимает объект с карточкой на вход и добавляет её на страницу
 * @param {object} card объект с карточкой
 */
function prependCard(card) {
  cardsContainer.prepend(card);
};

/**
 * Функция принимает текущий объект из DOM и открывает попап
 * @param {object} currentPopup текущий объект - попап
 */
function showPopup(currentPopup) {
  if (!currentPopup.classList.contains('popup_opened')) {
    currentPopup.classList.add('popup_opened');
  }
};

/**
 * Функция принимает текущий объект из DOM и закрывает попап
 * @param {object} currentPopup текущий объект - попап
 */
function hidePopup(currentPopup) {
  if (currentPopup.classList.contains('popup_opened')) {
    currentPopup.classList.remove('popup_opened');
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
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  userName.textContent = userNameInput.value;
  userProfession.textContent = userProfessionInput.value;
  hidePopup(popupProfile);
};

/**
 * Функция сохраняет данные введённые пользователем, вызывает функцию создания
 * объекта и отправляет данные формы на сервер,после чего закрывает попап
 */
function handleCardFormSubmit(evt) {
  evt.preventDefault();

  createNewCard(placeName.value, placeImage.value);
  hidePopup(popupCard);
};

/**
 * Функция принимает данные и передаёт их в виде объекта функции создания карты
 * карты
 * @param {string} placeName string - Наименование карточки
 * @param {string} placeImage string - Ссылка на изображение
 * @param {string} alt strin - Значение атрибута alt
 */
function createNewCard(placeName, placeImage, alt = 'Фотография пользователя') {
  createCard({ name: placeName, link: placeImage, alt: alt });
};


function createImagePopup(cardData) {
  popupImage.src = cardData.link;
  popupImage.alt = cardData.alt;
  popupTitle.textContent = cardData.name;

  showPopup(popupImageWrapper);
};

/**
 * Функция принимает на вход текущую кнопку лайк и добавляет или удаляет класс
 * @param {object} buttonLike объект переданный из обработчика события
 */
function handleLikeCard(buttonLike) {
  buttonLike.classList.toggle('element__btn_active');
};

/**
 * Функция принимает на вход текущую кнопку удалить, находит ближайший
 * родительский элемент с заданным классом и удаляет его
 * @param {object} buttonDeleteCard объект переданный из обработчика события
 */
function handleDeleteCard(buttonDeleteCard) {
  const currentCard = buttonDeleteCard.closest('.element');
  currentCard.remove();
}

importUserInfoInPopup();
initialCards.forEach(createCard);

btnProfileEdit.addEventListener('click', () => {
  showPopup(popupProfile);
});

btnCardAdd.addEventListener('click', () => {
  showPopup(popupCard);
});

btnPopupProfileClose.addEventListener('click', () => {
  hidePopup(popupProfile);
});

btnPopupCardClose.addEventListener('click', () => {
  hidePopup(popupCard);
});

btnPopupImageClose.addEventListener('click', () => {
  hidePopup(popupImageWrapper);
});

formProfile.addEventListener('submit', handleProfileFormSubmit);

formCardPlace.addEventListener('submit', handleCardFormSubmit);
