'use strict';

var starbucksMenu = 'https://app.starbucks.com/bff/ordering/menu';

var vm = new Vue({
  el: '#app',
  data: {
    menu: [],
    loading: true,
    error: false,
    errorMessage: '',
    title: ''
  },
  computed: {
    filteredResults: function filteredResults() {
      var _this = this;

      return this.menu.filter(function (x) {
        return x.value.toLowerCase().includes(_this.title.toLowerCase());
      });
    }
  },
  methods: {

    load: function load() {
      var _this2 = this;

      this.loading = true;
      this.$http.get('' + starbucksMenu, {'mode': 'no-cors'}).then(function (response) {

        var keys = JSON.parse(response.bodyText);
        console.log(keys.menus[0]);
       // for (var p in keys) {
         // if (keys.hasOwnProperty(p)) {
         //   var id = p;
          //  var value = keys[p];
           // var object = {
            //  id: id,
             // url: 'https://www.netflix.com/browse/genre/' + id,
             // value: value
           // };
         //   _this2.menu.push(object);
         // }
        //}
       // _this2.loading = false;
      }, function (response) {

        _this2.error = true;
        _this2.loading = null;
        _this2.menu = [];
        _this2.errorMessage = 'Opps, something seems to have gone wrong. Please try again';
      });
    }
  }
});

vm.load();
// Set config settings
Vue.config.productionTip = false;
Vue.config.devtools = false;