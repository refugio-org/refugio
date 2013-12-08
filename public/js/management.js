$(function() {

  $("select[name='Types']").change(function() {
    var target = $(this).val();
    $('.type').addClass('hidden');
    $('.actions').addClass('hidden');
    $('.' + target).removeClass('hidden');
  });

  $(".type").change(function() {
    $('.actions').removeClass('hidden');
  });


});