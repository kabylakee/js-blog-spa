class ApiService {
  constructor(url) {
    this.url = url;
  }

  async createPost(post) {
    try {
      const request = new Request(this.url + "posts.json", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(post),
      });
      const response = await fetch(request);

      return await response.json();
    } catch (error) {
      console.error(error);
    }
  }

  async getPosts() {
    try {
      const request = new Request(this.url + "posts.json", {
        method: "GET",
      });
      const response = await fetch(request);
      const posts = await response.json();

      return posts;
    } catch (error) {
      console.error(error);
    }
  }

  async getPostById(id) {
    try {
      const request = new Request(`${this.url}posts/${id}.json`, {
        method: "GET",
      });
      const response = await fetch(request);
      const posts = await response.json();

      return posts;
    } catch (error) {
      console.error(error);
    }
  }
}

export const apiService = new ApiService(
  "https://js-blog-spa-default-rtdb.firebaseio.com/"
);
