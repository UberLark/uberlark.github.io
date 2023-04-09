/*****************************************************************************
 * Copyright (c) 2010 Miden co. All rights reserved.                         *
 ****************************************************************************/
var userold = ""; 
$(function () {
    var windowHeight = $(window).height(), windowWidth = $(window).width();
    $("form").submit(function () {
        var f_id = $(this).attr("id");
        var f_line = {};
        var f_action = $(this).attr("submit");
        f_line.ajax = "1";
        $("#" + f_id + " input").each(function (data) {
            f_line[$(this).attr("name")] = $(this).attrvalue();
        });
        if ($(this).attr("reload")) {
            if (f_line["p"] == "Поиск...") {
                window.location = "?search=0";
                return false;
            }
            window.location = "?search=" + f_line["p"];
        } else {
            $.post(f_action, f_line, function (data, status) {
                if (status == "success") {
                    $("#rightpanel").html(data);
                }
            });
        }
        return false;
    });
    return false;
});

/*---------------------------------------------------------------------------------------------------*/
function IndexKeyFocus(sender) {

    if ($(sender).attr("id") == "users") {//alert($(sender).attr("id"));
        $(sender).keyup(function (e) {
            var eventcode = e.keyCode || e.which;//alert(eventcode);
            if ((eventcode == 13) || (eventcode == 39) || (eventcode == 40)) {
                //putsession(sender);
                MoveHost("parole");
            }
        });
        $(sender).blur(function (e) {
            if (($(sender).attrvalue() == '') || ($(sender).attrvalue() == '0')) {
                if (userold) {
                    $(sender).attrvalue( userold);
                } else {
                    $(sender).attrvalue("...");
                }
            } else {
                /*alert($(sender).attrvalue());*/
                //putsession(sender);
            }
        });
        if (($(sender).attrvalue() == "...") || ($(sender).attrvalue() == "E-mail")|| ($(sender).attrvalue() == "Login")) {
            userold = $(sender).attrvalue();
            $(sender).attrvalue("");
        }
    }

    if ($(sender).attr("id") == "parole") {
        $(sender).keyup(function (e) {
            var eventcode = e.keyCode || e.which;
            if ((eventcode == 13) || (eventcode == 39)) {
                //putsession(sender);
                //setTimeout("putLoginTo(sender);", 500);//
                //sleep(500);
                //putLoginTo(sender);
                MoveHost("logButton");
                //setTimeout("$('#logButton').click();", 5000);
            }
        });
        $(sender).blur(function (e) {
            if (($(sender).attrvalue() == '') || ($(sender).attrvalue() == '0')) {
                if ($(sender).attr("id") == "users") {
                    $(sender).attrvalue( userold);
                } else {
                    $(sender).attrvalue("...");
                }
            } else {
                //putsession(sender);
            }
        });
        if ($(sender).attrvalue() == "...") {
            $(sender).attrvalue( "");
        }
    }
}

/*---------------------------------------------------------------------------------------------------*/
$(function () {
    $("body").keypress(function (e) {
        eventFromBody(e);
    });
});

/*---------------------------------------------------------------------------------------------------*/
$(function () {
    $("a[rel^='prettyPhoto']").prettyPhoto();
});

