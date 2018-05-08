// setTimeout(function(){
//     $('.images>img:nth-child(1)').css({
//         transform:'translateX(-100%)'
//     })
//     $('.images>img:nth-child(2)').css({
//         transform:'translateX(-100%)'
//     })
//     // 跑完就去走到右边，监听transitionend事件
//     // $('.images>img:nth-child(1)').on('transitionend',function(e){
//     //     $(e.currentTarget).addClass('right').css({transform:'none'})
//     // })
//     // one就是表示执行过一次就失效了,不然总是会跑到右边去
//     $('.images>img:nth-child(1)').one('transitionend',function(e){
//         $(e.currentTarget).addClass('right').css({transform:'none'})
//     })
//     }
// ,3000)
// setTimeout(function(){
//     $('.images>img:nth-child(2)').css({
//         transform:'translateX(-200%)'
//     })
//     $('.images>img:nth-child(3)').css({
//         transform:'translateX(-200%)'
//     })
//     $('.images>img:nth-child(2)').one('transitionend',function(e){
//         $(e.currentTarget).addClass('right').css({transform:'none'})
//     })
// },6000)
// setTimeout(function(){
//     $('.images>img:nth-child(3)').css({
//         transform:'translateX(-300%)'
//     })
//     $('.images>img:nth-child(1)').css({
//         transform:'translateX(-100%)'
//     })
//     $('.images>img:nth-child(3)').one('transitionend',function(e){
//         $(e.currentTarget).addClass('right').css({transform:'none'})
//     })
// },9000)
// 图片一共三种状态
// 现状：current 走：leave 进入 enter 占 stay
// $('.images>img:nth-child(1)').addClass('current')
// $('.images>img:nth-child(2)').addClass('enter')
// $('.images>img:nth-child(3)').addClass('enter')
// let n = 1
// function x(n) {
//     if (n > 3) {
//         n = n % 3

//         if (n === 0) {
//             n = 3
//         }
//     }
//     return n
// }
// // n=1,2,3
// setInterval(() => {

//         $(`.images>img:nth-child(${x(n)})`).removeClass('current').addClass('leave')
//             .one('transitionend', function (e) {
//                 $(e.currentTarget).removeClass('leave').addClass('enter')
//             })
//         $(`.images>img:nth-child(${x(n + 1)})`).removeClass('enter').addClass('current')
//         n += 1
// }, 3000)

// setTimeout(() => {
//     $('.images>img:nth-child(1)').removeClass('current').addClass('leave')
//         .one('transitionend', function (e) {
//             $(e.currentTarget).removeClass('leave').addClass
//                 ('enter')
//         }
//         )
//     $('.images>img:nth-child(2)').removeClass('enter').addClass('current')
// }, 3000)
// setTimeout(() => {
//     $('.images>img:nth-child(2)').removeClass('current').addClass('leave')
//         .one('transitionend', function (e) {
//             $(e.currentTarget).removeClass('leave').addClass
//                 ('enter')
//         }
//         )
//     $('.images>img:nth-child(3)').removeClass('enter').addClass('current')
// }, 6000)
// setTimeout(() => {
//     $('.images>img:nth-child(3)').removeClass('current').addClass('leave')
//         .one('transitionend', function (e) {
//             $(e.currentTarget).removeClass('leave').addClass
//                 ('enter')
//         }
//         )
//     $('.images>img:nth-child(1)').removeClass('enter').addClass('current')
// }, 9000)
let $lists = $('#slideBar>li')
let $slides = $('#slides')
let current = 0
let $images = $slides.children('img')


$slides.css({
    transform: 'translateX(-920px)'
})  //初始化
makeFakerSlides()   //制作假的图片迷惑观众，一瞬间之后再按上真的
bindEvents()         //监听事件
function bindEvents() {
    $('#slideBar').on('click', 'li', function (e) {
        let $li = $(e.currentTarget)
        let index = $li.index()
        gotoSlide(index)
    }
    )
};
$('#prev').on('click',function(){
    gotoSlide(current-1)
})
$('#next').on('click',function(){
    gotoSlide(current+1)
})
// 无限轮播
let timer = setInterval(function(){
    gotoSlide(current+1)
},2000)
$('#slides').on('mouseenter',function(){
    window.clearInterval(timer)})
$('#slides').on('mouseleave',function(){
    timer = setInterval(function(){
        gotoSlide(current+1)
    },2000)
})
function makeFakerSlides() {
    let $firstCopy = $images.eq(0).clone(true) //true 复制全家
    let $lastCopy = $images.eq($images.length - 1).clone(true)
    $slides.append($firstCopy)
    $slides.prepend($lastCopy)

}
function gotoSlide(index) {
    // 加判断，不然出现空白页
    if(index >= $lists.length){
        index = 0
    }else if(index < 0){
        index = $lists.length -1
    }
    if (current === 0 && index === $lists.length - 1) {
        console.log(1)
        $slides.css({ transform: 'translateX(0px)' })
            .one('transitionend', function () {
                $slides.hide()
                    .offset()
                console.log('动画完毕')
                $slides.css({ transform: `translateX(${-(index + 1) * 920}px)` })
                    .show()
            })
    } else if (current === $lists.length - 1 && index === 0) {
        $slides.css({ transform: `translateX(${-($lists.length + 1) * 920}px)` })
            .one('transitionend', function () {
                $slides.hide()
                    .offset()
                console.log('动画完毕')
                // 字符串模板
                $slides.css({ transform: `translateX(${-(index + 1) * 920}px)` })
                    .show()
            })
    } else {
        // 等价写法
        $slides.css({ transform: "translateX(" + (index + 1) * (-920) + "px)" })  //``一定要使用这种符号，不然运行不了
    }
    current = index
}



//     $buttons.eq(0).on('click', function () {
//         if (current == 2) {
//             console.log('last=>first')
//             $slides.css({ transform: 'translateX(-1600px)' })
//                 .one('transitionend', function () {
//                     $slides.hide()
//                         .offset()
//                     console.log('动画完毕')
//                     $slides.css({ transform: 'translateX(-920px)' })
//                         .show()
//                 })
//         } else {
//             $slides.css({ transform: 'translateX(-920px)' })
//         }
//         console.log(current)

//         current = 0
//     })
//     $buttons.eq(1).on('click', function () {
//         console.log(current)
//         $slides.css({ transform: 'translateX(-800px)' })
//         current = 1
//     })
//     $buttons.eq(2).on('click', function () {
//         if (current == 0) {
//             console.log('first=>last')
//             $slides.css({ transform: 'translateX(0px)' })
//                 .one('transitionend', function () {
//                     $slides.hide()
//                         .offset()
//                     console.log('动画完毕')
//                     $slides.css({ transform: 'translateX(-1200px)' })
//                         .show()
//                 })
//         } else {
//             $slides.css({ transform: 'translateX(-1200px)' })
//         }
//         console.log(current)

//         current = 2
//     })
// }

