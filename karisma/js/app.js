new Glider(document.querySelector('.glider'), {
  slidesToShow: 4,
  draggable: true,
  dots: '#dots',
  arrows: {
    prev: '.glider-prev',
    next: '.glider-next'
  }
});

new Glider(document.querySelector('.glider'), {
  slidesToShow: 1,
  draggable: true,
  arrows: {
    prev: '.prev',
    next: '.next'
  }
});

$(function(){
  $('._service').click(function(e){
    $('._modal').fadeIn('slow');
  });
  $('._close').click(function(e){
    $('._modal').fadeOut('slow');
  });
  $("a[href^='#']").click(function(e) {
    e.preventDefault();
    
    var position = $($(this).attr("href")).offset().top;
  
    $("body, html").animate({
      scrollTop: position
    } /* speed */ );
  });

  window.onscroll = function() {scrollFunction()};

  function scrollFunction() {
    if (document.body.scrollTop > 700 || document.documentElement.scrollTop > 700) {
      $("#scrollTop").fadeIn('slow');
    } else {
      $("#scrollTop").fadeOut('slow');
    }
  }
});