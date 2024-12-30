import { returnTime } from './returnTime.js';
import { sorting } from './sorting.js';

function saveDataLocalStorage(el) {
  localStorage.setItem('recordsNonograms', JSON.stringify(el));
}

export function saveDataInArray(obj) {
  const time = returnTime(obj);

  obj.data.push({
    name: obj.curName,
    level: `${obj.curSize}x${obj.curSize}`,
    time: time,
  });

  if (obj.data.length > 5) {
    obj.data.shift();
  }

  const sortData = sorting(obj.data);
  saveDataLocalStorage(sortData);
  updateTable(obj);
}

export function updateTable(obj) {
  obj.data = JSON.parse(localStorage.getItem('recordsNonograms'))
    ? JSON.parse(localStorage.getItem('recordsNonograms'))
    : [];

  const table = document.querySelector('.table-results');
  table.innerHTML = `
  <caption>records</caption>
        <tr">
          <th>NAME</th>
          <th>LEVEL</th>
          <th>TIME</th>
        </tr>`;
  // console.log(data);
  if (obj.data) {
    obj.data.forEach((el) => {
      const tr = document.createElement('tr');
      const arrayEl = Object.values(el);

      arrayEl.forEach((el) => {
        const td = document.createElement('td');
        td.innerText = el;
        tr.append(td);
      });

      table.append(tr);
    });
  }
}
