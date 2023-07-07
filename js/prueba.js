const app = {};

// seleciona un elemento
app.el = function (query, root = document.body) {
  return root.querySelector(query);
};

// seleciona un array de elemento
app.els = function (query, root = document.body) {
  return Array.from(root.querySelectorAll(query));
};

app.create = function (type, classes = "", id = "") {
  const el = document.createElement(type);
  if (classes) {
    const classList = classes.split(" ");
    for (let cls of classList) {
      el.classList.add(cls);
    }
  }
  if (id) {
    el.id = id;
  }
  return el;
};

function random(min, max) {
  const delta = max - min;
  const initialRandom = Math.random();
  const multiplied = initialRandom * delta;
  const floored = Math.floor(multiplied);
  return floored + min;
}

function clearElement(parentId) {
  const parent = document.getElementById(parentId);
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function autocomplete(inputId, dataArray, onSelectItem) {
  const input = document.getElementById(inputId);
  var currentFocus;
  input.addEventListener("input", function (e) {
    const value = this.value;
    closeAllLists();
    if (!value) {
      return false;
    }
    currentFocus = -1;
    const contentList = document.createElement("div");
    contentList.setAttribute("id", this.id + "-autocomplete-list");
    contentList.setAttribute("class", "autocomplete-items");
    this.parentNode.appendChild(contentList);
    dataArray
      .filter(
        (team) =>
          team.name.substr(0, value.length).toUpperCase() == value.toUpperCase()
      )
      .forEach((team) => {
        const itemContent = document.createElement("div");
        itemContent.innerHTML =
          '<img src="/flags/' + team.flag + '" height=25 class="mx-1" />';
        itemContent.innerHTML +=
          "<strong>" + team.name.substr(0, value.length) + "</strong>";
        itemContent.innerHTML += team.name.substr(value.length);
        itemContent.addEventListener("click", function (e) {
          input.value = team.name;
          if (onSelectItem) {
            onSelectItem(team);
          }
          closeAllLists();
        });
        contentList.appendChild(itemContent);
      });
  });
  function closeAllLists(elmnt) {
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != input) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }

  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
}

function drawTable(tableId, data) {
  clearElement(tableId);
  const table = document.getElementById(tableId);
  for (let i = 0; i < data.length; i++) {
    const row = document.createElement("tr");

    row.innerHTML =
      '<td class="text-center" width="45">' +
      '<input type="hidden" name="Matches[' +
      i +
      '].localTeamFlag" value="' +
      data[i].localTeamFlag +
      '">' +
      '<img src="/flags/' +
      data[i].localTeamFlag +
      '" class="mx-1 r-image" /></td>';
    row.innerHTML +=
      '<td class="text-center">' +
      data[i].localTeamName +
      '<input type="hidden" name="Matches[' +
      i +
      '].LocalTeamName" value="' +
      data[i].localTeamName +
      '"></td>';
    row.innerHTML += '<td class="text-center">VS</td>';
    row.innerHTML +=
      '<td class="text-center">' +
      data[i].visitorTeamName +
      '<input type="hidden" name="Matches[' +
      i +
      '].VisitorTeamName" value="' +
      data[i].visitorTeamName +
      '"></td>';
    row.innerHTML +=
      '<td class="text-center" width="45">' +
      '<input type="hidden" name="Matches[' +
      i +
      '].VisitorTeamFlag" value="' +
      data[i].visitorTeamFlag +
      '">' +
      '<img src="/flags/' +
      data[i].visitorTeamFlag +
      '" class="mx-1 r-image" /></td>';

    const td = document.createElement("td");
    td.setAttribute("width", "90px");
    td.className = "text-center";
    const deleteBtn = document.createElement("button");
    deleteBtn.setAttribute("type", "button");
    deleteBtn.setAttribute("data-idx", i);
    deleteBtn.className = "btn btn-outline-danger";
    deleteBtn.textContent = "Eliminar";
    deleteBtn.addEventListener("click", onDeleteMatch);

    td.appendChild(deleteBtn);
    row.appendChild(td);
    table.appendChild(row);
  }
}

function onDeleteMatch() {
  const idx = this.dataset.idx;
  matchesArray.splice(idx, 1);
  drawTable("matchesTable", matchesArray);
  if (matchesArray.length === 0) {
    document.getElementById("btnSave").disabled = true;
  }
}

function myFunction(x) {
  x.classList.toggle("change");
  document.getElementById("mainMenu").classList.toggle("showMenu");
}
