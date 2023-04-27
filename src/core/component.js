export class Component {
  constructor(id) {
    this.$el = document.getElementById(id);
    this.initComponent();
  }

  initComponent() {}

  onShow() {

  }

  onHide() {

  }

  hideComponent() {
    this.$el.classList.add("hide");
    this.onHide();
  }

  showComponent() {
    this.$el.classList.remove("hide");
    this.onShow();
  }
}
