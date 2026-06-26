const checkboxes =
document.querySelectorAll("input[type='checkbox']");

const startButton =
document.getElementById("startButton");

checkboxes.forEach(function(checkbox){

    checkbox.addEventListener("change", updateSelection);

});

function updateSelection(){

    const selectedTees = [];

    checkboxes.forEach(function(checkbox){

        if(checkbox.checked){

            selectedTees.push(checkbox.value);

        }

    });

    startButton.disabled = selectedTees.length < 2;

}

startButton.addEventListener("click", startGame);

function startGame(){

    const selectedTees = [];

    checkboxes.forEach(function(checkbox){

        if(checkbox.checked){

            selectedTees.push(checkbox.value);

        }

    });

    localStorage.setItem(
        "tees",
        JSON.stringify(selectedTees)
    );

    location.href = "draaien.html";

}