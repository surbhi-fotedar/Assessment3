(function() {
  'use strict';

  var todos = [
      { id: 0, label: 'Learn HTML5' },
      { id: 1, label: 'Learn CSS3 & Bootstrap' },
      { id: 2, label: 'Learn javascript Basic concepts' },
      { id: 3, label: 'Learn Javascript Advanced Concepts' }
    ],
    listGrp = $('#mylist'),
    todoLabel = $('#todoLabel'),
    submitBtn = $('#submitBtn'),
    todoInput = $('#newToDoInput'),
    div = $('<div></div>'),
    i,
    updateToDoItem,
    item;

  submitBtn.text('Save');

  function addCSSClass(item, cName) {
    item.addClass(cName);
    return item;
  }

  //render final list
  function renderList(list) {

    for (i = 0; i < list.length; i++) {
      item = createListItem(list[i].label);
      listGrp.append(item);
      $("#newToDoInput").val('');
    }

  }

  function removeListItems() {
    while (listGrp.find(children())) {
      listGrp.empty();
    }
  }

  //creating list Item
  function createListItem(label) {
    var listItem = $('<li></li>').text(label),
      chkbox = createChkBox(),
      remove = createDeleteBtn(),
      edit = createEditBtn();
    listItem.addClass('list-group-item');
    listItem.css('cursor', 'pointer');
    //listItem.style.cursor = "pointer";
    listItem.prepend(chkbox);
    listItem.append(remove, edit);
    //listItem.appendChild(chkbox);
    // listItem.appendChild(tn);
    // listItem.appendChild(edit);
    // listItem.appendChild(remove);

    return listItem;
  }

  //Creating CheckBox
  function createChkBox() {
    var checkBox = $('<input></input>');
    checkBox.attr('type', 'checkbox');
    checkBox.addClass('mr-2');
    checkBox.click(checkBoxEventHandler);
    return checkBox;
  }

  //checkbox event handler
  function checkBoxEventHandler() {
    var parent = $(this).parent();
    if ($(this).checked) {
      parent.css('text-decoration', 'line-through');
      createAlert('completed ' + parent.innerText, 'success');
    } else {
      parent.css('text-decoration', 'none');
      //removeAlert();
    }

  }

  //Create Edit Button
  function createEditBtn() {
    var editBtn = $('<span></span>');
    editBtn.addClass('fas fa-pencil-alt pull-right');
    editBtn.click(editListItem());
    return editBtn;
  }

  //Editing List Items
  function editListItem() {
    // updateToDoItem = this.parentElement;
    // todoLabel.innerText = 'Update to-do item';
    // todoInput.value = updateToDoItem.innerText;
    // // updateToDoItem.className = 'alert-item';
    // submitBtn.innerText = 'Update';

  }
  //Create Delete Button
  function createDeleteBtn() {
    var deleteBtn = $('<span></span>');
    deleteBtn.addClass('fas fa-trash-alt pull-right ml-2');
    deleteBtn.click(deleteListItem());
    return deleteBtn;
  }

  //Deleting List Items
  function deleteListItem() {
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

  function createAlert(msg, type) {
    var successTitle = '<strong>Well done!</strong> You successfully ',
      dangerTitle = '<strong>Something went wrong!</strong> The operation was not successful',
      dismissBtn = '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>',
      parent = $('.container'),
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
    alert.attr('role', 'alert');
    alert.val(alertTxt);

    parent.children('parent[0].first').before(alert);
    //parent[0].insertBefore(alert, parent[0].firstChild);
  }



  function handleSubmitBtn() {
    if (submitBtn.text('Save')) {
      alert('hello save');
      //addListItem();
    } else {
      alert('hello');
      //updateListItem();
    }
  }

  function addEventListeners() {
    submitBtn.click(handleSubmitBtn()); // New item adding event Handler

  }

  //Initial function call
  function init() {
    renderList(todos);
    //removeList(todos);
    addEventListeners();

  }

  init();
})();