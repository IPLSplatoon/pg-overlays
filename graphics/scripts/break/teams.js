import { activeRound } from '../helpers/replicants.js';
import { addDots } from '../helpers/misc.js';
import gsap from '../../../node_modules/gsap/all.js';

NodeCG.waitForReplicants(activeRound).then(() => {
    activeRound.on("change", (newValue, oldValue) => {

        if (oldValue === undefined){
            setTeamName(newValue.teamA.name, 'a');
            setTeamName(newValue.teamB.name, 'b');
            setTeamPlayers(newValue.teamA.players, 'a');
            setTeamPlayers(newValue.teamB.players, 'b');
            setTeamImage(newValue.teamA.logoUrl, 'a');
            setTeamImage(newValue.teamB.logoUrl, 'b');
            setMatchName(newValue.match.name, newValue.games.length);

        } else {
            if (newValue.teamA.name !== oldValue.teamA.name){
                setTeamName(newValue.teamA.name, 'a');
                setTeamPlayers(newValue.teamA.players, 'a');
                setTeamImage(newValue.teamA.logoUrl, 'a');
            }
            if (newValue.teamB.name !== oldValue.teamB.name){
                setTeamName(newValue.teamB.name, 'b');
                setTeamPlayers(newValue.teamB.players, 'b');
                setTeamImage(newValue.teamB.logoUrl, 'b');
            }

            if (newValue.teamA.showLogo !== oldValue.teamA.showLogo){
                setTeamImage(newValue.teamA.showLogo ? newValue.teamA.logoUrl : "", 'a');
            }
            if (newValue.teamB.showLogo !== oldValue.teamB.showLogo){
                setTeamImage(newValue.teamB.showLogo ? newValue.teamB.logoUrl : "", 'b');
            }

            if (newValue.match.name !== oldValue.match.name || newValue.games.length !== oldValue.games.length){
                setMatchName(newValue.match.name, newValue.games.length);
            }
        }
    });
});

function setTeamName(name, team){
    const elim = document.getElementById(`team-${team}-name`);
    const tl = gsap.timeline();

    tl.to(elim, {
        opacity: 0,
        duration: .5,
        ease: "power4.out",
        onComplete: function(){
            elim.setAttribute("text", addDots(name));
        }
    })
    .to(elim, {
        opacity: 1,
        duration: .5,
        ease: "power4.in"
    });
}

function setTeamPlayers(players, team){
    const elim = document.getElementById(`team-${team}-roster`);
    const tl = gsap.timeline();

    function changeNames(){
        elim.innerHTML = "";

        for (var i = 0; i < players.length; i++){
            const child = document.createElement("fitted-text");
            child.setAttribute("max-width", "490");
            child.setAttribute("text", players[i].name);
            elim.appendChild(child);
        }
    }

    if (elim.style.opacity == 0){
        changeNames();
    } else {
        tl.to(elim, {
            opacity: 0,
            duration: .5,
            ease: "power4.out",
            onComplete: function(){
                changeNames();
            }
        })
        .to(elim, {
            opacity: 1,
            duration: .5,
            ease: "power4.in"
        });
    }

    
}

function setTeamImage(url, team){
    const elim = document.getElementById(`team-${team}-image`);
    const tl = gsap.timeline();

    function fadeIn(elim){
        tl.to(elim, {
            opacity: 1,
            ease: "power4.out",
            duration: .5
        })
    }

    tl.to(elim, {
        opacity: 0,
        duration: .5,
        ease: "power4.in",
        onComplete: function(){
            if (url == '' || url === undefined || url == null){
                elim.style.visibility = "hidden";
            } else {
                elim.style.visibility = "visible";
                elim.setAttribute("src", url);
                elim.addEventListener("load", function(){
                    fadeIn(elim);
                })
            }
        }
    });
}

function setMatchName(name, games){
    const elim = document.getElementById("teams-match-name");
    const tl = gsap.timeline();

    tl.to(elim,{
        opacity: 0,
        duration: .5,
        ease: "power4.in",
        onComplete: function(){
            elim.setAttribute("text", `${name} • ${games} games`);
        }
    })
    .to(elim,{
        opacity: 1,
        duration: .5,
        ease: "power4.out"
    });
}