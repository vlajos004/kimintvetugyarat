const names = [
    "Sárkánygyümölcs",
    "Citrom",
    "Csoki",
    "Dinnye",
    "Banán",
    "Oreo",
    "Rágógumi",
    "Vattacukor"
];

const flavors = document.getElementById("flavors");

names.forEach((name, i) => {
    flavors.innerHTML += `
        <label>
            ${name}
            <input type="number" id="m${i}">
        </label>
    `;
});

function val(id) {
    return Number(document.getElementById(id).value) || 0;
}

// Görgő tiltása
document.querySelectorAll("input").forEach(input => {
    input.addEventListener("wheel", function (e) {
        e.preventDefault();
    }, { passive: false });
});

// ----------------------
// Korrekció gombok
// ----------------------

let correctionMode = "received";

const receivedBtn = document.getElementById("receivedBtn");
const takenBtn = document.getElementById("takenBtn");

receivedBtn.onclick = () => {

    correctionMode = "received";

    receivedBtn.classList.add("active");
    takenBtn.classList.remove("active");

};

takenBtn.onclick = () => {

    correctionMode = "taken";

    takenBtn.classList.add("active");
    receivedBtn.classList.remove("active");

};

// ----------------------

const expectedEl = document.getElementById("expected");
const actualEl = document.getElementById("actual");
const diffEl = document.getElementById("diff");
const result = document.getElementById("result");

document.getElementById("calc").onclick = () => {

    const yesterday = val("yesterdayTotal");

    let current = 0;

    for (let i = 0; i < 8; i++) {
        current += val("m" + i);
    }

    let extra = val("extra");

    const bags = val("bags");
    const bagGrams = bags * 2400;

    // Ha elvittek, akkor negatív korrekció
    if (correctionMode === "taken") {
        extra = -extra;
    }

    // Korrigált jelenlegi összsúly
    const correctedCurrent = current - extra + bagGrams;

    // Elvárt fogyás
    const expected =
        val("l") * 60 +
        val("xl") * 80 +
        val("xxl") * 100 +
        val("cs") * 240;

    // Valós fogyás
    // Valós fogyás
    const actual = (yesterday - (current - extra)) + bagGrams;

    // Eltérés
    const diff = actual - expected;

    // Poharak száma
    const cups =
        val("l") +
        val("xl") +
        val("xxl") +
        val("cs");

    // Átlag
    const avg = cups ? diff / cups : 0;

    // Színezéshez
    const avgAbs = Math.abs(avg);

    expectedEl.textContent = expected.toFixed(0) + " g";

    actualEl.textContent = actual.toFixed(0) + " g";

    diffEl.textContent =
        (diff > 0 ? "+" : "") +
        diff.toFixed(0) +
        " g";

    const avgEl = document.getElementById("avg");

    avgEl.textContent =
        (avg > 0 ? "+" : "") +
        avg.toFixed(2) +
        " g/pohár";

    avgEl.className = "";

if (avg < 2.2) {
    avgEl.classList.add("blue");
}
else if (avg < 2.8) {
    avgEl.classList.add("green");
}
else if (avg < 3.2) {
    avgEl.classList.add("yellow");
}
else {
    avgEl.classList.add("red");
}
    result.classList.remove("hidden");

    avgEl.scrollIntoView({
        behavior: "smooth"
    });

};
