'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.version',
  'storageService'
]);
app.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/view1'});
}]);

app.controller('personController', ['$scope', 'getLocalStorage', function ($scope, getLocalStorage) {    
    $scope.appTitle = "Dejan Demo TASK";       
    //Read the Person List from LocalStorage    
    $scope.persons = getLocalStorage.getPersons();    
    //Count the Person List    
    $scope.count = $scope.persons.length;    

	//$scope.birthDatePerson = new Date($scope.birthdate);
	// Return today's date and time
	//var currentTime = new Date();
	//var birthTime = new Date($scope.birthdate);

	// $scope.monthB = $scope.birthDatePerson.getMonth();
	//+var monthT = currentTime.getMonth();
	//+var test = new Date();
	//test = $scope.person.birthdate;
	//var monthB = $scope.birthdate.getMonth();
	// if ($scope.monthB < $scope.monthT) {

	//Add Person - push to add Person in the Person Object    
    //Call Update Person to update the locally stored Person List 
    $scope.addPerson = function () {    
		var currentTime = new Date();
		var monthT = currentTime.getMonth();
		var birthTime = $scope.birthdate;
		var dayBT = birthTime.getDay();
		alert("Hello "+ $scope.firstname + " " + $scope.lastname + ", you are now registred. " + currentTime + "#### TEST ####" + dayBT +  "########" + birthTime);
		$scope.persons.push({ 'firstname': $scope.firstname, 'lastname': $scope.lastname, 'address': $scope.address, 'birthdate': $scope.birthdate, 'creationdate': currentTime});    
			getLocalStorage.updatePersons($scope.persons);  
			$scope.firstname = '';    
			$scope.lastname = '';    
			$scope.address = '';
			$scope.birthdate = ''; 
			$scope.count = $scope.persons.length; 
    };  

	$scope.fridayGreen = function () {
        
		var birthTime2 = $scope.birthdate;
		var dayBTG = birthTime2.getDay();
		alert("Birthday day: "+ dayBTG + " DAY ENTERED" + birthTime2 + " # " + $scope.birthdate);
	    
       return dayBTG;      
    };
	    
	$scope.color = function () {
        //return ($scope.fridayGreen() < 3) ? 'green' : 'red';
		        return (2 < 3) ? 'green' : 'red';

    };
        
    //Delete Person - "splice" to remove the "per" row from the Person list    
    //All the Update Person to update the locally stored Person List    
    //Count    
    $scope.deletePerson = function (per) {                       
        $scope.persons.splice($scope.persons.indexOf(per), 1);    
        getLocalStorage.updatePersons($scope.persons);    
        $scope.count = $scope.persons.length;    
    };    
}]); 

var storageService = angular.module('storageService', []);  
	storageService.factory('getLocalStorage', function () {                  
    var personList = {};  
    return {  
        list: personList,  
        updatePersons: function (PersonsArr) {  
            if (window.localStorage && PersonsArr) {  
                //Local Storage to add data  
                localStorage.setItem("persons", angular.toJson(PersonsArr));  
            }  
            personList = PersonsArr;  
             
        },  
        getPersons: function () {  
            //Get data from Local Storage  
            personList = angular.fromJson(localStorage.getItem("persons"));                         
            return personList ? personList : [];  
        }  
    };  

}); 