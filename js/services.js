/**
 * Created by Christoffer on 20-10-2014.
 */

joomlaapp.service('translationService', function($resource) {
    this.getTranslation = function($scope, language) {
        var languageFilePath = 'lib/languages/lang-' + language + '.json';
        $resource(languageFilePath).get(function (data) {
            $scope.translation = data;
        });
    };
});

joomlaapp.service('getPageData', function(){
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

joomlaapp.service('getArticleByIdSrvc', function(){
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

joomlaapp.service('getContactByIdSrvc', function() {
    var id;

    return {
       getId: function () {
           return id;
       },
       setId: function (newId) {
           id = newId;
       }
    }
});