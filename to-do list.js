const addTaskBtn = document.querySelector('.add-task-btn');
const taskList = document.querySelector('.task-list');

// تفريغ القائمة عند بدء التشغيل لتكون فارغة تماماً
taskList.innerHTML = '';

// 1. إضافة مهمة جديدة
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

// 2. ربط الأحداث لكل مهمة
function attachTaskEvents(taskItem) {
    const checkBtn = taskItem.querySelector('.check-btn');
    const optionsBtn = taskItem.querySelector('.task-options');
    const editBtn = taskItem.querySelector('.edit-btn');
    const deleteBtn = taskItem.querySelector('.delete-btn');
    const menuContainer = taskItem.querySelector('.menu-container');
    const taskTextSpan = taskItem.querySelector('.task-text');

    // زر الإنجاز
    checkBtn.addEventListener('click', () => {
        checkBtn.classList.toggle('checked');
        taskItem.classList.toggle('completed');
    });

    // زر النقاط الثلاث لفتح/إغلاق القائمة المنسدلة
    optionsBtn.addEventListener('click', (e) => {
        e.stopPropagation();

        // إغلاق أي قوائم مفتوحة أخرى
        document.querySelectorAll('.menu-container').forEach(container => {
            if (container !== menuContainer) container.classList.remove('active');
        });

        menuContainer.classList.toggle('active');
    });

    // زر التعديل (Edit)
    editBtn.addEventListener('click', () => {
        const currentText = taskTextSpan.textContent;
        const newText = prompt("Edit task:", currentText);
        if (newText && newText.trim() !== "") {
            taskTextSpan.textContent = newText;
        }
        menuContainer.classList.remove('active');
    });

    // زر الحذف (Delete)
    deleteBtn.addEventListener('click', () => {
        taskItem.remove();
    });
}

// إغلاق القوائم عند النقر خارجها
window.addEventListener('click', () => {
    document.querySelectorAll('.menu-container').forEach(container => {
        container.classList.remove('active');
    });
});