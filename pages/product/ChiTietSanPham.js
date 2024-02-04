app.controller("ChiTietSanPhamCtrl", function ($scope, $http, $routeParams, $rootScope) {
    let url = 'http://localhost:3000/sanPham'
    $scope.SanPham = {
        id: "",
        name: "",
        anh: "",
        price: 0,
        manHinh: "",
        cameraSau: "",
        cameraTruoc: "",
        RAM: "",
        ROM: "",
        CPU: "",
        GPU: "",
        pin: ""
    }

    $http({
        method: 'get',
        url: url + "/" + $routeParams.id
    }).then((response) => {
        $scope.SanPham = response.data
    })

    $scope.addToCart = function () {
        $rootScope.cart.push($routeParams.id)
    }

    $scope.muaNgay = () => {
        $rootScope.cart = []
        $rootScope.cart.push($routeParams.id)
    }

})