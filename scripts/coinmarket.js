async function coinTableApi() {
  try {
    let coinInfo = await fetch("https://api.coinlore.net/api/tickers/");

    if (!coinInfo.ok) {
      throw new Error("Failed to fetch data");
    }

    coinInfo = await coinInfo.json();
    console.log(coinInfo);

    let tbody = document.querySelector('.tbody');

    coinInfo.data.forEach((crypto, index) => {
      let tr = document.createElement('tr');
      let className = `tr${index + 1}`;
      tr.classList.add(className);

      tr.innerHTML = `
        <td class="tr1_rank">${crypto.rank}</td>
        <td class="tr1_name">${crypto.name}</td>
        <td class="tr1_symbol">${crypto.symbol}</td>
        <td class="tr1_1h">${crypto.percent_change_1h}%</td>
        <td class="tr1_24h">${crypto.percent_change_24h}%</td>
        <td class="tr1_7d">${crypto.percent_change_7d}%</td>
        <td class="tr1_price">$${crypto.price_usd}</td>
      `;

      tbody.appendChild(tr);

      applyColorStyle(tr, `.tr1_1h`, parseFloat(crypto.percent_change_1h));
      applyColorStyle(tr, `.tr1_24h`, parseFloat(crypto.percent_change_24h));
      applyColorStyle(tr, `.tr1_7d`, parseFloat(crypto.percent_change_7d));
    });
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
}

function applyColorStyle(element, selector, value) {
  let targetElement = element.querySelector(selector);
  if (targetElement) {
    targetElement.style.color = value < 0 ? "red" : "green";
  }
}

coinTableApi();


function searchCoin() {
  let searchInput, filter, tBodys, trNames, txtValue;

  searchInput = document.getElementById("searchInput");
  filter = searchInput.value.toUpperCase();

  tBodys = document.querySelectorAll(".tbody tr");

  tBodys.forEach((tBody) => {
      trNames = tBody.querySelector(".tr1_name");

      txtValue = trNames.textContent || trNames.innerText;

      if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tBody.style.display = "table-row"; 
      } else {
          tBody.style.display = "none"; 
      }
  });
}

window.onload = searchCoin;

