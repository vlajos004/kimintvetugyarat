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

// Egérgörgő tiltása
document.querySelectorAll("input").forEach(input => {
    input.addEventListener("wheel", function (e) {
        e.preventDefault();
    }, { passive: false });
});

const expectedEl = document.getElementById("expected");
const actualEl = document.getElementById("actual");
const diffEl = document.getElementById("diff");
const result = document.getElementById("result");

document.getElementById("calc").onclick = () => {

    // Tegnap esti összsúly
    const yesterday = val("yesterdayTotal");

    // Aktuális összsúly
    let current = 0;

    for (let i = 0; i < 8; i++) {
        current += val("m" + i);
    }

    // Korrekció
    let extra = val("extra");

    const mode = document.querySelector(
        'input[name="extraType"]:checked'
    ).value;

    // Ha elvittek, akkor negatív
    if (mode === "taken") {
        extra = -extra;
    }

    // Valós jelenlegi összsúly
    const correctedCurrent = current - extra;

    // Elvárt fogyás
    const expected =
        val("l") * 60 +
        val("xl") * 80 +
        val("xxl") * 100 +
        val("cs") * 240;

    // Valós fogyás
    const actual = yesterday - correctedCurrent;

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

    // Színezéshez abszolút érték
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

    if (avgAbs < 1.5) {
        avgEl.classList.add("pink");
    }
    else if (avgAbs < 2.2) {
        avgEl.classList.add("blue");
    }
    else if (avgAbs < 2.8) {
        avgEl.classList.add("green");
    }
    else if (avgAbs < 3.2) {
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
