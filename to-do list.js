const addTaskBtn = document.querySelector('.add-task-btn');
const taskList = document.querySelector('.task-list');
taskList.innerHTML = '';
addTaskBtn.addEventListener('click', () => {
    const taskTitle = prompt("Enter a new task:");

    if (taskTitle && taskTitle.trim() !== "") {
        const newTaskItem = document.createElement('div');
        newTaskItem.classList.add('task-item');

        newTaskItem.innerHTML = ` <button class="check-btn">✔</button>
            <span class="task-text">${escapeHtml(taskTitle)}</span>
            <span class="task-count">0/1</span>
            <div class="menu-container">
                <button class="task-options">⋮</button>
                <div class="dropdown-menu">
                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn">Delete</button>
                </div>
            </div>
            `
            ;

        taskList.appendChild(newTaskItem);
        attachTaskEvents(newTaskItem);
    }
});

function escapeHtml(text) {
    const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
    return text.replace(/[&<>"']/g, m => map[m]);
}
function attachTaskEvents(taskItem) {
    const checkBtn = taskItem.querySelector('.check-btn');
    const optionsBtn = taskItem.querySelector('.task-options');
    const editBtn = taskItem.querySelector('.edit-btn');
    const deleteBtn = taskItem.querySelector('.delete-btn');
    const menuContainer = taskItem.querySelector('.menu-container');
    const taskTextSpan = taskItem.querySelector('.task-text');
    checkBtn.addEventListener('click', () => {
        checkBtn.classList.toggle('checked');
        taskItem.classList.toggle('completed');
    });
    optionsBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        document.querySelectorAll('.menu-container').forEach(container => {
            if (container !== menuContainer) container.classList.remove('active');
        });

        menuContainer.classList.toggle('active');
    });
    editBtn.addEventListener('click', () => {
        const currentText = taskTextSpan.textContent;
        const newText = prompt("Edit task:", currentText);
        if (newText && newText.trim() !== "") {
            taskTextSpan.textContent = newText;
        }
        menuContainer.classList.remove('active');
    });
    deleteBtn.addEventListener('click', () => {
        taskItem.remove();
    });
}
window.addEventListener('click', () => {
    document.querySelectorAll('.menu-container').forEach(container => {
        container.classList.remove('active');
    });
});
