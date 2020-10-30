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


  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

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
      // fetchJokes();

      Toast.fire({
        icon: 'success',
        title: `Log in successfully`
      })
    })
    .fail((err) => {
      console.log(err.responseJSON.msg);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.responseJSON.msg
    })
    });
}

function onSignIn(googleUser) {
  // var profile = googleUser.getBasicProfile();
  // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  // console.log('Name: ' + profile.getName());
  // console.log('Image URL: ' + profile.getImageUrl());
  // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  let access_token = googleUser.getAuthResponse().id_token;
  // console.log(access_token)

  //verify di backend

  $.ajax({
      method: "POST",
      url: route + '/googleLogin',
      data: {
          access_token
      }
  })
      .done(res => {
          const access_token = res.access_token
          localStorage.setItem('token', access_token)
          $("#home").show();
          $("#login").hide();
          $("#register").hide();


          // fetchTodo()

          Toast.fire({
            icon: 'success',
            title: 'Log in successfully'
          })

      })
      .fail(err => {
          console.log(err)
      })
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
      // fetchJokes();

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Your account has been registered'
    })
    })
    .fail((err) => {
      console.log(err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.responseJSON.msg
    })
    });
}

function logout() {
  $("#login").show();
  $("#home").hide();
  $("#register").hide();
  localStorage.removeItem("token");
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}

// function fetchJokes() {
//   const token = localStorage.getItem("token");
//   $.ajax({
//     method: "GET",
//     url: route + "/memes",
//     headers: {
//       access_token: token,
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
