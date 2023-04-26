export class Form {
  constructor(container, controls) {
    this.container = container;
    this.controls = controls;
  }

  formValue() {
    const value = {};
    Object.keys(this.controls).forEach((control) => {
      value[control] = this.container[control].value;
    });
    return value;
  }

  isValid() {
    let isFormValid = true;

    Object.keys(this.controls).forEach((control) => {
      const validators = this.controls[control];

      let isValid = true;
      validators.forEach((validator) => {
        isValid = validator(this.container[control].value) && isValid;
      });

      isValid
        ? clearError(this.container[control])
        : setError(this.container[control]);

      isFormValid = isFormValid && isValid;
    });

    return isFormValid;
  }

  clearForm() {
    this.container.reset();
  }
}

function setError(control) {
  clearError(control);

  const err = '<p class="validation-error">Enter correct values!</p>';
  control.classList.add("invalid");
  control.insertAdjacentHTML("afterend", err);
}

function clearError(control) {
  control.classList.remove("invalid");
  if (control.nextSibling) {
    control.closest(".form-control")?.removeChild(control.nextSibling);
  }
}
