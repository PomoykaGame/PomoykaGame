class Healthbar {

    constructor(lifeBar, isEnemy) {
        this.lifeBar = lifeBar
        this.lifeBar.setScale(2)
        this.lifeBar.x = 190
        this.lifeBar.y = 155
        this.health_color = 'hsl(0, 100%, 50%)'
        this.health = 1
        if(!isEnemy)
          this.redrawLifebar()
        else 
          this.enemyRedrawLifebar()  
    }

    redrawLifebar() {
        if(this.health <= 0) {
          this.lifeBar.clear()
        } else {
          this.health_color = this.getColorForPercentage(this.health)
          this.width = 180
          this.height = -110
          this.lifeBar.clear()
          this.lifeBar.fillStyle(this.health_color, 1)
          this.lifeBar.fillRect(
            -this.width / 2,
            this.height / 2,
            this.width * this.health,
            8
          );
          this.lifeBar.setDepth(1)
        }
    }

    enemyRedrawLifebar() {
      if(this.health <= 0) {
        this.lifeBar.clear()
      } else {
        this.health_color = this.getColorForPercentage(this.health)
        this.width = 20
        this.height = -40
        this.lifeBar.clear()
        this.lifeBar.fillStyle(this.health_color, 1)
        this.lifeBar.fillRect(
          -this.width / 2,
          this.height / 2,
          this.width * this.health,
          3
        );
        this.lifeBar.setDepth(1)
      }
    }
      
      getColorForPercentage = function(pct) {
        let percentColors = [
          { pct: 0.0, color: { r: 0xff, g: 0x00, b: 0 } },
          { pct: 0.5, color: { r: 0xff, g: 0xff, b: 0 } },
          { pct: 1.0, color: { r: 0x00, g: 0xff, b: 0 } } ];
        for (var i = 1; i < percentColors.length - 1; i++) {
            if (pct < percentColors[i].pct) {
                break;
            }
        }
        var lower = percentColors[i - 1];
        var upper = percentColors[i];
        var range = upper.pct - lower.pct;
        var rangePct = (pct - lower.pct) / range;
        var pctLower = 1 - rangePct;
        var pctUpper = rangePct;
        var color = {
            r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
            g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
            b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper)
        };
        return this.fullColorHex(color.r, color.g, color.b)
      } 
      
      rgbToHex(rgb) { 
        var hex = Number(rgb).toString(16);
        if (hex.length < 2) {
             hex = "0" + hex;
        }
        return hex;
      };
      
      fullColorHex(r,g,b) {   
        var red = this.rgbToHex(r);
        var green = this.rgbToHex(g);
        var blue = this.rgbToHex(b);
        return '0x' + red+green+blue;
      }
}