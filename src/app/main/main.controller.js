'use strict';

angular.module('orderManagement')
    .controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {

        $scope.itemStatus = ['INITIATED', 'DELIVERED', 'POSSIBLE_DELAY'];

        $scope.orderID = '577af9ffffc1a072';
        var accountNumber = '0000500953';
        var baseURL = 'http://team42-ci.getsandbox.com/';
        var accountQuery = baseURL + 'accounts/' + accountNumber;
        var orderQuery = function () {
            return baseURL + 'locations/' + accountNumber + '/order/' + $scope.orderID;
        }
        var listOrderQuery = baseURL + 'shipments/location/' + accountNumber + '/order/list?offset=0&amount=100';

        $scope.orderTotalItems = function (order) {
            var totalItems = 0;
            $.each(order.shipments, function () {
                totalItems += this.items.length;
            });
            return totalItems;
        }
        $http.get(listOrderQuery).
            success(function (data, status, headers, config) {
                $scope.listOrders = data;

            });

        $scope.getOrderByID = function (orderID) {
            $scope.orderID = orderID;
            $http.get(orderQuery()).
                success(function (data, status, headers, config) {
                    $scope.order = data;
                }).
                error(function (data, status, headers, config) {
                    console.log(data);
                });
        };


        $scope.changeStatus = function (status) {
            console.log("Change Status to " + status);


        }
    }]);
