function rotate(degrees) {
    if (degrees > 90) {
        var recurse = rotate(degrees - 90);
        var base = rotate(90);
        return function(pattern) {
            return recurse(base(pattern));
        };
    }
    return function(pattern) {
        return {
            top: pattern.left,
            right: pattern.top,
            bottom: pattern.right,
            left: pattern.bottom,
        };
    };
}

function toggle(items) {
    return function(pattern) {
        items.forEach(function(key) {
            pattern[key] = !pattern[key];
        });
        return pattern;
    }
}

(function($) {
    $.fn.getPattern = function() {
        return {
            top: this.find(".top").hasClass("on"),
            right: this.find(".right").hasClass("on"),
            bottom: this.find(".bottom").hasClass("on"),
            left: this.find(".left").hasClass("on"),
        };
    };

    $.fn.setPattern = function(pattern) {
        this.find(".tile").removeClass("on");
        if (pattern.top) {
            this.find(".top").addClass("on");
        }
        if (pattern.right) {
            this.find(".right").addClass("on");
        }
        if (pattern.bottom) {
            this.find(".bottom").addClass("on");
        }
        if (pattern.left) {
            this.find(".left").addClass("on");
        }
    };

    $.fn.transformPattern = function(f) {
        this.setPattern(f(this.getPattern()));
    };
})(jQuery);

$(document).ready(function() {
    $("#one .western").setPattern({
        top: false,
        right: false,
        bottom: false,
        left: false,
    });

    $("#one .eastern").setPattern({
        top: true,
        right: false,
        bottom: false,
        left: false,
    });

    $("#a").click(function(event) {
        $("#one .western").transformPattern(toggle(["top", "left", "bottom"]));
        event.preventDefault();
    })

    $("#b").click(function(event) {
        $("#one .western").transformPattern(rotate(270));
        event.preventDefault();
    });

    $("#two .western").setPattern({
        top: false,
        right: false,
        bottom: false,
        left: false,
    });

    $("#two .eastern").setPattern({
        top: false,
        right: true,
        bottom: false,
        left: true,
    });

    $("#c").click(function(event) {
        $("#two .western").transformPattern(function(pattern) {
            if (pattern.top && pattern.right) {
                pattern.top = pattern.right = false;
            } else if (pattern.top || pattern.right) {
                pattern.top = pattern.right = true;
            }
            if (pattern.bottom && pattern.left) {
                pattern.bottom = pattern.left = false;
            } else if (pattern.bottom || pattern.left) {
                pattern.bottom = pattern.left = true;
            }
            return pattern;
        });
        event.preventDefault();
    })

    $("#d").click(function(event) {
        $("#two .western").transformPattern(rotate(180));
        event.preventDefault();
    })

    $("#e").click(function(event) {
        $("#two .western").transformPattern(toggle(["top"]));
        event.preventDefault();
    });
});
