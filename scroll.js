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
          row.map(cell => `<td>${cell.trim()}</td>`).join('') +
          '</tr>'
        )
        .join('');

      callback();
    });
}

function startAutoScroll() {
  const container = document.querySelector('.table-wrapper');
  let scrollY = 0;
  let isPaused = false;
  let pauseTimeout;

  function scroll() {
    if (!isPaused) {
      scrollY += 0.2;
      container.scrollTop = scrollY;
      if (scrollY >= container.scrollHeight - container.clientHeight) {
        scrollY = 0;
      }
    }
    requestAnimationFrame(scroll);
  }

  // Pause auto-scroll when user interacts
  container.addEventListener('wheel', () => {
    isPaused = true;
    clearTimeout(pauseTimeout);
    pauseTimeout = setTimeout(() => {
      scrollY = container.scrollTop;
      isPaused = false;
    }, 3000);
  });

  scroll();
}

loadCSV('data.csv', startAutoScroll);
