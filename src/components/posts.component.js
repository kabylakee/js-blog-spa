import { Component } from "../core/component";
import { apiService } from "../services/api.service";
import { TransformService } from "../services/transform.service";

export class PostsComponent extends Component {
  constructor(id) {
    super(id);
  }

  async onShow() {
    const fbData = await apiService.getPosts();
    const posts = TransformService.fbObjectToArray(fbData);

    posts.forEach((obj) => {
      this.$el.querySelector(".panel-title").textContent = obj.title;
      this.$el.querySelector(".tag").textContent = obj.type;
      this.$el.querySelector(".multi-line").textContent = obj.fulltext;
      this.$el.querySelector(".panel-footer").textContent = obj.date;
    });
    console.log("posts", posts);
  }

  initComponent() {}
}
