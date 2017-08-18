angular
	.module('app', [
		'ngRoute',
		'ngCookies',
		'ngMaterial',
		'ngMessages',
		'720kb.socialshare'
	])
	.config(config);

function config($routeProvider, $locationProvider, $mdThemingProvider){
	$routeProvider
		.when('/', {
			templateUrl: 'partials/mainPartial.html',
			controller: 'mainController'
		})
		.when('/nasa', {
			templateUrl: 'partials/nasaPartial.html',
			controller: 'nasaController'
		})
		.when('/reddit', {
			templateUrl: 'partials/redditPartial.html',
			controller: 'redditController'
		})
		.when('/profile/:id', {
			templateUrl: 'partials/profilePartial.html',
			controller: 'profileController'
		})
		.otherwise({
			redirectTo: '/'
		});

	$locationProvider.html5Mode(true);

	$mdThemingProvider.theme('default').dark();
}