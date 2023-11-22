const userId = window.localStorage.getItem("UserId");

function getUserProfile(){
    if (userId == undefined)return;

    fetchDataFromServer(
        `user?user_id=${userId}`,
        function ({data}){
            const user = data[0];
            const signin = document.getElementById("SignInButton");
            signin.innerHTML = user.username;
        }
    );
}
