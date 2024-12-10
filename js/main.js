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


function createNewImage(src) {
    const img = letter.cloneNode(true); // 深度克隆现有的图片元素，保留事件监听器
    img.src = src;
    img.style.opacity = '0';
    img.style.position = 'absolute'; // 确保位置样式被保留
    img.style.width = '100%'; // 保留宽度样式
    img.style.height = 'auto'; // 保留高度样式
    return img;
}

// 添加点击事件
emblem.addEventListener("click", function () {
    screwAudio.play();
    emblem.style.animation = "swing 0.5s ease-in-out";
    
    setTimeout(function () {
        emblem.style.animation = "fadeOut 0.3s ease-in-out forwards";
        span.style.animation = "fadeOut 0.3s ease-in-out forwards";
        
        setTimeout(function () {
            emblem.style.display = "none";
            span.style.display = "none";
            
            // 执行交叉淡变动画
            function crossFade(oldImg, newImgSrc) {
                return new Promise((resolve) => {
                    const newImg = createNewImage(newImgSrc);
                    oldImg.parentNode.appendChild(newImg);
                    
                    // 根据图片名称调整位置
                    if (newImgSrc.includes('content.png')) {
                        newImg.style.transform = 'translateY(-42%)'; // content.png 的特定位移
                    } else {
                        newImg.style.transform = 'none'; // 其他图片的默认位移
                    }
                    
                    // 设置初始状态
                    oldImg.style.transition = 'opacity 0.5s ease-in-out';
                    newImg.style.transition = 'opacity 0.5s ease-in-out';
                    
                    // 强制重排以确保过渡效果生效
                    newImg.offsetHeight;
                    
                    // 执行交叉淡变
                    oldImg.style.opacity = '0';
                    newImg.style.opacity = '1';
                    
                    setTimeout(() => {
                        oldImg.remove();
                        resolve(newImg);
                    }, 500);
                });
            }

            // 按顺序执行动画序列
            const originalImg = letter;
            crossFade(originalImg, './images/2.png')
                .then(img2 => {
                    return new Promise(resolve => {
                        setTimeout(() => resolve(img2), 300); // 等待0.3秒
                    });
                })
                .then(img2 => crossFade(img2, './images/3.png'))
                .then(img3 => {
                    return new Promise(resolve => {
                        setTimeout(() => resolve(img3), 300); // 等待0.3秒
                    });
                })
                .then(img3 => {
                    // 在开始最后一次渐变之前播放音效
                    clickAudio.play();
                    bgMusic.play();
                    triggerConfetti(); // 触发五彩纸屑效果
                    return crossFade(img3, './images/content.png');
                })
                .then(finalImg => {
                    // 设置最终图片的样式
                    finalImg.style.cursor = 'pointer';
                    letter = finalImg; // 更新全局letter引用
                    
                    isOpen = true;
                });
        }, 300);
    }, 500);
});

const con = document.querySelector(".con"); // 获取 .con 元素

// 修改为监听 con 的点击事件
con.addEventListener("click", function () {
    if (isOpen) {
        clickAudio.play();
        
        // 使用更快的渐变动画进行收信
        function quickCrossFade(oldImg, newImgSrc) {
            return new Promise((resolve) => {
                const newImg = createNewImage(newImgSrc);
                oldImg.parentNode.appendChild(newImg);

                // 根据图片名称调整位置
                if (newImgSrc.includes('content.png')) {
                    newImg.style.transform = 'translateY(-42%)'; // content.png 的特定位移
                } else {
                    newImg.style.transform = 'none'; // 其他图片的默认位移
                }

                // 设置更快的过渡时间
                oldImg.style.transition = 'opacity 0.05s ease-in-out';
                newImg.style.transition = 'opacity 0.05s ease-in-out';
                
                newImg.offsetHeight;
                
                oldImg.style.opacity = '0';
                newImg.style.opacity = '1';
                //设置收信过程中每一张图片停留时间
                setTimeout(() => {
                    oldImg.remove();
                    resolve(newImg);
                }, 50);
            });
        }

        const currentImg = letter;
        quickCrossFade(currentImg, './images/3.png')
            .then(img3 => {
                return new Promise(resolve => {
                    setTimeout(() => resolve(img3), 100);
                });
            })
            .then(img3 => quickCrossFade(img3, './images/1.png'))
/*            .then(img2 => {
                return new Promise(resolve => {
                    setTimeout(() => resolve(img2), 100);
                });
            })
            .then(img2 => quickCrossFade(img2, './images/1.png'))*/
            .then(finalImg => {
                finalImg.style.cursor = 'default';
                letter = finalImg;
                
                // 收信后，徽章和日期重现
                setTimeout(() => {
                    emblem.style.animation = "fade-in-down 0.3s ease-in-out forwards";
                    span.style.animation = "none";
                    emblem.style.display = "flex";
                    span.style.display = "flex";
                }, 200);
                
                isOpen = false;
            });
    }
});

// 在开信过程中，图片切换到 content 的瞬间触发五彩纸屑效果
function triggerConfetti() {
    confetti({
        particleCount: 400,
        spread: 350,
        origin: { y: 0.40 },
        zIndex: 0
    });

    // 切换背景图像
    //document.body.style.backgroundImage = "url('./images/bgi.png')";
}