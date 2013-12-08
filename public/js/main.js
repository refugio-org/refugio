$(function() {  

	$('.startButton').on('click', function(){
		window.location="/"+$(this).attr('alt');
	})

	$('.list-group-item').on('click', function(){
		$(this).addClass('hidden');
    $('.shopping').removeClass('hidden');
    var counter=$('.counter'),
    inCart=counter.attr('data-count');
    inCart++;
    counter.attr('data-count',inCart);
    counter.removeClass('hidden').html(inCart);
	})

})