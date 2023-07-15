function highlight(table) {
  let rows = table.rows;

  for (let i = 1; i < rows.length; i++) {
    if (rows[i].cells[3].dataset.available == 'true') {
      rows[i].classList.add('available');
    } else if (rows[i].cells[3].dataset.available == undefined) {
      rows[i].classList.add('unavailable');
      rows[i].hidden = "true";
    } else {
      rows[i].classList.add('unavailable');
    }
  }

  for (let i = 1; i < rows.length; i++) {
    if (rows[i].cells[2].innerHTML == 'm') {
      rows[i].classList.add('male');
    } else {
      rows[i].classList.add('female');
    }
  }

  for (let i = 1; i < rows.length; i++) {
    if (rows[i].cells[1].innerHTML < 18) {
      rows[i].style.textDecoration = "line-through"
    }
  }
}
