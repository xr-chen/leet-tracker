console.log("popup loaded.")

let myleetcodetracker = angular.module("myleetcodetracker", ['ui.router']);

myleetcodetracker.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: '../views/home.html'
        })
        .state('login', {
            url: '/login',
            templateUrl: '../views/login.html'
        })
        .state('signup', {
            url: '/signup',
            templateUrl: '../views/signup.html'
        })
    $urlRouterProvider.otherwise('login')
})

myleetcodetracker.controller("PopupCtrl", ['$scope', '$state', function ($scope, $state) {
    console.log("popup controller initialized");

    $scope.login = function (formData) {
        console.log("formData from login: ", formData);
        chrome.runtime.sendMessage({type: "login", data: formData},
            function (response) {
                console.log("response from background is: ", response);
            }
        )
    }

    $scope.signup = function (formData) {
        console.log("formData from signup: ", formData);
        chrome.runtime.sendMessage({type: "signup", data: formData},
            function (response) {
                console.log("response from background is: ", response);
            }
        )
    }
}])
