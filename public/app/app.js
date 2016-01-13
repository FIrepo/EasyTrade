(function(){
    var myApp = angular.module('myApp', ['kendo.directives']);

    myApp.controller('AllUsersCtrl', function($scope){
        $scope.gridOptions = {
            columns: [
                {field: 'username', title: 'Username'},
                {field: 'email', title: 'Email'},
                {field: 'firstName', title: 'First name'},
                {field: 'lastName', title: 'Last name'},
                {field: 'age', title: 'Age'},
                {field: 'role', title: 'User role'}
            ],
            pageable: true,
            sortable: true,
            dataSource: {
                pageSize: 5,
                transport: {
                    read: '/api/all-users'
                }
            },
            dataBound: function(){
                $('td[role="gridcell"] > span[ng-bind="dataItem.username"]')
                    .each(function(index, item){
                        console.log(item);
                        var content = $(item).html();
                        $(item).html('<a href=\"/profile/' + content + '\">' + content + '</a>')
                    });
            }
        }
    });
}());

