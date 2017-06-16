(function() {
  'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController',ToBuyController)
.controller('AlreadyBoughtController',AlreadyBoughtController)
.service('ShoppingListService',ShoppingListService);

ToBuyController.$inject = ['ShoppingListService'];
function ToBuyController(ShoppingListService) {
  var list = this;

  list.items = ShoppingListService.getToBuyItems();
  list.touched = false;

  this.addItem = function (name, amount) {
    ShoppingListService.addItem(name, amount);
    list.touched = true;
  }

  this.removeItem = function (index) {
    ShoppingListService.bought(index);
  };

}

AlreadyBoughtController.$inject = ['ShoppingListService'];
function AlreadyBoughtController(ShoppingListService) {
  var list = this;
  list.items = ShoppingListService.getBoughtItems();
}

function ShoppingListService() {
  var ToBuyList = [];
  var BoughtList = [];

  this.addItem = function (name, amount) {
    var item = {
      name: name,
      amount: amount
    }
    ToBuyList.push(item);
    console.log(ToBuyList);
  }

  this.getToBuyItems = function () {
    return ToBuyList;
  }

  this.getBoughtItems = function () {
    return BoughtList;
  }

  this.bought = function (i) {
    var item = ToBuyList.splice(i,1)[0];
    BoughtList.push(item);
  }
}
}());
