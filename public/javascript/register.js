$(document).ready(function() {
    $("#pass2").on("change keyup paste",function() {
        var pass2 = $("#pass2").val()
        var pass1 = $("#pass").val()
        if(pass2 == "") {
            $("#pass2").css("border-color", "gray");
        }
        else if(pass1 == pass2) {
            $("#pass2").css("border-color", "green");
        }
        else {
            $("#pass2").css("border-color", "red");
        }
    })
    $("#pass").on("change keyup paste",function() {
        //var pass2 = $("#pass2").val()
        var pass1 = $("#pass").val()
        if(pass1 == "") {
            $("#pass").css("border-color", "gray");
        }
        else if(pass1.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/)){
            if($('.popover-content').length > 0) {
                $("#pass").popover("hide");
            }
            $("#pass").css("border-color", "green");
        }
        else {
            if($(".popover-content").length == 0) {
                $("#pass").popover("show");
            }
            $("#pass").css("border-color", "red");
        }
    })
    $("#email").on("change keyup paste",function() {
        if($('#email').val().match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/igm)) {
            $("#email").css("border-color", "green");
        }
        else if($("#email").val() == "") {
            $("#email").css("border-color", "gray");
        }
        else {
            $("#email").css("border-color", "red");
        }
    })
    $("#name").on("change keyup paste",function() {
        if($("#name").val().length > 1) {
            $("#name").css("border-color", "green");
        }
        else {
            $("#name").css("border-color", "gray");
        }
    })
    $('body').on('click', function (e) {
        if(!$(this).is("#email")) {
            $("#pass").popover("hide");
        }
    })
})