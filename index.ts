const path = "tracks/nepado-dont-know.wav";
// const path = "tracks/sweep.wav";

const sketch = (p: p5) => {
  let fft: p5.FFT;
  let sound: p5.SoundFile;
  p.preload = () => {
    sound = ((p as any) as p5.SoundFile).loadSound(path);
  };
  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    fft = new p5.FFT();
    sound.loop();
  };

  p.draw = () => {
    const x = p.mouseX;
    const y = p.mouseY;
    const f = p.frameRate();
    let spectrum = fft.analyze();
    p.background(0);
    p.fill(255);
    p.rect(x, y, 50, 50);
    p.text(f, x, y);
    p.text(spectrum.toString(), 10, 10);
    p.text(spectrum.length, 10, 20);

    p.noStroke();

    p.fill(255, 0, 255);
    for (let i = 0; i < spectrum.length; i++) {
      let x = p.map(i, 0, spectrum.length, 0, p.width);
      let h = -p.height + p.map(spectrum[i], 0, 255, p.height, 0);
      p.rect(x, p.height, p.width / spectrum.length, h);
    }

    let waveform = fft.waveform();
    p.noFill();
    p.beginShape();
    p.stroke(100);
    for (let i = 0; i < waveform.length; i++) {
      let x = p.map(i, 0, waveform.length, 0, p.width);
      let y = p.map(waveform[i], -1, 1, 0, p.height);
      p.vertex(x, y);
    }
    p.endShape();
  };
};

new p5(sketch);
