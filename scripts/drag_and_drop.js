const dropzone = document.querySelector('.dropzone');
const container = document.querySelector('.items-container');
const infoPanel = document.getElementById('infoPanel');
const currentInfo = document.getElementById('current-info');
let draggedItem = null;

document.querySelectorAll('.draggable').forEach(item => {
    item.originalParent = container;
    item.addEventListener('dragstart', handleDragStart);
    item.addEventListener('dragend', handleDragEnd);
});

dropzone.addEventListener('dragover', handleDragOver);
dropzone.addEventListener('dragleave', handleDragLeave);
dropzone.addEventListener('drop', handleDrop);

function handleDragStart(e) {
    draggedItem = e.target;
    e.dataTransfer.setData('text/plain', e.target.id);
    e.target.classList.add('dragging');
    draggedItem.originalParent = e.target.parentElement;
}

function handleDragOver(e) {
    e.preventDefault();
    e.target.classList.add('dragover');
    }

function handleDragLeave(e) {
    e.target.classList.remove('dragover');
}

function handleDrop(e) {
    e.preventDefault();
    e.target.classList.remove('dragover');

    if (dropzone.children.length > 0) {
        const existingItem = dropzone.firstElementChild;
        existingItem.originalParent.appendChild(existingItem);
    }

    const data = e.dataTransfer.getData('text/plain');
    const newItem = document.getElementById(data);
    dropzone.appendChild(newItem);

    updateInfo(newItem);
    }

function handleDragEnd(e) {
    e.target.classList.remove('dragging');
    draggedItem = null;
    }

function updateInfo(item) {
    if (!item) {
        infoPanel.style.display = 'none';
        currentInfo.innerHTML = 'Нет выбранного элемента';
        return;
    }

    const info = item.dataset.info;
    const time = new Date().toLocaleTimeString();
    currentInfo.innerHTML = `
        <strong>${item.textContent}</strong><br>
        <em>${info}</em><br>
        <span class="timestamp">Добавлено: ${time}</span>
        `;
    infoPanel.style.display = 'block';
}