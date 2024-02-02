app.controller("TrangChuCtrl", function ($scope, $http) {
    $scope.danhSachSanPham = []
    let url = 'http://localhost:3000/sanPham'

    $http({
        method: 'get',
        url
    }).then((response) => {
        $scope.danhSachSanPham = response.data
    })
})