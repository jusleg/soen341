$(document).ready(function() {
    $("#pass2").on("change keyup paste", function () {
        var pass2 = $("#pass2").val()
        var pass1 = $("#pass").val()
        if (pass2 == "") {
            $("#pass2").css("border-color", "gray");
            $("#pass2").css("border-top", "1px solid gray")
        }
        else if (pass1 == pass2 && pass2.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/)) {
            $("#pass2").css("border-color", "green");
            $("#pass2").css("border-top", "1px solid green")
        }
        else {
            $("#pass2").css("border-color", "red");
            $("#pass2").css("border-top", "1px solid red")
        }
    })
    $("#pass").on("change keyup paste", function () {
        var pass1 = $("#pass").val()
        if (pass1 == "") {
            $("#pass").css("border-color", "gray");
            $("#pass2").css("border-top", "1px solid gray")
        }
        else if (pass1.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/)) {
            if ($('.popover-content').length > 0) {
                $("#pass").popover("hide");
            }
            $("#pass").css("border-color", "green");
            $("#pass2").css("border-top", "1px solid green")
        }
        else {
            if ($(".popover-content").length == 0) {
                $("#pass").popover("show");
            }
            $("#pass").css("border-color", "red");
            $("#pass2").css("border-top", "1px solid red")
        }
    })

    $('body').on('click', function (e) {
        if(!$(this).is("#email") && $(".popover-content").length > 0) {
            $("#pass").popover("hide");
        }
    })
})

function validatePass() {
    var pass2 = $("#pass2").val()
    var pass1 = $("#pass").val()
    if (pass1 == pass2 && pass2.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/)) {
        return true;
    } else {
        $("#formMessage").html("The password doesn't fit the necessary requirements or the two passwords don't match")
        return false;
    }
}