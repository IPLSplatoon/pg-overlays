import gsap from '../../../node_modules/gsap/all.js';
import { mainFlavorText, nextRoundTime, nextRound, assetPaths } from '../helpers/replicants.js';
import { addDots } from '../helpers/misc.js';
import { getStageImagePath } from '../helpers/stages.js';

mainFlavorText.on('change', newValue => {
    changeMainFlavorText(newValue)
});

nextRound.on('change', (newValue, oldValue) => {
    if (oldValue === undefined || newValue.showOnStream !== oldValue.showOnStream){
        showUpNext(newValue.showOnStream);
    } else if (newValue.teamA.name !== oldValue.teamA.name
               || newValue.teamB.name !== oldValue.teamB.name
               || roundsChanged(oldValue.games, newValue.games)) {
        setNextRound(newValue);
    }
});

NodeCG.waitForReplicants(nextRoundTime).then(() => {
    nextRoundTime.on('change', (newValue, oldValue) => {
        if (oldValue === undefined || newValue.isVisible !== oldValue.isVisible){
            toggleTimer(newValue.isVisible);
        } else if (newValue.startTime !== oldValue.startTime){
            updateTimer();
        }
    });    

    updateTimer(nextRoundTime.value);
    setInterval(updateTimer, 15000); //every 15 seconds
});

NodeCG.waitForReplicants(nextRound, assetPaths).then(() => {
    setNextRound(nextRound.value);
});

function toggleTimer(show){
    gsap.to("#next-round-timer", {
        opacity: show ? 1 : 0,
        duration: .25,
        ease: show ? "power4.in" : "power4.out"
    });
}

function updateTimer(){
    const timerText = document.getElementById("next-round-timer");
    const timerTimestamp = new Date(nextRoundTime.value.startTime).valueOf();
    const currentTimestamp = new Date().valueOf();
    const diff = Math.round(((timerTimestamp - currentTimestamp) / 1000) / 60);

    var currentText = timerText.getAttribute("text");

    var text;
    if (diff >= 1){
        text = `In ~${diff} Minute${diff == 1 ? "" : "s"}`;
    } else {
        text = "Soon!"
    }

    if (currentText !== text){
        if (nextRoundTime.value.isVisible){
            const tl = gsap.timeline();
            tl.to(timerText, {
                opacity: 0,
                duration: .25,
                ease: "power4.out",
                onComplete: function(){
                    timerText.setAttribute("text", text);
                }
            })
            .to(timerText, {
                opacity: 1,
                duration: .25,
                ease: "power4.in"
            });
        } else {
            timerText.setAttribute("text", text);
        }
    }
}

function changeMainFlavorText(text){
    const elim = document.getElementById("main-scene-flavor-text");
    const tl = gsap.timeline();

    tl.to(elim, {
        opacity: 0,
        duration: .25,
        ease: "power4.out",
        onComplete: function(){
            elim.setAttribute("text", text);
        }
    })
    .to(elim, {
        opacity: 1,
        duration: .25,
        ease: "power4.in"
    });
}

function roundsChanged(oldRounds, newRounds){
    if (oldRounds.length !== newRounds.length){
        return true;
    }
    for (var i = 0; i < oldRounds.length; i++){
        if (newRounds[i].stage !== oldRounds[i].stage || newRounds[i].mode !== oldRounds[i].mode){
            return true;
        }
    }
    return false;
}

const upNextTl = gsap.timeline();

function showUpNext(show){
    const upNextWrapper = document.getElementById("up-next-wrapper");

    if (show){
        upNextTl.fromTo(upNextWrapper, {
            height: 0,
            marginBottom: 0,
            marginTop: 0,
            "box-shadow": "0px 0px 0px var(--indigo)",
            outlineWidth: 0,
            display: "grid"
        }, {
            height: "auto",
            marginBottom: 25,
            marginTop: 25,
            "box-shadow": "-15px 15px 0px var(--indigo)",
            outlineWidth: 3,
            duration: .75,
            ease: "power4.inOut",
        });
    } else {
        const height = upNextWrapper.offsetHeight+1;
        upNextTl.fromTo(upNextWrapper, {
            height: height,
            marginBottom: 25,
            marginTop: 25,
            "box-shadow": "-15px 15px 0px var(--indigo)",
            outlineWidth: 3
        }, {
            height: 0,
            duration: .75,
            marginBottom: 0,
            marginTop: 0,
            "box-shadow": "0px 0px 0px var(--indigo)",
            outlineWidth: 0,
            ease: "power4.inOut",
            display: "none"
        });
    }
}

function setNextRound(round){
    const wrapper = document.getElementById("up-next-wrapper");
    const tl = gsap.timeline();

    if (nextRound.value.showOnStream){
        tl.to(wrapper, {
            opacity: 0,
            duration: .25,
            ease: "power4.out",
            onComplete: function(){
                changeTeams(round);
            }
        })
        .to(wrapper, {
            opacity: 1,
            duration: .25,
            ease: "power4.in"
        });
    } else {
        changeTeams(round);
    }
}

function changeTeams(round){
    const stageWrapper = document.getElementById("next-stage-wrapper");
    const nextTeams = document.getElementById("next-teams");

    nextTeams.setAttribute("text", `${addDots(round.teamA.name)} vs ${addDots(round.teamB.name)}`)

    const oldElims = stageWrapper.querySelectorAll(".stage");
    for (var i = 0; i < oldElims.length; i++){
        oldElims[i].remove();
    }

    const timer = document.getElementById("next-round-timer");
    for (var i = 0; i < Math.min(round.games.length, 3); i++){
        stageWrapper.insertBefore(getNextMatchMapElement(round.games[i].stage, round.games[i].mode), timer);
    }
    if (round.games.length > 3){
        const cap = document.createElement("div");
        cap.classList.add("stage", "cap");
        cap.innerText = "+" + (round.games.length - 3).toString();

        stageWrapper.insertBefore(cap, timer);
    }
}

function getNextMatchMapElement(map, mode){
    const stage = document.createElement("div");
    stage.classList.add("stage");

    const stageMode = document.createElement("div");
    stageMode.classList.add("stage-mode");
    
    switch(mode){
        case "Turf War": stageMode.innerText = "TW"; break;
        case "Splat Zones": stageMode.innerText = "SZ"; break;
        case "Tower Control": stageMode.innerText = "TC"; break;
        case "Rainmaker": stageMode.innerText = "RM"; break;
        case "Clam Blitz": stageMode.innerText = "CB"; break;
    }

    if (stageMode.innerText !== ""){
        stage.appendChild(stageMode);
        stage.style.background = `url('${getStageImagePath(map)}')`;
    } else { //assume counterpick
        stage.style.fontSize = "28px"
        stage.innerHTML = "&nbsp;Counterpick";
        stage.style.background = "var(--purple)";
    }

    return stage;
}