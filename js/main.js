$(window).on('load', function(){
    var screenH = $(window).height();
    var scrollTop = $(window).scrollTop();
    actionMove(scrollTop, screenH);
})
$(window).on('scroll', function(){
    var scrollTop = $(document).scrollTop();
    var screenH = $(window).height();
    actionMove(scrollTop, screenH);
});
function actionMove(scrollTop, screenH){
    //第一屏header渐入
    if( scrollTop >= "0" && scrollTop <= 156) {
        if (screenH >= 1000) {
            $('.header-content').removeClass('head-fadeOut');
            $('.header-content').addClass('head-fadeIn');
            $('.abs-item').removeClass('abs-item-fadeOut');
            $('.abs-item').addClass('abs-item-fadeIn');
        } else {
            $('.header-content').removeClass('head-fadeOut');
            $('.header-content').addClass('head-fadeIn');
        }
    }
    //第二屏渐入
    if(scrollTop >= 0 && scrollTop <= 856){
        $('.abs-item').removeClass('abs-item-fadeOut');
        $('.abs-item').addClass('abs-item-fadeIn');
    }
    //video播放
    if(scrollTop >= 618 && scrollTop <= 1380){
        var play_p = $('.play-wrap').find('p');
        $('.index-log').removeClass('index-logo-fadeOut');
        $('.index-logo').addClass('index-logo-fadeIn');
        play_p.removeClass('play-p-fadeOut');
        play_p.addClass('play-p-fadeIn');
        $('.play-icon').addClass('play-icon-animation');
        if(!$('.play-icon').is(':animated')){
            $('.play-icon').css('opacity', '1');
        }
    }
    //最后第二屏，头部渐入
    if(scrollTop >= 1024 && scrollTop < 1653){
        $('.test-head').removeClass("test-head-fadeOut");
        $('.test-head').addClass('test-head-fadeIn');
    }
    //最后第二屏，client渐入
    if(scrollTop >= 1157 && scrollTop <= 1900){
        $('.test-item').removeClass('task-item-fadeOut');
        $('.test-item').addClass('task-item-fadeIn');
    }
    //最后一屏，头部渐入
    if(scrollTop >= 1570 ){
        $('.show-head').removeClass('test-head-fadeOut');
        $('.show-head').addClass('test-head-fadeIn');
    }
    //最后一屏，四张图片
    if(scrollTop >=1780){
        $('.blog-item').removeClass('blog-item-fadeOut');
        $('.blog-item').addClass('blog-item-fadeIn');
    }
}