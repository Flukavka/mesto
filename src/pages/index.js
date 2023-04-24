'use strict'

import './index.css';

import {
  initialCards, buttonProfileEdit,
  buttonCardAdd, formProfile, formCardPlace, config
} from '../utils/constants.js';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

const profileFormValidator = new FormValidator(config, formProfile);
const newCardFormValidator = new FormValidator(config, formCardPlace);
profileFormValidator.enableValidation();
newCardFormValidator.enableValidation();

function createCard(cardData) {
  const card = new Card(cardData, '.element-template', handleOpenImagePopup);

  const cardItem = card.generateCard();
  return cardItem;
};

const cardsList = new Section({
  data: initialCards,
  renderer: (cardData) => {
    cardsList.addItem(createCard(cardData));
  }
}, '.elements__list');
cardsList.rendererItems();

function createNewCard(cardData) {
  cardsList.addItem(createCard(cardData));
};


const popupWithImage = new PopupWithImage('.popup-image');

function handleOpenImagePopup(placeImage, placeName) {
  popupWithImage.open({ placeImage, placeName });
};

popupWithImage.setEventListeners();


const popupWithPlaceForm = new PopupWithForm('.popup-element', {
  handleFormSubmit: (cardData) => {
    createNewCard(cardData);
    popupWithPlaceForm.close();
  }
});

popupWithPlaceForm.setEventListeners();

function openPopupWithPlaceForm() {
  popupWithPlaceForm.open();
  newCardFormValidator.resetValidation();
};

buttonCardAdd.addEventListener('click', openPopupWithPlaceForm);


const user = new UserInfo('.profile__username', '.profile__profession');


const popupWithProfileForm = new PopupWithForm('.popup-profile', {
  handleFormSubmit: (userData) => {
    user.setUserInfo(userData);
    popupWithProfileForm.close();
  }
});

popupWithProfileForm.setEventListeners();

function openPopupWithProfileForm() {
  const userData = user.getUserInfo();
  profileFormValidator.resetValidation();
  popupWithProfileForm.setInputValues(userData)
  popupWithProfileForm.open();
};

buttonProfileEdit.addEventListener('click', openPopupWithProfileForm);
