let countersAmount = 0;

class Counter {
    constructor(id, incrementStep = 1) {
        this.id = id;
        this.incrementStep = incrementStep;
        this.counterValue = 0;
        this.sounds = {
            incrementSound: new Audio("./Sounds/button.mp3"),
            decrementSound: new Audio("./Sounds/reversed.mp3"),
            deleteSound: new Audio("./Sounds/papercrumble.mp3"),
            createSound: new Audio("./Sounds/pop.mp3")
        };
        this.countersDiv = document.getElementById("counters");
        this.countersDiv.appendChild(this.createCounterDiv());
        this.cloneAndPlay(this.sounds.createSound);
    }

    cloneAndPlay(audioFile) {
        let clone = audioFile.cloneNode();
        clone.volume = 0.1;
        clone.play();
    }

    handleClickEvent(input, display) {
        input.style.display = "inline-block";
        input.focus();
        display.style.display = "none";
    }

    handleNameEvents(input, display, event) {
        if (event.key === "Enter" || event.type === "blur") {
            if (input.value) {
                display.innerHTML = input.value;
            }
            input.style.display = "none";
            display.style.display = "inline-block";
        }
    }

    handleSizeEvents(input, display, event) {
        if (event.key === "Enter" || event.type === "blur") {
            this.incrementStep = parseInt(input.value);
            display.innerHTML = this.incrementStep;
            input.style.display = "none";
            display.style.display = "inline-block";
        }
    }

    createInputField(inputClass, displayClass, displayText) {
        let input = document.createElement("input");
        input.setAttribute("class", inputClass);
        input.style.display = "none";

        let display = document.createElement("span");
        display.setAttribute("class", displayClass);
        display.innerHTML = displayText;

        if (inputClass === "counter-name-input") {
            display.addEventListener("click", () => this.handleClickEvent(input, display));
            input.addEventListener("keyup", (event) => this.handleNameEvents(input, display, event));
            input.addEventListener("blur", () => this.handleNameEvents(input, display));
        } else {
            display.addEventListener("click", () => this.handleClickEvent(input, display));
            input.addEventListener("keyup", (event) => this.handleSizeEvents(input, display, event));
            input.addEventListener("blur", () => this.handleSizeEvents(input, display));
        }

        return [input, display];
    }

    createCounterDiv() {
        let counterDiv = document.createElement("div");
        counterDiv.setAttribute("id", "counter" + this.id);
        counterDiv.setAttribute("class", "counter");

        let [counterNameInput, counterNameDisplay] = this.createInputField("counter-name-input", "counter-name-display", "Counter " + this.id);
        let [incrementSizeInput, incrementSize] = this.createInputField("increment-size-input", "increment-size", this.incrementStep);

        let counterValue = document.createElement("span");
        counterValue.setAttribute("class", "counter-value");
        counterValue.innerHTML = "0";

        let decrementButton = this.createButton("decrement-btn counter-btn", "-", counterValue);
        let incrementButton = this.createButton("increment-btn counter-btn", "+", counterValue);

        let deleteButton = document.createElement("button");
        deleteButton.setAttribute("class", "delete-btn counter-btn");
        deleteButton.innerHTML = "🗑️";
        deleteButton.addEventListener("click", () => {
            this.cloneAndPlay(this.sounds.deleteSound);
            counterDiv.parentNode.removeChild(counterDiv);
        });

        counterDiv.append(counterNameDisplay, decrementButton, counterValue, incrementButton, incrementSize, incrementSizeInput, deleteButton);
        return counterDiv;
    }

    createButton(buttonClass, buttonValue, counterValue) {
        let button = document.createElement("button");
        button.setAttribute("class", buttonClass);
        button.innerHTML = buttonValue;

        if (buttonValue === "+") {
            button.addEventListener("click", () => {
                this.counterValue += this.incrementStep;
                counterValue.innerHTML = this.counterValue;
                this.cloneAndPlay(this.sounds.incrementSound);
            });
        } else {
            button.addEventListener("click", () => {
                this.counterValue -= this.incrementStep;
                counterValue.innerHTML = this.counterValue;
                this.cloneAndPlay(this.sounds.decrementSound);
            });
        }

        return button;
    }
}

function createCounters(numberOfCounters = 1, incrementStep = 1) {
    for (let i = 0; i < numberOfCounters; i++) {
        new Counter(countersAmount++, incrementStep);
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
    if (localStorage.getItem("DesignMode") === "Dark") {
        document.body.classList.toggle("dark-mode");
        sunEmoji.classList.toggle("hidden");
        moonEmoji.classList.remove("hidden");
    }
}

getMode();
