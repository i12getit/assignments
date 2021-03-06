// configure your routes and view states in it. These routes should be defined in the `MenuApp` module.

//   * *Hint:* don't try to define the states all at once.
//      Define one state, including whatever it needs and make sure it works all
//      the way to the point when you can see the results on the screen.
//      Then, move on to the next view state.
//      That *does* mean that you will have to leave `routes.js` and define all the other
//      artifacts listed below and then come back to it, etc.

//   * *Hint:* The `home` state will not need a controller. Just a template.

//   * *Hint:* The `categories` state can have a `controller` as well as a `resolve`.
//      The resolve will use the `MenuDataService` to retrieve categories and inject them into the controller.
//      The controller can then expose the retrieved categories object such that it can be
//      simply passed into the `categories` component.

//   * *Hint:* The `items` state can have the same type of setup as the `categories` state.


(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  // Set up UI states
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'src/home.html'
    })

    .state('categoryList', {
      url: '/categories',
      templateUrl: 'src/menu/templates/categories.template.html',
      controller: 'MainMenuAppController as mainCtrl',
      resolve: {
        categories: ['MenuDataService', function (MenuDataService) {
          return MenuDataService.getAllCategories();
        }]
      }
    })

    .state('categoryList.items', {
      url: '/{shortName}/items',
      templateUrl: 'src/menu/templates/items.template.html',
      controller: 'ItemsController as ItemsCtrl',
      resolve: {
        shortName: ['$stateParams', function ($stateParams) {
          return $stateParams.shortName;
        }],
        items: ['$stateParams','MenuDataService', function ($stateParams, MenuDataService) {
          return MenuDataService.getItemsForCategory($stateParams.shortName);
        }]
      }
    })

    .state('categoryList.items.description', {
      url: '/{itemId}',
      templateProvider: function ($stateParams){
        return '<div ng-if="$index =='+$stateParams.itemId+'">' +  '{{ItemsCtrl.items[' + $stateParams.itemId + '].description}}</div>';
      },
      controller: 'ItemsController as ItemsCtrl'
    });
}


})();
