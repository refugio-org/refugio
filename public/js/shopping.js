$(document).ready(function() {
  $('.list-group-item').click(function(event) {
    var itemId = $(event.target).closest('.list-group-item').attr('data-itemId');  
    
    $.ajax({
      type: "POST",
      url: "/cart/item",
      data: { product: itemId }
    })
    .done(function( msg ) {
      console.log("Id:"+itemId);
      alert( "Item Saved: " + itemId);
    });
  });
});