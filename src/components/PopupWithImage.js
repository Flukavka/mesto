import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(data, popupSelector) {
    super(popupSelector);
    this._image = data.placeImage;
    this._title = data.placeName;
  }

  open() {
    const image = this._popup.querySelector('.popup__image');
    const title = this._popup.querySelector('.popup__image-title');
    image.src = this._image.src;
    image.alt = this._image.alt;
    title.textContent = this._title;
    super.open();
  }
}
