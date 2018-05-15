var blog = new Vue({
  el: '#blog',
  data: {
    blogPosts: []
  },
  created: function () {
    this.fetchData();
  },
  methods: {
    fetchData: function () {

      this.$http.get('https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Fmedium.com%2Ffeed%2F%40robertjgabriel').then(response => {
        console.log(response);
        this.blogPosts = response.data.items;
      })
    }
  }
});
