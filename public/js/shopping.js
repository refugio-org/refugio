$(document).ready(function() {
    $('.list-group-item').click(function(event) {
        alert('clicked ' + $(event.target).closest('.list-group-item').attr('id'));
    });
});