import { Component } from "../core/component";

export class NavigationComponent extends Component {
  constructor(id) {
    super(id);
  }

  initComponent() {
    this.$el.addEventListener("click", tabHandler.bind(this));
  }
}

function tabHandler(event) {
  event.preventDefault();

  if (event.target.classList.contains("tab")) {
    Array.from(this.$el.querySelectorAll(".tab")).forEach((tab) =>
      tab.classList.remove("active")
    );
    event.target.classList.add("active");
    console.log(event.target);
  }
}

