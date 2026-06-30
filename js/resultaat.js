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

        const initial =
        result.player
            .charAt(0)
            .toUpperCase();

        const teeClass =
        result.tee.toLowerCase();

        resultsContainer.innerHTML += `

        <div class="resultCard">

            <div class="resultLeft">

                <div class="resultAvatar ${teeClass}">

                    ${initial}

                </div>

                <div class="resultName">

                    ${result.player}

                </div>

            </div>

            <div class="resultBadge ${teeClass}">

                ${getTeeEmoji(result.tee)}
                ${result.tee}

            </div>

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