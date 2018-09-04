(function() {
  var data = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')) : {
    todo: [],
    completed: []
  };


  renderTodoList();
  // Create a "close" button and append it to each list item
  // var myNodelist = document.getElementsByTagName("li");
  // var i;
  // for (i = 0; i < myNodelist.length; i++) {

  //   var span = document.createElement("SPAN");
  //   var txt = document.createTextNode("\u00D7");
  //   span.className = "pencil-alt";
  //   span.appendChild(txt);
  //   myNodelist[i].appendChild(span);
  // }

  // var list = document.querySelector('ul');
  // list.addEventListener('click', function(ev) {
  //   if (ev.target.tagName === 'LI') {
  //     ev.target.classList.toggle('checked');
  //   }
  // }, false);

  document.getElementById("savebtn").addEventListener("click", addList);

  function addList() {


    var inputValue = document.getElementById("newToDoInput").value;
    // var checkBox = document.createElement("input");
    // var t = document.createTextNode(inputValue);
    // li.appendChild(t);
    if (inputValue === '') {
      alert("You must write something!");
    } else {
      // checkBox.type = "checkbox";
      // li.appendChild(checkBox);
      addItem(inputValue);
      // document.getElementById("mylist").appendChild(li);



    }


    // var span = document.createElement("SPAN");
    // var txt = document.createTextNode("\u00D7");
    // span.className = "close";
    // span.appendChild(txt);
    // li.appendChild(span);

    // for (i = 0; i < close.length; i++) {
    //   close[i].onclick = function() {
    //     var div = this.parentElement;
    //     div.style.display = "none";
    //   }
    // }


  }

  function addItem(inputValue) {
    addItemToDOM(inputValue);
    document.getElementById("newToDoInput").value = "";

    data.todo.push(inputValue);
    dataObjectUpdated();
  }

  function renderTodoList() {
    if (!data.todo.length && !data.completed.length) return;

    for (var i = 0; i < data.todo.length; i++) {
      var value = data.todo[i];
      addItemToDOM(value);
    }

    for (var j = 0; j < data.completed.length; j++) {
      var value = data.todo[i];
      addItemToDOM(value, true);
    }


  }

  function dataObjectUpdated() {
    localStorage.setItem('todoList', JSON.stringify(data));
  }

  function editItem() {

    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");


    var listItem = this.parentNode.parentNode;

    var editInput = listItem.querySelector('input[type=text]');
    var label = listItem.querySelector("label");
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

  function removeItem() {
    var item = this.parentNode.parentNode;
    var parent = item.parentNode;
    var id = parent.id;
    var value = item.innerText;

    if (id === 'mylist') {
      data.todo.splice(data.todo.indexOf(value), 1);
    } else {
      data.completed.splice(data.completed.indexOf(value), 1);
    }
    dataObjectUpdated();

    parent.removeChild(item);
  }

  // function completeItem() {
  //   var item = this.parentNode.parentNode;
  //   var parent = item.parentNode;
  //   var id = parent.id;
  //   var value = item.innerText;

  //   if (id === 'mylist') {
  //     data.todo.splice(data.todo.indexOf(value), 1);
  //     data.completed.push(value);
  //   } else {
  //     data.completed.splice(data.completed.indexOf(value), 1);
  //     data.todo.push(value);
  //   }
  //   dataObjectUpdated();

  //   // Check if the item should be added to the completed list or to re-added to the todo list
  //   var target = (id === 'mylist') ? document.getElementById('completed') : document.getElementById('mylist');

  //   parent.removeChild(item);
  //   target.insertBefore(item, target.childNodes[0]);
  // }
  // Adds a new item to the todo list
  function addItemToDOM(text, completed) {
    var list = (completed) ? document.getElementById('completed') : document.getElementById('mylist');

    var item = document.createElement('li');
    item.className = "list-group-item";
    item.innerText = text;

    var buttons = document.createElement('div');

    buttons.classList.add('buttons');

    var remove = document.createElement('button');
    remove.classList.add('remove');
    remove.className = "fas fa-trash-alt";

    // Add click event for removing the item
    remove.addEventListener('click', removeItem);

    var edit = document.createElement('button');
    edit.classList.add('complete');
    edit.className = "fas fa-pencil-alt";

    // Add click event for completing the item
    edit.addEventListener('click', editItem);

    buttons.appendChild(remove);
    buttons.appendChild(edit);
    item.appendChild(buttons);

    list.insertBefore(item, list.childNodes[0]);
  }
})();