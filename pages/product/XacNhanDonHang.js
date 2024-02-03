app.controller("XacNhanDonHangCtrl", function ($scope, $http, $rootScope) {
    $scope.donHang = {
        "id": (Math.floor(Math.random() * 1000)).toString(),
        "name": "",
        "price": 0,
        "email": "",
        "sdt": "",
        "diaChi": "",
        "cart": $rootScope.cart
    }
    $scope.danhSachSanPham = []
    for (idSanPham of $rootScope.cart) {
        $http({
            method: 'get',
            url: 'http://localhost:3000/sanPham/' + idSanPham
        }).then((response) => {
            $scope.danhSachSanPham.push(response.data)
            $scope.donHang.price += response.data.price
        })
    }

    function reset() {
        $scope.loiTen = ''
        $scope.loiEmail = ''
        $scope.loiSdt = ''
        $scope.loiDiaChi = ''
    }

    $scope.thanhToan = () => {
        reset()
        let err = false
        if ($scope.donHang.name == '' || $scope.donHang.name == undefined) {
            $scope.loiTen = 'Không được trống'
            err = true
        }
        if ($scope.donHang.sdt == '' || $scope.donHang.sdt == undefined) {
            $scope.loiSdt = 'Không được trống'
            err = true
        }
        else {
            if ($scope.donHang.sdt.length < 9 || $scope.donHang.sdt.length > 11 || isNaN($scope.donHang.sdt)) {
                $scope.loiSdt = 'số điện thoại phải từ 9-11 số'
                err = true
            }
        }
        if ($scope.donHang.email == '' || $scope.donHang.email == undefined) {
            $scope.loiEmail = 'Không được trống'
            err = true
        } else {
            let emailRegex = /\w+@\w+(\.\w+)+/i;
            if (!emailRegex.test($scope.donHang.email)) {
                $scope.loiEmail = 'Sai định dạng email'
                err = true
            }
        }
        if ($scope.donHang.diaChi == '' || $scope.donHang.diaChi == undefined) {
            $scope.loiDiaChi = 'Không được trống'
            err = true
        }
        if (!err) {
            $http({
                method: 'post',
                url: "http://localhost:3000/donHang",
                data: $scope.donHang
            }).then((response) => {
                alert("Thanh toán thành công")
            })
        }
    }
})