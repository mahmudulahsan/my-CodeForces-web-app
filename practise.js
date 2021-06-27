var press = document.querySelector('#press');
var handle = document.querySelector('#handle').value;



press.addEventListener('click', ()=>{
    var search = document.querySelector('.sel').value;
    if(search=="") alert('Please Enter Valid Input');

    search = search.toUpperCase();
    fetch('https://codeforces.com/api/problemset.problems')
    .then(res => res.json())
    .then(data =>{
        var arr = data.result.problems;
        function buildTable(arr){
            var table = document.querySelector('#myTable');

            var c = 1;         

            for(var i = 0; i<1000; i++){
                if(arr[i].index==search){
                    var row =`
                    <tr>
                        <td class="bg-dark text-white">${c}</td>
                        <td class="bg-secondary text-white">${arr[i].name}</td>
                        <td class="bg-secondary text-white">${arr[i].rating}</td>
                        <td class="bg-secondary">${arr[i].tags}</td>
                        <td class="bg-info text-white"><a target="_blank" href="https://codeforces.com/problemset/problem/${arr[i].contestId}/${search}">Link</a></td>
                    </tr>
                    `
                      table.innerHTML +=row;
                      c++;
                      if(c>100) break;
                  }
                }
               }
               buildTable(arr);
    })
})


