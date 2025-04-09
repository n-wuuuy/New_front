const dropzone = document.querySelector('.dropzone');
const container = document.querySelector('.team');

document.querySelectorAll('.draggable').forEach(item => {
    item.originalParent = container; 
    item.addEventListener('dragstart', handleDragStart);
    item.addEventListener('dragend', handleDragEnd); 
});

dropzone.addEventListener('dragover', handleDragOver);
dropzone.addEventListener('drop', handleDrop);

function handleDragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.id);
    e.target.classList.add('dragging');
    e.target.originalParent = e.target.parentElement; 
}

function handleDragOver(e) {
    e.preventDefault();
    e.target.classList.add('dragover');
}

function handleDrop(e) {
    e.preventDefault();
    e.target.classList.remove('dragover');

    if (dropzone.children.length > 0) {
        const existingItem = dropzone.firstElementChild;
        container.appendChild(existingItem); 
    }

    const data = e.dataTransfer.getData('text/plain');
    const newItem = document.getElementById(data);
    dropzone.appendChild(newItem);
    newItem.originalParent = dropzone; 
}

function handleDragEnd(e) {
    e.target.classList.remove('dragging');
    
    if (e.target.originalParent === dropzone && e.target.parentElement !== dropzone) {
        container.appendChild(e.target); 
        e.target.originalParent = container; 
    }
}
