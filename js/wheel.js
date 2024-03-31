// https://stackoverflow.com/a/33850748
"use strict";

const wheel = (function () {
  const friction = 0.991;  // 0.995=soft, 0.99=mid, 0.98=hard
  const minAngleVelocity = 0.002; // Below that number will be treated as a stop
  const TAU = 2 * Math.PI;
  
  let wheelWrapper = null;
  let spinButton = null;
  let canvas = null;
  let context = null;
  
  let radius = null;
  let sectors = [];
  let maxAngleVelocity = 0; // Random ang.vel. to accelerate to 
  let angleVelocity = 0;    // Current angular velocity
  let angle = 0;       // Angle rotation in radians
  let isSpinning = false;
  let isAccelerating = false;
  let animFrame = null; // Engine's requestAnimationFrame
  let arc = null;

  function getCurrentSectorIndex() {
    return Math.floor(sectors.length - angle / TAU * sectors.length) % sectors.length;
  }

  function drawSector(sector, i) {
    const sectorAngle = arc * i;

    context.save();

    // COLOR
    context.beginPath();
    context.fillStyle = sector.color;
    context.moveTo(radius, radius);
    context.arc(radius, radius, radius, sectorAngle, sectorAngle + arc);
    context.lineTo(radius, radius);
    context.fill();

    // TEXT
    context.translate(radius, radius);
    context.rotate(sectorAngle + arc / 2);
    context.textAlign = "right";
    context.fillStyle = "#fff";
    context.font = "bold 30px sans-serif";
    context.fillText(sector.label, radius - 10, 10);

    context.restore();
  };

  function rotate() {
    const sector = sectors[getCurrentSectorIndex()];
    if (!!sector && !sector.placeholder) {
      canvas.style.transform = `rotate(${angle - Math.PI / 2}rad)`;
      spinButton.textContent = !angleVelocity ? i18n.getTranslation('wheel.spin') : sector.label;
      spinButton.style.background = sector.color;
    } else {
      spinButton.textContent = i18n.getTranslation('wheel.empty');
      spinButton.style.background = 'black';
    }
  };

  function animate() {
    if (!isSpinning) return;

    if (angleVelocity >= maxAngleVelocity) isAccelerating = false;

    if (isAccelerating) {
      angleVelocity ||= minAngleVelocity; // Initial velocity kick
      angleVelocity *= 1.06; // Accelerate
    } else {
      isAccelerating = false;
      angleVelocity *= friction; // Decelerate by friction  

      // spin end
      if (angleVelocity < minAngleVelocity) {
        isSpinning = false;
        angleVelocity = 0;
        cancelAnimationFrame(animFrame);
      }
    }

    angle += angleVelocity; // Update angle
    angle %= TAU;    // Normalize angle
    rotate();      // CSS rotate!

    animFrame = requestAnimationFrame(animate)
  };

  // public methods
  function drawWheel() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    sectors.forEach(drawSector);
  }

  function addSector(sector) {
    if (!sector.placeholder && sectors.some(s => s.placeholder)) {
      wheelWrapper.classList.remove("empty");
      const len = sectors.length;
      for (let i = 0; i < len; i++) 
        removeSector(true);
    }

    sectors.push(sector);    
    arc = TAU / sectors.length;
    drawWheel();
    rotate();
  }

  function removeSector(skipPlaceholder = false) {
    if (!skipPlaceholder && sectors.filter(s => !s.placeholder).length === 0)
      return;

    sectors.pop();
    arc = TAU / sectors.length;
    drawWheel();
    rotate();

    if (!skipPlaceholder && sectors.length === 0) {
      wheelWrapper.classList.add("empty");
      addPlaceholderSectors();
    }
  }

  function spin() {
    if (isSpinning)
      return;

    isSpinning = true;
    isAccelerating = true;
    maxAngleVelocity = helpers.randomFloatInRange(0.25, 0.40);
    animate();
  }

  function addPlaceholderSectors() {
    addSector({ color: colors[0], label: "🤔", placeholder: true });
    addSector({ color: colors[1], label: "🐄", placeholder: true });
    addSector({ color: colors[2], label: "🤓", placeholder: true });
  }

  function getIsSpinning() {
    return isSpinning;
  }

  function init() {
    wheelWrapper = document.getElementById("wheel-wrapper");
    spinButton = document.getElementById("spin-btn");
    canvas = document.getElementById("wheel");
    context = canvas.getContext(`2d`);
    
    radius = canvas.width / 2;

    addPlaceholderSectors();

    drawWheel();
    rotate();
  }

  return {
    drawWheel,
    addSector,
    removeSector,
    spin,
    getIsSpinning,
    init
  }
})();