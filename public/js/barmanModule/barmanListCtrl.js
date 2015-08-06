angular.module("barmanModule")
        .controller("barmanListCtrl", ["$resource", "barmanBaseUrl", "$log", function($resource, barmanBaseUrl, $log){
                var vm = this;
                
                vm.barmen = null;
                vm.barmanToCreate = null;
                vm.deleteBarman = deleteBarman;
                vm.createBarman = createBarman;
                
                // private members
                var barmanResource = $resource(barmanBaseUrl + ":id", {id: "@id"});
                listBarmen();
                
                function listBarmen() {
                    vm.barmen = barmanResource.query({role: "barman"});
                    // TODO Promise errore management
                }
                
                function deleteBarman(barman) {
                    barman.$delete().then(
                            function(data) {
                                vm.barmen.splice(vm.barmen.indexOf(barman), 1);
                                $log.debug("Barman deleted");
                                $log.debug(data);
                            },
                            function(data) {
                                $log.error("Error in deleting barman");
                                $log.debug(data.data);
                                $log.debug(data.statusText);
                            }
                            );
                }
                
                function generateRandomPassword() {
                    return "pippo"; // TODO very strong password!
                }
                
                function createBarman() {
                    
                    var barman = {
                        username: vm.barmanToCreate.username, 
                        email: vm.barmanToCreate.email,
                        role: "barman",
                        password: generateRandomPassword()
                    };
                    
                    $log.log(barman);
                  
                    new barmanResource(barman).$save().then(
                            function(newBarman) {
                                vm.barmen.push(newBarman);
                                $log.debug("Barman created");
                                $log.debug(newBarman);
                                vm.barmanToCreate = null;
                            },
                            function(data) {
                                $log.error("Error in creating barman");
                                $log.debug(data.data);
                                $log.debug(data.statusText);
                            });
                }
        }]);