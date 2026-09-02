const canvas = document.querySelector("#spin-canvas");
const context = canvas.getContext("2d");
const pauseButton = document.querySelector("#pause-button");
const speedControl = document.querySelector("#speed-control");
const speedValue = document.querySelector("#speed-value");
const fieldButton = document.querySelector("#field-button");
const pulseButton = document.querySelector("#pulse-button");
const fieldStatus = document.querySelector("#field-status");
const previousSceneButton = document.querySelector("#previous-scene");
const nextSceneButton = document.querySelector("#next-scene");
const resetButton = document.querySelector("#reset-button");
const sceneSelect = document.querySelector("#scene-select");
const sceneTitle = document.querySelector("#scene-title");
const sceneSubtitle = document.querySelector("#scene-subtitle");
const rfControlGroup = document.querySelector("#rf-control-group");
const rfControl = document.querySelector("#rf-control");
const rfValue = document.querySelector("#rf-value");
const gridControlGroup = document.querySelector("#grid-control-group");
const gridControl = document.querySelector("#grid-control");
const gridValue = document.querySelector("#grid-value");
const gradientControlGroup = document.querySelector("#gradient-control-group");
const gradientControl = document.querySelector("#gradient-control");
const gradientValue = document.querySelector("#gradient-value");
const yGradientControlGroup = document.querySelector("#y-gradient-control-group");
const yGradientControl = document.querySelector("#y-gradient-control");
const yGradientValue = document.querySelector("#y-gradient-value");
const phaseBrightnessControl = document.querySelector("#phase-brightness-control");
const phaseBrightnessValue = document.querySelector("#phase-brightness-value");

let running = true;
let speed = 1;
let phase = 0;
let fieldOn = false;
let alignment = 0;
let scene = 0;
let flip = 0;
let rfFrequency = 0.1;
let pulseStrength = 0;
let phaseBrightness = 1;
let gridSize = 10;
let xGradient = 1 / 6;
let yGradient = 0;
let simulationTime = 0;
const signalSamples = Array(96).fill(0);
let lastSignalSampleTime = 0;
let previousTimestamp = performance.now();

const scenes = [
  {
    title: "One hydrogen spin",
    subtitle: "A magnetic field gives the spin a preferred direction.",
  },
  {
    title: "Resonance",
    subtitle: "Only an RF pulse at the spin's natural frequency tips it strongly.",
  },
  {
    title: "Selecting a position",
    subtitle: "A field gradient gives each position a different natural frequency.",
  },
  {
    title: "Uniform grid",
    subtitle: "In a uniform field, a grid of spins precesses together.",
  },
  {
    title: "X-gradient dephasing",
    subtitle: "A gradient makes columns precess at different frequencies.",
  },
  {
    title: "XY gradients",
    subtitle: "Independent gradients encode position across the grid.",
  },
  {
    title: "Signal bridge",
    subtitle: "The receiver sees the sum of all the precessing spins.",
  },
];

function spinFrequency(position) {
  return 0.1 + position * 0.05;
}

function resetAnimationState() {
  phase = 0;
  simulationTime = 0;
  flip = 0;
  pulseStrength = 0;
  gridSize = 10;
  gridControl.value = "10";
  gridValue.textContent = "10 x 10";
  xGradient = scene === 2 || scene === 4 ? 0 : 1 / 6;
  gradientControl.value = String(xGradient);
  gradientValue.textContent = `${xGradient.toFixed(2)} Hz/unit`;
  yGradient = 0;
  yGradientControl.value = "0";
  yGradientValue.textContent = "0.00 Hz/unit";
  signalSamples.fill(0);
  lastSignalSampleTime = 0;
}

function resetGridPhase() {
  phase = 0;
  simulationTime = 0;
  signalSamples.fill(0);
  lastSignalSampleTime = 0;
}

function selectScene(nextScene) {
  const requestedScene = Number(nextScene);
  if (!Number.isInteger(requestedScene)) return;
  scene = Math.max(0, Math.min(scenes.length - 1, requestedScene));
  const currentScene = scenes[scene];
  sceneSelect.value = String(scene);
  sceneTitle.textContent = currentScene.title;
  sceneSubtitle.textContent = currentScene.subtitle;
  fieldOn = scene > 0;
  alignment = scene > 0 ? 1 : 0;
  resetAnimationState();
  fieldButton.classList.toggle("is-hidden", scene > 0);
  pulseButton.classList.toggle("is-hidden", scene !== 2);
  rfControlGroup.classList.toggle("is-hidden", scene !== 1 && scene !== 2);
  rfControl.classList.toggle("is-hidden", scene !== 1 && scene !== 2);
  gridControlGroup.classList.toggle("is-hidden", scene !== 3);
  gridControl.classList.toggle("is-hidden", scene !== 3);
  gradientControlGroup.classList.toggle("is-hidden", scene !== 2 && scene !== 4 && scene !== 5 && scene !== 6);
  gradientControl.classList.toggle("is-hidden", scene !== 2 && scene !== 4 && scene !== 5 && scene !== 6);
  yGradientControlGroup.classList.toggle("is-hidden", scene !== 5 && scene !== 6);
  yGradientControl.classList.toggle("is-hidden", scene !== 5 && scene !== 6);
  if (scene === 2) {
    gradientControl.min = "0";
    gradientControl.max = "0.1667";
    gradientControl.step = "0.005";
  } else {
    gradientControl.min = "-0.5";
    gradientControl.max = "0.5";
    gradientControl.step = "0.01";
  }
  gradientControl.value = String(xGradient);
  fieldStatus.textContent = scene > 0 ? "Field on" : "Field off";
}

function resizeCanvas() {
  const ratio = window.devicePixelRatio || 1;
  const { width, height } = canvas.getBoundingClientRect();
  canvas.width = Math.round(width * ratio);
  canvas.height = Math.round(height * ratio);
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
}

function arrow(fromX, fromY, toX, toY, color, width = 3) {
  const angle = Math.atan2(toY - fromY, toX - fromX);
  context.strokeStyle = color;
  context.fillStyle = color;
  context.lineWidth = width;
  context.beginPath();
  context.moveTo(fromX, fromY);
  context.lineTo(toX, toY);
  context.stroke();
  context.beginPath();
  context.moveTo(toX, toY);
  context.lineTo(toX - 12 * Math.cos(angle - Math.PI / 6), toY - 12 * Math.sin(angle - Math.PI / 6));
  context.lineTo(toX - 12 * Math.cos(angle + Math.PI / 6), toY - 12 * Math.sin(angle + Math.PI / 6));
  context.closePath();
  context.fill();
}

const twilightStops = ["#e2d9e6", "#b7a7c9", "#71669b", "#344b78", "#4e3769", "#9b4e71", "#d28a9b", "#e2d9e6"];

function twilightColor(angle) {
  const normalized = ((angle % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
  const position = normalized / (Math.PI * 2) * (twilightStops.length - 1);
  const lower = Math.floor(position);
  const upper = Math.min(lower + 1, twilightStops.length - 1);
  const mix = position - lower;
  const from = twilightStops[lower].match(/\w\w/g).map((value) => Number.parseInt(value, 16));
  const to = twilightStops[upper].match(/\w\w/g).map((value) => Number.parseInt(value, 16));
  const channel = (index) => Math.round(from[index] + (to[index] - from[index]) * mix);
  return `rgb(${channel(0)}, ${channel(1)}, ${channel(2)})`;
}

function phaseBackground(angle, magnitude) {
  const color = twilightColor(angle).match(/\d+/g).map(Number);
  const lightness = Math.min(1, (0.42 + magnitude * 0.52) * phaseBrightness);
  return `rgb(${Math.round(color[0] * lightness)}, ${Math.round(color[1] * lightness)}, ${Math.round(color[2] * lightness)})`;
}

function drawPanel(centerX, centerY, radius, panelView, spinPhase, transverseScale, longitudinalScale) {
  const isIsometric = panelView === "isometric";
  const isPhase = panelView === "phase";
  const radiusY = isIsometric ? radius * 0.5 : radius * 0.7;

  context.strokeStyle = "rgba(97, 216, 172, 0.35)";
  context.lineWidth = 1;
  context.beginPath();
  if (isIsometric) {
    context.ellipse(centerX, centerY, radius, radiusY, 0, 0, Math.PI * 2);
  } else {
    context.arc(centerX, centerY, radiusY, 0, Math.PI * 2);
  }
  context.stroke();

  if (isIsometric) {
    arrow(centerX, centerY + 110, centerX, centerY - 145, fieldOn ? "#f2b950" : "#49636a", 2);
    context.fillStyle = "#f2b950";
    context.font = '12px "Trebuchet MS", sans-serif';
    context.fillText("B0", centerX + 10, centerY - 132);
  }
  const transverseX = radius * Math.cos(spinPhase) * transverseScale;
  const transverseY = radiusY * Math.sin(spinPhase) * transverseScale;
  const spinX = centerX + transverseX;
  const spinY = centerY + transverseY - (isIsometric ? 145 * longitudinalScale : 0);
  const spinColor = isPhase ? twilightColor(spinPhase) : "#61d8ac";
  arrow(centerX, centerY, spinX, spinY, spinColor, 5);
  context.fillStyle = "#f4f1e7";
  context.beginPath();
  context.arc(centerX, centerY, 6, 0, Math.PI * 2);
  context.fill();

  context.fillStyle = "#c9d1c7";
  context.font = '13px "Trebuchet MS", sans-serif';
  const viewLabel = isIsometric ? "3D ISOMETRIC" : isPhase ? "PHASE COLOR" : "TOP-DOWN";
  context.fillText(viewLabel, centerX - context.measureText(viewLabel).width / 2, centerY + radius + 38);

  if (isPhase) {
    for (let index = 0; index < twilightStops.length - 1; index += 1) {
      context.fillStyle = twilightStops[index];
      context.fillRect(centerX - 70 + index * 20, centerY + radius + 48, 20, 8);
    }
  }
}

function drawFieldPlot(centerX, centerY, panelWidth, gradientX) {
  const width = panelWidth * 0.7;
  const height = 40;
  const left = centerX - width / 2;
  const topY = centerY - height / 2;
  const baselineY = topY + height;
  const fieldY = (position) => baselineY - Math.max(0, Math.min(1, 0.5 + gradientX * position * 3)) * height;

  context.fillStyle = "rgba(242, 185, 80, 0.2)";
  context.beginPath();
  context.moveTo(left, baselineY);
  for (let index = 0; index <= 40; index += 1) {
    const position = index / 20 - 1;
    context.lineTo(centerX + position * width / 2, fieldY(position));
  }
  context.lineTo(left + width, baselineY);
  context.closePath();
  context.fill();
  context.strokeStyle = "#f2b950";
  context.lineWidth = 2;
  context.beginPath();
  for (let index = 0; index <= 40; index += 1) {
    const position = index / 20 - 1;
    const x = centerX + position * width / 2;
    if (index === 0) context.moveTo(x, fieldY(position));
    else context.lineTo(x, fieldY(position));
  }
  context.stroke();
  context.fillStyle = "#c9d1c7";
  context.font = '11px "Trebuchet MS", sans-serif';
  context.fillText("FIELD / FREQUENCY", left, topY - 12);
  context.fillText(`${(0.1 - gradientX).toFixed(2)} Hz`, left, baselineY + 16);
  context.fillText(`${(0.1 + gradientX).toFixed(2)} Hz`, left + width - 42, baselineY + 16);
  context.fillText("POSITION", centerX - 24, baselineY + 34);
}

function drawLinePanel(centerX, centerY, panelWidth, panelView) {
  const positions = [-1, -0.78, -0.56, -0.34, -0.12, 0.12, 0.34, 0.56, 0.78, 1];
  const isPhase = panelView === "phase";
  const lineWidth = panelWidth * 0.76;
  const atomY = centerY + 26;
  context.strokeStyle = "rgba(97, 216, 172, 0.35)";
  context.lineWidth = 1;
  context.beginPath();
  context.moveTo(centerX - lineWidth / 2, atomY);
  context.lineTo(centerX + lineWidth / 2, atomY);
  context.stroke();

  positions.forEach((position) => {
    const frequency = spinFrequency(position);
    const detuning = Math.abs(frequency - rfFrequency);
    const excitation = pulseStrength * Math.exp(-Math.pow(detuning / 0.011, 2));
    const selected = excitation > 0.48;
    const x = centerX + position * lineWidth / 2;
    const phaseOffset = phase * frequency * 4;
    const arrowLength = 13 + excitation * 28;
    const arrowColor = selected ? "#ef6b5c" : "#61d8ac";
    if (isPhase) {
      context.fillStyle = phaseBackground(phaseOffset, 0.25 + excitation * 0.75);
      context.beginPath();
      context.arc(x, atomY, 27, 0, Math.PI * 2);
      context.fill();
    }
    arrow(x, atomY, x + Math.cos(phaseOffset) * arrowLength, atomY + Math.sin(phaseOffset) * arrowLength, arrowColor, selected ? 4 : 2);
    context.fillStyle = "#f4f1e7";
    context.beginPath();
    context.arc(x, atomY, 3, 0, Math.PI * 2);
    context.fill();
  });

  context.fillStyle = "#c9d1c7";
  context.font = '13px "Trebuchet MS", sans-serif';
  const label = isPhase ? "PHASE COLOR" : "TOP-DOWN";
  context.fillText(label, centerX - context.measureText(label).width / 2, centerY - 122);
}

function drawGridPanel(centerX, centerY, panelWidth, panelView, gradientX = 0, gradientY = 0) {
  const isIsometric = panelView === "isometric";
  const isPhase = panelView === "phase";
  const gridExtent = Math.min(panelWidth * 0.34, 128);
  const spacing = (gridExtent * 2) / Math.max(gridSize - 1, 1);
  const dotRadius = Math.max(2.5, Math.min(6, spacing * 0.22));
  const radiusY = isIsometric ? gridExtent * 0.5 : gridExtent * 0.78;

  context.strokeStyle = "rgba(97, 216, 172, 0.35)";
  context.lineWidth = 1;
  context.beginPath();
  if (isIsometric) {
    context.ellipse(centerX, centerY, gridExtent, radiusY, 0, 0, Math.PI * 2);
  } else {
    context.rect(centerX - gridExtent, centerY - radiusY, gridExtent * 2, radiusY * 2);
  }
  context.stroke();

  if (isIsometric) {
    arrow(centerX, centerY + 92, centerX, centerY - 118, fieldOn ? "#f2b950" : "#49636a", 2);
    context.fillStyle = "#f2b950";
    context.font = '12px "Trebuchet MS", sans-serif';
    context.fillText("B0", centerX + 10, centerY - 105);
  }

  for (let row = 0; row < gridSize; row += 1) {
    for (let column = 0; column < gridSize; column += 1) {
      const xPosition = gridSize === 1 ? 0 : (column / (gridSize - 1)) * 2 - 1;
      const yPosition = gridSize === 1 ? 0 : (row / (gridSize - 1)) * 2 - 1;
      const x = centerX + xPosition * gridExtent;
      const y = centerY + yPosition * radiusY;
      const spinPhase = phase + simulationTime * Math.PI * 2 * (gradientX * xPosition + gradientY * yPosition);
      const spinX = x + Math.cos(spinPhase) * dotRadius * 2.2;
      const spinY = y + Math.sin(spinPhase) * dotRadius * 2.2;
      const color = isPhase ? phaseBackground(spinPhase, 1) : "#61d8ac";

      if (isPhase) {
        context.fillStyle = color;
        context.beginPath();
        context.arc(x, y, dotRadius * 1.8, 0, Math.PI * 2);
        context.fill();
      }
      arrow(x, y, spinX, spinY - (isIsometric ? 18 : 0), color, Math.max(1.5, dotRadius * 0.55));
      context.fillStyle = "#f4f1e7";
      context.beginPath();
      context.arc(x, y, Math.max(1.5, dotRadius * 0.42), 0, Math.PI * 2);
      context.fill();
    }
  }

  context.fillStyle = "#c9d1c7";
  context.font = '13px "Trebuchet MS", sans-serif';
  const label = isIsometric ? "3D ISOMETRIC" : isPhase ? "PHASE COLOR" : "TOP-DOWN";
  context.fillText(label, centerX - context.measureText(label).width / 2, centerY + gridExtent + 38);
}

function drawGradientVector(centerX, centerY, gradientX, gradientY) {
  const magnitude = Math.hypot(gradientX, gradientY);
  if (magnitude < 0.001) return;
  const length = 36 + Math.min(64, magnitude * 128);
  const directionX = gradientX / magnitude;
  const directionY = gradientY / magnitude;
  arrow(centerX - directionX * length / 2, centerY - directionY * length / 2, centerX + directionX * length / 2, centerY + directionY * length / 2, "#f2b950", 3);
  context.fillStyle = "#f2b950";
  context.font = '11px "Trebuchet MS", sans-serif';
  context.fillText("GRADIENT", centerX - 28, centerY - 48);
}

function combinedGridSignal(gradientX, gradientY) {
  let real = 0;
  let imaginary = 0;
  const spinCount = gridSize * gridSize;

  for (let row = 0; row < gridSize; row += 1) {
    for (let column = 0; column < gridSize; column += 1) {
      const xPosition = gridSize === 1 ? 0 : (column / (gridSize - 1)) * 2 - 1;
      const yPosition = gridSize === 1 ? 0 : (row / (gridSize - 1)) * 2 - 1;
      const spinPhase = phase + simulationTime * Math.PI * 2 * (gradientX * xPosition + gradientY * yPosition);
      real += Math.cos(spinPhase);
      imaginary += Math.sin(spinPhase);
    }
  }

  return Math.hypot(real, imaginary) / spinCount;
}

function sampleSignal(signalStrength) {
  if (simulationTime - lastSignalSampleTime < 1 / 30) return;
  signalSamples.push(signalStrength);
  signalSamples.shift();
  lastSignalSampleTime = simulationTime;
}

function drawSignalStrip(width, height, signalStrength, showRf = false) {
  const left = 28;
  const right = width - 28;
  const signalY = height - 38;
  const widthAvailable = right - left;

  context.fillStyle = "#c9d1c7";
  context.font = '12px "Trebuchet MS", sans-serif';
  context.fillText(`COMBINED SIGNAL |S|: ${signalStrength.toFixed(2)}`, left, signalY - 20);

  if (showRf) {
    const rfY = height - 96;
    const normalizedFrequency = (rfFrequency - 0.04) / 0.12;
    context.fillText(`RF PULSE: ${rfFrequency.toFixed(2)} Hz`, left, rfY - 20);
    context.strokeStyle = pulseStrength > 0.02 ? "#ef6b5c" : "#775052";
    context.lineWidth = 2;
    context.beginPath();
    for (let index = 0; index <= 120; index += 1) {
      const x = left + (index / 120) * widthAvailable;
      const envelope = pulseStrength > 0.02 ? Math.sin((index / 120) * Math.PI) : 0.16;
      const y = rfY - Math.sin(index * (4 + normalizedFrequency * 12)) * envelope * 18;
      if (index === 0) context.moveTo(x, y);
      else context.lineTo(x, y);
    }
    context.stroke();
  }

  context.strokeStyle = "#61d8ac";
  context.lineWidth = 2;
  context.beginPath();
  signalSamples.forEach((sample, index) => {
    const x = left + (index / (signalSamples.length - 1)) * widthAvailable;
    const y = signalY - sample * 25;
    if (index === 0) context.moveTo(x, y);
    else context.lineTo(x, y);
  });
  context.stroke();
  context.strokeStyle = "#49636a";
  context.lineWidth = 1;
  context.beginPath();
  context.moveTo(left, signalY);
  context.lineTo(right, signalY);
  context.stroke();
}

function draw() {
  const { width, height } = canvas.getBoundingClientRect();
  const panelWidth = width / 3;
  const radius = Math.min(panelWidth * 0.32, 130);
  const centerY = height * 0.52;
  const isResonance = scene === 1;
  const isLineSelectivity = scene === 2;
  const isUniformGrid = scene === 3;
  const isDephasing = scene === 4;
  const isXYGradients = scene === 5;
  const isSignalBridge = scene === 6;
  const targetFlip = isResonance ? pulseStrength * Math.PI / 2 : 0;
  flip += (targetFlip - flip) * 0.12;
  const transverseScale = isResonance ? Math.sin(flip) : 1 - alignment;
  const longitudinalScale = isResonance ? Math.cos(flip) : alignment;
  const spinPhase = isResonance ? phase : 0.8 + phase * alignment;

  context.clearRect(0, 0, width, height);
  context.fillStyle = "#c9d1c7";
  context.font = '15px Georgia, serif';
  const message = isSignalBridge
    ? "The receiver adds every transverse spin into one measured signal."
    : isXYGradients
    ? "Independent x and y gradients give every position its own precession frequency."
    : isDephasing
    ? "A gentle x gradient gives each column a different frequency, so phase spreads over time."
    : isUniformGrid
    ? "With no gradient, every spin has the same frequency and stays in step."
    : isLineSelectivity
    ? (pulseStrength > 0.01 ? "The released RF pulse excites only the matching position." : "Set an RF frequency, then release the slider to apply a pulse.")
    : isResonance
    ? (pulseStrength > 0.01 ? "The released RF pulse tips the spin in proportion to its resonance." : "Set an RF frequency, then release the slider to apply a pulse.")
    : (fieldOn ? "The field aligns this one spin." : "One spin begins at a random angle.");
  context.fillText(message, 20, 34);
  context.fillStyle = "#f2b950";
  context.font = '14px "Trebuchet MS", sans-serif';
  context.fillText(fieldOn ? "B0 ON" : "B0 OFF", width - 78, 34);

  let signalAmplitude = 0;
  if (isLineSelectivity) {
    drawLinePanel(panelWidth * 0.5, centerY, panelWidth, "top");
    drawLinePanel(panelWidth * 1.5, centerY, panelWidth, "phase");
    drawFieldPlot(panelWidth * 2.5, centerY, panelWidth, xGradient);
    signalAmplitude = pulseStrength;
  } else if (isUniformGrid || isDephasing || isXYGradients || isSignalBridge) {
    const gradientX = isDephasing || isXYGradients || isSignalBridge ? xGradient : 0;
    const gradientY = isXYGradients || isSignalBridge ? yGradient : 0;
    if (isDephasing) {
      drawGridPanel(panelWidth * 0.5, centerY, panelWidth, "top", gradientX, gradientY);
      drawGridPanel(panelWidth * 1.5, centerY, panelWidth, "phase", gradientX, gradientY);
      drawFieldPlot(panelWidth * 2.5, centerY, panelWidth, gradientX);
    } else {
      const twoPanelWidth = width / 2;
      drawGridPanel(twoPanelWidth * 0.5, centerY, twoPanelWidth, "top", gradientX, gradientY);
      drawGridPanel(twoPanelWidth * 1.5, centerY, twoPanelWidth, "phase", gradientX, gradientY);
      if (isXYGradients) drawGradientVector(width / 2, 76, gradientX, gradientY);
    }
    signalAmplitude = combinedGridSignal(gradientX, gradientY);
  } else {
    drawPanel(panelWidth * 0.5, centerY, radius, "isometric", spinPhase, transverseScale, longitudinalScale);
    drawPanel(panelWidth * 1.5, centerY, radius, "top", spinPhase, transverseScale, longitudinalScale);
    drawPanel(panelWidth * 2.5, centerY, radius, "phase", spinPhase, transverseScale, longitudinalScale);
    signalAmplitude = isResonance ? transverseScale : 0;
  }
  if (isResonance || isLineSelectivity || isSignalBridge) {
    sampleSignal(signalAmplitude);
    drawSignalStrip(width, height, signalAmplitude, isResonance || isLineSelectivity);
  }
}

function animate(timestamp) {
  const elapsedSeconds = (timestamp - previousTimestamp) / 1000;
  previousTimestamp = timestamp;
  if (running) {
    simulationTime += elapsedSeconds * speed;
    phase += elapsedSeconds * speed * 2 * Math.PI * 0.1;
    if (scene !== 1) {
      alignment += ((fieldOn ? 1 : 0) - alignment) * elapsedSeconds * speed;
    }
    pulseStrength *= Math.exp(-elapsedSeconds * speed * 1.2);
    alignment = Math.max(0, Math.min(1, alignment));
  }
  draw();
  requestAnimationFrame(animate);
}

pauseButton.addEventListener("click", () => {
  running = !running;
  pauseButton.textContent = running ? "II" : "PLAY";
  pauseButton.setAttribute("aria-label", running ? "Pause animation" : "Play animation");
});

resetButton.addEventListener("click", resetAnimationState);

speedControl.addEventListener("input", () => {
  speed = Number(speedControl.value);
  speedValue.textContent = `${speed.toFixed(2).replace(/0$/, "")}x`;
});

fieldButton.addEventListener("click", () => {
  fieldOn = !fieldOn;
  fieldButton.textContent = fieldOn ? "TURN FIELD OFF" : "APPLY FIELD";
  fieldStatus.textContent = fieldOn ? "Field on" : "Field off";
});

pulseButton.addEventListener("click", () => {
  pulseStrength = 1;
});

rfControl.addEventListener("input", () => {
  rfFrequency = Number(rfControl.value);
  rfValue.textContent = `${rfFrequency.toFixed(2)} Hz`;
});

rfControl.addEventListener("pointerup", () => {
  pulseStrength = 1;
});

rfControl.addEventListener("change", () => {
  pulseStrength = 1;
});

gridControl.addEventListener("input", () => {
  gridSize = Number(gridControl.value);
  gridValue.textContent = `${gridSize} x ${gridSize}`;
});

gradientControl.addEventListener("input", () => {
  xGradient = Number(gradientControl.value);
  gradientValue.textContent = `${xGradient.toFixed(2)} Hz/unit`;
  if (scene === 5) resetGridPhase();
});

yGradientControl.addEventListener("input", () => {
  yGradient = Number(yGradientControl.value);
  yGradientValue.textContent = `${yGradient.toFixed(2)} Hz/unit`;
  if (scene === 5) resetGridPhase();
});

phaseBrightnessControl.addEventListener("input", () => {
  phaseBrightness = Number(phaseBrightnessControl.value);
  phaseBrightnessValue.textContent = `${Math.round(phaseBrightness * 100)}%`;
});

sceneSelect.addEventListener("change", () => selectScene(Number(sceneSelect.value)));

previousSceneButton.addEventListener("click", () => selectScene(scene - 1));
nextSceneButton.addEventListener("click", () => selectScene(scene + 1));

window.addEventListener("keydown", (event) => {
  const focusedElement = document.activeElement;
  const isEditingControl = focusedElement instanceof HTMLInputElement || focusedElement instanceof HTMLSelectElement;
  if (isEditingControl) return;
  if (event.key === "ArrowLeft") {
    event.preventDefault();
    selectScene(scene - 1);
  }
  if (event.key === "ArrowRight") {
    event.preventDefault();
    selectScene(scene + 1);
  }
  if (/^[1-9]$/.test(event.key)) {
    event.preventDefault();
    selectScene(Number(event.key) - 1);
  }
});

window.addEventListener("resize", resizeCanvas);
resizeCanvas();
requestAnimationFrame(animate);