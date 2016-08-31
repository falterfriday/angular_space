var app = angular.module('app', ['ngRoute', 'ngCookies', 'ngMaterial', 'ngMessages', 'ngParallax']);
app.config(function($routeProvider){
$routeProvider
	.when('/', {
		templateUrl: 'partials/mainPartial.html',
		controller: 'mainController'
	})
	.when('/nasa', {
		templateUrl: 'partials/nasaPartial.html',
		controller: 'nasaController'
	})
	.otherwise({
			redirectTo: '/'
		});
	});
