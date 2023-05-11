'use strict'

import './index.css';

import Api from '../components/Api';

import {
  templateSelectorCard, templateSelectorUserCard, buttonProfileEdit, buttonCardAdd,
  formProfile, formCardPlace, config, formProfileAvatar, buttonProfileAvatarEdit,
  buttonAvatarPopupSubmit, buttonProfilePopupSubmit, buttonPlacePopupSubmit
} from '../utils/constants.js';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation';

let userId = null;
const profileFormValidator = new FormValidator(config, formProfile);
const newCardFormValidator = new FormValidator(config, formCardPlace);
const profileAvatarForm = new FormValidator(config, formProfileAvatar);

profileFormValidator.enableValidation();
newCardFormValidator.enableValidation();
profileAvatarForm.enableValidation();

const user = new UserInfo('.profile__username', '.profile__profession', '.profile__avatar');


const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-65',
  headers: {
    authorization: '2ea75de7-9cf6-4052-aa7b-44f53981b503',
    'Content-Type': 'application/json'
  }
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    user.getUserInfo(userData);
    userId = userData._id;
    popupWithProfileForm.setInputValues(userData);
    profileFormValidator.toggleButtonState();
    user.setUserInfo(userData);
    user.setUserAvatar(userData);

    cardsList.rendererItems(cards);

    return userData, cards;
  })
  .catch((err) => {
    console.log(err);
  });


function createCard(cardData, templateSelector) {
  const card = new Card(cardData, templateSelector, handleOpenImagePopup,
    setLikeCard, checkLikes, unlikeCard, userId, getCard);

  const cardItem = card.generateCard();
  return cardItem;
};


//Отрисовка карточек
const cardsList = new Section({

  renderer: (cardData) => {
    if (cardData.owner._id === userId) {
      cardsList.addItem(createCard(cardData, templateSelectorUserCard));
    } else {
      cardsList.addItem(createCard(cardData, templateSelectorCard));
    }
  }
}, '.elements__list');


//Попап с изображением, открывает и настраивает данные об изображении
const popupWithImage = new PopupWithImage('.popup-image');

function handleOpenImagePopup(placeImage, placeName) {
  popupWithImage.open({ placeImage, placeName });
};

popupWithImage.setEventListeners();


//Попап для создания новой карточки
const popupWithPlaceForm = new PopupWithForm('.popup-element', {
  handleFormSubmit: (cardData) => {
    createNewCard(cardData);
  }
});

popupWithPlaceForm.setEventListeners();

function openPopupWithPlaceForm() {
  popupWithPlaceForm.open();
  newCardFormValidator.resetValidation();
};

buttonCardAdd.addEventListener('click', openPopupWithPlaceForm);

//Функция добавляет новую карточку
function createNewCard(cardData) {
  buttonPlacePopupSubmit.textContent = 'Создание...'
  api.addNewCard(cardData)
    .then((res) => {
      cardData._id = res._id;
      cardData.owner = { _id: userId };
      cardData.likes = res.likes;
      cardsList.addItem(createCard(cardData, templateSelectorUserCard));
      popupWithPlaceForm.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      buttonPlacePopupSubmit.textContent = 'Создать';
    });
};


//Попап для изменения данных о пользователе
const popupWithProfileForm = new PopupWithForm('.popup-profile', {
  handleFormSubmit: () => {
    setUserInfo(popupWithProfileForm.getInputValues());
  }
});

popupWithProfileForm.setEventListeners();

function openPopupWithProfileForm() {
  popupWithProfileForm.setInputValues(user.getUserInfo());
  profileFormValidator.resetValidation();
  popupWithProfileForm.open();
};

buttonProfileEdit.addEventListener('click', openPopupWithProfileForm);


function setUserInfo(data) {
  buttonProfilePopupSubmit.textContent = 'Сохранение...';
  api.setUserInfo(data)
    .then((res) => {
      user.setUserInfo(res);
      popupWithProfileForm.close();
      return res;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      buttonProfilePopupSubmit.textContent = 'Сохранить';
    })
};

//Попап для изменения аватара пользователя
const popupWithProfileAvatarForm = new PopupWithForm('.popup-avatar', {
  handleFormSubmit: () => {
    setUserAvatar(popupWithProfileAvatarForm.getInputValues());
  }
});

function setUserAvatar(data) {
  buttonAvatarPopupSubmit.textContent = 'Сохранение...';
  api.setUserAvatar(data)
    .then((res) => {
      user.setUserAvatar(res);
      popupWithProfileAvatarForm.close();
      return res;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      buttonAvatarPopupSubmit.textContent = 'Сохранить';
    })
};

popupWithProfileAvatarForm.setEventListeners();

function openPopupWithProfileAvatarForm() {
  popupWithProfileAvatarForm.open();
  profileAvatarForm.resetValidation();
};

buttonProfileAvatarEdit.addEventListener('click', openPopupWithProfileAvatarForm);

const popupWithCardDelete = new PopupWithConfirmation('.popup-clarification');
popupWithCardDelete.setEventListeners();


//Функция, при вызове которой создаётся попап для удаления карточки
function getCard(card) {
  function handleFormSubmit() {
    api.deleteCard(card.cardObject)
      .then(() => {
        card.cardElement.remove();
        popupWithCardDelete.close();
      })
      .catch((err) => {
        console.log(err, 'Ошибка удаления карточки ' + card.cardObject.id);
      });
  };

  popupWithCardDelete.setSubmitAction(handleFormSubmit)
  popupWithCardDelete.open();
};

//Push like
function setLikeCard(card) {
  api.likeCard(card.cardObject)
    .then((res) => {
      card.addLike(res)
    })
    .catch((err) => {
      console.log(err, 'Ошибка лайка карточки ' + card.cardObject.id);
    })
}

//проверяет наличие лайка юзера в приходящих с сервера карточках
function checkLikes(cardData) {
  return cardData.likes.some(item => item._id === userId);
};

function unlikeCard(card) {
  api.unlikeCard(card.cardObject)
    .then((res) => {
      card.removeLike(res);
    })
    .catch((err) => {
      console.log(err, 'Ошибка лайка карточки ' + card.cardObject.id);
    })
}
