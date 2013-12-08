$(function() {

    $('.startButton').on('click', function() {
        window.location = "/" + $(this).attr('alt');
    });

    $('.list-group-item:not(.small)').on('click', function() {
        var lastItem = $('#cart li.small');
        $(this).addClass('small').insertAfter(lastItem.last());
        $('.shopping').removeClass('hidden');
        var counter = $('.counter'),
            inCart = counter.attr('data-count');
        inCart++;
        counter.attr('data-count', inCart);
        counter.removeClass('hidden').html(inCart);
    });

    $('.shopping')
        .on('click', function() {
            window.location = "/cart";
        });
})