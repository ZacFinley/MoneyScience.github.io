var globalBank = 200;

function getRandomNumber() {
    return Math.random();
}

function slotsSpin() {
    var slot1 = Math.floor(getRandomNumber()*10);
    var slot2 = Math.floor(getRandomNumber()*10);
    var slot3 = Math.floor(getRandomNumber()*10);
    if (globalBank <= 0){
        alert("You Have run out of money!");
    }
    else {
        globalBank -= 1;
        if ((slot1 === slot2) && (slot2 === slot3)){
            globalBank += 10;
        }
        else if (slot1 === slot3){
            globalBank += 5;
        }
        printGlobalBank();
        document.getElementById("slot1").innerHTML = slot1;
        document.getElementById("slot2").innerHTML = slot2;
        document.getElementById("slot3").innerHTML = slot3;
    }
}

function printGlobalBank() {
    if (globalBank > 0) {
        document.getElementById("globalBank").innerHTML = "Bank: $" + globalBank;
    }
    else {
        document.getElementById("globalBank").innerHTML = "Bank: BANKRUPT";
    }
}
