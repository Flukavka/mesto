import Popup from "./Popup.js"

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
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
      this._handleFormSubmit(this._getInputValues());
    }
    this._popup.addEventListener('submit', this.handleFormSubmitEvent);
  }

  close() {
    super.close();
    this._popupForm.reset();
  }
}
