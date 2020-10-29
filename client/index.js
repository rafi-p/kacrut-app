const route = "http://localhost:3000";

$(document).ready(() => {
  const token = localStorage.getItem("token");

  if (token) {
    $("#home").show();
    $("#login").hide();
    $("#register").hide();
    fetchMemes();
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
