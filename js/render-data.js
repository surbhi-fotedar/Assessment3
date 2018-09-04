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
      { id: 0, label: 'Learn HTML5' }, { id: 1, label: 'Learn CSS3 & Bootstrap' }, { id: 2, label: 'Learn javascript Basic concepts' }, { id: 3, label: 'Learn Javascript Advanced Concepts' }
    ],
    ul = document.getElementById("mylist"),
    li = createListItem();


  ul.appendChild(li);



  function createListItem() {

    var li = document.createElement("li");
    for (i = 0; i < todos.length; i++) {

      var tn = document.createTextNode(todos[i].label),
        checkBox = document.createElement("input");

      checkBox.type = "checkbox";
      li.className = "list-group-item";
      li.appendChild(checkBox);
      li.appendChild(tn);

    }
    return li;


  }


})();