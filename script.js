/* eslint-disable no-param-reassign */
class SketchBoard {
  static slider = document.getElementById('board-size');

  static sliderOutput = document.getElementById('board-size-text');

  static board = document.querySelector('.sketch-board');

  static color = '#000';

  static hasBorders = true;

  // eslint-disable-next-line class-methods-use-this
  load() {
    SketchBoard.sliderOutput.textContent = SketchBoard.slider.value;
    SketchBoard.changeSliderOutput();
    SketchBoard.renderSketchBoard(SketchBoard.slider.value);
    // Buttons
    SketchBoard.toggleBorders();
    SketchBoard.reset();
    SketchBoard.changeColor();
    SketchBoard.eraser();
  }

  static changeSliderOutput() {
    SketchBoard.slider.oninput = () => {
      SketchBoard.sliderOutput.textContent = SketchBoard.slider.value;
      SketchBoard.renderSketchBoard(SketchBoard.slider.value);
    };
  }

  static changeBoxColor(box) {
    box.style.backgroundColor = SketchBoard.color;
  }

  static setBoardSize(gridSize) {
    SketchBoard.board.setAttribute(
      'style',
      `grid-template-columns:repeat(${gridSize}, 1fr);
      grid-template-rows:repeat(${gridSize}, 1fr)`
    );
  }

  static checkIfBox(e) {
    if (e.target.className === 'sketch-box') {
      SketchBoard.changeBoxColor(e.target);
    }
  }

  static onMouseMove(e) {
    SketchBoard.checkIfBox(e);
  }

  static toggleBorders() {
    const btn = document.getElementById('toggle-border');
    btn.addEventListener('click', () => {
      let sketchBoxes = SketchBoard.board.getElementsByClassName('sketch-box');
      sketchBoxes = Array.from(sketchBoxes);

      if (SketchBoard.hasBorders) {
        sketchBoxes.forEach((box) => {
          box.style.border = 'none';
          SketchBoard.hasBorders = false;
        });
      } else {
        sketchBoxes.forEach((box) => {
          box.style.border = '1px solid #000';
          SketchBoard.hasBorders = true;
        });
      }
    });
  }

  static reset() {
    const btn = document.getElementById('reset');
    btn.addEventListener('click', () => {
      SketchBoard.renderSketchBoard(SketchBoard.slider.value);
    });
  }

  static changeColor() {
    const colorInput = document.getElementById('color');

    colorInput.addEventListener('change', (e) => {
      SketchBoard.color = e.target.value;
    });
  }

  static eraser() {
    const btn = document.getElementById('eraser');
    const colorInput = document.getElementById('color');

    btn.addEventListener('click', () => {
      SketchBoard.color = '#ffffff';
      colorInput.value = '#ffffff';
    });
  }

  static renderSketchBoard(gridNum) {
    SketchBoard.hasBorders = true;

    SketchBoard.setBoardSize(gridNum);
    const gridSize = gridNum * gridNum;

    if (SketchBoard.board.hasChildNodes()) {
      while (SketchBoard.board.firstChild) {
        SketchBoard.board.removeChild(SketchBoard.board.firstChild);
      }
    }

    const sketchBox = document.createElement('div');
    sketchBox.classList.add('sketch-box');

    for (let i = 0; i < gridSize; i += 1) {
      SketchBoard.board.appendChild(sketchBox.cloneNode());
    }

    SketchBoard.board.addEventListener('mousedown', (e) => {
      SketchBoard.checkIfBox(e);

      SketchBoard.board.addEventListener('mousemove', SketchBoard.onMouseMove);
    });

    SketchBoard.board.addEventListener('mouseup', () => {
      SketchBoard.board.removeEventListener(
        'mousemove',
        SketchBoard.onMouseMove
      );
    });
  }
}

(function main() {
  const sketch = new SketchBoard();

  window.onload = () => {
    sketch.load();
  };
})();
