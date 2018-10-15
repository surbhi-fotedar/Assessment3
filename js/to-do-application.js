var todos = [
    { 'id': 0, 'label': 'Learn HTML5' },
    { 'id': 1, 'label': 'Learn CSS3 & Bootstrap' },
    { 'id': 2, 'label': 'Learn javascript Basic concepts' },
    { 'id': 3, 'label': 'Learn Javascript Advanced Concepts' }
], listGrp = document.getElementById('mylist'), todoLabel = document.getElementById('todoLabel'), submitBtn = document.getElementById('submitBtn'), todoInput = document.getElementById('newToDoInput'), div = document.createElement('div'), i, updateToDoItem, item;
submitBtn.textContent = 'Save';
function addCSSClass(item, cName) {
    item.classList.add(cName);
    return item;
}
//render final list
function renderList(list) {
    for (i = 0; i < list.length; i++) {
        item = createListItem(list[i].label);
        listGrp.appendChild(item);
        document.getElementById('newToDoInput').textContent = '';
    }
}
function removeListItems() {
    while (listGrp.hasChildNodes()) {
        listGrp.removeChild(listGrp.lastChild);
    }
}
//creating list Item
function createListItem(label) {
    var listItem = document.createElement('li'), tn = document.createTextNode(label), chkbox = createChkBox(), remove = createDeleteBtn(), edit = createEditBtn();
    listItem.className = 'list-group-item';
    listItem.style.cursor = 'pointer';
    listItem.appendChild(chkbox);
    listItem.appendChild(tn);
    listItem.appendChild(edit);
    listItem.appendChild(remove);
    return listItem;
}
//Creating CheckBox
function createChkBox() {
    var checkBox = document.createElement('input');
    checkBox.setAttribute('type', 'checkbox');
    checkBox.className = 'mr-2';
    //checkBox.onchange = checkBoxEventHandler;
    return checkBox;
}
//Create Delete Button
function createDeleteBtn() {
    var deleteBtn = document.createElement('span');
    deleteBtn.className = 'fas fa-trash-alt pull-right mr-2';
    deleteBtn.addEventListener('click', deleteListItem);
    return deleteBtn;
}
//Create Edit Button
function createEditBtn() {
    var editBtn = document.createElement('span');
    editBtn.className = 'fas fa-pencil-alt pull-right';
    editBtn.addEventListener('click', editListItem);
    return editBtn;
}
function handleSubmitBtn() {
    if (submitBtn.textContent == 'Save') {
        alert('save');
        //addListItem();
    }
    else {
        alert('update');
        //updateListItem();
    }
}
//Deleting List Items
function deleteListItem() {
    alert('delete item!!');
    // var listItem = this.parentNode,
    //   flag = myConfirmation(listItem.innerText);
    // //Remove the item from todos.
    // if (flag) {
    //   for (var i = 0; i < todos.length; i++) {
    //     if (todos[i].label == listItem.innerText) {
    //       todos.splice(i, 1);
    //       console.log(todos);
    //       removeListItems();
    //       renderList(todos);
    //       createAlert('Deleted <u><strong>' + listItem.innerText + '.</strong></u>', 'success');
    //     }
    //   }
    // }
}
function updateListItem() {
    alert('update item');
    // var updatedToDo = todoInput.value;
    // for (var i = 0; i < todos.length; i++) {
    //   if (todos[i].label == updateToDoItem.innerText) {
    //     todos[i].label = updatedToDo;
    //     if (todos[i].label == '') {
    //       alert("You must write something");
    //     } else if (/^[a-z\d\s]+$/i.test(todos[i].label)) {
    //       removeListItems();
    //       renderList(todos);
    //       createAlert('updated <u><strong>' + updatedToDo + '.</strong></u>', 'success');
    //     } else {
    //       alert("You must write something valid!");
    //     }
    //   }
    // }
    // todoLabel.innerText = 'New to-do item';
    // todoInput.innerText = '';
    // submitBtn.innerText = 'Save';
}
//Editing List Items
function editListItem() {
    alert('edit list item');
    // updateToDoItem = this.parentElement;
    // todoLabel.innerText = 'Update to-do item';
    // todoInput.value = updateToDoItem.innerText;
    // // updateToDoItem.className = 'alert-item';
    // submitBtn.innerText = 'Update';
}
function addEventListeners() {
    submitBtn.addEventListener("click", handleSubmitBtn); // New item adding event Handler
}
function init() {
    renderList(todos);
    //removeList(todos);
    addEventListeners();
}
init();
