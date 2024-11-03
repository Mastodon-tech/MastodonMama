$(document).ready(function () {
    $.post('https://www.mastodonbd.com/home/section/featured', {
        _token: 'NWyFBgIDFEYEPmsN1enb25qSfP7vFZiJGOeTG1r5'
    }, function (data) {
        $('#section_featured').html(data);
        AIZ.plugins.slickCarousel();
    });

    $.post('https://www.mastodonbd.com/home/section/todays-deal', {
        _token: 'NWyFBgIDFEYEPmsN1enb25qSfP7vFZiJGOeTG1r5'
    }, function (data) {
        $('#todays_deal').html(data);
        AIZ.plugins.slickCarousel();
    });

    $.post('https://www.mastodonbd.com/home/section/best-selling', {
        _token: 'NWyFBgIDFEYEPmsN1enb25qSfP7vFZiJGOeTG1r5'
    }, function (data) {
        $('#section_best_selling').html(data);
        AIZ.plugins.slickCarousel();
    });

    $.post('https://www.mastodonbd.com/home/section/newest-products', {
        _token: 'NWyFBgIDFEYEPmsN1enb25qSfP7vFZiJGOeTG1r5'
    }, function (data) {
        $('#section_newest').html(data);
        AIZ.plugins.slickCarousel();
    });

    $.post('https://www.mastodonbd.com/home/section/auction_products', {
        _token: 'NWyFBgIDFEYEPmsN1enb25qSfP7vFZiJGOeTG1r5'
    }, function (data) {
        $('#auction_products').html(data);
        AIZ.plugins.slickCarousel();
    });

    $.post('https://www.mastodonbd.com/home/section/home-categories', {
        _token: 'NWyFBgIDFEYEPmsN1enb25qSfP7vFZiJGOeTG1r5'
    }, function (data) {
        $('#section_home_categories').html(data);
        AIZ.plugins.slickCarousel();
    });

    $('.category-nav-element').each(function (i, el) {
        $(el).on('mouseover', function () {
            if (!$(el).find('.sub-cat-menu').hasClass('loaded')) {
                $.post('https://www.mastodonbd.com/category/nav-element-list', {
                    _token: AIZ.data.csrf,
                    id: $(el).data('id')
                }, function (data) {
                    $(el).find('.sub-cat-menu').addClass('loaded').html(data);
                });
            }
        });
    });

    if ($('#lang-change').length > 0) {
        $('#lang-change .dropdown-menu a').each(function () {
            $(this).on('click', function (e) {
                e.preventDefault();
                var $this = $(this);
                var locale = $this.data('flag');
                $.post('https://www.mastodonbd.com/language', { _token: AIZ.data.csrf, locale: locale }, function (data) {
                    location.reload();
                });
            });
        });
    }

    if ($('#currency-change').length > 0) {
        $('#currency-change .dropdown-menu a').each(function () {
            $(this).on('click', function (e) {
                e.preventDefault();
                var $this = $(this);
                var currency_code = $this.data('currency');
                $.post('https://www.mastodonbd.com/currency', { _token: AIZ.data.csrf, currency_code: currency_code }, function (data) {
                    location.reload();
                });
            });
        });
    }

    $('#search').on('keyup', function () {
        search();
    });

    $('#search').on('focus', function () {
        search();
    });

    function search() {
        var searchKey = $('#search').val();
        if (searchKey.length > 0) {
            $('body').addClass("typed-search-box-shown");
            $('.typed-search-box').removeClass('d-none');
            $('.search-preloader').removeClass('d-none');
            $.post('https://www.mastodonbd.com/ajax-search', { _token: AIZ.data.csrf, search: searchKey }, function (data) {
                if (data == '0') {
                    $('#search-content').html(null);
                    $('.typed-search-box .search-nothing').removeClass('d-none').html('Sorry, nothing found for <strong>"' + searchKey + '"</strong>');
                    $('.search-preloader').addClass('d-none');
                } else {
                    $('.typed-search-box .search-nothing').addClass('d-none').html(null);
                    $('#search-content').html(data);
                    $('.search-preloader').addClass('d-none');
                }
            });
        } else {
            $('.typed-search-box').addClass('d-none');
            $('body').removeClass("typed-search-box-shown");
        }
    }

    $(".aiz-user-top-menu").on("mouseover", function (event) {
        $(".hover-user-top-menu").addClass('active');
    }).on("mouseout", function (event) {
        $(".hover-user-top-menu").removeClass('active');
    });

    $(document).on("click", function (event) {
        var $trigger = $("#category-menu-bar");
        if ($trigger !== event.target && !$trigger.has(event.target).length) {
            $("#click-category-menu").slideUp("fast");
            $("#category-menu-bar-icon").removeClass('show');
        }
    });

    function updateNavCart(view, count) {
        $('.cart-count').html(count);
        $('#cart_items').html(view);
    }

    function removeFromCart(key) {
        $.post('https://www.mastodonbd.com/cart/removeFromCart', {
            _token: AIZ.data.csrf,
            id: key
        }, function (data) {
            updateNavCart(data.nav_cart_view, data.cart_count);
            $('#cart-summary').html(data.cart_view);
            AIZ.plugins.notify('success', "Item has been removed from cart");
            $('#cart_items_sidenav').html(parseInt($('#cart_items_sidenav').html()) - 1);
        });
    }

    function showLoginModal() {
        $('#login_modal').modal();
    }

    function addToCompare(id) {
        $.post('https://www.mastodonbd.com/compare/addToCompare', { _token: AIZ.data.csrf, id: id }, function (data) {
            $('#compare').html(data);
            AIZ.plugins.notify('success', "Item has been added to compare list");
            $('#compare_items_sidenav').html(parseInt($('#compare_items_sidenav').html()) + 1);
        });
    }

    function addToWishList(id) {
        AIZ.plugins.notify('warning', "Please login first");
    }

    function showAddToCartModal(id) {
        if (!$('#modal-size').hasClass('modal-lg')) {
            $('#modal-size').addClass('modal-lg');
        }
        $('#addToCart-modal-body').html(null);
        $('#addToCart').modal();
        $('.c-preloader').show();
        $.post('https://www.mastodonbd.com/cart/show-cart-modal', { _token: AIZ.data.csrf, id: id }, function (data) {
            $('.c-preloader').hide();
            $('#addToCart-modal-body').html(data);
            AIZ.plugins.slickCarousel();
            AIZ.plugins.zoom();
            AIZ.extra.plusMinus();
            getVariantPrice();
        });
    }

    $('#option-choice-form input').on('change', function () {
        getVariantPrice();
    });

    function getVariantPrice() {
        if ($('#option-choice-form input[name=quantity]').val() > 0 && checkAddToCartValidity()) {
            $.ajax({
                type: "POST",
                url: 'https://www.mastodonbd.com/product/variant-price',
                data: $('#option-choice-form').serializeArray(),
                success: function (data) {
                    $('.product-gallery-thumb .carousel-box').each(function (i) {
                        if ($(this).data('variation') && data.variation == $(this).data('variation')) {
                            $('.product-gallery-thumb').slick('slickGoTo', i);
                        }
                    })

                    $('#option-choice-form #chosen_price_div').removeClass('d-none');
                    $('#option-choice-form #chosen_price_div #chosen_price').html(data.price);
                    $('#available-quantity').html(data.quantity);
                    $('.input-number').prop('max', data.max_limit);
                    if (parseInt(data.in_stock) == 0 && data.digital == 0) {
                        $('.buy-now').addClass('d-none');
                        $('.add-to-cart').addClass('d-none');
                        $('.out-of-stock').removeClass('d-none');
                    } else {
                        $('.buy-now').removeClass('d-none');
                        $('.add-to-cart').removeClass('d-none');
                        $('.out-of-stock').addClass('d-none');
                    }

                    AIZ.extra.plusMinus();
                }
            });
        }
    }

    function checkAddToCartValidity() {
        var names = {};
        $('#option-choice-form input:radio').each(function () { // find unique names
            names[$(this).attr('name')] = true;
        });
        var count = 0;
        $.each(names, function () { // then count them
            count++;
        });

        if ($('#option-choice-form input:radio:checked').length == count) {
            return true;
        }

        return false;
    }

    function addToCart() {
        if (checkAddToCartValidity()) {
            $('#addToCart').modal();
            $('.c-preloader').show();
            $.ajax({
                type: "POST",
                url: 'https://www.mastodonbd.com/cart/addtocart',
                data: $('#option-choice-form').serializeArray(),
                success: function (data) {
                    $('#addToCart-modal-body').html(null);
                    $('.c-preloader').hide();
                    $('#modal-size').removeClass('modal-lg');
                    $('#addToCart-modal-body').html(data.modal_view);
                    AIZ.extra.plusMinus();
                    AIZ.plugins.slickCarousel();
                    updateNavCart(data.nav_cart_view, data.cart_count);
                }
            });
        } else {
            AIZ.plugins.notify('warning', "Please choose all the options");
        }
    }

    function buyNow() {
        if (checkAddToCartValidity()) {
            $('#addToCart-modal-body').html(null);
            $('#addToCart').modal();
            $('.c-preloader').show();
            $.ajax({
                type: "POST",
                url: 'https://www.mastodonbd.com/cart/addtocart',
                data: $('#option-choice-form').serializeArray(),
                success: function (data) {
                    if (data.status == 1) {
                        $('#addToCart-modal-body').html(data.modal_view);
                        updateNavCart(data.nav_cart_view, data.cart_count);
                        window.location.replace("https://www.mastodonbd.com/cart");
                    } else {
                        $('#addToCart-modal-body').html(null);
                        $('.c-preloader').hide();
                        $('#modal-size').removeClass('modal-lg');
                        $('#addToCart-modal-body').html(data.modal_view);
                    }
                }
            });
        } else {
            AIZ.plugins.notify('warning', "Please choose all the options");
        }
    }

    function bid_single_modal(bid_product_id, min_bid_amount) {
        $('#login_modal').modal('show');
    }

    function clickToSlide(btn, id) {
        $('#' + id + ' .aiz-carousel').find('.' + btn).trigger('click');
        $('#' + id + ' .slide-arrow').removeClass('link-disable');
        var arrow = btn == 'slick-prev' ? 'arrow-prev' : 'arrow-next';
        if ($('#' + id + ' .aiz-carousel').find('.' + btn).hasClass('slick-disabled')) {
            $('#' + id).find('.' + arrow).addClass('link-disable');
        }
    }

    function goToView(params) {
        document.getElementById(params).scrollIntoView({ behavior: "smooth", block: "center" });
    }

    function copyCouponCode(code) {
        navigator.clipboard.writeText(code);
        AIZ.plugins.notify('success', "Coupon Code Copied");
    }

    $('.cart-animate').animate({ margin: 0 }, "slow");

    $({ deg: 0 }).animate({ deg: 360 }, {
        duration: 2000,
        step: function (now) {
            $('.cart-rotate').css({
                transform: 'rotate(' + now + 'deg)'
            });
        }
    });

    setTimeout(function () {
        $('.cart-ok').css({ fill: '#d43533' });
    }, 2000);

    if ($('input[name=country_code]').length > 0) {
        // Country Code
        var isPhoneShown = true,
            countryData = window.intlTelInputGlobals.getCountryData(),
            input = document.querySelector("#phone-code");

        for (var i = 0; i < countryData.length; i++) {
            var country = countryData[i];
            if (country.iso2 == 'bd') {
                country.dialCode = '88';
            }
        }

        var iti = intlTelInput(input, {
            separateDialCode: true,
            utilsScript: "https://www.mastodonbd.com/public/assets/js/intlTelutils.js?1590403638580",
            onlyCountries: ["BD"],
            customPlaceholder: function (selectedCountryPlaceholder, selectedCountryData) {
                if (selectedCountryData.iso2 == 'bd') {
                    return "01xxxxxxxxx";
                }
                return selectedCountryPlaceholder;
            }
        });

        var country = iti.getSelectedCountryData();
        $('input[name=country_code]').val(country.dialCode);

        input.addEventListener("countrychange", function (e) {
            var country = iti.getSelectedCountryData();
            $('input[name=country_code]').val(country.dialCode);
        });

        function toggleEmailPhone(el) {
            if (isPhoneShown) {
                $('.phone-form-group').addClass('d-none');
                $('.email-form-group').removeClass('d-none');
                $('input[name=phone]').val(null);
                isPhoneShown = false;
                $(el).html('*Use Phone Number Instead');
            } else {
                $('.phone-form-group').removeClass('d-none');
                $('.email-form-group').addClass('d-none');
                $('input[name=email]').val(null);
                isPhoneShown = true;
                $(el).html('<i>*Use Email Instead</i>');
            }
        }
    }

    var acc = document.getElementsByClassName("aiz-accordion-heading");
    for (var i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function () {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        });
    }

    function showFloatingButtons() {
        document.querySelector('.floating-buttons-section').classList.toggle('show');
    }

    function show_order_details(order_id) {
        $('#order-details-modal-body').html(null);

        if (!$('#modal-size').hasClass('modal-lg')) {
            $('#modal-size').addClass('modal-lg');
        }

        $.post('https://www.mastodonbd.com/admin/orders/details', {
            _token: AIZ.data.csrf,
            order_id: order_id
        }, function (data) {
            $('#order-details-modal-body').html(data);
            $('#order_details').modal();
            $('.c-preloader').hide();
            AIZ.plugins.bootstrapSelect('refresh');
        });
    }
});