setInterval(() => {
  let time = new Date().toLocaleTimeString();
  const timer = document.getElementById("timer");
  timer.textContent = time;
}, 1000);

function display() {
  const data = JSON.parse(localStorage.getItem("tasks")) || [];
  if (data == "" || data == []) {
  }

  const parentElement = document.getElementById("tablebody");

  parentElement.innerHTML = "";

  data.forEach((datas, index) => {
    const row = `
    <tr>
              <td>${datas.task}</td>
              <td>${datas.status}</td>
              <td class="action">
                <button class="ok" onclick=ok(${index})>ok</button><button class="remove" id="remove" onclick=remove(${index})>rm</button>
              </td>
            </tr>
    `;
    parentElement.innerHTML += row;
  });

  statis()
}
display();
function save() {
  console.log("getting input");
  const userinput = document.getElementById("userinput").value;

  if (userinput == "") {
    return;
  }

  console.log("getting input was completed");

  console.log("fetch data from localstorage");
  const data = JSON.parse(localStorage.getItem("tasks")) || [];
  console.log(data);

  console.log("fetching data was completed");

  console.log("append was started");

  data.push({
    task: userinput,
    status: "pending",
  });

  console.log("append was completed");
  console.log("now saving in local storage");

  localStorage.setItem("tasks", JSON.stringify(data));

  console.log("successfully stored in local storage");
  display();
  statis();
}

function remove(index) {
  // fetch input from the local storage
  console.log("fetching input from the local storage");
  const data = JSON.parse(localStorage.getItem("tasks")) || [];
  if (data == "") {
    return;
  }
  console.log("fetching was completed successfully ");
  data.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(data));
  console.log("successfully task was deleted");
  display();
  statis();
}

function filterTask(task) {
  const data = JSON.parse(localStorage.getItem("tasks"));
  const parentElement = document.getElementById("tablebody");
  parentElement.innerHTML = "";
  let filterData = [];
  if (task == "total") {
    filterData = data;
  } else if (task == "pending") {
    filterData = data.filter((items) => items.status == "pending");
  } else if (task == "completed")
    filterData = data.filter((items) => items.status == "completed");

  filterData.forEach((datas, index) => {
    const row = `
      <tr>
              <td>${datas.task}</td>
              <td>${datas.status}</td>
              <td class="action">
                <button class="ok" onclick=ok(${index})>ok</button><button class="remove" id="remove" onclick=remove(${index})>rm</button>
              </td>
            </tr> 
      `;
    parentElement.innerHTML += row;
  });
}

function ok(index) {
  const data = JSON.parse(localStorage.getItem("tasks"));
  const parentElement = document.getElementById("tablebody");
  parentElement.innerHTML = "";
  data[index].status = "completed";
  display();
  console.log(data[index].status);
  localStorage.setItem("tasks", JSON.stringify(data));
  display();
  statis()
}

function statis() {
  const totaltask = localStorage.getItem("tasks");
  console.log(typeof data);
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

