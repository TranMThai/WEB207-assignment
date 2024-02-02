app.controller("QuanLySanPhamCtrl", function ($scope, $http) {
    let url = 'http://localhost:3000/sanPham'
    $scope.danhSachSanPham = []

    $http({
        method: 'get',
        url
    }).then((response) => {
        $scope.danhSachSanPham = response.data
    })


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
        pin: ""
    }

    function reset() {
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
            pin: ""
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

    let idDelete = ''

    $scope.xoa = (id)=>{
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
            alert("Thêm thành công")
        })
    }

    

})