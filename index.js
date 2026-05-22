setInterval(() => {
  let time = new Date().toLocaleTimeString();

  const timer = document.getElementById("timer");

  timer.textContent = time;
}, 1000);

function display() {
  const data = JSON.parse(localStorage.getItem("tasks")) || [];

  const parentElement = document.getElementById("tablebody");

  parentElement.innerHTML = "";

  data.forEach((datas, index) => {
    const row = `
    
    <tr>

      <td>${datas.task}</td>

      <td>${datas.status}</td>

      <td class="action">

        <button class="ok" onclick="ok(${index})">
          <i class="fa-solid fa-check"></i>
        </button>

        <button class="remove" onclick="remove(${index})">
          <i class="fa-solid fa-xmark"></i>
        </button>

      </td>

    </tr>
    
    `;

    parentElement.innerHTML += row;
  });

  statis();
}

display();

function save() {

  const userinput = document.getElementById("userinput").value;

  if (userinput.trim() === "") {
    return;
  }

  const data = JSON.parse(localStorage.getItem("tasks")) || [];

  data.push({
    task: userinput,
    status: "pending",
  });

  localStorage.setItem("tasks", JSON.stringify(data));

  document.getElementById("userinput").value = "";

  display();
}

function remove(index) {

  const data = JSON.parse(localStorage.getItem("tasks")) || [];

  data.splice(index, 1);

  localStorage.setItem("tasks", JSON.stringify(data));

  display();
}

function filterTask(task) {

  const data = JSON.parse(localStorage.getItem("tasks")) || [];

  const parentElement = document.getElementById("tablebody");

  parentElement.innerHTML = "";

  let filterData = [];

  if (task == "total") {

    filterData = data;

  } else if (task == "pending") {

    filterData = data.filter(
      (items) => items.status == "pending"
    );

  } else if (task == "completed") {

    filterData = data.filter(
      (items) => items.status == "completed"
    );
  }

  filterData.forEach((datas, index) => {

    const row = `
    
    <tr>

      <td>${datas.task}</td>

      <td>${datas.status}</td>

      <td class="action">

        <button class="ok" onclick="ok(${index})">
          <i class="fa-solid fa-check"></i>
        </button>

        <button class="remove" onclick="remove(${index})">
          <i class="fa-solid fa-xmark"></i>
        </button>

      </td>

    </tr>
    
    `;

    parentElement.innerHTML += row;
  });
}

function ok(index) {

  const data = JSON.parse(localStorage.getItem("tasks")) || [];

  data[index].status = "completed";

  localStorage.setItem("tasks", JSON.stringify(data));

  display();
}

function statis() {

  const totaltask = localStorage.getItem("tasks");

  if (!totaltask) {
    return;
  }

  let count = JSON.parse(totaltask);

  let totalcount = count.length;

  let pending = 0;

  let completed = 0;

  for (let index = 0; index < count.length; index++) {

    if (count[index].status === "completed") {

      completed++;

    } else {

      pending++;
    }
  }

  document.getElementById("total").innerText = totalcount;

  document.getElementById("pending").innerText = pending;

  document.getElementById("completed").innerText = completed;
}