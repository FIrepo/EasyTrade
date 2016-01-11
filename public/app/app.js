"use strict";

let myApp = angular.module('myApp', ['kendo.directives']);

myApp.controller('AllUsersCtrl', function($scope, $http){
    $scope.gridOptions = {
        columns: [
            {field: '_id', title: 'ID'},
            {field: 'username', title: 'Username'},
            {field: 'email', title: 'Email'},
            {field: 'firstName', title: 'First name'},
            {field: 'lastName', title: 'Last name'},
            {field: 'age', title: 'Age'},
            {field: 'role', title: 'User role'},
            {command: ["destroy"], width: '90px'}
        ],
        pageable: true,
        sortable: true,
        editable: true,
        dataSource: {
            pageSize: 5,
            transport: {
                read: '/api/all-users',
                update: '/api/all-users/update',
                destroy: '/api/all-users/delete',
                create: '/api/all-users/create'
            }
        },
        schema: {
            model: {
                id: 'ID',
                fields: {
                    ID: {
                        //this field will not be editable (default value is true)
                        editable: false,
                        // a defaultValue will not be assigned (default value is false)
                        nullable: true
                    },
                    username: {
                        validation: { //set validation rules
                            required: true
                        }
                    },
                    email: {
                        validation: { //set validation rules
                            required: true
                        }
                    },
                    firstName : {
                        validation: { //set validation rules
                            required: false
                        }
                    },
                    lastName: {
                        validation: { //set validation rules
                            required: false
                        }
                    },
                    age: {
                        //data type of the field {Number|String|Boolean} default is String
                        type: "number",
                        // used when new model is created
                        defaultValue: 42,
                        validation: {
                            required: true,
                            min: 16,
                            max: 155
                        }
                    },
                    role: {
                        validation: { //set validation rules
                            required: false
                        }
                    }
                }
            }
        },
        toolbar: ["create", "save", "cancel"]
    }
});

