'use strict';

angular.module('orderManagement')
    .controller('MainCtrl', ['$scope', '$http','$timeout', function ($scope, $http, $timeout) {

        $scope.endPoints = ['http://team42-ci.getsandbox.com/', '', ''];
        $scope.accounts = ['0000500953'];
        $scope.itemStatus = ['INITIATED', 'DELIVERED', 'POSSIBLE_DELAY'];
        $scope.showItemJson = [];
        $scope.showOrderJson = [];
        $scope.updateItemStatus = [];
        $scope.showSummary = 1;

        $scope.orderID = '577af9ffffc1a072';
        $scope.accountNumber = '0000500953';
        $scope.baseURL = 'http://team42-ci.getsandbox.com/';
        var accountQuery = function () {
            return  $scope.baseURL + 'accounts/' + $scope.accountNumber;
        };
        var orderQuery = function () {
            return $scope.baseURL + 'locations/' + $scope.accountNumber + '/order/' + $scope.orderID;
        };
        var listOrderQuery = function () {
            return $scope.baseURL + 'shipments/location/' + $scope.accountNumber + '/order/list?offset=0&amount=100';
        };

        $scope.orderTotalItems = function (order) {
            var totalItems = 0;
            angular.forEach(order.shipments, function (shipment) {
                totalItems += shipment.items.length;
            });
            return totalItems;
        };

        $scope.refreshList = function () {
            $http.get(listOrderQuery()).
                success(function (data, status, headers, config) {
                    $scope.listOrders = data;
                });
            $http.get(accountQuery()).
                success(function (data, status, headers, config) {
                    console.log(data);
                });
        };


        $scope.getOrderByID = function (orderID) {
            $scope.orderID = orderID;
            $http.get(orderQuery()).
                success(function (data) {
                    $scope.order = data;
                });
        };


        $scope.changeStatus = function (item) {
            $scope.updateItemStatus[item.item_id] = '';
            $http.get(orderQuery())
                .success(function (data) {
                    $scope.updateItemStatus[item.item_id] = 'Update OK';
                    $timeout(function() {
                        $scope.updateItemStatus[item.item_id] = '';
                    }, 3000);
                })
                .error(function () {
                    $scope.updateItemStatus[item.item_id] = 'Update Failed';
                });
        };
    }]);
