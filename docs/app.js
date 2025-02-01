angular.module('BundlingwaysBestApp', [])
    .controller('PresetController', function($scope, $http) {
        $scope.year = new Date().getFullYear();
        $scope.lastSortField = null;
        $scope.sortAscending = true;

        $scope.sortBy = function (field) {
            if ($scope.lastSortField === field) {
                $scope.sortAscending = !$scope.sortAscending;
            } else {
                $scope.sortAscending = true;
            }
            $scope.lastSortField = field;

            $scope.presets.sort(function (a, b) {
                if (a[field] < b[field]) {
                    return $scope.sortAscending ? -1 : 1;
                }
                if (a[field] > b[field]) {
                    return $scope.sortAscending ? 1 : -1;
                }
                return 0;
            });
        };

        $scope.replaceSpecialCharacters = function (text) {
            const charMap = {
                '&bull;': '•',
                '&amp;': '&',
                '&lt;': '<',
                '&gt;': '>',
                '&quot;': '"',
                '&apos;': "'"
            };

            return text.replace(/&[a-z]+;/g, function (match) {
                return charMap[match] || match;
            });
        };


        $scope.openInBundlingway = function (url) {
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
