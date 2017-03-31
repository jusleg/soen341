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
        if(!$(this).is("#email") && $(".popover-content").length > 0) {
            $("#pass").popover("hide");
        }
    })
})

function submitRegister() {
    var check = 0
    var pass1 = $('#pass').val();
    var pass2 = $('#pass2').val();
    if($('#email').val().match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/igm)) {
        check++
    } else {
        $("#email").css("border-color", "red");
    }
    if($("#name").val().length > 1) {
        check++
    } else {
        $("#name").css("border-color", "red");
    }
    if(pass1.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/)) {
        check++
    } else {
        $("#pass").css("border-color", "red");
    }
    if(pass1 === pass2) {
        check++;
    } else {
        $("#pass2").css("border-color", "red");
    }

   //checking to see if the checkbox is checked, if it is checked go here
    if ($("#termCheck").is(':checked') == true) {
        check++;  // checked
    }
    //if not add css class, make the border red
    else if ($("#termCheck").is('checked') == false){
        $("#border").addClass('changedRed');
    }

    //checking changes on the id #termCheck
    $("#termCheck").change(function() {
        if ($("#termCheck").is(':checked') == true) {
            //remove changedRed class
            $("#border").removeClass('changedRed');
            check++;  // checked
        }
    });

    if(check == 5) {
        //Form is completely validated
        //Make AJAX call to correct script
        var payload = {
            name: $("#name").val(),
            email: $("#email").val(),
            password: $("#pass").val()
        };
        $.ajax({
            type: "POST",
            data: payload,
            url: "/register",
            success: function(response) {
                window.location.href = "/login";
            }

        })
    }
}
