var blog = new Vue({
  el: '#blog',
  data: {
    loading: true,
    blogPosts: []
  },
  created: function () {
    this.fetchData();
  },
  methods: {
    fetchData: function () {
      this.$http
        .get(
          'https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Fmedium.com%2Ffeed%2F%40robertjgabriel'
        )
        .then(response => {
          this.blogPosts = response.data.items;
          this.loading = false;
        })
    }
  }
})
