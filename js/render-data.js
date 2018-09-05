(function() {



  // document.getElementById("savebtn").addEventListener("click", function() {
  //   var list = document.getElementById("mylist");
  //   var item = document.createElement("li");
  //   item.className = "list-group-item";
  //   var value = document.getElementById("newToDoInput").value;
  //   item.innerText = value;
  //   var checkBox = document.createElement("input");
  //   checkBox.type = "checkbox";
  //   list.appendChild(checkBox);
  //   list.appendChild(item);


  // });

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
    var newTodo = {};

    newTodo.id = todos.length;
    newTodo.label = todoInput.value;
    todos.push(newTodo);

    todosCopy = todos;

    // renderList(todos);
  }

  function deleteListItem() {
    console.log("Delete Task...");

    var listItem = this.parentNode,
      ul = listItem.parentNode,
      flag = myConfirmation(listItem.innerText);

    //Remove the parent list item from the ul.
    if (flag) { ul.removeChild(listItem); }
  }

  function myConfirmation(listValue) {

    if (confirm("Are you sure you want to delete " + listValue)) {
      return true;
    } else {
      return false;
    }

  }

  function editListItem() {
    console.log("Edit Task...");
    var listItem = this.parentNode;
    todoInput.innerHTML = listItem.innerText;
    var editInput = todoInput.querySelector('.form-control');
    var label = todoInput.querySelector("label");
    var containsClass = listItem.classList.contains("editMode");
    //If class of the parent is .editmode
    if (containsClass) {

      //switch to .editmode
      //label becomes the inputs value.
      label.innerText = editInput.value;
    } else {
      editInput.value = label.innerText;
    }

    //toggle .editmode on the parent.
    listItem.classList.toggle("editMode");
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