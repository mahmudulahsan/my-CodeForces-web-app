

document.addEventListener('DOMContentLoaded', () =>{

    if(localStorage.getItem("username")){
        window.onload = function(){
            document.querySelector('#btn-search').click();
        }
        document.querySelector('#welcome').innerHTML = `
        <div class="alert alert-info" role="alert">
            <h4 class="alert-heading">Welcome!</h4>
            <p>Happy coding <strong style="font-size: 20px">${localStorage.getItem("username")} :D</strong></p>

        </div>
        `
        
    }  
});