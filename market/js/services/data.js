app.factory("Data", ['$http', 'URL_API',
    function ($http, URL_API) { // This service connects to our REST API

        var serviceBase = URL_API;

        var obj = {};
        obj.toast = function (data) {
            $.uiAlert({
                textHead: 'Notification',
                text: data.message,
                bgcolor: data.status,
                textcolor: '#fff',
                position: 'top-right', // top And bottom ||  left / center / right
                // icon: 'checkmark box',
                time: 3
                });
        };
        obj.get = function (q) {
            return $http.get(serviceBase + q).then(function (results) {
                return results.data;
            });
        };
        obj.post = function (q, object) {
            return $http.post(serviceBase + q, object).then(function (results) {
                return results.data;
            });
        };
        obj.put = function (q, object) {
            return $http.put(serviceBase + q, object).then(function (results) {
                return results.data;
            });
        };
        obj.delete = function (q) {
            return $http.delete(serviceBase + q).then(function (results) {
                return results.data;
            });
        };

        return obj;
}]);