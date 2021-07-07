var form = document.querySelector('#myForm');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    // const loadText ="wait a little bit ⌛";
    // document.querySelector('#propic').innerHTML = loadText;

    var search = document.querySelector('#search').value;

    fetch('https://codeforces.com/api/user.info?handles='+search)
    .then(res => res.json())
    .then(data => {
        console.log(data.result.lastName);
        // console.log(data)
        
        document.querySelector('#propic').innerHTML = `
            <img src="${data.result[0].titlePhoto}"/>
        `
        document.querySelector('#about').innerHTML = `
        <p> <b>Name :</b> ${data.result[0].firstName} ${data.result[0].lastName} </p>
        <p> <b>Address :</b> ${data.result[0].city}, ${data.result[0].country} </p>
        <p> <b>Friends of :</b> ${data.result[0].friendOfCount}</p>
        <p> <b>Institution :</b> ${data.result[0].organization}</p>
        `
        var rat = data.result[0].rating;
        var maxRat = data.result[0].maxRating;
        console.log(rat);
        if(rat<=1199){
            document.querySelector('#rat').innerHTML = 
            `<p> <b>Rating : <span style="color: #444444">${rat}</span></b> , Newbie</p>
             <p> <b>Max Rating : <span style="color: black">${maxRat}</span></b></p>
             <p>Profile Link: <a target="_blank" href="https://codeforces.com/profile/${search}">${search}</a></p>
             `
        } else if(rat>=1200 && rat<=1399){
            document.querySelector('#rat').innerHTML = 
            `<p> <b>Rating : <span style="color: #006400">${rat}</span></b> , Pupil</p>
            <p> <b>Max Rating : <span style="color: black">${maxRat}</span></b></p>
            <p>Profile Link: <a target="_blank" href="https://codeforces.com/profile/${search}">${search}</a></p>
            `
        } else if(rat>=1400 && rat<=1599){
            document.querySelector('#rat').innerHTML = 
            `<p> <b>Rating : <span style="color: #90e0ef">${rat}</span></b> , Specialist</p>
            <p> <b>Max Rating : <span style="color: black">${maxRat}</span></b></p>
             <p>Profile Link: <a target="_blank" href="https://codeforces.com/profile/${search}">${search}</a></p>
            `
        } else if(rat>=1600 && rat<=1899){
            document.querySelector('#rat').innerHTML = 
            `<p> <b>Rating : <span style="color: #03045e">${rat}</span></b> , Expert</p>
            <p> <b>Max Rating : <span style="color: black">${maxRat}</span></b></p>
             <p>Profile Link: <a target="_blank" href="https://codeforces.com/profile/${search}">${search}</a></p>
              `
        } else if(rat>=1900 && rat<=2099){
            document.querySelector('#rat').innerHTML = 
            `<p> <b>Rating : <span style="color: #3c096c">${rat}</span></b> , Candidate Master</p>
            <p> <b>Max Rating : <span style="color: black">${maxRat}</span></b></p>
             <p>Profile Link: <a target="_blank" href="https://codeforces.com/profile/${search}">${search}</a></p>
              `
        } else if(rat>=2100 && rat<=2299){
            document.querySelector('#rat').innerHTML = 
            `<p> <b>Rating : <span style="color: #ff4800">${rat}</span></b> , Master</p>
            <p> <b>Max Rating : <span style="color: black">${maxRat}</span></b></p>
             <p>Profile Link: <a target="_blank" href="https://codeforces.com/profile/${search}">${search}</a></p>
              `
        } else if(rat>=2300 && rat<=2399){
            document.querySelector('#rat').innerHTML = 
            `<p> <b>Rating : <span style="color: #ff4800">${rat}</span></b> , International Master</p>
            <p> <b>Max Rating : <span style="color: black">${maxRat}</span></b></p>
             <p>Profile Link: <a target="_blank" href="https://codeforces.com/profile/${search}">${search}</a></p>
              `
        } else if(rat>=2400 && rat<=2599){
            document.querySelector('#rat').innerHTML = 
            `<p> <b>Rating : <span style="color: #ff4800">${rat}</span></b> , Grandmaster</p>
            <p> <b>Max Rating : <span style="color: black">${maxRat}</span></b></p>
             <p>Profile Link: <a target="_blank" href="https://codeforces.com/profile/${search}">${search}</a></p>
              `
        } else if(rat>=2600 && rat<=2999){
            document.querySelector('#rat').innerHTML = 
            `<p> <b>Rating : <span style="color: #ff4800">${rat}</span></b> , International Grandmaster</p>
            <p> <b>Max Rating : <span style="color: black">${maxRat}</span></b></p>
             <p>Profile Link: <a target="_blank" href="https://codeforces.com/profile/${search}">${search}</a></p>
              `
        } else if(rat>=3000){
            document.querySelector('#rat').innerHTML = 
            `<p> <b>Rating : <span style="color: #ff4800">${rat}</span></b> , Legendary Grandmaster</p>
            <p> <b>Max Rating : <span style="color: black">${maxRat}</span></b></p>
             <p>Profile Link: <a target="_blank" href="https://codeforces.com/profile/${search}">${search}</a></p>
              `
        }
        // contest table
        fetch('https://codeforces.com/api/user.rating?handle='+search)
        .then(res => res.json())
        .then(data => {
            // console.log(data.result.length);
        
            var arr = data.result;
            arr[-1]=1500;
        
            function buildTable(arr){
                var table = document.querySelector('#myTable');
                
                for(var i = arr.length-1; i>=0; i--){
                    var chng = arr[i].newRating-arr[i-1].newRating;
                    if(i==0){
                        var chng = arr[i].newRating-arr[i-1];
                    }
                    console.log(chng)
                    if(chng>=0){
                        var row =`
                        <tr>
                            <td class="bg-dark text-white">${i+1}</td>
                            <td class="bg-secondary text-white">${arr[i].contestName}</td>
                            <td class="bg-warning text-white">${arr[i].rank}</td>
                            <td class="bg-success text-white"> ${chng} <i style="font-size: 15px" class="fa fa-arrow-up"></i></td>
                            <td class="bg-info text-white">${arr[i].newRating}</td>
                        </tr>
                    `
                    }else {
                        var row =`
                        <tr>
                            <td class="bg-dark text-white">${i+1}</td>
                            <td class="bg-secondary text-white">${arr[i].contestName}</td>
                            <td class="bg-warning text-white">${arr[i].rank}</td>
                            <td class="bg-danger text-white"> ${chng} <i style="font-size: 15px" class="fa fa-arrow-down"></i></td>
                            <td class="bg-info text-white">${arr[i].newRating}</td>
                        </tr>
                    `
                    }
        
                    table.innerHTML +=row;
                }
            }
        
            buildTable(arr);
        })

    })
    .catch(err => {
        // console.log('Failed');
        document.querySelector('#propic').innerHTML = `
            <div class="alert alert-danger">
                <strong>ERROR!</strong> User not found
            </div>
        `
        document.querySelector('#about').innerHTML = `
        <img src="404-error.svg" height="250px" width="250px"
        />
        `
        document.querySelector('#rat').innerHTML = 
        ``
    })
})