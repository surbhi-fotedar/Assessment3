let todos: { id: number, label: string }[] = [
  { 'id': 0, 'label': 'Learn HTML5' },
  { 'id': 1, 'label': 'Learn CSS3 & Bootstrap' },
  { 'id': 2, 'label': 'Learn javascript Basic concepts' },
  { 'id': 3, 'label': 'Learn Javascript Advanced Concepts' }
],
    listGrp :HTMLElement = document.getElementById('mylist'),
    todoLabel :HTMLElement= document.getElementById('todoLabel'),
    submitBtn :HTMLElement= document.getElementById('submitBtn'),
    todoInput :HTMLElement= document.getElementById('newToDoInput'),
    div = document.createElement('div'),
    i :number,
    updateToDoItem :HTMLElement,
    item :HTMLElement;

    submitBtn.textContent= 'Save';

    function addCSSClass(item :HTMLElement, cName :string) :HTMLElement{
      item.className=cName;
      return item;
    }

     //render final list
  function renderList(list :{id: number, label: string}[]) : void{

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
  function createListItem(label :string) : HTMLElement{
    let listItem = document.createElement('li'),
      tn = document.createTextNode(label),
      chkbox = createChkBox(),
      remove = createDeleteBtn(),
      edit = createEditBtn();
    listItem.className = 'list-group-item';
    listItem.style.cursor = 'pointer';
    listItem.appendChild(chkbox);
    listItem.appendChild(tn);
    listItem.appendChild(edit);
    listItem.appendChild(remove);

    return listItem;
  }

   //Creating CheckBox
   function createChkBox() : HTMLElement{
    let checkBox = document.createElement('input');
    checkBox.setAttribute('type','checkbox');
    checkBox.className = 'mr-2';
    checkBox.onchange = checkBoxEventHandler;
    return checkBox;
  }

     //Checkbox strike through event handler
     function checkBoxEventHandler() :void{
      let listItem :HTMLElement = this.parentNode;

      if (this.checked) {
        listItem.style.textDecoration = 'line-through';
        createAlert('completed ' + listItem.innerText, 'success');
      } else {
        listItem.style.textDecoration = 'none';
        removeAlert();
      }
  
    }

     
    // Adding New List Items
    function addListItem() :void{
      let newTodo ={id:todos.length,label:(<HTMLInputElement>todoInput).value};

      if (newTodo.label == '') {
        alert('You must write something');
      } else if (/^[a-z\d\s]+$/i.test(newTodo.label)) {
        todos.push(newTodo);
        removeListItems();
        renderList(todos);
        createAlert('created <u><strong>' + newTodo.label + '.</strong></u>', 'success');
      } else {
        alert('You must write something valid!');
       }
      (<HTMLInputElement>todoInput).value = '';
      submitBtn.textContent = 'Save';
    }
  

  //Create Delete Button
  function createDeleteBtn() : HTMLElement{
    let deleteBtn = document.createElement('span');
    deleteBtn.className = 'fas fa-trash-alt pull-right mr-2';
    deleteBtn.setAttribute('data-toggle','modal');
    deleteBtn.setAttribute('data-target', '#todoModal');
    deleteBtn.addEventListener('click', deleteListItem);
    return deleteBtn;
  }

   //Deleting List Items
   function deleteListItem() :void{
    let listItem : HTMLElement = this.parentNode,
        modalBody : HTMLElement = document.getElementById('modalBody'),
        modalBodyTxt :string = '<p>Are you sure you want to delete <strong>' + listItem.textContent + '</strong>?</p>';
      
      modalBody.innerHTML=modalBodyTxt;

    //Remove the item from todos.
    document.getElementById('todoYes').addEventListener('click',() =>
    {
      for (let i :number = 0; i < todos.length; i++) {
        if (todos[i].label === listItem.innerText) {
          todos.splice(i, 1);
          console.log(todos);
          removeListItems();
          renderList(todos);
          createAlert('Deleted <u><strong>' + listItem.innerText + '.</strong></u>', 'success');
        }
      }

    }); 
  }

  //Create Edit Button
  function createEditBtn(): HTMLElement {
    let editBtn = document.createElement('span');
    editBtn.className = 'fas fa-pencil-alt pull-right';
    editBtn.addEventListener('click', editListItem);
    return editBtn;
  }

  //Editing List Items
  function editListItem() {

          updateToDoItem = this.parentElement;
          todoLabel.innerText = 'Update to-do item';
          (<HTMLInputElement>todoInput).value = updateToDoItem.textContent;
          // updateToDoItem.className = 'alert-item';
          submitBtn.textContent = 'Update';
      
        }

  function updateListItem() :void {
      
    var updatedToDo = (<HTMLInputElement>todoInput).value;

    for (var i = 0; i < todos.length; i++) {
      if (todos[i].label === updateToDoItem.innerText) {
        todos[i].label = updatedToDo;
        if (todos[i].label === '') {
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
    (<HTMLInputElement>todoInput).value = '';
    submitBtn.innerText = 'Save';
  }

  //Submit button handler function
  function handleSubmitBtn() :void{
    if (submitBtn.textContent == 'Save') {
      addListItem();
    } else {
      updateListItem();
    }
  }   

    function createAlert(msg, type) :void{

      let successTitle : string = '<strong>Well done!</strong> You successfully ',
        dangerTitle : string = '<strong>Something went wrong!</strong> The operation was not successful',
        dismissBtn : string = '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>',
        parent :HTMLCollection = document.getElementsByClassName('container'),
        alertTxt :string,
        cName :string,
        alert :HTMLElement;
  
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

    function removeAlert() :void{
      let alerts :HTMLCollection= document.getElementsByClassName('alert'),
        parent = alerts[0].parentElement;
  
      parent.removeChild(parent.firstChild);
    }

  function addEventListeners() :void{
    submitBtn.addEventListener("click", handleSubmitBtn); // New item adding event Handler

  }

  function init() :void{
    renderList(todos);
    addEventListeners();

  }

  init();