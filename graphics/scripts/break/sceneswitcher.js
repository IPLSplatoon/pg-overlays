import gsap from "../../../node_modules/gsap/all.js";
import { activeBreakScene } from '../helpers/replicants.js';

const sceneTl = gsap.timeline();

activeBreakScene.on('change', (newValue, oldValue) => {
    changeScene(newValue, oldValue);
});

function changeScene(newValue, oldValue){
    switch (oldValue){
        case "main":
            sceneTl.add(hideMain());
            break;

        case "teams":
            if (newValue == "main"){
                sceneTl.add(hideTeams());
                sceneTl.add(hideBottomBar(), "<");
            } else {
                sceneTl.add(shiftTeamsUp());
            }
            break;

        case "stages":
            if (newValue == "main"){
                sceneTl.add(hideTeams(true));
                sceneTl.add(hideStages(), "<");
                sceneTl.add(hideBottomBar(), "<");
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
                sceneTl.add(showTeams());
                sceneTl.add(showBottomBar(), "<");
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

    tl.fromTo(".break-wrapper > *", {
        y: 100,
        opacity: 0
    }, {
        y: 0,
        opacity: 1,
        ease: "power4.out",
        duration: .75,
        stagger: .15,
        onStart: function(){
            const wrapper = document.querySelector(".break-wrapper");
            wrapper.style.display = "flex";
        }
    });

    return tl;
}

function hideMain(){
    const tl = gsap.timeline();

    tl.fromTo(".break-wrapper > *", {
        y: 0,
        opacity: 1
    }, {
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
        }
    });

    return tl;
}

function showTeams(collapsed = false){
    const tl = gsap.timeline();

    if (collapsed){
        tl.add(shiftTeamsUp(true));
    }

    tl.fromTo(".game-wrapper > .team-content-wrapper > *", {
        y: collapsed ? -332 : 100,
        opacity: 0
    }, {
        y: collapsed ? -432 : 0,
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

            if (collapsed){

            }
        }
    });

    return tl;
}

function hideTeams(collapsed = false){
    const tl = gsap.timeline();

    tl.fromTo(".game-wrapper > .team-content-wrapper > *", {
        y: collapsed ? -432 : 0,
        opacity: 1
    }, {
        y: collapsed ? -332 : 100,
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
            if (collapsed){
                tl.add(shiftTeamsDown(true), ">");
            }
        }
    });

    return tl;
}

function shiftTeamsUp(instant = false){
    const tl = gsap.timeline();

    tl.to(".game-wrapper > .team-content-wrapper > .team-card > .roster", {
        opacity: 0,
        ease: "power2.in",
        duration: instant ? 0 : .5
    });

    tl.to(".game-wrapper > .team-content-wrapper > *", {
        y: -432,
        duration: instant ? 0 : .75,
        ease: "power4.inOut"
    });

    tl.to(".game-wrapper > .team-content-wrapper > .team-card", {
        height: 90,
        duration: instant ? 0 : .75,
        ease: "power4.inOut"
    }, "<");

    tl.to(".game-wrapper > .team-content-wrapper > .team-card > .header", {
        height: 90,
        duration: instant ? 0 : .75,
        ease: "power4.inOut"
    }, "<");

    tl.to(".game-wrapper > .team-content-wrapper > .score", {
        height: 86,
        duration: instant ? 0 : .75,
        ease: "power4.inOut"
    }, "<");

    return tl;
}

function shiftTeamsDown(instant = false){
    const tl = gsap.timeline();

    tl.to(".game-wrapper > .team-content-wrapper > *", {
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

    tl.to(".game-wrapper > .team-content-wrapper > .team-card > .roster", {
        opacity: 1,
        ease: "power2.out",
        duration: instant ? 0 : .5
    });

    return tl;
}

function showStages(){
    const tl = gsap.timeline();

    tl.fromTo(".game-wrapper > .stages-wrapper > *", {
        y: 100,
        opacity: 0
    }, {
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
        }
    });

    return tl;
}

function hideStages(){
    const tl = gsap.timeline();

    tl.fromTo(".game-wrapper > .stages-wrapper > *", {
        y: 0,
        opacity: 1
    }, {
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
        }
    });

    return tl;
}

function showBottomBar(){
    const tl = gsap.timeline();

    tl.fromTo(".bottom-bar", {
        opacity: 0,
        y: 50
    }, {
        opacity: 1,
        y: 0,
        duration: .75,
        ease: "power4.out"
    });

    return tl;
}

function hideBottomBar(){
    const tl = gsap.timeline();

    tl.fromTo(".bottom-bar", {
        opacity: 1,
        y: 0
    }, {
        opacity: 0,
        y: 50,
        duration: .75,
        ease: "power4.in"
    });

    return tl;
}