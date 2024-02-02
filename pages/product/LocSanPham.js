app.controller("LocSanPhamCtrl", function ($scope, $http, $routeParams) {
    $scope.danhSachSanPham = []
    let url = 'http://localhost:3000/sanPham'
    $scope.hang = $routeParams.id

    $http({
        method: 'get',
        url: url,
        params: {
            hang: $scope.hang
        }
    }).then((response) => {
        $scope.danhSachSanPham = response.data
        document.querySelector("#" + $scope.hang).checked = true
    })

    $scope.checkTatCa = () => {
        let cbLoc = document.querySelectorAll("#locHang input")
        let cbTatCa = document.querySelector("#CbTatCaHang")
        for (item of cbLoc) {
            item.checked = cbTatCa.checked
        }
    }
    $scope.checkCombo = () => {
        let cbLoc = document.querySelectorAll("#locHang input")
        let cbTatCa = document.querySelector("#CbTatCaHang")
        for (item of cbLoc) {
            if (item.checked == false) {
                cbTatCa.checked = false
            }
        }
    }

    $scope.loc = () => {
        $scope.danhSachSanPham = []
        if (document.querySelector("#CbTatCaHang").checked) {
            $http({
                method: 'get',
                url: url,
                params: {
                    hang: ""
                }
            }).then((response) => {
                for (sanPham of response.data) {
                    let giaThapNhat = $scope.giaThapNhat
                    let giaCaoNhat = $scope.giaCaoNhat
                    if (giaThapNhat == null) {
                        giaThapNhat = 0
                    }
                    if (sanPham.price >= giaThapNhat) {
                        if (sanPham.price <= giaCaoNhat || giaCaoNhat == null) {
                            $scope.danhSachSanPham.push(sanPham)
                        }
                    }
                }
            })
        }
        else {
            let locHang = document.querySelectorAll("#locHang input")
            for (item of locHang) {
                if (item.checked) {
                    $http({
                        method: 'get',
                        url: url,
                        params: {
                            hang: item.id
                        }
                    }).then((response) => {
                        for (sanPham of response.data) {
                            let giaThapNhat = $scope.giaThapNhat
                            let giaCaoNhat = $scope.giaCaoNhat
                            if (giaThapNhat == null) {
                                giaThapNhat = 0
                            }
                            if (sanPham.price >= giaThapNhat) {
                                if (sanPham.price <= giaCaoNhat || giaCaoNhat == null) {
                                    $scope.danhSachSanPham.push(sanPham)
                                }
                            }
                        }
                    })
                }
            }
        }
    }


    $scope.sapXepCaoDenThap = () => {
        for (let i = 0; i < $scope.danhSachSanPham.length - 1; i++) {
            for (let j = i + 1; j < $scope.danhSachSanPham.length; j++) {
                if ($scope.danhSachSanPham[i].price < $scope.danhSachSanPham[j].price) {
                    let temp = $scope.danhSachSanPham[i];
                    $scope.danhSachSanPham[i] = $scope.danhSachSanPham[j];
                    $scope.danhSachSanPham[j] = temp;
                }
            }
        }
    };
    $scope.sapXepThapDenCao = () => {
        for (let i = 0; i < $scope.danhSachSanPham.length - 1; i++) {
            for (let j = i + 1; j < $scope.danhSachSanPham.length; j++) {
                if ($scope.danhSachSanPham[i].price > $scope.danhSachSanPham[j].price) {
                    let temp = $scope.danhSachSanPham[i];
                    $scope.danhSachSanPham[i] = $scope.danhSachSanPham[j];
                    $scope.danhSachSanPham[j] = temp;
                }
            }
        }
    };


})