import { Component } from "../core/component";

export class HeaderComponent extends Component {
  constructor(id) {
    super(id);
  }

  initComponent() {
    const btn = this.$el.querySelector(".js-header-start");
    if (btn) {
      btn.addEventListener("click", btnHandler.bind(this));
    }
  }
}

function btnHandler() {
  this.hideComponent();
}
