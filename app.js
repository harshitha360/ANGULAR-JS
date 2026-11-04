var app=angular.module('myApp',[]);
app.controller('collegeController', function($scope) {
   $scope.collegename="abc college";
});
app.controller('studentController', function($scope) 
{
   $scope.studentname="jhon";
   $scope.department="cse";
$scope.semester="3rd semester";
$scope.students=[
   "harshi",
   "hanvi",
   "panvith",
   "prisha",
   
];
}
);
