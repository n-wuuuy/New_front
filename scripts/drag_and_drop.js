const dropzone = document.querySelector('.dropzone');
const container = document.querySelector('.team');

document.querySelectorAll('.draggable').forEach(item => {
    item.originalParent = container; // Изначально все элементы принадлежат .team
    item.addEventListener('dragstart', handleDragStart);
    item.addEventListener('dragend', handleDragEnd); // Важно добавить dragend
});

dropzone.addEventListener('dragover', handleDragOver);
dropzone.addEventListener('drop', handleDrop);

function handleDragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.id);
    e.target.classList.add('dragging');
    e.target.originalParent = e.target.parentElement; // Фиксируем текущий родитель
}

function handleDragOver(e) {
    e.preventDefault();
    e.target.classList.add('dragover');
}

function handleDrop(e) {
    e.preventDefault();
    e.target.classList.remove('dragover');

    // Если в dropzone уже есть элемент, возвращаем его в .team
    if (dropzone.children.length > 0) {
        const existingItem = dropzone.firstElementChild;
        container.appendChild(existingItem); // Принудительно в .team
    }

    // Добавляем новый элемент в dropzone
    const data = e.dataTransfer.getData('text/plain');
    const newItem = document.getElementById(data);
    dropzone.appendChild(newItem);
    newItem.originalParent = dropzone; // Обновляем родителя
}

function handleDragEnd(e) {
    e.target.classList.remove('dragging');
    
    // Если элемент был взят из dropzone и не попал обратно в неё
    if (e.target.originalParent === dropzone && e.target.parentElement !== dropzone) {
        container.appendChild(e.target); // Возвращаем в .team
        e.target.originalParent = container; // Сбрасываем оригинального родителя
    }
}
