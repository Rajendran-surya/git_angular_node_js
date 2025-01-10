angular.module('courseApp')
.controller('LoginController', function ($scope, $location, AuthService) {
    $scope.login = function () {

        AuthService.login($scope.credentials)
            .then(function (response) {
                localStorage.setItem('username', $scope.credentials.username);

                localStorage.setItem('token', response.data.token);
                $location.path('/dashboard');
            })
            .catch(function (error) {
                alert('Login failed: ' + error.data.message);
            });
    };
});
