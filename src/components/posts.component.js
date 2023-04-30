import { Component } from "../core/component";
import { apiService } from "../services/api.service";
import { TransformService } from "../services/transform.service";

export class PostsComponent extends Component {
  constructor(id, { loader }) {
    super(id);
    this.loader = loader;
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

function renderPost(post) {
  const tag =
    post.type === "news"
      ? '<li class="tag tag-blue tag-rounded">News</li>'
      : '<li class="tag tag-rounded">Note</li>';

  const btn =
    '<button class="button-round button-small button-primary">Save</button>';

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
