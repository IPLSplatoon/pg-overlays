import { casters } from '../helpers/replicants.js';
import { DASHBOARD_BUNDLE_NAME } from '../helpers/constants.js';
import gsap from '../../../node_modules/gsap/all.js';

const casterWrappers = [
    document.getElementById("caster-a-wrapper"),
    document.getElementById("caster-b-wrapper"),
    document.getElementById("caster-c-wrapper")
]

const casterNames = [
    document.getElementById("caster-a-name"),
    document.getElementById("caster-b-name"),
    document.getElementById("caster-c-name")
]

const casterPronouns = [
    document.getElementById("caster-a-pronouns"),
    document.getElementById("caster-b-pronouns"),
    document.getElementById("caster-c-pronouns")
]

const casterTwitters = [
    document.getElementById("caster-a-twitter"),
    document.getElementById("caster-b-twitter"),
    document.getElementById("caster-c-twitter")
]

NodeCG.waitForReplicants(casters).then(() => {
    casters.on('change', (newValue, oldValue) => {

        const casters = Object.values(newValue);
        const oldCasters = oldValue === undefined ? undefined : Object.values(oldValue);

        if (oldCasters === undefined){
            for(var i = 0; i < 3; i++){
                if (casters[i] !== undefined){
                    changeComm(i, casters[i]);
                    showComm(i, true);
                } else {
                    showComm(i, false);
                }
            }
        } else {
            for(var i = 0; i < 3; i++){
                if (oldCasters[i] === undefined || casters[i] === undefined){
                    if (oldCasters[i] === undefined && casters[i] !== undefined){
                        changeComm(i, casters[i]);
                        showComm(i, true);
                    } else if (oldCasters[i] !== undefined && casters[i] === undefined){
                        showComm(i, false);
                    }
                } else {
                    if (casters[i].name !== oldCasters[i].name
                        || casters[i].twitter !== oldCasters[i].twitter
                        || casters[i].pronouns !== oldCasters[i].pronouns){
                            changeComm(i, casters[i]);
                        }
                }      
            }
        }
    });
});

nodecg.listenFor('mainShowCasters', DASHBOARD_BUNDLE_NAME, () => {
    const tl = gsap.timeline();
    const elim = document.getElementById("casters-wrapper");

    tl.fromTo(elim, {
        height: 0,
        "box-shadow": "0px 0px 0px var(--indigo)",
        borderWidth: "0px"
    }, {
        height: "auto",
        "box-shadow": "-7px 4px 0px var(--indigo)",
        borderWidth: "3px",
        duration: 1,
        ease: "power4.out",
        visibility: "visible"
    })

    .to(elim, {
        height: 0,
        "box-shadow": "0px 0px 0px var(--indigo)",
        borderWidth: "0px",
        duration: 1,
        ease: "power4.in",
        onComplete: function(){
            elim.style.visibility = "hidden";
        }
    }, "+=15");
});

function changeComm(index, caster){
    const tl = gsap.timeline();

    tl.to(casterWrappers[index], {
        opacity: 0,
        duration: .25,
        ease: "power4.in",
        onComplete: function(){
            casterNames[index].setAttribute("text", caster.name);
            casterTwitters[index].setAttribute("text", caster.twitter);
            casterPronouns[index].innerText = caster.pronouns;
        }
    })
    .to(casterWrappers[index], {
        opacity: 1,
        duration: .45,
        ease: "power4.out"
    }, "+=.25");
}

function showComm(index, show){
    casterWrappers[index].style.display = show ? "block" : "none";
}