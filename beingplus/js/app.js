$(function(){
    $('#navicon').on('click', function(e){
        e.preventDefault();
        $('.sideNavLeft').addClass('activedNav');
        $('.menu').addClass('activeMenu');
    })
    $('#closed').on('click', function(e){
        e.preventDefault();
        $('.sideNavLeft').removeClass('activedNav');
        $('.menu').removeClass('activeMenu');
    })
});