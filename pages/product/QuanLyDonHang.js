app.controller("QuanLyDonHangCtrl", function ($scope, $http, $routeParams) {
    $scope.danhSachDonHang = []
    $http({
        method: 'get',
        url: 'http://localhost:3000/donHang'
    }).then((response) => {
        $scope.danhSachDonHang = response.data
    })

    $scope.xem = (id) => {
        console.log(id)
        $http({
            method: 'get',
            url: 'http://localhost:3000/donHang/' + id
        }).then((response) => {
            $scope.thongTin = response.data
            $scope.danhSachSanPham = []
            for (sanPham of $scope.thongTin.cart) {
                $http({
                    method: 'get',
                    url: 'http://localhost:3000/sanPham/' + sanPham
                }).then((response) => {
                    $scope.danhSachSanPham.push(response.data)
                })
            }
        })
    }



    $scope.sua = (id) => {
        let thongtin = {
            id: $scope.thongTin.id,
            price: $scope.thongTin.price,
            name: $scope.thongTin.name,
            email: $scope.thongTin.email,
            sdt: $scope.thongTin.sdt,
            diaChi: $scope.thongTin.diaChi,
            cart: $scope.thongTin.cart,
            trangThai: $scope.thongTin.trangThai,
        }
        $http({
            method: 'put',
            url: 'http://localhost:3000/donHang/' + id,
            data: thongtin
        }).then((response) => {
            alert("Sửa thành công")
        })
    }

    $scope.xacNhanThanhToan = (bool)=>{
        $scope.thongTin.trangThai = bool
    }
})