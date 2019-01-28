function navigation_show(button, menu, othermenu, otherbutton) { // глобальная
    $(menu).hide();
    $(button).click(function(){
        if ( $(menu).is(':visible')){
            $(menu).slideUp(200).removeClass('active');
            $(this).removeClass('active');
        } else {
            $(this).addClass('active');
            $(menu).slideDown(200).addClass('active');
            $(othermenu).slideUp(200).removeClass('active');
            $(otherbutton).removeClass('active');
        }
    });
}

function show_form_filter(button, block) { // фильтр, страница поиска кредитов
    $(block).hide();
    $(button).click(function(e){
        if ( $(block).is(':visible')) {
            $(block).slideUp().removeClass('active');
            $('#js-btn-search-listing').removeClass('active');
        } else {
            $('#js-btn-search-listing').addClass('active');
            $(block).slideDown().addClass('active');
        }
        if($(window).width() < 576){
            if($(block).hasClass('active')){
                $('body').addClass('overflow-hidden');
            }else{
                $('body').removeClass('overflow-hidden');
            }
        }
    });
}  

function menu_nested(menu_id) {
    //$(menu_id).find('ul').hide();        
    $(menu_id).find('.has-sub>a').click(function(e){
        if ( $(window).width() < 768 ) {
            e.preventDefault();
            $(this).siblings('.sub-menu').slideDown();
            if ( $(this).parent().hasClass('menu-item--active') ) {
                $(this).siblings('.sub-menu').stop().slideUp();
                $(this).parent().removeClass('menu-item--active');
            } else {
                $(this).parent().addClass('menu-item--active').siblings('.menu-item--active').removeClass('menu-item--active').find('.sub-menu').stop().slideUp();
                $(this).siblings('.sub-menu').stop().slideDown();
            }
        }
    });
}

function tabs() {
    $('.js-nav-tabs .menu-item a').click(function(e){
        e.preventDefault();
        var tab_id = $(this).attr('href');
        $('.js-nav-tabs .menu-item').removeClass('active');
        $(this).parent().addClass('active');
        $('.tabcontent').css('display','none');
        $(tab_id).fadeIn(300);
        if($('select').hasClass('tab-select')){
            $('select.tab-select option').prop('selected', false);
            $('select.tab-select option[value="'+tab_id+'"]').prop('selected', true);
         }   
        $(this).parents('.nav-tabs-wrapper').find('.tab-selected').text($(this).text());            
    });
    $('.tab-selected').click(function(e){
        e.preventDefault();
        $(this).parents('.nav-tabs-wrapper').find('.nav-tabs').css('display','block');
    });
    $('.tab-select').on('change', function(){
        $('.js-nav-tabs .menu-item').removeClass('active');
        $('.js-nav-tabs .menu-item a[href="'+$(this).val()+'"]').parent().addClass('active');
        $('.tabcontent:not('+$(this).val()+')').css('display','none');
        $('.tabcontent'+$(this).val()).fadeIn(300);
    })
}

function trim_text() {
    var ellipsestext = "...";
    var moretext = "Ещё";
    var lesstext = "Меньше";

    $('.text-trimmer').each(function() {
        var content = $(this).html();
        var showChar = $(this).data('maxlength');
        if(content.length > showChar) {

            var c = $.trim(content.substr(0, showChar));
            var h = $.trim(content.substr(showChar-1, content.length - showChar));            

            var html = c + '<span class="moreellipses">' + ellipsestext + '</span><span class="morecontent"><span>' + h + '</span>&nbsp;<a href="" class="morelink">' + moretext + '</a></span>';

            $(this).html(html);
        }

    });

    $(".morelink").click(function(){
        if($(this).hasClass("less")) {
            $(this).removeClass("less");
            $(this).html(moretext);
        } else {
            $(this).addClass("less");
            $(this).html(lesstext);
        }
        $(this).parent().prev().toggle();
        $(this).prev().toggle();
        return false;
    });
}

function drop_menu(trigger, menu/* , link, wrapper */) {
    //$(trigger).html($(link+'.active').html()).attr('href', $(link+'.active').attr('href'));
    $(menu).hide();
    $(trigger).click(function(e){
        e.preventDefault();
        if ( $(this).siblings(menu).is(':visible') ) {
            $(this).siblings(menu).css('display','none');
        } else {
            $(this).siblings(menu).css('display','block')
        }
    });
/*     $(link).click(function(e){			
        $(this).parents(wrapper).find('.active').removeClass('active');
        $(this).addClass('active')
            .parents(wrapper)
            .find(trigger)
            .html($(this).html())
            .siblings(menu)
            .hide();			
    });         */


}

function searchForm(formId) {
    $('.search-button, .search-field').click(function(e){
        e.stopPropagation();
    });
    $(formId).find('.search-button').click(function(e){
        e.preventDefault();
        if ( $(this).parent(formId).hasClass('open') ) {
            $(this).parent(formId).removeClass('open').addClass('closed');
        } else {
            $(this).parent(formId).removeClass('closed').addClass('open');
            $(this).siblings('.search-field').focus();
        }
    });
    $('html').click(function(){
        $(formId).removeClass('open').addClass('closed');
    });
}

function accordion() {
    $('.accord-content').hide();                
    $('.accord-open .accord-content').show();
    $('.h-accord').click(function(){
        if ($(this).parent('.accord').hasClass('accord-open')) {
            $(this).siblings('.accord-content').slideUp().parents('.accord').removeClass('accord-open');
        } else {
            $(this).parents('.section-accord').find('.accord-open').removeClass('accord-open').find('.accord-content').slideUp()
            $(this).parent('.accord').addClass('accord-open').find('.accord-content').slideDown();
        }
    });
}    

function hide_location_hint() {
    $('.location-hint').hide();
};

function customCheckbox() {
    if ($('label.checkbox input').length) {
        $('label.checkbox').each(function(){
            $(this).removeClass('checked');
        });
        $('label.checkbox input:checked').each(function(){
            $(this).parent('label').addClass('checked');
        });
    }
    if ($('label.radio input').length) {
        $('label.radio').each(function(){
            $(this).removeClass('checked');
        });
        $('label.radio input:checked').each(function(){
            $(this).parent('label').addClass('checked');
        });
    }        
}

function gallery_prev_width() {
    $('.img-preview-row').each(function(){
        var width = 0;
        $(this).find('.img-thumbnail').each(function() {
            width += $(this).outerWidth(true);
        });
        $(this).width(width);
    });
}
function show_pass() {
    $('.btn-passtoggle').click(function(){
        if ( $(this).siblings('input').attr('type') == 'password' ) {
            $(this).addClass('active').siblings('input').attr('type', 'text');
        } else {
            $(this).removeClass('active').siblings('input').attr('type', 'password');
        }
    });
}

/* MODALS */
    function close_modal() {
        $('.modal-container.opened').removeClass('opened');
        $('body').removeClass('modal-opened');
    }
    function modal_open_close(){
        $('.modal-trigger').click(function(e){
            e.preventDefault();
            $($(this).data('trigger')).addClass('opened');
            $('body').addClass('modal-opened');
        });

        $('.modal-container .close').click(function(e){
            e.preventDefault();
            //$(this).parents('.modal-container').removeClass('opened');
            close_modal();
        });
    } 
    function modal_menu_link_click() {
        $('#menu-categs-popup a, #modal-cities a').click(function(e){
            e.preventDefault();
            var target_data = "#" + $(this).parents('.modal-container').attr('id');
            
            $(this).parent('.menu-item').addClass('active').siblings().removeClass('active');
            if( ! $(this).next('.sub-menu').length ) {
                //$(this).parents('.modal-container').removeClass('opened');
                close_modal();
                $('body')
                    .find("[data-trigger='"+target_data+"']").val($(this).text())
                    .next('.chosen-value').val( $(this).data('value') )
                ;
            }
        });
    }
    function categ_select() {
        /*link click submenu*/
        $('#menu-categs-popup').find('.menu-item').has('.sub-menu').children('a').click(function(){
            $(this).parents('.modal-window').find('.h-modal').text($(this).text());
            $(this).parents('.modal-window').find('.sub-menu.current').removeClass('current');

            if ($(this).parents('.modal-window').hasClass('menu-open-1')) {
                $(this).parents('.modal-window').removeClass('menu-open-1').addClass('menu-open-2');
            } else {
                $(this).parents('.modal-window').addClass('menu-open-1')
            }

            $(this).next('.sub-menu').css('left', 0).addClass('current');
        });

        /*window heading (back button) click*/
        $('#modal-categs .h-modal').click(function(){
            if( $(this).parents('.modal-window').hasClass('menu-open-2') ) {
                $(this).parents('.modal-window').removeClass('menu-open-2').addClass('menu-open-1');
            } else if ( $(this).parents('.modal-window').hasClass('menu-open-1') ) {
                $(this).parents('.modal-window').removeClass('menu-open-1');
            }

            $(this)
            .parents('.modal-window')
            .find('.sub-menu.current')
            .removeClass('current')
            .css('left', '100%')
            .parents('.sub-menu')
            .addClass('current');

            if ($('.sub-menu.current').length ) {
                $(this).text( $('.sub-menu.current').siblings('a').text() );
            } else {
                $(this).text('Выбор категории');
                $(this).parents('.modal-window').find('.menu-item.active').removeClass('active');
            }
        });
    }
    function list_filter(element, id) {
        var value = ($(element).val()).toLowerCase();
        
        jQuery.expr[':'].contains = function(a, i, m) {
            return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
        };

        $(id + '> ul > li>a:not(:contains(' + value + '))').hide(); 
        $(id + '> ul > li>a:contains(' + value + ')').show();
    } 
    window.list_filter = list_filter;
/* -- MODALS */

/* IMAGE UPLOAD */
    function initDialog(el) {
        $('.img-input').on('change', function (e) {
        showFile(e, el);
        });
    }

    function removeFile() {
        $('.remove-photo').on('click', function(){
            $(this).parent().remove();
        });
    };              

    function showFile(e, el) {
        var files = e.target.files;               

        for (var i = 0, f; f = files[i]; i++) {
            if (!f.type.match('image.*')) continue;
            var fr = new FileReader();

            fr.onload = (function(theFile) {
                var numbOfInputs = $('.img-input').length;
                return function(e) {
            
                    el.parent().append("<div class='photo' style='background-image:url(" + e.target.result + ")'></div><a href='#' class='link remove-photo'>Удалить</a>");
                    el.parent().addClass('active');
                    removeFile(); 
                };
            })(f);

            fr.readAsDataURL(f);
        }
    }

/* ----- IMAGE UPLOAD */

jQuery(document).ready(function($){
    new SVGInjector().inject(document.querySelectorAll('svg[data-src]'));

    navigation_show('#js-btn-menu-main','#js-menu-main');

    show_form_filter('#js-btn-search-listing','#search-listing-filter');
    show_form_filter('#search-listing-filter .btn-close','#search-listing-filter');

    menu_nested('#menu-main');

    tabs();

    trim_text();   


    drop_menu('#js-user-menu-trigger', '#js-user-menu');

    /* $('.location-hint').find('.btn-cta').click(function(e){
        e.preventDefault();
        hide_location_hint();
    });
    $('#js-btn-cities').click(function(e){        
        hide_location_hint();
    }); */



    customCheckbox();
    $('label.checkbox').click(function(){
        customCheckbox();
    });
    $('label.radio').click(function(){
        customCheckbox();
    });    




    /* MODALS */
    modal_open_close();   
    $('.modal-container').click(function(){
        close_modal();
    });
    $('.modal-window').click(function(e){
        e.stopPropagation();
    });
    modal_menu_link_click();
    categ_select();    


    gallery_prev_width();
    show_pass();

    /* IMAGE UPLOAD */
    $('.item-add').on('click',function (e) {
        e.preventDefault();
        var max = 0;
        $('.photo-uploaded').each(function(){
            var _this = $(this);
            if(!$(this).hasClass('active'))
                $(this).remove();
            var _count = parseInt(_this.data('count'));
            if(_count > max)
                max = _count;
        });
        console.log(max);
        var count = max > 0 ? (max + 1) : $('.photos-uploaded').find('.photo-uploaded').length;                
        var foo = $('.photos-uploaded').find('.photo-uploaded');                
        $('.photos-uploaded').append("<div class='item photo-uploaded' data-count='"+count+"'><input type='file' class='img-input' name='user_photo[]' data-id='img-upload-"+count+"'></div>");                
        $('input[data-id="img-upload-'+count+'"]').click();
        initDialog($('input[data-id="img-upload-'+count+'"]'));
    }); 


   
    $('body').click(function(){
        $('#js-user-menu').hide();
    });
    $('.bx-user').click(function(e){
        e.stopPropagation();
    });
});