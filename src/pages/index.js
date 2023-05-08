'use strict'

import './index.css';

import Api from '../components/Api';

import {
  buttonProfileEdit, buttonCardAdd, formProfile, formCardPlace,
  config, formProfileAvatar, buttonProfileAvatarEdit, buttonAvatarPopupSubmit, buttonProfilePopupSubmit,
  buttonPlacePopupSubmit
} from '../utils/constants.js';

import Card from '../components/Card.js';
import UserCard from '../components/UserCard';
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

function getUserInfo() {
  api.getUserInfo()
    .then(data => {
      user.getUserInfo(data);
      userId = data._id;
      popupWithProfileForm.setInputValues(data);
      profileFormValidator.toggleButtonState();

      user.setUserInfo(data);
      user.setUserAvatar(data);
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
};
getUserInfo();


function createCard(cardData) {
  const card = new Card(cardData, '.element-template', handleOpenImagePopup,
    setLikeCard, checkLikes, unlikeCard, getLikeCard);

  const cardItem = card.generateCard();
  return cardItem;
};

function createUserCard(cardData) {
  const card = new UserCard(cardData, '.user-element-template', handleOpenImagePopup,
    getCard, setLikeCard, checkLikes, unlikeCard, getLikeCard);

  const cardItem = card.generateCard();
  return cardItem;
};


//Отрисовка карточек
const cardsList = new Section({

  renderer: (cardData) => {
    console.log(cardData)
    if (cardData.owner._id === userId) {
      cardsList.addItem(createUserCard(cardData));
    } else {
      cardsList.addItem(createCard(cardData));
    }
  }
}, '.elements__list');

api.getInitialCards()
  .then((data) => {
    cardsList.rendererItems(data);
  })
  .catch((err) => {
    console.log(err);
  });

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


function createNewCard(cardData) {
  buttonPlacePopupSubmit.textContent = 'Создание...'
  api.addNewCard(cardData)
    .then((res) => {
      cardData._id = res._id;
      cardData.likes = res.likes;
      cardsList.addItem(createUserCard(cardData));
    })
    .catch((err) => {
      console.log(err);
    })
    .finally((res) => {
      buttonPlacePopupSubmit.textContent = 'Создать';
      popupWithPlaceForm.close();
    });
};


//Попап для изменения данных о пользователе
const popupWithProfileForm = new PopupWithForm('.popup-profile', {
  handleFormSubmit: () => {
    setUserInfo(user.setUserInfo(popupWithProfileForm.getInputValues()));
  }
});

popupWithProfileForm.setEventListeners();

function openPopupWithProfileForm() {
  getUserInfo();
  profileFormValidator.resetValidation();
  popupWithProfileForm.open();

};

buttonProfileEdit.addEventListener('click', openPopupWithProfileForm);


function setUserInfo(data) {
  buttonProfilePopupSubmit.textContent = 'Сохранение...';
  api.setUserInfo(data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally((res) => {
      buttonProfilePopupSubmit.textContent = 'Сохранить';
      popupWithProfileForm.close();
    })
};

//Попап для изменения аватара пользователя
const popupWithProfileAvatarForm = new PopupWithForm('.popup-avatar', {
  handleFormSubmit: () => {
    setUserAvatar(user.setUserAvatar(popupWithProfileAvatarForm.getInputValues()));
  }
});

function setUserAvatar(data) {
  buttonAvatarPopupSubmit.textContent = 'Сохранение...';
  api.setUserAvatar(data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally((res) => {
      buttonAvatarPopupSubmit.textContent = 'Сохранить';
      popupWithProfileAvatarForm.close();
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
function getCard(cardObject, cardElement) {
  function handleFormSubmit() {
    api.deleteCard(cardObject)
      .then(() => {
        cardElement.remove();
        popupWithCardDelete.close();
      })
      .catch((err) => {
        console.log(err, 'Ошибка удаления карточки ' + cardObject.id);
      });
  };

  popupWithCardDelete.setSubmitAction(handleFormSubmit)
  popupWithCardDelete.open();
};


//Получает количество лайков карточки
function getLikeCard(cardObject, cardElement) {
  const likeCount = cardObject.likes.length;
  cardElement.querySelector('.element__like-count').textContent = likeCount;
}

//Push like
function setLikeCard(cardObject, cardElement) {
  api.likeCard(cardObject)
    .then((res) => {
      const likeCount = res.likes.length;
      cardElement.querySelector('.element__like-count').textContent = likeCount;
    })
    .catch((err) => {
      console.log(err, 'Ошибка лайка карточки ' + cardObject.id);
    })
}

//проверяет наличие лайка юзера в приходящих с сервера карточках
function checkLikes(cardData) {
  return cardData.likes.some(item => item._id === userId);
};

function unlikeCard(cardObject, cardElement) {
  api.unlikeCard(cardObject)
    .then((res) => {
      const likeCount = res.likes.length;
      cardElement.querySelector('.element__like-count').textContent = likeCount;
    })
    .catch((err) => {
      console.log(err, 'Ошибка лайка карточки ' + cardObject.id);
    })
}
