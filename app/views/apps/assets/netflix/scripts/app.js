'use strict';

var getNetflixCategories = 'https://raw.githubusercontent.com/RobertJGabriel/netflix-secret-categories-json/master/index.json';

var vm = new Vue({
  el: '#app',
  data: {
    categories: [],
    loading: true,
    error: false,
    errorMessage: '',
    title: ''
  },
  computed: {
    filteredResults: function filteredResults() {
      var _this = this;

      return this.categories.filter(function (x) {
        return x.value.toLowerCase().includes(_this.title.toLowerCase());
      });
    }
  },
  methods: {

    load: function load() {
      var _this2 = this;

      this.loading = true;
      this.$http.get('' + getNetflixCategories).then(function (response) {

        var keys = JSON.parse(response.bodyText);

        for (var p in keys) {
          if (keys.hasOwnProperty(p)) {
            var id = p;
            var value = keys[p];
            var object = {
              id: id,
              url: 'https://www.netflix.com/browse/genre/' + id,
              value: value
            };
            _this2.categories.push(object);
          }
        }
        _this2.loading = false;
      }, function (response) {

        _this2.error = true;
        _this2.loading = null;
        _this2.categories = [];
        _this2.errorMessage = 'Opps, something seems to have gone wrong. Please try again';
      });
    }
  }
});

vm.load();
// Set config settings
Vue.config.productionTip = false;
Vue.config.devtools = false;