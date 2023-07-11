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
    let formIsValid = true;

    Object.keys(this.controls).forEach((control) => {
      let isValid = true;
      const validators = this.controls[control];

      validators.forEach((validator) => {
        isValid = validator(this.container[control].value) && isValid;
      });
      formIsValid = isValid;
    });

    return formIsValid;
  }
}
