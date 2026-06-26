const results =
JSON.parse(localStorage.getItem("results")) || [];

const resultsContainer =
document.getElementById("results");

const newGameButton =
document.getElementById("newGameButton");

showResults();

newGameButton.addEventListener("click", newGame);

function showResults(){

    resultsContainer.innerHTML = "";

    results.forEach(function(result){

        resultsContainer.innerHTML += `

        <div class="result">

            <span>${result.player}</span>

            <span>${getTeeEmoji(result.tee)} ${result.tee}</span>

        </div>

        `;

    });

}

function getTeeEmoji(tee){

    switch(tee){

        case "Wit": return "⚪";
        case "Geel": return "🟡";
        case "Blauw": return "🔵";
        case "Rood": return "🔴";
        case "Oranje": return "🟠";

        default: return "";

    }

}

function newGame(){

    localStorage.removeItem("players");
    localStorage.removeItem("tees");
    localStorage.removeItem("results");

    location.href = "index.html";

}