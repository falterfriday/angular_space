angular
	.module('app', [
		'ngRoute',
		'ngCookies',
		'ngMaterial',
		'ngMessages',
		'720kb.socialshare'
	])
	.config(config);

function config($routeProvider){
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
}

angular
	.module('app')
	.config(function($mdThemingProvider) {
		$mdThemingProvider.theme('default')
		.dark();
});
