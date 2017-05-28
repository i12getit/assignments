(function () {
'use strict';

angular.module('ass1app', [])
.controller('ass1controller', ass1controller);

ass1controller.$inject = ['$scope'];
function ass1controller($scope) {
  $scope.first = true;
  $scope.textboxdata = "first text";
  $scope.count = 0;
  $scope.calcDone = false;

  $scope.afterclick = function () {
    if ($scope.first == true)
    {
      $scope.first = false;
      $scope.textboxdata = ""
    }
  }

  $scope.calcFood = function () {
    var items = $scope.textboxdata.split(',');
    $scope.count = 0;
    for (var i = 0; i < items.length; i++){
      items[i] = items[i].replace(/\s/g, '');
      if (items[i] != "")
          $scope.count++;
          console.log(items[i])
    }

    $scope.calcDone = true;
    console.log($scope.count)
  }

};

})();
