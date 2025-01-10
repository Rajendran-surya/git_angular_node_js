angular.module('courseApp')
.controller('SignupController', function ($scope, $location, AuthService) {

    $scope.signup = function () {
        const formData = new FormData();

      
        formData.append('name', $scope.user.name);
        formData.append('email', $scope.user.email);
        formData.append('password', $scope.user.password);
        formData.append('latitude', $scope.user.latitude);
        formData.append('longitude', $scope.user.longitude);
        

        // Ensure the file is selected before submission
        // if ($scope.profileImage) {
        //     formData.append('profile_image', $scope.profileImage);
        // } else {
        //     alert("Please select an image.");
        //     return;
        // }

        
        AuthService.signup($scope.user,$scope.file)
            .then(function (response) {
                alert('Signup successful');
                $location.path('/login');
            })
            .catch(function (error) {
                alert('Signup failed: ' + error.data.message);
            });
    };

    // Handle file selection for profile image
    // $scope.handleFileSelect = function (event) {
    //     // Set the selected file to the profileImage scope variable
    //     $scope.profileImage = event.target.files[0];

    //     // Optionally, log the selected file for debugging
    //     console.log($scope.profileImage);
    // };

    $scope.UploadTask = function () {

        const fileInput = document.getElementById('fileinput');
        // fileInput.click();
        fileInput.onchange = function() {
            const file = fileInput.files[0];
           $scope.file = file;
console.log($scope.file);
           
        }
    }
});
