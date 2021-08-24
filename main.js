var form = document.querySelector('#myForm');
var search;
var newSearch = 0;

var ac = 0, tle = 0, rte = 0, wa = 0;

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const loadText = "⌛";
    document.querySelector('#propic').innerHTML = loadText;

    search = document.querySelector('#search').value;

    // if(search){
    //     localStorage.setItem("username", search);

    //     document.querySelector('.mahi').innerHTML += `
    //     <input value="${localStorage.getItem("username")}" type="text" class="form-control" id="newSearch" style="background-color: #8f9186;" readonly>
    //     `
    //     newSearch = 1;
    //     // localStorage.getItem
    // }

    fetch('https://codeforces.com/api/user.info?handles='+search)
    .then(res => res.json())
    .then(data => {
        document.querySelector('#propic').innerHTML = `
            <img src="${data.result[0].titlePhoto}"/>
        `
        document.querySelector('#about').innerHTML = `
        <p> <b><u>Name</u> :</b> ${data.result[0].firstName} ${data.result[0].lastName} </p>
        <p> <b><u>Address</u> :</b> ${data.result[0].city}, ${data.result[0].country} </p>
        <p> <b><u>Friends of</u> :</b> ${data.result[0].friendOfCount}</p>
        <p> <b><u>Institution</u> :</b> ${data.result[0].organization}</p>
        `
        var rat = data.result[0].rating;
        var maxRat = data.result[0].maxRating;
        
        if(rat<=1199){
            document.querySelector('#rat').innerHTML = 
            `<p>Rating : <b class="text-white bg-secondary"> ${rat}</b> , Newbie</p>
             <p> <b>Max Rating : <span style="color: black">${maxRat}</span></b></p>
             <p>Profile Link: <a target="_blank" href="https://codeforces.com/profile/${search}">${search}</a></p>
             `
        } else if(rat>=1200 && rat<=1399){
            document.querySelector('#rat').innerHTML = 
            `<p>Rating : <b class="text-white bg-success"> ${rat}</b> , Pupil</p>
            <p> <b>Max Rating : <span style="color: black">${maxRat}</span></b></p>
            <p>Profile Link: <a target="_blank" href="https://codeforces.com/profile/${search}">${search}</a></p>
            `
        } else if(rat>=1400 && rat<=1599){
            document.querySelector('#rat').innerHTML = 
            `<p>Rating : <b class="text-white bg-info"> ${rat}</b> , Specialist</p>
            <p> <b>Max Rating : <span style="color: black">${maxRat}</span></b></p>
             <p>Profile Link: <a target="_blank" href="https://codeforces.com/profile/${search}">${search}</a></p>
            `
        } else if(rat>=1600 && rat<=1899){
            document.querySelector('#rat').innerHTML = 
            `<p>Rating : <b class="text-white bg-primary"> ${rat}</b> , Expert</p>
            <p> <b>Max Rating : <span style="color: black">${maxRat}</span></b></p>
             <p>Profile Link: <a target="_blank" href="https://codeforces.com/profile/${search}">${search}</a></p>
              `
        } else if(rat>=1900 && rat<=2099){
            document.querySelector('#rat').innerHTML = 
            `<p>Rating : <b style="background-color: #563d7c"> ${rat}</b> , Candidate Master</p>
            <p> <b>Max Rating : <span style="color: black">${maxRat}</span></b></p>
             <p>Profile Link: <a target="_blank" href="https://codeforces.com/profile/${search}">${search}</a></p>
              `
        } else if(rat>=2100 && rat<=2299){
            document.querySelector('#rat').innerHTML = 
            `<p>Rating : <b class="text-white bg-warning"> ${rat}</b> , Master</p>
            <p> <b>Max Rating : <span style="color: black">${maxRat}</span></b></p>
             <p>Profile Link: <a target="_blank" href="https://codeforces.com/profile/${search}">${search}</a></p>
              `
        } else if(rat>=2300 && rat<=2399){
            document.querySelector('#rat').innerHTML = 
            `<p>Rating : <b class="text-white bg-warning"> ${rat}</b> , International Master</p>
            <p> <b>Max Rating : <span style="color: black">${maxRat}</span></b></p>
             <p>Profile Link: <a target="_blank" href="https://codeforces.com/profile/${search}">${search}</a></p>
              `
        } else if(rat>=2400 && rat<=2599){
            document.querySelector('#rat').innerHTML = 
            `<p>Rating : <b class="text-white bg-danger"> ${rat}</b> , Grandmaster</p>
            <p> <b>Max Rating : <span style="color: black">${maxRat}</span></b></p>
             <p>Profile Link: <a target="_blank" href="https://codeforces.com/profile/${search}">${search}</a></p>
              `
        } else if(rat>=2600 && rat<=2999){
            document.querySelector('#rat').innerHTML = 
            `<p>Rating : <b class="text-white bg-danger"> ${rat}</b> , International Grandmaster</p>
            <p> <b>Max Rating : <span style="color: black">${maxRat}</span></b></p>
             <p>Profile Link: <a target="_blank" href="https://codeforces.com/profile/${search}">${search}</a></p>
              `
        } else if(rat>=3000){
            document.querySelector('#rat').innerHTML = 
            `<p>Rating : <b class="text-dark bg-danger"> ${rat}</b> , Legendary Grandmaster</p>
            <p> <b>Max Rating : <span style="color: black">${maxRat}</span></b></p>
             <p>Profile Link: <a target="_blank" href="https://codeforces.com/profile/${search}">${search}</a></p>
              `
        }

        // contest table

        fetch('https://codeforces.com/api/user.rating?handle='+search)
        .then(res => res.json())
        .then(data => {
        
            var arr = data.result;
            arr[-1]=1500;
            var table = document.querySelector('#myTable');
            var output = [];
        
            function buildTable(arr){
                
                for(var i = arr.length-1; i>=0; i--){
                    var chng = arr[i].newRating-arr[i-1].newRating;
                    if(i==0){
                        var chng = arr[i].newRating-arr[i-1];
                    }
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
        
                    // table.innerHTML +=row;
                    output.push(row);
                }
            }
        
            buildTable(arr);
            table.innerHTML = output.join(' ');
        })

    })
    .catch(err => {
        // console.log('Failed');
        document.querySelector('#propic').innerHTML = `
            <div class="alert alert-danger" style="font-size: 15px !important">
                <strong>ERROR!</strong> User not found
            </div>
        `
        // document.querySelector('#about').innerHTML = `
        // <img src="404-error.svg" height="250px" width="250px"
        // />
        // `
        document.querySelector('#rat').innerHTML = 
        ``
    })



    fetch('https://codeforces.com/api/user.status?handle='+search)
    .then(res => res.json())
    .then(data => {
        var l = data.result.length;
        
        for(let i = 0; i<l ; i++){
            if(data.result[i].verdict === "OK")
                ac++;
            if(data.result[i].verdict === "TIME_LIMIT_EXCEEDED")
                tle++;
            if(data.result[i].verdict === "RUNTIME_ERROR")
                rte++;
            if(data.result[i].verdict === "WRONG_ANSWER")
                wa++;
        }
        // console.log(ac);
        // document.querySelector('.ac').innerHTML = ac;
        // document.querySelector('.tle').innerHTML = tle;
        // document.querySelector('.ts').innerHTML = l;
        // document.querySelector('.rte').innerHTML = rte;
        // document.querySelector('.wa').innerHTML = wa;

        document.querySelector('.submission').innerHTML = `
        <ul class="list-group">
            <li class="list-group-item list-group-item-primary d-flex justify-content-between align-items-center">
                <b class="">Total :</b>  
                <span class="badge badge-primary badge-pill"><strong class="ts">${l}</strong></span>
            </li>
            <li class="list-group-item list-group-item-success d-flex justify-content-between align-items-center">
                <b class="">ACs :</b>  
                <span class="badge badge-success badge-pill"><strong class="ac">${ac}</strong></span>
            </li>
            <li class="list-group-item list-group-item-warning d-flex justify-content-between align-items-center">
                <b class="">TLEs :</b>
                <span class="badge badge-warning badge-pill"><strong class="tle">${tle}</strong></span>
            </li>
            <li class="list-group-item list-group-item-secondary d-flex justify-content-between align-items-center">
                <b class="">RTEs :</b>
                <span class="badge badge-secondary badge-pill"><strong class="rte">${rte}</strong></span>
            </li>
            <li class="list-group-item list-group-item-danger d-flex justify-content-between align-items-center">
                <b class="">WAs :</b>
                <span class="badge badge-danger badge-pill"><strong class="wa">${wa}</strong></span>
            </li>
        </ul>
        `
    // Pie Chart
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {

    var data = google.visualization.arrayToDataTable([
        ['Category', 'percentage'],
        ['AC',   ac],
        ['WA',   wa],
        ['TLE',  tle],
        ['RTE',  rte]

    ]);

    var options = {
        title: search+'`s Submissions',
        fontSize: '14',
        backgroundColor: '#b7b7a4',
        is3D: true,
    };

    var chart = new google.visualization.PieChart(document.getElementById('piechart'));

    chart.draw(data, options);
    }

    // $(window).resize(function(){
    //     drawChart();
    // })

    })  
})



