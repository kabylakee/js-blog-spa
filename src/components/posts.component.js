import { Component } from "../core/component";
import { apiService } from "../services/api.service";
import { TransformService } from "../services/transform.service";

export class PostsComponent extends Component {
  constructor(id, { loader }) {
    super(id);
    this.loader = loader;
  }

  initComponent() {
    this.$el.addEventListener("click", btnHandler.bind(this));
  }

  async onShow() {
    this.loader.showComponent();
    const fbData = await apiService.getPosts();
    const posts = TransformService.fbObjectToArray(fbData);
    posts.forEach((obj) => {
      this.loader.hideComponent();
      this.$el.insertAdjacentHTML("beforeend", renderPost(obj));
    });
  }

  onHide() {
    this.$el.innerHTML = "";
  }
}

function btnHandler(event) {
  const el = event.target;
  const id = el.dataset.id;

  if (id) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (favorites.includes(id)) {
      el.textContent = "Save";
      el.classList.add("button-primary");
      el.classList.remove("button-danger");
      favorites = favorites.filter((fId) => fId !== id);
    } else {
      el.textContent = "Delete";
      el.classList.remove("button-primary");
      el.classList.add("button-danger");
      favorites.push(id);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
  }
}

function renderPost(post) {
  const tag =
    post.type === "news"
      ? '<li class="tag tag-blue tag-rounded">News</li>'
      : '<li class="tag tag-rounded">Note</li>';

  const btn = JSON.parse(localStorage.getItem("favorites") || []).includes(
    post.id
  )
    ? `<button class="button-round button-small button-danger" data-id=${post.id}>Delete</button>`
    : `<button class="button-round button-small button-primary" data-id=${post.id}>Save</button>`;

  return `<div class="panel">
          <div class="panel-head">
            <p class="panel-title">${post.title}</p>
            <ul class="tags">${tag}</ul>
          </div>
          <div class="panel-body">
            <p class="multi-line">${post.fulltext}</p>
          </div>
          <div class="panel-footer w-panel-footer">
            <small>${post.date}</small>
            ${btn}
          </div>
        </div>`;
}
