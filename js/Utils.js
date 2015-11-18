var Utils = (function () {
    'use strict';

    var method = {};

    method.FadeOut = function (el) {
        el.style.opacity = 1;

        (function fade() {
            if ((el.style.opacity -= .1) < 0) {
                el.style.visibility = "none";
            } else {
                requestAnimationFrame(fade);
            }
        })();
    };

    method.FadeIn = function (el, display) {
        el.style.opacity = 0;
        el.style.display = display || "block";

        (function fade() {
            var val = parseFloat(el.style.opacity);
            if (!((val += .1) > 1)) {
                el.style.opacity = val;
                requestAnimationFrame(fade);
            }
        })();
    };

    method.HasClass = function (ele, cls) {
        return ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
    };

    method.AddClass = function (ele, cls) {
        if (!method.HasClass(ele, cls)) ele.className += " " + cls;
    };

    method.RemoveClassWithName = function (ele, cls) {
        if (method.HasClass(ele, cls)) {
            var reg       = new RegExp('(\\s|^)' + cls + '(\\s|$)');
            ele.className = ele.className.replace(reg, ' ');
        }
    };

    method.SetAnimationDelay = function (el, cls, ms) {
        setTimeout(function () {
            method.AddClass(el, cls);
        }, ms);
    };

    method.GetElementID = function (id) {
        return document.getElementById(id);
    };

    method.GetElementClass = function (el) {
        return document.getElementsByName(el);
    };

    method.GetElementTag = function (el) {
        return document.getElementsByTagName(el);
    };

    method.RemoveClassAttribute = function (el) {
        if (el.className !== '') el.className = '';
    };

    method.IsObjectEmpty = function(obj) {

        // null and undefined are "empty"
        if (obj == null) return true;

        // Assume if it has a length property with a non-zero value
        // that that property is correct.
        if (obj.length > 0)    return false;
        if (obj.length === 0)  return true;

        // Otherwise, does it have any properties of its own?
        // Note that this doesn't handle
        // toString and valueOf enumeration bugs in IE < 9
        for (var key in obj) {
            if (hasOwnProperty.call(obj, key)) return false;
        }

        return true;
    };

    method.IsNullOrDefault = function (value, defaultValue) {
        return value != '' ? value : defaultValue;
    };

    method.SetStyle = function (el, style) {
      el.style = style;
    };

    Array.prototype.unique = function () {
        var n = {}, r = [];
        for (var i = 0; i < this.length; i++) {
            if (!n[this[i]]) {
                n[this[i]] = true;
                r.push(this[i]);
            }
        }
        return r;
    };

    return method;

}());
