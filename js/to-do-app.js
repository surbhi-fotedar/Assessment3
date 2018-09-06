(function() {

  var todos = [
      { id: 0, label: 'Learn HTML5' },
      { id: 1, label: 'Learn CSS3 & Bootstrap' },
      { id: 2, label: 'Learn javascript Basic concepts' },
      { id: 3, label: 'Learn Javascript Advanced Concepts' }
    ],
    todosCopy,
    ul = document.getElementById("mylist"),
    submitBtn = document.getElementById("submitBtn"),
    todoInput = document.getElementById("newToDoInput"),
    item;
  submitBtn.innerText = 'Save';



  function renderList(list) {
    if (list.length <= 4) {
      for (i = 0; i < list.length; i++) {
        item = createListItem(list[i].label);

        console.log(list[i].label);
        ul.appendChild(item);
        document.getElementById("newToDoInput").value = '';
      }
    } else {
      while (i < list.length) {
        item = createListItem(list[i].label);

        console.log(list[i].label);
        ul.appendChild(item);
        document.getElementById("newToDoInput").value = '';
        i++;
      }
    }

  }

  function createListItem(label) {
    var li = document.createElement("li"),
      tn = document.createTextNode(label),
      chkbox = createChkBox(),
      remove = createDeleteBtn(),
      edit = createEditBtn();
    li.className = "list-group-item";
    li.appendChild(chkbox);
    li.appendChild(tn);
    li.appendChild(edit);
    li.appendChild(remove);

    return li;
  }

  function createChkBox(item) {
    var checkBox = document.createElement("input");
    checkBox.setAttribute("type", "checkbox");
    checkBox.className = "mr-2";
    checkBox.onchange = checkBoxEventHandler;
    return checkBox;
  }

  function createDeleteBtn() {
    var deleteBtn = document.createElement("button");

    deleteBtn.className = "fas fa-trash-alt pull-right btn btn-light";

    deleteBtn.addEventListener("click", deleteListItem);

    return deleteBtn;
  }

  function createEditBtn() {
    var editBtn = document.createElement("button");
    editBtn.className = "fas fa-pencil-alt pull-right btn btn-light";
    editBtn.addEventListener("click", editListItem);
    return editBtn;
  }

  function addListItem() {

    if (submitBtn.innerText == 'Save') {

      var newTodo = {};

      newTodo.id = todos.length;
      newTodo.label = todoInput.value;
      if (/^[a-z\d\-_\s]+$/i.test(newTodo.label)) {
        todos.push(newTodo);
      } else {
        alert("You must write something!");
      }
    } else {
      var updateListItem = document.getElementById("newToDoInput");
      todos.push(updateListItem);
    }

    renderList(todos);

  }

  function deleteListItem() {
    var listItem = this.parentNode,
      ul = listItem.parentNode;
    flag = myConfirmation(listItem.innerText);
    // this.className = "modal";
    //Remove the parent list item from the ul.
    // if (flag) { ul.removeChild(listItem); }
  }

  function myConfirmation(listValue) {

    // var modal = document.getElementById("myModal");
    // modal.style.display = "block";
    if (confirm("Are you sure you want to delete " + listValue)) {
      return true;
    } else {
      return false;
    }

  }

  function editListItem() {
    console.log("Edit Task...");
    var listItem = this.parentNode;
    document.getElementById("newToDoInput").value = listItem.innerText;
    submitBtn.innerText = 'Update';

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