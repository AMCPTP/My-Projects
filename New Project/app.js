// ==========================================
// Baccarat AI Analyzer
// Version 1.0
// Main Controller
// ==========================================

const history = [];
const undoStack = [];

// ----------------------------
// DOM
// ----------------------------

const playerBtn = document.getElementById("playerBtn");
const bankerBtn = document.getElementById("bankerBtn");
const tieBtn = document.getElementById("tieBtn");

const undoBtn = document.getElementById("undoBtn");
const resetBtn = document.getElementById("resetBtn");

const playerCount = document.getElementById("playerCount");
const bankerCount = document.getElementById("bankerCount");
const tieCount = document.getElementById("tieCount");
const totalCount = document.getElementById("totalCount");

const historyList = document.getElementById("historyList");
const beadPlate = document.getElementById("beadPlate");
const systemLog = document.getElementById("systemLog");

const recommendation = document.getElementById("recommendation");
const confidence = document.getElementById("confidence");
const risk = document.getElementById("risk");

// ----------------------------

playerBtn.onclick = () => addResult("P");
bankerBtn.onclick = () => addResult("B");
tieBtn.onclick = () => addResult("T");

undoBtn.onclick = undo;
resetBtn.onclick = reset;

// ----------------------------

load();

render();

// ==========================================

function addResult(result){

    history.push(result);

    undoStack.length = 0;

    save();

    render();

    log("ADD : " + result);

        updateBigRoad(history);

}

// ==========================================

function undo(){

    if(history.length===0) return;

    undoStack.push(history.pop());

    save();

    render();

    log("UNDO");

}

// ==========================================

function reset(){

    if(!confirm("Reset all data ?"))
        return;

    history.length=0;

    undoStack.length=0;

    save();

    render();

    log("RESET");

}

// ==========================================

function render(){

    renderStatistic();

    renderHistory();

    renderBead();

    analyze();

}

// ==========================================

function renderStatistic(){

    let p=0;
    let b=0;
    let t=0;

    history.forEach(x=>{

        if(x==="P") p++;

        if(x==="B") b++;

        if(x==="T") t++;

    });

    playerCount.textContent=p;
    bankerCount.textContent=b;
    tieCount.textContent=t;
    totalCount.textContent=history.length;

}

// ==========================================

function renderHistory(){

    historyList.innerHTML="";

    history.forEach(item=>{

        const div=document.createElement("div");

        div.classList.add("history-item");

        if(item==="P")
            div.classList.add("history-player");

        if(item==="B")
            div.classList.add("history-banker");

        if(item==="T")
            div.classList.add("history-tie");

        div.textContent=item;

        historyList.appendChild(div);

    });

}

// ==========================================

function renderBead(){

    beadPlate.innerHTML="";

    history.forEach(item=>{

        const cell=document.createElement("div");

        cell.classList.add("cell");

        if(item==="P")
            cell.classList.add("player-cell");

        if(item==="B")
            cell.classList.add("banker-cell");

        if(item==="T")
            cell.classList.add("tie-cell");

        cell.textContent=item;

        beadPlate.appendChild(cell);

    });

}

// ==========================================

function analyze(){

    recommendation.innerHTML="WAIT";

    confidence.innerHTML="Confidence : 0%";

    risk.innerHTML="Risk : -";

}

// ==========================================

function log(text){

    const time=new Date().toLocaleTimeString();

    systemLog.value+=`[${time}] ${text}\n`;

    systemLog.scrollTop=systemLog.scrollHeight;

}

// ==========================================

function save(){

    localStorage.setItem(

        "BACCARAT_HISTORY",

        JSON.stringify(history)

    );

}

// ==========================================

function load(){

    const data=localStorage.getItem(

        "BACCARAT_HISTORY"

    );

    if(!data) return;

    const arr=JSON.parse(data);

    arr.forEach(x=>history.push(x));

}