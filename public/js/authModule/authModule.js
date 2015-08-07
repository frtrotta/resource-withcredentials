angular.module("authModule", [])
        .constant("authBaseUrl", "http://localhost:5500/user/")
        .config(function ($httpProvider) {
            $httpProvider.defaults.withCredentials = true;
        })
        ;

/* Francesco Trotta
 * One must bu careful with the configuration of the services.
 * Given that services are singleton, a configuration affects the single instance
 * in the whole application.
 * For this reson a single configuration would be enough for this particolau application
 * to correctly work.
 * Module could be reused in another application, independently. For this reason
 * the configuration in repeated in every module.
 */ 
