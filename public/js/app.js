$(document).ready(function () {
    $(document).on( "click",".checkout-button", function(e) {
        e.preventDefault();
        var branch = $('#remote-branches').val();
        var url = window.location.pathname + 'checkout';
        $.ajax({
            type: "POST",
            url: url,
            crossDomain: true,
            beforeSend: function() {
                $.loadingBlockShow();
            },
            complete: function() {
                $.loadingBlockHide();
            },
            data: {branch: branch},
            dataType: 'json',
            success: function(response) {
                swal({
                    title: '',
                    text: response,
                    confirmButtonText: "OK"
                });
                $('#current_branch').text(branch);
            },
            error: function(response) {
                console.log(response);
                swal({
                    title: '',
                    text: response.exception,
                    confirmButtonText: "OK"
                });
            }
        });
    });
    $(document).on( "click",".pull-button", function(e) {
        e.preventDefault();
        var url = window.location.pathname + 'pull';
        $.ajax({
            type: "POST",
            url: url,
            crossDomain: true,
            beforeSend: function() {
                $.loadingBlockShow();
            },
            complete: function() {
                $.loadingBlockHide();
            },
            dataType: 'json',
            success: function(response) {

                swal({
                    title: '',
                    text: response,
                    confirmButtonText: "OK"
                });
            },
            error: function(response) {

                swal({
                    title: '',
                    text: response,
                    confirmButtonText: "OK"
                });
            }
        });
    });
    $(document).on( "click",".status-button", function(e) {
        e.preventDefault();
        var url = window.location.pathname + 'status';
        $.ajax({
            type: "POST",
            url: url,
            crossDomain: true,
            beforeSend: function() {
                $.loadingBlockShow();
            },
            complete: function() {
                $.loadingBlockHide();
            },
            dataType: 'json',
            success: function(response) {
                $('.jumbotron p.lead').html(response);
                /*swal({
                    title: '',
                    text: response,
                    confirmButtonText: "OK"
                });*/
            },
            error: function(response) {
                $('.jumbotron p.lead').html(response);

                /*swal({
                    title: '',
                    text: response,
                    confirmButtonText: "OK"
                });*/
            }
        });
    });
    $(document).on( "click",".reset-button", function(e) {
        e.preventDefault();
        var url = window.location.pathname + 'reset';
        $.ajax({
            type: "POST",
            url: url,
            crossDomain: true,
            beforeSend: function() {
                $.loadingBlockShow();
            },
            complete: function() {
                $.loadingBlockHide();
            },
            dataType: 'json',
            success: function(response) {

                swal({
                    title: '',
                    text: response,
                    confirmButtonText: "OK"
                });
            },
            error: function(response) {

                swal({
                    title: '',
                    text: response,
                    confirmButtonText: "OK"
                });
            }
        });
    });
    $(document).on( "click",".gitLogButton", function(e) {
        e.preventDefault();
        var url = window.location.pathname + 'log';
        $.ajax({
            type: "POST",
            url: url,
            crossDomain: true,
            beforeSend: function() {
                $.loadingBlockShow();
            },
            complete: function() {
                $.loadingBlockHide();
            },
            dataType: 'json',
            success: function(response) {
                response = response.replace(/\<hr\>/g," ");
                $('p.git-log-content').html(response);

                /*swal({
                    title: '',
                    text: response,
                    confirmButtonText: "OK"
                });*/
            },
            error: function(response) {
                $('p.git-log-content').html(response);
               /* swal({
                    title: '',
                    text: response,
                    confirmButtonText: "OK"
                });*/
            }
        });
    });
});

/**
 * jQuery Loading Block
 *
 * demos / documentation: https://github.com/chan15/jquery-loading-block
 *
 * @author Chan
 */
(function ($) {
    $.loadingBlockShow = function(opts) {
        var defaults = {
            imgPath: 'img/icon.gif',
            imgStyle: {
                width: 'auto',
                textAlign: 'center',
                marginTop: '20%'
            },
            text: 'loading...',
            style: {
                position: 'fixed',
                width: '100%',
                height: '100%',
                background: 'rgba(255, 255, 255, .8)',
                left: 0,
                top: 0,
                zIndex: 10000
            }
        };
        $.extend(defaults, opts);
        $.loadingBlockHide();

        var img = $('<div><img src="' + defaults.imgPath + '"><div>' + defaults.text + '</div></div>');
        var block = $('<div id="loading_block"></div>');

        block.css(defaults.style).appendTo('body');
        img.css(defaults.imgStyle).appendTo(block);
    };

    $.loadingBlockHide = function() {
        $('div#loading_block').remove();
    };
}(jQuery));
