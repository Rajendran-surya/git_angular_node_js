angular.module('courseApp')
.service('CourseService', function ($http) {

    const API_URL = 'http://localhost:3000/api';

    
    this.getCourses = function (username) {
        console.log(username)
        return $http.get(`${API_URL}/course/getCourseList`, { params: { username: username } });
    };

    this.updateCourse = function(course) {
        return $http.post(`${API_URL}/course/updateCourse`, course);
   
    };
    this.deleteCourse = function(courseId) {

        return $http.delete(`${API_URL}/course/deleteCourse/${courseId}`);
    };


    this.createCourse = function (courseData) {
        console.log(courseData);
        return $http.post(`${API_URL}/course/create`, courseData);
    };

    const API_URL_2 = 'http://localhost:3000/api';


    this.updateimg = function (file) {
     
        var formData = new FormData();
        console.log(file); 
        const username = localStorage.getItem('username');

        formData.append('name', username);
      
        if (file) {
            formData.append('profile_image', file);
        }

        
        return $http.post(`${API_URL_2}/user/uploadprofileimage`, formData, {
            headers: { 'Content-Type': undefined } 
        });
    };


});
