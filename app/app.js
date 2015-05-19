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
                console.log('Resource ' + angular.toJson(db));}
        );

        var jkDb = $resource('http://localhost:5984/:db');
        var jk = jkDb.get({db:'jacks_db'}, function(){
                $scope.props = Object.keys(jk);
                $scope.dat2 = jk;
                console.log('Resource' + angular.toJson(jk));}
        );
       /*
        $http.get('http://localhost:5984')
            .success(function (data) {
                $scope.data = data;

            });
        $http.get('http://localhost:5984/jacks_db')
            .success(function (dat2) {
                $scope.dat2 = dat2;
                $scope.props = Object.keys(dat2);

            });
         */
    }])
    .controller('a2000Ctrl', ['$scope', '$http',function($scope, $http) {
        $http.get('http://localhost:5984/jacks_db/2c6749cf4d7fe47db91873337503368e')
            .success(function (data) {
                $scope.data = data.a2000;

            });
        /*
        $http.get('http://localhost:5984/jacks_db')
            .success(function (dat2) {
                $scope.dat2 = dat2;
                $scope.props = Object.keys(dat2);

            });
        */
    }]);
