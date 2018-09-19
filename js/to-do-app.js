(function() {
  'use strict';

  var todos = [
      { id: 0, label: 'Learn HTML5' },
      { id: 1, label: 'Learn CSS3 & Bootstrap' },
      { id: 2, label: 'Learn javascript Basic concepts' },
      { id: 3, label: 'Learn Javascript Advanced Concepts' }
    ],
    listGrp = document.getElementById('mylist'),
    todoLabel = document.getElementById('todoLabel'),
    submitBtn = document.getElementById('submitBtn'),
    todoInput = document.getElementById('newToDoInput'),
    div = document.createElement('div'),
    i,
    updateToDoItem,
    item;

  submitBtn.innerText = 'Save';

  function addCSSClass(item, cName) {
    item.className = cName;
    return item;
  }

  //render final list
  function renderList(list) {

    for (i = 0; i < list.length; i++) {
      item = createListItem(list[i].label);
      listGrp.appendChild(item);
      document.getElementById("newToDoInput").value = '';
    }

  }


  function removeListItems() {
    while (listGrp.hasChildNodes()) {
      listGrp.removeChild(listGrp.lastChild);
    }
  }

  //creating list Item
  function createListItem(label) {
    var listItem = document.createElement("li"),
      tn = document.createTextNode(label),
      chkbox = createChkBox(),
      remove = createDeleteBtn(),
      edit = createEditBtn();
    listItem.className = "list-group-item";
    listItem.style.cursor = "pointer";
    listItem.appendChild(chkbox);
    listItem.appendChild(tn);
    listItem.appendChild(edit);
    listItem.appendChild(remove);

    return listItem;
  }

  //Creating CheckBox
  function createChkBox() {
    var checkBox = document.createElement("input");
    checkBox.setAttribute("type", "checkbox");
    checkBox.className = "mr-2";
    checkBox.onchange = checkBoxEventHandler;
    return checkBox;
  }

  //Create Delete Button
  function createDeleteBtn() {
    var deleteBtn = document.createElement("span");
    deleteBtn.className = "fas fa-trash-alt pull-right mr-2";
    deleteBtn.addEventListener("click", deleteListItem);
    return deleteBtn;
  }

  //Create Edit Button
  function createEditBtn() {
    var editBtn = document.createElement("span");
    editBtn.className = "fas fa-pencil-alt pull-right";
    editBtn.addEventListener("click", editListItem);
    return editBtn;
  }

  function handleSubmitBtn() {
    if (submitBtn.innerText == 'Save') {
      addListItem();
    } else {
      updateListItem();
    }
  }
  // Adding New List Items
  function addListItem() {
    var newTodo = {};
    newTodo.id = todos.length;
    newTodo.label = todoInput.value;
    if (newTodo.label == '') {
      alert("You must write something");
    } else if (/^[a-z\d\s]+$/i.test(newTodo.label)) {
      todos.push(newTodo);
      removeListItems();
      renderList(todos);
      createAlert('created <u><strong>' + newTodo.label + '.</strong></u>', 'success');
    } else {
      alert("You must write something valid!");
      document.getElementById("newToDoInput").value = '';
    }

    submitBtn.innerText = 'Save';
  }

  function createDeleteModal() {


    //     <div class="modal" tabindex="-1" role="dialog">
    //   <div class="modal-dialog" role="document">
    //     <div class="modal-content">
    //       <div class="modal-header">
    //         <h5 class="modal-title">Modal title</h5>
    //         <button type="button" class="close" data-dismiss="modal" aria-label="Close">
    //           <span aria-hidden="true">&times;</span>
    //         </button>
    //       </div>
    //       <div class="modal-body">
    //         <p>Modal body text goes here.</p>
    //       </div>
    //       <div class="modal-footer">
    //         <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
    //         <button type="button" class="btn btn-primary">Save changes</button>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  }

  function createAlert(msg, type) {

    var successTitle = '<strong>Well done!</strong> You successfully ',
      dangerTitle = '<strong>Something went wrong!</strong> The operation was not successful',
      dismissBtn = '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>',
      parent = document.getElementsByClassName('container'),
      alertTxt,
      cName,
      alert;

    if (type === 'success') {
      cName = 'alert alert-success alert-dismissible fade show';
      alertTxt = successTitle + msg + dismissBtn;
    } else if (type === 'danger') {
      cName = 'alert alert-danger alert-dismissible fade show';
    } else if (type === 'warning') {
      cName = 'alert alert-warning alert-dismissible fade show';
    } else {
      cName = 'alert alert-info alert-dismissible fade show';
    }
    alert = addCSSClass(div, cName);
    alert.setAttribute('role', 'alert');
    alert.innerHTML = alertTxt;

    parent[0].insertBefore(alert, parent[0].firstChild);
  }

  function removeAlert() {
    var alerts = document.getElementsByClassName('alert'),
      parent = alerts[0].parentElement;

    parent.removeChild(parent.firstChild);
  }

  //Deleting List Items
  function deleteListItem() {
    var listItem = this.parentNode,
      flag = myConfirmation(listItem.innerText);

    //Remove the item from todos.
    if (flag) {
      for (var i = 0; i < todos.length; i++) {
        if (todos[i].label == listItem.innerText) {
          todos.splice(i, 1);
          console.log(todos);
          removeListItems();
          renderList(todos);
          createAlert('Deleted <u><strong>' + listItem.innerText + '.</strong></u>', 'success');
        }
      }

    }
  }

  function myConfirmation(listValue) {

    if (confirm("Are you sure you want to delete " + listValue)) {
      return true;
    } else {
      return false;
    }

  }

  function updateListItem() {
    var updatedToDo = todoInput.value;

    for (var i = 0; i < todos.length; i++) {
      if (todos[i].label == updateToDoItem.innerText) {
        todos[i].label = updatedToDo;
        if (todos[i].label == '') {
          alert("You must write something");
        } else if (/^[a-z\d\s]+$/i.test(todos[i].label)) {
          removeListItems();
          renderList(todos);
          createAlert('updated <u><strong>' + updatedToDo + '.</strong></u>', 'success');
        } else {
          alert("You must write something valid!");
        }
      }
    }
    todoLabel.innerText = 'New to-do item';
    todoInput.innerText = '';
    submitBtn.innerText = 'Save';
  }

  //Editing List Items
  function editListItem() {
    updateToDoItem = this.parentElement;
    todoLabel.innerText = 'Update to-do item';
    todoInput.value = updateToDoItem.innerText;
    // updateToDoItem.className = 'alert-item';
    submitBtn.innerText = 'Update';

  }

  //Checkbox strike through event handler
  function checkBoxEventHandler() {
    var listItem = this.parentNode;
    if (this.checked) {
      listItem.style.textDecoration = "line-through";
      createAlert('completed ' + listItem.innerText, 'success');
    } else {
      listItem.style.textDecoration = "none";
      removeAlert();
    }

  }


  function addEventListeners() {
    submitBtn.addEventListener("click", handleSubmitBtn); // New item adding event Handler

  }

  //Initial function call
  function init() {
    renderList(todos);
    //removeList(todos);
    addEventListeners();

  }

  init();

})();