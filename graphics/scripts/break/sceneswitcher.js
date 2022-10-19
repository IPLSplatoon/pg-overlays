import gsap from "../../../node_modules/gsap/all.js";
import { activeBreakScene } from '../helpers/replicants.js';

const sceneTl = gsap.timeline({
    defaults: {
        force3D: false,
        immediateRender: false
    }
});

NodeCG.waitForReplicants(activeBreakScene).then(() => {
    activeBreakScene.on('change', (newValue, oldValue) => {
        changeScene(newValue, oldValue);
    });

    //bandaid fix to a bug that might *just* happen once on stream
    if (activeBreakScene.value == "main"){
        gsap.to(".game-wrapper > .team-content-wrapper > .team-top-bar", {
            y: -50,
            opacity: 0,
            duration: 0
        });
    }
});

function changeScene(newValue, oldValue){
    switch (oldValue){
        case "main":
            sceneTl.add(hideMain());
            break;

        case "teams":
            if (newValue == "main"){
                sceneTl.add(hideBottomBar());
                sceneTl.add(hideTeams(), "<");
            } else {
                sceneTl.add(shiftTeamsUp());
            }
            break;

        case "stages":
            if (newValue == "main"){
                sceneTl.add(hideBottomBar());
                sceneTl.add(hideTeams(true), "<");
                sceneTl.add(hideStages(), "<");
            } else {
                sceneTl.add(hideStages());
            }
    }

    switch (newValue){
        case "main":
            sceneTl.add(showMain());
            if(oldValue === undefined){
                sceneTl.add(hideBottomBar(), "<");
            }
            break;

        case "teams":
            if (oldValue == "stages"){
                sceneTl.add(shiftTeamsDown(), "-=.25");
            } else if (oldValue == "main"){
                sceneTl.add(showBottomBar());
                sceneTl.add(showTeams(), "<");
            }
            break;

        case "stages":
            if (oldValue == "teams"){
                sceneTl.add(showStages(), oldValue == "teams" ? "-=.25" : null);
            } else {
                sceneTl.add(showTeams(true));
                sceneTl.add(showStages(), "<");
                sceneTl.add(showBottomBar(), "<");
            }
    }
}

function showMain(){
    const tl = gsap.timeline();

    tl.to(".break-wrapper > *", {
        y: 0,
        opacity: 1,
        ease: "power4.out",
        duration: .75,
        stagger: .15,
        onStart: function(){
            const wrapper = document.querySelector(".break-wrapper");
            wrapper.style.display = "flex";

            gsap.to(".break-wrapper > *", {
                y: 100,
                opacity: 0,
                duration: 0
            });
        }
    });

    return tl;
}

function hideMain(){
    const tl = gsap.timeline();

    tl.to(".break-wrapper > *", {
        y: 100,
        opacity: 0,
        ease: "power4.in",
        duration: .75,
        stagger: {
            from: "end",
            amount: .15
        },
        onComplete: function(){
            const wrapper = document.querySelector(".break-wrapper");
            wrapper.style.display = "none";
        },
        onStart: function(){
            gsap.to(".break-wrapper > *", {
                y: 0,
                opacity: 1,
                duration: 0
            });
        }
    });

    return tl;
}

function showTeams(collapsed = false){
    const tl = gsap.timeline();

    if (collapsed){
        tl.add(shiftTeamsUp(true));
    }

    tl.to(".game-wrapper > .team-content-wrapper > .stagger", {
        y: 0,
        opacity: 1,
        ease: "power4.out",
        duration: .75,
        stagger: {
            from: "edges",
            amount: .15
        },
        onStart: function(){
            const wrapper = document.querySelector(".team-content-wrapper");
            wrapper.style.visibility = "visible";

            gsap.to(".game-wrapper > .team-content-wrapper > .stagger", {
                y: 100,
                opacity: 0,
                duration: 0
            })
        }
    });

    tl.to(".game-wrapper > .team-content-wrapper > .team-top-bar", {
        y: 0,
        opacity: 1,
        ease: "power4.out",
        duration: .75,
        onStart: function(){
            gsap.to(".game-wrapper > .team-content-wrapper > .team-top-bar", {
                y: -50,
                opacity: 0,
                duration: 0
            });
        }
    }, "<");

    return tl;
}

function hideTeams(collapsed = false){
    const tl = gsap.timeline();


    tl.to(".game-wrapper > .team-content-wrapper > .stagger", {
        y: 100,
        opacity: 0,
        ease: "power4.in",
        duration: .75,
        stagger: {
            from: "edges",
            amount: .15
        },
        onComplete: function(){
            const wrapper = document.querySelector(".team-content-wrapper");
            wrapper.style.visibility = "hidden";
            
            gsap.to(".game-wrapper > .team-content-wrapper > .stagger", {
                y: 0,
                opacity: 0,
                duration: 0
            });

            if (collapsed){
                tl.add(shiftTeamsDown(true));
            }
        }
    });

    tl.to(".game-wrapper > .team-content-wrapper > .team-top-bar", {
        y: -50,
        opacity: 0,
        ease: "power4.in",
        duration: .75,
        onStart: function(){
            gsap.to(".game-wrapper > .team-content-wrapper > .team-top-bar", {
                y: 0,
                opacity: 1,
                duration: 0
            });
        }
    }, "<");

    return tl;
}

function shiftTeamsUp(instant = false){
    const tl = gsap.timeline();

    tl.to(".game-wrapper > .team-content-wrapper", {
        y: -432,
        duration: instant ? .01 : 1,
        ease: "power4.inOut"
    });

    tl.to(".game-wrapper > .team-content-wrapper > .team-card", {
        height: 90,
        duration: instant ? .01 : 1,
        ease: "power4.inOut"
    }, "<");

    tl.to(".game-wrapper > .team-content-wrapper > .team-card > .header", {
        height: 90,
        duration: instant ? .01 : 1,
        ease: "power4.inOut"
    }, "<");

    tl.to(".game-wrapper > .team-content-wrapper > .score", {
        height: 86,
        duration: instant ? .01 : 1,
        ease: "power4.inOut"
    }, "<");

    tl.to(".game-wrapper > .team-content-wrapper > .team-card > .header > img", {
        width: 94,
        height: 94,
        duration: instant ? .01 : 1,
        ease: "power4.inOut"
    }, "<");

    return tl;
}

function shiftTeamsDown(instant = false){
    const tl = gsap.timeline();

    tl.to(".game-wrapper > .team-content-wrapper", {
        y: 0,
        duration: instant ? 0 : .75,
        ease: "power4.inOut"
    });

    tl.to(".game-wrapper > .team-content-wrapper > .team-card", {
        height: 575,
        duration: instant ? 0 : .75,
        ease: "power4.inOut"
    }, "<");

    tl.to(".game-wrapper > .team-content-wrapper > .team-card > .header", {
        height: 114,
        duration: instant ? 0 : .75,
        ease: "power4.inOut"
    }, "<");

    tl.to(".game-wrapper > .team-content-wrapper > .score", {
        height: 100,
        duration: instant ? 0 : .75,
        ease: "power4.inOut"
    }, "<");

    tl.to(".game-wrapper > .team-content-wrapper > .team-card > .header > img", {
        width: 114,
        height: 114,
        duration: instant ? 0 : .75,
        ease: "power4.inOut"
    }, "<");

    return tl;
}

function showStages(){
    const tl = gsap.timeline();

    tl.to(".game-wrapper > .stages-wrapper > *", {
        y: 0,
        opacity: 1,
        ease: "power4.out",
        duration: .75,
        stagger: {
            from: "edges",
            amount: .15
        },
        onStart: function(){
            const wrapper = document.querySelector(".stages-wrapper");
            wrapper.style.visibility = "visible";

            gsap.to(".game-wrapper > .stages-wrapper > *", {
                y: 100,
                opacity: 0,
                duration: 0
            });
        }
    });

    return tl;
}

function hideStages(){
    const tl = gsap.timeline();

    tl.to(".game-wrapper > .stages-wrapper > *", {
        y: 100,
        opacity: 0,
        ease: "power4.in",
        duration: .75,
        stagger: {
            from: "edges",
            amount: .15
        },
        onComplete: function(){
            const wrapper = document.querySelector(".stages-wrapper");
            wrapper.style.visibility = "hidden";

            gsap.to(".game-wrapper > .stages-wrapper > *", {
                y: 0,
                opacity: 1,
                duration: 0
            });
        }
    });

    return tl;
}

function showBottomBar(){
    const tl = gsap.timeline();

    tl.to(".bottom-bar", {
        opacity: 1,
        y: 0,
        duration: .75,
        ease: "power4.out"
    });

    return tl;
}

function hideBottomBar(){
    const tl = gsap.timeline();

    tl.to(".bottom-bar", {
        opacity: 0,
        y: 50,
        duration: .75,
        ease: "power4.in"
    });

    return tl;
}