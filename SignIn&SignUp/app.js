// const sign_in_btn = document.querySelector("#sign-in-btn");
// const sign_up_btn = document.querySelector("#sign-up-btn");
// const container = document.querySelector(".container");

// sign_up_btn.addEventListener("click", () => {
//   container.classList.add("sign-up-mode");
// });

// sign_in_btn.addEventListener("click", () => {
//   container.classList.remove("sign-up-mode");
// });


const postDataToServer = function (command, body, callback) {
    const url = "http://localhost:3000/";
    fetch(url+command, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: body
    })
    .then((response) => response.json())
    .then((data) => callback(data));
};


function signup() {
    const signupUsername = document.getElementById('signupUsername').value;
    const signupPassword = document.getElementById('signupPassword').value;

    postDataToServer(
        "signup", JSON.stringify({ username: signupUsername, password: signupPassword }),
        (data) => {
            console.log(data);
        }
    );
}

function signin() {
    const signinUsername = document.getElementById('signinUsername').value;
    const signinPassword = document.getElementById('signinPassword').value;

    postDataToServer(
        "signin", JSON.stringify({ username: signinUsername, password: signinPassword }),
        (data) => {
            console.log(data);
        }
    );
}
