"use strict";

$(function(){
    $('#delete-btn').click(
        function(){
            $.ajax({
                url: '/profile/delete/' + $('#username').val(),
                type: 'DELETE',
            });
        }
    );
});