'use strict';

// Declare app level module which depends on views, and components jack
angular.module('myApp', [
  'ngRoute',
  'ngResource',
  'myApp.version'
])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'main.html',
            controller: 'mainCtrl'
        });
        $routeProvider.when('/a2000', {
            templateUrl: 'asap/a2000.html',
            controller: 'a2000Ctrl'
        });
      $routeProvider.otherwise({redirectTo: '/view1'});
}])
    .controller('mainCtrl', ['$scope', '$http', '$resource', function($scope, $http, $resource) {

        var Db = $resource('http://localhost:5984');
        var db = Db.get({}, function(){
                $scope.data = db;
                console.log('Resource ' + angular.toJson(db));
        });

        var jkDb = $resource('http://localhost:5984/:db');
        var jk = jkDb.get({db:'jacks_db'}, function(){
                $scope.props = Object.keys(jk);
                $scope.dat2 = jk;
                console.log('Resource' + angular.toJson(jk));
        });

    }])
    .controller('a2000Ctrl', ['$scope', '$http', '$resource', function($scope, $http, $resource) {

        var A2k = $resource('http://localhost:5984/:db/:id');
        var a2k = A2k.get({db: 'jacks_db', id: '2c6749cf4d7fe47db91873337503368e'}, function() {
            $scope.data = a2k.a2000;
            console.log('a2k' + angular.toJson(a2k));
        });

    }]);
