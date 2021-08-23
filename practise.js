var press = document.querySelector('#press');
var solve_cnt = document.querySelector('#solve-count-1');
var bound;

press.addEventListener('click', ()=>{

    var handle = document.querySelector('#handle').value;
    var search = document.querySelector('.sel').value;



    var problist = [];
    fetch('https://codeforces.com/api/user.status?handle='+handle)
    .then(res => res.json())
    .then(data =>{
        var solve = data.result;
        var len = data.result.length;
        bound = len;
        for(var i = 0; i < len; i++){
            if(solve[i].verdict=="OK" && solve[i].problem.index === search)
                problist.push(solve[i].problem.name);
        }    
    })

    

    search = search.toUpperCase();
    fetch('https://codeforces.com/api/problemset.problems')
    .then(res => res.json())
    .then(data =>{
        var arr = data.result.problems;

        let output = [];
        var table = document.querySelector('#myTable');

        function buildTable(arr){
            var c = 1;
            var s = 0;         
            for(var i = 0; i<1000; i++){
                if(arr[i].index == search){
                    var ans = 0;
                    
                    for(var j=0; j<bound; j++){
                        if(problist[j] == arr[i].name){
                            ans = 1;
                            break;
                        }
                    }
            
                    if(ans == 1){
                        s++;
                        var row =`
                    <tr>
                        <td class="bg-dark text-white">${c}</td>
                        <td class="bg-success text-white">${arr[i].name}</td>
                        <td class="bg-secondary text-white">${arr[i].rating}</td>
                        <td class="bg-secondary">${arr[i].tags}</td>
                        <td class="bg-info text-white"><a target="_blank" href="https://codeforces.com/problemset/problem/${arr[i].contestId}/${search}">Link</a></td>
                    </tr>
                    `
                    }
                    else{
                        var row =`
                    <tr>
                        <td class="bg-dark text-white">${c}</td>
                        <td class="bg-secondary text-white">${arr[i].name}</td>
                        <td class="bg-secondary text-white">${arr[i].rating}</td>
                        <td class="bg-secondary">${arr[i].tags}</td>
                        <td class="bg-info text-white"><a target="_blank" href="https://codeforces.com/problemset/problem/${arr[i].contestId}/${search}">Link</a></td>
                    </tr>
                    `
                    }
                    // table.innerHTML +=row;
                    output.push(row);
                    c++;
                    if(c>100) break;
                  }
                }
                solve_cnt.innerHTML = s;
               }
               buildTable(arr);
               console.log("mahi")
               table.innerHTML = output.join(' ');
    })
})