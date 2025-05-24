// Copyright © 2024 LeavesWebber
// SPDX-License-Identifier: MPL-2.0
// Feel free to contact LeavesWebber@outlook.com

// 设置你们纪念日的起始日期
const startDate = new Date("2022-11-02");

//确保加载好之前都不要显示出东西
function hideLoading() {
  document.querySelector(".loading").style.display = "none";
  document.body.classList.add("loaded");
}

// 计算天数的函数，已经考虑了闰年等问题
function getDaysSince(startDate) {
  const today = new Date();
  const diffTime = Math.abs(today - startDate);
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
}

// 给天数加一个彩色效果
function updateDaysCount() {
  const days = getDaysSince(startDate);
  const span = document.querySelector("span");

  // 创建彩虹色数组
  const colors = ["#FF0000FF", "#D68D00FF", "#0000FFFF", "#24B326FF"];

  // 将数字转为字符串并分割成单个数字
  const daysStr = days.toString();

  // 构建带颜色的HTML，添加 display: inline-block
  const colorfulNumbers = daysStr
    .split("")
    .map(
      (num, index) =>
        `<span style="color:${
          colors[index % colors.length]
        };display:inline-block">${num}</span>`
    )
    .join("");

  // 组合最终文本
  span.innerHTML = `Friends for ${colorfulNumbers} days`;
}

// 在全局作用域添加一个对象来存储预加载的图片
const imageCache = {
  images: {},
  // 预加载并缓存图片
  preloadImages: function (srcs) {
    return Promise.all(
      srcs.map((src) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => {
            this.images[src] = img;
            resolve(img);
          };
          img.onerror = reject;
          img.src = src;
        });
      })
    );
  },
};

// 在 window.addEventListener('load', function() { 之前添加一个超时函数
function setupLoadingTimeout() {
  setTimeout(() => {
    if (!document.body.classList.contains("loaded")) {
      console.log("加载超时，强制显示页面");
      hideLoading();
    }
  }, 10000); // 10秒超时
}

// 修改 window.addEventListener('load' 部分
window.addEventListener("load", function () {
  updateDaysCount();
  // 启动超时计时器
  setupLoadingTimeout();

  // 预加载所有图片
  const imagesToLoad = [
    "./images/1.png",
    "./images/2.png",
    "./images/3.png",
    "./images/content.png",
    "./images/emblem.png",
  ];

  // 创建一个Promise数组，包含所有需要加载的资源
  const loadPromises = [
    // 图片加载Promise
    imageCache.preloadImages(imagesToLoad),
    // 音频加载Promise
    new Promise((resolve) => {
      if (clickAudio.readyState >= 3) {
        resolve();
      } else {
        clickAudio.addEventListener("canplaythrough", resolve, { once: true });
      }
    }),
    new Promise((resolve) => {
      if (screwAudio.readyState >= 3) {
        resolve();
      } else {
        screwAudio.addEventListener("canplaythrough", resolve, { once: true });
      }
    }),
    new Promise((resolve) => {
      if (bgMusic.readyState >= 3) {
        resolve();
      } else {
        bgMusic.addEventListener("canplaythrough", resolve, { once: true });
      }
    }),
  ];

  // 等待所有资源加载完成
  Promise.all(loadPromises)
    .then(() => {
      hideLoading();
    })
    .catch((error) => {
      console.error("资源加载失败:", error);
      // 即使加载失败也隐藏加载画面，确保用户可以使用
      hideLoading();
    });
});

// 从 DOM 中获取元素
let letter = document.querySelector(".letter");
let span = document.querySelector("span");
let clickAudio = document.querySelector(".clickAudio");
let screwAudio = document.querySelector(".screwAudio");
let bgMusic = document.querySelector(".bgMusic");
let emblem = document.querySelector(".emblem");

// 设置预加载
clickAudio.preload = "auto";
screwAudio.preload = "auto";
bgMusic.preload = "auto";

// 简单标记一下信的开合状态，后面要用
let isOpen = false;

// 这个函数后面交叉淡变动画要用到
function createNewImage(src) {
  // 从缓存中获取图片对象
  const cachedImg = imageCache.images[src];
  if (!cachedImg) {
    console.error("图片未在缓存中找到:", src);
    return null;
  }

  const img = document.createElement("img");
  img.src = cachedImg.src;
  img.className = "letter";
  img.style.opacity = "0";
  img.style.position = "absolute";
  img.style.width = "100%";
  img.style.height = "auto";
  return img;
}

// 开信的动画逻辑
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
        // setTimeout 是个异步函数，我们需要用 Promise 函数来解决这个序列问题
        return new Promise((resolve) => {
          const newImg = createNewImage(newImgSrc);
          oldImg.parentNode.appendChild(newImg);

          // 最后一张图的信封位置特殊，需要调整
          if (newImgSrc.includes("content.png")) {
            newImg.style.transform = "translateY(-42%)"; // content.png 的特定位移
          } else {
            newImg.style.transform = "none"; // 其他图片的默认位移
          }

          oldImg.style.transition = "opacity 0.5s ease-in-out";
          newImg.style.transition = "opacity 0.5s ease-in-out";

          // 强制重排以确保过渡效果生效
          newImg.offsetHeight;

          // 执行交叉淡变
          oldImg.style.opacity = "0";
          newImg.style.opacity = "1";

          setTimeout(() => {
            oldImg.remove();
            resolve(newImg);
          }, 500);
        });
      }

      // 按顺序执行动画序列
      const originalImg = letter;
      crossFade(originalImg, "./images/2.png")
        .then((img2) => {
          return new Promise((resolve) => {
            setTimeout(() => resolve(img2), 300); // 等待0.3秒
          });
        })
        .then((img2) => crossFade(img2, "./images/3.png"))
        .then((img3) => {
          return new Promise((resolve) => {
            setTimeout(() => resolve(img3), 300); // 等待0.3秒
          });
        })
        .then((img3) => {
          // 在开始最后一次渐变之前播放音效
          clickAudio.play();
          bgMusic.play();
          triggerConfetti(); // 触发五彩纸屑效果
          return crossFade(img3, "./images/content.png");
        })
        .then((finalImg) => {
          // 设置最终图片的样式
          finalImg.style.cursor = "pointer";
          letter = finalImg; // 更新全局letter引用

          isOpen = true;
        });
    }, 300);
  }, 500);
});

// 收信过程我们要监听的是 con 的点击事件，因为 letter 是动态生成的咱们监听不到
const con = document.querySelector(".con");

// 收信逻辑
con.addEventListener("click", function () {
  if (isOpen) {
    clickAudio.play();

    // 使用更快的渐变动画进行收信
    function quickCrossFade(oldImg, newImgSrc) {
      return new Promise((resolve) => {
        const newImg = createNewImage(newImgSrc);
        oldImg.parentNode.appendChild(newImg);

        // 根据图片名称调整位置
        if (newImgSrc.includes("content.png")) {
          newImg.style.transform = "translateY(-42%)"; // content.png 的特定位移
        } else {
          newImg.style.transform = "none"; // 其他图片的默认位移
        }

        // 设置更快的过渡时间
        oldImg.style.transition = "opacity 0.2s ease-in-out";
        newImg.style.transition = "opacity 0.2s ease-in-out";

        newImg.offsetHeight;

        oldImg.style.opacity = "0";
        newImg.style.opacity = "1";
        //设置收信过程中每一张图片停留时间
        setTimeout(() => {
          oldImg.remove();
          resolve(newImg);
        }, 200);
      });
    }

    const currentImg = letter;
    quickCrossFade(currentImg, "./images/3.png")
      .then((img3) => {
        return new Promise((resolve) => {
          setTimeout(() => resolve(img3), 100);
        });
      })
      .then((img3) => quickCrossFade(img3, "./images/1.png"))
      /*直接切换到第一张图，收信会显得更干净利落一点，如果想慢慢收则打开*/
      /*            .then(img2 => {
                return new Promise(resolve => {
                    setTimeout(() => resolve(img2), 100);
                });
            })
            .then(img2 => quickCrossFade(img2, './images/1.png'))*/
      .then((finalImg) => {
        finalImg.style.cursor = "default";
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
    origin: { y: 0.4 },
    zIndex: 0,
  });

  // 切换背景图像
  //document.body.style.backgroundImage = "url('./images/bgi.png')";
}
