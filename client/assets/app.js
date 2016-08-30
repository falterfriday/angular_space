var app = angular.module('app', ['ngRoute', 'ngCookies', 'ngMaterial', 'ngMessages']);
app.config(function($routeProvider){
$routeProvider
	.when('/', {
		templateUrl: 'partials/photoPartial.html',
		controller: 'photoController'
	})
	.otherwise({
			redirectTo: '/'
		});
	});
