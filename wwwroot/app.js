angular.module('BundlingwaysBestApp', [])
    .controller('PresetController', function($scope, $http) {
        $scope.year = new Date().getFullYear();

        $scope.openInBundlingway = function(url){
            window.location.replace(url);
        }

        $http.get('https://www.sightsofeorzea.com/api/data/presetCollection?sort=-PackageUrl')
            .then(function(response) {
                $scope.presets = response.data;
            })
            .catch(function(error) {
                console.error('Error loading presets:', error);
                $scope.presets = [
                    {
                        "name": "Error loading presets",
                        "author": "Bundlingway",
                        "instructions": "Please check the console for more information, and that presets.json is present and has the right content."
                    }
                ]
            });
    });
