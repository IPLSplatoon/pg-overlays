import { casters } from '../helpers/replicants.js';
import gsap from '../../../node_modules/gsap/all.js';

const mainCasterWrappers = [
    document.getElementById("caster-1-main-wrapper"),
    document.getElementById("caster-2-main-wrapper"),
    document.getElementById("caster-3-main-wrapper")
];

const mainCasterNames = [
    document.getElementById("caster-1-main-name"),
    document.getElementById("caster-2-main-name"),
    document.getElementById("caster-3-main-name")
];

const mainCasterTwitters = [
    document.getElementById("caster-1-main-twitter"),
    document.getElementById("caster-2-main-twitter"),
    document.getElementById("caster-3-main-twitter")
];

const mainCasterPronouns = [
    document.getElementById("caster-1-main-pronouns"),
    document.getElementById("caster-2-main-pronouns"),
    document.getElementById("caster-3-main-pronouns")
];

const bottomCasterWrappers = [
    document.getElementById("caster-1-bottom-wrapper"),
    document.getElementById("caster-2-bottom-wrapper"),
    document.getElementById("caster-3-bottom-wrapper")
];

const bottomCasterNames = [
    document.getElementById("caster-1-bottom-name"),
    document.getElementById("caster-2-bottom-name"),
    document.getElementById("caster-3-bottom-name")
];

const bottomCasterTwitters = [
    document.getElementById("caster-1-bottom-twitter"),
    document.getElementById("caster-2-bottom-twitter"),
    document.getElementById("caster-3-bottom-twitter")
];

const bottomCasterPronouns = [
    document.getElementById("caster-1-bottom-pronouns"),
    document.getElementById("caster-2-bottom-pronouns"),
    document.getElementById("caster-3-bottom-pronouns")
];


NodeCG.waitForReplicants(casters).then(() => {
    casters.on('change', newValue => {

        const cast = Object.values(newValue);
        const numCasters = cast.length;
        const tl = gsap.timeline();

        tl.to([...mainCasterWrappers, ...mainCasterTwitters, ...bottomCasterWrappers, ...bottomCasterTwitters], {
            opacity: 0,
            duration: .5,
            ease: "power4.in",
            onComplete: function(){
                for (var i = 0; i < numCasters; i++){
                    const caster = cast[i];

                    mainCasterWrappers[i].style.display = "flex";
                    mainCasterTwitters[i].style.display = "block";
                    mainCasterNames[i].setAttribute("text", caster.name);
                    mainCasterTwitters[i].setAttribute("text", caster.twitter);
                    mainCasterPronouns[i].innerText = caster.pronouns;

                    bottomCasterWrappers[i].style.display = "flex";
                    bottomCasterTwitters[i].style.display = "block";
                    bottomCasterNames[i].setAttribute("text", caster.name);
                    bottomCasterTwitters[i].setAttribute("text", caster.twitter);
                    bottomCasterPronouns[i].innerText = caster.pronouns;
                }

                for (var i = numCasters; i < 3; i++){
                    mainCasterWrappers[i].style.display = "none";
                    mainCasterTwitters[i].style.display = "none";
                    bottomCasterWrappers[i].style.display = "none";
                    bottomCasterTwitters[i].style.display = "none";
                }
            }
        })
        .to([...mainCasterWrappers, ...mainCasterTwitters, ...bottomCasterWrappers, ...bottomCasterTwitters], {
            opacity: 1,
            duration: .5,
            ease: "power4.out"
        });

    });
});