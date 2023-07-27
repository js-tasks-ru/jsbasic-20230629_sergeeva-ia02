/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  elem = document.createElement('table');

  #rows = [];
  #button = '<button>X</button>'

  constructor(rows) {
    this.#rows = rows || this.#rows;

    this.elem = this.#render();
  }
  
  #template() {
    return `
    <thead>
      <tr>
        <th>Имя</th>
        <th>Возраст</th>
        <th>Зарплата</th>
        <th>Город</th>
        <th></th>
      </tr>
    </thead>
    ${this.#rows.map( row => { return `<tr>
      <td>${row.name}</td>
      <td>${row.age}</td>
      <td>${row.salary}</td>
      <td>${row.city}</td>
      <td>${this.#button}</td>
    </tr>`}).join('\n')}
    `
  }

  #render() {
    this.elem.insertAdjacentHTML('afterbegin', this.#template())

    const rows = Array.from(this.elem.rows);

    rows.forEach( ( row, index ) => {

      if (index > 0) {
        const deleteButton = row.querySelector('button');
    
        deleteButton.addEventListener('click', () => {
          row.remove();
        }, {once: true})
      }
    });

    return this.elem;
  }
}
