var app = angular.module('MARKETAPP', ['multipleSelect']);

app.constant('URL_API', '')

.directive('respectQte', function(){
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, modelCtrl) {

            modelCtrl.$parsers.push(function (inputValue) {
                console.log(element.attr('respect-qte'))
                // var transformedInput = inputValue > element.attr('respect-qte') ? element.attr('respect-qte') : null;

                if (inputValue > element.attr('respect-qte')) {
                    modelCtrl.$setViewValue(element.attr('respect-qte'));
                    modelCtrl.$render();
                }

                return inputValue;
            });
        }
    };
})

.directive('numericOnly', function(){
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, modelCtrl) {

            modelCtrl.$parsers.push(function (inputValue) {
                var transformedInput = inputValue ? inputValue.replace(/[^\d.-]/g,'') : null;

                if (transformedInput!=inputValue) {
                    modelCtrl.$setViewValue(transformedInput);
                    modelCtrl.$render();
                }

                return transformedInput;
            });
        }
    };
})

.directive('ngElementReady', function() {
    return {
        priority: -1000, // a low number so this directive loads after all other directives have loaded.
        restrict: "A", // attribute only
        link: function() {
            $('.ui .dropdown')
                .dropdown()
            ;
            $('.special.cards .image').dimmer({
                on: 'hover'
            });
            $('.search.normal.selection.dropdown')
            .dropdown({
                maxSelections: 3
            });
            new SimpleBar(document.getElementById('listcart'))
        }
    };
})

.filter('formatMoney', function(){
    return function(a){
        return a.replace(',', ' ');
    }
})

.filter('total', function(){
    return function(price, stock, qte){
        if(qte <= stock){
            return price * qte;
        }else{
            alert("Stock total: " + stock);
            return price * stock;
        }
    }
})

.filter('totalToPay', function(){
    return function(cart){
        var total = 0;
        if(cart.length > 0){
            for(var i = 0; i < cart.length; i++){
                if(cart[i].qte <= cart[i].stock){
                    total += cart[i].price * cart[i].qte;
                }else{
                    total += cart[i].price * cart[i].stock;
                }
            }
        }
        return total;
    }
})

app.run(function($rootScope){

});