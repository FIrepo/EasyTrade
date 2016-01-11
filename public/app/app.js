"use strict";

let myApp = angular.module('myApp', ['kendo.directives']);

myApp.controller('AllUsersCtrl', function($scope, $http){
    $scope.gridOptions = {
        columns: [
            {field: "username", title: 'Username'},
            {field: "email", title: 'Email'},
            {field: "firstName", title: 'First name'},
            {field: "lastName", title: 'Last name'},
            {field: "age", title: 'Age'},
            {field: "role", title: 'User role'},
        ],
        pageable: true,
        sortable: true,
        dataSource: {
            pageSize: 5,
            transport: {
                read: function (e) {
                    $.get('/api/all-users', function(data){
                        console.log(data);
                        e.success(JSON.parse(data));
                    }).fail(function(err){
                        console.log(err);
                    })
                }
            }
        }
    }
});

