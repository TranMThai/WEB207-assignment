app.controller("DangNhapCtrl", function ($scope, $http, $routeParams) {
    $http({
        method: "get",
        url: 'http://localhost:3000/User'
    }).then((response) => {
        $scope.danhSachUser = response.data
    })

    $scope.user =
    {
        id: "",
        matKhau: "",
        email: ""
    }

    function reset() {
        $scope.err = {
            sdt: "",
            matKhau: ""
        };
    }

    $scope.checkTrong = function (obj, fieldName) {
        if (obj === '') {
            $scope.err[fieldName] = "Không được trống"
            $scope.errDN = true
            return true
        }
        return false;
    };


    $scope.dangNhap = () => {
        reset()
        $scope.errDN = true;
        let foundAcc = {
            id: "",
            matKhau: ""
        };

        if (!$scope.checkTrong($scope.user.id, 'sdt')) {
            if ($scope.user.id.length >= 9 && $scope.user.id.length <= 11 && !isNaN($scope.user.id)) {
                for (user of $scope.danhSachUser) {
                    if (user.id == $scope.user.id) {
                        foundAcc = user
                    }
                }
            }
            else {
                $scope.err['sdt'] = 'Số điện thoại phải từ 9-11 số'
                $scope.errDN = true
            }
        }

        if (!$scope.checkTrong($scope.user.matKhau, 'matKhau')) {
            if ($scope.user.matKhau.length < 5) {
                $scope.err['matKhau'] = 'Tối thiểu phải 5 kí tự trở lên'
                $scope.errDN = true
            } else {
                if (foundAcc != null) {
                    if ($scope.user.matKhau == foundAcc.matKhau) {
                        $scope.errDN = false
                    }
                }
            }
        }

        if (!$scope.errDN) {
            window.location.href = "#!/trangChu/"+foundAcc.id;
        }
        else {
            alert("Đăng nhập không thành công")
        }

    }
})