class WeatherAPIFallback {
    constructor() {
        this.weatherElement = document.getElementById('weather');
        
        if (this.weatherElement) {
            this.getWeather();
        }
    }
    
    async getWeather() {
        try {
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
