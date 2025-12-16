// js/map.js - Яндекс Карты для сайта украшений

class YandexMap {
    constructor() {
        this.mapElement = document.getElementById('yandex-map');
        
        // Проверяем, есть ли элемент карты на странице
        if (this.mapElement) {
            console.log('Элемент карты найден, инициализируем...');
            this.initMap();
        } else {
            console.log('Элемент карты не найден');
        }
    }
    
    initMap() {
        // Проверяем, загружены ли уже Яндекс Карты
        if (typeof ymaps !== 'undefined') {
            console.log('Yandex Maps API уже загружены');
            this.createMap();
        } else {
            console.log('Загружаем Yandex Maps API...');
            this.loadYandexMaps();
        }
    }
    
    loadYandexMaps() {
        // Создаем скрипт для загрузки Яндекс Карт
        const script = document.createElement('script');
        
        // БЕСПЛАТНЫЙ КЛЮЧ API (для тестирования)
        // Для продакшена получите свой ключ на https://developer.tech.yandex.ru/
        const apiKey = 'ваш-api-ключ'; // Можно оставить пустым для теста
        
        // URL для загрузки Яндекс Карт
        let url = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU';
        
        if (apiKey && apiKey !== 'ваш-api-ключ') {
            url += `&apikey=${apiKey}`;
        }
        
        script.src = url;
        script.async = true;
        
        // Обработчик успешной загрузки
        script.onload = () => {
            console.log('Yandex Maps API успешно загружены');
            this.createMap();
        };
        
        // Обработчик ошибки
        script.onerror = () => {
            console.error('Ошибка загрузки Yandex Maps API');
            this.showStaticMap();
        };
        
        // Добавляем скрипт в head
        document.head.appendChild(script);
    }
    
    createMap() {
        try {
            // Ждем, пока API будет готово
            ymaps.ready(() => {
                console.log('Yandex Maps API готовы, создаем карту...');
                
                // Координаты магазина (Москва, пример)
                const shopCoordinates = [55.7558, 37.6173];
                
                // Создаем карту
                const map = new ymaps.Map('yandex-map', {
                    center: shopCoordinates,
                    zoom: 16,
                    controls: ['zoomControl', 'fullscreenControl']
                });
                
                // Создаем метку магазина
                const shopPlacemark = new ymaps.Placemark(shopCoordinates, {
                    balloonContentHeader: 'Магазин "Бриллиант"',
                    balloonContentBody: `
                        <p><strong>Адрес:</strong> г. Москва, ул. Ювелирная, д. 1</p>
                        <p><strong>Телефон:</strong> +7 (999) 123-45-67</p>
                        <p><strong>Часы работы:</strong> 10:00 - 20:00</p>
                    `,
                    hintContent: 'Магазин украшений "Бриллиант"'
                }, {
                    // Стили метки
                    preset: 'islands#icon',
                    iconColor: '#d4af37'
                });
                
                // Добавляем метку на карту
                map.geoObjects.add(shopPlacemark);
                
                // Открываем балун с информацией
                shopPlacemark.balloon.open();
                
                // Убираем прелоадер
                this.hideLoader();
                
                console.log('Карта успешно создана');
            });
            
        } catch (error) {
            console.error('Ошибка при создании карты:', error);
            this.showStaticMap();
        }
    }
    
    hideLoader() {
        const loader = this.mapElement.querySelector('.map-loader');
        if (loader) {
            loader.style.display = 'none';
        }
    }
    
    showStaticMap() {
        console.log('Показываем статичную карту как запасной вариант');
        
        // Скрываем прелоадер
        this.hideLoader();
        
        // Показываем статичное изображение карты
        this.mapElement.innerHTML = `
            <div class="static-map">
                <img src="https://static-maps.yandex.ru/1.x/?ll=37.6173,55.7558&z=16&l=map&size=600,400&pt=37.6173,55.7558,pm2dbl"
                     alt="Карта магазина Бриллиант в Москве"
                     style="width:100%; height:100%; object-fit:cover;">
                <div class="static-map-overlay">
                    <h3>Магазин "Бриллиант"</h3>
                    <p>г. Москва, ул. Ювелирная, д. 1</p>
                    <p>Нажмите для открытия в Яндекс.Картах</p>
                </div>
                <a href="https://yandex.ru/maps/?pt=37.6173,55.7558&z=16&l=map" 
                   target="_blank" 
                   class="static-map-link"
                   aria-label="Открыть в Яндекс Картах"></a>
            </div>
        `;
    }
}

// Проверяем, что DOM загружен, и инициализируем карту
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM загружен, проверяем наличие карты...');
    
    // Небольшая задержка для надежности
    setTimeout(() => {
        new YandexMap();
    }, 100);
});