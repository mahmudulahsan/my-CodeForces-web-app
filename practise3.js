
var sz;

var conlist = [];
var contest_btn = document.querySelector("#contest-btn");


contest_btn.addEventListener('click', (e)=>{

    var contest_handle = document.querySelector("#contest-handle").value;


    // Fetching user contests
    fetch('https://codeforces.com/api/user.rating?handle='+contest_handle)
    .then(res => res.json())
    .then(data => {
        var done = data.result;
        var len = done.length;
        sz= len;
        for(let i = 0; i<len ; i++){
            conlist.push(done[i].contestId);
        }
    })
    
    // Fetching all contests
    fetch('https://codeforces.com/api/contest.list?')
    .then(res => res.json())
    .then(data => {
        var arr = data.result;
        var table = document.querySelector('#myTable3');
            var output = [];
            var s = 0;

            function buildTable(arr){
                var c = 1;  
                var l = arr.length;   
                console.log(conlist.length)
    
                for(var i = 0; i< l ; i++){
                    var ans = 0;
                    for(var j=0; j< sz; j++){
                        if(conlist[j] === arr[i].id){
                            ans = 1;
                            break;
                        }
                    }

                    if(ans == 1){
                        var row =`
                    <tr>
                        <td class="bg-dark text-white">${c}</td>
                        <td class="bg-success text-white">${arr[i].name}</td>
                        <td class="bg-secondary text-white">✔️</td>
                        <td class="bg-info text-white"><a target="_blank" href="https://codeforces.com/contest/${arr[i].id}">Link</a></td>
                    </tr>
                    `
                    }
                    else{
                        var row =`
                        <tr>
                            <td class="bg-dark text-white">${c}</td>
                            <td class="bg-secondary text-white">${arr[i].name}</td>
                            <td class="bg-secondary text-white">❌</td>
                            <td class="bg-info text-white"><a target="_blank" href="https://codeforces.com/contest/${arr[i].id}">Link</a></td>
                        </tr>
                        `
                    }
                    output.push(row);
                    c++;
                }
              }
              buildTable(arr);
              table.innerHTML = output.join(' ')
    
    })
})






