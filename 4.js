/*! 1 2014-07-30 */
var _config = {color: {allTime: 60,addTime: 0,lvMap: [2, 3, 4, 5, 5, 6, 6, 7, 7, 7, 8, 8, 8, 8, 8, 8, 9]},pic: {isOpen: !1,allTime: 5,addTime: 0,lvMap: [2, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8]}};
!function() {
    var a = $("#box"), b = {lv: $("#room .lv em"),time: $("#room .time"),start: $("#dialog .btn-restart"),back: $("#dialog .btn-back"),share: $("#dialog .btn-share"),pause: $("#room .btn-pause"),resume: $("#dialog .btn-resume"),dialog: $("#dialog"),d_content: $("#dialog .content"),d_pause: $("#dialog .pause"),d_gameover: $("#dialog .gameover")}, c = {init: function(a, b, c) {
        this.type = a, this.api = API[a], this.config = _config[a], this.reset(), this.parent = c, this.el = b, this.renderUI(), this.inited || this.initEvent(), this.inited = !0, this.start()
    },renderUI: function() {
        var b = 90 == window.orientation || -90 == window.orientation, c = b ? window.innerHeight : window.innerWidth;
        c -= 20, c = Math.min(c, 500), a.width(c).height(c), this.el.show()
    },initEvent: function() {
        var d = "ontouchstart" in document.documentElement ? "touchend" : "click", e = this;
        $(window).resize(function() {
            c.renderUI()
        }), a.on(d, "span", function() {
            var a = $(this).data("type");
            "a" == a && e.nextLv.call(e)
        }), b.pause.on(d, _.bind(this.pause, this)), b.resume.on(d, _.bind(this.resume, this)), b.start.on(d, _.bind(this.start, this)), b.back.on(d, _.bind(this.back, this)), b.share.on(d, _.bind(this.share, this))
    },start: function() {
//        游戏开始界面
        this.time > 5 && b.time.removeClass("danger"), b.dialog.hide(), this._pause = !1, this.lv = "undefined" != typeof this.lv ? this.lv + 1 : 0, this.lvMap = this.config.lvMap[this.lv] || _.last(this.config.lvMap), this.renderMap(), this.renderInfo(), this.timer || (this.timer = setInterval(_.bind(this.tick, this), 1e3))
    },share: function() {
    },resume: function() {
//        游戏继续界面
        b.dialog.hide(), this._pause = !1
    },pause: function() {
//        游戏暂停界面
        this._pause = !0, b.d_content.hide(), b.d_pause.show(), b.dialog.show();
    },tick: function() {
        return this._pause ? void 0 : (this.time--, this.time < 6 && b.time.addClass("danger"), this.time < 0 ? void this.gameOver() : void b.time.text(parseInt(this.time)))
    },renderMap: function() {
        if (!this._pause) {
            var b = this.lvMap * this.lvMap, c = "", d = "lv" + this.lvMap;
            _(b).times(function() {
                c += "<span></span>"
            }), a.attr("class", d).html(c), this.api.render(this.lvMap, this.lv)
        }
    },renderInfo: function() {
        b.lv.text(this.lv)
    },gameOver: function() {
        try {
            WeixinJSBridge.call("showOptionMenu");
        } catch (c) {
        }
        var d = this.api.getGameOverText(this.lv-1);
        this.lastLv = this.lv, this.lastGameTxt = d.txt, this.lastGamePercent = d.percent;

        // var shareTitle = this.lastLv > 0 ? "我闯过" + (this.lastLv + 1) + "关，击败" + this.lastGamePercent + "%的人！我是【" + this.lastGameTxt + "】！不服来战！" : "看你有多色？";
        var roleName;
        function ChangeName(roleid){
            switch (roleid){
                case 1:roleName="汪涵";break;
                case 2:roleName="曹格";break;
                case 3:roleName="小五";break;
                default :break;
            }
            return roleName;

        }
        var name = ChangeName(role);
        var shareTitle = "我在1分钟内" + (this.lastLv) + "次找到"+name+"假扮的Grace姐姐！";
        window.shareData.tTitle=shareTitle;
        btGame.setShare({
            title: shareTitle
        });
        if (this.lastLv > 0) {
            var scoreMsg = "你一共" + (this.lastLv) + "次找到"+name+"假扮的Grace姐姐" ;
            window.shareData.tTitle="我找到"+name+"假扮Grace姐姐"+(this.lastLv)+"次!不服?你也来试试";
            btGame.playScoreMsg(scoreMsg);
        }

        b.d_content.hide(), b.d_gameover.show().find("h3").html(this.lastGameTxt), a.find("span").fadeOut(1e3, function() {
            b.dialog.fadeIn()
        }), this._pause = !0, this.reset()
    },reset: function() {
        this.time = this.config.allTime, this.lv = -1
    },nextLv: function() {
        this.time += this.config.addTime, b.time.text(parseInt(this.time)), this._pause || this.start()
    },back: function() {
        this._pause = !0, this.el.hide(), b.dialog.hide(), this.parent.render()
    }};
    window.Game = c
}(), function(a) {
    var b = {index: $("#index"),room: $("#room"),loading: $("#loading"),dialog: $("#dialog"),play: $(".play-btn")}, c = {init: function() {
        this.initEvent(), this.loading()
    },loading: function() {
        function a() {
            f++, f == e && c.render()
        }
        function b() {
        }
        if (_config.pic.isOpen)
            for (var d = ["assets/img/1.png", "assets/img/2.png", "assets/img/3.png", "assets/img/4.png", "assets/img/5.png", "assets/img/6.png", "assets/img/7.png", "assets/img/8.png", "assets/img/9.png", "assets/img/10.png", "assets/img/11.png", "assets/img/12.png", "assets/img/13.png", "assets/img/14.png", "assets/img/15.png", "assets/img/16.png", "assets/img/17.png", "assets/img/18.png"], e = d.length, f = 0, g = 0; e > g; g++) {
                var h = new Image;
                h.onload = a, h.src = d[g]
            } else
            c.render();
    }, render: function() {
        b.loading.hide(), b.index.show()
    },initEvent: function() {
        var a = "ontouchstart" in document.documentElement ? "touchstart" : "click", c = this;
        b.play.on(a, function() {
            var a = $(this).data("type") || "color";
            b.index.hide(), Game.init(a, b.room, c)
        })
    }};
    c.init(), a.API = {}
}(window), function() {
    var a = $("#box"), b = "span", c = $("#help p"), d = $("#help_color"),
//        e = {lvT: ["姐姐脑残粉", "姐姐的忠实粉", "姐姐的路人粉", "慧眼识姐姐", "火眼金睛", "洞察一切", "两眼冒光", "24k氪金眼", "已被亮瞎！"],
        e = {lvT: ["Grace姐姐普通粉","Grace姐姐普通粉","Grace姐姐脑残粉","Grace姐姐脑残粉","Grace姐姐脑残粉","Grace姐姐脑残粉","Grace姐姐脑残粉","Grace姐姐神经粉"],
            render: function(e, f) {
        this.lv = f, c.hide(), d.show();
        var g = _config.color.lvMap[f] || _.last(_config.color.lvMap);
        this.d = 15 * Math.max(9 - g, 1), this.d = f > 20 ? 10 : this.d, this.d = f > 40 ? 8 : this.d, this.d = f > 50 ? 5 : this.d;
//        随机颜色
        var h = Math.floor(Math.random() * e), i = this.getColor(255 - this.d), j = this.getLvColor(i[0]);
//        寻找的颜色替换成图片
        var specialPic ="url(http://tvxqljw.github.io/demo/"+role+".png)";
        a.find(b).css("background-color", i[1]).data("type", "b").css({"background": "url(http://tvxqljw.github.io/demo/default.png)"+j[1], "background-size": "cover"}), a.find(b).eq(h).css("background-color", j[1]).data("type", "a").css({"background": specialPic+j[1], "background-size": "cover"});
    },getColor: function(a) {
        var b = [Math.round(Math.random() * a), Math.round(Math.random() * a), Math.round(Math.random() * a)], c = "rgb(" + b.join(",") + ")";
        return [b, c]
    },getLvColor: function(a) {
        var b = this.d, c = _.map(a, function(a) {
            return a + b + 10
        }), d = "rgb(" + c.join(",") + ")";
        return [c, d]
    },getGameOverText: function(a) {
        // var b = 15 > a ? 0 : Math.ceil((a - 15) / 5), c = this.lvT[b] || _.last(this.lvT), d = c + "lv" + (a + 1), e = 2 * a;
        // return e = e > 90 ? 90 + .15 * a : e, e = Math.min(e, 100), {txt: d,percent: e}
        var b = 10 > a ? 0 : Math.ceil((a - 10) / 3), c = this.lvT[b] || _.last(this.lvT), d = c + "<br/>lv" + (a + 1), e = 2 * a;
        return e = e > 60 ? 60 + .1 * a : e, e = Math.min(e, 100), {txt: d,percent: e}
    }};
    API.color = e
}();
/*  |xGv00|c906e36531043bfb4bc45b5d7d87ac52 *//**
 * Created by lijingwen on 2014-10-01.
 */
