'use strict';

// Declare app level module which depends on views, and components jack
angular.module('myApp', [
  'ngRoute',
  'ngResource',
  'ngFileUpload',
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
        $routeProvider.when('/togo', {
            templateUrl: 'togo/togo.html',
            controller: 'togoCtrl'
        });
     // $routeProvider.otherwise({redirectTo: '/view1'});
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
      }])


    .controller('togoCtrl', ['$scope', '$http', '$resource','Upload', function($scope, $http, $resource, Upload) {

        $scope.save = function() {
            var UUID = $resource('http://localhost:5984/_uuids');
            var uuid = UUID.get({}, function() {
                $scope.$uid = uuid.uuids[0];
                //console.log($scope.id + angular.toJson($scope.data));
            });

            var Place = $resource('http://localhost:5984/:db/:uid', null, {'create': {method: 'PUT'}});
            console.log($scope.$uid );
            var place = Place.create({db:'jacks_db', uid: $scope.$uid}, $scope.data);
            console.log(place.rev );
        };


        $scope.$watch('files', function () {
            $scope.upload($scope.files);
        });

        $scope.upload = function (files) {
            if (files && files.length) {
                for (var i = 0; i < files.length; i++) {
                    var file = files[i];
                    Upload.http({
                        method:'PUT',
                        //url: 'upload/'+file.name,
                        url: 'http://localhost:5984/jacks_db/aa868a443eebf37733456bec8600140f/attachment?rev=3-3e38108a70d7ab1f2e5cd376b70ad04f',
                        headers: {'Content-Type': file.type},
                        data: file
                    })
                    .progress(function (evt) {
                        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                        console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                    }).success(function (data, status, headers, config) {
                            $scope.file = file;
                        console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
                    });
                }
            }
        };

/*
$scope.upload = function (files) {
            if (files && files.length) {
                for (var i = 0; i < files.length; i++) {
                    var file = files[i];
                    Upload.upload({
                        url: 'upload/url',
                        fields: {'username': $scope.username},
                        file: file
                    }).progress(function (evt) {
                        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                        console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                    }).success(function (data, status, headers, config) {
                        console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
                    });
                }
            }
        };
        /*
                var A2k = $resource('http://localhost:5984/:db/:id');
                var a2k = A2k.get({db: 'jacks_db', id: '2c6749cf4d7fe47db91873337503368e'}, function() {
                    $scope.data = a2k.a2000;
                    console.log('a2k' + angular.toJson(a2k));
                });
         */
    }]);
