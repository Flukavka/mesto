import Popup from "./Popup.js"

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._inputs = this._popup.querySelectorAll('.popup__input');
    this._popupForm = this._popup.querySelector('.popup__form');
  }

  getInputValues() {
    const data = {};
    this._inputs.forEach((input) => {

      const name = input.name;
      const value = input.value;
      data[name] = value;
    })
    return data;
  }

  setInputValues(data) {
    this._inputs.forEach((input) => {
      input.value = data[input.name];
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this.handleFormSubmitEvent = (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this.getInputValues());
    }
    this._popup.addEventListener('submit', this.handleFormSubmitEvent);
  }

  close() {
    super.close();
    this._popupForm.reset();
  }
}
