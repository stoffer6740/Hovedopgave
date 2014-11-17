/**
 * Created by Christoffer on 17-11-2014.
 */
app.controller('test', function ($scope, $mdSidenav) {
    $scope.title1 = 'Button';
    $scope.title4 = 'Warn';
    $scope.isDisabled = true;
    $scope.test = 'test';

    $scope.googleUrl = 'http://google.com';

    $scope.leftMenu = function() {
        $mdSidenav('left').toggle();
    };
});


app.controller('test2', function ($scope) {
    $scope.test = "Hej";
});

app.controller('ListCtrl', function ($scope) {
    $scope.items = [
        {
            face : '/img/list/60.jpeg',
            what: 'Brunch this weekend?',
            who: 'Min Li Chan',
            when: '3:08PM',
            notes: " I'll be in your neighborhood doing errands"
        },
        {
            face : '/img/list/60.jpeg',
            what: 'Brunch this weekend?',
            who: 'Min Li Chan',
            when: '3:08PM',
            notes: " I'll be in your neighborhood doing errands"
        },
        {
            face : '/img/list/60.jpeg',
            what: 'Brunch this weekend?',
            who: 'Min Li Chan',
            when: '3:08PM',
            notes: " I'll be in your neighborhood doing errands"
        },
        {
            face : '/img/list/60.jpeg',
            what: 'Brunch this weekend?',
            who: 'Min Li Chan',
            when: '3:08PM',
            notes: " I'll be in your neighborhood doing errands"
        },
        {
            face : '/img/list/60.jpeg',
            what: 'Brunch this weekend?',
            who: 'Min Li Chan',
            when: '3:08PM',
            notes: " I'll be in your neighborhood doing errands"
        },
    ];
});

app.controller('GetArticlesCtrl', ['getArticleByIdSrvc', '$scope', '$http', function(getArticleByIdSrvc, $scope, $http){
    //$scope.pageTitle = $scope.translation.articlePage;
    console.log("getArticles");

    $scope.GetOneArticle = function (id) {
        getArticleByIdSrvc.setId(id);
        navigation.pushPage('template_view/_viewArticle.html', {animation: 'slide'});
    };

    //$scope.getResults = function (num) {
        var encSql = encode_sql(GETALLARTICLESSQL);
        $http({url      : 'http://' + API_URL + API_REQUEST,
            method   : 'GET',
            params   : {'sql':encSql}
        })
            .success(function(data, status, headers, config){
                var unsorted = [];
                $scope.images = [];
                angular.forEach(data.result, function (value) {
                    var url     = value.link.replace(REGEX_LINK, "");
                    var option  = getUrlParameter(url, 'option');
                    var id      = getUrlParameter(url, 'id');

                    getArticleFromMenu($scope, $http, id, unsorted);
                });
            })
            .error(function(data, status, headers, config) {

            })
            .finally(function(){

            });
    //}
}]);

function getArticleFromMenu ($scope, $http, id, unsorted) {
    var encSql = encode_sql(GETARTICLEBYIDSQL + id);
    $http({url: 'http://' + API_URL + API_REQUEST,
        method: 'GET',
        params: {'sql':encSql}
    })
        .success(function(data, status, headers, config){
            var img = 'http://' + API_URL + '/' + JSON.parse(data.result[0].images).image_intro;
            if(!JSON.parse(data.result[0].images).image_intro) {
                $scope.images.push({
                    'id'     : id,
                    'image'  : ""
                });
            }else {
                $scope.images.push({
                    'id'     : id,
                    'image'  : img
                });
            }

            unsorted.push(data.result[0]);
            unsorted.sort(function(a, b) {
                if (a.id > b.id) {
                    return 1;
                }
                if (a.id < b.id) {
                    return -1;
                }
                return 0;
            });
            $scope.result = unsorted;
        })
        .error(function(data, status, headers, config) {

        })
        .finally(function(){

        });
}

app.service('getArticleByIdSrvc', function(){
    var id;

    return {
        getId: function() {
            return id;
        },
        setId: function(newId) {
            id = newId;
        }
    }
});