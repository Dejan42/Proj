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

	//Add Person - push to add Person in the Person Object    
    //Call Update Person to update the locally stored Person List 
	//Callculate age and push or not to push...
    $scope.addPerson = function () {    
		var currentTime = new Date();
		var monthT = currentTime.getMonth();
		var birthTime = $scope.birthdate;
		var dayBT = birthTime.getDay();
		
		var ageDifMs = Date.now() - birthTime.getTime();
		var ageDate = new Date(ageDifMs); // miliseconds 
		var age = Math.abs(ageDate.getUTCFullYear() - 1970);
		
		if (age > 20) {
		$scope.persons.push({ 'firstname': $scope.firstname, 'lastname': $scope.lastname, 'address': $scope.address, 'birthdate': $scope.birthdate, 'creationdate': currentTime});    
			getLocalStorage.updatePersons($scope.persons);  
			alert("Hello "+ $scope.firstname + " " + $scope.lastname + ", you are now registred.");
			$scope.firstname = '';    
			$scope.lastname = '';    
			$scope.address = '';
			$scope.birthdate = ''; 
			$scope.count = $scope.persons.length; 
			}			
		else {
			alert("Hello "+ $scope.firstname + " " + $scope.lastname + ", you are NOT registred; You are ONLY " + age + " and can't even order alcohol in the USA. ");
			$scope.firstname = '';    
			$scope.lastname = '';    
			$scope.address = '';
			$scope.birthdate = ''; 		
		};
		
    };  

	$scope.fridayGreen = function () {
        
		var birthTime2 = $scope.birthdate;
		var dayBTG = birthTime2.getDay();
		alert("Birthday day on: "+ dayBTG + " (day in a week)");
	    
       return dayBTG;      
    };
	    
	$scope.$watch('birthdate', function (currScope, newVal, oldVal) {
		var birthTime3 = $scope.birthdate;
		var dayBT = birthTime3.getDay();
		//alert(dayBT + 'changed' + birthTime3);
		if (dayBT === 5) {
		$scope.col = 'green';
		}			
		else {
		$scope.col = 'white';
		};
    });
        
    //Delete Person - "splice" to remove the "per" row from the Person list    
    //All the Update Person to update the locally stored Person List    
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