'use strict'

import {
  initialCards, btnProfileEdit,
  btnCardAdd, formProfile, formCardPlace, config
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

// Создаёт карточки
function createCard(cardData) {
  const card = new Card(cardData, '.element-template', handleOpenPopup);

  const cardItem = card.generateCard();
  return cardItem;
}

//Осуществляет отрисовку карточек на странице
const cardsList = new Section({
  data: initialCards,
  renderer: (cardData) => {
    cardsList.addItem(createCard(cardData));
  }
}, '.elements__list');
cardsList.rendererItems();

//Функция принимает данные и передаёт их в виде объекта функции создания карты
//и добавляет карточку на страницу
function createNewCard(cardData) {
  if (cardData.name != '' && cardData.link != '') {
    cardsList.addItem(createCard(cardData));
  }
};

//Открывает попап
function handleOpenPopup(placeImage, placeName) {

  const popupWithImage = new PopupWithImage({ placeImage, placeName },
    '.popup-image');
  popupWithImage.open()
};

function openedPopupWithPlaceForm() {
  const popupWithPlaceForm = new PopupWithForm('.popup-element', {
    handleFormSubmit: (cardData) => {
      createNewCard(cardData);
      popupWithPlaceForm.close()
      newCardFormValidator.toggleButtonState();
    }
  });
  popupWithPlaceForm.open();
};
btnCardAdd.addEventListener('click', openedPopupWithPlaceForm);


const user = new UserInfo('.profile__username', '.profile__profession');

function openedPopupWithProfileForm() {
  const popupWithProfileForm = new PopupWithForm('.popup-profile', {
    handleFormSubmit: (userData) => {
      if (userData.name != '' && userData.profession != '') {
        user.setUserInfo(userData);

        popupWithProfileForm.close();
        profileFormValidator.toggleButtonState();
      }
    }
  })

  popupWithProfileForm.open();
};

btnProfileEdit.addEventListener('click', openedPopupWithProfileForm);
