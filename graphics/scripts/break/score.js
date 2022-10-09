import { activeRound } from '../helpers/replicants.js';


NodeCG.waitForReplicants(activeRound).then(() => {
    activeRound.on("change", (newValue, oldValue) => {
        if (oldValue === undefined){ 

            setScore(newValue.teamA.score, newValue.teamB.score);

        } else if (newValue.teamA.score !== oldValue.teamA.score 
                || newValue.teamB.score !== oldValue.teamB.score
                || newValue.games.length !== oldValue.games.length){

            setScore(newValue.teamA.score, newValue.teamB.score);

        }
    });
});

function setScore(teamAScore, teamBScore) {
    const teamAElim = document.getElementById("team-a-score");
    const teamBElim = document.getElementById("team-b-score");

    teamAElim.innerText = teamAScore;
    teamBElim.innerHTML = teamBScore;
}