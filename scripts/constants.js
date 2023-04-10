const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

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

export {
  initialCards, popupProfile, popupCard, popupImageWrapper, btnProfileEdit,
  btnCardAdd, placeName, placeImage, popupImage, popupTitle, userName, userNameInput,
  userProfession, userProfessionInput, formProfile, formCardPlace, cardsContainer,
  cardTemplate, popups, validationConfig as config
}
