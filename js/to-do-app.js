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
    for (i = 0; i < list.length; i++) {
      item = createListItem(list[i].label);

      console.log(list[i].label);
      ul.appendChild(item);
    }
  }

  function createListItem(label) {
    var li = document.createElement("li"),
      tn = document.createTextNode(label),
      checkBox = document.createElement("input"),
      remove = createDeleteBtn(),
      edit = createEditBtn();

    checkBox.type = "checkbox";
    checkBox.onchange = checkBoxEventHandler;
    li.className = "list-group-item";
    li.appendChild(checkBox);
    li.appendChild(tn);
    li.appendChild(edit);
    li.appendChild(remove);

    return li;
  }

  function createDeleteBtn() {
    var deleteBtn = document.createElement("button");
    deleteBtn.classList.add('remove');
    deleteBtn.className = "fas fa-trash-alt";
    deleteBtn.addEventListener("click", deleteListItem);

    return deleteBtn;
  }

  function createEditBtn() {
    var editBtn = document.createElement("button");
    editBtn.classList.add('edit');
    editBtn.className = "fas fa-pencil-alt";
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


      todosCopy = todos;

    } else {
      var updateListItem = document.getElementById("newToDoInput");
      todos.push(updateListItem);
    }

  }

  function deleteListItem() {
    var listItem = this.parentNode,
      ul = listItem.parentNode,
      flag = myConfirmation(listItem.innerText);

    //Remove the parent list item from the ul.
    if (flag) { ul.removeChild(listItem); }
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
    listItem.innerText.strike();
  }


  function addEventListeners() {
    submitBtn.addEventListener("click", addListItem);

  }

  function init() {
    todosCopy = todos;
    renderList(todosCopy);
    addEventListeners();
  }

  init();

})();