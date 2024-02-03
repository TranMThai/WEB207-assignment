app.controller("QuanLySanPhamCtrl", function ($scope, $http) {
    let url = 'http://localhost:3000/sanPham'
    $scope.danhSachSanPham = []

    $scope.thongTin = {
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
        pin: "",
        hang: ""
    }

    $http({
        method: 'get',
        url
    }).then((response) => {
        $scope.danhSachSanPham = response.data
    })



    $scope.reset = () => {
        $scope.thongTin = {
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
            pin: "",
            hang: ""
        }
    }

    $scope.xemChiTiet = (id) => {
        $http({
            method: 'get',
            url: url + "/" + id
        }).then((response) => {
            $scope.thongTin = response.data
        })
    }

    $scope.sua = () => {
        $http({
            method: 'put',
            url: url + "/" + $scope.thongTin.id,
            data: $scope.thongTin
        }).then((response) => {
            alert("sửa thành công")
        })
    }



    let idDelete = ''

    $scope.xoa = (id) => {
        idDelete = id
    }

    $scope.confirmDelete = () => {
        $http({
            method: 'delete',
            url: url + "/" + idDelete
        }).then((response) => {
            alert("Xóa thành công")
        })
    }


    $scope.them = () => {
        $http({
            method: 'post',
            url: url,
            data: $scope.thongTin
        }).then((response) => {
            console.log($scope.thongTin)
            alert("Thêm thành công")
        })
    }



})