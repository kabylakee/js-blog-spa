import { Component } from "../core/component";

export class HeaderComponent extends Component {
  constructor(id) {
    super(id);
  }

  initComponent() {
    if (localStorage.getItem("visited")) {
      this.hideComponent();
    }
    const btn = this.$el.querySelector(".js-header-start");
    btn.addEventListener("click", btnHandler.bind(this));
  }
}

function btnHandler() {
  localStorage.setItem("visited", JSON.stringify(true));
  this.hideComponent();
}
