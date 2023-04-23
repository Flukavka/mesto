import Popup from "./Popup.js"

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._handleFormSubmitEvent = () => { };
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
    this.handleFormSubmitEvent = (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    }
    this._popup.addEventListener('submit', this.handleFormSubmitEvent);
  }

  close() {
    super.close();
    this._popup.querySelector('.popup__form').reset();
    this._popup.removeEventListener('submit', this.handleFormSubmitEvent);
  }
}
