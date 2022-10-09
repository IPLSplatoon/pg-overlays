import { activeRound } from '../helpers/replicants.js';
import { mapNameToImagePath } from "../helpers/constants.js";
import { addDots } from '../helpers/misc.js';
import gsap from '../../../node_modules/gsap/all.js';


NodeCG.waitForReplicants(activeRound).then(() => {
    activeRound.on("change", (newValue, oldValue) => {
        if (oldValue === undefined || stagesChanged(oldValue.games, newValue.games)){ 
            setStages(newValue);
        } else if (newValue.teamA.score !== oldValue.teamA.score || newValue.teamB.score !== oldValue.teamB.score){
            updateScores(newValue);
        }
    });
});

function stagesChanged(oldGames, newGames) {
    if (oldGames.length !== newGames.length){
        return true;
    }

    for (var i = 0; i < oldGames.length; i++){
        if (newGames[i].stage !== oldGames[i].stage
            || newGames[i].mode !== oldGames[i].mode){
            return true;
        }
    }

    return false;
}

function setStages(round){
    const games = round.games;
    const wrapper = document.getElementById("stage-wrapper");
    const tl = gsap.timeline();

    tl.to(wrapper, {
        opacity: 0,
        ease: "power4.in",
        duration: .25,
        onComplete: function(){
            wrapper.innerHTML = "";
            for (var i = 0; i < games.length; i++){
                const stage = getStageElement(games[i].stage, games[i].mode, games.length);

                switch(games.length){
                    case 3:
                    case 5:
                        wrapper.style.width = "1400px";
                        break;
                    case 7:
                        wrapper.style.width = "1770px"

                }

                wrapper.appendChild(stage);
            }

            updateScores(round);
        }
    })
    .to(wrapper, {
        opacity: 1,
        ease: "power4.out",
        duration: .25
    }, "+=.25");
}

function updateScores(round){
    const wrapper = document.getElementById("stage-wrapper");
    const stageElims = wrapper.children;
    const games = round.games;
    const alphaName = round.teamA.name;
    const bravoName = round.teamB.name;

    for (var i = 0; i < games.length; i++){
        if (stageElims[i] === undefined){
            continue;
        }
        const winnerElim = stageElims[i].querySelector(".winner");

        stageElims[i].classList.remove("next");

        if (stageElims[i].classList.contains("finished") && games[i].winner == "none"){

            winnerElim.innerText = "";
            stageElims[i].classList.remove("finished");

        } else if (games[i].winner !== "none") {

            switch(games[i].winner){
                case "alpha":
                    winnerElim.innerText = addDots(alphaName);
                    break;
                case "bravo":
                    winnerElim.innerText = addDots(bravoName);
            }
            stageElims[i].classList.add("finished");
        }
    }

    for (var i = 0; i < games.length; i++){
        if (games[i].winner === "none"){
            stageElims[i].classList.add("next");
            break;
        }
    }
}

function getStageElement(map, mode, numGames){
    const element = document.createElement("div");
    element.classList.add("content-box", "stage");

    const image = document.createElement("img");
    image.src = `./assets/stages/${mapNameToImagePath[map]}`;
    element.appendChild(image);

    const winner = document.createElement("div");
    winner.classList.add("winner");
    element.appendChild(winner);

    const info = document.createElement("div");
    info.classList.add("info");

    const modeName = document.createElement("div");
    modeName.classList.add("mode");
    modeName.innerText = mode;
    info.appendChild(modeName);

    const mapName = document.createElement("div");
    mapName.classList.add("map");
    const mapSplit = map.split(" ");
    var fittedTexts = [];
    for(var i = 0; i < mapSplit.length; i++){
        const fittedText = document.createElement("fitted-text");
        fittedText.setAttribute("text", mapSplit[i]);
        fittedTexts.push(fittedText);
        mapName.appendChild(fittedText);
    }
    info.appendChild(mapName);

    element.appendChild(info);

    switch(numGames){
        case 3:
            info.style.fontSize = "1em"
            element.style.width = "436px";
            for (var i = 0; i < fittedTexts.length; i++){
                fittedTexts[i].setAttribute("max-width", 436-12-12);
            }
            break;
        case 5:
            info.style.fontSize = "1em"
            element.style.width = "245px";
            for (var i = 0; i < fittedTexts.length; i++){
                fittedTexts[i].setAttribute("max-width", 245-12-12);
            }
            break;
        case 7:
            info.style.fontSize = ".9em"
            element.style.width = "220px";
            for (var i = 0; i < fittedTexts.length; i++){
                fittedTexts[i].setAttribute("max-width", 220-12-12);
            }
    }

    return element;
}