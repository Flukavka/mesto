export default class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  }

  _showInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.popup__input_field_${inputElement.name}`);
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.nextElementSibling.textContent = inputElement.validationMessage;
    errorElement.nextElementSibling.classList.add(this._config.errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.popup__input_field_${inputElement.name}`);
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.nextElementSibling.classList.remove(this._config.errorClass);
    errorElement.nextElementSibling.textContent = '';
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  toggleButtonState() {
    const popupButton = this._formElement.querySelector(this._config.submitButtonSelector);
    if (this._hasInvalidInput()) {
      popupButton.classList.add(this._config.inactiveButtonClass);
      popupButton.disabled = true;
    } else {
      popupButton.classList.remove(this._config.inactiveButtonClass);
      popupButton.disabled = false;
    }
  }

  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this.toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._setEventListeners(this._inputList);
  }
}
