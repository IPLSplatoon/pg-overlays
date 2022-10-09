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
            width: 55,
            display: "none"
        } , {
            width: 305,
            duration: 1,
            ease: "power4.out",
            display: "block"
        })
        .fromTo([".logo", ".info-bar"], {
            opacity: 0
        }, {
            opacity: 1,
            duration: .1,
            ease: "power1.out"
        }, "<")
        .fromTo(".teams-box", {
            opacity: 0
        }, {
            opacity: 1,
            duration: .1,
            ease: "power1.out"
        }, "<")
        .fromTo(".info-bar", {
            width: 0,
            display: "none"
        } , {
            width: 290,
            duration: 1,
            ease: "power4.out",
            display: "flex"
        }, "<+=.1");
        scoreboardTl.add(scoreboardShow);

    } else {

        const scoreboardHide = gsap.timeline();
        scoreboardTl.to(".teams-box", {
            width: 55,
            duration: .75,
            ease: "power4.in",
            display: "none"
        })
        .to(".info-bar", {
            width: 0,
            duration: .75,
            ease: "power4.in",
            display: "none"
        }, "<")
        .to([".teams-box", "info-bar"], {
            opacity: 0,
            duration: .1,
            ease: "power1.in",
            display: "none"
        }, "<+=0.65");
        scoreboardTl.add(scoreboardHide);

    }
}