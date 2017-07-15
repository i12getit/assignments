(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemsController', ItemsController);


ItemsController.$inject = ['shortName','items'];
function ItemsController(shortName, items) {
  var itemsList = this;
  itemsList.items = items;
  itemsList.shortName = shortName;
};

})();
