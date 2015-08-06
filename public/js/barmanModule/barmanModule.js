angular.module("barmanModule", ["ngResource"])
        .constant("barmanBaseUrl", "http://localhost:5500/user/")
        .config(
            function($httpProvider) {
                $httpProvider.defaults.withCredentials = true;
            }
        );