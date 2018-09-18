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
    while (listGrp.children().length > 0) {
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
    listItem.prepend(chkbox);
    listItem.append(remove, edit);

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
    if ($(this).prop('checked') == true) {
      parent.css('text-decoration', 'line-through');
      createAlert('completed <u><strong>' + parent.text() + '.</strong></u>', 'success');
    } else {
      parent.css('text-decoration', 'none');
      removeAlert();
    }

  }

  //Create Edit Button
  function createEditBtn() {
    var editBtn = $('<span></span>');
    editBtn.addClass('fas fa-pencil-alt pull-right');
    editBtn.click(editListItem);
    return editBtn;
  }

  //Update Items
  function editListItem() {
    updateToDoItem = $(this).parent();
    todoLabel.text('Update to-do item');
    todoInput.val(updateToDoItem.text());
    submitBtn.text('Update');

  }

  //Update list items
  function updateListItem() {
    var updatedToDo = todoInput.val();

    for (var i = 0; i < todos.length; i++) {
      if (todos[i].label == updateToDoItem.text()) {
        todos[i].label = updatedToDo;
        if (todos[i].label.trim() == '') {
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
    todoLabel.text('New to-do item');
    todoInput.text('');
    submitBtn.text('Save');
  }
  //Create Delete Button
  function createDeleteBtn() {
    var deleteBtn = $('<span></span>');
    deleteBtn.addClass('fas fa-trash-alt pull-right ml-2');
    deleteBtn.click(deleteListItem);
    return deleteBtn;
  }

  //Deleting List Items
  function deleteListItem() {
    var listItem = $(this).parent(),
      flag = createDeleteModal(listItem.text());

    //Remove the item from todos.
    if (flag) {
      for (var i = 0; i < todos.length; i++) {
        if (todos[i].label === listItem.text()) {
          todos.splice(i, 1);
          console.log(todos);
          removeListItems();
          renderList(todos);
          createAlert('Deleted <u><strong>' + listItem.text() + '.</strong></u>', 'success');
        }
      }

    }
  }

  // function myConfirmation(listValue) {

  //   if (confirm("Are you sure you want to delete " + listValue)) {
  //     return true;
  //   } else {
  //     return false;
  //   }

  // }

  function createDeleteModal(listValue) {

    var modal = addCSSClass(div, 'modal'),
      modalDialog = addCSSClass(div, 'modal-dialog'),
      modalContent = addCSSClass(div, 'modal-content'),
      modalHeader = addCSSClass(div, 'modal-header'),
      modalBody = addCSSClass(div, 'modal-body'),
      modalFooter = addCSSClass(div, 'modal-footer'),
      modalHead = ' <h5 class="modal-title bg-danger text-white">Confirm</h5>',
      closeBtn = '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>',
      modalTitle = modalHead + closeBtn,
      modalPara = '<p>Are you sure you want to delete</p>',
      deleteText = modalPara + listValue + '?',
      secondaryBtn = '<button type="button" class="btn btn-outline-danger btnsize" data-dismiss="modal">No</button>',
      primaryBtn = '<button type="button" class="btn btn-danger btnsize">Yes</button>',
      modalFooterText = secondaryBtn + primaryBtn,
      parent = $('.list-to-do');


    modal.attr('tabindex', '-1');
    modal.attr('role', 'dialog');
    modalDialog.attr('role', 'document');



    modalHeader.append(modalTitle);
    modalContent.append(modalHeader);

    modalBody.append(deleteText);
    modalContent.append(modalBody);

    modalFooter.append(modalFooterText);
    modalContent.append(modalFooter);

    modalDialog.append(modalContent);
    modal.append(modalDialog);

    // $(alert).insertBefore(parent[1]);
    parent.append(modal);


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
    alert.html(alertTxt);

    $(alert).insertBefore(parent[1]);

    //     <div class="alert alert-warning alert-dismissible fade show" role="alert">
    //   <strong>Holy guacamole!</strong> You should check in on some of those fields below.
    //   <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    //     <span aria-hidden="true">&times;</span>
    //   </button>
    // </div>
  }

  function removeAlert() {
    // var alerts = $('.alert'),
    //   parent = $(alerts[0]).parent();

    // $(parent).remove(parent[0]);
    $('.alert').remove();
  }

  // function removeAlert() {
  //   var alerts = document.getElementsByClassName('alert'),
  //     parent = alerts[0].parentElement;

  //   parent.removeChild(parent.firstChild);
  // }

  function handleSubmitBtn() {
    if (submitBtn.text() === 'Save') {
      alert('hello save');
      //addListItem();
    } else {
      //alert('hello');
      updateListItem();
    }
  }

  function addEventListeners() {
    submitBtn.click(handleSubmitBtn); // New item adding event Handler

  }

  //Initial function call
  function init() {
    renderList(todos);
    //removeList(todos);
    addEventListeners();

  }

  init();
})();