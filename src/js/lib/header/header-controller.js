export default (() => {
    return ['$scope', ($scope)=> {



            // 默认进来获取是否有编辑权限
            $scope.isBulletinEditor = false;

            $scope.editorBulletin = ()=>{
                $scope.bulletinDisabled = false;
            };

            $scope.name = 'test';

        }]
})()
