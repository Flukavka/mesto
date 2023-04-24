import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector('.popup__image');
    this._title = this._popup.querySelector('.popup__image-title');
  }

  open(data) {
    super.open();
    this._image.src = data.placeImage.src;
    this._image.alt = data.placeImage.alt;
    this._title.textContent = data.placeName;
  }
}
