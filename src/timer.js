"use strict";

let time = [];
let solvings_json = JSON.parse(localStorage.getItem("solvings"));
if (solvings_json === undefined || solvings_json === null) {
    solvings_json = {data: []};
}

function generateScramble() {
    const moves = ["U", "D", "L", "R", "F", "B"];
    const modifiers = ["", "'", "2"];
    const scramble = [];

    while (scramble.length < 20) {
        const move = moves[Math.floor(Math.random() * moves.length)];
        const modifier = modifiers[Math.floor(Math.random() * modifiers.length)];

        if (scramble.length > 0 && scramble[scramble.length - 1][0] === move) {
            continue;
        }

        scramble.push(move + modifier);
    }

    return scramble.join(" ");
}

function insertTime() {
    let normalised_time = [];
    for (let i = 0; i < 6; i++) {
        if (i === 2)
            normalised_time.push(":");
        else if (i === 4)
            normalised_time.push(".");
        if (i < 6 - time.length) {
            normalised_time.push("_");
        } else {
            normalised_time.push(time[i - 6 + time.length]);
        }
    }
    document.forms.solving.time.value = normalised_time.join("");
}

function getTime() {
    let normalised_time = [];
    for (let i = 0; i < 6; i++) {
        if (i < 6 - time.length) {
            normalised_time.push(0);
        } else {
            normalised_time.push(parseInt(time[i - 6 + time.length]));
        }
    }
    let minutes = normalised_time[0] * 10 + normalised_time[1];
    let seconds = normalised_time[2] * 10 + normalised_time[3];
    let milliseconds = normalised_time[4] * 10 + normalised_time[5];

    return [minutes, seconds, milliseconds];
}

function createTable() {
    let table = document.getElementById("solvings_table");
    for (let i = solvings_json.data.length - 1; i >= 0; i--) {
        let row = table.insertRow(1);

        let number = row.insertCell(0);
        let scramble = row.insertCell(1);
        let solving_time = row.insertCell(2);

        number.innerHTML = (i + 1).toString();
        scramble.innerHTML = solvings_json.data[i].scramble;
        solving_time.innerHTML = solvings_json.data[i].time;
    }
}

function deleteSolvings() {
    let table = document.getElementById("solvings_table");
    for (let i = 0; i < solvings_json.data.length; i++)
        table.deleteRow(1);
    solvings_json = {data: []};
    localStorage.setItem("solvings", JSON.stringify(solvings_json));
}

createTable();
document.getElementById("scramble").innerHTML = generateScramble();

document.forms.solving.addEventListener(
    "submit",
    function (event) {
        event.preventDefault();
        let time_data = getTime();
        if (!(time_data[0] < 60 && time_data[1] < 60)) {
            alert("Введите верное время")

            return;
        }
        solvings_json["data"].push({
            "time": document.forms.solving.time.value.replaceAll("_", "0"),
            "scramble": document.getElementById("scramble").innerHTML
        });
        localStorage.setItem("solvings", JSON.stringify(solvings_json));

        let table = document.getElementById("solvings_table");
        let row = table.insertRow(1);

        let number = row.insertCell(0);
        let scramble = row.insertCell(1);
        let solving_time = row.insertCell(2);

        number.innerHTML = solvings_json.data.length.toString();
        scramble.innerHTML = document.getElementById("scramble").innerHTML;
        solving_time.innerHTML = document.forms.solving.time.value.replaceAll("_", "0");

        time = [];
        insertTime();
        document.getElementById("scramble").innerHTML = generateScramble();
    }
);

document.forms.solving.time.addEventListener(
    "keydown",
    function (event) {
        event.preventDefault();
        const key = event.key;

        if (key === "Backspace" && time.length > 0) {
            time.pop();
            insertTime();
        }
        else if (key === "Enter" && time.length > 0) {
            document.forms.solving.solving_submit.click();
        }
        if (time.length === 6 || !/^\d$/.test(key))
            return

        time.push(key);
        insertTime();
    }
);
