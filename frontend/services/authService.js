angular.module('courseApp')
.service('AuthService', function ($http) {

    const API_URL = 'http://localhost:3000/api';


    this.signup = function (userData,file) {
     
        var formData = new FormData();
        console.log(file); 


        formData.append('name', userData.name);
        formData.append('email', userData.email);
        formData.append('password', userData.password);
        formData.append('latitude', userData.latitude);
        formData.append('longitude', userData.longitude);


        if (file) {
            formData.append('profile_image', file);
        }

        
        return $http.post(`${API_URL}/user/signup`, formData, {
            headers: { 'Content-Type': undefined } 
        });
    };


    this.login = function (credentials) {
        console.log(credentials);
        return $http.post(`${API_URL}/user/login`, credentials); 
    };
});
