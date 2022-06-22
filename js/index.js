
let tasks = [];
const task = document.getElementById('taskText')
const taskAmount = document.getElementById('taskAmount');
const addTask = document.getElementById('addTask');
const editTaskBtn = document.getElementById('editTask')
const taskContainer = document.getElementById('task_container');
const deleteAllBtn = document.getElementById('delete_all_btn');
const totalAmount = document.getElementById('totalAmount');
const errMsg = document.querySelector('.err_msg')
const hiddenId = document.getElementById('taskIdvalue')
const sentMail = document.querySelector('.pdf_btn')


// ************************ DELETE ALL DATA FROM LOCALESTORAGE ************************ //
function deleteAll() {
    localStorage.clear(tasks);
    tasks = [];
    render ();
}
deleteAllBtn.addEventListener('dblclick', deleteAll)

// ************************ GET LOCALESTORAGE ************************ //
function getLocale() {
    let tasksLocale = JSON.parse(localStorage.getItem('tasks'))
    if (tasksLocale) {
       return tasks = tasksLocale
    }else {
        return [];
    }
}
getLocale()

// ************************ SAVE TO LOCALESTORAGE ************************ //
function saveLocale () {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

addTask.addEventListener('click', createTask)

// ************************ CREATE TASK FUNCTION ************************ //
function createTask() {
    const id = uuidv4()
    if(task.value !== '' || taskAmount.value !== ''){
        tasks.push({
            id: id,
            task: task.value,
            taskAmount: taskAmount.value
        })
        saveLocale();
        task.value = ''
        taskAmount.value = ''
        errMsg.textContent = ''
        render ();
     }else {
        
        errMsg.textContent = "Please fill in all fields!"
    }

}
// ************************ CREATE TASK FUNCTION ************************ //
function editTask() {
    const taskIdHidden = hiddenId.outerText;
    const taskFromLocale = getLocale();
    const taskSelected = taskFromLocale.find((task) => {
        return task.id === taskIdHidden;
    })
    taskSelected.task = task.value
    taskSelected.taskAmount = taskAmount.value
    saveLocale()
    task.value = ''
    taskAmount.value = ''
    document.getElementById('editTask').classList.add('hidden')
    render()
}
editTaskBtn.addEventListener('click', editTask)
// ************************ RENDER FUNCTION ************************ //
function render () {
    let taskHtml = '';
    for (let index = 0; index < tasks.length; index++) {
        const item = tasks[index];
        taskHtml += `
        <div class="task_card">
        <p class="task_text">${tasks[index].task}</p>
        <p class="task_amount_card"><span>$ </span> ${tasks[index].taskAmount}</p>
        <span><a id="editItem" class="edit_item" data-id="${tasks[index].id}"><ion-icon name="create-outline"></ion-icon></a></span>
        <span><a id="removeItem" class="remove_item" data-id="${tasks[index].id}"><ion-icon name="trash-outline"></ion-icon></a></span> 
        </div>
        `
    }
    taskContainer.innerHTML = taskHtml;
    editItem();
    removeItem();
    getSum ();
    renderSum ()
    document.getElementById('addTask').classList.remove('hidden');
}
render();
// ************************ EDIT FUNCTION ************************ //
function editItem() {
    // SELECT ALL REMOVE BTN IN NODELIST
    const editItem = document.querySelectorAll('.edit_item');
    // ITERATE ALL BTN IN NODELIST AND ADD EVENTLISTER TO EACH NODE
    for (let i = 0; i < editItem.length; i++) {
        let editBtn = editItem[i];
        // EVENTLISTER TO EACH NODE
        editBtn.addEventListener('click', (e) => {
        //set data id to task id 
        let id = e.currentTarget.dataset.id;
        let taskIndex = tasks.findIndex(task => {
            return task.id === id
        });
        
        if(taskIndex > -1) {
            document.getElementById('editTask').classList.toggle('hidden');
            hiddenId.textContent = tasks[taskIndex].id
            task.value = tasks[taskIndex].task
            taskAmount.value = tasks[taskIndex].taskAmount
            document.getElementById('addTask').classList.toggle('hidden');
        }                   
    })
}
}
// ************************ REMOVE FUNCTION ************************ //
function removeItem() {
        // SELECT ALL REMOVE BTN IN NODELIST
        const removeItem = document.querySelectorAll('.remove_item');
        // ITERATE ALL BTN IN NODELIST AND ADD EVENTLISTER TO EACH NODE
        for (let i = 0; i < removeItem.length; i++) {
            let removeBtn = removeItem[i];
            // EVENTLISTER TO EACH NODE
            removeBtn.addEventListener('click', (e) => {
                //set data id to task id 
                let id = e.currentTarget.dataset.id;
                let taskIndex = tasks.findIndex(task => {
                    
                    return task.id === id
                });

                if(taskIndex > -1) {
                    tasks.splice(taskIndex, 1)
                    saveLocale();
                    render()
                }            
        })
    }
}


function getSum () {
    let taskSum = tasks.reduce((s, x) => s + parseInt(x.taskAmount), 0)
    return taskSum;
}
function renderSum () {
    return totalAmount.innerHTML = `$ ${getSum ()}`
}
sentMail.addEventListener('click', () => {
    document.location =  'mailto:test@test.com'
})


