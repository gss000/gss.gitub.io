$(function(){
    //var store = require('store');
    var screenH = $(document).height();
    $('.nav-info').height(screenH);
    $('.wrap').height(screenH);
    //首页画廊功能
    var photoData = [
        "img/3步练师.jpg,安恤:,出牌阶段，你可以选择两名手牌数不相等的其他角色，令其中手牌少的角色获得手牌多的角色一张手牌并展示之，若该牌不为黑桃，你摸一张牌。每阶段限一次。,追忆:,你死亡时，可以令一名其他角色（杀死你的角色除外）摸三张牌并回复1点体力。",
        "img/3孙尚香.jpg,结姻:,出牌阶段，你可以弃两张手牌并指定一名受伤的男性角色：你和目标角色各回复1点体力。每回合限用一次。,枭姬:,当你失去一张装备区里的牌时，你可以立即摸两张牌。",
        "img/1钟会.jpg,权计:,每当你受到1点伤害后，你可以摸一张牌，然后将一张手牌置于你的武将牌上，称为“权”；锁定技，你的手牌上限+X（X为“权”的数量）,自立:,觉醒技，准备阶段开始时，若“权”的张数不小于3，你减1点体力上限，选择一项：1.回复1点体力；2.摸两张牌。然后你获得“排异”。,排异:,出牌阶段限一次，你可将一张“权”置入弃牌堆并选择一名角色，令其摸两张牌，然后若其手牌多于你，你对其造成1点伤害。",
        "img/1张春华.jpg",
        "img/3诸葛恪.jpg",
        "img/4贾诩.jpg",
        "img/1甄姬.jpg",
        "img/1荀攸.jpg",
        "img/2姜维.jpg",
        "img/4貂蝉.jpg"
    ];
    //背面文字函数
    //function distill(index){
    //    var arrData = photoData[index].split(','),
    //        html = '';
    //    for(var j=1;j<arrData.length;j++){
    //        if(j%2 == 0){
    //            continue;
    //        }else{
    //            html += '<div class="desc-skill">' +
    //                '<strong>'+ arrData[j] +'</strong>' +
    //                '<span>'+ arrData[j+1] +'</span>' +
    //                '</div>';
    //        }
    //    }
    //    return html;
    //}
    var photoHtml = '', nav = [];
    for(var i=0;i<photoData.length;i++){
        photoHtml += '<div class="photo photo-front" onclick="turn(this)" id="photo'+ i +'">' +
            '<div class="photo-wrap">' +
            '<div class="side side-front">' +
            '<p class="image">' +
            '<img src="'+ photoData[i].split(',')[0] +'" alt=""></p></div>' +
            '<div class="side side-back">' +
                //'<div class="desc"></div>' +
            '</div></div></div>';

        nav.push('<span id="nav_'+i+'" class="i" onclick="turn(\'#photo'+i+'\')"></span>');
    }
    photoHtml += '<div class="nav">'+ nav.join('') +'</div>';
    $('.wrap').append(photoHtml);
    //随机数选定初始化居中图片
    var rand = Math.floor(Math.random() * photoData.length + 0);
    resort(rand);

    //初始化滚动条选中的元素
    $('.i').removeClass('i_cur');
    $('.i').removeClass('i_back');
    $('#nav_'+rand).addClass('i_cur');
    //获取随机数
    function random(obj){
        var num = obj[1] - obj[0];
        var ran = Math.floor(Math.random()*num + obj[0]);
        return ran;
    }
    //设置wrap的范围
    function range(){
        var range = {
            left: {x:[], y:[]},
            right: {x:[], y:[]}
        }
        var wrap = {
            w: $('.wrap').width(),
            h: $('.wrap').height()
        }
        var photo = {
            w: $('.photo:first').width(),
            h: $('.photo:first').height()
        }
        range.wrap = wrap;
        range.photo = photo;
        //左分区取值范围
        range.left.x = [0 - photo.w/4, wrap.w/2 - photo.w/2];
        range.left.y = [photo.h/2, wrap.h];
        //右分区取值范围
        range.right.x = [wrap.w/2 + photo.w/2, wrap.w + photo.w/2];
        range.right.y = [photo.h/2, wrap.h];

        return range;
    }
    //随机图片居中(并绑定事件),分割数组重排序
    function resort(rand){
        //格式化所有的样式
        $('.photo').removeClass('photo_center');
        $('.photo').removeClass('photo-front');
        $('.photo').removeClass('photo-back');
        $('.photo').css({"left": '', 'top': '', "-webkit-transform": 'rotate(0deg)', "-moz-transform": 'rotate(0deg)', "-webkit-transform": 'scale(1.1)', "-moz-transform": 'scale(1.1)'});
        $('.photo').addClass('photo-front');//初始化

        var $photoId = $('#photo'+ rand);
        $photoId.addClass('photo_center');
        //分割数组
        var photos = $('.photo');//类数组对象需要转换成数组对象
        var _photo = [];
        for(var i=0;i<photos.length;i++){
            _photo.push(photos[i]);
        }
        //计算左右分区的范围
        _photo.splice(rand, 1);
        var photoLeft = _photo.splice(0, Math.floor(_photo.length/2));
        var photoRight = _photo;
        var ranges = range();
        for( i in photoLeft){
            var l = random(ranges.left.x);
            var t = random(ranges.left.y);
            $(photoLeft[i]).css('left', l);
            $(photoLeft[i]).css('top', t);
            $(photoLeft[i]).css({"-webkit-transform": 'rotate('+ random([-120, 120]) +'deg)', "-moz-transform": 'rotate('+ random([-120, 120]) +'deg)'});
        }
        for(i in photoRight){
            var l = random(ranges.right.x);
            var t = random(ranges.right.y);
            $(photoRight[i]).css('left', l);
            $(photoRight[i]).css('top', t);
            $(photoRight[i]).css({"-webkit-transform": 'rotate('+ random([-120, 120]) +'deg)', "-moz-transform": 'rotate('+ random([-120, 120]) +'deg)'});
        }
    }
    //翻面函数
    turn = function(ele){
        var photoId = $(ele).attr('id').match(/\d/g).toString();
        if(!$(ele).hasClass('photo_center')){
            $('.i').removeClass('i_cur');
            $('#nav_'+photoId).addClass('i_cur');
            return resort(photoId);
        }
        if($(ele).hasClass('photo-front')){
            $(ele).removeClass('photo-front');
            $(ele).addClass('photo-back');
        }else{
            $(ele).removeClass('photo-back');
            $(ele).addClass('photo-front');
        }
    }

//详细武将列表功能
    var $ulPage = $('#ulpage'),
        lis = $ulPage.children(),
        pageId,
        $rowList = $('.rowList');
    //分页按钮事件
    $ulPage.on('click', 'li', function(e){
        $('#ulpage li').removeClass('active');
        var curLi = $(e.target);
        curLi.parent().addClass('active');

        pageId = curLi.data('id');
        store.set('pageId', pageId);
        pageAjax(pageId);
        e.preventDefault;
    });
    //初始化列表加载
    pageId = store.get('pageId');//存储的值需要赋值给pageId
    if(pageId == undefined){
        pageId = 1;
        $(lis).removeClass('active');
        $(lis[pageId - 1]).addClass('active');
        pageAjax(pageId);
    }else{
        pageId = store.get('pageId');
        $(lis).removeClass('active');
        $(lis[pageId - 1]).addClass('active');
        pageAjax(pageId);
    }
    //左侧栏li切换事件
    $('.nav-sidebar').on('click', 'li', function(){
        if($(this).hasClass('sideactive')){
            return;
        }else{
            $('li').removeClass('sideactive');
            $(this).addClass('sideactive');
            change(this);
        }
    });
    //横向滚动条切换事件
    $('.navbar-nav').on('click', 'li', function(){
        change(this);
    });
    //展示模块切换函数
    function change(thisObj){
        var curIndex = $(thisObj).attr('data-index');
        console.log(curIndex);
        if(curIndex == 3){
            return;
        }else{
            $('.mod').fadeOut(300);
            $('.mod_'+curIndex).fadeIn(300);
            if($('.navList').is(':visible')){
                $('.nav-info').hide();
                $('.navList').hide();
            }
        }
    }

    //武将详情信息弹出框
    $(document).on('click', '.list-item .btn-primary', function(e){
        var $listBtn = $('.list-item .btn-primary');
        for(var i=0;i<$listBtn.length;i++){
            $listBtn[i].index = i;
        }
        var that = this.index;
        $.get("data/page"+ pageId +".json", function(data){
            alertInfo(data, that);
        });
        e.stopPropagation();
    });

    //弹出信息函数
    function alertInfo(data, that){
        var $listRowInfo = $('.listRow').find('.col-md-4'),
            $panelBody = $('.panel-body'),
            $character = $('.character').find('p'),
            $feature = $('.feature').find('p');
        var html = skillDom(data.info[that]);

        $('.nav-info').show();
        $listRowInfo.html('');
        $listRowInfo.html(html);

        $panelBody.find('.progress-bar-danger').css("width", data.info[that].val[0].attack);
        $panelBody.find('.progress-bar-success').css("width", data.info[that].val[1].alive);
        $panelBody.find('.progress-bar-info').css("width", data.info[that].val[2].ability);

        $character.html('');
        $character.html(data.info[that].charactor);

        $feature.html('');
        $feature.html(data.info[that].feature);
    }
    //弹出框关闭事件
    $('.navList').find('.close').click(function(){
        $('.nav-info').hide();
    });
    //音频播放事件
    $(document).on('click', '.media-botn .btn', function(){
        this.lastChild.play();
    });


    //弹出框技能更新函数
    function skillDom(data){
        var str = '';
        var html =
            '<div class="info-img">' +
            '<img src="img/'+ data.src +'" alt="">' +
            '</div>';
        for(var i=0;i<data.skills.length;i++){
            str += '<div class="media media-botn">'+
                '<div class="media-left">' +
                '<button class="btn btn-default btn-xs" >' +
                ''+ data.skills[i].skill +' &nbsp;<span class="glyphicon glyphicon-volume-down" aria-hidden="true"></span>' +
                '<audio controls="controls" clas="audio"><source src="'+ data.audioSrc[i].audio +'" type="audio/mp3"></audio>' +
                '</button></div>'+
                '<div class="media-body">'+
                '<span>'+ data.skills[i].details +'</span>' +
                '</div></div>';
        }
        html += str;
        return html;
    }


    //异步请求函数
    function pageAjax(pageId){
        $.ajax({
            type: "GET",
            url: "data/page"+ pageId +".json",
            dataType: "json",
            success: function(data){
                var $list = "";
                for(var i=0;i<data.info.length;i++){
                    $list += '<div class="col-xs-6 col-md-3">' +
                        '<div class="thumbnail list-item item-nation'+ data.info[i].id +'">' +
                        '<div><img src="img/' + data.info[i].src + '" alt="...">' +
                        '<h4><a href="javascript:;" class="btn btn-primary btn'+ data.info[i].id +'" role="button">' + data.info[i].name + '</a></h4>' +
                        '</div></div></div>';
                }
                $rowList.html("");
                $rowList.html($list);
            },
            error: function(XMLHttpRequest, textStatus, errorThrown){
                console.log("第一个：" + XMLHttpRequest);
                console.log("第二个：" + textStatus);
                console.log("第三个：" + errorThrown);
            }
        });
    }
    //代替异步请求函数



    //站内搜索功能
    $('form').on('submit', function(e){
        e.preventDefault();
        var inputVal = $('input[type=text]').val();
        for(var i=1;i<6;i++){
            $.get("data/page"+ i +".json", function(data){
                var arr = [], thisIndex;
                for(var j=0;j<data.info.length;j++){
                    var name = data.info[j].name.replace(/\s/, '');
                    arr.push(name);
                }
                if($.inArray(inputVal, arr) != -1){
                    thisIndex = arr.indexOf(inputVal);
                    alertInfo(data, thisIndex);
                }
            });
        }

    });






});
