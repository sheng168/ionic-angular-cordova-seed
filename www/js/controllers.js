angular.module('starter.controllers', [])

// A simple controller that fetches a list of data from a service
.controller('AuthCtrl', function($scope, $rootScope, DeviceService) {
    // "Pets" is a service returning mock data (services.js)
    //$scope.pets = PetService.all();

    var user = $rootScope.currentUser;
    if (user) {
        $scope.user = {username: user.get('username')};
    }
})

// A simple controller that fetches a list of data from a service
.controller('PetIndexCtrl', function($scope, DeviceService, $firebase, fbURL, $rootScope) {
  // "Pets" is a service returning mock data (services.js)
  //$scope.pets = PetService.all();
    var userId = 'userIdNone';
        var user = $rootScope.currentUser;

        if (user) {
            userId = user.id;
        }

        var url = fbURL;
        url = url.replace(/userId/g, userId);

        var ref = new Firebase(url);
        $scope.pets = $firebase(ref);

//  $scope.pets = DeviceService;
})


// A simple controller that shows a tapped item's data
.controller('PetDetailCtrl', function($scope, $stateParams, $firebase, fbURL, $rootScope) {
        var userId = 'userIdNone';
        var user = $rootScope.currentUser;

        if (user) {
            userId = user.id;
        }

        var url = fbURL;
        url = url.replace(/userId/g, userId);

        url = url + $stateParams.petId;
        var ref = new Firebase(url);
        $scope.pet = $firebase(ref);

    $scope.ring = function() {
        ref.update({speak: "I'm here."});
//        $scope.pet.$save();
//        $location.path('/');
    };

        $scope.map = {
            marker: {
                latitude: 40,
                longitude: -73,
                radius: 21
            },
            center: {
                latitude: 40,
                longitude: -73
            },
            zoom: 17
        };

        $scope.pet.$on('loaded', function(ref) {
            $scope.map.center = angular.copy($scope.pet.location);
            $scope.map.marker = $scope.pet.location;
            $scope.$apply();
        });

        $scope.pet.$on('change', function(ref) {
            $scope.map.marker = $scope.pet.location;
            $scope.$apply();
        });

        // "Pets" is a service returning mock data (services.js)
    //$scope.pet = PetService.get($stateParams.petId);
});
