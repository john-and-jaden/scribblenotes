import './App.css';
import * as Tone from 'tone';
import anime from 'animejs';

import { useEffect, useState } from 'react';

const notes = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'];

function App() {
  var [barProgress, setBarProgress] = useState(0);

  let barX = 0;

  function musicTest() {
    // console.log(synth);
    // synth.triggerAttackRelease('C4', '8n');
  }

  const musicInterval = setInterval(() => {
    barX++;
    if (barX > 800) {
      barX = 0;
    }

    // SEE: tonejs (https://tonejs.github.io/)
    // todo: have a dictionary of Synth objects for each note,
    // manage each object's attack/release based on whether we currently
    // have a point within the y-range of that note under the bar
    // let idx = barX % notes.length;
    // let synth = new Tone.Synth().toDestination();
    // synth.triggerAttackRelease(notes[idx], '4n');
  }, 10);

  useEffect(() => {
    let x = 0;
    let y = 0;

    let isMouseDown = false;
    const paintCanvas = document.querySelector('.js-paint');
    const context = paintCanvas.getContext('2d');
    context.lineCap = 'round';

    const stopDrawing = () => {
      isMouseDown = false;
    };
    const startDrawing = (event) => {
      isMouseDown = true;
      [x, y] = [event.offsetX, event.offsetY];
    };
    const drawLine = (event) => {
      if (isMouseDown) {
        const newX = event.offsetX;
        const newY = event.offsetY;
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(newX, newY);
        context.stroke();
        x = newX;
        y = newY;

        console.log(x + ' ' + y);
      }
    };

    paintCanvas.addEventListener('mousedown', startDrawing);
    paintCanvas.addEventListener('mousedown', musicTest);
    paintCanvas.addEventListener('mousemove', drawLine);
    paintCanvas.addEventListener('mouseup', stopDrawing);
    paintCanvas.addEventListener('mouseout', stopDrawing);

    let timeline = anime
      .timeline({
        update: ({ progress }) => {
          setBarProgress(progress);
          console.log(progress);
        },
        loop: true
      })
      .add({
        duration: 4000,
      });
  }, []);

  return (
    <div className='App'>
      <input
        id='progress-bar'
        type='range'
        min='0'
        max='100'
        value={barProgress}
      />
      <canvas
        className='js-paint paint-canvas'
        width='800'
        height='400'
      ></canvas>
    </div>
  );
}

export default App;
