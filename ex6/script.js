var container = document.getElementById("container");
var isGameOver = false;

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

    var str = container.textContent;

    if (!(key.length === 1 && key >= "a" && key <= "z")) {
        return;
    }

    if (key === str.charAt(0)) {
        var newStr = str.substring(1);

        if (newStr.length === 0) {
            container.textContent = "全對 按 Enter 重新開始";
            isGameOver = true;
        } else {
            container.textContent = newStr;
        }
    }

    else {
        add_new_chars();
    }
});

function startGame() {
    container.textContent = randomString(10, 15);
    isGameOver = false;
}

function add_new_chars() {
    container.textContent = container.textContent + randomString(1, 3);
}

function randomString(min, max) {
    var n = Math.floor(Math.random() * (max - min + 1)) + min;
    var s = "";

    for (var i = 0; i < n; i++) {
        s = s + randomChar();
    }

    return s;
}

function randomChar() {
    var code = Math.floor(Math.random() * 26) + 97;
    return String.fromCharCode(code);
}