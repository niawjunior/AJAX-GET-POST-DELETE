var $orders = $('#orders');
var $name = $('#name');
var $drink = $('#drink');
var orderTemplate = $('#order-template').html();

function addOrder(order) {
    $orders.append(Mustache.render(orderTemplate, order));
};

$('#add-order').on('click', function() {

    var order = {
        name: $name.val(),
        drink: $drink.val()
    };

    $.ajax({
        type: 'POST',
        url: 'http://rest.learncode.academy/api/learncode/friends',
        data: order,
        success: function(newOrder) {
            addOrder(newOrder);
        }
    });
});


$.ajax({
    type: 'GET',
    url: 'http://rest.learncode.academy/api/learncode/friends',
    success: function(data) {
        $.each(data, function(i, order) {
            if (order.id) {
                addOrder(order);
            }
        });
    },
    error: function() {
        alert('error loading orders');
    }
});

$orders.delegate('.remove', 'click', function() {

    var $items = $('#remove');

    $.ajax({
        type: 'DELETE',
        url: 'http://rest.learncode.academy/api/learncode/friends/' + $(this).attr('data-id'),
        success: function() {
            $items.fadeOut(300, function() {
                $(this).remove();
            });
        }
    });
});