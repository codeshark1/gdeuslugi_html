$(window).load(function() {
	$(".pulse").fadeOut();
	$(".preloader").delay(400).fadeOut("slow");
});

jQuery(document).ready(function($){

    function navigation_show(button, menu, othermenu, otherbutton) { // глобальная
        //$(menu).hide();
        $(button).click(function(){
            if ( $(menu).is(':visible')){
                $(menu).slideUp().removeClass('active');
                $(this).removeClass('active');
            } else {
                $(this).addClass('active');
                $(menu).slideDown().addClass('active');
                $(othermenu).slideUp().removeClass('active');
                $(otherbutton).removeClass('active');
            }
        });
    }

    navigation_show('#js-btn-menu','#js-menu-wrapper','#search-extended','#btn-search-extended');
    navigation_show('#js-btn-cities','#js-cities-wrapper');
    navigation_show('#js-cities-wrapper .close','#js-cities-wrapper');
    navigation_show('#btn-search-extended','#search-extended','#js-menu-wrapper','#js-btn-menu');

    
    
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
    show_form_filter('#js-btn-search-listing','#search-listing-filter');
    show_form_filter('#search-listing-filter .btn-close','#search-listing-filter');

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
    menu_nested('#menu-main');

    function tabs() { // глобальная
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
            

            if ($(window).width() < 768) {
                $(this).parents('.nav-tabs').css('display','none');
            }
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
       

        $('html').click(function(){
            $('.js-nav-tabs').css('display','none');
        });        
        $('.nav-tabs-wrapper').click(function(e){
            e.stopPropagation();
        });
    }
    tabs();

    function drop_menu(trigger, menu, link, wrapper) {
		$(trigger).html($(link+'.active').html()).attr('href', $(link+'.active').attr('href'));
		$(trigger).click(function(e){
			e.preventDefault();
			if ( $(this).siblings(menu).is(':visible') ) {
				$(this).siblings(menu).css('display','none');
			} else {
				$(this).siblings(menu).css('display','block')
			}
		});
		$(link).click(function(e){			
            $(this).parents(wrapper).find('.active').removeClass('active');
            $(this).addClass('active')
                .parents(wrapper)
                .find(trigger)
                .html($(this).html())
                .siblings(menu)
                .hide();			
        });

        

	}





    /* SEARCH FORM */
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
    searchForm('#search-header');
    searchForm('#searchform_listing');

    /* ACCORDION */
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
    accordion();


    new SVGInjector().inject(document.querySelectorAll('svg[data-src]'));




    

    function hide_location_hint() {
        $('.location-hint').hide();
    };
    $('.location-hint').find('.btn-cta').click(function(e){
        e.preventDefault();
        hide_location_hint();
    });
    $('#js-btn-cities').click(function(e){        
        hide_location_hint();
    });


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
    customCheckbox();
    $('label.checkbox').click(function(){
        customCheckbox();
    });
    $('label.radio').click(function(){
        customCheckbox();
    });    




    /* modal open-close */
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

        $('.btn-close').click(function(e){
            e.preventDefault();
            //$(this).parents('.modal-container').removeClass('opened');
            close_modal();
        });
    }
    modal_open_close();    

    $('.modal-container').click(function(){
        close_modal();
    });
    $('.modal-window').click(function(e){
        e.stopPropagation();
    });
    


    function modal_menu_link_click() {
        $('#menu-categs-popup a, #modal-cities a').click(function(e){
            e.preventDefault();
            var target_data = "#" + $(this).parents('.modal-container').attr('id');
            
            $(this).parent('.menu-item').addClass('active').siblings().removeClass('active');
            if( ! $(this).next('.sub-menu').length ) {
                //$(this).parents('.modal-container').removeClass('opened');
                close_modal();
                $('body').find("[data-trigger='"+target_data+"']").val($(this).text());
            }
        });
    }
    modal_menu_link_click();

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
    categ_select();

    /*categ search live filter:*/
    function categs_filter(element) {
        var value = ($(element).val()).toLowerCase();
        
        jQuery.expr[':'].contains = function(a, i, m) {
            return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
        };

        $('#menu-categs-popup > ul > li>a:not(:contains(' + value + '))').hide(); 
        $('#menu-categs-popup > ul > li>a:contains(' + value + ')').show();
    }      
});