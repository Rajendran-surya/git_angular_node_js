angular.module('courseApp')
.controller('DashboardController', function ($scope,  $location,CourseService) {
    $scope.getCourses = function () {
        console.log("hi");
     
         
            const username = localStorage.getItem('username');
           

            if (!username) {
                console.error('Username is not available in localStorage');
            } else {
               
                CourseService.getCourses(username)
                    .then(function (response) {
                        $scope.courses = response.data.courses;
                        $scope.users = response.data.user;
                        console.log($scope.users);
                    })
                    .catch(function (error) {
                        alert('Failed to load courses: ' + error.data.message);
                    });
            }

     
    };

    $scope.createCourse = function () {
        CourseService.createCourse($scope.course)
            .then(function () {
                alert('Course created successfully');
                $scope.getCourses();
            })
            .catch(function (error) {
                alert('Failed to create course: ' + error.data.message);
            });
    };
    $scope.Uploadimage = function () {

        const fileInput = document.getElementById('fileinput');
        // fileInput.click();
        fileInput.onchange = function() {
            const file = fileInput.files[0];
           $scope.file = file;
console.log($scope.file);
if($scope.file){
    CourseService.updateimg($scope.file)
.then(function(response) {
    alert('Image updated successfully!');
    $scope.getCourses();
})
.catch(function(error) {
    alert('Failed to update image: ' + error.data.message);
});
}

        }
       
    }
    $scope.updateCourse = function(course) {
        CourseService.updateCourse(course)
            .then(function(response) {
                alert('Course updated successfully!');
                $scope.getCourses();
            })
            .catch(function(error) {
                alert('Failed to update course: ' + error.data.message);
            });
    };
    $scope.deleteCourse = function(courseId) {
        if (confirm('Are you sure you want to delete this course?')) {
            CourseService.deleteCourse(courseId)
                .then(function(response) {
                 
                    $scope.courses = $scope.courses.filter(course => course.id !== courseId);
                    alert('Course deleted successfully!');
                    $scope.getCourses();
                })
                .catch(function(error) {
                    alert('Failed to delete course: ' + error.data.message);
                });
        }
    };
    
    $scope.signOut = function () {
    
        localStorage.removeItem('username');
        $location.path('/login');
    }
    
    $scope.getCourses();
});
