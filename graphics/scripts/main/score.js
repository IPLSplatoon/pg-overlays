import { activeRound, scoreboardData } from '../helpers/replicants.js';
import gsap from '../../../node_modules/gsap/all.js';

const flavorTextElim = document.getElementById("flavor-text");
const scoreboardTl = gsap.timeline();

NodeCG.waitForReplicants(activeRound).then(() => {
    activeRound.on("change", (newValue, oldValue) => {
        if (oldValue === undefined){ 
            setScore(newValue.teamA.score, newValue.teamB.score);
        } else if (newValue.teamA.score !== oldValue.teamA.score 
                || newValue.teamB.score !== oldValue.teamB.score){
            setScore(newValue.teamA.score, newValue.teamB.score);
        }
    });
});

NodeCG.waitForReplicants(scoreboardData).then(() => {
    scoreboardData.on("change", (newValue, oldValue) => {
        if (oldValue === undefined){
            updateFlavorText(newValue.flavorText);
            showScoreboard(newValue.isVisible);
        } else {
            if (newValue.flavorText !== oldValue.flavorText){
                updateFlavorText(newValue.flavorText);
            }
            if (newValue.isVisible !== oldValue.isVisible){
                showScoreboard(newValue.isVisible);
            }
        }
    });
});

function setScore(teamAScore, teamBScore) {
    const teamAElim = document.getElementById("team-a-score");
    const teamBElim = document.getElementById("team-b-score");

    teamAElim.innerText = teamAScore;
    teamBElim.innerHTML = teamBScore;
}

function updateFlavorText(text){
    const tl = gsap.timeline();
    tl.to(flavorTextElim, {
        opacity: 0,
        duration: .25,
        ease: "power4.out",
        onComplete: function(){
            flavorTextElim.setAttribute("text", text);
        }
    })
    .to(flavorTextElim, {
        opacity: 1,
        duration: .25,
        ease: "power4.in"
    });
}

function showScoreboard(show){
    if (show) {

        const scoreboardShow = gsap.timeline();

        scoreboardShow.fromTo(".teams-box", {
            width: 0,
            "box-shadow": "0px 0px 0px var(--indigo)",
            borderWidth: "0px"
        }, {
            width: 305,
            "box-shadow": "-7px 4px 0px var(--indigo)",
            borderWidth: "3px",
            duration: .75,
            ease: "power4.out",
            display: "block"
        })

        .fromTo(".info-bar", {
            width: 0,
            "box-shadow": "0px 0px 0px var(--indigo)",
            borderWidth: "0px"
        }, {
            width: 290,
            "box-shadow": "-7px 4px 0px var(--indigo)",
            borderWidth: "3px",
            duration: .75,
            ease: "power4.out",
            display: "flex"
        }, "<+=.15")

        .fromTo(".logo", {
            scale: .65
        }, {
            scale: 1,
            duration: .4,
            ease: "power4.out"
        }, "<");

        scoreboardTl.add(scoreboardShow);

    } else {

        const scoreboardHide = gsap.timeline();
        
        scoreboardHide.to(".info-bar", {
            width: 0,
            "box-shadow": "0px 0px 0px var(--indigo)",
            borderWidth: "0px",
            duration: .75,
            ease: "power4.in",
            display: "none"
        })

        .to(".teams-box", {
            width: 0,
            "box-shadow": "0px 0px 0px var(--indigo)",
            borderWidth: "0px",
            duration: .75,
            ease: "power4.in",
            display: "none"
        }, "<+=.15")
        
        .to(".logo", {
            scale: .65,
            duration: .4,
            ease: "power4.in"
        }, "<+=.25");

        scoreboardTl.add(scoreboardHide);

    }
}