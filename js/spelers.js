let players =
JSON.parse(localStorage.getItem("players")) || [];

const playerInput = document.getElementById("playerInput");
const addPlayerButton = document.getElementById("addPlayerButton");
const playerList = document.getElementById("playerList");
const nextButton = document.getElementById("nextButton");

addPlayerButton.addEventListener("click", addPlayer);

playerInput.addEventListener("keydown", function(event){

    if(event.key === "Enter"){
        addPlayer();
    }

});

nextButton.addEventListener("click", goToTees);

function addPlayer(){

    const name = playerInput.value.trim();

    if(name === ""){
        return;
    }

    players.push(name);

    localStorage.setItem(
    "players",
    JSON.stringify(players)
    );

    playerInput.value = "";

    renderPlayers();

}

function renderPlayers(){

    playerList.innerHTML = "";

    players.forEach(function(player, index){

        playerList.innerHTML += `
            <div class="player">

                <span>${player}</span>

                <button onclick="removePlayer(${index})">
                    🗑
                </button>

            </div>
        `;

    });

    nextButton.disabled = players.length < 2;

}

function removePlayer(index){

    players.splice(index, 1);

    localStorage.setItem(
    "players",
    JSON.stringify(players)
    );

    renderPlayers();

}

renderPlayers();

function goToTees(){

    location.href = "tees.html";

}