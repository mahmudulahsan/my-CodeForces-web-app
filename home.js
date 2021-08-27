var logout = document.querySelector("#btn-logout-nav");

document.addEventListener('DOMContentLoaded', () =>{
    if(localStorage.getItem("username")){
        document.querySelector('#welcome').innerHTML = `
        <div class="alert alert-info" role="alert">
            <h4 class="alert-heading">Welcome back!</h4>
            <p>Happy coding <strong style="font-size: 20px">${localStorage.getItem("username")} :D</strong></p>
        </div>
        `
        logout.style.display = "inline";
        logout.innerHTML = "logout";
    }
    else{
        logout.style.display = "inline";
        logout.style.backgroundColor = "#007bff"
        logout.innerHTML = `
            <a href="mystats.htm">login</>
        `
    }  
});

logout.addEventListener('click', () => {
    if(localStorage.getItem("username")){
        localStorage.clear();
        location.reload();
    }
})