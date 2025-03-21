angular.module('BundlingwaysEmporiumApp', ["ngSanitize"])
    .controller('PresetController', function ($scope, $http, $location) {
        $scope.selectedId = null;
        $scope.year = new Date().getFullYear();
        $scope.lastSortField = null;
        $scope.sortAscending = true;
        $scope.searchText = $location.search().q || '';

        $scope.UI = {
            selectedId : null
        };

        $scope.$watch('searchText', function (newVal) { $location.search('q', newVal); });

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

        $scope.openInBundlingway = function (url) {
            console.log(url);
            window.location.replace(url);
        }

        $scope.urlEncode = function (str) {
            return encodeURIComponent(str);
        };

        $http.get('https://www.sightsofeorzea.com/api/data/presetCollection?sort=-PackageType')
            .then(function (response) {
                $scope.presets = response.data;
            })
            .catch(function (error) {
                console.error('Error loading presets:', error);
                $scope.presets = [
                    {
                        "name": "Error loading presets",
                        "author": "Bundlingway",
                        "instructions": "Please check the console for more information, and that presets.json is present and has the right content."
                    }
                ]
            });
    })
    .filter('prettyFormat', function () {
        return function (text) {
            text = text.replace(/\n/g, '<br/>');
            return text;
        };
    });
