window.addEventListener("scroll", function(){   //ჰედერის ფერების გადაცვლა
  const header = document.querySelector("header")
  header.classList.toggle("sticky", window.scrollY > 0)
  
})
let burger = document.querySelector(".burger");
let mark = document.querySelector(".fa-xmark");
let mobileMenu = document.querySelector(".menu");
let cardDivs = document.querySelectorAll(".card_div"); 
let aboutText = document.querySelector(".about_txt");

burger.addEventListener("click", () => {
  burger.style.display = "none";
  mark.style.display = "block";
  mobileMenu.classList.add("show");

  cardDivs.forEach((cardDiv) => {       //აქ დამჭირდა იტერირება რადგან მაქ 2 card_div htmlში
    cardDiv.classList.add("hide-card");
  });

  aboutText.classList.add("hide-card");
});

mark.addEventListener("click", () => {
  burger.style.display = "block";
  mark.style.display = "none";
  mobileMenu.classList.remove("show");

  cardDivs.forEach((cardDiv) => {       //აქ დამჭირდა იტერირება რადგან მაქ 2 card_div htmlში
    cardDiv.classList.remove("hide-card");
  });

  aboutText.classList.remove("hide-card");
});


let converterP = document.querySelector(".Converter_p")
let market = document.querySelector(".market")
let ConverterDiv = document.querySelector(".ConverterDiv")
converterP.addEventListener("click", () => {
market.style.display = "none"
ConverterDiv.style.display ="block"
} )

let backToMarket = document.querySelector(".backToMarket")
backToMarket.addEventListener("click", () => {
  ConverterDiv.style.display = "none"
  market.style.display = "block"
})
















// let slidesContainer = document.querySelector(".slider ") // სლაიდერის გაკეთება
// let slides = slidesContainer.getElementsByTagName("img")

// function nextSlide () {    // სლაიდერი
//   let activeSlide = document.querySelector (".slider .active")
//   activeSlide.classList.remove ("active")
// if (activeSlide.nextElementSibling) {
//   activeSlide.nextElementSibling.classList.add ("active")
// }
// else {
//   slides[0].classList.add ("active")
// }
// }

// function prevSlide () {   // სლაიდერი
//   let activeSlide = document.querySelector (".slider .active")
//   activeSlide.classList.remove ("active")
// if (activeSlide.previousElementSibling) {
//   activeSlide.previousElementSibling.classList.add ("active")
// }
// else {
//   slides[slides.length - 1].classList.add ("active")
// }
// }


// function sliderAutoPlay () {  //სლაიდერი აუტოპლეიზე
// setInterval(() => {
//   nextSlide ()
// }, 15000);

// }

// sliderAutoPlay()




function resolveWeatherInfo() {  //ამინდის API
  const result = document.getElementById("result")
  const cityInput = document.getElementById("city")
  const city = cityInput.value
const cityCapitalized = city.charAt(0).toUpperCase() + city.slice(1)


  fetch(`https://geocode.maps.co/search?q=${cityCapitalized}`, {
    method: "GET"
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("City not found. Please write the city name correctly.")
            }
      return response.json()
    })
    .then((cityInfo) => {
      let longitude = cityInfo[0].lon
      let latitude = cityInfo[0].lat
      // console.log(longitude, latitude)

      fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`, {
        method: "GET"
      })
        .then((response) => response.json())
        .then((weather) => {
          console.log(weather)
          let temperature = weather.current_weather.temperature
          let weatherCode = weather.current_weather.weathercode
          let windSpeed = weather.current_weather.windspeed
          console.log(temperature,weatherCode)
        

          if (weatherCode < 3) {
            result.innerHTML = `<p>In ${cityCapitalized} temperature is ${temperature}°C</p>
            <p>Weather: <i class="fa-solid fa-sun"></i></p>
            <span>Windspeed: ${windSpeed} km/h</span>`;
          } else if (weatherCode >= 3 && weatherCode < 50) {
            result.innerHTML = `<p>In ${cityCapitalized} temperature is ${temperature}°C</p>
            <p>Weather: <i class="fa-solid fa-cloud"></i></p>
            <span>Windspeed: ${windSpeed} km/h</span>`;
          } else if (weatherCode >= 50 && weatherCode < 70) {
            result.innerHTML = `<p>In ${cityCapitalized} temperature is ${temperature}°C</p>
            <p>Weather: <i class="fa-solid fa-cloud-rain"></i></p>
            <span>Windspeed: ${windSpeed} km/h</span>  

`;
          } else if (weatherCode >= 70 && weatherCode < 95) {
            result.innerHTML = `<p>In ${cityCapitalized} temperature is ${temperature}°C</p>
            <p>Weather: <i class="fa-solid fa-snowflake"></i></p>
            <span>Windspeed: ${windSpeed} km/h</span>`;
          } else if (weatherCode >= 95 && weatherCode < 100) {
            result.innerHTML = `<p>In ${cityCapitalized} temperature is ${temperature}°C</p>
            <p>Weather: <i class="fa-solid fa-bolt-lightning"></i></p>
            <span>Windspeed: ${windSpeed} km/h</span>`;
          } else {
            result.innerHTML = `<p>In ${cityCapitalized} temperature is ${temperature}°C</p>
            <span>Windspeed: ${windSpeed} km/h</span>`;
          }
          
            
        })
    })
    .catch((error) => {
      console.error(error.message);
      result.innerHTML = `<p>${error.message}</p>`
    });
}

async function coinDataFetcher() {  //Crypto Converter
  let cryptoInfo = await fetch("https://api.coincap.io/v2/assets");
  cryptoInfo = await cryptoInfo.json();

  console.log(cryptoInfo);
  let select1 = document.getElementById("select1");
  let select2 = document.getElementById("select2");

  cryptoInfo.data.forEach(crypto => {
    let option1 = document.createElement("option");
    let option2 = document.createElement("option");

    option1.text = crypto.name;
    option1.value = crypto.priceUsd;

    option2.text = crypto.name;
    option2.value = crypto.priceUsd;

    select1.add(option1);
    select2.add(option2);

})
}

coinDataFetcher()

function converter() {
let result = document.getElementById("result");

let fromCrypto = document.getElementById("select1").value;

let toCrypto = document.getElementById("select2").value;

let amount = document.getElementById("amount").value;

let converted = amount * (fromCrypto / toCrypto);

result.innerHTML = converted;
}

function swapCurrencies() {
let select1 = document.getElementById("select1");
let select2 = document.getElementById("select2");

let temp = select1.value;
select1.value = select2.value;
select2.value = temp;
}


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

