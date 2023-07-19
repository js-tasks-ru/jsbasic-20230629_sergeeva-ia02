function toggleText() {
  let button = document.querySelector('.toggle-text-button');
  let text = document.querySelector('#text');
  
  button.addEventListener('click', () => {
    let hidden = text.classList.toggle('hidden');

    if (hidden) {
      text.hidden = true;
    } else {
      text.hidden = false;
    }
  })
}
