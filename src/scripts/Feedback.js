class Feedback {
  selectors = {
    form: "[data-js-form]",
    fieldErrors: "[data-js-form-field-errors]",
    textArea: "[data-js-form-textarea]",
  };

  errorMessages = {
    valueMissing: () => "Поле обязательно для заполнения",
    patternMismatch: ({ title }) => title || "Данные не соответствуют формату",
    tooShort: ({ minLength }) =>
      `Слишком короткое значение (минимум символов – ${minLength})`,
    tooLong: ({ maxLength }) =>
      `Слишком длинное значение (максимум символов – ${maxLength})`,
  };

  constructor() {
    this.bindEvents();
  }

  manageErrors = (fieldElement, errorMessages) => {
    const fieldErrorsElement = fieldElement.parentElement.querySelector(
      this.selectors.fieldErrors,
    );

    const fieldInputElement =
      fieldElement.parentElement.querySelector("input") ||
      fieldElement.parentElement.querySelector("textarea");

    fieldErrorsElement.innerHTML = errorMessages
      .map((message) => `<span class="field__error">${message}</span>`)
      .join("");

    fieldInputElement.style.borderColor =
      errorMessages.length > 0 ? "#ff5500" : "rgba(0, 0, 0, 0.1)";
  };

  validateField = (fieldElement) => {
    const errors = fieldElement.validity;
    const errorMessages = [];

    Object.entries(this.errorMessages).forEach(
      ([errorType, getErrorMessage]) => {
        if (errors[errorType]) {
          errorMessages.push(getErrorMessage(fieldElement));
        }
      },
    );

    this.manageErrors(fieldElement, errorMessages);
    const isValid = errorMessages.length === 0;
    fieldElement.areaInvalid = !isValid;

    return isValid;
  };

  onBlur = (event) => {
    const { target } = event;
    const isFormField = target.closest(this.selectors.form);
    const isRequired = target.required;

    if (isRequired && isFormField) {
      this.validateField(target);
    }
  };

  onSubmit = (event) => {
    const isFormElement = event.target.matches(this.selectors.form);

    if (!isFormElement) {
      return;
    }

    const requiredElements = [...event.target.elements].filter(
      (element) => element.required,
    );
    let isFormValid = true;
    let firstInvalidField = null;

    requiredElements.forEach((element) => {
      const isFieldValid = this.validateField(element);

      if (!isFieldValid) {
        isFormValid = false;

        if (!firstInvalidField) {
          firstInvalidField = element;
        }
      }
    });

    if (!isFormValid) {
      firstInvalidField.focus();
      event.preventDefault();
    }
  };

  bindEvents = () => {
    document.addEventListener("blur", this.onBlur, true);
    document.addEventListener("submit", this.onSubmit);
  };
}

export default Feedback;
