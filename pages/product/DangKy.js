app.controller("DangKyCtrl", function ($scope, $http) {
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
            email: "",
            matKhau: "",
            nhapLaiMatKhau: ""
        };
    }

    $scope.checkTrong = function (obj, fieldName) {
        if (obj === '' || obj == undefined) {
            $scope.err[fieldName] = "Không được trống"
            $scope.errDK = true
            return true
        }
        return false;
    };


    $scope.dangKy = () => {
        reset()

        $scope.errDK = false;

        if (!$scope.checkTrong($scope.user.id, 'sdt')) {
            if ($scope.user.id.length >= 9 && $scope.user.id.length <= 11 && !isNaN($scope.user.id)) {
                for (user of $scope.danhSachUser) {
                    if (user.id == $scope.user.id) {
                        $scope.err['sdt'] = 'Số điện thoại đã tồn tại'
                        $scope.errDK = true
                    }
                }
            }
            else {
                $scope.err['sdt'] = 'Số điện thoại phải từ 9-11 số'
                $scope.errDK = true
            }
        }

        if (!$scope.checkTrong($scope.user.email, 'email')) {
            let emailRegex = /\w+@\w+(\.\w+)+/i;
            if (!emailRegex.test($scope.user.email)) {
                $scope.err['email'] = 'Sai định dạng email'
                $scope.errDK = true
            }
        }

        if (!$scope.checkTrong($scope.user.matKhau, 'matKhau')) {
            if ($scope.user.matKhau.length < 5) {
                $scope.err['matKhau'] = 'Tối thiểu phải 5 kí tự trở lên'
                $scope.errDK = true
            }
        }

        if (!$scope.checkTrong($scope.nhapLaiMatKhau, 'nhapLaiMatKhau')) {
            if ($scope.nhapLaiMatKhau != $scope.user.matKhau) {
                $scope.err['nhapLaiMatKhau'] = 'Mật khẩu không trùng khớp'
                $scope.errDK = true
            }
        }

        if (!$scope.errDK) {
            $http({
                method: 'post',
                url: 'http://localhost:3000/User',
                data: $scope.user
            }).then(() => {
                alert("Đăng ký thành công")
            })
        }

    }
})