const user = "http://localhost:3000/users";
const todo = "http://localhost:3000/todos";

$(document).ready(() => {
  const token = localStorage.getItem("token");
  if (token) {
    $("#content").show();
    $("#landing").hide();
    fetchTodos();
  } else {
    $("#content").hide();
    $("#landing").show();
  }

  $("#logout").on("click", () => {
    logout();
  });
});

function login(e) {
  e.preventDefault();
  const email = $("#email").val();
  const password = $("#password").val();

  console.log(email, password);
  $.ajax({
    method: "POST",
    url: user + "/login",
    data: {
      email,
      password,
    },
  })
    .done((response) => {
      const token = response.accessToken;
      localStorage.setItem("token", token);
      $("#content").show();
      $("#landing").hide();
      $("#email").val("");
      $("#password").val("");
      fetchTodos();
    })
    .fail((err) => {
      console.log(err);
    });
}

function logout() {
  $("#landing").show();
  $("#content").hide();
  localStorage.removeItem("token");
}

function fetchTodos() {
  const token = localStorage.getItem("token");
  $.ajax({
    method: "GET",
    url: todo,
    headers: {
      token: token,
    },
  })
    .done((response) => {
      $("#allTodo").empty();
      const todos = response;
      todos.forEach((eachTodo, index) => {
        const d = new Date(eachTodo.due_date);
        const date = d.getDate();
        const month = d.getMonth() + 1;
        const year = d.getFullYear();
        const fulldate = `${date}/${month}/${year}`;
        $("#allTodo").append(
          ` <tr>
             <th scope="row">${index + 1}</th>
             <td>${eachTodo.title}</td>
             <td>${eachTodo.description}</td>
             <td>${eachTodo.status}</td>
             <td>${fulldate}</td>
             <td><button type="button" class="btn btn-outline-dark">Delete</button> - <button type="button" class="btn btn-outline-dark">Edit</button>
           </tr>`
        );
      });
    })
    .fail((err) => {
      console.log(err);
    });
}
