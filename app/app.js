'use strict';

// Declare app level module which depends on views, and components jack
angular.module('myApp', [
  'ngRoute',
  'ngResource',
  'angularFileUpload',
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

        var A2k = $resource('http://localhost:5984/:db/:id');
        var a2k = A2k.get({db: 'jacks_db', id: '2c6749cf4d7fe47db91873337503368e'}, function() {
            $scope.data = a2k.a2000;
            console.log('a2k' + angular.toJson(a2k));
        });


    }])
    .controller('togoCtrl', ['$scope', '$http', '$resource','FileUploader', function($scope, $http, $resource, FileUploader) {
        var uploader = $scope.uploader = new FileUploader({
                    url: 'http://localhost:5984/jacks_db'
                 });

        uploader.filters.push({
                         name: 'customFilter',
                         fn: function(item /*{File|FileLikeObject}*/, options) {
                            return this.queue.length < 10;
                        }
                });


        // CALLBACKS

        uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
                console.info('onWhenAddingFileFailed', item, filter, options);
            };
        uploader.onAfterAddingFile = function(fileItem) {
                console.info('onAfterAddingFile', fileItem);
             };
        uploader.onAfterAddingAll = function(addedFileItems) {
                console.info('onAfterAddingAll', addedFileItems);
             };
        uploader.onBeforeUploadItem = function(item) {
                console.info('onBeforeUploadItem', item);
             };
        uploader.onProgressItem = function(fileItem, progress) {
                console.info('onProgressItem', fileItem, progress);
            };
        uploader.onProgressAll = function(progress) {
                console.info('onProgressAll', progress);
            };
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
                console.info('onSuccessItem', fileItem, response, status, headers);
            };
        uploader.onErrorItem = function(fileItem, response, status, headers) {
                console.info('onErrorItem', fileItem, response, status, headers);
             };
        uploader.onCancelItem = function(fileItem, response, status, headers) {
                 console.info('onCancelItem', fileItem, response, status, headers);
             };
         uploader.onCompleteItem = function(fileItem, response, status, headers) {
                 console.info('onCompleteItem', fileItem, response, status, headers);
             };
        uploader.onCompleteAll = function() {
                 console.info('onCompleteAll');
             };

        console.info('uploader', uploader);
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
