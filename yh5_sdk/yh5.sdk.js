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
      return `<div class="list-item" onclick="window.open('${data.url}')">
        <img src="${data.icon}" alt="" class="game-icon">
        <p class="game-title" style="background-image:url(./yh5_sdk/assets/box_ht_dk${index}.png)">${data.name}</p>
      </div>`
    }
  }
  class YH5 {
    constructor() {
      this.moreGame = null;
    }
    initMoreGame() {
      this.moreGame = new MoreGame;
      this.moreGame.init(window.yh5_config.more_game_config);
    }
  }
  window.yh5 = new YH5();
}())