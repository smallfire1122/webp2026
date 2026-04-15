var container = document.getElementById("container");
var isGameOver = false;
var counter = 0;

window.onload = function () {
    startGame();
};

window.addEventListener("keyup", function (e) {
    var key = e.key.toLowerCase();

    if (isGameOver) {
        if (e.key === "Enter") {
            startGame();
        }
        return;
    }

    if (!(key.length === 1 && key >= "a" && key <= "z")) {
        return;
    }

    var firstone = container.textContent.substring(0, 1);

    if (key === firstone) {
        container.textContent = container.textContent.substring(1, container.textContent.length);
        counter = 0;
    } else {
        container.textContent += key;

        if (counter++ >= 2) {
            container.textContent += add_new_chars(6, false);
            counter = 0;
        }
    }

    container.textContent += add_new_chars(3);

    renderFirstChar();
});

function startGame() {
    container.textContent = add_new_chars(3);
    isGameOver = false;
    counter = 0;
    renderFirstChar();
}

function add_new_chars(x, b = true) {
    var n = x;

    if (b) {
        n = Math.floor(Math.random() * x) + 1;
    }

    var str = "";

    for (var i = 0; i < n; i++) {
        str += randomChar();
    }

    return str;
}

function randomChar() {
    var code = Math.floor(Math.random() * 26) + 97;
    return String.fromCharCode(code);
}

function renderFirstChar() {
    if (isGameOver) {
        return;
    }

    var str = container.textContent;

    if (str.length === 0) {
        return;
    }

    var first = str.substring(0, 1);
    var rest = str.substring(1);

    container.innerHTML = "<span style='color:red; font-size:60px; font-weight:bold;'>" + first + "</span>" + rest;
}