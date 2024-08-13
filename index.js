document.addEventListener("DOMContentLoaded", function() {
    const input = document.getElementById("city-input");
    const button = document.querySelector("button");
    const info = document.querySelector(".info");
  
    button.addEventListener("click", function(event) {
      event.preventDefault();
      
      const cityName = input.value.trim();
      if (!cityName) {
        alert("Please enter a city name.");
        return;
      }
  
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=2d60f525cd75dd81b166855758cb0334`)
        .then(response => {
          if (!response.ok) {
            throw new Error("City not found");
          }
          return response.json();
        })
        .then(data => {
          info.innerHTML = ""; // Clear previous results
  
          const country = data.name;
          const temp = Math.round(data.main.temp - 273.15);
          const windSpeed = data.wind.speed;
          const humidity = data.main.humidity;
  
          const box = document.createElement("div");
          box.className = "weather-box";
  
          const countryEl = document.createElement("h2");
          countryEl.textContent = country;
  
          const tempEl = document.createElement("p");
          tempEl.textContent = `${temp} °C`;
  
          const humEl = document.createElement("li");
          humEl.textContent = `Humidity: ${humidity}%`;
  
          const windSpEl = document.createElement("li");
          windSpEl.textContent = `Wind Speed: ${windSpeed} km/h`;
  
          const list = document.createElement("ul");
          list.appendChild(humEl);
          list.appendChild(windSpEl);
  
          box.appendChild(countryEl);
          box.appendChild(tempEl);
          box.appendChild(list);
  
          info.appendChild(box);

          input.value = "";
        })
        .catch(error => {
          info.innerHTML = `<p class="error">Error: ${error.message}</p>`;
        });
    });
  });
  