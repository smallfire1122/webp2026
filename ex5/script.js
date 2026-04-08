var count = 1;

function addfunction() {
    var btn = document.createElement("BUTTON");
    btn.innerHTML = "CLICK ME (" + count + ")";
    btn.setAttribute("id", "btn_" + count);
    btn.setAttribute("class", "btn btn-outline-danger");
    document.body.appendChild(btn);
    count++;
}

function delfunction() {
    if (count === 1) {
        return;
    }

    count--;
    var btn = document.getElementById("btn_" + count);
    document.body.removeChild(btn);
}