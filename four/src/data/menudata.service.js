// create a service called `MenuDataService` in it.
// This service should be declared on the `data` module, *not* on the `MenuApp` module.
// The `MenuDataService` should have 2 methods:
//   * `getAllCategories` - this method should return a promise which is a result of using the `$http` service,
//     using the following REST API endpoint: https://davids-restaurant.herokuapp.com/categories.json
//   * `getItemsForCategory(categoryShortName)` - this method should return a promise which is a result of using the `$http` service,
//     using the following REST API endpoint: https://davids-restaurant.herokuapp.com/menu_items.json?category=,
//     where, before the call to the server, your code should append whatever `categoryShortName`
//     value was passed in as an argument into the `getItemsForCategory` method.

(function() {
  'use strict';

angular.module('data')
.service('MenuDataService', MenuDataService);


MenuDataService.$inject = ['$http'];
function MenuDataService($http) {
  var menuData = this;
  menuData.getAllCategories = function () {
    //    return a promise which is a result of using the `$http` service,
    //    using the following REST API endpoint: https://davids-restaurant.herokuapp.com/categories.json
    console.log("MenuDataService.getAllCategories() is running");
    var response = $http({
      method: "GET",
      url: ('https://davids-restaurant.herokuapp.com/categories.json')
    });

    return response.then(function (result) {
      return result.data;
    }).catch(function (reason) {
      console.log("catch" + reason);
      return reason;
    });

  };

  menuData.getItemsForCategory = function (categoryShortName) {
    //    return a promise which is a result of using the `$http` service,
    //     using the following REST API endpoint: https://davids-restaurant.herokuapp.com/menu_items.json?category=,
    //     where, before the call to the server, your code should append whatever `categoryShortName`
    //     value was passed in as an argument into the `getItemsForCategory` method.
    console.log("MenuDataService.getItemsForCategory() is running");
    var response = $http({
      method: "GET",
      url: ('https://davids-restaurant.herokuapp.com/menu_items.json?category=' + categoryShortName)
    });

    return response.then(function (result) {
      return result.data.menu_items;
    }).catch(function (reason) {
      console.log("catch" + reason);
      return reason;
    });
  };

}
}());
