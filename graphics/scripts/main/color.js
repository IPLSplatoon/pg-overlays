import { activeRound } from '../helpers/replicants.js';
import gsap from '../../../node_modules/gsap/all.js';

NodeCG.waitForReplicants(activeRound).then(() => {
    activeRound.on("change", (newValue, oldValue) => {
        if (oldValue === undefined){
            changeColor(newValue.teamA.color, 'a');
            changeColor(newValue.teamB.color, 'b');
        } else {
            if (newValue.teamA.color !== oldValue.teamA.color){
                changeColor(newValue.teamA.color, 'a');
            }
            if (newValue.teamB.color !== oldValue.teamB.color){
                changeColor(newValue.teamB.color, 'b');
            }
        }
    });
});

function changeColor(hex, team) {
    const elim = document.getElementById(`score-wrapper-${team}`);
    const text = document.getElementById(`team-${team}-score`);

    gsap.to(elim, {
        background: hex,
        duration: .25,
        ease: "power4.inOut"
    });

    gsap.to(text, {
        color: determineTextColor(hex),
        duration: .25,
        ease: "power4.inOut"
    });
}

function determineTextColor(hex){
    const color = (hex.charAt(0) === '#') ? hex.substring(1, 7) : hex;
    const r = parseInt(color.substring(0, 2), 16);
    const g = parseInt(color.substring(2, 4), 16);
    const b = parseInt(color.substring(4, 6), 16);
    return (((r * 0.299) + (g * 0.587) + (b * 0.114)) > 180) ? "#000000" : "#FFFFFF";
}