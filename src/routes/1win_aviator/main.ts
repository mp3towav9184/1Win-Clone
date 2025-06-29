//@ts-nocheck

let rd = parseInt(Math.random()*1e20);
let obj = {};


function loadImage(url : string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    let img = new Image();
		img.src = url;
		img.onload = () => resolve(img);
    img.onerror = reject;
  })
}


export default async function init() {
  Object.keys(window).filter(k=>k.startsWith('stopgame')).forEach(k=>window[k]=true);

  window[`stopgame${rd}`] = false;
  window.rotate = false;
  window.animateplane = false;
  window.flewaway = false;
  window.showcredit = true;
  window.currentCoef = 1;
  window.targetCoef = window.getCoef();

  
  let canvas : HTMLCanvasElement = document.getElementById('canvas');
  let ctx : CanvasRenderingContext2D = canvas.getContext('2d');
  let bgImg = await loadImage('https://aviator-demo.spribegaming.com/assets/images/canvas/bg/bg-sun.svg');
  let partnerImg = await loadImage('https://aviator-demo.spribegaming.com/assets/images/canvas/partners-logo/partners-logo.svg');
  let spribeImg = await loadImage('https://aviator-demo.spribegaming.com/assets/images/canvas/partners-logo/official.svg');
  let plane0Img = await loadImage('https://aviator-demo.spribegaming.com/assets/images/canvas/plane/spribe/plane-0.svg');
  let plane1Img = await loadImage('https://aviator-demo.spribegaming.com/assets/images/canvas/plane/spribe/plane-1.svg');
  let plane2Img = await loadImage('https://aviator-demo.spribegaming.com/assets/images/canvas/plane/spribe/plane-2.svg');
  let plane3Img = await loadImage('https://aviator-demo.spribegaming.com/assets/images/canvas/plane/spribe/plane-3.svg');
  let blurBlueImg = await loadImage(`data:image/svg+xml,%3Csvg%20width%3D%22438%22%20height%3D%22334%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cdefs%3E%3Cfilter%20x%3D%22-70.1%25%22%20y%3D%22-166.7%25%22%20width%3D%22240.2%25%22%20height%3D%22433.3%25%22%20filterUnits%3D%22objectBoundingBox%22%20id%3D%22a%22%3E%3CfeGaussianBlur%20stdDeviation%3D%2250%22%20in%3D%22SourceGraphic%22%2F%3E%3C%2Ffilter%3E%3C%2Fdefs%3E%3Cellipse%20filter%3D%22url(%23a)%22%20cx%3D%22309%22%20cy%3D%221357%22%20rx%3D%22107%22%20ry%3D%2245%22%20transform%3D%22translate(-90%20-1190)%22%20fill%3D%22%23${'34b4ff'}%22%20fill-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E`);
  let blurPurpleImg = await loadImage(`data:image/svg+xml,%3Csvg%20width%3D%22438%22%20height%3D%22334%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cdefs%3E%3Cfilter%20x%3D%22-70.1%25%22%20y%3D%22-166.7%25%22%20width%3D%22240.2%25%22%20height%3D%22433.3%25%22%20filterUnits%3D%22objectBoundingBox%22%20id%3D%22a%22%3E%3CfeGaussianBlur%20stdDeviation%3D%2250%22%20in%3D%22SourceGraphic%22%2F%3E%3C%2Ffilter%3E%3C%2Fdefs%3E%3Cellipse%20filter%3D%22url(%23a)%22%20cx%3D%22309%22%20cy%3D%221357%22%20rx%3D%22107%22%20ry%3D%2245%22%20transform%3D%22translate(-90%20-1190)%22%20fill%3D%22%23${'913ef8'}%22%20fill-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E`);
  let blurPinkImg = await loadImage(`data:image/svg+xml,%3Csvg%20width%3D%22438%22%20height%3D%22334%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cdefs%3E%3Cfilter%20x%3D%22-70.1%25%22%20y%3D%22-166.7%25%22%20width%3D%22240.2%25%22%20height%3D%22433.3%25%22%20filterUnits%3D%22objectBoundingBox%22%20id%3D%22a%22%3E%3CfeGaussianBlur%20stdDeviation%3D%2250%22%20in%3D%22SourceGraphic%22%2F%3E%3C%2Ffilter%3E%3C%2Fdefs%3E%3Cellipse%20filter%3D%22url(%23a)%22%20cx%3D%22309%22%20cy%3D%221357%22%20rx%3D%22107%22%20ry%3D%2245%22%20transform%3D%22translate(-90%20-1190)%22%20fill%3D%22%23${'c017b4'}%22%20fill-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E`);

  let prevFrameTime = 0;
  let prevPlaneID = 0;
  let prevPlaneReplaceTime = 0;
  let rotateDegree = 0;
  let idleProgress = 100;
  let isMobile = window.screen.width <= 1510;
  let pathW = isMobile ? 60 : 80; // %
  let pathH = isMobile ? 85 : 85; // %
  let planeX = 0;
  let planeY = 0;
  let planeReachedEdge = false;
  let planeEdgePerc = 0;
  let revertDisplace = false;
  let flewTime = 0;
  let opacity = 0;
  let eventST = false;
  let eventSP = false;
	async function main(timestamp) {
    if (window[`stopgame${rd}`]) return;
    if (timestamp - prevFrameTime + 15 < 1000 / 30 ) return requestAnimationFrame(main);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (window.currentCoef >= window.targetCoef) {
      window.flewaway = true;
      window.currentCoef = window.targetCoef;
    };
    // BG IMAGE CONFIG
		(()=>{
      ctx.save();
			ctx.translate(0, canvas.height);
			let imgScale = (canvas.width ** 2 + canvas.height ** 2) ** 0.5 / (bgImg.width / 2);
			ctx.scale(imgScale, imgScale);
			if (window.rotate) {
				rotateDegree += 0.5;
				ctx.rotate((rotateDegree * Math.PI) / 180);
			}
			ctx.drawImage(bgImg, -bgImg.width / 2, -bgImg.height / 2);
			ctx.restore();
    })();

    // Coef Blur Config
    (()=>{
      if (window.showcredit) return;
      if (!window.flewaway) window.currentCoef += Math.random() * (0.02 - 0.001) + 0.001;
      ctx.save();
      ctx.translate(canvas.width/2, canvas.height/2);
      if (isMobile) {
        ctx.scale(1, 1.1)
      } else {
        ctx.scale(3, 1.5)
      }
      let cs = 1;
      if (Math.abs(window.currentCoef - 2) <= 0.2 || Math.abs(window.currentCoef - 10) <= 0.2) {
        if (window.currentCoef < 5) {
          cs = window.currentCoef - 2 < 0 ? -1 : 1;
        } else {
          cs = window.currentCoef - 10 < 0 ? -1 : 1;
        }
			}
      if (window.flewaway) cs = -2;
      opacity += 0.015 * cs;
      if (opacity < 0) opacity = 0;
      if (opacity < 0.5 && !window.flewaway) opacity = 0.5;
      if (opacity > 0.8) opacity = 0.8;
      ctx.globalAlpha = opacity;
      let bi;
      if (window.currentCoef < 2) {
        bi = blurBlueImg;
      } else if (window.currentCoef < 10) {
        bi = blurPurpleImg;
      } else {
        bi = blurPinkImg;
      }
      ctx.drawImage(bi, -bi.width/2, -bi.height/2);
      ctx.restore();
    })();
    
    // Cedits Config
    (()=>{
      if (!window.showcredit) return;
      if (!eventST) {window.onGameStart(); eventST = true}
      planeX = 0;
      planeY = 0;
      ctx.save();
      ctx.translate(canvas.width/2, canvas.height/2);
      let scl1 = canvas.width/partnerImg.width/3;
      if (scl1 < 0.26) scl1 = 0.26;
      if (scl1 > 0.5) scl1 = 0.5;
      ctx.scale(scl1 , scl1);
      ctx.drawImage(partnerImg, -partnerImg.width/2, -partnerImg.height);
      ctx.restore();

      ctx.save();
      ctx.translate(canvas.width/2, canvas.height/2);
      let pw = 200;
      let ph = 4;
      ctx.beginPath();
      ctx.roundRect(-pw/2, 15 - (isMobile ? 5 : 0), pw, ph, 1e3);
      ctx.fillStyle = '#23252d';
      ctx.fill();
      ctx.beginPath();
      ctx.roundRect(-pw/2, 15 - (isMobile ? 5 : 0), pw*idleProgress/100, ph, 1e3);
      idleProgress-=.6;
      if (idleProgress <= 0) {
        idleProgress = 100;
        window.showcredit = false;
        window.rotate = true;
        window.animateplane = true;
      }
      ctx.fillStyle = '#e50539';
      ctx.fill();
      ctx.restore();
      
      ctx.save();
      ctx.translate(canvas.width/2, canvas.height/2);
      ctx.scale(.5, .5);
      ctx.drawImage(spribeImg, -spribeImg.width/2, spribeImg.height/2 - (isMobile ? 30 : 0))
      ctx.restore();

      ctx.save();
      ctx.translate(0, canvas.height);
      if (timestamp - prevPlaneReplaceTime > 100) {prevPlaneID++;prevPlaneReplaceTime=timestamp};
      if (prevPlaneID >= 4) prevPlaneID = 0;
      let pln = eval(`plane${prevPlaneID}Img`);
      if (isMobile) {
        ctx.scale(.7, .7);
      }
      ctx.drawImage(pln, 0, -pln.height);
      ctx.restore();
    })();
    
    // Path Config
    (()=>{
      if (!window.animateplane) return;
      if (window.flewaway) {
        if (!flewTime) flewTime = timestamp;
        if (!eventSP) {window.onGameEnd(); eventSP = true}
        window.rotate = false;
        let sp = isMobile ? 10 : 30;
        planeEdgePerc = 100;
        if(!obj.MxW) obj.MxW = canvas.width*(1.1) + plane0Img.width - planeX;
        if(!obj.MxH) obj.MxH = Math.tan(20*Math.PI/180) * obj.MxW;
        planeX += obj.MxW / sp;
        planeY += obj.MxH / sp;
        if (timestamp - flewTime >= 3*1e3) {
					window.rotate = false;
					window.animateplane = false;
					window.flewaway = false;
					window.showcredit = true;
					window.currentCoef = 1;
					window.targetCoef = window.getCoef();
					prevPlaneID = 0;
					prevPlaneReplaceTime = 0;
					rotateDegree = 0;
					idleProgress = 100;
					isMobile = window.screen.width <= 768;
					pathW = isMobile ? 60 : 80; // %
					pathH = isMobile ? 85 : 85; // %
					planeX = 0;
					planeY = 0;
					planeReachedEdge = false;
					planeEdgePerc = 0;
					revertDisplace = false;
					flewTime = 0;
					opacity = 0;
          eventST = false;
          eventSP = false;
					obj = {};
				}
      } else {
        if (planeEdgePerc <= 100) {
          planeEdgePerc += 0.5 * (p => (1 - (p / 100) ** 2) * 0.8 + 0.2)(planeEdgePerc);
        } else {
          let p = 120;
          if (!revertDisplace) {
            if (isMobile) {
              if (pathW < 75) pathW += 15/p;
              if (pathH > 55) pathH -= 30/p;
              if (pathW >= 75 && pathH <= 55) revertDisplace = true;
            } else {
              if (pathW < 88) pathW += 8/p;
              if (pathH > 60) pathH -= 25/p;
              if (pathW >= 88 && pathH <= 60) revertDisplace = true;
            }
          } else {
            if (isMobile) {
              if (pathW > 60) pathW -= 15/p;
              if (pathH < 85) pathH += 30/p;
              if (pathW <= 60 && pathH >= 85) revertDisplace = false;
            } else {
              if (pathW > 80) pathW -= 8/p;
              if (pathH < 85) pathH += 25/p;
              if (pathW <= 80 && pathH >= 85) revertDisplace = false;
            }
          }
        }
        ctx.save();
        ctx.translate(0, canvas.height);
        ctx.scale(1, -1);
        
        ctx.beginPath();
        ctx.moveTo(0, 0);
        let maxWidth = canvas.width * pathW / 100;
        let maxHeight = canvas.height * pathH / 100;
        let multiplyConst = 30;
        let limitConst = Math.log((maxHeight + multiplyConst) / multiplyConst) / maxWidth;
        let f = (x) => multiplyConst * Math.exp(x*limitConst) - multiplyConst;
        let lastX, lastY;
        for (let x = 1; x <= maxWidth; x++) {
          ctx.lineTo(x, f(x));
          lastX = x;
          lastY = f(x);
          if (planeEdgePerc <= x/maxWidth*100) break;
        }
        if (isMobile) {
          planeX = (lastX - 10)/.7;
          planeY = (lastY - 5)/.7;
        } else {
          planeX = lastX - 20;
          planeY = lastY - 10;
        }
        ctx.strokeStyle = '#e50539';
        ctx.lineWidth = 4;
        ctx.stroke();
        ctx.lineTo(lastX, 0);
        ctx.lineTo(0, 0);
        ctx.fillStyle = '#a6001390';
        ctx.fill();
        ctx.restore();
      }
    })();

    // Plane Config
    (()=>{
      ctx.save();
      ctx.translate(0, canvas.height);
      if (timestamp - prevPlaneReplaceTime > 100) {prevPlaneID++;prevPlaneReplaceTime=timestamp};
      if (prevPlaneID >= 4) prevPlaneID = 0;
      let pln = eval(`plane${prevPlaneID}Img`);
      if (isMobile) {
        ctx.scale(.7, .7);
      }
      if ((planeX || -1) < 0) planeX = 0;
      if ((planeY || -1) < 0) planeY = 0;
      
      ctx.drawImage(pln, planeX, -pln.height-planeY);
      ctx.restore();
    })();

    // Coef Text Config
    (()=>{
      if (window.showcredit) return;
      ctx.save();
			ctx.translate(canvas.width / 2, canvas.height / 2);
      if (isMobile) ctx.scale(0.6, 0.6);
			ctx.font = 'bold 110px Arial';
			ctx.fillStyle = window.flewaway ? '#d0021b' : 'white';
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';
      let centeredText = window.currentCoef.toFixed(2) + 'x';
			ctx.fillText(centeredText, 0, 0);
      if (window.flewaway) {
        let metrics = ctx.measureText(centeredText);
        ctx.font = '35px Arial';
        ctx.fillStyle = 'white';
        ctx.fillText('FLEW AWAY!', 0, -metrics.actualBoundingBoxAscent-metrics.actualBoundingBoxDescent-10);
      }
			ctx.restore();
    })();

    prevFrameTime = timestamp;    
    requestAnimationFrame(main);
  }
  requestAnimationFrame(main);
  return ()=>{
    window[`stopgame${rd}`] = true;
  }
}
