export default (() => {
    return ['$scope', '$location', '$state', 'Ajax', '$rootScope',
        ($scope, $location, $state, Ajax, $rootScope) => {
            const navAjaxUrl = {
                menuList: '/midas/kepler/ajax/menuList'
            };
            let menus = false;
            const urlChange = (menuList, jump) => {
                let isUrl = true;
                let menusI = -1;
                angular.forEach(menuList, (item, i) => {
                    let a = document.createElement('a');
                    a.href = item.url;
                    let hrefHash = a.hash.split('#').slice(1).join('');
                    // 获取hash值 确保 只留下第一个 / 后面的第一个值 用在页面的选中上
                    let hash = hrefHash.split('?')[0].split('/').slice(1)[0];
                    // 因为这个hash值是没有 /的 所以加上 切换页面用到
                    item.hash = '/' + hash;
                    // 这里判断一下 是不是等于首页或者 产品分析页面,因为没有迁移 所以需要用url来跳转其他不需要
                    let search = hrefHash.split('?')[1].split('&');
                    let searchObj = {};
                    search.forEach((it) => {
                        let split = it.split('=');
                        searchObj[split[0]] = split[1]
                    });
                    // 控制如果当前的一级菜单下有二级菜单 那么去查找二级菜单是否有 如果没有 一级菜单不显示
                    item.hide = searchObj.secondary && JSON.parse(searchObj.secondary) === 1 && item.menus.length === 0;
                    // 确定当前在哪个页面上 并且选中
                    item.isOpen = false;
                    item.menuActive = hash === $location.$$path.split('/')[1];

                    if (item.menuActive && item.menus.length > 0) {
                        menus = true;
                        menusI = i;
                        item.isOpen = true
                        // isChange && ()
                    }
                    // 确定当前的icon 是什么 一级菜单
                    item.indexIcon = 'icon-' + searchObj.i;
                    // 在window文件下创建 hash对象 去寻找全局需要执行的方法。

                    // 这里判断权限, 如果导航里没有传过来js已有的页面,那么如果用户用url输入的话会返回刚刚进入的页面
                    if (hash === $location.$$path.split('/')[1]) {
                        isUrl = false;
                        // 如果有二级菜单,并且只输入了一个一级菜单的权限,那么指定一个二级菜单的链接并且进去
                        if (item.menus.length > 0 && !$location.$$path.split('/')[2]) {
                            $state.go(item.menus[0].url.split('#')[1].split('?')[0]);
                        }
                    }

                    if (item.menus.length > 0) {
                        angular.forEach(item.menus, (menu, k) => {
                            let link = document.createElement('a');
                            let obj = {};
                            link.href = menu.url;
                            menu.hash = link.hash.split('#')[1].split('?')[0];
                            let search = link.hash.split('#').slice(1).join('').split('?').slice(1).join('').split('&');
                            search.forEach((it) => {
                                let split = it.split('=');
                                obj[split[0]] = split[1]
                            });
                            menu.subHide = obj.hide;
                            menu.search = obj;
                            // 确定一下当前的icon
                            menu.subIndexIcon = 'icon-' + obj.i;
                            // 二级菜单的选中状态
                            let subHash = menu.hash.split('/');
                            let subPath = $location.$$path.split('/');
                            // 查看当前的url和二级菜单的url是否匹配
                            if ($location.$$path.split('/')[2] === menu.hash.split('/')[2]) {
                                // 在查看当前的二级菜单里是否有三级菜单 如果有，并且url上没有写三级菜单，那么做跳转
                                if (menu.hash.split('/')[3] && !$location.$$path.split('/')[3]) {
                                    $state.go(menu.hash)
                                }
                            }

                            menu.subMenuActive = item.menuActive && menu.hash === $location.$$path || subHash[1] === subPath[1] && subHash[2] === subPath[2];
                        })
                    }

                });
                if (menus) {
                    $scope.activePanels = menusI;
                } else {
                    $scope.activePanels = [];
                }


                // 如果当前访问的hash是无效的 那么就重新定位页面
                isUrl && (location.href = location.origin + location.pathname + '#' + menuList[0].url.split('#')[1].split('?')[0]);

                $scope.listClick = (target, event) => {

                    if ($scope.activePanels !== target.$index && $scope.activePanels !== -1) {
                        menuList[$scope.activePanels].isOpen = $scope.activePanels === target.$index;
                    }
                    if(!menuList[target.$index].isOpen){
                        window.angular.forEach(menuList,(item)=>{
                            item.isOpen = false;
                        });
                    }

                    menuList[target.$index].isOpen = !menuList[target.$index].isOpen;

                    if (menuList[target.$index].menus.length === 0) {
                        $state.go(menuList[target.$index].hash);
                    } else {
                        if (target.$index === 0) {
                            $state.go(menuList[target.$index].menus[0].hash);
                        }
                    }

                };

                $scope.subTitleBtn = (target, $event) => {
                    let hash = menuList[target.$parent.$index].menus[target.$index].hash;
                    let parameter = menuList[target.$parent.$index].menus[target.$index].search;
                    $state.go(hash, parameter);
                };
            };
            Ajax('GET', navAjaxUrl.menuList, {}).then(
                (data) => {
                    $scope.menuList = data.msg.menuList;
                    // 第一次跳转页面
                    let menuList = data.msg.menuList;
                    let a = document.createElement('a');
                    a.href = menuList[0].menus.length > 0 ? menuList[0].menus[0].url : menuList[0].url;
                    let hrefHash = a.hash.split('#').slice(1).join('');
                    urlChange(data.msg.menuList, hrefHash.split('?')[0]);
                    $rootScope.$on('$locationChangeSuccess', () => {
                        menus = false;
                        urlChange(data.msg.menuList, hrefHash.split('?')[0]);
                    });
                }
            );
        }]
})()
