import Popup from "./Popup.js"

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    const inputs = this._popup.querySelectorAll('.popup__input');

    const data = {};
    inputs.forEach((input) => {

      const name = input.name;
      const value = input.value;
      data[name] = value;
    })

    return data;
  }

  setEventListeners() {
    super.setEventListeners();

    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._popup.querySelector('.popup__form').reset();
  }
}
