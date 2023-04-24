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

    // const acc = validators.reduce(
    //   (acc, val, index) => {
    //     if (val(this.container[controls[index]].value)) {
    //       acc[true] = acc[true] + 1;
    //       return acc;
    //     } else {
    //       acc[false] = acc[false] + 1;
    //       return acc;
    //     }
    //   },
    //   { true: 0, false: 0 }
    // );
    // return acc[false] === 0;
  }
}
