// Copyright © 2024 LeavesWebber
// SPDX-License-Identifier: MPL-2.0
// Feel free to contact LeavesWebber@outlook.com
function hideLoading() {
    document.querySelector('.loading').style.display = 'none';
    document.body.classList.add('loaded');
}
// 添加起始日期变量（在文件开头附近添加）
const startDate = new Date('2022-11-02'); // 设置你的起始日期

// 计算天数的函数
function getDaysSince(startDate) {
    const today = new Date();
    const diffTime = Math.abs(today - startDate);
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
}

// 在 window.addEventListener('load', ...) 之前添加更新天数的代码
function updateDaysCount() {
    const days = getDaysSince(startDate);
    const span = document.querySelector('span');
    
    // 创建彩虹色数组
    const colors = ['#FF0000FF', '#D68D00FF',  '#0000FFFF', '#24B326FF'];
    
    // 将数字转为字符串并分割成单个数字
    const daysStr = days.toString();
    
    // 构建带颜色的HTML，添加 display: inline-block
    const colorfulNumbers = daysStr
        .split('')
        .map((num, index) => `<span style="color:${colors[index % colors.length]};display:inline-block">${num}</span>`)
        .join('');
    
    // 组合最终文本
    span.innerHTML = `Friends for ${colorfulNumbers} days`;
}

// 等待所有资源加载完成
window.addEventListener('load', function() {
    updateDaysCount(); // 添加这一行
    // 预加载所有图片
    const imagesToLoad = [
        './images/1.png',
        './images/2.png',
        './images/3.png',
        './images/content.png',
        './images/emblem.png'
    ];

    let loadedImages = 0;

    function imageLoaded() {
        loadedImages++;
        if (loadedImages === imagesToLoad.length) {
            // 所有图片加载完成
            hideLoading();
        }
    }

    imagesToLoad.forEach(src => {
        const img = new Image();
        img.onload = imageLoaded;
        img.src = src;
    });

    // 预加载音频
    Promise.all([
        new Promise(resolve => {
            clickAudio.addEventListener('canplaythrough', resolve, {once: true});
        }),
        new Promise(resolve => {
            bgMusic.addEventListener('canplaythrough', resolve, {once: true});
        })
    ]).then(() => {
        // 音频加载完成
        if (loadedImages === imagesToLoad.length) {
            hideLoading();
        }
    });
});

// 获取��合信封的图片节点
let letter = document.querySelector(".letter");

let span = document.querySelector("span");

// 获取开信音效
let clickAudio = document.querySelector(".clickAudio");
//获取扭动音效
let screwAudio = document.querySelector(".screwAudio");
// 获取背景音乐
let bgMusic = document.querySelector(".bgMusic");
// 获取徽章
let emblem = document.querySelector(".emblem");

let isOpen =false;

// 添加点击事件
emblem.addEventListener("click", function () {
    screwAudio.play();
    // 添加摆动动画
    emblem.style.animation = "swing 0.5s ease-in-out";
    // 动画结束后添加淡出效果并处理后续事件
    setTimeout(function () {
        emblem.style.animation = "fadeOut 0.3s ease-in-out forwards";
        span.style.animation = "fadeOut 0.3s ease-in-out forwards";
        // 等待淡出动画完成后再隐藏元素并执行其他操作
        setTimeout(function () {
            emblem.style.display = "none";
            span.style.display = "none";
            setTimeout(function () {
                letter.src = "./images/2.png";
            }, 200);
            // 200毫秒后切换信封为第二张
            setTimeout(function () {
                letter.src = "./images/3.png";
            }, 800);
            // 800毫秒后切换信封为第三张
            setTimeout(function () {
                // 先让当前图片淡出
                letter.style.opacity = '0';
                
                setTimeout(() => {
                    // 在不可见状态下切换图片和位置
                    letter.src = "./images/content.png";
                    // 短暂延迟后重新显示
                    setTimeout(() => {
                        letter.style.opacity = '1';
                    }, 50);
                }, 150);  // 等待淡出完成
                
                // 播放音效和背景音乐
                clickAudio.play();
                bgMusic.play();
            }, 1900);
            // 1900毫秒后切换为信件内容
            setTimeout(function () {
                letter.style.cursor = "pointer"
            }, 2000);
        }, 300); // 等待淡出动画完成
    }, 500); // 等待摆动动画完成
    isOpen = true;
});
letter.addEventListener("click",function () {
    if(isOpen){
        setTimeout(function () {
            clickAudio.play();
            letter.src = "./images/3.png";
        }, 200);
        setTimeout(function () {
            letter.src = "./images/2.png";
        }, 200);    
        setTimeout(function () {
            letter.src = "./images/1.png";
        }, 200);
        setTimeout(function (){
            // 收信后，徽章和日期重现
            emblem.style.animation = "fade-in-down 0.3s ease-in-out forwards";
            span.style.animation = "none"
            //span.style.animation = "fade-in-down 0.3s ease-in-out forwards";
            emblem.style.display = "flex";
            span.style.display = "flex";
        },500)
        letter.style.cursor = "default"
        isOpen=false;
    }
})