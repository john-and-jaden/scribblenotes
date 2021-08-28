import './App.css';

import { useEffect } from 'react';

function App() {
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

        console.log(x);
        console.log(y);
      }
    };

    paintCanvas.addEventListener('mousedown', startDrawing);
    paintCanvas.addEventListener('mousemove', drawLine);
    paintCanvas.addEventListener('mouseup', stopDrawing);
    paintCanvas.addEventListener('mouseout', stopDrawing);
  }, []);

  return (
    <div className="App">
      <canvas className="js-paint paint-canvas" width="600" height="300"></canvas>
    </div>
  );
}

export default App;

// HOW THE HELL TO DRAW IN SIMPLE HTML????????? :'(
