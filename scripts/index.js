'use strict'
const popupProfile = document.querySelector('.popup-profile');
const popupCard = document.querySelector('.popup-element');
const popupImageWrapper = document.querySelector('.popup-image');
const btnProfileEdit = document.querySelector('.profile__info-edit');
const btnCardAdd = document.querySelector('.profile__btn-add');
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
const popups = document.querySelectorAll('.popup');

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
  cardImage.alt = `Фотография ${cardData.name}`;
  cardTitle.textContent = cardData.name;

  //Событие лайка карточки
  const buttonLike = card.querySelector('.element__btn');
  buttonLike.addEventListener("click", () => handleLikeCard(buttonLike));


  //Событие удаления карточки
  const buttonDeleteCard = card.querySelector('.element__btn-delete');
  buttonDeleteCard.addEventListener('click', () => handleDeleteCard(buttonDeleteCard));

  //Событие открытие попапа с изображением
  cardImage.addEventListener('click', () => openImagePopup(cardImage, cardTitle));

  return card;
};

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
function closeByEscape(evt) {
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
}

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

/**
 * Функция принимает данные и передаёт их в виде объекта функции создания карты
 * для дальнейшего добавления на страницу
 * @param {string} placeName string - Наименование карточки
 * @param {string} placeImage string - Ссылка на изображение
 * @param {string} alt string - Значение атрибута alt
 */
function createNewCard(placeName, placeImage) {
  prependCard(createCard({ name: placeName, link: placeImage }));
};

/**
 * Функция открывает попап и настраивает его содержимое
 */
function openImagePopup(cardImage, cardTitle) {
  popupImage.src = cardImage.src;
  popupImage.alt = cardImage.alt;
  popupTitle.textContent = cardTitle.textContent;

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
};

//Добавляет карточки из объекта cards.js
initialCards.forEach((card) => { prependCard(createCard(card)) });

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
