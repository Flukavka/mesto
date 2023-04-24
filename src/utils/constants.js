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
const buttonProfileEdit = document.querySelector('.profile__info-edit');
const buttonCardAdd = document.querySelector('.profile__btn-add');
const placeName = document.querySelector('.popup__input_field_name');
const placeImage = document.querySelector('.popup__input_field_link');
const popupImage = document.querySelector('.popup__image');
const popupTitle = document.querySelector('.popup__image-title');
const formProfile = document.querySelector('.popup-profile__form');
const formCardPlace = document.querySelector('.popup-element__form');
const cardsContainer = document.querySelector('.elements__list');
const popups = document.querySelectorAll('.popup');

export {
  initialCards, popupProfile, popupCard, popupImageWrapper, buttonProfileEdit,
  buttonCardAdd, placeName, placeImage, popupImage, popupTitle, formProfile,
  formCardPlace, cardsContainer, popups, validationConfig as config
}
