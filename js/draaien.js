let currentPlayerIndex = 0;
let currentRotation = 0;
let results = [];

const players =
JSON.parse(localStorage.getItem("players")) || [];

const tees =
JSON.parse(localStorage.getItem("tees")) || [];

const currentPlayer =
document.getElementById("currentPlayer");

const wheel =
document.getElementById("wheel");

const svg =
document.getElementById("segments");

const spinButton =
document.getElementById("spinButton");

const overlay =
document.getElementById("overlay");

const winnerPlayer =
document.getElementById("winnerPlayer");

const winnerTee =
document.getElementById("winnerTee");

const nextButton =
document.getElementById("nextButton");

const teeColors = {

    "Wit":"#ffffff",
    "Geel":"#ffd700",
    "Blauw":"#2196f3",
    "Rood":"#f44336",
    "Oranje":"#ff9800"

};

const wheelSegments = [];

init();

function init(){

    createResults();

    createWheel();

    drawWheel();

    showCurrentPlayer();

    spinButton.addEventListener(
        "click",
        spinWheel
    );

    nextButton.addEventListener(
        "click",
        nextPlayer
    );

}

function createResults(){

    const teePool = [];

    const base =
    Math.floor(players.length / tees.length);

    const extra =
    players.length % tees.length;

    tees.forEach(function(tee){

        for(let i = 0; i < base; i++){

            teePool.push(tee);

        }

    });

    const shuffled =
    [...tees].sort(function(){

        return Math.random() - 0.5;

    });

    for(let i = 0; i < extra; i++){

        teePool.push(shuffled[i]);

    }

    teePool.sort(function(){

        return Math.random() - 0.5;

    });

    players.forEach(function(player,index){

        results.push({

            player:player,

            tee:teePool[index]

        });

    });

    localStorage.setItem(
        "results",
        JSON.stringify(results)
    );

}

function createWheel(){

    for(let i = 0; i < 12; i++){

        tees.forEach(function(tee){

            wheelSegments.push({

                naam:tee,

                kleur:teeColors[tee]

            });

        });

    }

}

function drawWheel(){

    const total = wheelSegments.length;

    svg.innerHTML = "";

    for(let i = 0; i < total; i++){

        const start =
        i * 360 / total;

        const end =
        (i + 1) * 360 / total;

        const x1 =
        200 + 180 * Math.cos((start - 90) * Math.PI / 180);

        const y1 =
        200 + 180 * Math.sin((start - 90) * Math.PI / 180);

        const x2 =
        200 + 180 * Math.cos((end - 90) * Math.PI / 180);

        const y2 =
        200 + 180 * Math.sin((end - 90) * Math.PI / 180);

        svg.innerHTML += `

        <path
            d="
            M200 200
            L${x1} ${y1}
            A180 180 0 0 1 ${x2} ${y2}
            Z
            "
            fill="${wheelSegments[i].kleur}"
            stroke="#222"
            stroke-width="0.5"
        />

        `;

    }

}

function showCurrentPlayer(){

    currentPlayer.innerHTML =
    results[currentPlayerIndex].player +
    " draait";

}

function spinWheel(){

    spinButton.disabled = true;

    const teeNaam =
    results[currentPlayerIndex].tee;

    const mogelijkePosities = [];

    wheelSegments.forEach(function(segment,index){

        if(segment.naam === teeNaam){

            mogelijkePosities.push(index);

        }

    });

    const winnaar =
    mogelijkePosities[
        Math.floor(
            Math.random() *
            mogelijkePosities.length
        )
    ];

    const slice =
    360 / wheelSegments.length;

    const target =
    360 - ((winnaar + 0.5) * slice);

    currentRotation +=
    (5 * 360) + target;

    wheel.style.transform =
    `rotate(${currentRotation}deg)`;

    setTimeout(function(){

        showOverlay();

    },5000);

}

function showOverlay(){

    winnerPlayer.innerHTML =
    "🎉 " +
    results[currentPlayerIndex].player;

    winnerTee.innerHTML =
    results[currentPlayerIndex].tee;

    overlay.style.display =
    "flex";

}

function nextPlayer(){

    overlay.style.display =
    "none";

    currentPlayerIndex++;

    if(currentPlayerIndex >= results.length){

        location.href =
        "resultaat.html";

        return;

    }

    showCurrentPlayer();

    spinButton.disabled = false;

}