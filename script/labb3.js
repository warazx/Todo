angular.module('app', ['ui.router', 'chart.js'])
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
    })
    .state('charts', {
        controller: 'ChartsCtrl',
        templateUrl: 'partials/charts.html',
        url: '/charts'
    })
    .state('cities', {
        controller: 'CitiesCtrl',
        templateUrl: 'partials/cities.html',
        url: '/cities'
    });
})

.directive('statistics', function() {
  return {
    controller: 'StatsCtrl',
    template: 'Antal: {{todos.length}}'
    };
})

.factory('citiesManager', ['$http', '$q', function($http, $q) {
  return {
    getCities: function() {
      return $q(function(resolve) {
        $http.get('http://cities.jonkri.se/0.0.0/cities').then(function(response) {
          resolve(response.data.items);
        });
      });
    },
    addCity: function(newCity) {
        $http.post('http://cities.jonkri.se/0.0.0/cities', newCity);
    }
  };
}])

.controller('CitiesCtrl', ['$scope', 'citiesManager', function($scope, citiesManager) {
  $scope.cities = updateCities();

  $scope.addCity = function(city) {
    if(city.name.length > 0 && city.population >= 0) {
      citiesManager.addCity(city);
      updateCities();
    }
  };

   function updateCities() {
    citiesManager.getCities().then(function(response) {
      $scope.cities = response;
    });
  };
}])

.controller('StatsCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {}])

.controller('ChartsCtrl', ['$scope', 'citiesManager', function($scope, citiesManager) {
  $scope.data = [];
  $scope.labels = [];
  citiesManager.getCities().then(function(response) {
    for(var i = 0; i < response.length; i++) {
      $scope.data.push(response[i].population);
      $scope.labels.push(response[i].name);
    }
  });
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
