function loadCSV(url, callback) {
  fetch(url)
    .then(response => response.text())
    .then(text => {
      const rows = text.trim().split('\n');
      const headers = rows[0].split(',').slice(0, 6); // Ensure 6 headers

      const data = rows.slice(1).map(row => {
        const cells = row.split(',');
        return cells.slice(0, 6); // Only take first 6 cells
      });

      const thead = document.querySelector('#honour-table thead');
      const tbody = document.querySelector('#honour-table tbody');

      thead.innerHTML = '<tr>' + headers.map(h => `<th>${h}</th>`).join('') + '</tr>';

      tbody.innerHTML = data
        .map(row =>
          '<tr>' +
          row
            .map(cell => {
              const trimmed = cell.trim();
              const highlight =
                /steve|john|michael|champion|player/i.test(trimmed) ? 'highlight' : '';
              return `<td class="${highlight}">${trimmed}</td>`;
            })
            .join('') +
          '</tr>'
        )
        .join('');

      callback();
    });
}

function startAutoScroll() {
  const container = document.querySelector('.table-wrapper');
  let scrollY = 0;

  function scroll() {
    scrollY += 0.2;
    container.scrollTop = scrollY;
    if (scrollY >= container.scrollHeight - container.clientHeight) {
      scrollY = 0;
    }
    requestAnimationFrame(scroll);
  }

  scroll();
}

loadCSV('data.csv', startAutoScroll);