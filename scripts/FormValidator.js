export default class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
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
    console.log(inputElement.minLength)
    console.log(inputElement.length)
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState(inputList) {
    const popupButton = this._formElement.querySelector(this._config.submitButtonSelector);
    if (this._hasInvalidInput(inputList)) {
      popupButton.classList.add(this._config.inactiveButtonClass);
      popupButton.disabled = true;
    } else {
      popupButton.classList.remove(this._config.inactiveButtonClass);
      popupButton.disabled = false;
    }
  }

  _setEventListeners(inputList) {

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList);
      });
    });
  }

  enableValidation() {
    const inputList = Array.from(this._formElement
      .querySelectorAll(this._config.inputSelector));

    this._setEventListeners(inputList);
  }
}

