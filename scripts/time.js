// Получаем элементы
const modal = document.getElementById('modal');
const closeBtn = document.querySelector('.close');

// Функция показа модального окна
function showModal() {
    modal.style.opacity = '1'; // Добавляем плавное появление
}

// Функция скрытия модального окна
function hideModal() {
    modal.style.display = 'none';
}

// Обработчик закрытия окна
closeBtn.addEventListener('click', function() {
    hideModal();
    setTimeout(showModal, 60000); // 10 минут
});

// Запускаем при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Проверяем, есть ли элементы в DOM
    if (modal && closeBtn) {
        showModal();
    } else {
        console.error('Элементы модального окна не найдены');
    }
});