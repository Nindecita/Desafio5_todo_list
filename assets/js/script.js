const form = document.getElementById("form");
const input = document.getElementById("input");
const taskList = document.getElementById("taskList");
const totalTasks = document.querySelector(".total-task");
const tasksCompleted = document.querySelector(".tasks-completed");
const label = document.querySelector(".form-label");

let tasks = [
  { id: 1, task: "ir de compras", completed: false },
  { id: 2, task: "hacer ejercicio", completed: false },
  { id: 3, task: "hacer deberes", completed: false },
];

document.addEventListener("DOMContentLoaded", () => {
  initialTasks();
  countTask();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value.trim()) {
    const newTask = {
      id: Date.now(),
      task: input.value.trim(),
      completed: false,
    };
    tasks.push(newTask);

    initialTasks();
    countTask();
    label.innerHTML = "";
  } else {
    label.innerHTML = "Debes ingresar una tarea";
  }
  form.reset();
});

const initialTasks = () => {
  template = "";
  for (const task of tasks) {
    template += createElements(task);
  }
  taskList.innerHTML = template;
};

function createElements(task) {
  return `
    <div
      class="alert ${
        task.completed ? "alert-success" : "alert-warning"
      } d-flex justify-content-between align-items-center"
    >
      <p class="m-0">${task.task}</p>
      <h3 class="m-0">
        <i class="fa-solid fa-circle-check text-success" role="button" onclick="completedTask(${
          task.id
        })"></i>
        <i class="fa-solid fa-circle-minus text-danger" role="button" onclick="deleteTask(${
          task.id
        })"></i>
      </h3>
    </div>
  `;
}

function deleteTask(id) {
  const indexTask = tasks.findIndex((t) => t.id == id);
  tasks.splice(indexTask, 1);
  initialTasks();
  countTask();
}

function completedTask(id) {
  const indexTask = tasks.findIndex((t) => t.id == id);
  tasks[indexTask].completed = tasks[indexTask].completed ? false : true;
  initialTasks();
  countTask();
}

function countTask() {
  totalTasks.innerHTML = `Total de tareas: ${tasks.length}`;

  const totalCompletedTasks = tasks.filter((t) => t.completed == true);
  tasksCompleted.innerHTML = `Tareas realizadas: ${totalCompletedTasks.length}`;
}
