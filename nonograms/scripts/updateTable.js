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
