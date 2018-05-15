var repos = new Vue({
  el: '#repos',
  data: {
    loading:true,
    repos: []
  },
  created: function () {
    this.fetchData()
  },
  methods: {
    fetchData: function () {
      this.$http
        .get(
          'https://api.github.com/users/robertjgabriel/repos?type=all&sort=created&direction=desc&per_page=100'
        )
        .then(response => {
          this.repos = response.data;
          this.loading = false;
        })
    }
  }
})
