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

    var a_solve=0, b_solve=0,c_solve=0, d_solve=0,e_solve=0, f_solve=0,g_solve=0;
    var solve_800=0, solve_900=0, solve_1000=0,solve_1100=0, solve_1200=0,solve_1300=0, solve_1400=0,solve_1500=0, solve_1600=0,solve_1700=0, solve_1800=0,solve_1900=0, solve_2000=0,solve_2100=0, solve_2200=0;

    fetch('https://codeforces.com/api/user.status?handle='+search)
    .then(res => res.json())
    .then(data => {
        var l = data.result.length;
        var prob = data.result;
        
        for(let i = 0; i<l ; i++){
            if(prob[i].verdict === "OK")
                ac++;
            if(prob[i].verdict === "TIME_LIMIT_EXCEEDED")
                tle++;
            if(prob[i].verdict === "RUNTIME_ERROR")
                rte++;
            if(prob[i].verdict === "WRONG_ANSWER")
                wa++;
            if(prob[i].verdict === "OK" && prob[i].problem.index ==="A")
                a_solve++;
            if(prob[i].verdict === "OK" && (prob[i].problem.index ==="B" || prob[i].problem.index ==="B1" || prob[i].problem.index ==="B2"))
                b_solve++;
            if(prob[i].verdict === "OK" && (prob[i].problem.index ==="C" || prob[i].problem.index ==="C1" || prob[i].problem.index ==="C2"))
                c_solve++;
            if(prob[i].verdict === "OK" && (prob[i].problem.index ==="D" || prob[i].problem.index ==="D1" || prob[i].problem.index ==="D2"))
                d_solve++;
            if(prob[i].verdict === "OK" && (prob[i].problem.index ==="E" || prob[i].problem.index ==="E1" || prob[i].problem.index ==="E2"))
                e_solve++;
            if(prob[i].verdict === "OK" && (prob[i].problem.index ==="F" || prob[i].problem.index ==="F1" || prob[i].problem.index ==="F2"))
                f_solve++;
            if(prob[i].verdict === "OK" && prob[i].problem.index ==="G")
                g_solve++;
            

            if(prob[i].verdict === "OK" && prob[i].problem.rating == 800)
                solve_800++;    
            if(prob[i].verdict === "OK" && prob[i].problem.rating == 900)
                solve_900++;
            if(prob[i].verdict === "OK" && prob[i].problem.rating == 1000)
                solve_1000++;
            if(prob[i].verdict === "OK" && prob[i].problem.rating == 1100)
                solve_1100++;
            if(prob[i].verdict === "OK" && prob[i].problem.rating == 1200)
                solve_1200++;
            if(prob[i].verdict === "OK" && prob[i].problem.rating == 1300)
                solve_1300++;
            if(prob[i].verdict === "OK" && prob[i].problem.rating == 1400)
                solve_1400++;
            if(prob[i].verdict === "OK" && prob[i].problem.rating == 1500)
                solve_1500++;
            if(prob[i].verdict === "OK" && prob[i].problem.rating == 1600)
                solve_1600++;
            if(prob[i].verdict === "OK" && prob[i].problem.rating == 1700)
                solve_1700++;
            if(prob[i].verdict === "OK" && prob[i].problem.rating == 1800)
                solve_1800++;
            if(prob[i].verdict === "OK" && prob[i].problem.rating == 1900)
                solve_1900++;
            if(prob[i].verdict === "OK" && prob[i].problem.rating == 2000)
                solve_2000++;
            

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

    // Bar Chart Index
    google.charts.load("current", {packages:['corechart']});
    google.charts.setOnLoadCallback(drawVisualization);
    function drawVisualization() {
      var data = google.visualization.arrayToDataTable([
        ["Index", "Solved", { role: "style" } ],
        ["A", a_solve, "#cad2c5"],
        ["B", b_solve, "#84a98c"],
        ["C", c_solve, "#52796f"],
        ["D", d_solve, "#354f52"],
        ["E", e_solve, "#2f3e46"],
        ["F", f_solve, "#2b2d42"],
        ["G", g_solve, "#212529"]
      ]);

      var view = new google.visualization.DataView(data);
      view.setColumns([0, 1,
                       { calc: "stringify",
                         sourceColumn: 1,
                         type: "string",
                         role: "annotation" },
                       2]);

      var options = {
        title: "Solved Problems By INDEX.",
        // width: 368,
        height: 300,
        bar: {groupWidth: "80%"},
        legend: { position: "none" },
        backgroundColor: '#8f9186',
      };
      var chart = new google.visualization.ColumnChart(document.getElementById("barchart-index"));
      chart.draw(view, options);
  }

  // Bar Chart Rating
  google.charts.load("current", {packages:['corechart']});
  google.charts.setOnLoadCallback(drawVisualization2);
  function drawVisualization2() {
    var data = google.visualization.arrayToDataTable([
      ["Rating", "Solved", { role: "style" } ],
      ["800", solve_800, "#f2e9e4"],
      ["900", solve_900, "#c9ada7"],
      ["1000", solve_1000, "#9a8c98"],
      ["1100", solve_1100, "#e5e4e2"],
      ["1200", solve_1200, "#4a4e69"],
      ["1300", solve_1300, "#22223b"],
      ["1400", solve_1400, "#003049"],
      ["1500", solve_1500, "#f2e9e4"],
      ["1600", solve_1600, "#c9ada7"],
      ["1700", solve_1700, "#9a8c98"],
      ["1800", solve_1800, "#e5e4e2"],
      ["1900", solve_1900, "#4a4e69"],
      ["2000", solve_2000, "#22223b"],
    ]);

    var view = new google.visualization.DataView(data);
    view.setColumns([0, 1,
                     { calc: "stringify",
                       sourceColumn: 1,
                       type: "string",
                       role: "annotation" },
                     2]);

    var options = {
      title: "Solved Problems By RATING",
    //   width: 368,
      height: 300,
      bar: {groupWidth: "80%"},
      legend: { position: "none" },
      backgroundColor: '#8f9186',
      
    };
    var chart = new google.visualization.ColumnChart(document.getElementById("barchart-rating"));
    chart.draw(view, options);
}

$(window).resize(function(){
    drawVisualization2();
    drawVisualization();
    drawChart();
  });

    })  
})



