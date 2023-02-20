'use strict'
const popup = document.querySelector('.popup');
const btnProfileEdit = document.querySelector('.profile__info-edit');
const btnPopupClose = document.querySelector('.popup__close');
let userName = document.querySelector('.profile__username');
let userProfession = document.querySelector('.profile__profession');
let userNameInput = document.querySelector('.popup__input_field_username');
let userProfessionInput = document.querySelector('.popup__input_field_profession');
let formElement = document.querySelector('.popup__form');

/**
 * Функция открывает попап
 */
function popupShow() {
  importUserInfoInPopup();
  if (popup.classList.contains('popup_opened')) {
    popup.classList.remove('popup_opened');
  }
};

/**
 * Функция закрывает попап
 */
function popupHidden() {
  if (!popup.classList.contains('popup_opened')) {
    popup.classList.add('popup_opened');
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
 * данные формы на сервер
 */
function formSubmitHandler(evt) {
  evt.preventDefault();

  userName.textContent = userNameInput.value;
  userProfession.textContent = userProfessionInput.value;
  popupHidden();
}

btnProfileEdit.addEventListener('click', popupShow);

btnPopupClose.addEventListener('click', popupHidden);

formElement.addEventListener('submit', formSubmitHandler);
