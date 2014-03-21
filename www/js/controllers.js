angular.module('starter.controllers', [])


// A simple controller that fetches a list of data from a service
.controller('PetIndexCtrl', function($scope, PetService, DeviceService) {
  // "Pets" is a service returning mock data (services.js)
  //$scope.pets = PetService.all();

  $scope.pets = DeviceService;
})


// A simple controller that shows a tapped item's data
.controller('PetDetailCtrl', function($scope, $stateParams, $firebase, fbURL) {
    var url = fbURL + $stateParams.petId;
        var ref = new Firebase(url);
        $scope.pet = $firebase(ref);

    $scope.ring = function() {
        ref.update({speak: "I'm here."});
//        $scope.pet.$save();
//        $location.path('/');
    };
    // "Pets" is a service returning mock data (services.js)
    //$scope.pet = PetService.get($stateParams.petId);
});
