var app = angular.module('color', []);

app.controller('controller', function($scope) {
    
    $scope.themeList = [{
        color: "#F44336",
        active: true
    }];
    $scope.savedTheme = localStorage.getItem('theme');
    $scope.theme = (localStorage.getItem('theme') !== null) ? JSON.parse($scope.savedTheme) : $scope.themeList;
    $scope.themeStyle = (localStorage.getItem('theme') !== null) ? {
        'background-color': $scope.theme[0][0].color
    } : {
        'background-color': "#F44336 !important"
    };
    $scope.themeStyleSides = (localStorage.getItem('theme') !== null) ? {
        'border-left': "2px solid " + $scope.theme[0][0].color + "!important",
        'border-bottom': "2px solid " + $scope.theme[0][0].color + "!important"
    } : {
        'border-left': "2px solid " + "#F44336 !important",
        'border-bottom': "2px solid " + "#F44336 !important"
    };

    /**
     * Onload Event for Angular
     * @param {none} none 
     * @return {none} nonea
     */
    $scope.init = function() {

    };

    /**
     * sets current color or theme
     * @param {String} color 
     * @return {none} none
     */
    $scope.setColor = function(color) {
        console.log(color);
        $scope.removeLocalStorage('theme');
        $scope.theme = [];
        $scope.theme.push([{
            color: color,
            active: true
        }]);
        localStorage.setItem('theme', JSON.stringify($scope.theme));
        $scope.themeStyle = {
            'background-color': color

        };
        $scope.themeStyleSides = {
            'border-left': "2px solid " + color,
            'border-bottom': "2px solid " + color
        };
    };

    /**
     * Remove localstorage by key
     * @param {String} Key
     * @return {none} none
     */
    $scope.removeLocalStorage = function(key) {
        localStorage.removeItem(key);
    };

});