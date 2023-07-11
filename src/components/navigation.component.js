import { Component } from "../core/component";

export class NavigationComponent extends Component {
  constructor(id) {
    super(id);

    this.tabs = [];
  }

  initComponent() {
    this.$el.addEventListener("click", tabHandler.bind(this));
  }

  registerTabs(tabs) {
    this.tabs = tabs;
  }
}

function tabHandler(event) {
  event.preventDefault();

  if (event.target.classList.contains("tab")) {
    Array.from(this.$el.querySelectorAll(".tab")).forEach((tab) =>
      tab.classList.remove("active")
    );
    event.target.classList.add("active");
  }

  const activeTab = this.tabs.find((t) => t.name === event.target.dataset.name);
  this.tabs.forEach((t) => t.component.hideComponent());
  activeTab.component.showComponent();
}
