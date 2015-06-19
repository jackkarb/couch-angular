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
            UUID.get({}, function(uuid) {
                ///var uuid = UUID.get({}, function() {
                $scope.uid = uuid.uuids[0];
               /*
                var Place = $resource('http://localhost:5984/:db/:uid', null, {'create': {method: 'PUT'}});
                var place = Place.create({db:'jacks_db', uid: $scope.uid}, $scope.data)
                    .success(function (data, status, headers, config) {
                        $scope.rev = data.rev;
                        console.log(data);
                    });
                */
               $http.put('http://localhost:5984/jacks_db/'+$scope.uid, $scope.data )
                    .success(function (data, status, headers, config) {
                        $scope.rev = data.rev;
                    });

            });


            //var Place = $resource('http://localhost:5984/:db/:uid', null, {'create': {method: 'PUT'}});
            //console.log($scope.uid );
            //Place.create({db:'jacks_db', uid: $scope.uid}, $scope.data);

           //console.log(angular.toJson(place)); hello sirus

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
                        url: 'http://localhost:5984/jacks_db/'+$scope.uid+'/attachment?rev='+$scope.rev,
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


    }]);
