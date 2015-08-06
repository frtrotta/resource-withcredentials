angular.module("classeModule", ["ngResource"])
        .constant("classeBaseUrl", "http://localhost:5500/classe/")
        .config(
            function($httpProvider) {
                $httpProvider.defaults.withCredentials = true;
            }
        );

// FT class cannot be user because it conflicts with the JavaScript keyword