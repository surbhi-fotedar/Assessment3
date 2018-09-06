(function() {
  'use strict';

  var todos = [
      { id: 0, label: 'Learn HTML5' },
      { id: 1, label: 'Learn CSS3 & Bootstrap' },
      { id: 2, label: 'Learn javascript Basic concepts' },
      { id: 3, label: 'Learn Javascript Advanced Concepts' }
    ],
    listGrp = document.getElementById("mylist"),
    submitBtn = document.getElementById("submitBtn"),
    todoInput = document.getElementById("newToDoInput"),
    i,
    item;

  submitBtn.innerText = 'Save';

  function renderList(list) {

    if (list.length <= 4) {
      for (i = 0; i < list.length; i++) {
        item = createListItem(list[i].label);
        listGrp.appendChild(item);
        document.getElementById("newToDoInput").value = '';
      }
    } else {
      while (i < list.length) {
        item = createListItem(list[i].label);
        listGrp.appendChild(item);
        document.getElementById("newToDoInput").value = '';
        i++;
      }

    }

  }

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

  function createChkBox() {
    var checkBox = document.createElement("input");
    checkBox.setAttribute("type", "checkbox");
    checkBox.className = "mr-2";
    checkBox.onchange = checkBoxEventHandler;
    return checkBox;
  }

  function createDeleteBtn() {
    var deleteBtn = document.createElement("span");
    deleteBtn.className = "fas fa-trash-alt pull-right mr-2";
    deleteBtn.addEventListener("click", deleteListItem);
    return deleteBtn;
  }

  function createEditBtn() {
    var editBtn = document.createElement("span");
    editBtn.className = "fas fa-pencil-alt pull-right";
    editBtn.addEventListener("click", editListItem);
    return editBtn;
  }

  function addListItem() {
    var newTodo = {};
    newTodo.id = todos.length;
    newTodo.label = todoInput.value;
    if (newTodo.label == '') {
      alert("You must write something");
    } else if (/^[a-z\d\s]+$/i.test(newTodo.label)) {
      todos.push(newTodo);
      renderList(todos);
    } else {
      alert("You must write something valid!");
      document.getElementById("newToDoInput").value = '';
    }

    submitBtn.innerText = 'Save';


  }

  function deleteListItem() {
    var listItem = this.parentNode,
      parent = listItem.parentNode,
      flag = myConfirmation(listItem.innerText);

    //Remove the parent list item from the ul.
    if (flag) { parent.removeChild(listItem); }
  }

  function myConfirmation(listValue) {

    if (confirm("Are you sure you want to delete " + listValue)) {
      return true;
    } else {
      return false;
    }

  }

  function editListItem() {
    var listItem = this.parentNode,
      parent;
    document.getElementById("newToDoInput").value = listItem.innerText;
    submitBtn.innerText = 'Update';
    parent = listItem.parentNode;
    parent.removeChild(listItem);
  }

  function checkBoxEventHandler() {
    var listItem = this.parentNode;
    if (this.checked) {
      listItem.style.textDecoration = "line-through";
    } else {
      listItem.style.textDecoration = "none";
    }

  }


  function addEventListeners() {
    submitBtn.addEventListener("click", addListItem);

  }

  function init() {
    renderList(todos);
    addEventListeners();
  }

  init();

})();