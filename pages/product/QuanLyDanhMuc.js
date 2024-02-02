app.controller("QuanLyDanhMucCtrl", function ($scope, $http, $routeParams) {
    $scope.danhSachHang = []
    $scope.hang = {
        id:""
    }
    $http({
        method: 'get',
        url: 'http://localhost:3000/hang'
    }).then((response) => {
        $scope.danhSachHang = response.data
    })

    let idXoa = ''
    $scope.luuIDDelete = (id)=>{
        idXoa = id
    }

    $scope.confirmDelete = ()=>{
        $http({
            method:'delete',
            url: 'http://localhost:3000/hang/'+idXoa
        }).then(()=>{
            alert("Xóa thành công")
        })
        idXoa = ''
    }

    $scope.them = ()=>{
        $http({
            method:'post',
            url: 'http://localhost:3000/hang',
            data: $scope.hang
        }).then(()=>{
            alert("Thêm thành công")
        })
    }
})