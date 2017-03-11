function sleep(time) {
  var d1 = new Date().getTime();
  var d2 = new Date().getTime();
  while (d2 < d1 + time) {
    d2 = new Date().getTime();
  }
  return;
}

new Vue({

    el: '#app',

    data: {
        coffees: [],
        coffeeTitle: "",
        coffeeDescription: "",
        numberOfCoffees: 0
    },
    beforeCompile() {
        // simulated work
        sleep(3000);
    },

    mounted: function() {
        this.fetchCoffees();
    },

    methods: {
        fetchCoffees: function() {
            // GET /someUrl
            this.$http.get('https://raw.githubusercontent.com/RobertJGabriel/coffee-drink-types/master/coffee.json').then(response => {

                this.coffees = JSON.parse(response.body).coffees; // Parse the coffee lists
                this.numberOfCoffees = JSON.parse(response.body).coffees.length; // 
                var randomNumber = Math.floor(Math.random() * this.numberOfCoffees) + 1;

                this.coffeeTitle = this.coffees[randomNumber].name;
                this.coffeeDescription = this.coffees[randomNumber].description;

            }, response => {

            });
        }
    }

});