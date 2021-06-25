

    fetch('https://codeforces.com/api/contest.list?=true')
    .then(res => res.json())
    .then(data => {
     // console.log(data.result.length);
        
     var arr = data.result;
  
     function buildTable(arr){
         var table = document.querySelector('#myTable');
                
            for(var i = 0; i<arr.length; i++){

                if(arr[i].phase=="BEFORE"){
                    var r_d = arr[i].relativeTimeSeconds/86400;
                    if(r_d<=0) r_d=r_d*(-1);
                    var row =`
                    <tr>
                        <td class="bg-dark text-white">${i+1}</td>
                           <td class="bg-secondary text-white">${arr[i].name}</td>
                           <td class="bg-secondary text-white">${Math.floor(r_d)} days</td>
                           <td class="bg-info text-white"><a target="_blank" href="https://codeforces.com/contests/${arr[i].id}">Contest Link</a></td>
                          </tr>
                      `
                      table.innerHTML +=row;
                  }
                }

            }
        
            buildTable(arr);
        })
