import './App.css';
import * as Tone from 'tone';
import anime from 'animejs';

import { useEffect, useState } from 'react';

const notes = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'];

function App() {
  var [noteData, setNoteData] = useState(initializeNoteData());
  var [barProgress, setBarProgress] = useState(0);
  var [prevBarProgress, setPrevBarProgress] = useState(0);

  let barX = 0;

  function initializeNoteData() {
    let temp = {};
    for (let note of notes) {
      temp[note] = [];
    }
    return temp;
  }

  function updateNoteData(note, xPos) {
    setNoteData((state) => {
      return {
        ...state,
        note: [...state[note], xPos],
      };
    });
  }

  function roundToNote(yPos) {
    // TODO: make this floor a y-position to the nearest note
  }

  function musicTest() {
    // console.log(synth);
    // synth.triggerAttackRelease('C4', '8n');
  }

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

    // https://animejs.com/documentation/#timelineBasics
    let timeline = anime
      .timeline({
        update: ({ progress }) => {
          setBarProgress(progress);
          console.log(progress);
        },
        loop: true,
      })
      .add({
        duration: 4000,
      });
  }, []);

  useEffect(() => {
    // noteData arrays will need to store x positions where we toggle starting and stopping
    console.log(noteData);
    for (let note in noteData) {
      for (let data in noteData[note]) {
        if (data <= barProgress && data > prevBarProgress) {
          console.log('hit note end / beginning!');
        }
      }
    }
    setPrevBarProgress(barProgress);
  }, [barProgress]);

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
