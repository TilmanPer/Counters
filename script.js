function cloneAndPlay(audioFile) {
    var clone = audioFile.cloneNode();
    clone.volume = 0.1;
    clone.play();
}

let countersAmount = 1;
// Function to create the counters
function createCounters(numberOfCounters, incrementStep) {

    numberOfCounters = (!numberOfCounters) ? 1 : numberOfCounters;
    incrementStep = (!incrementStep) ? 1 : incrementStep;

    let incrementSound = new Audio("./Sounds/button.mp3");
    let decrementSound = new Audio("./Sounds/reversed.mp3");
    let deleteSound = new Audio("./Sounds/papercrumble.mp3");
    let createSound = new Audio("./Sounds/pop.mp3");
    cloneAndPlay(createSound);

    let countersDiv = document.getElementById("counters");
    let newCountersAmount = countersAmount + parseInt(numberOfCounters);

    for (i = countersAmount; i < newCountersAmount; i++, countersAmount++) {
        console.log(newCountersAmount);
        // Create the counter elements
        let counterDiv = document.createElement("div");
        counterDiv.setAttribute("id", "counter" + i);
        counterDiv.setAttribute("class", "counter");

        // Create the counter name elements
        let counterNameDiv = document.createElement("div");
        counterNameDiv.setAttribute("class", "counter-name");
        let counterNameLabel = document.createElement("label");
        let counterNameInput = document.createElement("input");
        counterNameInput.setAttribute("class", "counter-name-input");
        counterNameInput.style.display = "none";
        let counterNameDisplay = document.createElement("span");
        counterNameDisplay.setAttribute("class", "counter-name-display");
        counterNameDisplay.innerHTML = "Counter " + i;
        // Add event listeners for counter name
        counterNameDisplay.addEventListener("click", function () {
            counterNameInput.style.display = "inline-block";
            counterNameInput.focus();
            counterNameDisplay.style.display = "none";
        });
        counterNameInput.addEventListener("keyup", function (event) {
            if (event.key === "Enter") {
                counterNameDisplay.innerHTML = counterNameInput.value;
                counterNameInput.style.display = "none";
                counterNameDisplay.style.display = "inline-block";
            }
        });
        counterNameInput.addEventListener("blur", function () {
            if (counterNameInput.value) {
                counterNameDisplay.innerHTML = counterNameInput.value;
            }
            counterNameInput.style.display = "none";
            counterNameDisplay.style.display = "inline-block";
        });

        let decrementButton = document.createElement("button");
        decrementButton.setAttribute("id", "decrement" + i);
        decrementButton.setAttribute("class", "decrement-btn counter-btn");
        decrementButton.innerHTML = "-";

        let counterValue = document.createElement("span");
        counterValue.setAttribute("id", "value" + i);
        counterValue.setAttribute("class", "counter-value");
        counterValue.innerHTML = "0";

        let incrementButton = document.createElement("button");
        incrementButton.setAttribute("id", "increment" + i);
        incrementButton.setAttribute("class", "counter-btn increment-btn");
        incrementButton.innerHTML = "+";

        let incrementSizeInput = document.createElement("input");
        incrementSizeInput.setAttribute("type", "number");
        incrementSizeInput.setAttribute("class", "increment-size-input");
        incrementSizeInput.value = incrementStep;
        incrementSizeInput.style.display = "none";

        let incrementSize = document.createElement("span");
        incrementSize.setAttribute("class", "increment-size");
        incrementSize.innerHTML = incrementStep;
        incrementSize.addEventListener("click", function () {
            incrementSizeInput.style.display = "inline-block";
            incrementSizeInput.focus();
            incrementSize.style.display = "none";
        });
        incrementSizeInput.addEventListener("keyup", function (event) {
            if (event.key === "Enter") {
                incrementStep = incrementSizeInput.value;
                incrementSize.innerHTML = incrementStep;
                incrementSizeInput.style.display = "none";
                incrementSize.style.display = "inline-block";
            }
        });
        incrementSizeInput.addEventListener("blur", function () {
            incrementStep = incrementSizeInput.value;
            incrementSize.innerHTML = incrementStep;
            incrementSizeInput.style.display = "none";
            incrementSize.style.display = "inline-block";
        });

        let deleteButton = document.createElement("button");
        deleteButton.setAttribute("class", "counter-btn delete-btn");
        deleteButton.innerHTML = "🗑️";
        deleteButton.addEventListener("click", function () {
            cloneAndPlay(deleteSound);
            countersDiv.removeChild(counterDiv);
        });

        // Append the elements to the counters div
        counterNameDiv.appendChild(counterNameLabel);
        counterNameDiv.appendChild(counterNameInput);
        counterNameDiv.appendChild(counterNameDisplay);
        counterDiv.appendChild(counterNameDiv);
        counterDiv.appendChild(decrementButton);
        counterDiv.appendChild(counterValue);
        counterDiv.appendChild(incrementButton);
        counterDiv.appendChild(incrementSize);
        counterDiv.appendChild(incrementSizeInput);
        counterDiv.appendChild(deleteButton);
        countersDiv.appendChild(counterDiv);

        // Add event listeners to the buttons
        decrementButton.addEventListener("click", function () {
            let currentValue = parseInt(counterValue.innerHTML);
            counterValue.innerHTML = currentValue - incrementStep;
            cloneAndPlay(decrementSound);
        });
        incrementButton.addEventListener("click", function () {
            let currentValue = parseInt(counterValue.innerHTML);
            counterValue.innerHTML = parseInt(currentValue) + parseInt(incrementStep);
            cloneAndPlay(incrementSound);
        });
    }
}

createCounters(1, 5);

const sunEmoji = document.querySelector("#sun-emoji");
const moonEmoji = document.querySelector("#moon-emoji");

sunEmoji.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("DesignMode", "Dark");
    sunEmoji.classList.toggle("hidden");
    moonEmoji.classList.remove("hidden");
});

moonEmoji.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("DesignMode", "Light");
    sunEmoji.classList.remove("hidden");
    moonEmoji.classList.toggle("hidden");
});

function getMode() {
    if (localStorage.getItem("DesignMode") == "Dark") {
        document.body.classList.toggle("dark-mode");
        sunEmoji.classList.toggle("hidden");
        moonEmoji.classList.remove("hidden");
    }
}

getMode();