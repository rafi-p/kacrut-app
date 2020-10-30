const route = "http://localhost:3000";
let deliv;

$(document).ready(() => {
  const token = localStorage.getItem("token");

  if (token) {
    $("#home").show();
    $("#login").hide();
    $("#register").hide();
    $("#listFavourite").hide();
    fetchMemes();
  } else {
    $("#home").hide();
    $("#login").show();
    $("#register").hide();
    $("#listFavourite").hide();
  }

  $("#logout").on("click", function () {
    logout();
  });
});

function login(e) {
  e.preventDefault();
  const email = $("#logEmail").val();
  const password = $("#logPassword").val();

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

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
      const userId = response.userId;
      localStorage.setItem("token", token);
      localStorage.setItem("UserId", userId);
      $("#home").show();
      $("#login").hide();
      $("#logEmail").val("");
      $("#logPassword").val("");
      fetchMemes();

      // fetchJokes();
      Toast.fire({
        icon: "success",
        title: `Log in successfully`,
      });
    })
    .fail((err) => {
      console.log(err.responseJSON.msg);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.responseJSON.msg,
      });
    });
}

function onSignIn(googleUser) {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  let access_token = googleUser.getAuthResponse().id_token;
  // console.log(access_token)

  //verify di backend

  $.ajax({
    method: "POST",
    url: route + "/googleLogin",
    data: {
      access_token,
    },
  })
    .done((res) => {
      const access_token = res.access_token;
      localStorage.setItem("token", access_token);
      $("#home").show();
      $("#login").hide();
      $("#register").hide();

      // fetchTodo()

      Toast.fire({
        icon: "success",
        title: "Log in successfully",
      });
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
      // fetchJokes();

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Your account has been registered",
      });
    })
    .fail((err) => {
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.responseJSON.msg,
      });
    });
}

function logout() {
  $("#login").show();
  $("#home").hide();
  $("#register").hide();
  localStorage.removeItem("token");
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log("User signed out.");
  });
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log("User signed out.");
  });
}

function fetchMemes() {
  const token = localStorage.getItem("token");
  $.ajax({
    method: "GET",
    url: route + "/memes",
    headers: {
      access_token: token,
    },
  })
    .done((response) => {
      $("#listMemes").empty();
      let count = 0;
      const memes = response.slice(0, 50);
      console.log(memes);
      memes.forEach((eachMeme, index) => {
        if (index % 3 === 0) {
          count++;
          $("#listMemes").append(`
        <div class="row" id="${count}" style="margin-top: 30px"> 
         <div class="col-4" onclick="addFavourite(${eachMeme.id})">
            <h4 class="text-center"><strong>Meme#${index + 1}</strong></h4>
            <hr />
            <div class="profile-card-2">
              <img
                src="${eachMeme.url}" style="width: 350px; height: 350px; "
              />
              <div class="profile-name">${eachMeme.name}</div>
              <div class="profile-username">@kacrut</div>
             </div>
            </div>
        </div>
        `);
        } else {
          $(`#${count}`).append(`
         <div class="col-4" onclick="addFavourite(${eachMeme.id})">
            <h4 class="text-center"><strong>Meme#${index + 1}</strong></h4>
            <hr />
            <div class="profile-card-2">
              <img
                src="${eachMeme.url}" style="width: 350px; height: 350px; "
              />
              <div class="profile-name">${eachMeme.name}</div>
              <div class="profile-username">@kacrut</div>
            </div>
          </div>
         `);
        }

        if (index === 49)
          $(`#${count}`).append(`
        <div class="col-4" style="margin-top: 200px; left: 200px"> 
        <a href="#">
        <button type="button" class="btn btn-primary" onclick="fetchMemes2()">Next->-></button> </a>
        </div>
        `);
      });
      myMemeShow();
    })
    .fail((err) => {
      console.log(err);
    });
}

function fetchMemes2() {
  const token = localStorage.getItem("token");
  $.ajax({
    method: "GET",
    url: route + "/memes",
    headers: {
      access_token: token,
    },
  })
    .done((response) => {
      $("#listMemes").empty();
      let count = 0;
      let i = 49;
      const memes = response.slice(50, 100);
      console.log(memes);
      memes.forEach((eachMeme, index) => {
        if (index % 3 === 0) {
          count++;
          i++;
          $("#listMemes").append(`
        <div class="row" id="${count}" style="margin-top: 30px"> 
         <div class="col-4" onclick="addFavourite(${eachMeme.id})">
            <h4 class="text-center"><strong>Meme#${i + 1}</strong></h4>
            <hr />
            <div class="profile-card-2">
              <img
                src="${eachMeme.url}" style="width: 350px; height: 350px; "
              />
              <div class="profile-name">${eachMeme.name}</div>
              <div class="profile-username">@kacrut</div>
             
            </div>
          </div>
        </div>
        `);
        } else {
          i++;
          $(`#${count}`).append(`
         <div class="col-4" onclick="addFavourite(${eachMeme.id})">
            <h4 class="text-center"><strong>Meme#${i + 1}</strong></h4>
            <hr />
            <div class="profile-card-2">
              <img
                src="${eachMeme.url}" style="width: 350px; height: 350px; "
              />
              <div class="profile-name">${eachMeme.name}</div>
              <div class="profile-username">@kacrut</div>
            </div>
          </div>
         `);
        }

        if (index === 49)
          $(`#${count}`).append(`
      <div class="col-4" style="margin-top: 200px; left: 200px"> 
      <a href="#">
      <button type="button" class="btn btn-primary" onclick="fetchMemes()">
       <-<-Previous
     </button> </a>
      </div>
      `);
      });
      $("#myFavourite").hide();
    })
    .fail((err) => {
      console.log(err);
    });
}

function getGif() {
  $("#listMemes").empty();
  const token = localStorage.getItem("token");
  const query = $("#querygif").val();

  console.log(query);

  $.ajax({
    method: "GET",
    url: route + "/memes/gif",
    data: {
      question: query,
    },
    headers: {
      access_token: token,
    },
  })
    .done((response) => {
      let count = 0;
      console.log(response);
      const gifs = response.slice(0, 9);
      console.log(gifs);
      gifs.forEach((gif, index) => {
        if (index % 3 === 0) {
          count++;
          $("#listMemes").append(`
        <div class="row" id="${count}" style="margin-top: 30px"> 
         <div class="col-4">
            <h4 class="text-center"><strong>Gif#${index + 1}</strong></h4>
            <hr />
            <div class="profile-card-2">
              <img
                src="${
                  gif.images.original.url
                }" style="width: 350px; height: 350px; "
              />
              <div class="profile-name">${gif.title}</div>
              <div class="profile-username">@giphy</div>
            </div>
          </div>
        </div>
        `);
        } else {
          $(`#${count}`).append(`
         <div class="col-4">
            <h4 class="text-center"><strong>Gif#${index + 1}</strong></h4>
            <hr />
            <div class="profile-card-2">
              <img
                src="${
                  gif.images.original.url
                }" style="width: 350px; height: 350px; "
              />
              <div class="profile-name">${gif.title}</div>
              <div class="profile-username">@giphy</div>
            </div>
          </div>
         `);
        }
      });
    })
    .fail((err) => {
      console.log(err);
    });
}

function myFavouriteShow() {
  $("#listFavourite").show();
  $("#listMemes").hide();
}

function myMemeShow() {
  $("#listFavourite").hide();
  $("#listMemes").show();
}

function myFavourite() {
  const token = localStorage.getItem("token");
  $.ajax({
    method: "GET",
    url: route + "/favorites",
    headers: {
      access_token: token,
    },
  })
    .done((response) => {
      let count = 0;
      console.log(response, "<<<< ini response favourites");
      $("#list-allMemes").empty();
      response.forEach((e, index) => {
        $("#list-allMemes").append(`
        <div class="main-titles-head text-center">
        <p class="tiltle-para editContent editContent">memes ${index + 1}</p>
      </div>
      <div class="container">
        <div class="gallery-image">
          <div class="img-box">
            <a href="#page"> <img src="${
              e.Meme.url
            }" alt="product" class="img-responsive "></a>
            <div class="caption">
              <h6><a href="#page">${e.Meme.name}</a></h6>
            </div>
            <button onclick="deleteMems('${
              e.MemeId
            }', event)" type="button" class="btn btn-danger">Delete</button>
          </div>
        </div>
      </div>
        `);
      });
      myFavouriteShow();
    })
    .fail((err) => {
      console.log(err);
    });
}

function addFavourite(memeId) {
  const token = localStorage.getItem("token");
  const UserId = localStorage.getItem("UserId");

  console.log(typeof UserId, memeId);
  $.ajax({
    method: "POST",
    url: route + "/favorites",
    data: {
      id: memeId,
    },
    headers: {
      access_token: token,
    },
  })
    .done((response) => {
      console.log(response);
    })
    .fail((err) => {
      console.log(err);
    });
}

function getJoke() {
  const token = localStorage.getItem("token");

  $("#listMemes").empty();
  $("#last-line").empty();
  $("#fot").empty();

  $.ajax({
    method: "GET",
    url: route + "/memes/randomJoke",
    headers: {
      access_token: token,
    },
  })
    .done((response) => {
      console.log(response.delivery);
      $("#listMemes").append(`
    <div class="row justify-content-around jokee">
      <div class="card bg-light col-4" onclick="showJoke()">
        <div class="card-header">@Kacrut</div>
          <div class="card-body">
            <h5 class="card-title">Setup:</h5>
            <p class="card-text">${response.setup}</p>
          </div>
        </div>
      </div>
    </div>
      `);
      deliv = response.delivery;
      myMemeShow();
    })
    .fail((err) => {
      console.log(err);
    });
}

function showJoke() {
  $("#listMemes").empty();
  $("#listMemes").append(`
  <div class="row justify-content-around jokee">
      <div class="card bg-light col-4" onclick="getJoke()">
        <div class="card-header">@Kacrut</div>
          <div class="card-body">
            <h5>${deliv}</h5>
          </div>
        </div>
      </div>
    </div>
  `);
}

function deleteMems(id, event) {
  console.log(id);
  event.preventDefault();
  const token = localStorage.getItem("token");
  console.log(token);
  $.ajax({
    method: "DELETE",
    url: route + `/favorites/${id}`,
    headers: { access_token: token },
  })
    .done((resolve) => {
      $("#list-allMemes").empty();
      myFavourite();
    })
    .fail((err) => {
      console.log(err);
    });
}