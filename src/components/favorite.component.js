import { Component } from "../core/component";
import { apiService } from "../services/api.service";

export class FavoriteComponent extends Component {
  constructor(id, { loader }) {
    super(id);
    this.loader = loader;
  }

  initComponent() {
    // this.$el.addEventListener("click", linkClickHnadler.bind(this));
    // const postId = event.target.textContent;
    // this.$el.innerHTML = "";
    // this.loader.showComponent();
    // const post = apiService.getPostById(postId);
    // this.loader.hideComponent();
    // this.$el.insertAdjacentHTML("beforeend", renderPost(post));
  }

  async onShow() {
    this.$el.innerHTML = "";

    const favorites = JSON.parse(localStorage.getItem("favorites"));
    const html = await renderList(favorites, this.$el, this.loader);

    console.log("html", html);
  }
}

async function renderList(list = [], event, loader) {
  if (list.length) {
    let post = {};
    list.forEach(async (postID) => {
      loader.showComponent();
      post = await apiService.getPostById(postID);
      loader.hideComponent();

      event.insertAdjacentHTML("beforeend", renderPost(post));
    });
  } else {
    const noDataHtml = `<p class="center">You don't add favorite posts yet!</p>`;
    event.insertAdjacentHTML("beforeend", noDataHtml);
  }
}

// async function linkClickHnadler(event) {
//   event.preventDefault();

//   if (event.target.classList.contains("js-link")) {
//     const postId = event.target.textContent;
//     this.loader.showComponent();

//     const post = await apiService.getPostById(postId);
//     this.loader.hideComponent();
//     this.$el.insertAdjacentHTML("beforeend", renderPost(post));
//   }
// }

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
