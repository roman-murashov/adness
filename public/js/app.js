var App = angular.module('app', 
  ['ngRoute', 'ngResource', 'ngCookies'])
  .config(function($httpProvider){
    // $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
    // $httpProvider.defaults.headers.common["Accept"] = "application/json";
    // $httpProvider.defaults.withCredentials = true;
  })
  .config(function($routeProvider, $locationProvider, $httpProvider){
    $locationProvider.html5Mode(true);
    $routeProvider.when('/auctions', {templateUrl: '/auctions.html'});
  });

App.factory('authInterceptor', function ($rootScope, $q, $window, $cookieStore) {
  return {
    request: function (config) {
      config.headers = config.headers || {};
      var token = $window.sessionStorage.token ? $window.sessionStorage.token : $cookieStore.get('token');
      if (token) {
        config.headers.Authorization = 'Bearer ' + token;
      }
      return config;
    },
    response: function (response) {
      if (response.status === 401) {
        // handle the case where the user is not authenticated
      }
      return response || $q.when(response);
    }
  };
});

App.config(function ($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
});