app.controller('appController', function($scope, $interval, Data){

    var tick = function() {
        $scope.clock = Date.now();
    }
    tick();
    $interval(tick, 1000);
    $scope.searchProduct = "";
    $scope.inputStat = true;
    $scope.code = '';
    $scope.selectedItems = [];
    $scope.total = 0;
    $scope.verse = 60000;
    $scope.user = 1;

    $scope.$watch('selectedItems', function(newValue){
        console.log(newValue)
    });

    $scope.$watch('searchProduct', function(newS){
        $('.special.cards .image').dimmer({
            on: 'hover'
        });
    });

    $scope.qteOnChange = function(qte){
        calculTotal($scope.cart)
    }

    $scope.print_ticket = function(){
        Data.post('', {
            user: $scope.user, 
            products: $scope.cart, 
            verse: $scope.verse
        })
        .then(function(results){
            
        })
        .catch(function(error){
            console.log(error);
        });
    }

    $scope.emptyCart = function(){
        $scope.cart = [];
        calculTotal($scope.cart);
    }

    $scope.cart = [];

    $scope.clients = [
        {
            id: 1,
            name: "Guy"
        },
        {
            id: 2,
            name: "Lucian"
        },
        {
            id: 3,
            name: "Marion"
        },
        {
            id: 4,
            name: "Minias"
        },
    ];

    $scope.categories = [
        {
            id: 1,
            name: "Computers"
        },
        {
            id: 2,
            name: "Clothings"
        },
        {
            id: 3,
            name: "Fruits"
        },
        {
            id: 4,
            name: "Services"
        },
    ];

    $scope.products = [
        {
            id: 1,
            intitule: 'Bracelet en fleur',
            code: '5364',
            stock: 50,
            price: 3500,
            category: 1,
            photo: 'images/profile5.jpg'
        },
        {
            id: 3,
            intitule: 'Pantalon',
            code: '2349',
            stock: 50,
            price: 2200,
            category: 1,
            photo: 'images/profile2.jpg'
        },
        {
            id: 2,
            intitule: 'Chaussure',
            code: '4230',
            stock: 0,
            price: 2700,
            category: 2,
            photo: 'images/profile3.jpg'
        },
        {
            id: 4,
            intitule: 'Sandale',
            code: '9324',
            stock: 50,
            price: 4000,
            category: 2,
            photo: 'images/profile4.jpg'
        },
        {
            id: 11,
            intitule: 'Sandale',
            code: '9324',
            stock: 50,
            price: 4000,
            category: 3,
            photo: 'images/profile4.jpg'
        },
        {
            id: 6,
            intitule: 'Sandale',
            code: '9324',
            stock: 50,
            price: 4000,
            category: 3,
            photo: 'images/profile4.jpg'
        },
        {
            id: 7,
            intitule: 'Sandale',
            code: '9324',
            stock: 50,
            price: 4000,
            category: 4,
            photo: 'images/profile4.jpg'
        },
        {
            id: 9,
            intitule: 'Sandale',
            code: '9324',
            stock: 50,
            price: 4000,
            category: 4,
            photo: 'images/profile4.jpg'
        },
    ];

    $('.osk-trigger').onScreenKeyboard({
		'draggable': true,
		'rewireReturn': 'search',
		'rewireTab': true
	});

    $scope.searchInList = function(p){
        var results = [];
        // console.log(p)
        $('.special.cards .image').dimmer({
            on: 'hover'
        });
        if(p.length != 0){
            p.forEach(function(cat){
                $scope.products.forEach(function(value){
                    if(cat.id === value.category){
                        results.push(value);
                    }
                })
            });
            // console.log(results)
            return results;
        }
        // console.log($scope.products)
        return $scope.products;
    }

    $scope.afterSelectItem = function(item){
        $scope.searchInList($scope.selectedItems);
    }

    $scope.afterRemoveItem = function(item){
        $scope.searchInList($scope.selectedItems);
    }

    $scope.activeInput = function(){
        $scope.inputStat = false;
    }

    $scope.showModal = function(classNames){
        $(classNames).modal('show');
    }

    $scope.searchAndAdd = function(code){
        var result = containsObject(code, $scope.products, 2);
        if(result.status){
            $scope.addCart(result.product);
        }else{
            Data.toast({message: 'Produit non existant', status: 'red'})
        }
    }

    $scope.addCart = function(product){
        if(product.stock > 0){
            if($scope.cart.length == 0){
                $.extend(product, {qte: 1});
                $scope.cart.push(product);
            }else{
                var exists = containsObject(product, $scope.cart, 1);
                if(exists.status){
                    if($scope.cart[exists.index].qte < product.stock){
                        $scope.cart[exists.index].qte++;
                    }
                }else{
                    $.extend(product, {qte: 1});
                    $scope.cart.push(product);
                }
            }
            console.log($scope.cart)
        }else{
            Data.toast({message: 'Stock vide', status: '#19c3aa'})
        }
        calculTotal($scope.cart);
    }

    $scope.removeToCart = function(i){
        $scope.cart.splice(i, 1);
        calculTotal($scope.cart);
    }

    $scope.addQte = function(product){
        $scope.cart.map(function(p){
            if(p.id === product.id){
                if(p.qte < product.stock){
                    p.qte += 1;
                }else{
                    p.qte = product.stock;
                }
                console.log(p.qte);
            }
            return p;
        })
        calculTotal($scope.cart)
    }

    $scope.substractQte = function(product){
        $scope.cart.map(function(p){
            if(p.id === product.id){
                if(p.qte > 1){
                    if(p.qte <= product.stock){
                        p.qte -= 1;
                    }else{
                        p.qte = product.stock - 1;
                    }
                }
                console.log(p.qte);
            }
            return p;
        })
        calculTotal($scope.cart)
    }

    function calculTotal(cart){
        $scope.total = 0;
        for(var i = 0; i < cart.length; i++){
            $scope.total += cart[i].price * cart[i].qte;
        }
    }

    function containsObject(object, list, road){
        for (var i = 0; i < list.length; i++) {
            if(road == 1){
                if (list[i].id === object.id) {
                    return {status: true, index: i};
                }
            }else{
                if (list[i].code === object) {
                    return {status: true, product: list[i]};
                }
            }
        }
        return {status: false};
    }
})