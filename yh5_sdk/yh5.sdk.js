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
      return `<a class="list-item" href="${top.location.origin}${data.url}${data.icon_tag}&from_app=${window.yh5.appId}" target="_blank">
        <img src="${data.icon}" alt="" class="game-icon">
        <p class="game-title" style="background-image:url(./yh5_sdk/assets/box_ht_dk${index}.png)">${data.name}</p>
      </a>`
    }
  }
  class GameBanner {
    init(data) {
      this.isShow = false;
      this.banner = null;
      this.listContent = null;
      this.dataSource = data;
      this.drawView();
    }
    show() {
      if (!this.banner) {
        this.banner = document.getElementById("game-banner");
        this.listContent = document.getElementById("listContent");
      }
      this.banner.style.display = "block";
      this.isShow = true;
    }
    hide() {
      this.banner.style.display = "none";
      this.isShow = false;
    }
    drawView() {
      var panelHtml = `<div id="game-banner"><div class="bg"></div><div id="listContent" class="container"><div class="content"><div class="list">`;
      for (let index = 0; index < this.dataSource.length; index++) {
        panelHtml += this.drawElement(this.dataSource[index], index % 5 + 3);
      }
      panelHtml += `</div></div></div></div></div>`;
      document.body.appendChild(document.createRange().createContextualFragment(panelHtml));
    }
    drawElement(data, index) {
      return `<a class="list-item" href="${top.location.origin}${data.url}${data.icon_tag}&from_app=${window.yh5.appId}" target="_blank">
        <img src="${data.icon}" alt="" class="game-icon">
        <p class="game-title" >${data.name}</p>
      </a>`
    }
  }
  class YH5 {
    constructor() {
      this.appId = window.yh5_config.app_id;
      this.moreGame = null;
      this.gameBanner = null;
    }
    initMoreGame() {
      this.moreGame = new MoreGame;
      this.moreGame.init(window.yh5_config.more_game_config);
      this.gameBanner = new GameBanner;
      this.gameBanner.init(window.yh5_config.more_game_config);
    }
  }
  window.yh5 = new YH5();
}())