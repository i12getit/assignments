(function() {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.directive('foundItems',FoundItemsDirective)

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var nid = this;

  nid.query;
  nid.found = [];

  nid.remove = function (index) {
    nid.found.splice(index,1);
  }
  nid.narrowItDown = function () {
    // console.log("in: nid.narrowItDown()\n" +
    //               "query is:" + nid.query);
    MenuSearchService.getMatchedMenuItems(nid.query)
    .then(function (result) {
      nid.found = result;
    }).catch(function () {
      console.log(result);
    });
  }
}

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.getMatchedMenuItems = function(searchTerm){
    var response = $http({
    method: "GET",
    url: (ApiBasePath + "/menu_items.json")
    });

    return response.then(function (result) {
      var foundItems = [];
      for (var i = 0; i < result.data.menu_items.length; i++){
        if (result.data.menu_items[i].description.indexOf(searchTerm) != -1){
          foundItems.push(result.data.menu_items[i]);
          console.log(result.data.menu_items[i]);
        }
      }
      return foundItems;
    }).catch(function (reason) {
      console.log("catch" + reason);
      return reason;
    });
  };

}

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'found-items-template.html',
    scope: {
      items: '<',
      remove: '&'
    },
    // controller: foundItemsDirectiveController,
    // controllerAs: 'found',
    // bindToController: true
  };

  return ddo;
}

function foundItemsDirectiveController() {
  var found = this;


}
}());
