import { activeRound } from '../helpers/replicants.js';
import { addDots } from '../helpers/misc.js';
import gsap from '../../../node_modules/gsap/all.js';

activeRound.on("change", (newValue, oldValue) => {
    if(oldValue === undefined){
        changeTeamName(newValue.teamA.name, 'a');
        changeTeamName(newValue.teamB.name, 'b');
    } else {
        if (newValue.teamA.name !== oldValue.teamA.name){
            changeTeamName(newValue.teamA.name, 'a');
        }
        if (newValue.teamB.name !== oldValue.teamB.name){
            changeTeamName(newValue.teamB.name, 'b');
        }
    }
});

function changeTeamName(name, team){
    const tl = gsap.timeline();
    const elim = document.getElementById(`team-${team}-name`);

    tl.to(elim, {
        opacity: 0,
        duration: .25,
        ease: "power4.out",
        onComplete: function(){
            elim.setAttribute("text", addDots(name, 26));
        }
    })
    .to(elim, {
        opacity: 1,
        duration: .25,
        ease: "power4.in"
    });
}