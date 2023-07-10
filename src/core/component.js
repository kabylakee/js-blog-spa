export class Component {
  constructor(id) {
    this.$el = document.getElementById(id);
    this.initComponent();
  }

  initComponent() {}

  hideComponent() {
    this.$el.classList.add("hide");
  }

  showComponent() {
    this.$el.classList.remove("hide");
  }
}
