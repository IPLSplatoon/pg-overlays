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

    document.getElementById("match-info").innerText = text;
}

function showScoreboard(show){
    if (show) {

        const scoreboardShow = gsap.timeline();

        scoreboardShow.fromTo(".teams-box", {
            width: 0,
            "box-shadow": "0px 0px 0px var(--indigo)",
            margin: 3,
            x: -7,
            y: 4,
            borderWidth: "0px"
        }, {
            width: 315,
            "box-shadow": "-7px 4px 0px var(--indigo)",
            margin: 0,
            x: 0,
            y: 0,
            borderWidth: "3px",
            duration: .75,
            ease: "power4.out",
            display: "block"
        })

        const infoShow = gsap.timeline();

        infoShow.fromTo(".logo", {
            opacity: 0,
            x: 40
        }, {
            opacity: 1,
            x: 0,
            duration: .3,
            ease: "power4.out"
        })
        .fromTo(".info-wrapper", {
            width: 0,
            "box-shadow": "0px 0px 0px var(--indigo)",
            y: 4,
            x: -7 + 316,
            borderWidth: "0px"
        }, {
            opacity: 1,
            width: 310,
            "box-shadow": "-4px 4px 0px var(--indigo)",
            y: 0,
            x: 0,
            borderWidth: "3px",
            duration: .75,
            ease: "power4.out"
        })

        scoreboardTl.add(scoreboardShow);
        scoreboardTl.add(infoShow, "<+=.3");

    } else {

        const scoreboardHide = gsap.timeline();

        scoreboardHide.to(".teams-box", {
            width: 0,
            "box-shadow": "0px 0px 0px var(--indigo)",
            borderWidth: "0px",
            margin: 3,
            duration: .75,
            ease: "power4.in",
            display: "none"
        }, "<+=.15");

        const infoHide = gsap.timeline();

        infoHide.to(".info-wrapper", {
            width: 0,
            "box-shadow": "0px 0px 0px var(--indigo)",
            borderWidth: "0px",
            duration: .75,
            x: -7 + 316,
            y: 4,
            ease: "power4.in"
        })
        .to(".logo", {
            opacity: 0,
            x: 40,
            duration: .3,
            ease: "power4.out"
        })

        scoreboardTl.add(scoreboardHide);
        scoreboardTl.add(infoHide, "<");

    }
}