(!function () {
  "use strict"
  class MoreGame {
    init(data) {
      this.dialog = null;
      this.btnClose = null;
      this.dataSource = data;
      this.drawView();
    }
    show() {
      if (!this.dialog) {
        this.dialog = document.getElementById("more-game");
        this.btnClose = document.getElementById("close-more");
        this.btnClose.addEventListener("click", () => {
          this.hide();
        })
      }
      if (!window.yh5.canShowAd()) return;
      this.dialog.style.display = "block";
    }
    hide() {
      this.dialog.style.display = "none";
    }
    drawView() {
      var panelHtml = `<div id="more-game"><div class="bg"></div><div class="container"><div class="header"><div class="close" id="close-more"></div></div><div class="content"><div class="list">`;
      for (let index = 0; index < this.dataSource.length; index++) {
        panelHtml += this.drawElement(this.dataSource[index], index % 5 + 3);
      }
      panelHtml += `</div></div></div></div></div>`;
      document.body.appendChild(document.createRange().createContextualFragment(panelHtml));
    }
    drawElement(data, index) {
      return `<a class="list-item" href="${window.yh5.topDomain}${data.url}${data.icon_tag}&from_yapp=${window.yh5.appId}" target="_blank">
        <img src="${data.icon}" alt="" class="game-icon">
        <p class="game-title" style="background-image:url(./yh5_sdk/assets/box_ht_dk${index}.png)">${data.name}</p>
      </a>`
    }
  }
  class MoreGame2 {
    init(data) {
      this.dialog = null;
      this.btnClose = null;
      this.dataSource = data;
      this.drawView();
    }
    show() {
      if (!this.dialog) {
        this.dialog = document.getElementById("more-game2");
      }
      if (!window.yh5.canShowAd()) return;
      this.dialog.style.display = "block";
    }
    hide() {
      this.dialog.style.display = "none";
    }
    drawView() {
      var panelHtml = `<div id="more-game2"><div class="bg"></div><div class="container"><div class="content"><div class="list">`;
      for (let index = 0; index < this.dataSource.length; index++) {
        panelHtml += this.drawElement(this.dataSource[index], index % 5 + 3);
      }
      panelHtml += `</div></div></div></div></div>`;
      document.body.appendChild(document.createRange().createContextualFragment(panelHtml));
    }
    drawElement(data, index) {
      return `<a class="list-item" href="${window.yh5.topDomain}${data.url}${data.icon_tag}&from_yapp=${window.yh5.appId}" target="_blank">
        <img src="${data.icon}" alt="" class="game-icon">
        <p class="game-title">${data.name}</p>
      </a>`
    }
  }
  class CustomBox {
    init(customId, info, data) {
      this.customId = customId;
      this.showLen = info ? info.show_len : 3;
      this.left = info ? info.left : null;
      this.right = info ? info.right : null;
      this.top = info ? info.top : null;
      this.dialog = null;
      this.customList = null;
      this.btnClose = null;
      this.dataSource = data;
      this.nextIndex = 0;
      this.drawView();
    }
    show() {
      if (!this.dialog) {
        this.dialog = document.getElementById("custom-box" + this.customId);
        this.customList = document.getElementById("custom-list" + this.customId);
      }
      if (!window.yh5.canShowAd()) return;
      this.dialog.style.display = "block";
      var self = this;
      this.timeInterval = setInterval(function () {
        self.updateView();
      }, 10000);
    }
    hide() {
      this.dialog.style.display = "none";
      if (this.timeInterval) {
        clearInterval(this.timeInterval);
        this.timeInterval = null;
      }
    }
    drawView() {
      var panelHtml = `<div id="custom-box${this.customId}" class="custom-box" style="${this.left?"left:"+this.left+";":""}${this.right?"right:"+this.right+";":""}${this.top?"top:"+this.top+";":""}"><div class="bg"></div><div class="container"><div class="content"><div id="custom-list${this.customId}" class="list">`;
      for (let index = 0; index < this.showLen; index++) {
        this.nextIndex = this.nextIndex % this.dataSource.length;
        panelHtml += this.drawElement(this.dataSource[this.nextIndex]);
        this.nextIndex+=1;
      }
      panelHtml += `</div></div></div></div></div>`;
      document.body.appendChild(document.createRange().createContextualFragment(panelHtml));
    }
    drawElement(data) {
      return `<a class="list-item" href="${window.yh5.topDomain}${data.url}${data.icon_tag}&from_yapp=${window.yh5.appId}" target="_blank"><img src="${data.icon}" alt="" class="game-icon"><p class="game-title">${data.name}</p></a>`
    }
    updateView() {
      if (!this.customList) {
        this.customList = document.getElementById("custom-list" + this.customId);
      }
      var panelHtml = "";
      for (let index = 0; index < this.showLen; index++) {
        this.nextIndex = this.nextIndex % this.dataSource.length;
        panelHtml += this.drawElement(this.dataSource[this.nextIndex]);
        this.nextIndex+=1;
      }
      this.customList.innerHTML = panelHtml;
    }
  }
  class GameBanner {
    init(data) {
      this.isShow = false;
      this.banner = null;
      this.listContent = null;
      this.bannerList = null;
      this.dataSource = data;
      this.timeInterval = null;
      this.scrollDir = 1;
      this.maxScrollWidth = 0;
      this.isPause = false;
      this.pauseTime = 0;
      this.drawView();
    }
    show() {
      if (!this.banner) {
        this.banner = document.getElementById("game-banner");
        this.listContent = document.getElementById("listContent");
        this.bannerList = document.getElementById("bannerList");
      }
      if (!window.yh5.canShowAd() || this.timeInterval) return;

      this.banner.style.display = "block";
      this.isShow = true;
      var that = this;
      this.maxScrollWidth = this.bannerList.clientWidth - this.listContent.clientWidth;
      this.listContent.scrollLeft = 0;
      this.timeInterval = setInterval(function () {
        if (that.listContent) {
          if (that.isPause) {
            that.pauseTime += 20;
            if (that.pauseTime >= 1500) {
              that.isPause = false;
              that.pauseTime = 0;
              if (that.scrollDir > 0) {
                that.scrollDir = -1;
              } else if (that.scrollDir < 0) {
                that.scrollDir = 1;
              }
            }
          } else {
            that.listContent.scrollLeft += that.scrollDir;
            if (that.listContent.scrollLeft >= that.maxScrollWidth || that.listContent.scrollLeft <= 0) {
              that.isPause = true;
            }
          }
        }
      }, 30);
      console.log("showBanner");
    }
    hide() {
      this.banner && (this.banner.style.display = "none");
      this.isShow = false;
      if (this.timeInterval) {
        this.isPause = false;
        this.pauseTime = 0;
        this.scrollDir = 1;
        this.listContent.scrollLeft = 0;
        clearInterval(this.timeInterval);
        this.timeInterval = null;
      }
      console.log("hideBanner");
    }
    drawView() {
      var panelHtml = `<div id="game-banner"><div class="bg"></div><div class="container"><div class="content" id="listContent" ><div class="list" id="bannerList" style="width:${this.dataSource.length * 90}px">`;
      for (let index = 0; index < this.dataSource.length; index++) {
        panelHtml += this.drawElement(this.dataSource[index], index % 5 + 3);
      }
      panelHtml += `</div></div></div></div></div>`;
      document.body.appendChild(document.createRange().createContextualFragment(panelHtml));
    }
    drawElement(data, index) {
      return `<a class="list-item" href="${window.yh5.topDomain}${data.url}${data.icon_tag}&from_yapp=${window.yh5.appId}" target="_blank">
        <img src="${data.icon}" alt="" class="game-icon">
        <p class="game-title" >${data.name}</p>
      </a>`
    }
  }
  class YH5 {
    constructor() {
      this.initTime = Math.round((new Date()).getTime() / 1000);
      this.appId = window.yh5_config.app_id;
      this.moreGame = null;
      this.moreGame2 = null;
      this.gameBanner = null;
      this.customBox = {};
      this.topDomain = "https://yandex.com";
      if (location.ancestorOrigins && location.ancestorOrigins.length) {
        this.topDomain = location.ancestorOrigins[location.ancestorOrigins.length - 1];
      }
    }
    initMoreGame() {
      this.moreGame = new MoreGame;
      this.moreGame.init(window.yh5_config.more_game_config);
    }
    initMoreGame2() {
      this.moreGame2 = new MoreGame2;
      this.moreGame2.init(window.yh5_config.more_game_config);
    }
    initGameBanner() {
      this.gameBanner = new GameBanner;
      this.gameBanner.init(window.yh5_config.more_game_config);
    }
    initCustomBox(tag, info) {
      this.customBox[tag] = new CustomBox;
      this.customBox[tag].init(tag, info, window.yh5_config.more_game_config)
    }
    showCustomBox(tag) {
      this.customBox[tag].show();
    }
    hideCustomBox(tag) {
      this.customBox[tag].hide();
    }
    canShowAd() {
      let hostname = location.hostname;
      return (hostname.indexOf("127.0.0.1") > -1 || hostname.indexOf("localhost")) || Math.round((new Date()).getTime() / 1000) - this.initTime > 60;
    }
  }
  window.yh5 = new YH5();
}())