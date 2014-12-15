/**
 * Created by Christoffer on 20-10-2014.
 */

joomlaapp.directive('articleHeader', function(){
    return {
        restrict    : 'E',
        replace     : 'true',
        scope       : 'false',
        templateUrl : 'template_directive/_dirHeader.html'
    }
});

joomlaapp.directive('appHeader', function(){
    return {
        restrict    : 'E',
        replace     : 'true',
        scope       : 'false',
        templateUrl : 'template_directive/_appHeader.html'
    }
});

joomlaapp.directive('contactHeader', function(){
    return {
        restrict    : 'E',
        replace     : 'true',
        scope       : 'false',
        templateUrl : 'template_directive/_contactHeader.html'
    }
});