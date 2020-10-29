const route = "http://localhost:3000";

$(document).ready(() => {
  const token = localStorage.getItem("token");
  if (token) {
    $("#home").show();
    $("#login").hide();
    $("#register").hide();
    // fetchJokes();
  } else {
    $("#home").hide();
    $("#login").show();
    $("#register").hide();
  }

  $("#logout").on("click", () => {
    logout();
  });
});

function login(e) {
  e.preventDefault();
  const email = $("#logEmail").val();
  const password = $("#logPassword").val();

  console.log(email, password);
  $.ajax({
    method: "POST",
    url: route + "/login",
    data: {
      email,
      password,
    },
  })
    .done((response) => {
      const token = response.access_token;
      localStorage.setItem("token", token);
      $("#home").show();
      $("#login").hide();
      $("#logEmail").val("");
      $("#logPassword").val("");
      // fetchTodos();
    })
    .fail((err) => {
      console.log(err);
    });
}

function toRegister(e) {
  e.preventDefault();
  $("#login").hide();
  $("#home").hide();
  $("#register").show();
}

function toLogin(e) {
  e.preventDefault();
  $("#login").show();
  $("#home").hide();
  $("#register").hide();
}

function register(e) {
  e.preventDefault();
  const email = $("#registerEmail").val();
  const password = $("#registerPassword").val();

  console.log(email, password);
  $.ajax({
    method: "POST",
    url: route + "/register",
    data: {
      email,
      password,
    },
  })
    .done((response) => {
      $("#login").show();
      $("#register").hide();
      $("#home").hide();
      // fetchTodos();
    })
    .fail((err) => {
      console.log(err);
    });
}

function logout() {
  $("#login").show();
  $("#home").hide();
  $("#register").hide();
  localStorage.removeItem("token");
}

// function fetchJokes() {
//   const token = localStorage.getItem("token");
//   $.ajax({
//     method: "GET",
//     url: todo,
//     headers: {
//       token: token,
//     },
//   })
//     .done((response) => {
//       $("#allTodo").empty();
//       const todos = response;
//       todos.forEach((eachTodo, index) => {
//         const d = new Date(eachTodo.due_date);
//         const date = d.getDate();
//         const month = d.getMonth() + 1;
//         const year = d.getFullYear();
//         const fulldate = `${date}/${month}/${year}`;
//         $("#allTodo").append(
//           ` <tr>
//              <th scope="row">${index + 1}</th>
//              <td>${eachTodo.title}</td>
//              <td>${eachTodo.description}</td>
//              <td>${eachTodo.status}</td>
//              <td>${fulldate}</td>
//              <td><button type="button" class="btn btn-outline-dark">Delete</button> - <button type="button" class="btn btn-outline-dark">Edit</button>
//            </tr>`
//         );
//       });
//     })
//     .fail((err) => {
//       console.log(err);
//     });
// }
