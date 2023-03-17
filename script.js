const slider = document.getElementById('board-size');
const output = document.getElementById('board-size-text');
output.textContent = slider.value;

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function () {
  output.textContent = this.value;
};
