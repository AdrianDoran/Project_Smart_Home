var app = angular.module("SmartHome", []);


app.controller("register", function($scope) {
    $scope.details = [];
    $scope.details.push($scope.addMe);
})

app.controller("getuser", function($scope) {
    $scope.details = [];
    $scope.details.push("DATABASE");
    // Authenticate and write out.
})