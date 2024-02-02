app.controller("ChiTietSanPhamCtrl", function ($scope, $http, $routeParams) {
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


})