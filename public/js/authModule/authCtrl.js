angular.module("authModule")
        .controller("authCtrl", ["$http", "authBaseUrl", "$log", function ($http, authBaseUrl, $log) {
                var vm = this;

                vm.me = null;
                vm.authenticated = false;
                vm.authenticationFailed = false;


                vm.login = login;
                vm.logout = logout;
                
                
                
                function login () {
                    var username = angular.copy(vm.username);
                    var password = angular.copy(vm.password);
                    vm.username = null;
                    vm.password = null;
                    vm.me = null;

                    vm.authenticationFailed = false;
                    
                    $http.post(
                            authBaseUrl + "login",
                            {
                                username: username,
                                password: password
                            }
                    ).then(function (data) {
                            return $http.get(
                                authBaseUrl + "me"
                            )
                        },
                        undefined // the next then will handle errors
                    ).then( function (data) { // Promise chaining
                            vm.authenticated = true;
                            vm.authenticationFailed = false;
                            vm.me = data.data;
                            $log.debug("Successfully authenticated");
                            $log.debug(data);
                    }, function (data) {
                        vm.authenticationFailed = true;
                        $log.debug("Login error");
                        $log.debug(data);
                    });
                }

                function logout () {
                    vm.me = null;
                    $http.post(
                            authBaseUrl + "logout",
                            {},
                            {}
                    ).then(function (data) {
                        vm.authenticated = false;
                        vm.authenticationFailed = false;
                        $log.debug("Successfully logged out");
                    }, function (data) {
                        vm.authenticated = true;
                        vm.authenticationFailed = true;
                        $log.debug("Error in logging out");
                        $log.debug(data);
                    });
                }

            }]);