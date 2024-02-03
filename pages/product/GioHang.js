app.controller("GioHangCtrl", function ($scope, $http, $routeParams, $rootScope) {
    reset()
    function reset() {
        $scope.danhSachSanPham = []
        $scope.tongTien = 0
        for (idSanPham of $rootScope.cart) {
            $http({
                method: 'get',
                url: 'http://localhost:3000/sanPham/' + idSanPham
            }).then((response) => {
                $scope.danhSachSanPham.push(response.data)
                $scope.tongTien += response.data.price
            })
        }
    }

    $scope.xoa = (id) => {
        let index = $rootScope.cart.indexOf(id)
        $rootScope.cart.splice(index, 1)
        reset()
    }

    $scope.mua = () => {
        if ($rootScope.cart.length == 0) {
            alert("Vui lòng chọn sản phẩm")
            return
        }
        window.location.href = "#!/xacNhanDonHang"
    }
})