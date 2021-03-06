angular.module("classeModule")
        .controller("classeListCtrl", ["$resource", "classeBaseUrl", "$log", function ($resource, classeBaseUrl, $log) {
                var vm = this;

                vm.classes = null;
                vm.classeToCreate = null;
                vm.deleteClasse = deleteClasse;
                vm.createClasse = createClasse;

                // private members
                var classeResource = $resource(classeBaseUrl + ":id", {id: "@id"});
                listClasses();

                function listClasses() {
                    vm.classes = classeResource.query({role: "classe"});
                    // TODO Promise errore management
                }

                function deleteClasse(classe) {
                    classe.$delete().then(
                            function (data) {
                                vm.classes.splice(vm.classes.indexOf(classe), 1);
                                $log.debug("Classe deleted");
                                $log.debug(data);
                            },
                            function (data) {
                                $log.error("Error in deleting classe");
                                $log.debug(data.data);
                                $log.debug(data.statusText);
                            }
                    );
                }

                function generateRandomPassword() {
                    return "pippo"; // TODO very strong password!
                }

                function createClasse() {

                    var classe = {
                        username: vm.classeToCreate.username,
                        email: vm.classeToCreate.email,
                        role: "classe",
                        password: generateRandomPassword()
                    };

                    new classeResource(classe).$save().then(
                            function (newClasse) {
                                vm.classes.push(newClasse);
                                $log.debug("Classe created");
                                $log.debug(newClasse);
                                vm.classeToCreate = null;
                            },
                            function (data) {
                                $log.error("Error in creating classe");
                                $log.debug(data.data);
                                $log.debug(data.statusText);
                            });
                }
            }]);