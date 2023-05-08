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
const buttonProfileAvatarEdit = document.querySelector('.profile__avatar-edit');
const placeName = document.querySelector('.popup__input_field_name');
const placeImage = document.querySelector('.popup__input_field_link');
const popupImage = document.querySelector('.popup__image');
const popupTitle = document.querySelector('.popup__image-title');
const formProfile = document.querySelector('.popup-profile__form');
const formCardPlace = document.querySelector('.popup-element__form');
const formProfileAvatar = document.querySelector('.popup-avatar__form');
const cardsContainer = document.querySelector('.elements__list');
const popups = document.querySelectorAll('.popup');
const buttonAvatarPopupSubmit = document.querySelector('.popup-avatar__btn-save');
const buttonProfilePopupSubmit = document.querySelector('.popup-profile__btn-save');
const buttonPlacePopupSubmit = document.querySelector('.popup-element__btn-save');

export {
  formProfileAvatar, buttonProfileAvatarEdit, popupProfile, popupCard, popupImageWrapper, buttonProfileEdit,
  buttonCardAdd, placeName, placeImage, popupImage, popupTitle, formProfile,
  formCardPlace, cardsContainer, popups, buttonAvatarPopupSubmit, buttonProfilePopupSubmit,
  buttonPlacePopupSubmit, validationConfig as config
}
