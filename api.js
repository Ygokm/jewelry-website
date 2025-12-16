class WeatherAPI {
    constructor() {
        this.apiKey = 'ваш_ключ_api'; // Замените на ваш ключ
        this.weatherElement = document.getElementById('weather');
        
        if (this.weatherElement) {
            this.getWeather();
        }
    }
    
    async getWeather() {
        try {
            // Используем публичное API погоды (пример с OpenWeatherMap)
            // Для работы нужно получить бесплатный ключ на https://openweathermap.org/api
            const city = 'Moscow';
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}&units=metric&lang=ru`
            );
            
            if (!response.ok) {
                throw new Error('Ошибка получения данных');
            }
            
            const data = await response.json();
            this.displayWeather(data);
            
        } catch (error) {
            console.error('Ошибка:', error);
            this.displayWeatherError();
        }
    }
    
    displayWeather(data) {
        const temperature = Math.round(data.main.temp);
        const description = data.weather[0].description;
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;
        
        this.weatherElement.innerHTML = `
            <h3>Погода в Москве</h3>
            <p><strong>Температура:</strong> ${temperature}°C</p>
            <p><strong>Описание:</strong> ${description}</p>
            <p><strong>Влажность:</strong> ${humidity}%</p>
            <p><strong>Ветер:</strong> ${windSpeed} м/с</p>
        `;
    }
    
    displayWeatherError() {
        this.weatherElement.innerHTML = `
            <p>Не удалось загрузить данные о погоде.</p>
            <p>Примерные данные для Москвы:</p>
            <p><strong>Температура:</strong> +15°C</p>
            <p><strong>Описание:</strong> солнечно</p>
            <p>Отличная погода для прогулок!</p>
        `;
    }
}

// Альтернативный вариант с бесплатным API (без ключа)
class WeatherAPIFallback {
    constructor() {
        this.weatherElement = document.getElementById('weather');
        
        if (this.weatherElement) {
            this.getWeather();
        }
    }
    
    async getWeather() {
        try {
            // Используем бесплатное API (пример)
            const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=55.7558&longitude=37.6173&current_weather=true');
            
            if (!response.ok) {
                throw new Error('Ошибка получения данных');
            }
            
            const data = await response.json();
            this.displayWeather(data);
            
        } catch (error) {
            console.error('Ошибка:', error);
            this.displayMockWeather();
        }
    }
    
    displayWeather(data) {
        const temp = data.current_weather.temperature;
        const wind = data.current_weather.windspeed;
        
        this.weatherElement.innerHTML = `
            <h3>Погода в Москве сейчас</h3>
            <p><strong>Температура:</strong> ${temp}°C</p>
            <p><strong>Скорость ветра:</strong> ${wind} км/ч</p>
            <p>${this.getWeatherMessage(temp)}</p>
        `;
    }
    
    displayMockWeather() {
        // Заглушка с примерными данными
        this.weatherElement.innerHTML = `
            <h3>Погода в Москве</h3>
            <p><strong>Температура:</strong> +18°C</p>
            <p><strong>Состояние:</strong> Солнечно</p>
            <p><strong>Влажность:</strong> 65%</p>
            <p>Идеальная погода для покупки украшений!</p>
        `;
    }
    
    getWeatherMessage(temp) {
        if (temp > 20) {
            return "Отличная погода для прогулок!";
        } else if (temp > 10) {
            return "Приятная погода, можно надеть любимые украшения!";
        } else {
            return "Прохладно, но украшения согреют душу!";
        }
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    // Используем второй вариант API, так как он не требует ключа
    new WeatherAPIFallback();
});