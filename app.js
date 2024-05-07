const columns = document.querySelectorAll(".column");

document.addEventListener('keydown', (evt) => {
  evt.preventDefault();

  if(evt.code.toLowerCase() === 'space') {
    setRandomColors();
  }
});

document.addEventListener('click', (evt) => {
  const type = evt.target.dataset.type;
  
  if(type === 'lock') {
    const node = evt.target.tagName.toLowerCase() === 'i'
      ? evt.target
      : evt.target.children[0];
    
    node.classList.toggle('fa-lock-open');
    node.classList.toggle('fa-lock');
  } else if (type === 'copy') {
    copyClickedText(evt.target.textContent);
  }
});

function setRandomColors(isFirstTime = false) {
  const colors = isFirstTime ? getColorsFromHash() : [];

  columns.forEach((col, index) => {
    const isLocked = col.querySelector('i').classList.contains('fa-lock');
    const title = col.querySelector("h2");
    const button = col.querySelector("button");

    if(isLocked) {
      colors.push(title.textContent);
      return;
    }

    const color = isFirstTime
      ? colors[index]
        ? colors[index]
        : chroma.random()
      : chroma.random();

    if(!isFirstTime) {
      colors.push(color);
    }

    col.style.backgroundColor = color;
    title.textContent = color;

    setTextColor(title, color);
    setTextColor(button, color);
  });

  updateColorHash(colors);
}

function copyClickedText(text) {
  return navigator.clipboard.writeText(text);
}

function setTextColor(text, color) {
  const lum = chroma(color).luminance();
  text.style.color = lum > 0.5 ? 'black' : 'white';
}

function updateColorHash(colors = []) {
  document.location.hash = colors.map(((col) => col.toString().substring(1))).join('-');
}

function getColorsFromHash() {
  if(document.location.hash.length > 1) {
    return document.location.hash
      .substring(1)
      .split('-')
      .map((col) => '#' + col);
  }

  return [];
}

setRandomColors(true);

// function generateRandomColor() {
//   const hex = '0123456789ABCDEF';
//   let color = '';

//   for (let i = 0; i < 6; i++) {
//     color += hex[Math.floor(Math.random() * hex.length)];
//   }
//   return "#" + color;
// }
