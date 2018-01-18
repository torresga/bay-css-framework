
/*!
 * hoverIntent v1.8.0 // 2014.06.29 // jQuery v1.9.1+
 * http://cherne.net/brian/resources/jquery.hoverIntent.html
 *
 * You may use hoverIntent under the terms of the MIT license. Basically that
 * means you are free to use hoverIntent as long as this header is left intact.
 * Copyright 2007, 2014 Brian Cherne
 */
(function($) {
    $.fn.hoverIntent = function(handlerIn, handlerOut, selector) {
        var cfg = {
            interval: 100,
            sensitivity: 6,
            timeout: 0
        };
        if (typeof handlerIn === "object") {
            cfg = $.extend(cfg, handlerIn)
        } else {
            if ($.isFunction(handlerOut)) {
                cfg = $.extend(cfg, {
                    over: handlerIn,
                    out: handlerOut,
                    selector: selector
                })
            } else {
                cfg = $.extend(cfg, {
                    over: handlerIn,
                    out: handlerIn,
                    selector: handlerOut
                })
            }
        }
        var cX, cY, pX, pY;
        var track = function(ev) {
            cX = ev.pageX;
            cY = ev.pageY
        };
        var compare = function(ev, ob) {
            ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
            if (Math.sqrt((pX - cX) * (pX - cX) + (pY - cY) * (pY - cY)) < cfg.sensitivity) {
                $(ob).off("mousemove.hoverIntent", track);
                ob.hoverIntent_s = true;
                return cfg.over.apply(ob, [ev])
            } else {
                pX = cX;
                pY = cY;
                ob.hoverIntent_t = setTimeout(function() {
                    compare(ev, ob)
                }, cfg.interval)
            }
        };
        var delay = function(ev, ob) {
            ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
            ob.hoverIntent_s = false;
            return cfg.out.apply(ob, [ev])
        };
        var handleHover = function(e) {
            var ev = $.extend({}, e);
            var ob = this;
            if (ob.hoverIntent_t) {
                ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t)
            }
            if (e.type === "mouseenter") {
                pX = ev.pageX;
                pY = ev.pageY;
                $(ob).on("mousemove.hoverIntent", track);
                if (!ob.hoverIntent_s) {
                    ob.hoverIntent_t = setTimeout(function() {
                        compare(ev, ob)
                    }, cfg.interval)
                }
            } else {
                $(ob).off("mousemove.hoverIntent", track);
                if (ob.hoverIntent_s) {
                    ob.hoverIntent_t = setTimeout(function() {
                        delay(ev, ob)
                    }, cfg.timeout)
                }
            }
        };
        return this.on({
            "mouseenter.hoverIntent": handleHover,
            "mouseleave.hoverIntent": handleHover
        }, cfg.selector)
    }
})(jQuery);
/*
 Copyright (c) 2013 Zozo UI
 @author         Zozo UI
 @URL:           http://www.zozoui.com
 */
(function(c) {
    (jQuery.browser = jQuery.browser || {}).mobile = /(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(c) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(c.substr(0,
            4))
})(navigator.userAgent || navigator.vendor || window.opera);
(function(c, b, e, a) {
    b.console || (b.console = {});
    b.console.log || (b.console.log = function() {});
    c.fn.extend({
        hasClasses: function(a) {
            for (i in a)
                if (c(this).hasClass(a[i])) return !0;
            return !1
        }
    });
    c.zozo = {};
    c.zozo.core = {};
    c.zozo.core.console = {
        debug: !1,
        log: function(a) {
            0 != c("#zozo-console").length ? c("<div/>").css({
                marginTop: -24
            }).html(a).prependTo("#zozo-console").animate({
                marginTop: 0
            }, 300).animate({
                backgroundColor: "#ffffff"
            }, 800) : console && !0 === this.debug && console.log(a)
        }
    };
    c.zozo.core.content = {
        debug: !1,
        video: function(a) {
            a &&
            a.find("iframe").each(function() {
                var a = c(this).attr("src"); - 1 === a.indexOf("wmode=transparent") && (-1 != a.indexOf("?") ? c(this).attr("src", a + "&wmode=transparent") : c(this).attr("src", a + "?wmode=transparent"))
            })
        },
        check: function(a) {
            this.video(a)
        }
    };
    c.zozo.core.keyCodes = {
        tab: 9,
        enter: 13,
        esc: 27,
        space: 32,
        pageup: 33,
        pagedown: 34,
        end: 35,
        home: 36,
        left: 37,
        up: 38,
        right: 39,
        down: 40
    };
    c.zozo.core.debug = {
        startTime: new Date,
        log: function(a) {
            console && console.log(a)
        },
        start: function() {
            this.startTime = +new Date;
            this.log("start: " +
                this.startTime)
        },
        stop: function() {
            var a = +new Date,
                b = a - this.startTime;
            this.log("end: " + a);
            this.log("diff: " + b);
            Math.abs(b / 1E3)
        }
    };
    c.zozo.core.support = {
        is_mouse_present: function() {
            return "onmousedown" in b && "onmouseup" in b && "onmousemove" in b && "onclick" in b && "ondblclick" in b && "onmousemove" in b && "onmouseover" in b && "onmouseout" in b && "oncontextmenu" in b
        },
        is_touch_device: function() {
            return ("ontouchstart" in b || 0 < navigator.maxTouchPoints || 0 < navigator.msMaxTouchPoints) && jQuery.browser.mobile
        },
        supportsCss: function() {
            var a =
                    e.createElement("div"),
                b = ["khtml", "ms", "o", "moz", "webkit"],
                k = !1;
            return function(d) {
                d in a.style && (k = d);
                var r = d.replace(/^[a-z]/, function(a) {
                    return a.toUpperCase()
                });
                c.each(b, function(b, c) {
                    c + r in a.style && (k = "-" + c + "-" + d)
                });
                return k
            }
        }(),
        css: {
            transition: !1
        }
    };
    c.zozo.core.utils = {
        toArray: function(a) {
            return c.map(a, function(a, b) {
                return a
            })
        },
        createHeader: function(a, b) {
            var e = c("<li><a>" + a + "</a></li>"),
                d = c("<div>" + b + "</div>");
            return {
                tab: e,
                content: d
            }
        },
        isEmpty: function(a) {
            return !a || 0 === a.length
        },
        isNumber: function(a) {
            return "number" ===
                typeof a && isFinite(a)
        },
        isEven: function(a) {
            return 0 === a % 2
        },
        isOdd: function(a) {
            return 0 !== _number % 2
        },
        animate: function(a, b, e, d, r, p) {
            var m = "none" === a.settings.animation.effects ? 0 : a.settings.animation.duration,
                l = a.settings.animation.easing,
                q = c.zozo.core.support.css.transition;
            b && d && (e && b.css(e), b.css("left"), b.css("top"), "css" === a.settings.animation.type ? (d[q] = "all " + m + "ms ease-in-out", setTimeout(function() {
                b.css(d)
            }), setTimeout(function() {
                r && b.css(r);
                b.css(q, "")
            }, m)) : b.animate(d, {
                duration: m,
                easing: l,
                complete: function() {
                    r &&
                    b.css(r);
                    p && b.hide()
                }
            }));
            return a
        }
    };
    c.zozo.core.plugins = {
        easing: function(a) {
            var b = !1;
            a && a.settings && (c.easing.def ? b = !0 : "swing" != a.settings.animation.easing && "linear" != a.settings.animation.easing && (a.settings.animation.easing = "swing"));
            return b
        }
    };
    c.zozo.core.browser = {
        init: function() {
            this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
            this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "an unknown version";
            c.zozo.core.console.log("init: " +
                this.browser + " : " + this.version);
            if ("Explorer" === this.browser) {
                var a = c("html"),
                    b = parseInt(this.version);
                6 === b ? a.addClass("ie ie7") : 7 === b ? a.addClass("ie ie7") : 8 === b ? a.addClass("ie ie8") : 9 === b && a.addClass("ie ie9")
            }
        },
        isIE: function(a) {
            return c.zozo.core.utils.isNumber(a) ? "Explorer" === this.browser && this.version <= a : "Explorer" === this.browser
        },
        isChrome: function(a) {
            return c.zozo.core.utils.isNumber(a) ? "Chrome" === this.browser && this.version <= a : "Chrome" === this.browser
        },
        searchString: function(a) {
            for (var b = 0; b <
            a.length; b++) {
                var c = a[b].string,
                    d = a[b].prop;
                this.versionSearchString = a[b].versionSearch || a[b].identity;
                if (c) {
                    if (-1 != c.indexOf(a[b].subString)) return a[b].identity
                } else if (d) return a[b].identity
            }
        },
        searchVersion: function(a) {
            var b = a.indexOf(this.versionSearchString);
            if (-1 != b) return parseFloat(a.substring(b + this.versionSearchString.length + 1))
        },
        dataBrowser: [{
            string: navigator.userAgent,
            subString: "Chrome",
            identity: "Chrome"
        }, {
            string: navigator.vendor,
            subString: "Apple",
            identity: "Safari",
            versionSearch: "Version"
        }, {
            prop: b.opera,
            identity: "Opera"
        }, {
            string: navigator.userAgent,
            subString: "Firefox",
            identity: "Firefox"
        }, {
            string: navigator.userAgent,
            subString: "MSIE",
            identity: "Explorer",
            versionSearch: "MSIE"
        }]
    };
    c.zozo.core.hashHelper = {
        all: function() {
            var a = [],
                b = e.location.hash;
            if (!this.hasHash()) return a;
            for (var b = b.substring(1).split("&"), c = 0; c < b.length; c++) {
                var d = b[c].split("=");
                if (2 != d.length || d[0] in a) d[1] = "none";
                a[d[0]] = d[1]
            }
            return a
        },
        get: function(a) {
            var b = this.all();
            return "undefined" === typeof b || 0 > typeof b.length ?
                null : "undefined" !== typeof b[a] && null !== b[a] ? b[a] : null
        },
        set: function(a, b) {
            var c = this.all(),
                d = [];
            c[a] = b;
            for (a in c) d.push(a + "=" + c[a]);
            e.location.hash = d.join("&")
        },
        hasHash: function() {
            return 0 < e.location.hash.length ? !0 : !1
        }
    };
    c.zozo.core.support.css.transition = c.zozo.core.support.supportsCss("transition");
    c.zozo.core.browser.init()
})(jQuery, window, document);
(function(c, b, e, a) {
    var f = function(a, b) {
        this.elem = a;
        this.$elem = c(a);
        this.options = b;
        this.metadata = this.$elem.data("options") ? this.$elem.data("options") : {};
        this.attrdata = this.$elem.data() ? this.$elem.data() : {};
        this.elemID;
        this.$sections;
        this.sectionCount;
        this.$container;
        this.$contents;
        this.autoplayIntervalId;
        this.resizeWindowIntervalId;
        this.currentsection;
        this.browser = c.zozo.core.browser;
        this.responsive;
        this.lastWindowHeight;
        this.lastWindowWidth
    };
    null == b.zozo && (b.zozo = {});
    var h = /,/g,
        k = {
            gray: "gray",
            black: "black",
            blue: "blue",
            white: "white",
            lightblue: "lightblue",
            deepblue: "deepblue",
            crystal: "crystal",
            green: "green",
            yellow: "yellow",
            purple: "purple",
            silver: "silver",
            red: "red",
            orange: "orange",
            clean: "clean2"
        };
    f.prototype = {
        defaults: {
            animation: {
                duration: 400,
                effects: "fadeIn",
                easing: "easeOutQuart",
                type: "jquery"
            },
            autoplay: {
                interval: 0,
                smart: !0
            },
            active: !1,
            activate: function() {},
            bordered: !0,
            cacheAjax: !0,
            contentHeight: 0,
            contentLoad: function() {},
            contentSpacing: 0,
            contentUrls: null,
            contentWidth: 715,
            dotNav: !1,
            contentNav: !1,
            headerFontSize: 1.5,
            event: "click",
            error: function() {},
            expand: function() {},
            expandAfter: !1,
            expandMode: "single",
            grouped: !0,
            headerSize: 40,
            height: 320,
            hideHeaders: !1,
            keyboard: !1,
            minContentWidth: 0,
            minWidth: 480,
            minWindowWidth: 720,
            orientation: "vertical",
            original: {
                width: 0,
                height: 0,
                headerSize: 0,
                headerFontSize: 0,
                sectionSpacing: 0,
                orientation: null
            },
            responsive: !1,
            responsiveDelay: 100,
            rounded: !1,
            scrollable: !1,
            shadows: !0,
            showIcons: !0,
            slider: !1,
            sectionSpacing: 0,
            theme: k.silver,
            urlBased: !1,
            horizontal: {
                headerSize: 40,
                headerFontSize: 1.1,
                sectionSpacing: 8
            },
            vertical: {
                headerSize: 38,
                headerFontSize: 1.1,
                sectionSpacing: 0
            },
            select: function() {},
            width: 960
        },
        init: function() {
            var a = this;
            a.settings = c.extend(!0, {}, a.defaults, a.options, a.metadata, a.attrdata);
            a.currentsection = a.settings.active;
            a.settings.original.width = a.settings.width;
            a.settings.original.height = a.settings.height;
            a.settings.original.headerSize = a.settings.headerSize;
            a.settings.original.orientation = a.settings.orientation;
            a.settings.original.headerFontSize = a.settings.headerFontSize;
            a.settings.original.sectionSpacing =
                a.settings.sectionSpacing;
            "vertical" === a.settings.original.orientation && (a.settings.vertical.headerSize = a.settings.original.headerSize);
            if (!0 === a.settings.slider && (a.$elem.parent().hasClass("z-slider-wrapper") || a.$elem.wrap("<div class='z-slider-wrapper'></div>"), !0 === a.settings.dotNav && !0 === a.settings.slider)) {
                a.$sections = a.$elem.find("> section");
                var b = c("<div class='z-dot-nav'></div>");
                a.$sections.each(function(a, d) {
                    b.append(c("<span class='z-dot-nav-item'></span>"))
                });
                a.$elem.parent().append(b)
            }
            c.zozo.core.plugins.easing(a);
            d.updateClasses(a);
            d.bindEvents(a);
            null != a.settings.contentUrls && a.$sections.each(function(b, d) {
                c(d).find(".z-link").data("contentUrl", a.settings.contentUrls[b])
            });
            !0 === a.settings.responsive && "horizontal" === a.settings.original.orientation ? d.checkWidth(a) : "vertical" === a.settings.orientation ? c.zozo.core.utils.isNumber(a.settings.active) && d.showSection(a, a.settings.active) : d.showSection(a, a.settings.active);
            d.initAutoPlay(a);
            return a
        },
        setOptions: function(a, b) {
            this.settings.active = this.currentsection;
            this.settings = c.extend(!0, this.settings, a);
            d.updateClasses(this, !0);
            d.showSection(this, this.settings.active);
            d.initAutoPlay(this);
            return this
        },
        add: function(a, b, c) {
            a = d.create(a, b);
            a.appendTo(this.$elem);
            d.updateClasses(this);
            d.bindEvent(this, a.find("> h3"));
            return this
        },
        remove: function(a) {
            var b = this;
            b.$sections.eq(a).fadeOut(300, function() {
                c(this).remove();
                d.updateClasses(b)
            });
            return b
        },
        select: function(a) {
            d.showSection(this, a);
            return this
        },
        enable: function(a) {
            a = this.$sections.eq(a);
            a.length && (a.removeClass("z-disabled"),
                a.data("disabled", !1));
            return this
        },
        disable: function(a) {
            a = this.$sections.eq(a);
            a.length && (a.addClass("z-disabled"), a.data("disabled", !0));
            return this
        },
        first: function() {
            this.select(d.getFirst(this));
            return this
        },
        prev: function() {
            var a = parseInt(this.currentsection);
            a <= d.getFirst(this) ? this.select(d.getLast(this)) : this.select(a - 1);
            return this
        },
        next: function(a) {
            a = a ? a : this;
            var b = parseInt(a.currentsection),
                c = d.getLast(a);
            b >= c ? a.select(d.getFirst(a)) : a.select(b + 1);
            return a
        },
        last: function() {
            this.select(d.getLast(this));
            return this
        },
        play: function(a) {
            var b = this;
            if (null == a || 0 > a) a = 2E3;
            b.settings.autoplay.interval = a;
            b.stop();
            b.autoplayIntervalId = setInterval(function() {
                b.next(b)
            }, b.settings.autoplay.interval);
            return b
        },
        stop: function(a) {
            a = a ? a : this;
            clearInterval(a.autoplayIntervalId);
            return a
        },
        expandAll: function(a) {
            return a ? a : this
        },
        collapseAll: function(a) {
            return a ? a : this
        },
        refresh: function() {
            d.checkWidth(this);
            return this
        }
    };
    var d = {
        resetClasses: function(a) {
            a.$elem.find("*").stop(!0, !0);
            a.elemID = a.$elem.attr("id");
            a.$sections =
                a.$elem.find("> section");
            a.sectionCount = a.$sections.length;
            a.settings.contentWidth = a.settings.width - a.sectionCount * (a.settings.headerSize + a.settings.sectionSpacing);
            a.$elem.attr("role", "tablist").removeClass("z-accordion").addClass("z-accordion").removeClass("vertical").removeClass("horizontal").removeClass("z-grouped").removeClass("z-ungrouped").addClass(a.settings.orientation).removeClass("z-rounded").removeClass("z-shadows").removeClass("z-bordered").parents(".z-slider-wrapper").css({
                width: "",
                padding: ""
            });
            a.$elem.css({
                width: "",
                height: ""
            });
            a.$sections.each(function(a, b) {
                var d = c(b);
                d.removeClass("z-first").removeClass("z-last").removeClass("z-active").addClass("z-section").css({
                    margin: "none"
                });
                d.css({
                    left: "",
                    width: "",
                    margin: ""
                });
                d.find("> h3").css({
                    width: "",
                    height: "",
                    lineHeight: ""
                }).find("span").css({
                    width: "",
                    height: "",
                    lineHeight: ""
                });
                d.find("> div").css({
                    height: "",
                    maxHeight: "",
                    width: "",
                    left: "",
                    display: "",
                    margin: "",
                    padding: ""
                }).find("> div").css({
                    height: "",
                    width: "",
                    left: "",
                    display: "",
                    margin: "",
                    padding: ""
                })
            });
            return a
        },
        updateClasses: function(a, b) {
            d.resetClasses(a, b);
            a.$sections.each(function(b, e) {
                var f = c(e),
                    m = f.find("> h3"),
                    t = m.html(),
                    s = f.find("> div"),
                    w = !0 === a.settings.showIcons ? "<span class='z-arrow' style='top:none'></span>" : "";
                m.find("> span.z-title").length || m.text("").append("<span class='z-title'>" + c.trim(t) + "</span>" + w).addClass("z-link");
                d.isTabDisabled(f) && a.disable(b);
                s.addClass("z-content")
            });
            d.setContentSize(a);
            a.$sections.filter("z-first:not(:first-child)").removeClass("z-first");
            a.$sections.filter("z-last:not(:last-child)").removeClass("z-last");
            a.$sections.filter(":first-child").addClass("z-first").find("h3").attr("tabindex", "0").attr("accesskey", "w");
            a.$sections.filter(":last-child").addClass("z-last");
            var e = c.zozo.core.utils.toArray(k);
            c.zozo.core.utils.isEmpty(a.settings.theme) ? a.$elem.hasClasses(e) || a.$elem.addClass(k.silver) : a.$elem.removeClass(e.join().replace(h, " ")).addClass(a.settings.theme);
            a.$elem.addClass("transition");
            !0 === a.settings.contentNav && a.$elem.addClass("z-content-nav");
            !0 === jQuery.browser.mobile && a.$elem.addClass("z-mobile");
            !0 === a.settings.rounded && a.$elem.addClass("z-rounded").parent(".z-slider-wrapper").addClass("z-rounded");
            !0 === a.settings.scrollable && a.$elem.addClass("z-scrollable");
            !0 === a.settings.grouped ? a.$elem.addClass("z-grouped") : a.$elem.addClass("z-ungrouped");
            !0 === a.settings.bordered && a.$elem.addClass("z-bordered");
            !0 === a.settings.shadows && a.$elem.addClass("z-shadows").parent(".z-slider-wrapper").addClass("z-shadows");
            d.addAria(a, {
                index: a.currentsection
            })
        },
        setContentSize: function(a) {
            var b = a.settings.slider,
                d = a.settings.contentNav,
                e = a.settings.orientation,
                f = "vertical" === e && !0 === a.settings.responsive ? a.settings.vertical.sectionSpacing : a.settings.sectionSpacing,
                h = "vertical" === e ? a.settings.vertical.headerSize : a.settings.headerSize,
                g = a.$elem.parents(".z-slider-wrapper"),
                t = c.zozo.core.browser.isIE(8);
            c.zozo.core.browser.isIE(9);
            "horizontal" === e ? (a.settings.contentWidth = 0 < f ? parseInt(a.settings.width - a.sectionCount * (a.settings.headerSize + f - 1)) : a.settings.width -
            a.sectionCount * a.settings.headerSize, a.$elem.css({
                width: 0 < f ? a.settings.width - 1 : a.settings.width,
                height: a.settings.height
            }), g.css({
                width: a.settings.width
            })) : 0 < f ? a.settings.grouped = !1 : a.settings.grouped = !0;
            !0 == b && 0 < f && (g.css({
                padding: f + "px"
            }), "horizontal" === e ? g.css({
                paddingRight: 1,
                paddingBottom: f - 1 + "px"
            }) : g.css({
                paddingTop: "1px",
                paddingBottom: "1px"
            }));
            a.$sections.each(function(s, w) {
                var y = c(w),
                    n = c(w).find("> h3").css({
                        outline: "none",
                        height: h + 1 + "px",
                        lineHeight: h + 2 + "px"
                    }),
                    g = c(w).find("> div");
                t && n.css({
                    height: h +
                    3 + "px"
                }).find("> span.z-title").css({
                    height: a.settings.height + "px"
                });
                if (!y.find(">div>.z-auto-g").length) {
                    var B = c("<div class='z-auto-g'></div>"),
                        D = g.html();
                    g.html("");
                    B.append(D);
                    B.appendTo(g);
                    !0 === a.settings.contentNav && B.find("> ul").addClass("z-sub-nav")
                }
                "horizontal" === e ? (n.css({
                    width: a.settings.height
                }), !0 === b && g.css({
                    height: "100%",
                    margin: 0
                }).find("img").css({
                    margin: a.settings.contentSpacing
                }), !0 === a.settings.responsive && 0 < a.settings.original.headerFontSize && n.css({
                    fontSize: a.settings.headerFontSize +
                    "em"
                })) : (y.css({
                    overflow: "",
                    width: "100%",
                    left: "",
                    display: "block"
                }), (!1 === a.settings.grouped || 0 < f) && y.css({
                    marginTop: f + "px",
                    marginBottom: f + "px"
                }), !0 === a.settings.responsive && 0 < a.settings.vertical.headerFontSize && n.css({
                    fontSize: a.settings.vertical.headerFontSize + "em"
                }));
                if (!0 === b || !0 === d) "horizontal" === e ? g.find(">.z-auto-g").css({
                    paddingLeft: f - 2 + "px"
                }) : g.find(">.z-auto-g").css({
                    paddingTop: f + "px"
                });
                !0 === d && g.find(">.z-auto-g").find("> .z-sub-nav > li:not(:first)").css({
                    marginTop: f + "px"
                })
            })
        },
        bindEvents: function(a) {
            var e = !1;
            c(b).blur(function() {
                e = !1;
                c.zozo.core.console.log("blur: " + e)
            }).focus(function() {
                e = !0;
                c.zozo.core.console.log("focus: " + e)
            });
            a.$elem.focus(function(a) {
                a = c(this);
                var b = a.data("mdown");
                a.removeData("mdown");
                b || a.addClass("z-focus")
            }).blur(function(a) {
                c(this).removeClass("z-focus")
            });
            a.$sections.each(function() {
                var e = c(this),
                    f = e.find("> h3");
                e.find("> .z-content").on("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd", function() {
                    a.settings.animating = !1
                });
                !0 === a.settings.hideHeaders &&
                (f = c(this).find(">div>div>img"));
                if (f.find("a").length) f.on(a.settings.event, function(a) {
                    var d = f.find("a"),
                        e = d.attr("target");
                    c.trim(e).length ? b.open(d.attr("href"), e) : b.location = d.attr("href");
                    a.preventDefault()
                });
                else d.bindEvent(a, f)
            });
            a.$elem.bind("select", a.settings.select);
            a.$elem.bind("expand", a.settings.expand);
            a.$elem.bind("activate", a.settings.activate);
            a.$elem.bind("error", a.settings.error);
            a.$elem.bind("contentLoad", a.settings.contentLoad);
            !0 === a.settings.slider && !0 === a.settings.dotNav &&
            (c(".z-dot-nav span.z-dot-nav-item").each(function() {
                c(this).on("click", function(b) {
                    b.preventDefault();
                    d.showSection(a, c(this).index())
                })
            }), c(".z-nav a.z-next").click(function(b) {
                b.preventDefault();
                d.showSection(a, a.currentsection + 1)
            }), c(".z-nav a.z-prev").click(function(b) {
                b.preventDefault();
                d.showSection(a, a.currentsection - 1)
            }));
            !0 === a.settings.responsive && "horizontal" === a.settings.original.orientation && c(b).resize(function() {
                if (a.lastWindowHeight !== c(b).height() || a.lastWindowWidth !== c(b).width()) clearInterval(a.resizeWindowIntervalId),
                    a.resizeWindowIntervalId = setTimeout(function() {
                        a.lastWindowHeight = c(b).height();
                        a.lastWindowWidth = c(b).width();
                        d.checkWidth(a)
                    }, a.settings.responsiveDelay)
            })
        },
        bindEvent: function(a, b) {
            if (c.zozo.core.support.is_touch_device()) b.on("touchstart", function(b) {
                c(this).on("touchend", function(b) {
                    b.preventDefault();
                    b = c(this).parent().index();
                    a.currentsection = b;
                    !1 !== a.settings.autoplay && null != a.settings.autoplay && !0 === a.settings.autoplay.smart && a.stop();
                    d.showSection(a, b);
                    c(this).off("touchend")
                });
                c(this).on("touchmove",
                    function(a) {
                        c(this).off("touchend")
                    })
            });
            else b.on(a.settings.event, function(b) {
                b.preventDefault();
                b = c(this).parent().index();
                a.currentsection = b;
                !1 !== a.settings.autoplay && null != a.settings.autoplay && !0 === a.settings.autoplay.smart && a.stop();
                d.showSection(a, b)
            });
            !0 === a.settings.keyboard && b.on("keyup", function(b) {
                b.preventDefault();
                var e = c(this);
                b = b.keyCode || b.which;
                var f = e.parent().index(),
                    e = e.parent().index(),
                    p = a.sectionCount;
                if (b == c.zozo.core.keyCodes.space || b == c.zozo.core.keyCodes.enter) d.showSection(a,
                    e);
                else if (b >= c.zozo.core.keyCodes.end || b <= c.zozo.core.keyCodes.down) b === c.zozo.core.keyCodes.home ? e = 0 : b === c.zozo.core.keyCodes.end ? e = p - 1 : b === c.zozo.core.keyCodes.up || b === c.zozo.core.keyCodes.left ? e-- : b !== c.zozo.core.keyCodes.down && b !== c.zozo.core.keyCodes.right || e++, e != f && (-1 === e && (e = p - 1), e === p && b != c.zozo.core.keyCodes.end && (e = 0), a.$sections.find("> h3").eq(e).focus())
            }).mousedown(function(a) {
                a = c(this);
                a.is(":focus") || a.data("mdown", !0)
            }).focus(function(a) {
                a = c(this);
                var b = a.data("mdown");
                a.removeData("mdown");
                b || a.addClass("z-focus")
            }).blur(function(a) {
                c(this).removeClass("z-focus")
            })
        },
        checkWidth: function(a) {
            var f = c(b).width(),
                m = a.settings.minWidth,
                l = a.settings.minWindowWidth,
                q = a.$elem.parents(".z-slider-wrapper"),
                h = a.$elem;
            q.length && (h = q);
            a.settings.width = h.hide().parent().outerWidth() - 2;
            c(e).height() > c(b).height() && !0 === a.settings.slider && 0 < a.settings.sectionSpacing && (a.settings.width -= a.settings.width / a.settings.original.width * a.settings.sectionSpacing);
            h.show();
            a.settings.width > a.settings.original.width ?
                (a.settings.width = a.settings.original.width, a.settings.height = a.settings.original.height, a.settings.headerSize = a.settings.original.headerSize, a.settings.headerFontSize = a.settings.original.headerFontSize, a.settings.sectionSpacing = a.settings.original.sectionSpacing) : (q = a.settings.width / a.settings.original.width, a.settings.height = parseInt(q * a.settings.original.height), a.settings.headerSize = q * a.settings.original.headerSize, a.settings.headerFontSize = q * a.settings.original.headerFontSize, a.settings.sectionSpacing =
                q * a.settings.original.sectionSpacing);
            console.log("accordionWidth: " + a.settings.width + " / " + m + " windowWidth: " + f + " / " + l);
            f <= l || a.settings.width <= m ? (a.settings.width = a.settings.original.width, a.settings.height = a.settings.original.height, a.settings.headerSize = a.settings.original.headerSize, a.settings.headerFontSize = a.settings.original.headerFontSize, a.settings.sectionSpacing = a.settings.vertical.sectionSpacing, d.changeOrientation(a, "vertical")) : d.changeOrientation(a, "horizontal")
        },
        changeOrientation: function(a,
                                    b) {
            d.setContentSize(a);
            b != a.settings.orientation ? (a.settings.orientation = b, a.setOptions({
                orientation: b
            })) : d.showSection(a, a.currentsection, !0)
        },
        showSection: function(a, b, e) {
            var f = a.$elem.find("> section").eq(b);
            b = {
                index: c.zozo.core.utils.isNumber(b) ? b : 0,
                section: f,
                enabled: !1 === d.isTabDisabled(f),
                head: f.find("> h3"),
                link: f.find(".z-link"),
                content: f.find("> .z-content"),
                contentInner: f.find("> .z-content > .z-auto-g"),
                contentUrl: f.find(".z-link").data("contentUrl"),
                noAnimation: e
            };
            b.enabled && (a.settings.select &&
            typeof a.settings.select == typeof Function && a.$elem.trigger("select", {
                header: b.link[0],
                content: b.contentInner[0],
                index: b.index
            }), b.contentUrl ? "vertical" === a.settings.orientation ? d.ajaxRequest(a, b, d.showVertical) : d.ajaxRequest(a, b, d.showHorizontal) : "vertical" === a.settings.orientation ? d.showVertical(a, b) : d.showHorizontal(a, b), d.updateDotNav(a, b), d.addAria(a, b), a.currentsection = b.index, a.settings.activate && typeof a.settings.activate == typeof Function && a.$elem.trigger("activate", {
                header: b.link[0],
                content: b.contentInner[0],
                index: b.index
            }));
            return a
        },
        showHorizontal: function(a, b) {
            var e = "vertical" === a.settings.orientation ? a.settings.vertical.sectionSpacing : a.settings.sectionSpacing,
                f = a.settings.headerSize,
                q = a.settings.contentWidth,
                h = 0 < e ? e - 1 : e,
                g = 0,
                t = b.index,
                s = c.zozo.core.browser.isIE(8);
            a.$sections.each(function(e, y) {
                var n, A = c(y),
                    m = A.find("> h3"),
                    D = A.find("> .z-content");
                0 < e && (g = g + f + h);
                n = g;
                e === t && (g += q);
                a.$elem.find("section.z-active > .z-content").parent().removeClass("z-active");
                a.$elem.find("section > .z-content").eq(t).parent().toggleClass("z-active");
                0 < h && m.find("> span.z-title").css({
                    height: f + 2
                });
                s && m.find("> span.z-title").css({
                    height: a.settings.height + "px"
                });
                var m = q + f + 2,
                    x = 0 === h ? f : f + 3;
                !0 == s && 0 < h && (x += 1);
                !0 == s && 0 === h && (x += 1);
                !0 === b.noAnimation ? (A.stop().css({
                    left: n,
                    width: m
                }), D.css({
                    left: x,
                    width: "auto",
                    overflow: "",
                    display: ""
                })) : (d.animate(a, A.stop(), null, {
                    left: n,
                    width: m
                }), d.animate(a, D.stop(), {
                    left: x,
                    display: ""
                }, {
                    width: "auto"
                }, {
                    overflow: ""
                }))
            });
            return a
        },
        showVertical: function(a, b) {
            if ("undefined" === typeof b.noAnimation || null == b.noAnimation) {
                var e =
                        a.settings.contentHeight,
                    f = a.settings.animation.duration;
                if (b.section.hasClass("z-active")) setTimeout(function() {
                    b.section.removeClass("z-active")
                }, f), d.animate(a, b.content, null, {
                    height: "0",
                    overflow: ""
                });
                else {
                    "single" === a.settings.expandMode && a.$sections.each(function() {
                        d.animate(a, c(this).removeClass("z-active").find("> .z-content").stop(), null, {
                            height: "0",
                            overflow: ""
                        })
                    });
                    var h = 0 >= e ? d.getElementSize(b.content).height : e,
                        k = {
                            height: "auto"
                        };
                    0 < e && (setTimeout(function() {
                            b.content.css({
                                overflow: "auto"
                            })
                        },
                        f), k = null);
                    d.animate(a, b.content.stop(), null, {
                        height: h
                    }, k);
                    b.section.addClass("z-active")
                }
            }
            return a
        },
        updateDotNav: function(a, b) {
            if (!0 === a.settings.slider) {
                var d = a.$elem.parent();
                d.find(".z-dot-nav .z-active").removeClass("z-active");
                d.find(".z-dot-nav span.z-dot-nav-item").eq(b.index).toggleClass("z-active")
            }
        },
        addAria: function(a, b) {
            a.$sections.each(function(d, e) {
                var f = c(e),
                    h = f.find("> h3"),
                    g = f.find("> div"),
                    t = f.hasClass("z-active");
                c.zozo.core.console.log("currentsection: " + a.currentsection + " index: " +
                    b.index + " expanded: " + t);
                f.attr({
                    "aria-hidden": (!t).toString(),
                    "aria-expanded": t.toString(),
                    "aria-selected": t.toString()
                });
                h.attr({
                    "aria-controls": a.elemID + "-" + (d + 1),
                    role: "tab",
                    tabindex: "-1"
                });
                g.attr({
                    id: a.elemID + "-" + (d + 1),
                    role: "tabpanel",
                    "aria-hidden": (!t).toString(),
                    "aria-expanded": t.toString()
                })
            });
            return a
        },
        ajaxRequest: function(a, b, d) {
            if (b.section.hasClass("z-active")) d && typeof d == typeof Function && d(a, b);
            else {
                var e = setTimeout(function() {
                    b.link.find(".z-arrow").addClass("z-loading")
                }, 100);
                c.ajax({
                    type: "GET",
                    cache: !0 === a.settings.cacheAjax,
                    url: b.contentUrl,
                    dataType: "html",
                    data: {},
                    beforeSend: function(a, b) {},
                    error: function(d, c, e) {
                        404 == d.status ? b.contentInner.html("<h4 style='color:red;'>Sorry, error: 404 - the requested content could not be found.</h4>") : b.contentInner.html("<h4 style='color:red;'>An error occurred: " + c + "\nError: " + d + " code: " + d.status + "</h4>");
                        a.settings.error && typeof a.settings.error == typeof Function && a.$elem.trigger("error", d)
                    },
                    complete: function(c, f) {
                        clearTimeout(e);
                        b.link.find(".z-arrow").removeClass("z-loading");
                        d && typeof d == typeof Function && d(a, b)
                    },
                    success: function(d, c, e) {
                        b.contentInner.html(d);
                        a.settings.contentLoad && typeof a.settings.contentLoad == typeof Function && a.$elem.trigger("contentLoad", {
                            header: b.link[0],
                            content: b.contentInner[0],
                            index: b.index
                        })
                    }
                })
            }
            return a
        },
        getFirst: function(a) {
            return 0
        },
        getLast: function(a) {
            return parseInt(a.$sections.size()) - 1
        },
        initAutoPlay: function(a) {
            !1 !== a.settings.autoplay && null != a.settings.autoplay ? 0 < a.settings.autoplay.interval ? (a.stop(), a.autoplayIntervalId = setInterval(function() {
                    a.next(a)
                },
                a.settings.autoplay.interval)) : a.stop() : a.stop()
        },
        animate: function(a, b, d, e, f, h) {
            c.zozo.core.utils.animate(a, b, d, e, f, h)
        },
        getElementSize: function(a) {
            var b = {
                width: 0,
                height: 0
            };
            if (null == a || 0 == a.length) return b;
            0 === a.css("height") || "0px" === a.css("height") ? (a.css({
                height: "auto"
            }), b.height = a.innerHeight(), b.width = a.outerWidth(), a.css("height", "0px")) : (a.css("height"), b.height = a.innerHeight(), b.width = a.outerWidth());
            return b
        },
        isTabDisabled: function(a) {
            return a.hasClass("z-disabled") || !0 === a.data("disabled")
        },
        create: function(a, b) {
            return c("<section><h3>" + a + "</h3><div>" + b + "</div></section")
        }
    };
    f.defaults = f.prototype.defaults;
    c.fn.zozoAccordion = function(b) {
        return this.each(function() {
            if (a == c(this).data("zozoAccordion")) {
                var d = (new f(this, b)).init();
                c(this).data("zozoAccordion", d)
            }
        })
    };
    b.zozo.accordion = f;
    c(e).ready(function() {
        c("[data-role='z-accordion']").each(function(a, b) {
            c(b).zozoAccordion() || c(b).zozoAccordion();
            c(b).find("[data-role='z-accordion']").each(function(a, b) {
                c(b).zozoAccordion() || c(b).zozoAccordion();
                c(b).find("[data-role='z-accordion']").each(function(a, b) {
                    c(b).zozoAccordion() || c(b).zozoAccordion();
                    c(b).find("[data-role='z-accordion']").each(function(a, b) {
                        c(b).zozoAccordion() || c(b).zozoAccordion()
                    })
                })
            })
        })
    })
})(jQuery, window, document);
(function(c) {
    c.flexslider = function(b, e) {
        var a = c(b);
        a.vars = c.extend({}, c.flexslider.defaults, e);
        var f = a.vars.namespace,
            h = window.navigator && window.navigator.msPointerEnabled && window.MSGesture,
            k = ("ontouchstart" in window || h || window.DocumentTouch && document instanceof DocumentTouch) && a.vars.touch,
            d = "",
            r, p = "vertical" === a.vars.direction,
            m = a.vars.reverse,
            l = 0 < a.vars.itemWidth,
            q = "fade" === a.vars.animation,
            u = "" !== a.vars.asNavFor,
            g = {};
        c.data(b, "flexslider", a);
        g = {
            init: function() {
                a.animating = !1;
                a.currentSlide = parseInt(a.vars.startAt ?
                    a.vars.startAt : 0, 10);
                isNaN(a.currentSlide) && (a.currentSlide = 0);
                a.animatingTo = a.currentSlide;
                a.atEnd = 0 === a.currentSlide || a.currentSlide === a.last;
                a.containerSelector = a.vars.selector.substr(0, a.vars.selector.search(" "));
                a.slides = c(a.vars.selector, a);
                a.container = c(a.containerSelector, a);
                a.count = a.slides.length;
                a.syncExists = 0 < c(a.vars.sync).length;
                "slide" === a.vars.animation && (a.vars.animation = "swing");
                a.prop = p ? "top" : "marginLeft";
                a.args = {};
                a.manualPause = !1;
                a.stopped = !1;
                a.started = !1;
                a.startTimeout = null;
                a.transitions = !a.vars.video && !q && a.vars.useCSS && function() {
                        var b = document.createElement("div"),
                            s = ["perspectiveProperty", "WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"],
                            d;
                        for (d in s)
                            if (void 0 !== b.style[s[d]]) return a.pfx = s[d].replace("Perspective", "").toLowerCase(), a.prop = "-" + a.pfx + "-transform", !0;
                        return !1
                    }();
                "" !== a.vars.controlsContainer && (a.controlsContainer = 0 < c(a.vars.controlsContainer).length && c(a.vars.controlsContainer));
                "" !== a.vars.manualControls && (a.manualControls = 0 < c(a.vars.manualControls).length &&
                    c(a.vars.manualControls));
                a.vars.randomize && (a.slides.sort(function() {
                    return Math.round(Math.random()) - 0.5
                }), a.container.empty().append(a.slides));
                a.doMath();
                a.setup("init");
                a.vars.controlNav && g.controlNav.setup();
                a.vars.directionNav && g.directionNav.setup();
                a.vars.keyboard && (1 === c(a.containerSelector).length || a.vars.multipleKeyboard) && c(document).bind("keyup", function(b) {
                    b = b.keyCode;
                    a.animating || 39 !== b && 37 !== b || (b = 39 === b ? a.getTarget("next") : 37 === b ? a.getTarget("prev") : !1, a.flexAnimate(b, a.vars.pauseOnAction))
                });
                a.vars.mousewheel && a.bind("mousewheel", function(b, s, d, c) {
                    b.preventDefault();
                    b = 0 > s ? a.getTarget("next") : a.getTarget("prev");
                    a.flexAnimate(b, a.vars.pauseOnAction)
                });
                a.vars.pausePlay && g.pausePlay.setup();
                a.vars.slideshow && a.vars.pauseInvisible && g.pauseInvisible.init();
                a.vars.slideshow && (a.vars.pauseOnHover && a.hover(function() {
                    a.manualPlay || a.manualPause || a.pause()
                }, function() {
                    a.manualPause || a.manualPlay || a.stopped || a.play()
                }), a.vars.pauseInvisible && g.pauseInvisible.isHidden() || (0 < a.vars.initDelay ? a.startTimeout =
                    setTimeout(a.play, a.vars.initDelay) : a.play()));
                u && g.asNav.setup();
                k && a.vars.touch && g.touch();
                (!q || q && a.vars.smoothHeight) && c(window).bind("resize orientationchange focus", g.resize);
                a.find("img").attr("draggable", "false");
                setTimeout(function() {
                    a.vars.start(a)
                }, 200)
            },
            asNav: {
                setup: function() {
                    a.asNav = !0;
                    a.animatingTo = Math.floor(a.currentSlide / a.move);
                    a.currentItem = a.currentSlide;
                    a.slides.removeClass(f + "active-slide").eq(a.currentItem).addClass(f + "active-slide");
                    if (h) b._slider = a, a.slides.each(function() {
                        this._gesture =
                            new MSGesture;
                        this._gesture.target = this;
                        this.addEventListener("MSPointerDown", function(a) {
                            a.preventDefault();
                            a.currentTarget._gesture && a.currentTarget._gesture.addPointer(a.pointerId)
                        }, !1);
                        this.addEventListener("MSGestureTap", function(b) {
                            b.preventDefault();
                            b = c(this);
                            var d = b.index();
                            c(a.vars.asNavFor).data("flexslider").animating || b.hasClass("active") || (a.direction = a.currentItem < d ? "next" : "prev", a.flexAnimate(d, a.vars.pauseOnAction, !1, !0, !0))
                        })
                    });
                    else a.slides.on("click touchend MSPointerUp", function(b) {
                        b.preventDefault();
                        b = c(this);
                        var d = b.index();
                        0 >= b.offset().left - c(a).scrollLeft() && b.hasClass(f + "active-slide") ? a.flexAnimate(a.getTarget("prev"), !0) : c(a.vars.asNavFor).data("flexslider").animating || b.hasClass(f + "active-slide") || (a.direction = a.currentItem < d ? "next" : "prev", a.flexAnimate(d, a.vars.pauseOnAction, !1, !0, !0))
                    })
                }
            },
            controlNav: {
                setup: function() {
                    a.manualControls ? g.controlNav.setupManual() : g.controlNav.setupPaging()
                },
                setupPaging: function() {
                    var b = 1,
                        s, e;
                    a.controlNavScaffold = c('<ol class="' + f + "control-nav " + f + ("thumbnails" ===
                        a.vars.controlNav ? "control-thumbs" : "control-paging") + '"></ol>');
                    if (1 < a.pagingCount)
                        for (var y = 0; y < a.pagingCount; y++) e = a.slides.eq(y), s = "thumbnails" === a.vars.controlNav ? '<img src="' + e.attr("data-thumb") + '"/>' : "<a>" + b + "</a>", "thumbnails" === a.vars.controlNav && !0 === a.vars.thumbCaptions && (e = e.attr("data-thumbcaption"), "" != e && void 0 != e && (s += '<span class="' + f + 'caption">' + e + "</span>")), a.controlNavScaffold.append("<li>" + s + "</li>"), b++;
                    a.controlsContainer ? c(a.controlsContainer).append(a.controlNavScaffold) :
                        a.append(a.controlNavScaffold);
                    g.controlNav.set();
                    g.controlNav.active();
                    a.controlNavScaffold.delegate("a, img", "click touchend MSPointerUp", function(b) {
                        b.preventDefault();
                        if ("" === d || d === b.type) {
                            var s = c(this),
                                e = a.controlNav.index(s);
                            s.hasClass(f + "active") || (a.direction = e > a.currentSlide ? "next" : "prev", a.flexAnimate(e, a.vars.pauseOnAction))
                        }
                        "" === d && (d = b.type);
                        g.setToClearWatchedEvent()
                    })
                },
                setupManual: function() {
                    a.controlNav = a.manualControls;
                    g.controlNav.active();
                    a.controlNav.bind("click touchend MSPointerUp",
                        function(b) {
                            b.preventDefault();
                            if ("" === d || d === b.type) {
                                var s = c(this),
                                    e = a.controlNav.index(s);
                                s.hasClass(f + "active") || (e > a.currentSlide ? a.direction = "next" : a.direction = "prev", a.flexAnimate(e, a.vars.pauseOnAction))
                            }
                            "" === d && (d = b.type);
                            g.setToClearWatchedEvent()
                        })
                },
                set: function() {
                    a.controlNav = c("." + f + "control-nav li " + ("thumbnails" === a.vars.controlNav ? "img" : "a"), a.controlsContainer ? a.controlsContainer : a)
                },
                active: function() {
                    a.controlNav.removeClass(f + "active").eq(a.animatingTo).addClass(f + "active")
                },
                update: function(b,
                                 d) {
                    1 < a.pagingCount && "add" === b ? a.controlNavScaffold.append(c("<li><a>" + a.count + "</a></li>")) : 1 === a.pagingCount ? a.controlNavScaffold.find("li").remove() : a.controlNav.eq(d).closest("li").remove();
                    g.controlNav.set();
                    1 < a.pagingCount && a.pagingCount !== a.controlNav.length ? a.update(d, b) : g.controlNav.active()
                }
            },
            directionNav: {
                setup: function() {
                    var b = c('<ul class="' + f + 'direction-nav"><li><a class="' + f + 'prev" href="#">' + a.vars.prevText + '</a></li><li><a class="' + f + 'next" href="#">' + a.vars.nextText + "</a></li></ul>");
                    a.controlsContainer ? (c(a.controlsContainer).append(b), a.directionNav = c("." + f + "direction-nav li a", a.controlsContainer)) : (a.append(b), a.directionNav = c("." + f + "direction-nav li a", a));
                    g.directionNav.update();
                    a.directionNav.bind("click touchend MSPointerUp", function(b) {
                        b.preventDefault();
                        var e;
                        if ("" === d || d === b.type) e = c(this).hasClass(f + "next") ? a.getTarget("next") : a.getTarget("prev"), a.flexAnimate(e, a.vars.pauseOnAction);
                        "" === d && (d = b.type);
                        g.setToClearWatchedEvent()
                    })
                },
                update: function() {
                    var b = f + "disabled";
                    1 === a.pagingCount ? a.directionNav.addClass(b).attr("tabindex", "-1") : a.vars.animationLoop ? a.directionNav.removeClass(b).removeAttr("tabindex") : 0 === a.animatingTo ? a.directionNav.removeClass(b).filter("." + f + "prev").addClass(b).attr("tabindex", "-1") : a.animatingTo === a.last ? a.directionNav.removeClass(b).filter("." + f + "next").addClass(b).attr("tabindex", "-1") : a.directionNav.removeClass(b).removeAttr("tabindex")
                }
            },
            pausePlay: {
                setup: function() {
                    var b = c('<div class="' + f + 'pauseplay"><a></a></div>');
                    a.controlsContainer ?
                        (a.controlsContainer.append(b), a.pausePlay = c("." + f + "pauseplay a", a.controlsContainer)) : (a.append(b), a.pausePlay = c("." + f + "pauseplay a", a));
                    g.pausePlay.update(a.vars.slideshow ? f + "pause" : f + "play");
                    a.pausePlay.bind("click touchend MSPointerUp", function(b) {
                        b.preventDefault();
                        if ("" === d || d === b.type) c(this).hasClass(f + "pause") ? (a.manualPause = !0, a.manualPlay = !1, a.pause()) : (a.manualPause = !1, a.manualPlay = !0, a.play());
                        "" === d && (d = b.type);
                        g.setToClearWatchedEvent()
                    })
                },
                update: function(b) {
                    "play" === b ? a.pausePlay.removeClass(f +
                        "pause").addClass(f + "play").html(a.vars.playText) : a.pausePlay.removeClass(f + "play").addClass(f + "pause").html(a.vars.pauseText)
                }
            },
            touch: function() {
                var d, s, c, e, n, f, g = !1,
                    D = 0,
                    x = 0,
                    k = 0;
                if (h) {
                    b.style.msTouchAction = "none";
                    b._gesture = new MSGesture;
                    b._gesture.target = b;
                    b.addEventListener("MSPointerDown", r, !1);
                    b._slider = a;
                    b.addEventListener("MSGestureChange", u, !1);
                    b.addEventListener("MSGestureEnd", C, !1);
                    var r = function(d) {
                            d.stopPropagation();
                            a.animating ? d.preventDefault() : (a.pause(), b._gesture.addPointer(d.pointerId),
                                k = 0, e = p ? a.h : a.w, f = Number(new Date), c = l && m && a.animatingTo === a.last ? 0 : l && m ? a.limit - (a.itemW + a.vars.itemMargin) * a.move * a.animatingTo : l && a.currentSlide === a.last ? a.limit : l ? (a.itemW + a.vars.itemMargin) * a.move * a.currentSlide : m ? (a.last - a.currentSlide + a.cloneOffset) * e : (a.currentSlide + a.cloneOffset) * e)
                        },
                        u = function(a) {
                            a.stopPropagation();
                            var d = a.target._slider;
                            if (d) {
                                var s = -a.translationX,
                                    t = -a.translationY;
                                n = k += p ? t : s;
                                g = p ? Math.abs(k) < Math.abs(-s) : Math.abs(k) < Math.abs(-t);
                                if (a.detail === a.MSGESTURE_FLAG_INERTIA) setImmediate(function() {
                                    b._gesture.stop()
                                });
                                else if (!g || 500 < Number(new Date) - f) a.preventDefault(), !q && d.transitions && (d.vars.animationLoop || (n = k / (0 === d.currentSlide && 0 > k || d.currentSlide === d.last && 0 < k ? Math.abs(k) / e + 2 : 1)), d.setProps(c + n, "setTouch"))
                            }
                        },
                        C = function(a) {
                            a.stopPropagation();
                            if (a = a.target._slider) {
                                if (a.animatingTo === a.currentSlide && !g && null !== n) {
                                    var b = m ? -n : n,
                                        h = 0 < b ? a.getTarget("next") : a.getTarget("prev");
                                    a.canAdvance(h) && (550 > Number(new Date) - f && 50 < Math.abs(b) || Math.abs(b) > e / 2) ? a.flexAnimate(h, a.vars.pauseOnAction) : q || a.flexAnimate(a.currentSlide,
                                        a.vars.pauseOnAction, !0)
                                }
                                c = n = s = d = null;
                                k = 0
                            }
                        }
                } else {
                    b.addEventListener("touchstart", M, !1);
                    var M = function(n) {
                            if (a.animating) n.preventDefault();
                            else if (window.navigator.msPointerEnabled || 1 === n.touches.length) a.pause(), e = p ? a.h : a.w, f = Number(new Date), D = n.touches[0].pageX, x = n.touches[0].pageY, c = l && m && a.animatingTo === a.last ? 0 : l && m ? a.limit - (a.itemW + a.vars.itemMargin) * a.move * a.animatingTo : l && a.currentSlide === a.last ? a.limit : l ? (a.itemW + a.vars.itemMargin) * a.move * a.currentSlide : m ? (a.last - a.currentSlide + a.cloneOffset) *
                            e : (a.currentSlide + a.cloneOffset) * e, d = p ? x : D, s = p ? D : x, b.addEventListener("touchmove", G, !1), b.addEventListener("touchend", z, !1)
                        },
                        G = function(b) {
                            D = b.touches[0].pageX;
                            x = b.touches[0].pageY;
                            n = p ? d - x : d - D;
                            g = p ? Math.abs(n) < Math.abs(D - s) : Math.abs(n) < Math.abs(x - s);
                            if (!g || 500 < Number(new Date) - f) b.preventDefault(), !q && a.transitions && (a.vars.animationLoop || (n /= 0 === a.currentSlide && 0 > n || a.currentSlide === a.last && 0 < n ? Math.abs(n) / e + 2 : 1), a.setProps(c + n, "setTouch"))
                        },
                        z = function(h) {
                            b.removeEventListener("touchmove", G, !1);
                            if (a.animatingTo ===
                                a.currentSlide && !g && null !== n) {
                                h = m ? -n : n;
                                var l = 0 < h ? a.getTarget("next") : a.getTarget("prev");
                                a.canAdvance(l) && (550 > Number(new Date) - f && 50 < Math.abs(h) || Math.abs(h) > e / 2) ? a.flexAnimate(l, a.vars.pauseOnAction) : q || a.flexAnimate(a.currentSlide, a.vars.pauseOnAction, !0)
                            }
                            b.removeEventListener("touchend", z, !1);
                            c = n = s = d = null
                        }
                }
            },
            resize: function() {
                !a.animating && a.is(":visible") && (l || a.doMath(), q ? g.smoothHeight() : l ? (a.slides.width(a.computedW), a.update(a.pagingCount), a.setProps()) : p ? (a.viewport.height(a.h), a.setProps(a.h,
                    "setTotal")) : (a.vars.smoothHeight && g.smoothHeight(), a.newSlides.width(a.computedW), a.setProps(a.computedW, "setTotal")))
            },
            smoothHeight: function(b) {
                if (!p || q) {
                    var d = q ? a : a.viewport;
                    b ? d.animate({
                        height: a.slides.eq(a.animatingTo).height()
                    }, b) : d.height(a.slides.eq(a.animatingTo).height())
                }
            },
            sync: function(b) {
                var d = c(a.vars.sync).data("flexslider"),
                    e = a.animatingTo;
                switch (b) {
                    case "animate":
                        d.flexAnimate(e, a.vars.pauseOnAction, !1, !0);
                        break;
                    case "play":
                        d.playing || d.asNav || d.play();
                        break;
                    case "pause":
                        d.pause()
                }
            },
            uniqueID: function(a) {
                a.find("[id]").each(function() {
                    var a = c(this);
                    a.attr("id", a.attr("id") + "_clone")
                });
                return a
            },
            pauseInvisible: {
                visProp: null,
                init: function() {
                    var b = ["webkit", "moz", "ms", "o"];
                    if ("hidden" in document) return "hidden";
                    for (var d = 0; d < b.length; d++) b[d] + "Hidden" in document && (g.pauseInvisible.visProp = b[d] + "Hidden");
                    g.pauseInvisible.visProp && (b = g.pauseInvisible.visProp.replace(/[H|h]idden/, "") + "visibilitychange", document.addEventListener(b, function() {
                        g.pauseInvisible.isHidden() ? a.startTimeout ?
                            clearTimeout(a.startTimeout) : a.pause() : a.started ? a.play() : 0 < a.vars.initDelay ? setTimeout(a.play, a.vars.initDelay) : a.play()
                    }))
                },
                isHidden: function() {
                    return document[g.pauseInvisible.visProp] || !1
                }
            },
            setToClearWatchedEvent: function() {
                clearTimeout(r);
                r = setTimeout(function() {
                    d = ""
                }, 3E3)
            }
        };
        a.flexAnimate = function(b, d, e, y, n) {
            !a.vars.animationLoop && b !== a.currentSlide && (a.direction = b > a.currentSlide ? "next" : "prev");
            u && 1 === a.pagingCount && (a.direction = a.currentItem < b ? "next" : "prev");
            if (!a.animating && (a.canAdvance(b,
                    n) || e) && a.is(":visible")) {
                if (u && y) {
                    e = c(a.vars.asNavFor).data("flexslider");
                    a.atEnd = 0 === b || b === a.count - 1;
                    e.flexAnimate(b, !0, !1, !0, n);
                    a.direction = a.currentItem < b ? "next" : "prev";
                    e.direction = a.direction;
                    if (Math.ceil((b + 1) / a.visible) - 1 === a.currentSlide || 0 === b) return a.currentItem = b, a.slides.removeClass(f + "active-slide").eq(b).addClass(f + "active-slide"), !1;
                    a.currentItem = b;
                    a.slides.removeClass(f + "active-slide").eq(b).addClass(f + "active-slide");
                    b = Math.floor(b / a.visible)
                }
                a.animating = !0;
                a.animatingTo = b;
                d && a.pause();
                a.vars.before(a);
                a.syncExists && !n && g.sync("animate");
                a.vars.controlNav && g.controlNav.active();
                l || a.slides.removeClass(f + "active-slide").eq(b).addClass(f + "active-slide");
                a.atEnd = 0 === b || b === a.last;
                a.vars.directionNav && g.directionNav.update();
                b === a.last && (a.vars.end(a), a.vars.animationLoop || a.pause());
                if (q) k ? (a.slides.eq(a.currentSlide).css({
                    opacity: 0,
                    zIndex: 1
                }), a.slides.eq(b).css({
                    opacity: 1,
                    zIndex: 2
                }), a.wrapup(A)) : (a.slides.eq(a.currentSlide).css({
                    zIndex: 1
                }).animate({
                        opacity: 0
                    }, a.vars.animationSpeed,
                    a.vars.easing), a.slides.eq(b).css({
                    zIndex: 2
                }).animate({
                    opacity: 1
                }, a.vars.animationSpeed, a.vars.easing, a.wrapup));
                else {
                    var A = p ? a.slides.filter(":first").height() : a.computedW,
                        h;
                    l ? (b = a.vars.itemMargin, b = (a.itemW + b) * a.move * a.animatingTo, h = b > a.limit && 1 !== a.visible ? a.limit : b) : 0 === a.currentSlide && b === a.count - 1 && a.vars.animationLoop && "next" !== a.direction ? h = m ? (a.count + a.cloneOffset) * A : 0 : a.currentSlide === a.last && 0 === b && a.vars.animationLoop && "prev" !== a.direction ? h = m ? 0 : (a.count + 1) * A : h = m ? (a.count - 1 - b + a.cloneOffset) *
                    A : (b + a.cloneOffset) * A;
                    a.setProps(h, "", a.vars.animationSpeed);
                    a.transitions ? (a.vars.animationLoop && a.atEnd || (a.animating = !1, a.currentSlide = a.animatingTo), a.container.unbind("webkitTransitionEnd transitionend"), a.container.bind("webkitTransitionEnd transitionend", function() {
                        a.wrapup(A)
                    })) : a.container.animate(a.args, a.vars.animationSpeed, a.vars.easing, function() {
                        a.wrapup(A)
                    })
                }
                a.vars.smoothHeight && g.smoothHeight(a.vars.animationSpeed)
            }
        };
        a.wrapup = function(b) {
            !q && !l && (0 === a.currentSlide && a.animatingTo ===
            a.last && a.vars.animationLoop ? a.setProps(b, "jumpEnd") : a.currentSlide === a.last && 0 === a.animatingTo && a.vars.animationLoop && a.setProps(b, "jumpStart"));
            a.animating = !1;
            a.currentSlide = a.animatingTo;
            a.vars.after(a)
        };
        a.animateSlides = function() {
            !a.animating && a.flexAnimate(a.getTarget("next"))
        };
        a.pause = function() {
            clearInterval(a.animatedSlides);
            a.animatedSlides = null;
            a.playing = !1;
            a.vars.pausePlay && g.pausePlay.update("play");
            a.syncExists && g.sync("pause")
        };
        a.play = function() {
            a.playing && clearInterval(a.animatedSlides);
            a.animatedSlides = a.animatedSlides || setInterval(a.animateSlides, a.vars.slideshowSpeed);
            a.started = a.playing = !0;
            a.vars.pausePlay && g.pausePlay.update("pause");
            a.syncExists && g.sync("play")
        };
        a.stop = function() {
            a.pause();
            a.stopped = !0
        };
        a.canAdvance = function(b, d) {
            var c = u ? a.pagingCount - 1 : a.last;
            return d ? !0 : u && a.currentItem === a.count - 1 && 0 === b && "prev" === a.direction ? !0 : u && 0 === a.currentItem && b === a.pagingCount - 1 && "next" !== a.direction ? !1 : b !== a.currentSlide || u ? a.vars.animationLoop ? !0 : a.atEnd && 0 === a.currentSlide && b ===
            c && "next" !== a.direction ? !1 : a.atEnd && a.currentSlide === c && 0 === b && "next" === a.direction ? !1 : !0 : !1
        };
        a.getTarget = function(b) {
            a.direction = b;
            return "next" === b ? a.currentSlide === a.last ? 0 : a.currentSlide + 1 : 0 === a.currentSlide ? a.last : a.currentSlide - 1
        };
        a.setProps = function(b, d, c) {
            var e = function() {
                var c = b ? b : (a.itemW + a.vars.itemMargin) * a.move * a.animatingTo;
                return -1 * function() {
                        if (l) return "setTouch" === d ? b : m && a.animatingTo === a.last ? 0 : m ? a.limit - (a.itemW + a.vars.itemMargin) * a.move * a.animatingTo : a.animatingTo === a.last ? a.limit :
                            c;
                        switch (d) {
                            case "setTotal":
                                return m ? (a.count - 1 - a.currentSlide + a.cloneOffset) * b : (a.currentSlide + a.cloneOffset) * b;
                            case "setTouch":
                                return b;
                            case "jumpEnd":
                                return m ? b : a.count * b;
                            case "jumpStart":
                                return m ? a.count * b : b;
                            default:
                                return b
                        }
                    }() + "px"
            }();
            a.transitions && (e = p ? "translate3d(0," + e + ",0)" : "translate3d(" + e + ",0,0)", c = void 0 !== c ? c / 1E3 + "s" : "0s", a.container.css("-" + a.pfx + "-transition-duration", c), a.container.css("transition-duration", c));
            a.args[a.prop] = e;
            (a.transitions || void 0 === c) && a.container.css(a.args);
            a.container.css("transform", e)
        };
        a.setup = function(b) {
            if (q) a.slides.css({
                width: "100%",
                "float": "left",
                marginRight: "-100%",
                position: "relative"
            }), "init" === b && (k ? a.slides.css({
                opacity: 0,
                display: "block",
                webkitTransition: "opacity " + a.vars.animationSpeed / 1E3 + "s ease",
                zIndex: 1
            }).eq(a.currentSlide).css({
                opacity: 1,
                zIndex: 2
            }) : a.slides.css({
                opacity: 0,
                display: "block",
                zIndex: 1
            }).eq(a.currentSlide).css({
                zIndex: 2
            }).animate({
                opacity: 1
            }, a.vars.animationSpeed, a.vars.easing)), a.vars.smoothHeight && g.smoothHeight();
            else {
                var d,
                    e;
                "init" === b && (a.viewport = c('<div class="' + f + 'viewport"></div>').css({
                    overflow: "hidden",
                    position: "relative"
                }).appendTo(a).append(a.container), a.cloneCount = 0, a.cloneOffset = 0, m && (e = c.makeArray(a.slides).reverse(), a.slides = c(e), a.container.empty().append(a.slides)));
                a.vars.animationLoop && !l && (a.cloneCount = 2, a.cloneOffset = 1, "init" !== b && a.container.find(".clone").remove(), a.container.append(a.slides.first().clone().addClass("clone").attr("aria-hidden", "true")).prepend(a.slides.last().clone().addClass("clone").attr("aria-hidden",
                    "true")), g.uniqueID(a.slides.first().clone().addClass("clone")).appendTo(a.container), g.uniqueID(a.slides.last().clone().addClass("clone")).prependTo(a.container));
                a.newSlides = c(a.vars.selector, a);
                d = m ? a.count - 1 - a.currentSlide + a.cloneOffset : a.currentSlide + a.cloneOffset;
                p && !l ? (a.container.height(200 * (a.count + a.cloneCount) + "%").css("position", "absolute").width("100%"), setTimeout(function() {
                    a.newSlides.css({
                        display: "block"
                    });
                    a.doMath();
                    a.viewport.height(a.h);
                    a.setProps(d * a.h, "init")
                }, "init" === b ? 100 : 0)) :
                    (a.container.width(200 * (a.count + a.cloneCount) + "%"), a.setProps(d * a.computedW, "init"), setTimeout(function() {
                        a.doMath();
                        a.newSlides.css({
                            width: a.computedW,
                            "float": "left",
                            display: "block"
                        });
                        a.vars.smoothHeight && g.smoothHeight()
                    }, "init" === b ? 100 : 0))
            }
            l || a.slides.removeClass(f + "active-slide").eq(a.currentSlide).addClass(f + "active-slide");
            a.vars.init(a)
        };
        a.doMath = function() {
            var b = a.slides.first(),
                d = a.vars.itemMargin,
                c = a.vars.minItems,
                e = a.vars.maxItems;
            a.w = void 0 === a.viewport ? a.width() : a.viewport.width();
            a.h =
                b.height();
            a.boxPadding = b.outerWidth() - b.width();
            l ? (a.itemT = a.vars.itemWidth + d, a.minW = c ? c * a.itemT : a.w, a.maxW = e ? e * a.itemT - d : a.w, a.itemW = a.minW > a.w ? (a.w - d * (c - 1)) / c : a.maxW < a.w ? (a.w - d * (e - 1)) / e : a.vars.itemWidth > a.w ? a.w : a.vars.itemWidth, a.visible = Math.floor(a.w / a.itemW), a.move = 0 < a.vars.move && a.vars.move < a.visible ? a.vars.move : a.visible, a.pagingCount = Math.ceil((a.count - a.visible) / a.move + 1), a.last = a.pagingCount - 1, a.limit = 1 === a.pagingCount ? 0 : a.vars.itemWidth > a.w ? a.itemW * (a.count - 1) + d * (a.count - 1) : (a.itemW + d) *
            a.count - a.w - d) : (a.itemW = a.w, a.pagingCount = a.count, a.last = a.count - 1);
            a.computedW = a.itemW - a.boxPadding
        };
        a.update = function(b, d) {
            a.doMath();
            l || (b < a.currentSlide ? a.currentSlide += 1 : b <= a.currentSlide && 0 !== b && (a.currentSlide -= 1), a.animatingTo = a.currentSlide);
            if (a.vars.controlNav && !a.manualControls)
                if ("add" === d && !l || a.pagingCount > a.controlNav.length) g.controlNav.update("add");
                else if ("remove" === d && !l || a.pagingCount < a.controlNav.length) l && a.currentSlide > a.last && (a.currentSlide -= 1, a.animatingTo -= 1), g.controlNav.update("remove",
                    a.last);
            a.vars.directionNav && g.directionNav.update()
        };
        a.addSlide = function(b, d) {
            var e = c(b);
            a.count += 1;
            a.last = a.count - 1;
            p && m ? void 0 !== d ? a.slides.eq(a.count - d).after(e) : a.container.prepend(e) : void 0 !== d ? a.slides.eq(d).before(e) : a.container.append(e);
            a.update(d, "add");
            a.slides = c(a.vars.selector + ":not(.clone)", a);
            a.setup();
            a.vars.added(a)
        };
        a.removeSlide = function(b) {
            var d = isNaN(b) ? a.slides.index(c(b)) : b;
            a.count -= 1;
            a.last = a.count - 1;
            isNaN(b) ? c(b, a.slides).remove() : p && m ? a.slides.eq(a.last).remove() : a.slides.eq(b).remove();
            a.doMath();
            a.update(d, "remove");
            a.slides = c(a.vars.selector + ":not(.clone)", a);
            a.setup();
            a.vars.removed(a)
        };
        g.init()
    };
    c(window).blur(function(b) {
        focused = !1
    }).focus(function(b) {
        focused = !0
    });
    c.flexslider.defaults = {
        namespace: "flex-",
        selector: ".slides > li",
        animation: "fade",
        easing: "swing",
        direction: "horizontal",
        reverse: !1,
        animationLoop: !0,
        smoothHeight: !1,
        startAt: 0,
        slideshow: !0,
        slideshowSpeed: 7E3,
        animationSpeed: 600,
        initDelay: 0,
        randomize: !1,
        thumbCaptions: !1,
        pauseOnAction: !0,
        pauseOnHover: !1,
        pauseInvisible: !0,
        useCSS: !0,
        touch: !0,
        video: !1,
        controlNav: !0,
        directionNav: !0,
        prevText: "Previous",
        nextText: "Next",
        keyboard: !0,
        multipleKeyboard: !1,
        mousewheel: !1,
        pausePlay: !1,
        pauseText: "Pause",
        playText: "Play",
        controlsContainer: "",
        manualControls: "",
        sync: "",
        asNavFor: "",
        itemWidth: 0,
        itemMargin: 0,
        minItems: 1,
        maxItems: 0,
        move: 0,
        allowOneSlide: !0,
        start: function() {},
        before: function() {},
        after: function() {},
        end: function() {},
        added: function() {},
        removed: function() {},
        init: function() {}
    };
    c.fn.flexslider = function(b) {
        void 0 === b && (b = {});
        if ("object" ==
            typeof b) return this.each(function() {
            var a = c(this),
                e = a.find(b.selector ? b.selector : ".slides > li");
            1 === e.length && !0 === b.allowOneSlide || 0 === e.length ? (e.fadeIn(400), b.start && b.start(a)) : void 0 === a.data("flexslider") && new c.flexslider(this, b)
        });
        var e = c(this).data("flexslider");
        switch (b) {
            case "play":
                e.play();
                break;
            case "pause":
                e.pause();
                break;
            case "stop":
                e.stop();
                break;
            case "next":
                e.flexAnimate(e.getTarget("next"), !0);
                break;
            case "prev":
            case "previous":
                e.flexAnimate(e.getTarget("prev"), !0);
                break;
            default:
                "number" ==
                typeof b && e.flexAnimate(b, !0)
        }
    }
})(jQuery);
(function(c) {
    c.flexslider = function(b, e) {
        var a = c(b);
        a.vars = c.extend({}, c.flexslider.defaults, e);
        var f = a.vars.namespace,
            h = window.navigator && window.navigator.msPointerEnabled && window.MSGesture,
            k = ("ontouchstart" in window || h || window.DocumentTouch && document instanceof DocumentTouch) && a.vars.touch,
            d = "",
            r, p = "vertical" === a.vars.direction,
            m = a.vars.reverse,
            l = 0 < a.vars.itemWidth,
            q = "fade" === a.vars.animation,
            u = "" !== a.vars.asNavFor,
            g = {};
        c.data(b, "flexslider", a);
        g = {
            init: function() {
                a.animating = !1;
                a.currentSlide = parseInt(a.vars.startAt ?
                    a.vars.startAt : 0, 10);
                isNaN(a.currentSlide) && (a.currentSlide = 0);
                a.animatingTo = a.currentSlide;
                a.atEnd = 0 === a.currentSlide || a.currentSlide === a.last;
                a.containerSelector = a.vars.selector.substr(0, a.vars.selector.search(" "));
                a.slides = c(a.vars.selector, a);
                a.container = c(a.containerSelector, a);
                a.count = a.slides.length;
                a.syncExists = 0 < c(a.vars.sync).length;
                "slide" === a.vars.animation && (a.vars.animation = "swing");
                a.prop = p ? "top" : "marginLeft";
                a.args = {};
                a.manualPause = !1;
                a.stopped = !1;
                a.started = !1;
                a.startTimeout = null;
                a.transitions = !a.vars.video && !q && a.vars.useCSS && function() {
                        var b = document.createElement("div"),
                            d = ["perspectiveProperty", "WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"],
                            c;
                        for (c in d)
                            if (void 0 !== b.style[d[c]]) return a.pfx = d[c].replace("Perspective", "").toLowerCase(), a.prop = "-" + a.pfx + "-transform", !0;
                        return !1
                    }();
                "" !== a.vars.controlsContainer && (a.controlsContainer = 0 < c(a.vars.controlsContainer).length && c(a.vars.controlsContainer));
                "" !== a.vars.manualControls && (a.manualControls = 0 < c(a.vars.manualControls).length &&
                    c(a.vars.manualControls));
                a.vars.randomize && (a.slides.sort(function() {
                    return Math.round(Math.random()) - 0.5
                }), a.container.empty().append(a.slides));
                a.doMath();
                a.setup("init");
                a.vars.controlNav && g.controlNav.setup();
                a.vars.directionNav && g.directionNav.setup();
                a.vars.keyboard && (1 === c(a.containerSelector).length || a.vars.multipleKeyboard) && c(document).bind("keyup", function(b) {
                    b = b.keyCode;
                    a.animating || 39 !== b && 37 !== b || (b = 39 === b ? a.getTarget("next") : 37 === b ? a.getTarget("prev") : !1, a.flexAnimate(b, a.vars.pauseOnAction))
                });
                a.vars.mousewheel && a.bind("mousewheel", function(b, d, c, e) {
                    b.preventDefault();
                    b = 0 > d ? a.getTarget("next") : a.getTarget("prev");
                    a.flexAnimate(b, a.vars.pauseOnAction)
                });
                a.vars.pausePlay && g.pausePlay.setup();
                a.vars.slideshow && a.vars.pauseInvisible && g.pauseInvisible.init();
                a.vars.slideshow && (a.vars.pauseOnHover && a.hover(function() {
                    a.manualPlay || a.manualPause || a.pause()
                }, function() {
                    a.manualPause || a.manualPlay || a.stopped || a.play()
                }), a.vars.pauseInvisible && g.pauseInvisible.isHidden() || (0 < a.vars.initDelay ? a.startTimeout =
                    setTimeout(a.play, a.vars.initDelay) : a.play()));
                u && g.asNav.setup();
                k && a.vars.touch && g.touch();
                (!q || q && a.vars.smoothHeight) && c(window).bind("resize orientationchange focus", g.resize);
                a.find("img").attr("draggable", "false");
                setTimeout(function() {
                    a.vars.start(a)
                }, 200)
            },
            asNav: {
                setup: function() {
                    a.asNav = !0;
                    a.animatingTo = Math.floor(a.currentSlide / a.move);
                    a.currentItem = a.currentSlide;
                    a.slides.removeClass(f + "active-slide").eq(a.currentItem).addClass(f + "active-slide");
                    if (h) b._slider = a, a.slides.each(function() {
                        this._gesture =
                            new MSGesture;
                        this._gesture.target = this;
                        this.addEventListener("MSPointerDown", function(a) {
                            a.preventDefault();
                            a.currentTarget._gesture && a.currentTarget._gesture.addPointer(a.pointerId)
                        }, !1);
                        this.addEventListener("MSGestureTap", function(b) {
                            b.preventDefault();
                            b = c(this);
                            var d = b.index();
                            c(a.vars.asNavFor).data("flexslider").animating || b.hasClass("active") || (a.direction = a.currentItem < d ? "next" : "prev", a.flexAnimate(d, a.vars.pauseOnAction, !1, !0, !0))
                        })
                    });
                    else a.slides.on("click touchend MSPointerUp", function(b) {
                        b.preventDefault();
                        b = c(this);
                        var d = b.index();
                        0 >= b.offset().left - c(a).scrollLeft() && b.hasClass(f + "active-slide") ? a.flexAnimate(a.getTarget("prev"), !0) : c(a.vars.asNavFor).data("flexslider").animating || b.hasClass(f + "active-slide") || (a.direction = a.currentItem < d ? "next" : "prev", a.flexAnimate(d, a.vars.pauseOnAction, !1, !0, !0))
                    })
                }
            },
            controlNav: {
                setup: function() {
                    a.manualControls ? g.controlNav.setupManual() : g.controlNav.setupPaging()
                },
                setupPaging: function() {
                    var b = 1,
                        e, w;
                    a.controlNavScaffold = c('<ol class="' + f + "control-nav " + f + ("thumbnails" ===
                        a.vars.controlNav ? "control-thumbs" : "control-paging") + '"></ol>');
                    if (1 < a.pagingCount)
                        for (var y = 0; y < a.pagingCount; y++) w = a.slides.eq(y), e = "thumbnails" === a.vars.controlNav ? '<img src="' + w.attr("data-thumb") + '"/>' : "<a>" + b + "</a>", "thumbnails" === a.vars.controlNav && !0 === a.vars.thumbCaptions && (w = w.attr("data-thumbcaption"), "" != w && void 0 != w && (e += '<span class="' + f + 'caption">' + w + "</span>")), a.controlNavScaffold.append("<li>" + e + "</li>"), b++;
                    a.controlsContainer ? c(a.controlsContainer).append(a.controlNavScaffold) :
                        a.append(a.controlNavScaffold);
                    g.controlNav.set();
                    g.controlNav.active();
                    a.controlNavScaffold.delegate("a, img", "click touchend MSPointerUp", function(b) {
                        b.preventDefault();
                        if ("" === d || d === b.type) {
                            var e = c(this),
                                s = a.controlNav.index(e);
                            e.hasClass(f + "active") || (a.direction = s > a.currentSlide ? "next" : "prev", a.flexAnimate(s, a.vars.pauseOnAction))
                        }
                        "" === d && (d = b.type);
                        g.setToClearWatchedEvent()
                    })
                },
                setupManual: function() {
                    a.controlNav = a.manualControls;
                    g.controlNav.active();
                    a.controlNav.bind("click touchend MSPointerUp",
                        function(b) {
                            b.preventDefault();
                            if ("" === d || d === b.type) {
                                var e = c(this),
                                    w = a.controlNav.index(e);
                                e.hasClass(f + "active") || (w > a.currentSlide ? a.direction = "next" : a.direction = "prev", a.flexAnimate(w, a.vars.pauseOnAction))
                            }
                            "" === d && (d = b.type);
                            g.setToClearWatchedEvent()
                        })
                },
                set: function() {
                    a.controlNav = c("." + f + "control-nav li " + ("thumbnails" === a.vars.controlNav ? "img" : "a"), a.controlsContainer ? a.controlsContainer : a)
                },
                active: function() {
                    a.controlNav.removeClass(f + "active").eq(a.animatingTo).addClass(f + "active")
                },
                update: function(b,
                                 d) {
                    1 < a.pagingCount && "add" === b ? a.controlNavScaffold.append(c("<li><a>" + a.count + "</a></li>")) : 1 === a.pagingCount ? a.controlNavScaffold.find("li").remove() : a.controlNav.eq(d).closest("li").remove();
                    g.controlNav.set();
                    1 < a.pagingCount && a.pagingCount !== a.controlNav.length ? a.update(d, b) : g.controlNav.active()
                }
            },
            directionNav: {
                setup: function() {
                    var b = c('<ul class="' + f + 'direction-nav"><li><a class="' + f + 'prev" href="#">' + a.vars.prevText + '</a></li><li><a class="' + f + 'next" href="#">' + a.vars.nextText + "</a></li></ul>");
                    a.controlsContainer ? (c(a.controlsContainer).append(b), a.directionNav = c("." + f + "direction-nav li a", a.controlsContainer)) : (a.append(b), a.directionNav = c("." + f + "direction-nav li a", a));
                    g.directionNav.update();
                    a.directionNav.bind("click touchend MSPointerUp", function(b) {
                        b.preventDefault();
                        var e;
                        if ("" === d || d === b.type) e = c(this).hasClass(f + "next") ? a.getTarget("next") : a.getTarget("prev"), a.flexAnimate(e, a.vars.pauseOnAction);
                        "" === d && (d = b.type);
                        g.setToClearWatchedEvent()
                    })
                },
                update: function() {
                    var b = f + "disabled";
                    1 === a.pagingCount ? a.directionNav.addClass(b).attr("tabindex", "-1") : a.vars.animationLoop ? a.directionNav.removeClass(b).removeAttr("tabindex") : 0 === a.animatingTo ? a.directionNav.removeClass(b).filter("." + f + "prev").addClass(b).attr("tabindex", "-1") : a.animatingTo === a.last ? a.directionNav.removeClass(b).filter("." + f + "next").addClass(b).attr("tabindex", "-1") : a.directionNav.removeClass(b).removeAttr("tabindex")
                }
            },
            pausePlay: {
                setup: function() {
                    var b = c('<div class="' + f + 'pauseplay"><a></a></div>');
                    a.controlsContainer ?
                        (a.controlsContainer.append(b), a.pausePlay = c("." + f + "pauseplay a", a.controlsContainer)) : (a.append(b), a.pausePlay = c("." + f + "pauseplay a", a));
                    g.pausePlay.update(a.vars.slideshow ? f + "pause" : f + "play");
                    a.pausePlay.bind("click touchend MSPointerUp", function(b) {
                        b.preventDefault();
                        if ("" === d || d === b.type) c(this).hasClass(f + "pause") ? (a.manualPause = !0, a.manualPlay = !1, a.pause()) : (a.manualPause = !1, a.manualPlay = !0, a.play());
                        "" === d && (d = b.type);
                        g.setToClearWatchedEvent()
                    })
                },
                update: function(b) {
                    "play" === b ? a.pausePlay.removeClass(f +
                        "pause").addClass(f + "play").html(a.vars.playText) : a.pausePlay.removeClass(f + "play").addClass(f + "pause").html(a.vars.pauseText)
                }
            },
            touch: function() {
                var d, c, e, f, n, g, B = !1,
                    k = 0,
                    x = 0,
                    v = 0;
                if (h) {
                    b.style.msTouchAction = "none";
                    b._gesture = new MSGesture;
                    b._gesture.target = b;
                    b.addEventListener("MSPointerDown", r, !1);
                    b._slider = a;
                    b.addEventListener("MSGestureChange", u, !1);
                    b.addEventListener("MSGestureEnd", C, !1);
                    var r = function(d) {
                            d.stopPropagation();
                            a.animating ? d.preventDefault() : (a.pause(), b._gesture.addPointer(d.pointerId),
                                v = 0, f = p ? a.h : a.w, g = Number(new Date), e = l && m && a.animatingTo === a.last ? 0 : l && m ? a.limit - (a.itemW + a.vars.itemMargin) * a.move * a.animatingTo : l && a.currentSlide === a.last ? a.limit : l ? (a.itemW + a.vars.itemMargin) * a.move * a.currentSlide : m ? (a.last - a.currentSlide + a.cloneOffset) * f : (a.currentSlide + a.cloneOffset) * f)
                        },
                        u = function(a) {
                            a.stopPropagation();
                            var d = a.target._slider;
                            if (d) {
                                var c = -a.translationX,
                                    s = -a.translationY;
                                n = v += p ? s : c;
                                B = p ? Math.abs(v) < Math.abs(-c) : Math.abs(v) < Math.abs(-s);
                                if (a.detail === a.MSGESTURE_FLAG_INERTIA) setImmediate(function() {
                                    b._gesture.stop()
                                });
                                else if (!B || 500 < Number(new Date) - g) a.preventDefault(), !q && d.transitions && (d.vars.animationLoop || (n = v / (0 === d.currentSlide && 0 > v || d.currentSlide === d.last && 0 < v ? Math.abs(v) / f + 2 : 1)), d.setProps(e + n, "setTouch"))
                            }
                        },
                        C = function(a) {
                            a.stopPropagation();
                            if (a = a.target._slider) {
                                if (a.animatingTo === a.currentSlide && !B && null !== n) {
                                    var b = m ? -n : n,
                                        h = 0 < b ? a.getTarget("next") : a.getTarget("prev");
                                    a.canAdvance(h) && (550 > Number(new Date) - g && 50 < Math.abs(b) || Math.abs(b) > f / 2) ? a.flexAnimate(h, a.vars.pauseOnAction) : q || a.flexAnimate(a.currentSlide,
                                        a.vars.pauseOnAction, !0)
                                }
                                e = n = c = d = null;
                                v = 0
                            }
                        }
                } else {
                    b.addEventListener("touchstart", M, !1);
                    var M = function(n) {
                            if (a.animating) n.preventDefault();
                            else if (window.navigator.msPointerEnabled || 1 === n.touches.length) a.pause(), f = p ? a.h : a.w, g = Number(new Date), k = n.touches[0].pageX, x = n.touches[0].pageY, e = l && m && a.animatingTo === a.last ? 0 : l && m ? a.limit - (a.itemW + a.vars.itemMargin) * a.move * a.animatingTo : l && a.currentSlide === a.last ? a.limit : l ? (a.itemW + a.vars.itemMargin) * a.move * a.currentSlide : m ? (a.last - a.currentSlide + a.cloneOffset) *
                            f : (a.currentSlide + a.cloneOffset) * f, d = p ? x : k, c = p ? k : x, b.addEventListener("touchmove", G, !1), b.addEventListener("touchend", z, !1)
                        },
                        G = function(b) {
                            k = b.touches[0].pageX;
                            x = b.touches[0].pageY;
                            n = p ? d - x : d - k;
                            B = p ? Math.abs(n) < Math.abs(k - c) : Math.abs(n) < Math.abs(x - c);
                            if (!B || 500 < Number(new Date) - g) b.preventDefault(), !q && a.transitions && (a.vars.animationLoop || (n /= 0 === a.currentSlide && 0 > n || a.currentSlide === a.last && 0 < n ? Math.abs(n) / f + 2 : 1), a.setProps(e + n, "setTouch"))
                        },
                        z = function(h) {
                            b.removeEventListener("touchmove", G, !1);
                            if (a.animatingTo ===
                                a.currentSlide && !B && null !== n) {
                                h = m ? -n : n;
                                var l = 0 < h ? a.getTarget("next") : a.getTarget("prev");
                                a.canAdvance(l) && (550 > Number(new Date) - g && 50 < Math.abs(h) || Math.abs(h) > f / 2) ? a.flexAnimate(l, a.vars.pauseOnAction) : q || a.flexAnimate(a.currentSlide, a.vars.pauseOnAction, !0)
                            }
                            b.removeEventListener("touchend", z, !1);
                            e = n = c = d = null
                        }
                }
            },
            resize: function() {
                !a.animating && a.is(":visible") && (l || a.doMath(), q ? g.smoothHeight() : l ? (a.slides.width(a.computedW), a.update(a.pagingCount), a.setProps()) : p ? (a.viewport.height(a.h), a.setProps(a.h,
                    "setTotal")) : (a.vars.smoothHeight && g.smoothHeight(), a.newSlides.width(a.computedW), a.setProps(a.computedW, "setTotal")))
            },
            smoothHeight: function(b) {
                if (!p || q) {
                    var d = q ? a : a.viewport;
                    b ? d.animate({
                        height: a.slides.eq(a.animatingTo).height()
                    }, b) : d.height(a.slides.eq(a.animatingTo).height())
                }
            },
            sync: function(b) {
                var d = c(a.vars.sync).data("flexslider"),
                    e = a.animatingTo;
                switch (b) {
                    case "animate":
                        d.flexAnimate(e, a.vars.pauseOnAction, !1, !0);
                        break;
                    case "play":
                        d.playing || d.asNav || d.play();
                        break;
                    case "pause":
                        d.pause()
                }
            },
            uniqueID: function(a) {
                a.find("[id]").each(function() {
                    var a = c(this);
                    a.attr("id", a.attr("id") + "_clone")
                });
                return a
            },
            pauseInvisible: {
                visProp: null,
                init: function() {
                    var b = ["webkit", "moz", "ms", "o"];
                    if ("hidden" in document) return "hidden";
                    for (var d = 0; d < b.length; d++) b[d] + "Hidden" in document && (g.pauseInvisible.visProp = b[d] + "Hidden");
                    g.pauseInvisible.visProp && (b = g.pauseInvisible.visProp.replace(/[H|h]idden/, "") + "visibilitychange", document.addEventListener(b, function() {
                        g.pauseInvisible.isHidden() ? a.startTimeout ?
                            clearTimeout(a.startTimeout) : a.pause() : a.started ? a.play() : 0 < a.vars.initDelay ? setTimeout(a.play, a.vars.initDelay) : a.play()
                    }))
                },
                isHidden: function() {
                    return document[g.pauseInvisible.visProp] || !1
                }
            },
            setToClearWatchedEvent: function() {
                clearTimeout(r);
                r = setTimeout(function() {
                    d = ""
                }, 3E3)
            }
        };
        a.flexAnimate = function(b, d, e, y, n) {
            !a.vars.animationLoop && b !== a.currentSlide && (a.direction = b > a.currentSlide ? "next" : "prev");
            u && 1 === a.pagingCount && (a.direction = a.currentItem < b ? "next" : "prev");
            if (!a.animating && (a.canAdvance(b,
                    n) || e) && a.is(":visible")) {
                if (u && y) {
                    e = c(a.vars.asNavFor).data("flexslider");
                    a.atEnd = 0 === b || b === a.count - 1;
                    e.flexAnimate(b, !0, !1, !0, n);
                    a.direction = a.currentItem < b ? "next" : "prev";
                    e.direction = a.direction;
                    if (Math.ceil((b + 1) / a.visible) - 1 === a.currentSlide || 0 === b) return a.currentItem = b, a.slides.removeClass(f + "active-slide").eq(b).addClass(f + "active-slide"), !1;
                    a.currentItem = b;
                    a.slides.removeClass(f + "active-slide").eq(b).addClass(f + "active-slide");
                    b = Math.floor(b / a.visible)
                }
                a.animating = !0;
                a.animatingTo = b;
                d && a.pause();
                a.vars.before(a);
                a.syncExists && !n && g.sync("animate");
                a.vars.controlNav && g.controlNav.active();
                l || a.slides.removeClass(f + "active-slide").eq(b).addClass(f + "active-slide");
                a.atEnd = 0 === b || b === a.last;
                a.vars.directionNav && g.directionNav.update();
                b === a.last && (a.vars.end(a), a.vars.animationLoop || a.pause());
                if (q) k ? (a.slides.eq(a.currentSlide).css({
                    opacity: 0,
                    zIndex: 1
                }), a.slides.eq(b).css({
                    opacity: 1,
                    zIndex: 2
                }), a.wrapup(h)) : (a.slides.eq(a.currentSlide).css({
                    zIndex: 1
                }).animate({
                        opacity: 0
                    }, a.vars.animationSpeed,
                    a.vars.easing), a.slides.eq(b).css({
                    zIndex: 2
                }).animate({
                    opacity: 1
                }, a.vars.animationSpeed, a.vars.easing, a.wrapup));
                else {
                    var h = p ? a.slides.filter(":first").height() : a.computedW,
                        B;
                    l ? (b = a.vars.itemMargin, b = (a.itemW + b) * a.move * a.animatingTo, B = b > a.limit && 1 !== a.visible ? a.limit : b) : 0 === a.currentSlide && b === a.count - 1 && a.vars.animationLoop && "next" !== a.direction ? B = m ? (a.count + a.cloneOffset) * h : 0 : a.currentSlide === a.last && 0 === b && a.vars.animationLoop && "prev" !== a.direction ? B = m ? 0 : (a.count + 1) * h : B = m ? (a.count - 1 - b + a.cloneOffset) *
                    h : (b + a.cloneOffset) * h;
                    a.setProps(B, "", a.vars.animationSpeed);
                    a.transitions ? (a.vars.animationLoop && a.atEnd || (a.animating = !1, a.currentSlide = a.animatingTo), a.container.unbind("webkitTransitionEnd transitionend"), a.container.bind("webkitTransitionEnd transitionend", function() {
                        a.wrapup(h)
                    })) : a.container.animate(a.args, a.vars.animationSpeed, a.vars.easing, function() {
                        a.wrapup(h)
                    })
                }
                a.vars.smoothHeight && g.smoothHeight(a.vars.animationSpeed)
            }
        };
        a.wrapup = function(b) {
            !q && !l && (0 === a.currentSlide && a.animatingTo ===
            a.last && a.vars.animationLoop ? a.setProps(b, "jumpEnd") : a.currentSlide === a.last && 0 === a.animatingTo && a.vars.animationLoop && a.setProps(b, "jumpStart"));
            a.animating = !1;
            a.currentSlide = a.animatingTo;
            a.vars.after(a)
        };
        a.animateSlides = function() {
            !a.animating && a.flexAnimate(a.getTarget("next"))
        };
        a.pause = function() {
            clearInterval(a.animatedSlides);
            a.animatedSlides = null;
            a.playing = !1;
            a.vars.pausePlay && g.pausePlay.update("play");
            a.syncExists && g.sync("pause")
        };
        a.play = function() {
            a.playing && clearInterval(a.animatedSlides);
            a.animatedSlides = a.animatedSlides || setInterval(a.animateSlides, a.vars.slideshowSpeed);
            a.started = a.playing = !0;
            a.vars.pausePlay && g.pausePlay.update("pause");
            a.syncExists && g.sync("play")
        };
        a.stop = function() {
            a.pause();
            a.stopped = !0
        };
        a.canAdvance = function(b, d) {
            var c = u ? a.pagingCount - 1 : a.last;
            return d ? !0 : u && a.currentItem === a.count - 1 && 0 === b && "prev" === a.direction ? !0 : u && 0 === a.currentItem && b === a.pagingCount - 1 && "next" !== a.direction ? !1 : b !== a.currentSlide || u ? a.vars.animationLoop ? !0 : a.atEnd && 0 === a.currentSlide && b ===
            c && "next" !== a.direction ? !1 : a.atEnd && a.currentSlide === c && 0 === b && "next" === a.direction ? !1 : !0 : !1
        };
        a.getTarget = function(b) {
            a.direction = b;
            return "next" === b ? a.currentSlide === a.last ? 0 : a.currentSlide + 1 : 0 === a.currentSlide ? a.last : a.currentSlide - 1
        };
        a.setProps = function(b, d, c) {
            var e = function() {
                var c = b ? b : (a.itemW + a.vars.itemMargin) * a.move * a.animatingTo;
                return -1 * function() {
                        if (l) return "setTouch" === d ? b : m && a.animatingTo === a.last ? 0 : m ? a.limit - (a.itemW + a.vars.itemMargin) * a.move * a.animatingTo : a.animatingTo === a.last ? a.limit :
                            c;
                        switch (d) {
                            case "setTotal":
                                return m ? (a.count - 1 - a.currentSlide + a.cloneOffset) * b : (a.currentSlide + a.cloneOffset) * b;
                            case "setTouch":
                                return b;
                            case "jumpEnd":
                                return m ? b : a.count * b;
                            case "jumpStart":
                                return m ? a.count * b : b;
                            default:
                                return b
                        }
                    }() + "px"
            }();
            a.transitions && (e = p ? "translate3d(0," + e + ",0)" : "translate3d(" + e + ",0,0)", c = void 0 !== c ? c / 1E3 + "s" : "0s", a.container.css("-" + a.pfx + "-transition-duration", c), a.container.css("transition-duration", c));
            a.args[a.prop] = e;
            (a.transitions || void 0 === c) && a.container.css(a.args);
            a.container.css("transform", e)
        };
        a.setup = function(b) {
            if (q) a.slides.css({
                width: "100%",
                "float": "left",
                marginRight: "-100%",
                position: "relative"
            }), "init" === b && (k ? a.slides.css({
                opacity: 0,
                display: "block",
                webkitTransition: "opacity " + a.vars.animationSpeed / 1E3 + "s ease",
                zIndex: 1
            }).eq(a.currentSlide).css({
                opacity: 1,
                zIndex: 2
            }) : a.slides.css({
                opacity: 0,
                display: "block",
                zIndex: 1
            }).eq(a.currentSlide).css({
                zIndex: 2
            }).animate({
                opacity: 1
            }, a.vars.animationSpeed, a.vars.easing)), a.vars.smoothHeight && g.smoothHeight();
            else {
                var d,
                    e;
                "init" === b && (a.viewport = c('<div class="' + f + 'viewport"></div>').css({
                    overflow: "hidden",
                    position: "relative"
                }).appendTo(a).append(a.container), a.cloneCount = 0, a.cloneOffset = 0, m && (e = c.makeArray(a.slides).reverse(), a.slides = c(e), a.container.empty().append(a.slides)));
                a.vars.animationLoop && !l && (a.cloneCount = 2, a.cloneOffset = 1, "init" !== b && a.container.find(".clone").remove(), a.container.append(a.slides.first().clone().addClass("clone").attr("aria-hidden", "true")).prepend(a.slides.last().clone().addClass("clone").attr("aria-hidden",
                    "true")), g.uniqueID(a.slides.first().clone().addClass("clone")).appendTo(a.container), g.uniqueID(a.slides.last().clone().addClass("clone")).prependTo(a.container));
                a.newSlides = c(a.vars.selector, a);
                d = m ? a.count - 1 - a.currentSlide + a.cloneOffset : a.currentSlide + a.cloneOffset;
                p && !l ? (a.container.height(200 * (a.count + a.cloneCount) + "%").css("position", "absolute").width("100%"), setTimeout(function() {
                    a.newSlides.css({
                        display: "block"
                    });
                    a.doMath();
                    a.viewport.height(a.h);
                    a.setProps(d * a.h, "init")
                }, "init" === b ? 100 : 0)) :
                    (a.container.width(200 * (a.count + a.cloneCount) + "%"), a.setProps(d * a.computedW, "init"), setTimeout(function() {
                        a.doMath();
                        a.newSlides.css({
                            width: a.computedW,
                            "float": "left",
                            display: "block"
                        });
                        a.vars.smoothHeight && g.smoothHeight()
                    }, "init" === b ? 100 : 0))
            }
            l || a.slides.removeClass(f + "active-slide").eq(a.currentSlide).addClass(f + "active-slide");
            a.vars.init(a)
        };
        a.doMath = function() {
            var b = a.slides.first(),
                d = a.vars.itemMargin,
                c = a.vars.minItems,
                e = a.vars.maxItems;
            a.w = void 0 === a.viewport ? a.width() : a.viewport.width();
            a.h =
                b.height();
            a.boxPadding = b.outerWidth() - b.width();
            l ? (a.itemT = a.vars.itemWidth + d, a.minW = c ? c * a.itemT : a.w, a.maxW = e ? e * a.itemT - d : a.w, a.itemW = a.minW > a.w ? (a.w - d * (c - 1)) / c : a.maxW < a.w ? (a.w - d * (e - 1)) / e : a.vars.itemWidth > a.w ? a.w : a.vars.itemWidth, a.visible = Math.floor(a.w / a.itemW), a.move = 0 < a.vars.move && a.vars.move < a.visible ? a.vars.move : a.visible, a.pagingCount = Math.ceil((a.count - a.visible) / a.move + 1), a.last = a.pagingCount - 1, a.limit = 1 === a.pagingCount ? 0 : a.vars.itemWidth > a.w ? a.itemW * (a.count - 1) + d * (a.count - 1) : (a.itemW + d) *
            a.count - a.w - d) : (a.itemW = a.w, a.pagingCount = a.count, a.last = a.count - 1);
            a.computedW = a.itemW - a.boxPadding
        };
        a.update = function(b, d) {
            a.doMath();
            l || (b < a.currentSlide ? a.currentSlide += 1 : b <= a.currentSlide && 0 !== b && (a.currentSlide -= 1), a.animatingTo = a.currentSlide);
            if (a.vars.controlNav && !a.manualControls)
                if ("add" === d && !l || a.pagingCount > a.controlNav.length) g.controlNav.update("add");
                else if ("remove" === d && !l || a.pagingCount < a.controlNav.length) l && a.currentSlide > a.last && (a.currentSlide -= 1, a.animatingTo -= 1), g.controlNav.update("remove",
                    a.last);
            a.vars.directionNav && g.directionNav.update()
        };
        a.addSlide = function(b, d) {
            var e = c(b);
            a.count += 1;
            a.last = a.count - 1;
            p && m ? void 0 !== d ? a.slides.eq(a.count - d).after(e) : a.container.prepend(e) : void 0 !== d ? a.slides.eq(d).before(e) : a.container.append(e);
            a.update(d, "add");
            a.slides = c(a.vars.selector + ":not(.clone)", a);
            a.setup();
            a.vars.added(a)
        };
        a.removeSlide = function(b) {
            var d = isNaN(b) ? a.slides.index(c(b)) : b;
            a.count -= 1;
            a.last = a.count - 1;
            isNaN(b) ? c(b, a.slides).remove() : p && m ? a.slides.eq(a.last).remove() : a.slides.eq(b).remove();
            a.doMath();
            a.update(d, "remove");
            a.slides = c(a.vars.selector + ":not(.clone)", a);
            a.setup();
            a.vars.removed(a)
        };
        g.init()
    };
    c(window).blur(function(b) {
        focused = !1
    }).focus(function(b) {
        focused = !0
    });
    c.flexslider.defaults = {
        namespace: "flex-",
        selector: ".slides > li",
        animation: "fade",
        easing: "swing",
        direction: "horizontal",
        reverse: !1,
        animationLoop: !0,
        smoothHeight: !1,
        startAt: 0,
        slideshow: !0,
        slideshowSpeed: 7E3,
        animationSpeed: 600,
        initDelay: 0,
        randomize: !1,
        thumbCaptions: !1,
        pauseOnAction: !0,
        pauseOnHover: !1,
        pauseInvisible: !0,
        useCSS: !0,
        touch: !0,
        video: !1,
        controlNav: !0,
        directionNav: !0,
        prevText: "Previous",
        nextText: "Next",
        keyboard: !0,
        multipleKeyboard: !1,
        mousewheel: !1,
        pausePlay: !1,
        pauseText: "Pause",
        playText: "Play",
        controlsContainer: "",
        manualControls: "",
        sync: "",
        asNavFor: "",
        itemWidth: 0,
        itemMargin: 0,
        minItems: 1,
        maxItems: 0,
        move: 0,
        allowOneSlide: !0,
        start: function() {},
        before: function() {},
        after: function() {},
        end: function() {},
        added: function() {},
        removed: function() {},
        init: function() {}
    };
    c.fn.flexslider = function(b) {
        void 0 === b && (b = {});
        if ("object" ==
            typeof b) return this.each(function() {
            var a = c(this),
                e = a.find(b.selector ? b.selector : ".slides > li");
            1 === e.length && !0 === b.allowOneSlide || 0 === e.length ? (e.fadeIn(400), b.start && b.start(a)) : void 0 === a.data("flexslider") && new c.flexslider(this, b)
        });
        var e = c(this).data("flexslider");
        switch (b) {
            case "play":
                e.play();
                break;
            case "pause":
                e.pause();
                break;
            case "stop":
                e.stop();
                break;
            case "next":
                e.flexAnimate(e.getTarget("next"), !0);
                break;
            case "prev":
            case "previous":
                e.flexAnimate(e.getTarget("prev"), !0);
                break;
            default:
                "number" ==
                typeof b && e.flexAnimate(b, !0)
        }
    }
})(jQuery);
(function(c, b, e, a) {
    var f = e("html"),
        h = e(c),
        k = e(b),
        d = e.fancybox = function() {
            d.open.apply(this, arguments)
        },
        r = navigator.userAgent.match(/msie/i),
        p = null,
        m = b.createTouch !== a,
        l = function(a) {
            return a && a.hasOwnProperty && a instanceof e
        },
        q = function(a) {
            return a && "string" === e.type(a)
        },
        u = function(a) {
            return q(a) && 0 < a.indexOf("%")
        },
        g = function(a, b) {
            var c = parseInt(a, 10) || 0;
            b && u(a) && (c *= d.getViewport()[b] / 100);
            return Math.ceil(c)
        },
        t = function(a, b) {
            return g(a, b) + "px"
        };
    e.extend(d, {
        version: "2.1.5",
        defaults: {
            padding: 15,
            margin: 20,
            width: 800,
            height: 600,
            minWidth: 100,
            minHeight: 100,
            maxWidth: 9999,
            maxHeight: 9999,
            pixelRatio: 1,
            autoSize: !0,
            autoHeight: !1,
            autoWidth: !1,
            autoResize: !0,
            autoCenter: !m,
            fitToView: !0,
            aspectRatio: !1,
            topRatio: 0.5,
            leftRatio: 0.5,
            scrolling: "auto",
            wrapCSS: "",
            arrows: !0,
            closeBtn: !0,
            closeClick: !1,
            nextClick: !1,
            mouseWheel: !0,
            autoPlay: !1,
            playSpeed: 3E3,
            preload: 3,
            modal: !1,
            loop: !0,
            ajax: {
                dataType: "html",
                headers: {
                    "X-fancyBox": !0
                }
            },
            iframe: {
                scrolling: "auto",
                preload: !0
            },
            swf: {
                wmode: "transparent",
                allowfullscreen: "true",
                allowscriptaccess: "always"
            },
            keys: {
                next: {
                    13: "left",
                    34: "up",
                    39: "left",
                    40: "up"
                },
                prev: {
                    8: "right",
                    33: "down",
                    37: "right",
                    38: "down"
                },
                close: [27],
                play: [32],
                toggle: [70]
            },
            direction: {
                next: "left",
                prev: "right"
            },
            scrollOutside: !0,
            index: 0,
            type: null,
            href: null,
            content: null,
            title: null,
            tpl: {
                wrap: '<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',
                image: '<img class="fancybox-image" src="{href}" alt="" />',
                iframe: '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen' +
                (r ? ' allowtransparency="true"' : "") + "></iframe>",
                error: '<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',
                closeBtn: '<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"></a>',
                next: '<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
                prev: '<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'
            },
            openEffect: "fade",
            openSpeed: 250,
            openEasing: "swing",
            openOpacity: !0,
            openMethod: "zoomIn",
            closeEffect: "fade",
            closeSpeed: 250,
            closeEasing: "swing",
            closeOpacity: !0,
            closeMethod: "zoomOut",
            nextEffect: "elastic",
            nextSpeed: 250,
            nextEasing: "swing",
            nextMethod: "changeIn",
            prevEffect: "elastic",
            prevSpeed: 250,
            prevEasing: "swing",
            prevMethod: "changeOut",
            helpers: {
                overlay: !0,
                title: !0
            },
            onCancel: e.noop,
            beforeLoad: e.noop,
            afterLoad: e.noop,
            beforeShow: e.noop,
            afterShow: e.noop,
            beforeChange: e.noop,
            beforeClose: e.noop,
            afterClose: e.noop
        },
        group: {},
        opts: {},
        previous: null,
        coming: null,
        current: null,
        isActive: !1,
        isOpen: !1,
        isOpened: !1,
        wrap: null,
        skin: null,
        outer: null,
        inner: null,
        player: {
            timer: null,
            isActive: !1
        },
        ajaxLoad: null,
        imgPreload: null,
        transitions: {},
        helpers: {},
        open: function(b, c) {
            if (b && (e.isPlainObject(c) || (c = {}), !1 !== d.close(!0))) return e.isArray(b) || (b = l(b) ? e(b).get() : [b]), e.each(b, function(f, n) {
                var g = {},
                    h, m, k, v, p;
                "object" === e.type(n) && (n.nodeType && (n = e(n)), l(n) ? (g = {
                    href: n.data("fancybox-href") || n.attr("href"),
                    title: n.data("fancybox-title") || n.attr("title"),
                    isDom: !0,
                    element: n
                }, e.metadata && e.extend(!0, g,
                    n.metadata())) : g = n);
                h = c.href || g.href || (q(n) ? n : null);
                m = c.title !== a ? c.title : g.title || "";
                v = (k = c.content || g.content) ? "html" : c.type || g.type;
                !v && g.isDom && (v = n.data("fancybox-type"), v || (v = (v = n.prop("class").match(/fancybox\.(\w+)/)) ? v[1] : null));
                q(h) && (v || (d.isImage(h) ? v = "image" : d.isSWF(h) ? v = "swf" : "#" === h.charAt(0) ? v = "inline" : q(n) && (v = "html", k = n)), "ajax" === v && (p = h.split(/\s+/, 2), h = p.shift(), p = p.shift()));
                k || ("inline" === v ? h ? k = e(q(h) ? h.replace(/.*(?=#[^\s]+$)/, "") : h) : g.isDom && (k = n) : "html" === v ? k = h : v || h || !g.isDom ||
                (v = "inline", k = n));
                e.extend(g, {
                    href: h,
                    type: v,
                    content: k,
                    title: m,
                    selector: p
                });
                b[f] = g
            }), d.opts = e.extend(!0, {}, d.defaults, c), c.keys !== a && (d.opts.keys = c.keys ? e.extend({}, d.defaults.keys, c.keys) : !1), d.group = b, d._start(d.opts.index)
        },
        cancel: function() {
            var a = d.coming;
            a && !1 !== d.trigger("onCancel") && (d.hideLoading(), d.ajaxLoad && d.ajaxLoad.abort(), d.ajaxLoad = null, d.imgPreload && (d.imgPreload.onload = d.imgPreload.onerror = null), a.wrap && a.wrap.stop(!0, !0).trigger("onReset").remove(), d.coming = null, d.current || d._afterZoomOut(a))
        },
        close: function(a) {
            d.cancel();
            !1 !== d.trigger("beforeClose") && (d.unbindEvents(), d.isActive && (d.isOpen && !0 !== a ? (d.isOpen = d.isOpened = !1, d.isClosing = !0, e(".fancybox-item, .fancybox-nav").remove(), d.wrap.stop(!0, !0).removeClass("fancybox-opened"), d.transitions[d.current.closeMethod]()) : (e(".fancybox-wrap").stop(!0).trigger("onReset").remove(), d._afterZoomOut())))
        },
        play: function(a) {
            var b = function() {
                    clearTimeout(d.player.timer)
                },
                c = function() {
                    b();
                    d.current && d.player.isActive && (d.player.timer = setTimeout(d.next,
                        d.current.playSpeed))
                },
                e = function() {
                    b();
                    k.unbind(".player");
                    d.player.isActive = !1;
                    d.trigger("onPlayEnd")
                };
            !0 === a || !d.player.isActive && !1 !== a ? d.current && (d.current.loop || d.current.index < d.group.length - 1) && (d.player.isActive = !0, k.bind({
                "onCancel.player beforeClose.player": e,
                "onUpdate.player": c,
                "beforeLoad.player": b
            }), c(), d.trigger("onPlayStart")) : e()
        },
        next: function(a) {
            var b = d.current;
            b && (q(a) || (a = b.direction.next), d.jumpto(b.index + 1, a, "next"))
        },
        prev: function(a) {
            var b = d.current;
            b && (q(a) || (a = b.direction.prev),
                d.jumpto(b.index - 1, a, "prev"))
        },
        jumpto: function(b, c, e) {
            var f = d.current;
            f && (b = g(b), d.direction = c || f.direction[b >= f.index ? "next" : "prev"], d.router = e || "jumpto", f.loop && (0 > b && (b = f.group.length + b % f.group.length), b %= f.group.length), f.group[b] !== a && (d.cancel(), d._start(b)))
        },
        reposition: function(a, b) {
            var c = d.current,
                f = c ? c.wrap : null,
                g;
            f && (g = d._getPosition(b), a && "scroll" === a.type ? (delete g.position, f.stop(!0, !0).animate(g, 200)) : (f.css(g), c.pos = e.extend({}, c.dim, g)))
        },
        update: function(a) {
            var b = a && a.type,
                c = !b ||
                    "orientationchange" === b;
            c && (clearTimeout(p), p = null);
            d.isOpen && !p && (p = setTimeout(function() {
                var e = d.current;
                e && !d.isClosing && (d.wrap.removeClass("fancybox-tmp"), (c || "load" === b || "resize" === b && e.autoResize) && d._setDimension(), "scroll" === b && e.canShrink || d.reposition(a), d.trigger("onUpdate"), p = null)
            }, c && !m ? 0 : 300))
        },
        toggle: function(a) {
            d.isOpen && (d.current.fitToView = "boolean" === e.type(a) ? a : !d.current.fitToView, m && (d.wrap.removeAttr("style").addClass("fancybox-tmp"), d.trigger("onUpdate")), d.update())
        },
        hideLoading: function() {
            k.unbind(".loading");
            e("#fancybox-loading").remove()
        },
        showLoading: function() {
            var a, b;
            d.hideLoading();
            a = e('<div id="fancybox-loading"><div></div></div>').click(d.cancel).appendTo("body");
            k.bind("keydown.loading", function(a) {
                27 === (a.which || a.keyCode) && (a.preventDefault(), d.cancel())
            });
            d.defaults.fixed || (b = d.getViewport(), a.css({
                position: "absolute",
                top: 0.5 * b.h + b.y,
                left: 0.5 * b.w + b.x
            }))
        },
        getViewport: function() {
            var a = d.current && d.current.locked || !1,
                b = {
                    x: h.scrollLeft(),
                    y: h.scrollTop()
                };
            a ? (b.w = a[0].clientWidth, b.h = a[0].clientHeight) :
                (b.w = m && c.innerWidth ? c.innerWidth : h.width(), b.h = m && c.innerHeight ? c.innerHeight : h.height());
            return b
        },
        unbindEvents: function() {
            d.wrap && l(d.wrap) && d.wrap.unbind(".fb");
            k.unbind(".fb");
            h.unbind(".fb")
        },
        bindEvents: function() {
            var b = d.current,
                c;
            b && (h.bind("orientationchange.fb" + (m ? "" : " resize.fb") + (b.autoCenter && !b.locked ? " scroll.fb" : ""), d.update), (c = b.keys) && k.bind("keydown.fb", function(f) {
                var n = f.which || f.keyCode,
                    g = f.target || f.srcElement;
                if (27 === n && d.coming) return !1;
                f.ctrlKey || f.altKey || f.shiftKey || f.metaKey ||
                g && (g.type || e(g).is("[contenteditable]")) || e.each(c, function(c, g) {
                    if (1 < b.group.length && g[n] !== a) return d[c](g[n]), f.preventDefault(), !1;
                    if (-1 < e.inArray(n, g)) return d[c](), f.preventDefault(), !1
                })
            }), e.fn.mousewheel && b.mouseWheel && d.wrap.bind("mousewheel.fb", function(a, c, f, g) {
                for (var w = e(a.target || null), h = !1; w.length && !(h || w.is(".fancybox-skin") || w.is(".fancybox-wrap"));) h = (h = w[0]) && !(h.style.overflow && "hidden" === h.style.overflow) && (h.clientWidth && h.scrollWidth > h.clientWidth || h.clientHeight && h.scrollHeight >
                    h.clientHeight), w = e(w).parent();
                0 !== c && !h && 1 < d.group.length && !b.canShrink && (0 < g || 0 < f ? d.prev(0 < g ? "down" : "left") : (0 > g || 0 > f) && d.next(0 > g ? "up" : "right"), a.preventDefault())
            }))
        },
        trigger: function(a, b) {
            var c, f = b || d.coming || d.current;
            if (f) {
                e.isFunction(f[a]) && (c = f[a].apply(f, Array.prototype.slice.call(arguments, 1)));
                if (!1 === c) return !1;
                f.helpers && e.each(f.helpers, function(b, c) {
                    if (c && d.helpers[b] && e.isFunction(d.helpers[b][a])) d.helpers[b][a](e.extend(!0, {}, d.helpers[b].defaults, c), f)
                });
                k.trigger(a)
            }
        },
        isImage: function(a) {
            return q(a) &&
                a.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg)((\?|#).*)?$)/i)
        },
        isSWF: function(a) {
            return q(a) && a.match(/\.(swf)((\?|#).*)?$/i)
        },
        _start: function(a) {
            var b = {},
                c, f;
            a = g(a);
            c = d.group[a] || null;
            if (!c) return !1;
            b = e.extend(!0, {}, d.opts, c);
            c = b.margin;
            f = b.padding;
            "number" === e.type(c) && (b.margin = [c, c, c, c]);
            "number" === e.type(f) && (b.padding = [f, f, f, f]);
            b.modal && e.extend(!0, b, {
                closeBtn: !1,
                closeClick: !1,
                nextClick: !1,
                arrows: !1,
                mouseWheel: !1,
                keys: null,
                helpers: {
                    overlay: {
                        closeClick: !1
                    }
                }
            });
            b.autoSize &&
            (b.autoWidth = b.autoHeight = !0);
            "auto" === b.width && (b.autoWidth = !0);
            "auto" === b.height && (b.autoHeight = !0);
            b.group = d.group;
            b.index = a;
            d.coming = b;
            if (!1 === d.trigger("beforeLoad")) d.coming = null;
            else {
                f = b.type;
                c = b.href;
                if (!f) return d.coming = null, d.current && d.router && "jumpto" !== d.router ? (d.current.index = a, d[d.router](d.direction)) : !1;
                d.isActive = !0;
                if ("image" === f || "swf" === f) b.autoHeight = b.autoWidth = !1, b.scrolling = "visible";
                "image" === f && (b.aspectRatio = !0);
                "iframe" === f && m && (b.scrolling = "scroll");
                b.wrap = e(b.tpl.wrap).addClass("fancybox-" +
                    (m ? "mobile" : "desktop") + " fancybox-type-" + f + " fancybox-tmp " + b.wrapCSS).appendTo(b.parent || "body");
                e.extend(b, {
                    skin: e(".fancybox-skin", b.wrap),
                    outer: e(".fancybox-outer", b.wrap),
                    inner: e(".fancybox-inner", b.wrap)
                });
                e.each(["Top", "Right", "Bottom", "Left"], function(a, d) {
                    b.skin.css("padding" + d, t(b.padding[a]))
                });
                d.trigger("onReady");
                if ("inline" === f || "html" === f) {
                    if (!b.content || !b.content.length) return d._error("content")
                } else if (!c) return d._error("href");
                "image" === f ? d._loadImage() : "ajax" === f ? d._loadAjax() :
                    "iframe" === f ? d._loadIframe() : d._afterLoad()
            }
        },
        _error: function(a) {
            e.extend(d.coming, {
                type: "html",
                autoWidth: !0,
                autoHeight: !0,
                minWidth: 0,
                minHeight: 0,
                scrolling: "no",
                hasError: a,
                content: d.coming.tpl.error
            });
            d._afterLoad()
        },
        _loadImage: function() {
            var a = d.imgPreload = new Image;
            a.onload = function() {
                this.onload = this.onerror = null;
                d.coming.width = this.width / d.opts.pixelRatio;
                d.coming.height = this.height / d.opts.pixelRatio;
                d._afterLoad()
            };
            a.onerror = function() {
                this.onload = this.onerror = null;
                d._error("image")
            };
            a.src = d.coming.href;
            !0 !== a.complete && d.showLoading()
        },
        _loadAjax: function() {
            var a = d.coming;
            d.showLoading();
            d.ajaxLoad = e.ajax(e.extend({}, a.ajax, {
                url: a.href,
                error: function(a, b) {
                    d.coming && "abort" !== b ? d._error("ajax", a) : d.hideLoading()
                },
                success: function(b, c) {
                    "success" === c && (a.content = b, d._afterLoad())
                }
            }))
        },
        _loadIframe: function() {
            var a = d.coming,
                b = e(a.tpl.iframe.replace(/\{rnd\}/g, (new Date).getTime())).attr("scrolling", m ? "auto" : a.iframe.scrolling).attr("src", a.href);
            e(a.wrap).bind("onReset", function() {
                try {
                    e(this).find("iframe").hide().attr("src",
                        "//about:blank").end().empty()
                } catch (a) {}
            });
            a.iframe.preload && (d.showLoading(), b.one("load", function() {
                e(this).data("ready", 1);
                m || e(this).bind("load.fb", d.update);
                e(this).parents(".fancybox-wrap").width("100%").removeClass("fancybox-tmp").show();
                d._afterLoad()
            }));
            a.content = b.appendTo(a.inner);
            a.iframe.preload || d._afterLoad()
        },
        _preloadImages: function() {
            var a = d.group,
                b = d.current,
                c = a.length,
                e = b.preload ? Math.min(b.preload, c - 1) : 0,
                f, g;
            for (g = 1; g <= e; g += 1) f = a[(b.index + g) % c], "image" === f.type && f.href && ((new Image).src =
                f.href)
        },
        _afterLoad: function() {
            var a = d.coming,
                b = d.current,
                c, f, g, h, m;
            d.hideLoading();
            if (a && !1 !== d.isActive)
                if (!1 === d.trigger("afterLoad", a, b)) a.wrap.stop(!0).trigger("onReset").remove(), d.coming = null;
                else {
                    b && (d.trigger("beforeChange", b), b.wrap.stop(!0).removeClass("fancybox-opened").find(".fancybox-item, .fancybox-nav").remove());
                    d.unbindEvents();
                    c = a.content;
                    f = a.type;
                    g = a.scrolling;
                    e.extend(d, {
                        wrap: a.wrap,
                        skin: a.skin,
                        outer: a.outer,
                        inner: a.inner,
                        current: a,
                        previous: b
                    });
                    h = a.href;
                    switch (f) {
                        case "inline":
                        case "ajax":
                        case "html":
                            a.selector ?
                                c = e("<div>").html(c).find(a.selector) : l(c) && (c.data("fancybox-placeholder") || c.data("fancybox-placeholder", e('<div class="fancybox-placeholder"></div>').insertAfter(c).hide()), c = c.show().detach(), a.wrap.bind("onReset", function() {
                                e(this).find(c).length && c.hide().replaceAll(c.data("fancybox-placeholder")).data("fancybox-placeholder", !1)
                            }));
                            break;
                        case "image":
                            c = a.tpl.image.replace("{href}", h);
                            break;
                        case "swf":
                            c = '<object id="fancybox-swf" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="' +
                                h + '"></param>', m = "", e.each(a.swf, function(a, b) {
                                c += '<param name="' + a + '" value="' + b + '"></param>';
                                m += " " + a + '="' + b + '"'
                            }), c += '<embed src="' + h + '" type="application/x-shockwave-flash" width="100%" height="100%"' + m + "></embed></object>"
                    }
                    l(c) && c.parent().is(a.inner) || a.inner.append(c);
                    d.trigger("beforeShow");
                    a.inner.css("overflow", "yes" === g ? "scroll" : "no" === g ? "hidden" : g);
                    d._setDimension();
                    d.reposition();
                    d.isOpen = !1;
                    d.coming = null;
                    d.bindEvents();
                    if (!d.isOpened) e(".fancybox-wrap").not(a.wrap).stop(!0).trigger("onReset").remove();
                    else if (b.prevMethod) d.transitions[b.prevMethod]();
                    d.transitions[d.isOpened ? a.nextMethod : a.openMethod]();
                    d._preloadImages()
                }
        },
        _setDimension: function() {
            var a = d.getViewport(),
                b = 0,
                c = !1,
                f = !1,
                c = d.wrap,
                h = d.skin,
                m = d.inner,
                k = d.current,
                f = k.width,
                l = k.height,
                q = k.minWidth,
                p = k.minHeight,
                r = k.maxWidth,
                C = k.maxHeight,
                M = k.scrolling,
                G = k.scrollOutside ? k.scrollbarWidth : 0,
                z = k.margin,
                E = g(z[1] + z[3]),
                K = g(z[0] + z[2]),
                P, F, N, I, H, L, Q, J, O;
            c.add(h).add(m).width("auto").height("auto").removeClass("fancybox-tmp");
            z = g(h.outerWidth(!0) -
                h.width());
            P = g(h.outerHeight(!0) - h.height());
            F = E + z;
            N = K + P;
            I = u(f) ? (a.w - F) * g(f) / 100 : f;
            H = u(l) ? (a.h - N) * g(l) / 100 : l;
            if ("iframe" === k.type) {
                if (O = k.content, k.autoHeight && 1 === O.data("ready")) try {
                    O[0].contentWindow.document.location && (m.width(I).height(9999), L = O.contents().find("body"), G && L.css("overflow-x", "hidden"), H = L.outerHeight(!0))
                } catch (R) {}
            } else if (k.autoWidth || k.autoHeight) m.addClass("fancybox-tmp"), k.autoWidth || m.width(I), k.autoHeight || m.height(H), k.autoWidth && (I = m.width()), k.autoHeight && (H = m.height()),
                m.removeClass("fancybox-tmp");
            f = g(I);
            l = g(H);
            J = I / H;
            q = g(u(q) ? g(q, "w") - F : q);
            r = g(u(r) ? g(r, "w") - F : r);
            p = g(u(p) ? g(p, "h") - N : p);
            C = g(u(C) ? g(C, "h") - N : C);
            L = r;
            Q = C;
            k.fitToView && (r = Math.min(a.w - F, r), C = Math.min(a.h - N, C));
            F = a.w - E;
            K = a.h - K;
            k.aspectRatio ? (f > r && (f = r, l = g(f / J)), l > C && (l = C, f = g(l * J)), f < q && (f = q, l = g(f / J)), l < p && (l = p, f = g(l * J))) : (f = Math.max(q, Math.min(f, r)), k.autoHeight && "iframe" !== k.type && (m.width(f), l = m.height()), l = Math.max(p, Math.min(l, C)));
            if (k.fitToView)
                if (m.width(f).height(l), c.width(f + z), a = c.width(), E = c.height(),
                        k.aspectRatio)
                    for (;
                        (a > F || E > K) && f > q && l > p && !(19 < b++);) l = Math.max(p, Math.min(C, l - 10)), f = g(l * J), f < q && (f = q, l = g(f / J)), f > r && (f = r, l = g(f / J)), m.width(f).height(l), c.width(f + z), a = c.width(), E = c.height();
                else f = Math.max(q, Math.min(f, f - (a - F))), l = Math.max(p, Math.min(l, l - (E - K)));
            G && "auto" === M && l < H && f + z + G < F && (f += G);
            m.width(f).height(l);
            c.width(f + z);
            a = c.width();
            E = c.height();
            c = (a > F || E > K) && f > q && l > p;
            f = k.aspectRatio ? f < L && l < Q && f < I && l < H : (f < L || l < Q) && (f < I || l < H);
            e.extend(k, {
                dim: {
                    width: t(a),
                    height: t(E)
                },
                origWidth: I,
                origHeight: H,
                canShrink: c,
                canExpand: f,
                wPadding: z,
                hPadding: P,
                wrapSpace: E - h.outerHeight(!0),
                skinSpace: h.height() - l
            });
            !O && k.autoHeight && l > p && l < C && !f && m.height("auto")
        },
        _getPosition: function(a) {
            var b = d.current,
                c = d.getViewport(),
                e = b.margin,
                f = d.wrap.width() + e[1] + e[3],
                g = d.wrap.height() + e[0] + e[2],
                e = {
                    position: "absolute",
                    top: e[0],
                    left: e[3]
                };
            b.autoCenter && b.fixed && !a && g <= c.h && f <= c.w ? e.position = "fixed" : b.locked || (e.top += c.y, e.left += c.x);
            e.top = t(Math.max(e.top, e.top + (c.h - g) * b.topRatio));
            e.left = t(Math.max(e.left, e.left + (c.w -
                f) * b.leftRatio));
            return e
        },
        _afterZoomIn: function() {
            var a = d.current;
            a && ((d.isOpen = d.isOpened = !0, d.wrap.css("overflow", "visible").addClass("fancybox-opened"), d.update(), (a.closeClick || a.nextClick && 1 < d.group.length) && d.inner.css("cursor", "pointer").bind("click.fb", function(b) {
                e(b.target).is("a") || e(b.target).parent().is("a") || (b.preventDefault(), d[a.closeClick ? "close" : "next"]())
            }), a.closeBtn && e(a.tpl.closeBtn).appendTo(d.skin).bind("click.fb", function(a) {
                a.preventDefault();
                d.close()
            }), a.arrows && 1 < d.group.length &&
            ((a.loop || 0 < a.index) && e(a.tpl.prev).appendTo(d.outer).bind("click.fb", d.prev), (a.loop || a.index < d.group.length - 1) && e(a.tpl.next).appendTo(d.outer).bind("click.fb", d.next)), d.trigger("afterShow"), a.loop || a.index !== a.group.length - 1) ? d.opts.autoPlay && !d.player.isActive && (d.opts.autoPlay = !1, d.play()) : d.play(!1))
        },
        _afterZoomOut: function(a) {
            a = a || d.current;
            e(".fancybox-wrap").trigger("onReset").remove();
            e.extend(d, {
                group: {},
                opts: {},
                router: !1,
                current: null,
                isActive: !1,
                isOpened: !1,
                isOpen: !1,
                isClosing: !1,
                wrap: null,
                skin: null,
                outer: null,
                inner: null
            });
            d.trigger("afterClose", a)
        }
    });
    d.transitions = {
        getOrigPosition: function() {
            var a = d.current,
                b = a.element,
                c = a.orig,
                e = {},
                f = 50,
                g = 50,
                h = a.hPadding,
                k = a.wPadding,
                m = d.getViewport();
            !c && a.isDom && b.is(":visible") && (c = b.find("img:first"), c.length || (c = b));
            l(c) ? (e = c.offset(), c.is("img") && (f = c.outerWidth(), g = c.outerHeight())) : (e.top = m.y + (m.h - g) * a.topRatio, e.left = m.x + (m.w - f) * a.leftRatio);
            if ("fixed" === d.wrap.css("position") || a.locked) e.top -= m.y, e.left -= m.x;
            return e = {
                top: t(e.top - h * a.topRatio),
                left: t(e.left - k * a.leftRatio),
                width: t(f + k),
                height: t(g + h)
            }
        },
        step: function(a, b) {
            var c, e, f = b.prop;
            e = d.current;
            var h = e.wrapSpace,
                l = e.skinSpace;
            if ("width" === f || "height" === f) c = b.end === b.start ? 1 : (a - b.start) / (b.end - b.start), d.isClosing && (c = 1 - c), e = "width" === f ? e.wPadding : e.hPadding, e = a - e, d.skin[f](g("width" === f ? e : e - h * c)), d.inner[f](g("width" === f ? e : e - h * c - l * c))
        },
        zoomIn: function() {
            var a = d.current,
                b = a.pos,
                c = a.openEffect,
                f = "elastic" === c,
                g = e.extend({
                    opacity: 1
                }, b);
            delete g.position;
            f ? (b = this.getOrigPosition(), a.openOpacity &&
            (b.opacity = 0.1)) : "fade" === c && (b.opacity = 0.1);
            d.wrap.css(b).animate(g, {
                duration: "none" === c ? 0 : a.openSpeed,
                easing: a.openEasing,
                step: f ? this.step : null,
                complete: d._afterZoomIn
            })
        },
        zoomOut: function() {
            var a = d.current,
                b = a.closeEffect,
                c = "elastic" === b,
                e = {
                    opacity: 0.1
                };
            c && (e = this.getOrigPosition(), a.closeOpacity && (e.opacity = 0.1));
            d.wrap.animate(e, {
                duration: "none" === b ? 0 : a.closeSpeed,
                easing: a.closeEasing,
                step: c ? this.step : null,
                complete: d._afterZoomOut
            })
        },
        changeIn: function() {
            var a = d.current,
                b = a.nextEffect,
                c = a.pos,
                e = {
                    opacity: 1
                },
                f = d.direction,
                h;
            c.opacity = 0.1;
            "elastic" === b && (h = "down" === f || "up" === f ? "top" : "left", "down" === f || "right" === f ? (c[h] = t(g(c[h]) - 200), e[h] = "+=200px") : (c[h] = t(g(c[h]) + 200), e[h] = "-=200px"));
            "none" === b ? d._afterZoomIn() : d.wrap.css(c).animate(e, {
                duration: a.nextSpeed,
                easing: a.nextEasing,
                complete: d._afterZoomIn
            })
        },
        changeOut: function() {
            var a = d.previous,
                b = a.prevEffect,
                c = {
                    opacity: 0.1
                },
                f = d.direction;
            "elastic" === b && (c["down" === f || "up" === f ? "top" : "left"] = ("up" === f || "left" === f ? "-" : "+") + "=200px");
            a.wrap.animate(c, {
                duration: "none" === b ? 0 : a.prevSpeed,
                easing: a.prevEasing,
                complete: function() {
                    e(this).trigger("onReset").remove()
                }
            })
        }
    };
    d.helpers.overlay = {
        defaults: {
            closeClick: !0,
            speedOut: 200,
            showEarly: !0,
            css: {},
            locked: !m,
            fixed: !0
        },
        overlay: null,
        fixed: !1,
        el: e("html"),
        create: function(a) {
            a = e.extend({}, this.defaults, a);
            this.overlay && this.close();
            this.overlay = e('<div class="fancybox-overlay"></div>').appendTo(d.coming ? d.coming.parent : a.parent);
            this.fixed = !1;
            a.fixed && d.defaults.fixed && (this.overlay.addClass("fancybox-overlay-fixed"),
                this.fixed = !0)
        },
        open: function(a) {
            var b = this;
            a = e.extend({}, this.defaults, a);
            this.overlay ? this.overlay.unbind(".overlay").width("auto").height("auto") : this.create(a);
            this.fixed || (h.bind("resize.overlay", e.proxy(this.update, this)), this.update());
            a.closeClick && this.overlay.bind("click.overlay", function(a) {
                if (e(a.target).hasClass("fancybox-overlay")) return d.isActive ? d.close() : b.close(), !1
            });
            this.overlay.css(a.css).show()
        },
        close: function() {
            var a, b;
            h.unbind("resize.overlay");
            this.el.hasClass("fancybox-lock") &&
            (e(".fancybox-margin").removeClass("fancybox-margin"), a = h.scrollTop(), b = h.scrollLeft(), this.el.removeClass("fancybox-lock"), h.scrollTop(a).scrollLeft(b));
            e(".fancybox-overlay").remove().hide();
            e.extend(this, {
                overlay: null,
                fixed: !1
            })
        },
        update: function() {
            var a = "100%",
                c;
            this.overlay.width(a).height("100%");
            r ? (c = Math.max(b.documentElement.offsetWidth, b.body.offsetWidth), k.width() > c && (a = k.width())) : k.width() > h.width() && (a = k.width());
            this.overlay.width(a).height(k.height())
        },
        onReady: function(a, b) {
            var c = this.overlay;
            e(".fancybox-overlay").stop(!0, !0);
            c || this.create(a);
            a.locked && this.fixed && b.fixed && (c || (this.margin = k.height() > h.height() ? e("html").css("margin-right").replace("px", "") : !1), b.locked = this.overlay.append(b.wrap), b.fixed = !1);
            !0 === a.showEarly && this.beforeShow.apply(this, arguments)
        },
        beforeShow: function(a, b) {
            var c, d;
            b.locked && (!1 !== this.margin && (e("*").filter(function() {
                return "fixed" === e(this).css("position") && !e(this).hasClass("fancybox-overlay") && !e(this).hasClass("fancybox-wrap")
            }).addClass("fancybox-margin"),
                this.el.addClass("fancybox-margin")), c = h.scrollTop(), d = h.scrollLeft(), this.el.addClass("fancybox-lock"), h.scrollTop(c).scrollLeft(d));
            this.open(a)
        },
        onUpdate: function() {
            this.fixed || this.update()
        },
        afterClose: function(a) {
            this.overlay && !d.coming && this.overlay.fadeOut(a.speedOut, e.proxy(this.close, this))
        }
    };
    d.helpers.title = {
        defaults: {
            type: "float",
            position: "bottom"
        },
        beforeShow: function(a) {
            var b = d.current,
                c = b.title,
                f = a.type;
            e.isFunction(c) && (c = c.call(b.element, b));
            if (q(c) && "" !== e.trim(c)) {
                b = e('<div class="fancybox-title fancybox-title-' +
                    f + '-wrap">' + c + "</div>");
                switch (f) {
                    case "inside":
                        f = d.skin;
                        break;
                    case "outside":
                        f = d.wrap;
                        break;
                    case "over":
                        f = d.inner;
                        break;
                    default:
                        f = d.skin, b.appendTo("body"), r && b.width(b.width()), b.wrapInner('<span class="child"></span>'), d.current.margin[2] += Math.abs(g(b.css("margin-bottom")))
                }
                b["top" === a.position ? "prependTo" : "appendTo"](f)
            }
        }
    };
    e.fn.fancybox = function(a) {
        var b, c = e(this),
            f = this.selector || "",
            g = function(g) {
                var h = e(this).blur(),
                    l = b,
                    k, m;
                g.ctrlKey || g.altKey || g.shiftKey || g.metaKey || h.is(".fancybox-wrap") ||
                (k = a.groupAttr || "data-fancybox-group", m = h.attr(k), m || (k = "rel", m = h.get(0)[k]), m && "" !== m && "nofollow" !== m && (h = f.length ? e(f) : c, h = h.filter("[" + k + '="' + m + '"]'), l = h.index(this)), a.index = l, !1 !== d.open(h, a) && g.preventDefault())
            };
        a = a || {};
        b = a.index || 0;
        f && !1 !== a.live ? k.undelegate(f, "click.fb-start").delegate(f + ":not('.fancybox-item, .fancybox-nav')", "click.fb-start", g) : c.unbind("click.fb-start").bind("click.fb-start", g);
        this.filter("[data-fancybox-start=1]").trigger("click");
        return this
    };
    k.ready(function() {
        var b,
            g;
        e.scrollbarWidth === a && (e.scrollbarWidth = function() {
            var a = e('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo("body"),
                b = a.children(),
                b = b.innerWidth() - b.height(99).innerWidth();
            a.remove();
            return b
        });
        e.support.fixedPosition === a && (e.support.fixedPosition = function() {
            var a = e('<div style="position:fixed;top:20px;"></div>').appendTo("body"),
                b = 20 === a[0].offsetTop || 15 === a[0].offsetTop;
            a.remove();
            return b
        }());
        e.extend(d.defaults, {
            scrollbarWidth: e.scrollbarWidth(),
            fixed: e.support.fixedPosition,
            parent: e("body")
        });
        b = e(c).width();
        f.addClass("fancybox-lock-test");
        g = e(c).width();
        f.removeClass("fancybox-lock-test");
        e("<style type='text/css'>.fancybox-margin{margin-right:" + (g - b) + "px;}</style>").appendTo("head")
    })
})(window, document, jQuery);
jQuery.easing.jswing = jQuery.easing.swing;
jQuery.extend(jQuery.easing, {
    def: "easeOutQuad",
    swing: function(c, b, e, a, f) {
        return jQuery.easing[jQuery.easing.def](c, b, e, a, f)
    },
    easeInQuad: function(c, b, e, a, f) {
        return a * (b /= f) * b + e
    },
    easeOutQuad: function(c, b, e, a, f) {
        return -a * (b /= f) * (b - 2) + e
    },
    easeInOutQuad: function(c, b, e, a, f) {
        return 1 > (b /= f / 2) ? a / 2 * b * b + e : -a / 2 * (--b * (b - 2) - 1) + e
    },
    easeInCubic: function(c, b, e, a, f) {
        return a * (b /= f) * b * b + e
    },
    easeOutCubic: function(c, b, e, a, f) {
        return a * ((b = b / f - 1) * b * b + 1) + e
    },
    easeInOutCubic: function(c, b, e, a, f) {
        return 1 > (b /= f / 2) ? a / 2 * b * b * b + e :
        a / 2 * ((b -= 2) * b * b + 2) + e
    },
    easeInQuart: function(c, b, e, a, f) {
        return a * (b /= f) * b * b * b + e
    },
    easeOutQuart: function(c, b, e, a, f) {
        return -a * ((b = b / f - 1) * b * b * b - 1) + e
    },
    easeInOutQuart: function(c, b, e, a, f) {
        return 1 > (b /= f / 2) ? a / 2 * b * b * b * b + e : -a / 2 * ((b -= 2) * b * b * b - 2) + e
    },
    easeInQuint: function(c, b, e, a, f) {
        return a * (b /= f) * b * b * b * b + e
    },
    easeOutQuint: function(c, b, e, a, f) {
        return a * ((b = b / f - 1) * b * b * b * b + 1) + e
    },
    easeInOutQuint: function(c, b, e, a, f) {
        return 1 > (b /= f / 2) ? a / 2 * b * b * b * b * b + e : a / 2 * ((b -= 2) * b * b * b * b + 2) + e
    },
    easeInSine: function(c, b, e, a, f) {
        return -a * Math.cos(b /
                f * (Math.PI / 2)) + a + e
    },
    easeOutSine: function(c, b, e, a, f) {
        return a * Math.sin(b / f * (Math.PI / 2)) + e
    },
    easeInOutSine: function(c, b, e, a, f) {
        return -a / 2 * (Math.cos(Math.PI * b / f) - 1) + e
    },
    easeInExpo: function(c, b, e, a, f) {
        return 0 == b ? e : a * Math.pow(2, 10 * (b / f - 1)) + e
    },
    easeOutExpo: function(c, b, e, a, f) {
        return b == f ? e + a : a * (-Math.pow(2, -10 * b / f) + 1) + e
    },
    easeInOutExpo: function(c, b, e, a, f) {
        return 0 == b ? e : b == f ? e + a : 1 > (b /= f / 2) ? a / 2 * Math.pow(2, 10 * (b - 1)) + e : a / 2 * (-Math.pow(2, -10 * --b) + 2) + e
    },
    easeInCirc: function(c, b, e, a, f) {
        return -a * (Math.sqrt(1 - (b /= f) *
                b) - 1) + e
    },
    easeOutCirc: function(c, b, e, a, f) {
        return a * Math.sqrt(1 - (b = b / f - 1) * b) + e
    },
    easeInOutCirc: function(c, b, e, a, f) {
        return 1 > (b /= f / 2) ? -a / 2 * (Math.sqrt(1 - b * b) - 1) + e : a / 2 * (Math.sqrt(1 - (b -= 2) * b) + 1) + e
    },
    easeInElastic: function(c, b, e, a, f) {
        c = 1.70158;
        var h = 0,
            k = a;
        if (0 == b) return e;
        if (1 == (b /= f)) return e + a;
        h || (h = 0.3 * f);
        k < Math.abs(a) ? (k = a, c = h / 4) : c = h / (2 * Math.PI) * Math.asin(a / k);
        return -(k * Math.pow(2, 10 * (b -= 1)) * Math.sin(2 * (b * f - c) * Math.PI / h)) + e
    },
    easeOutElastic: function(c, b, e, a, f) {
        c = 1.70158;
        var h = 0,
            k = a;
        if (0 == b) return e;
        if (1 ==
            (b /= f)) return e + a;
        h || (h = 0.3 * f);
        k < Math.abs(a) ? (k = a, c = h / 4) : c = h / (2 * Math.PI) * Math.asin(a / k);
        return k * Math.pow(2, -10 * b) * Math.sin(2 * (b * f - c) * Math.PI / h) + a + e
    },
    easeInOutElastic: function(c, b, e, a, f) {
        c = 1.70158;
        var h = 0,
            k = a;
        if (0 == b) return e;
        if (2 == (b /= f / 2)) return e + a;
        h || (h = 0.3 * f * 1.5);
        k < Math.abs(a) ? (k = a, c = h / 4) : c = h / (2 * Math.PI) * Math.asin(a / k);
        return 1 > b ? -0.5 * k * Math.pow(2, 10 * (b -= 1)) * Math.sin(2 * (b * f - c) * Math.PI / h) + e : k * Math.pow(2, -10 * (b -= 1)) * Math.sin(2 * (b * f - c) * Math.PI / h) * 0.5 + a + e
    },
    easeInBack: function(c, b, e, a, f, h) {
        void 0 ==
        h && (h = 1.70158);
        return a * (b /= f) * b * ((h + 1) * b - h) + e
    },
    easeOutBack: function(c, b, e, a, f, h) {
        void 0 == h && (h = 1.70158);
        return a * ((b = b / f - 1) * b * ((h + 1) * b + h) + 1) + e
    },
    easeInOutBack: function(c, b, e, a, f, h) {
        void 0 == h && (h = 1.70158);
        return 1 > (b /= f / 2) ? a / 2 * b * b * (((h *= 1.525) + 1) * b - h) + e : a / 2 * ((b -= 2) * b * (((h *= 1.525) + 1) * b + h) + 2) + e
    },
    easeInBounce: function(c, b, e, a, f) {
        return a - jQuery.easing.easeOutBounce(c, f - b, 0, a, f) + e
    },
    easeOutBounce: function(c, b, e, a, f) {
        return (b /= f) < 1 / 2.75 ? 7.5625 * a * b * b + e : b < 2 / 2.75 ? a * (7.5625 * (b -= 1.5 / 2.75) * b + 0.75) + e : b < 2.5 / 2.75 ?
        a * (7.5625 * (b -= 2.25 / 2.75) * b + 0.9375) + e : a * (7.5625 * (b -= 2.625 / 2.75) * b + 0.984375) + e
    },
    easeInOutBounce: function(c, b, e, a, f) {
        return b < f / 2 ? 0.5 * jQuery.easing.easeInBounce(c, 2 * b, 0, a, f) + e : 0.5 * jQuery.easing.easeOutBounce(c, 2 * b - f, 0, a, f) + 0.5 * a + e
    }
});
! function() {
    "undefined" == typeof document || "classList" in document.createElement("a") || ! function(c) {
        if ("HTMLElement" in c || "Element" in c) {
            c = (c.HTMLElement || c.Element).prototype;
            var b = Object,
                e = String.prototype.trim || function() {
                        return this.replace(/^\s+|\s+$/g, "")
                    },
                a = Array.prototype.indexOf || function(a) {
                        for (var b = 0, c = this.length; c > b; b++)
                            if (b in this && this[b] === a) return b;
                        return -1
                    },
                f = function(a, b) {
                    this.name = a;
                    this.code = DOMException[a];
                    this.message = b
                },
                h = function(b, c) {
                    if ("" === c) throw new f("SYNTAX_ERR", "An invalid or illegal string was specified");
                    if (/\s/.test(c)) throw new f("INVALID_CHARACTER_ERR", "String contains an invalid character");
                    return a.call(b, c)
                },
                k = function(a) {
                    for (var b = e.call(a.className), b = b ? b.split(/\s+/) : [], c = 0, d = b.length; d > c; c++) this.push(b[c]);
                    this._updateClassName = function() {
                        a.className = this.toString()
                    }
                },
                d = k.prototype = [],
                r = function() {
                    return new k(this)
                };
            if (f.prototype = Error.prototype, d.item = function(a) {
                    return this[a] || null
                }, d.contains = function(a) {
                    return a += "", -1 !== h(this, a)
                }, d.add = function() {
                    var a, b = arguments,
                        c = 0,
                        d = b.length,
                        e = !1;
                    do a = b[c] + "", -1 === h(this, a) && (this.push(a), e = !0); while (++c < d);
                    e && this._updateClassName()
                }, d.remove = function() {
                    var a, b = arguments,
                        c = 0,
                        d = b.length,
                        e = !1;
                    do a = b[c] + "", a = h(this, a), -1 !== a && (this.splice(a, 1), e = !0); while (++c < d);
                    e && this._updateClassName()
                }, d.toggle = function(a, b) {
                    a += "";
                    var c = this.contains(a),
                        d = c ? !0 !== b && "remove" : !1 !== b && "add";
                    return d && this[d](a), !c
                }, d.toString = function() {
                    return this.join(" ")
                }, b.defineProperty) {
                d = {
                    get: r,
                    enumerable: !0,
                    configurable: !0
                };
                try {
                    b.defineProperty(c, "classList",
                        d)
                } catch (p) {
                    -2146823252 === p.number && (d.enumerable = !1, b.defineProperty(c, "classList", d))
                }
            } else b.prototype.__defineGetter__ && c.__defineGetter__("classList", r)
        }
    }(self);
    Window.prototype.addEventListener || (HTMLDocument.prototype.addEventListener = Element.prototype.addEventListener = Window.prototype.addEventListener = function(c, b, e) {
        if (e) throw Error("This implementation of addEventListener does not support the capture phase");
        var a = this;
        this.attachEvent("on" + c, function(c) {
            Object.defineProperty(c, "currentTarget", {
                get: function() {
                    return a
                }
            });
            Object.defineProperty(c, "eventPhase", {
                get: function() {
                    return c.srcElement == a ? 2 : 3
                }
            });
            var e = new Date;
            Object.defineProperty(c, "timeStamp", {
                get: function() {
                    return e
                }
            });
            b.call(a, c)
        })
    }, Object.defineProperty(Event.prototype, "target", {
        get: function() {
            return this.srcElement
        }
    }), Event.prototype.stopPropagation = function() {
        this.cancelBubble = !0
    }, Event.prototype.preventDefault = function() {
        this.returnValue = !1
    });
    document.getElementsByClassName || (document.getElementsByClassName = function(c) {
        return c =
            String(c).replace(/^|\s+/g, "."), document.querySelectorAll(c)
    }, Element.prototype.getElementsByClassName = document.getElementsByClassName);
    Array.prototype.indexOf || (Array.prototype.indexOf = function(c) {
        if (null == this) throw new TypeError;
        var b = Object(this),
            e = b.length >>> 0;
        if (0 === e) return -1;
        var a = 0;
        if (1 < arguments.length && (a = Number(arguments[1]), a != a ? a = 0 : 0 != a && 1 / 0 != a && a != -1 / 0 && (a = (0 < a || -1) * Math.floor(Math.abs(a)))), a >= e) return -1;
        for (a = 0 <= a ? a : Math.max(e - Math.abs(a), 0); e > a; a++)
            if (a in b && b[a] === c) return a;
        return -1
    })
}();
(function(c) {
    ({
        hasHeading: !1,
        dropdownHTML: null,
        config: {
            headings: "h1, h2, h3",
            landmarks: '[role=navigation], [role="main"], [role="search"]',
            accessKey: "0",
            wrap: "false",
            visibility: "onFocus"
        },
        setUpConfig: function(b) {
            var c, a = this.config;
            b = "undefined" != typeof b.settings ? b.settings.skipTo : {};
            for (c in b) a.hasOwnProperty(c) && (a[c] = b[c])
        },
        init: function(b) {
            this.setUpConfig(b);
            b = document.createElement("div");
            var c = document.body;
            this.addStyles(".skipTo{padding:.5em;position:absolute;background:transparent;color:#000;-webkit-transition:top .5s ease-out,background .5s linear;-moz-transition:top .5s ease-out,background .5s linear;-o-transition:top .5s ease-out,background .5s linear;transition:top .5s ease-out,background .5s linear}.skipTo:focus{position:absolute;top:0;left:0;background:#ccc;-webkit-transition:top .1s ease-in,background .3s linear;-moz-transition:top .1s ease-in,background .3s linear;-o-transition:top .1s ease-in,background .3s linear;transition:top .1s ease-in,background .3s linear}.onFocus{top:-5em;left:0}.onLoad{top:0;left:0;background:#ccc}.dropup,.dropMenu{position:relative}.dropMenu-toggle{*margin-bottom:-3px}.dropMenu-toggle:active,.open .dropMenu-toggle{outline:0}.caret{display:inline-block;width:0;height:0;vertical-align:top;border-top:4px solid #000;border-right:4px solid transparent;border-left:4px solid transparent;content:''}.dropMenu .caret{margin-top:8px;margin-left:2px}.dropMenu-menu{position:absolute;top:100%;left:0;z-index:1000;display:none;float:left;min-width:160px;padding:5px 0;margin:2px 0 0;list-style:none;background-color:#fff;border:1px solid #ccc;border:1px solid rgba(0,0,0,0.2);*border-right-width:2px;*border-bottom-width:2px;-webkit-border-radius:6px;-moz-border-radius:6px;border-radius:6px;-webkit-box-shadow:0 5px 10px rgba(0,0,0,0.2);-moz-box-shadow:0 5px 10px rgba(0,0,0,0.2);box-shadow:0 5px 10px rgba(0,0,0,0.2);-webkit-background-clip:padding-box;-moz-background-clip:padding;background-clip:padding-box}.dropMenu-menu.pull-right{right:0;left:auto}.dropMenu-menu .divider{*width:100%;height:1px;margin:9px 1px;*margin:-5px 0 5px;overflow:hidden;background-color:#e5e5e5;border-bottom:1px solid #fff}.dropMenu-menu>li>a{display:block;padding:3px 20px;clear:both;font-weight:normal;line-height:20px;color:#333;white-space:nowrap;text-decoration:none}.dropMenu-menu>li>a:hover,.dropMenu-menu>li>a:focus,.dropMenu-submenu:hover>a,.dropMenu-submenu:focus>a{text-decoration:none;color:#fff;background-color:#0081c2;background-image:-moz-linear-gradient(top,#08c,#0077b3);background-image:-webkit-gradient(linear,0 0,0 100%,from(#08c),to(#0077b3));background-image:-webkit-linear-gradient(top,#08c,#0077b3);background-image:-o-linear-gradient(top,#08c,#0077b3);background-image:linear-gradient(to bottom,#08c,#0077b3);background-repeat:repeat-x;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff0088cc',endColorstr='#ff0077b3',GradientType=0)}.dropMenu-menu>.active>a,.dropMenu-menu>.active>a:hover,.dropMenu-menu>.active>a:focus{color:#fff;text-decoration:none;outline:0;background-color:#0081c2;background-image:-moz-linear-gradient(top,#08c,#0077b3);background-image:-webkit-gradient(linear,0 0,0 100%,from(#08c),to(#0077b3));background-image:-webkit-linear-gradient(top,#08c,#0077b3);background-image:-o-linear-gradient(top,#08c,#0077b3);background-image:linear-gradient(to bottom,#08c,#0077b3);background-repeat:repeat-x;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff0088cc',endColorstr='#ff0077b3',GradientType=0)}.dropMenu-menu>.disabled>a,.dropMenu-menu>.disabled>a:hover,.dropMenu-menu>.disabled>a:focus{color:#999}.dropMenu-menu>.disabled>a:hover,.dropMenu-menu>.disabled>a:focus{text-decoration:none;background-color:transparent;background-image:none;filter:progid:DXImageTransform.Microsoft.gradient(enabled = false);cursor:default}.open{*z-index:1000}.open>.dropMenu-menu{display:block}.pull-right>.dropMenu-menu{right:0;left:auto}.dropup .caret,.navbar-fixed-bottom .dropMenu .caret{border-top:0;border-bottom:4px solid #000;content:''}.dropup .dropMenu-menu,.navbar-fixed-bottom .dropMenu .dropMenu-menu{top:auto;bottom:100%;margin-bottom:1px}.dropMenu-submenu{position:relative}.dropMenu-submenu>.dropMenu-menu{top:0;left:100%;margin-top:-6px;margin-left:-1px;-webkit-border-radius:0 6px 6px 6px;-moz-border-radius:0 6px 6px 6px;border-radius:0 6px 6px 6px}.dropMenu-submenu:hover>.dropMenu-menu{display:block}.dropup .dropMenu-submenu>.dropMenu-menu{top:auto;bottom:0;margin-top:0;margin-bottom:-2px;-webkit-border-radius:5px 5px 5px 0;-moz-border-radius:5px 5px 5px 0;border-radius:5px 5px 5px 0}.dropMenu-submenu>a:after{display:block;content:' ';float:right;width:0;height:0;border-color:transparent;border-style:solid;border-width:5px 0 5px 5px;border-left-color:#ccc;margin-top:5px;margin-right:-10px}.dropMenu-submenu:hover>a:after{border-left-color:#fff}.dropMenu-submenu.pull-left{float:none}.dropMenu-submenu.pull-left>.dropMenu-menu{left:-100%;margin-left:10px;-webkit-border-radius:6px 0 6px 6px;-moz-border-radius:6px 0 6px 6px;border-radius:6px 0 6px 6px}.dropMenu .dropMenu-menu .nav-header{padding-left:20px;padding-right:20px}");
            this.dropdownHTML = '<a accesskey="' + this.config.accessKey + '" data-wrap="' + this.config.wrap + '"class="dropMenu-toggle skipTo ' + this.config.visibility + '" id="drop4" role="button" aria-haspopup="true" ';
            this.dropdownHTML += 'aria-expanded="false" data-toggle="dropMenu" href="#" data-target="menu1">Skip to<b class="caret"></b></a>';
            this.dropdownHTML += '<ul id="menu1" class="dropMenu-menu" role="menu" aria-labelledby="drop4" style="top:3%; text-align:left">';
            this.getLandMarks();
            this.getHeadings();
            this.dropdownHTML +=
                "</ul>";
            this.hasHeading && (b.className = "dropMenu", c.insertBefore(b, c.firstChild), b.innerHTML = this.dropdownHTML, this.addListeners())
        },
        getHeadings: function() {
            var b, c, a, f, h = document.querySelectorAll(this.config.headings);
            b = 0;
            for (c = h.length; c > b; b += 1) this.hasHeading = !0, a = h[b], f = a.getAttribute("id") || a.innerHTML.replace(/\s+/g, "_").toLowerCase().replace(/[&\/\\#,+()$~%.'"!:*?<>{}\u00b9]/g, "") + "_" + b, a.tabIndex = "-1", a.setAttribute("id", f), this.dropdownHTML += '<li role="presentation" style="list-style:none outside none"><a tabindex="-1" role="menuitem"',
                this.dropdownHTML += ' href="#', this.dropdownHTML += f, this.dropdownHTML += '">', this.dropdownHTML += a.innerHTML.replace(/<\/?[^>]+>/gi, ""), this.dropdownHTML += "</a></li>"
        },
        getLandMarks: function() {
            var b, c, a, f, h = document.querySelectorAll(this.config.landmarks);
            b = 0;
            for (c = h.length; c > b; b += 1) this.hasHeading = !0, a = h[b], f = a.getAttribute("id") || "ui-skip-" + Math.floor(100 * Math.random() + 1), a.tabIndex = "-1", a.setAttribute("id", f), a = a.getAttribute("role"), "contentinfo" === a && (a = "footer"), this.dropdownHTML += '<li role="presentation" style="list-style:none outside none"><a tabindex="-1" role="menuitem"',
                this.dropdownHTML += ' href="#', this.dropdownHTML += f + '">', this.dropdownHTML += a.replace(/\w\S*/g, function(a) {
                return a.charAt(0).toUpperCase() + a.substr(1).toLowerCase()
            }), this.dropdownHTML += "main" === a ? " Content" : " Landmark role", this.dropdownHTML += "</a></li>"
        },
        addStyles: function(b) {
            var c, a = document.createElement("style"),
                f = document.getElementsByTagName("head")[0];
            a.setAttribute("type", "text/css");
            f.appendChild(a);
            a.styleSheet ? a.styleSheet.cssText = b : (c = document.createTextNode(b), a.appendChild(c))
        },
        addListeners: function() {
            window.addEventListener("hashchange",
                function() {
                    var b = document.getElementById(location.hash.substring(1));
                    b && (/^(?:a|select|input|button|textarea)$/i.test(b.tagName) || (b.tabIndex = -1), b.focus())
                }, !1)
        }
    }).init(c)
})(window.Drupal || window.Wordpress || window.SkipToConfig || {});
(function() {
    ({
        btn: null,
        prt: null,
        menu: null,
        wrap: "false",
        clearMenus: function() {
            var c = this;
            setTimeout(function() {
                c.prt.classList.contains("open") && !c.prt.contains(document.activeElement) && (c.prt.classList.remove("open"), c.btn.setAttribute("aria-expanded", "false"))
            }, 150)
        },
        toggleOptList: function(c) {
            this.btn = c.target;
            this.prt = this.btn.parentNode;
            this.menu = document.getElementById(this.btn.getAttribute("data-target"));
            "undefined" != typeof this.btn.getAttribute("data-wrap") && (this.wrap = this.btn.getAttribute("data-wrap"));
            this.prt.classList.toggle("open");
            this.prt.classList.contains("open") ? this.btn.setAttribute("aria-expanded", "true") : this.btn.setAttribute("aria-expanded", "false");
            try {
                this.menu.getElementsByTagName("a")[0].focus()
            } catch (b) {}
        },
        navigateMenus: function(c) {
            var b = c.keyCode || c.which,
                e = this.prt.classList.contains("open"),
                a = this.menu.getElementsByTagName("a"),
                f = Array.prototype.indexOf.call(a, c.target);
            if (/(32|38|40|27)/.test(b)) {
                switch (c.preventDefault(), b) {
                    case 40:
                        f += 1;
                        break;
                    case 38:
                        f -= 1;
                        break;
                    case 27:
                        if (e) return this.btn.click(),
                            this.btn.focus(), void 0
                }
                0 > f && (f = "true" === this.wrap ? a.length - 1 : 0);
                f === a.length && (f = "true" === this.wrap ? 0 : a.length - 1);
                a.item(f).focus()
            }
        },
        init: function() {
            var c, b, e, a, f, h, k = document.getElementsByClassName("dropMenu-toggle"),
                d = this;
            b = 0;
            for (e = k.length; e > b; b += 1)
                for (c = k[b], a = document.getElementById(c.getAttribute("data-target")), a = a.getElementsByTagName("a"), c.addEventListener("click", function(a) {
                    d.toggleOptList(a)
                }), c.addEventListener("keydown", function(a) {
                    32 === (a.keyCode || a.which) && (this.click(a), a.preventDefault())
                }),
                         c = 0, f = a.length; f > c; c += 1) h = a[c], h.addEventListener("keydown", function(a) {
                    d.navigateMenus(a)
                }), h.addEventListener("blur", function(a) {
                    d.clearMenus(a)
                })
        }
    }).init()
})();
(function(c) {
    c.fn.extend({
        leanModal: function(b) {
            function e(a) {
                c("#lean_overlay").fadeOut(200);
                c(a).css({
                    display: "none"
                })
            }
            var a = c("<div id='lean_overlay'></div>");
            c("body").append(a);
            b = c.extend({
                top: 100,
                overlay: 0.5,
                closeButton: null
            }, b);
            return this.each(function() {
                var a = b;
                c(this).click(function(b) {
                    var k = c(this).attr("href");
                    c("#lean_overlay").click(function() {
                        e(k)
                    });
                    c(a.closeButton).click(function() {
                        e(k)
                    });
                    c(k).outerHeight();
                    var d = c(k).outerWidth();
                    c("#lean_overlay").css({
                        display: "block",
                        opacity: 0
                    });
                    c("#lean_overlay").fadeTo(200, a.overlay);
                    c(k).css({
                        display: "block",
                        position: "fixed",
                        opacity: 0,
                        "z-index": 11E3,
                        left: "50%",
                        "margin-left": -(d / 2) + "px",
                        top: a.top + "px"
                    });
                    c(k).fadeTo(200, 1);
                    b.preventDefault()
                })
            })
        }
    })
})(jQuery);

//start bucket.js
function collage() {
    $(".Collage").removeWhitespace().collagePlus({
        fadeSpeed: 2e3,
        targetHeight: 200
    })
}

function putToTheSearchField(e) {
    if ($("#cse .gsc-input input").length) {
        $("#cse .gsc-input input").val(e);
        $("#cse .gsc-input input").focus();
        $("#cse .gsc-search-button").click()
    } else setTimeout('putToTheSearchField("' + e + '")', 200)
}

function getURLParameterByName(e) {
    e = e.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var t = "[\\?&]" + e + "=([^&#]*)";
    var n = new RegExp(t);
    var r = n.exec(window.location.href);
    if (r == null) return "";
    else return decodeURIComponent(r[1].replace(/\+/g, " "))
}

function getJobs(e) {
    $(".search_result h3").html(e.ResultSet.includeresultfound);
    $(".search_result h3").show();
    $(".search_result table").remove();
    $("#view_all").hide();
    if (parseInt(e.ResultSet.totalResultsAvailable)) {
        var t = document.createElement("TABLE");
        var n = true;
        for (var r in e.ResultSet.Result) {
            var i = document.createElement("tr");
            if (n) {
                i.className = "odd";
                n = false
            } else n = true;
            i.innerHTML = "<td><a href='" + e.ResultSet.Result[r].URL + "'>" + e.ResultSet.Result[r].Title + "</a></td><td>" + e.ResultSet.Result[r].Location + "</td>";
            t.appendChild(i)
        }
        $(".search_result h3").after(t);
        $("#view_all").show()
    }
}(function(e) {
    e.fn.collagePlus = function(t) {
        function n(t, n, i, s) {
            var o = i.padding * (t.length - 1) + t.length * t[0][3],
                u = i.albumWidth - o,
                a = u / (n - o),
                f = o,
                l = n < i.albumWidth ? true : false;
            for (var c = 0; c < t.length; c++) {
                var h = e(t[c][0]),
                    p = Math.floor(t[c][1] * a),
                    d = Math.floor(t[c][2] * a),
                    v = !!(c < t.length - 1);
                if (i.allowPartialLastRow === true && l === true) {
                    p = t[c][1];
                    d = t[c][2]
                }
                f += p;
                if (!v && f < i.albumWidth) {
                    if (i.allowPartialLastRow === true && l === true) {
                        p = p
                    } else {
                        p = p + (i.albumWidth - f)
                    }
                }
                p--;
                var m = h.is("img") ? h : h.find("img");
                m.width(p);
                if (!h.is("img")) {
                    h.width(p + t[c][3])
                }
                m.height(d);
                if (!h.is("img")) {
                    h.height(d + t[c][4])
                }
                r(h, v, i);
                m.one("load", function(e) {
                    return function() {
                        if (i.effect == "default") {
                            e.animate({
                                opacity: "1"
                            }, {
                                duration: i.fadeSpeed
                            })
                        } else {
                            if (i.direction == "vertical") {
                                var t = s <= 10 ? s : 10
                            } else {
                                var t = c <= 9 ? c + 1 : 10
                            }
                            e.removeClass(function(e, t) {
                                return (t.match(/\beffect-\S+/g) || []).join(" ")
                            });
                            e.addClass(i.effect);
                            e.addClass("effect-duration-" + t)
                        }
                    }
                }(h)).each(function() {
                    if (this.complete) e(this).trigger("load")
                })
            }
        }

        function r(e, t, n) {
            var r = {
                "margin-bottom": n.padding + "px",
                "margin-right": t ? n.padding + "px" : "0px",
                display: n.display,
                "vertical-align": "bottom",
                overflow: "hidden"
            };
            return e.css(r)
        }

        function i(t) {
            $img = e(t);
            var n = [];
            n["w"] = parseFloat($img.css("border-left-width")) + parseFloat($img.css("border-right-width"));
            n["h"] = parseFloat($img.css("border-top-width")) + parseFloat($img.css("border-bottom-width"));
            return n
        }
        return this.each(function() {
            var r = 0,
                s = [],
                o = 1,
                u = e(this);
            e.fn.collagePlus.defaults.albumWidth = u.width();
            e.fn.collagePlus.defaults.padding = parseFloat(u.css("padding-left"));
            e.fn.collagePlus.defaults.images = u.children();
            var a = e.extend({}, e.fn.collagePlus.defaults, t);
            a.images.each(function(t) {
                var u = e(this),
                    f = u.is("img") ? u : e(this).find("img");
                var l = typeof f.data("width") != "undefined" ? f.data("width") : f.width(),
                    c = typeof f.data("height") != "undefined" ? f.data("height") : f.height();
                var h = i(f);
                f.data("width", l);
                f.data("height", c);
                var p = Math.ceil(l / c * a.targetHeight),
                    d = Math.ceil(a.targetHeight);
                s.push([this, p, d, h["w"], h["h"]]);
                r += p + h["w"] + a.padding;
                if (r > a.albumWidth && s.length != 0) {
                    n(s, r - a.padding, a, o);
                    delete r;
                    delete s;
                    r = 0;
                    s = [];
                    o += 1
                }
                if (a.images.length - 1 == t && s.length != 0) {
                    n(s, r, a, o);
                    delete r;
                    delete s;
                    r = 0;
                    s = [];
                    o += 1
                }
            })
        })
    };
    e.fn.collagePlus.defaults = {
        targetHeight: 400,
        fadeSpeed: "fast",
        display: "inline-block",
        effect: "default",
        direction: "vertical",
        allowPartialLastRow: false
    }
})(jQuery);
(function(e) {
    e.fn.removeWhitespace = function() {
        this.contents().filter(function() {
            return this.nodeType == 3 && !/\S/.test(this.nodeValue)
        }).remove();
        return this
    }
})(jQuery);
(function() {
    var e;
    e = jQuery;
    e.fn.secondMenu = function(t) {
        var n, r, i, s, o, u, a, f, l, c, h, p;
        l = e.extend({
            animationSpeed: 100,
            transitionOpacity: true,
            buttonSelector: "#second-menu",
            hoverIntent: true,
            hoverIntentTimeout: 150,
            calcItemWidths: false,
            hover: true
        }, t);
        n = e(this);
        n.addClass("with-js");
        if (l.transitionOpacity === true) {
            n.addClass("opacity")
        }
        n.find("li").each(function() {
            if (e(this).has("ul").length) {
                return e(this).addClass("item-with-ul").find("ul").hide()
            }
        });
        if (l.calcItemWidths === true) {
            r = n.find(">li");
            s = r.length;
            u = 100 / s;
            o = u + "%"
        }
        if (n.data("breakpoint")) {
            i = n.data("breakpoint")
        }
        c = function() {
            if (n.hasClass("lg-screen") === true && l.hover === true) {
                if (l.transitionOpacity === true) {
                    return e(this).find(">ul").addClass("second-menu-show").stop(true, true).animate({
                        height: ["toggle", "swing"],
                        opacity: "toggle"
                    }, l.animationSpeed)
                } else {
                    return e(this).find(">ul").addClass("second-menu-show").stop(true, true).animate({
                        height: ["toggle", "swing"]
                    }, l.animationSpeed)
                }
            }
        };
        a = function() {
            if (n.hasClass("lg-screen") === true && e(this).find(">ul").hasClass("second-menu-show") === true && l.hover === true) {
                if (l.transitionOpacity === true) {
                    return e(this).find(">ul").removeClass("second-menu-show").stop(true, true).animate({
                        height: ["toggle", "swing"],
                        opacity: "toggle"
                    }, l.animationSpeed)
                } else {
                    return e(this).find(">ul").removeClass("second-menu-show").stop(true, true).animate({
                        height: ["toggle", "swing"]
                    }, l.animationSpeed)
                }
            }
        };
        f = function() {
            var t;
            if (e(window).width() <= i) {
                n.removeClass("lg-screen").addClass("sm-screen");
                if (l.calcItemWidths === true) {
                    r.css("width", "100%")
                }
                t = l["buttonSelector"] + ", " + l["buttonSelector"] + " .touch-button";
                e(t).removeClass("active");
                return e(".one-page li a").on("click", function() {
                    return n.removeClass("second-menu-show")
                })
            } else if (e(window).width() > i) {
                n.removeClass("sm-screen").addClass("lg-screen");
                if (l.calcItemWidths === true) {
                    r.css("width", o)
                }
                n.removeClass("second-menu-show").find(".item-with-ul").on();
                e(".item-with-ul").find("ul").removeClass("second-menu-show");
                a();
                if (l.hoverIntent === true) {
                    return e(".item-with-ul").hoverIntent({
                        over: c,
                        out: a,
                        timeout: l.hoverIntentTimeout
                    })
                } else if (l.hoverIntent === false) {
                    return e(".item-with-ul").on("mouseenter", c).on("mouseleave", a)
                }
            }
        };
        e(l["buttonSelector"]).data("navEl", n);
        p = ".item-with-ul, " + l["buttonSelector"];
        e(p).append('<span class="touch-button"><i class="navicon">&#9776;</i></span>');
        h = l["buttonSelector"] + ", " + l["buttonSelector"] + " .touch-button";
        e(h).on("click", function(t) {
            var n, r, i;
            e(h).toggleClass("active");
            t.preventDefault();
            t.stopPropagation();
            i = l["buttonSelector"];
            n = e(this).is(i) ? e(this) : e(this).parent(i);
            r = n.data("navEl");
            return r.toggleClass("second-menu-show")
        });
        e(".touch-button").on("click", function(t) {
            var r, i;
            r = e(this).parent(".item-with-ul").find(">ul");
            i = e(this).parent(".item-with-ul").find(">span.touch-button");
            if (n.hasClass("lg-screen") === true) {
                e(this).parent(".item-with-ul").siblings().find("ul.second-menu-show").removeClass("second-menu-show").hide()
            }
            if (r.hasClass("second-menu-show") === true) {
                r.removeClass("second-menu-show").slideUp(l.animationSpeed);
                return i.removeClass("active")
            } else if (r.hasClass("second-menu-show") === false) {
                r.addClass("second-menu-show").slideDown(l.animationSpeed);
                return i.addClass("active")
            }
        });
        n.find(".item-with-ul *").focus(function() {
            e(this).parent(".item-with-ul").parent().find(".open").not(this).removeClass("open").hide();
            return e(this).parent(".item-with-ul").find(">ul").addClass("open").show()
        });
        f();
        return e(window).on("resize", f)
    }
}).call(this);

(function() {
    var e;
    e = jQuery;
    e.fn.flexNav = function(t) {
        var n, r, i, s, o, u, a, f, l, c, h, p;
        l = e.extend({
            animationSpeed: 100,
            transitionOpacity: true,
            buttonSelector: "#main-menu",
            hoverIntent: false,
            hoverIntentTimeout: 150,
            calcItemWidths: false,
            hover: true
        }, t);
        n = e(this);
        n.addClass("with-js");
        if (l.transitionOpacity === true) {
            n.addClass("opacity")
        }
        n.find("li").each(function() {
            if (e(this).has("ul").length) {
                return e(this).addClass("item-with-ul").find("ul").hide()
            }
        });
        if (l.calcItemWidths === true) {
            r = n.find(">li");
            s = r.length;
            u = 100 / s;
            o = u + "%"
        }
        if (n.data("breakpoint")) {
            i = n.data("breakpoint")
        }
        c = function() {
            if (n.hasClass("lg-screen") === true && l.hover === true) {
                if (l.transitionOpacity === true) {
                    return e(this).find(">ul").addClass("flexnav-show").stop(true, true).animate({
                        height: ["toggle", "swing"],
                        opacity: "toggle"
                    }, l.animationSpeed)
                } else {
                    return e(this).find(">ul").addClass("flexnav-show").stop(true, true).animate({
                        height: ["toggle", "swing"]
                    }, l.animationSpeed)
                }
            }
        };
        a = function() {
            if (n.hasClass("lg-screen") === true && e(this).find(">ul").hasClass("flexnav-show") === true && l.hover === true) {
                if (l.transitionOpacity === true) {
                    return e(this).find(">ul").removeClass("flexnav-show").stop(true, true).animate({
                        height: ["toggle", "swing"],
                        opacity: "toggle"
                    }, l.animationSpeed)
                } else {
                    return e(this).find(">ul").removeClass("flexnav-show").stop(true, true).animate({
                        height: ["toggle", "swing"]
                    }, l.animationSpeed)
                }
            }
        };
        f = function() {
            var t;
            if (e(window).width() <= i) {
                n.removeClass("lg-screen").addClass("sm-screen");
                if (l.calcItemWidths === true) {
                    r.css("width", "100%")
                }
                t = l["buttonSelector"] + ", " + l["buttonSelector"] + " .touch-button";
                e(t).removeClass("active");
                return e(".one-page li a").on("click", function() {
                    return n.removeClass("flexnav-show")
                })
            } else if (e(window).width() > i) {
                n.removeClass("sm-screen").addClass("lg-screen");
                if (l.calcItemWidths === true) {
                    r.css("width", o)
                }
                n.removeClass("flexnav-show").find(".item-with-ul").on();
                e(".item-with-ul").find("ul").removeClass("flexnav-show");
                a();
                if (l.hoverIntent === true) {
                    return e(".item-with-ul").hoverIntent({
                        over: c,
                        out: a,
                        timeout: l.hoverIntentTimeout
                    })
                } else if (l.hoverIntent === false) {
                    return e(".item-with-ul").on("mouseenter", c).on("mouseleave", a)
                }
            }
        };
        e(l["buttonSelector"]).data("navEl", n);
        p = ".item-with-ul, " + l["buttonSelector"];
        e(p).append('<span class="touch-button"><i class="navicon">&#9776;</i></span>');
        h = l["buttonSelector"] + ", " + l["buttonSelector"] + " .touch-button";
        e(h).on("click", function(t) {
            var n, r, i;
            e(h).toggleClass("active");
            t.preventDefault();
            t.stopPropagation();
            i = l["buttonSelector"];
            n = e(this).is(i) ? e(this) : e(this).parent(i);
            r = n.data("navEl");
            return r.toggleClass("flexnav-show")
        });
        e(".touch-button").on("click", function(t) {
            var r, i;
            r = e(this).parent(".item-with-ul").find(">ul");
            i = e(this).parent(".item-with-ul").find(">span.touch-button");
            if (n.hasClass("lg-screen") === true) {
                e(this).parent(".item-with-ul").siblings().find("ul.flexnav-show").removeClass("flexnav-show").hide()
            }
            if (r.hasClass("flexnav-show") === true) {
                r.removeClass("flexnav-show").slideUp(l.animationSpeed);
                return i.removeClass("active")
            } else if (r.hasClass("flexnav-show") === false) {
                r.addClass("flexnav-show").slideDown(l.animationSpeed);
                return i.addClass("active")
            }
        });
        n.find(".item-with-ul *").focus(function() {
            e(this).parent(".item-with-ul").parent().find(".open").not(this).removeClass("open").hide();
            return e(this).parent(".item-with-ul").find(">ul").addClass("open").show()
        });
        f();
        return e(window).on("resize", f)
    }
}).call(this);
$(".flexnav").flexNav();
$(".second-menu").secondMenu();
$(window).load(function() {
    collage()
});
var resizeTimer = null;
$(window).bind("resize", function() {
    $(".Collage .Image_Wrapper").css("opacity", 0);
    if (resizeTimer) clearTimeout(resizeTimer);
    resizeTimer = setTimeout(collage, 200)
});
$(document).ready(function() {
    var e = "";
    if ($("#g_search").length) {
        var t = getURLParameterByName("search");
        if (t != "") {
            putToTheSearchField(t.replace('"', ""))
        }
    } else if ($("#s_careers").length && $("#career_search").length) {
        $("#career_search_button").click(function(e) {
            e.preventDefault();
            var t = $("#career_search").val();
            t = $.trim(t);
            if (t != "") {
                window.location = $(this).parent("form").attr("action") + t
            } else alert("To use search please enter 2 or more letters")
        });
        $("#view_all").click(function(e) {
            e.preventDefault();
            $("#career_search_button").click()
        });
        $("#career_search").keyup(function(t) {
            var n = $("#career_search").val();
            n = $.trim(n);
            if (n != "" && n.length >= 2 && e != n) {
                e = n;
                $.ajax({
                    url: "http://jobs.bayada.com/WidgetSearchResults.aspx?ss=paid&utm_source=JobSearchWidget&utm_medium=CareerSite&utm_campaign=TBWidgets&rc=10&col=1234&id=web&rf={0}%20Results%20Found&pop=1&key=" + n,
                    crossDomain: true,
                    dataType: "jsonp"
                })
            }
        })
    }
});
$(document).ready(function() {
    var e = location.href.toLowerCase();
    $(".nav-wrap li a").each(function() {
        if (e.indexOf(this.href.toLowerCase()) > -1) {
            $("li.highlight").removeClass("highlight");
            $(this).parent().addClass("highlight")
        }
    });
    $("li.highlight").parents().each(function() {
        if ($(this).is("li")) {
            $(this).addClass("highlight")
        }
    })
});
$(document).ready(function() {
    $(".various").fancybox({
        maxWidth: 800,
        maxHeight: 800,
        fitToView: false,
        width: "90%",
        height: "80%",
        autoSize: false,
        closeClick: false,
        openEffect: "none",
        closeEffect: "none"
    })
});
$(function() {
    var e = $("[rel~=tooltip]"),
        t = false,
        n = false,
        r = false;
    e.bind("mouseenter", function() {
        t = $(this);
        tip = t.attr("title");
        n = $('<div id="tooltip"></div>');
        if (!tip || tip == "") return false;
        t.removeAttr("title");
        n.css("opacity", 0).html(tip).appendTo("body");
        var e = function() {
            if ($(window).width() < n.outerWidth() * 1.5) n.css("max-width", $(window).width() / 2);
            else n.css("max-width", 340);
            var e = t.offset().left + t.outerWidth() / 2 - n.outerWidth() / 2,
                r = t.offset().top - n.outerHeight() - 20;
            if (e < 0) {
                e = t.offset().left + t.outerWidth() / 2 - 20;
                n.addClass("left")
            } else n.removeClass("left");
            if (e + n.outerWidth() > $(window).width()) {
                e = t.offset().left - n.outerWidth() + t.outerWidth() / 2 + 20;
                n.addClass("right")
            } else n.removeClass("right");
            if (r < 0) {
                var r = t.offset().top + t.outerHeight();
                n.addClass("top")
            } else n.removeClass("top");
            n.css({
                left: e,
                top: r
            }).animate({
                top: "+=10",
                opacity: 1
            }, 50)
        };
        e();
        $(window).resize(e);
        var r = function() {
            n.animate({
                top: "-=10",
                opacity: 0
            }, 50, function() {
                $(this).remove()
            });
            t.attr("title", tip)
        };
        t.bind("mouseleave", r);
        n.bind("click", r)
    })
});
$(function() {
    $("a[rel*=leanModal]").leanModal({
        top: 100,
        closeButton: ".modal_close"
    })
});
$(document).ready(function() {
    var e = $("#accordion").zozoAccordion({
        theme: "crystal",
        orientation: "vertical",
        sectionSpacing: 4,
        headerSize: 54,
        shadows: true,
        headerFontSize: .075,
        responsive: true,
        scrollable: true,
        bordered: true,
        rounded: true,
        animation: {
            duration: 400,
            easing: "easeInOutCubic"
        }
    });
    var e = $(".accordion2").zozoAccordion({
        theme: "crystal",
        orientation: "vertical",
        sectionSpacing: 4,
        headerSize: 54,
        shadows: true,
        headerFontSize: .075,
        responsive: true,
        scrollable: true,
        bordered: true,
        rounded: true,
        animation: {
            duration: 400,
            easing: "easeInOutCubic"
        }
    })
});
$(window).load(function() {
    $("#carousel").flexslider({
        animation: "slide",
        controlNav: false,
        animationLoop: false,
        slideshow: false,
        itemWidth: 210,
        itemMargin: 5,
        asNavFor: "#slider"
    });
    $("#slider").flexslider({
        animation: "slide",
        controlNav: false,
        animationLoop: false,
        slideshow: false,
        sync: "#carousel"
    })
});
$(window).load(function() {
    $(".flexslider").flexslider({
        animation: "slide"
    })
});