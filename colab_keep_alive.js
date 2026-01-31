function KeepColabAlive() {
    console.log("--- START: Имитация активности для Google Colab ---");

    // Попытка 1: Клик по кнопке подключения (если сессия разорвана)
    try {
        let connectButton = document.querySelector("colab-toolbar-button#connect");
        if (connectButton) {
            connectButton.click();
            console.log("Нажата кнопка переподключения.");
        }
    } catch (e) {
        console.log("Ошибка при клике на connect:", e);
    }

    // Попытка 2: Клик по кнопке "RAM/Disk" (старый способ, иногда работает для активности)
    try {
        let resourceBox = document.querySelector("colab-connect-button");
        if (resourceBox && resourceBox.shadowRoot) {
            // Просто кликаем по элементу внутри теневого DOM, чтобы браузер видел "жизнь"
            let actualButton = resourceBox.shadowRoot.querySelector("#connect");
            if (actualButton) actualButton.click();
        }
    } catch (e) { }

    // Попытка 3: Самый надежный универсальный метод - имитация клика по основному тулбару или ячейке
    // Это предотвращает появление диалога "Вы все еще здесь?"
    try {
        // Клик по элементу заголовка документа, чтобы сбросить таймер бездействия
        document.querySelector("colab-toolbar-button").click();
        console.log("Имитация клика выполнена.");
    } catch (e) {
        // Если ничего не нашли, просто кликаем по body (менее надежно)
        document.body.click();
        console.log("Клик по body.");
    }

    console.log("Активность подтверждена " + new Date().toLocaleTimeString());
}

// Заупскаем каждые 60 секунд
var keepAliveInterval = setInterval(KeepColabAlive, 60000);

console.log("✅ Скрипт 'Keep Alive' запущен!");
console.log("ℹ️ Чтобы остановить, обновите страницу или введите: clearInterval(" + keepAliveInterval + ")");
