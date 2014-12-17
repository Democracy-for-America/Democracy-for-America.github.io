if (!window.console) window.console = {
    log: function() {}
};
(function(e, t) {
    if (!e) return t;
    var n = function() {
        this.el = t;
        this.items = t;
        this.sizes = [];
        this.max = [0, 0];
        this.current = 0;
        this.interval = t;
        this.opts = {
            speed: 500,
            delay: 3e3,
            complete: t,
            keys: !t,
            dots: t,
            fluid: t
        };
        var n = this;
        this.init = function(t, n) {
            this.el = t;
            this.ul = t.children("ul");
            this.max = [t.outerWidth(), t.outerHeight()];
            this.items = this.ul.children("li").each(this.calculate);
            this.opts = e.extend(this.opts, n);
            this.setup();
            return this
        };
        this.calculate = function(t) {
            var r = e(this),
                i = r.outerWidth(),
                s = r.outerHeight();
            n.sizes[t] = [i, s];
            if (i > n.max[0]) n.max[0] = i;
            if (s > n.max[1]) n.max[1] = s
        };
        this.setup = function() {
            this.el.css({
                overflow: "hidden",
                width: n.max[0],
                height: this.items.first().outerHeight()
            });
            this.ul.css({
                width: this.items.length * 100 + "%",
                position: "relative"
            });
            this.items.css("width", 100 / this.items.length + "%");
            if (this.opts.delay !== t) {
                this.start();
                this.el.hover(this.stop, this.start)
            }
            this.opts.keys && e(document).keydown(this.keys);
            this.opts.dots && this.dots();
            if (this.opts.fluid) {
                var r = function() {
                    n.el.css("width", Math.min(Math.round(n.el.outerWidth() / n.el.parent().outerWidth() * 100), 100) + "%")
                };
                r();
                e(window).resize(r)
            }
            if (this.opts.arrows) {
                this.el.parent().append('<p class="arrows"><span class="prev">←</span><span class="next">→</span></p>').find(".arrows span").click(function() {
                    e.isFunction(n[this.className]) && n[this.className]()
                })
            }
            if (e.event.swipe) {
                this.el.on("swipeleft", n.prev).on("swiperight", n.next)
            }
        };
        this.move = function(t, r) {
            if (!this.items.eq(t).length) t = 0;
            if (t < 0) t = this.items.length - 1;
            var i = this.items.eq(t);
            var s = {
                height: i.outerHeight()
            };
            var o = r ? 5 : this.opts.speed;
            if (!this.ul.is(":animated")) {
                n.el.find(".dot:eq(" + t + ")").addClass("active").siblings().removeClass("active");
                this.el.animate(s, o) && this.ul.animate(e.extend({
                    left: "-" + t + "00%"
                }, s), o, function(i) {
                    n.current = t;
                    e.isFunction(n.opts.complete) && !r && n.opts.complete(n.el)
                })
            }
        };
        this.start = function() {
            n.interval = setInterval(function() {
                n.move(n.current + 1)
            }, n.opts.delay)
        };
        this.stop = function() {
            n.interval = clearInterval(n.interval);
            return n
        };
        this.keys = function(t) {
            var r = t.which;
            var i = {
                37: n.prev,
                39: n.next,
                27: n.stop
            };
            if (e.isFunction(i[r])) {
                i[r]()
            }
        };
        this.next = function() {
            return n.stop().move(n.current + 1)
        };
        this.prev = function() {
            return n.stop().move(n.current - 1)
        };
        this.dots = function() {
            var t = '<ol class="dots">';
            e.each(this.items, function(e) {
                t += '<li class="dot' + (e < 1 ? " active" : "") + '">' + (e + 1) + "</li>"
            });
            t += "</ol>";
            this.el.addClass("has-dots").append(t).find(".dot").click(function() {
                n.move(e(this).index())
            })
        }
    };
    e.fn.unslider = function(t) {
        var r = this.length;
        return this.each(function(i) {
            var s = e(this);
            var u = (new n).init(s, t);
            s.data("unslider" + (r > 1 ? "-" + (i + 1) : ""), u)
        })
    }
})(window.jQuery, false);
(function(t) {
    "use strict";

    function e(t, e, r) {
        return t.addEventListener ? t.addEventListener(e, r, !1) : t.attachEvent ? t.attachEvent("on" + e, r) : void 0
    }

    function r(t, e) {
        var r, n;
        for (r = 0, n = t.length; n > r; r++)
            if (t[r] === e) return !0;
        return !1
    }

    function n(t, e) {
        var r;
        t.createTextRange ? (r = t.createTextRange(), r.move("character", e), r.select()) : t.selectionStart && (t.focus(), t.setSelectionRange(e, e))
    }

    function a(t, e) {
        try {
            return t.type = e, !0
        } catch (r) {
            return !1
        }
    }
    t.Placeholders = {
        Utils: {
            addEventListener: e,
            inArray: r,
            moveCaret: n,
            changeType: a
        }
    }
})(this),
function(t) {
    "use strict";

    function e() {}

    function r() {
        try {
            return document.activeElement
        } catch (t) {}
    }

    function n(t, e) {
        var r, n, a = !!e && t.value !== e,
            u = t.value === t.getAttribute(V);
        return (a || u) && "true" === t.getAttribute(P) ? (t.removeAttribute(P), t.value = t.value.replace(t.getAttribute(V), ""), t.className = t.className.replace(R, ""), n = t.getAttribute(z), parseInt(n, 10) >= 0 && (t.setAttribute("maxLength", n), t.removeAttribute(z)), r = t.getAttribute(D), r && (t.type = r), !0) : !1
    }

    function a(t) {
        var e, r, n = t.getAttribute(V);
        return "" === t.value && n ? (t.setAttribute(P, "true"), t.value = n, t.className += " " + I, r = t.getAttribute(z), r || (t.setAttribute(z, t.maxLength), t.removeAttribute("maxLength")), e = t.getAttribute(D), e ? t.type = "text" : "password" === t.type && K.changeType(t, "text") && t.setAttribute(D, "password"), !0) : !1
    }

    function u(t, e) {
        var r, n, a, u, i, l, o;
        if (t && t.getAttribute(V)) e(t);
        else
            for (a = t ? t.getElementsByTagName("input") : f, u = t ? t.getElementsByTagName("textarea") : h, r = a ? a.length : 0, n = u ? u.length : 0, o = 0, l = r + n; l > o; o++) i = r > o ? a[o] : u[o - r], e(i)
    }

    function i(t) {
        u(t, n)
    }

    function l(t) {
        u(t, a)
    }

    function o(t) {
        return function() {
            b && t.value === t.getAttribute(V) && "true" === t.getAttribute(P) ? K.moveCaret(t, 0) : n(t)
        }
    }

    function c(t) {
        return function() {
            a(t)
        }
    }

    function s(t) {
        return function(e) {
            return A = t.value, "true" === t.getAttribute(P) && A === t.getAttribute(V) && K.inArray(C, e.keyCode) ? (e.preventDefault && e.preventDefault(), !1) : void 0
        }
    }

    function d(t) {
        return function() {
            n(t, A), "" === t.value && (t.blur(), K.moveCaret(t, 0))
        }
    }

    function v(t) {
        return function() {
            t === r() && t.value === t.getAttribute(V) && "true" === t.getAttribute(P) && K.moveCaret(t, 0)
        }
    }

    function g(t) {
        return function() {
            i(t)
        }
    }

    function p(t) {
        t.form && (T = t.form, "string" == typeof T && (T = document.getElementById(T)), T.getAttribute(U) || (K.addEventListener(T, "submit", g(T)), T.setAttribute(U, "true"))), K.addEventListener(t, "focus", o(t)), K.addEventListener(t, "blur", c(t)), b && (K.addEventListener(t, "keydown", s(t)), K.addEventListener(t, "keyup", d(t)), K.addEventListener(t, "click", v(t))), t.setAttribute(j, "true"), t.setAttribute(V, x), (b || t !== r()) && a(t)
    }
    var f, h, b, m, A, y, E, x, L, T, S, N, w, B = ["text", "search", "url", "tel", "email", "password", "number", "textarea"],
        C = [27, 33, 34, 35, 36, 37, 38, 39, 40, 8, 46],
        k = "#ccc",
        I = "placeholdersjs",
        R = RegExp("(?:^|\\s)" + I + "(?!\\S)"),
        V = "data-placeholder-value",
        P = "data-placeholder-active",
        D = "data-placeholder-type",
        U = "data-placeholder-submit",
        j = "data-placeholder-bound",
        q = "data-placeholder-focus",
        Q = "data-placeholder-live",
        z = "data-placeholder-maxlength",
        F = document.createElement("input"),
        G = document.getElementsByTagName("head")[0],
        H = document.documentElement,
        J = t.Placeholders,
        K = J.Utils;
    if (J.nativeSupport = void 0 !== F.placeholder, !J.nativeSupport) {
        for (f = document.getElementsByTagName("input"), h = document.getElementsByTagName("textarea"), b = "false" === H.getAttribute(q), m = "false" !== H.getAttribute(Q), y = document.createElement("style"), y.type = "text/css", E = document.createTextNode("." + I + " { color:" + k + "; }"), y.styleSheet ? y.styleSheet.cssText = E.nodeValue : y.appendChild(E), G.insertBefore(y, G.firstChild), w = 0, N = f.length + h.length; N > w; w++) S = f.length > w ? f[w] : h[w - f.length], x = S.attributes.placeholder, x && (x = x.nodeValue, x && K.inArray(B, S.type) && p(S));
        L = setInterval(function() {
            for (w = 0, N = f.length + h.length; N > w; w++) S = f.length > w ? f[w] : h[w - f.length], x = S.attributes.placeholder, x ? (x = x.nodeValue, x && K.inArray(B, S.type) && (S.getAttribute(j) || p(S), (x !== S.getAttribute(V) || "password" === S.type && !S.getAttribute(D)) && ("password" === S.type && !S.getAttribute(D) && K.changeType(S, "text") && S.setAttribute(D, "password"), S.value === S.getAttribute(V) && (S.value = x), S.setAttribute(V, x)))) : S.getAttribute(P) && (n(S), S.removeAttribute(V));
            m || clearInterval(L)
        }, 100)
    }
    K.addEventListener(t, "beforeunload", function() {
        J.disable()
    }), J.disable = J.nativeSupport ? e : i, J.enable = J.nativeSupport ? e : l
}(this),
function(t) {
    "use strict";
    var e = t.fn.val,
        r = t.fn.prop;
    Placeholders.nativeSupport || (t.fn.val = function(t) {
        var r = e.apply(this, arguments),
            n = this.eq(0).data("placeholder-value");
        return void 0 === t && this.eq(0).data("placeholder-active") && r === n ? "" : r
    }, t.fn.prop = function(t, e) {
        return void 0 === e && this.eq(0).data("placeholder-active") && "value" === t ? "" : r.apply(this, arguments)
    })
}(jQuery);

function makeHiddenIframe(src) {
    $('<iframe style="position: absolute; left: -9999px; width: 1px; height: 1px;"></iframe>').attr('src', src).appendTo(document.body)
}

function setRWRCookie(src) {
    var d = new Date();
    d.setTime(d.getTime() + 5 * 365 * 86400 * 1000);
    document.cookie = 'signedRWR=true;path=/;expires=' + d.toGMTString() + ';';
}
$(function() {
    var petitionElems2 = {};
    if ($('#fpetition2').length) {
        petitionElems2 = {
            form2: $('#fpetition2'),
            submit2: $('#fpetition2 button'),
            thanks2: undefined,
            error2: $('.petition-error2, #petition-error2'),
            page1_2: $('#page1_2'),
            page2_2: $('#page2_2')
        };
    }
    $('#fpetition2').append('<input type="hidden" name="json" value="1">').submit(function(event) {
        event.preventDefault();
        if (this.email) {
            var msgs = []
            if (this.name.value == '' || this.name.value == '* Name' || !/.*[a-zA-Z].*\s.*[a-zA-Z].*/.test(this.name.value))
                msgs.push('Name is required');
            if (!/^\S+@\S+\.\S+$/.test(this.email.value))
                msgs.push('A valid e-mail address is required');
            if (!/^\D*\d{5}(-?\d{4})?\D*$/.test(this.zip.value))
                msgs.push('A valid ZIP Code is required');
            if (this.phone && !$('[name=phone][data-optional=1]').length && !/^\D*1?\D*\d{3}\D*\d{3}\D*\d{4}\D*/.test(this.phone.value))
                msgs.push('A valid phone number is required');
            if (msgs.length) {
                alert(msgs.join("\n"))
                return false
            }
        }
        signPetition2();
    });

    function signPetition2() {
        var submit = petitionElems2.submit2
        submit.data('orig-text', submit.text())
        submit.attr('disabled', true).text('Please wait...')
        $.ajax({
            url: petitionElems2.form2.attr('action'),
            data: petitionElems2.form2.serialize(),
            dataType: 'jsonp',
            success: petitionResponseReady2
        });
    }

    function petitionResponseReady2(response) {
        if (response.status != "success") {
            petitionElems2.error.show();
            var submit = petitionElems2.submit;
            submit.removeAttr('disabled').text(submit.data('orig-text'))
        } else {
            if (window.ga) ga('send', 'event', 'signed', '', 'rwr', 1);
            makeHiddenIframe("//www.moveon.org/rwr/signed.html")
            window.moHashedID = response.id
            setRWRCookie()
            petitionElems2.error2.hide();
            if (petitionElems2.thanks2) {
                petitionElems2.thanks2.show("fast");
            } else {
                petitionElems2.page1_2.fadeOut('fast', function() {
                    petitionElems2.page2_2.fadeIn()
                })
            }
        }
    }
    var petitionElems = {};
    if ($('#fpetition').length) {
        petitionElems = {
            form: $('#fpetition'),
            submit: $('#fpetition button'),
            thanks: undefined,
            error: $('.petition-error, #petition-error'),
            page1: $('#page1'),
            page2: $('#page2')
        };
    }
    $('#fpetition').append('<input type="hidden" name="json" value="1">').submit(function(event) {
        event.preventDefault();
        if (this.email) {
            var msgs = []
            if (this.name.value == '' || this.name.value == '* Name' || !/.*[a-zA-Z].*\s.*[a-zA-Z].*/.test(this.name.value))
                msgs.push('First and last names are required');
            if (!/^\S+@\S+\.\S+$/.test(this.email.value))
                msgs.push('A valid e-mail address is required');
            if (!/^\D*\d{5}(-?\d{4})?\D*$/.test(this.zip.value))
                msgs.push('A valid ZIP Code is required');
            if (this.phone && !$('[name=phone][data-optional=1]').length && !/^\D*1?\D*\d{3}\D*\d{3}\D*\d{4}\D*/.test(this.phone.value))
                msgs.push('A valid phone number is required');
            if (msgs.length) {
                alert(msgs.join("\n"))
                return false
            }
        }
        var smsOptIn = $('#sms_optin')
        if (smsOptIn.length) {
            if (smsOptIn.is(':checked')) {
                if (!/^\D*1?\D*\d{3}\D*\d{3}\D*\d{4}\D*/.test($('[name=sms_phone]').val())) {
                    alert("To receive texts, you need to enter a valid mobile phone number.")
                    return false;
                }
                $('.if-sms-optin').show()
            } else {
                var phoneEntered = this.sms_phone.value != '' && this.sms_phone.value != 'Mobile Phone (optional)'
                if (phoneEntered && !/^\D*1?\D*\d{3}\D*\d{3}\D*\d{4}\D*/.test(this.sms_phone.value)) {
                    alert('To receive texts, enter a valid mobile phone number and check the checkbox. If you don\'t want texts, clear your entry in the Mobile Phone box.');
                    return false
                } else if (phoneEntered) {
                    alert('To receive texts, you must check the checkbox beneath the Mobile Phone field. If you don\'t want texts, clear your entry in the Mobile Phone field.')
                    return false
                }
                $('.if-sms-optin').hide()
            }
        }
        signPetition();
    });

    function signPetition() {
        var submit = petitionElems.submit
        submit.data('orig-text', submit.text())
        submit.attr('disabled', true).text('Please wait...')
        $.ajax({
            url: petitionElems.form.attr('action'),
            data: petitionElems.form.serialize(),
            dataType: 'jsonp',
            success: petitionResponseReady
        });
    }

    function petitionResponseReady(response) {
        if (response.result != "success") {
            var errors = response.errors;
            var error_str = '';
            for (var key in errors) {
              error_str = error_str + errors[key] + ' ';
            }
            alert(error_str);
            petitionElems.error.show();
            var submit = petitionElems.submit;
            submit.removeAttr('disabled').text(submit.data('orig-text'))
        } else {
            if (window.ga) ga('send', 'event', 'signed', '', 'rwr', 1);
            makeHiddenIframe("//www.moveon.org/rwr/signed.html")
            window.moHashedID = response.id
            setRWRCookie()
            $('.share-video-optionA, #section-2ndask').hide();
            $('.share-video-optionB').show();
            var redirect_url = $('input[name=redirect_url]').val()
            if (redirect_url) {
                window.location.href = redirect_url
                return
            } else {
                petitionElems.error.hide();
                if (petitionElems.thanks) {
                    petitionElems.thanks.show("fast");
                } else {
                    petitionElems.page1.fadeOut('fast', function() {
                        petitionElems.page2.fadeIn()
                    })
                }
            }
        }
    }
    $(".widget-signup input#email").focus(function() {
        $("body").addClass("widget-signup-is-infocus");
        $(".mail").hide();
        $(".widget-signup div.full").slideDown("slow").removeClass("hidden");
        $('input[type="text"]').css("margin-left", "0");
    });

    function loadPost() {
        $.ajax({
            url: "http://front.moveon.org/api/get_tag_posts/?tag_slug=rwr&callback=&showposts=10",
            crossDomain: true,
            type: "GET",
            dataType: "JSONP",
            success: postLoaded
        });
    }

    function postLoaded(data) {
        var htmlString = "";
        $.each(data.posts, function(i, item) {
            var imageURL = item.thumbnail_images ? item.thumbnail_images.full.url : "http://s3.moveon.org/images/with_dims/fb_ewarren_1200x627.jpg";
            htmlString += '<div class=\"widget-blog\">' + '<article>' + '<div class=\"article-image\"><a href=\"' + item.url + '\"><img src="' + imageURL + '" /></a></div>' + '<div class=\"article-entry\">' + '<h2 class=\"article-title\"><a href=\"' + item.url + '\">' + item.title + '</a></h2>' + item.excerpt + '<div class=\"article-more\"><a href=\"' + item.url + ' \">Read More</a></div>' + '</div>' + '</article>' + '</div>'
        });
        $('#blogposts').html(htmlString);
    }
    loadPost();
    if ($('#blogposts').length) { loadPost(); }

    function loadFeatured() {
        $.ajax({
            url: "//front.moveon.org/api/get_tag_posts/?tag_slug=rwr-featured&callback=&showposts=3",
            crossDomain: true,
            type: "GET",
            dataType: "JSONP",
            count: 2,
            success: featuredReady,
            error: function(data) {
                console.log('error');
            }
        })
    }

    function featuredReady(data) {
        var featured = '';
        $.each(data.posts, function(i, item) {
            var imageURL = item.thumbnail_images ? item.thumbnail_images.full.url : "//s3.moveon.org/images/with_dims/fb_ewarren_1200x627.jpg";
            featured += '<article>' + '<div class=\"article-image\"><a href=\"' + item.url + '\"><img src="' + imageURL + '" /></a></div>' + '<div class=\"article-entry\">' + '<h2 class=\"article-title\"><a href=\"' + item.url + '\">' + item.title + '</a></h2>' + item.excerpt + '<div class=\"article-more\"><a href=\"' + item.url + '\">Read More</a></div>' + '</div>' + '</article>'
        });
        $('#blog-latest').html(featured);
    }
    if ($('#blog-latest').length)
        loadFeatured();
    $(function() {
        function windowSizer() {
            var windowHeight = $(window).height();
            var windowWidth = $(window).width();
            tallNudge = windowHeight - 100;
            shortNudge = windowHeight - 300;
            $('.windowh').css('min-height', windowHeight);
            $('.windoww').css('width', windowWidth);
            $('.tallnudge').css('min-height', tallNudge);
            $('.shortnudge').css('height', shortNudge);
        }
        $(window).bind('load resize', function() {
            windowSizer();
        });

        function turnOffMenu() {
            $('nav').hide();
        }

        function turnOnMenu() {
            $('nav').show();
        }
        var previousScroll = 0;
        if ($('#home').length) {
            $(window).scroll(function() {
                var currentScroll = $(this).scrollTop();
                var documentHeight = $(document).height();
                if (currentScroll < tallNudge) {
                    turnOffMenu();
                } else {
                    turnOnMenu();
                }
                previousScroll = currentScroll;
            });
        }
    });
    $("[data-toggles]").click(function(evt) {
        evt.preventDefault();
        $(this.getAttribute("data-toggles")).toggle('slide', {
            direction: 'left'
        }, 400);
    });
    var url_facebook = 'http://api.facebook.com/method/links.getStats?urls=http://runwarrenrun.org/&rc=fb&format=json';
    var url_twitter = 'http://urls.api.twitter.com/1/urls/count.json?url=runwarrenrun.org&callback=?';
    $.getJSON(url_facebook, function(data) {
        $('span#facebook-count').text(data[0].share_count);
    });
    $.getJSON(url_twitter, function(data) {
        $('span#twitter-count').text(data.count);
    });
    APP_ID_Facebook_EW_Video = '1496493623972757';
    $('a.video-share-link').bind('click', function(e) {
        e.preventDefault();
        var title = 'Run Warren Run!';
        var image_url = 'http://s3.moveon.org/images/youtubea1.png';
        url = "https://www.facebook.com/dialog/feed?app_id=" + APP_ID_Facebook_EW_Video + "&dialog=popup" + "&link=" + encodeURIComponent("https://runwarrenrun.org?v=1#video&rc=fb") + "&name=" + encodeURIComponent(title) + "&caption=" + encodeURIComponent('runwarrenrun.org') + "&description=" + encodeURIComponent('Wondering why Elizabeth Warren would make such a terrific president? Here\'s the scoop.') + "&picture=" + encodeURIComponent(image_url) + "&redirect_uri=http://facebook.com";
        window.open(url);
    });
});
$('.jump-to-top').click(function() {
    $("html, body").animate({
        scrollTop: 0
    }, 600);
    return false;
});

function recordEvent(medium) {
    if (window.ga) ga('send', 'event', 'share', medium, 'rwr', 1);
    if (window.moHashedID) {
        $.ajax({
            url: '/rwr/record_mo_share_click.html',
            data: {
                id: window.moHashedID,
                medium: medium,
                path: window.location.pathname
            }
        });
    }
}

function onShareClicked() {
    var shareType = $(this).attr('data-share-type');
    recordEvent(shareType);
    makeHiddenIframe("//www.moveon.org/rwr/shared.html")
}
$('a[href*="facebook.com/sharer"], a[href*="twitter.com"], a[href*="mailto:"]').each(function() {
    var $btn = $(this);
    var href = $btn.attr('href');
    var rc = 'share';
    if (/facebook/.test(href)) rc = 'fb';
    if (/tw/.test(href)) rc = 'tw';
    if (/mailto/.test(href)) rc = 'mailto';
    $(this).attr('data-share-type', rc).attr('target', '_new').click(onShareClicked);
})
if (/rc=/.test('' + window.location.search)) {
    var argsRCMatch = /\brc=([^&]+)/.exec('' + window.location.search)
    var argsRC = argsRCMatch ? argsRCMatch[1] : undefined;
    if (argsRC) {
        $('[name=trc]').each(function() {
            var $input = $(this)
            var rc = $input.val() || 'rwr';
            $input.val(rc + '.' + argsRC)
        })
    }
}

function rwr_ga_event(category, action, label) {
    if (window.ga) ga('send', 'event', category, action, label, 1)
}
$('.rwr-track-click').on("click", function() {
    var pageclass = $('body').attr('class').split(/\s+/).join('.');
    var ourelement = ($(this).attr('name') !== undefined) ? $(this).attr('name') : $(this).attr('id');
    if (typeof ourelement !== undefined) {
        rwr_ga_event('RWRClicks', pageclass, ourelement);
    }
});