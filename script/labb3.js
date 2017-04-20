angular.module('app', ['ui.router'])
.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/home")

    $stateProvider.state('home', {
          controller: 'HomeCtrl',
          templateUrl: 'partials/home.html',
          url: '/home'
    })
    .state('stats', {
        controller: 'StatsCtrl',
        templateUrl: 'partials/stats.html',
        url: '/stats'
    });
})
.controller('StatsCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {

}])
.controller('HomeCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
  if(!$rootScope.todos) {
      $rootScope.todos = [
        {
          'task': "Mata fiskarna"
        },
        {
          'task': "Städa garaget"
        },
        {
          'task': "Köpa en lampa"
        }];
  };

  $scope.removeTodo = function(index) {
    console.log('remove item ' + index);
    $rootScope.todos.splice(index, 1);
  };

  $scope.addTodo = function() {
    var todo = { 'task': 'Ny uppgift' };
    $rootScope.todos.unshift(todo);
  }
}]);
