import { Component } from "../core/component";
import { apiService } from "../services/api.service";

export class FavoriteComponent extends Component {
  constructor(id, { loader }) {
    super(id);
    this.loader = loader;
  }

  onShow() {
    this.$el.innerHTML = "";

    const favorites = JSON.parse(localStorage.getItem("favorites"));
    renderList(favorites, this.$el, this.loader);
  }
}

async function renderList(list = [], event, loader) {
  if (list.length) {
    list.forEach(async (postID) => {
      loader.showComponent();
      const post = await apiService.getPostById(postID);
      loader.hideComponent();

      event.insertAdjacentHTML("beforeend", renderPost(post));
    });
  } else {
    const noDataHtml = `<p class="center">You don't add favorite posts yet!</p>`;
    event.insertAdjacentHTML("beforeend", noDataHtml);
  }
}

function renderPost(post) {
  const tag =
    post.type === "news"
      ? '<li class="tag tag-blue tag-rounded">News</li>'
      : '<li class="tag tag-rounded">Note</li>';

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
          </div>
        </div>`;
}
