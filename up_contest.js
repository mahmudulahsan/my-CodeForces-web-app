
var logout_nav = document.querySelector("#btn-logout-nav");


document.addEventListener('DOMContentLoaded', () =>{
    if(localStorage.getItem("username")){
        logout_nav.style.display = "inline";
        logout_nav.innerHTML = "logout";
    }
    else{
        logout_nav.style.display = "inline";
        logout_nav.style.backgroundColor = "#007bff"
        logout_nav.innerHTML = `
            <a href="mystats.htm">login</>
        `
    }    
});

logout_nav.addEventListener('click', () => {
    if(localStorage.getItem("username")){
        localStorage.clear();
        location.reload();
    }
})

    fetch('https://codeforces.com/api/contest.list?gym=false')
    .then(res => res.json())
    .then(data => {
     // console.log(data.result.length);
        
     var arr = data.result;
     var table = document.querySelector('#myTable');
     var output = [];
  
     function buildTable(arr){

            let cnt = 1;
        
            for(var i = 10; i>0; i--){
                if(arr[i].phase=="BEFORE"){
                    var rd = arr[i].relativeTimeSeconds/86400;
                    if(rd<=0) rd=rd*(-1);
                    var row =`
                    <tr>
                        <td class="bg-dark text-white">${cnt}</td>
                           <td class="bg-secondary text-white">${arr[i].name}</td>
                           <td class="bg-secondary text-white">${Math.floor(rd)} days</td>
                           <td class="bg-info text-white"><a target="_blank" href="https://codeforces.com/contests/${arr[i].id}">Contest Link</a></td>
                          </tr>
                      `
                    //   table.innerHTML +=row;
                    output.push(row);
                    cnt++;
                  }
                }

            }
            buildTable(arr);
            table.innerHTML = output.join(' ');
        })
