
angular.module('login', [])
.controller('loginController', ['$scope', function($scope) {
  $scope.user = {name: 'username', password: 'password'};
  $scope.authenticated = false;
  $scope.authenticate = function() {
      $scope.post("localhost:5000/api/authenticate", $scope.user)
      console.log("Request sent...")
      .then(request => {
          console.log(request);
          if(request.success)
          {
              $scope.authenticated = true;
              var userDetails = $scope.user;
              // Add to local storage.
          }
      }
      ).catch("Error");
  }
}]);