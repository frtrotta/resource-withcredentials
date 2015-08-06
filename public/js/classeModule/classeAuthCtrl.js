angular.module("classeModule")
        .controller("classeAuthCtrl", ["$http", "classeBaseUrl", "$log", function ($http, classeBaseUrl, $log) {
                var vm = this;

                vm.authenticated = false;
                vm.authenticationFailed = false;


                vm.login = function (){
                    var username = angular.copy(vm.username);
                    var password = angular.copy(vm.password);
                    vm.username = null;
                    vm.password = null;

                    vm.authenticatioFailed = false;
                    $http.post(
                            classeBaseUrl + "login",
                            {
                                username: username,
                                password: password
                            },
                    {
                        withCredentials: true
                    }
                    ).then(function (data) {
                        vm.authenticated = true;
                        vm.authenticationFailed = false;
                        $log.debug("Successfully authenticated");
                    }, function (data) {
                        vm.authenticationFailed = true;
                        $log.debug("Login error");
                        $log.debug(data);
                    });
                }

                vm.logout = function () {
                    $http.post(
                            classeBaseUrl + "logout",
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

                function resetForm(form) {
                    if (form) {
                        // TODO controllare perchè non reimposta i campi
                        // https://docs.angularjs.org/guide/forms
                        form.$setPristine();
                        form.$setUntouched();
                    }
                }

            }]);