(function () {
'use strict';

angular.module('MenuApp')
.controller('MainMenuAppController', MainMenuAppController);


MainMenuAppController.$inject = ['categories','$rootScope'];
function MainMenuAppController(categories, $rootScope) {
  var mainMenu = this;
  mainMenu.categories = categories;
  mainMenu.selectedCategory = "";
  var cancelArr = [];

  mainMenu.categoryCange = function (shortName) {
    if (mainMenu.selectedCategory == shortName){
      mainMenu.selectedCategory = "";
    }
    else {
      mainMenu.selectedCategory = shortName;
    }
  };

  mainMenu.getSelectedCategory = function () {
    return mainMenu.selectedCategory;
  };

  mainMenu.$onInit = function () {
    var cancel;
    cancel = $rootScope.$on('$stateChangeStart',
      function(event, toState, toParams, fromState, fromParams, options){
        if ("categoryList.items" == toState.name){
          mainMenu.categoryCange("");
        }
      }
    );
    cancelArr.push(cancel);

    cancel = $rootScope.$on('$stateChangeSuccess',
      function(event, toState, toParams, fromState, fromParams, options){
        if ("categoryList.items" == toState.name){
          mainMenu.categoryCange(toParams.shortName);
        }
      }
    );
    cancelArr.push(cancel);


  };

  mainMenu.$onDestroy = function () {
    cancelArr.forEach(function (item) {
      item();
    });
  };
};

})();
