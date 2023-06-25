import { casters } from '../helpers/replicants.js';
import { DASHBOARD_BUNDLE_NAME } from '../helpers/constants.js';
import gsap from '../../../node_modules/gsap/all.js';

const castersScrollTl = gsap.timeline();

NodeCG.waitForReplicants(casters).then(() => {
    casters.on('change', (newValue) => {
        const casters = Object.values(newValue);
        
        changeCasterScrollable(casters);
        changeMatchInfoCasters(casters);
    });
});

nodecg.listenFor('mainShowCasters', DASHBOARD_BUNDLE_NAME, () => {
    const tl = gsap.timeline();
    
    tl.to(".logo", {
        opacity: 0,
        x: 82,
        duration: 1,
        ease: "power4.inOut"
    })
    .to(".info-wrapper", {
        x: 82,
        duration: 1,
        ease: "power4.inOut"
    }, "<")
    .fromTo(".match-info-wrapper", {
        x: -82
    },{
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power4.inOut"
    }, "<")

    tl.to("#match-info-visibility", {
        opacity: 1,
        duration: .7,
        ease: "power4.in"
    })
    .to(".match-info-wrapper", {
        height: "auto",
        duration: 1,
        ease: "power4.inOut"
    }, "<")
    .fromTo("#match-info-timer", {
        width: 310        
    }, {
        width: 0,
        duration: 12,
        ease: "none"
    })
    
    tl.to(".match-info-wrapper", {
        height: 67,
        duration: 1,
        ease: "power4.inOut"
    })
    .to("#match-info-visibility", {
        opacity: 0,
        duration: .7,
        ease: "power3.inOut"
    }, "-=.8");

    tl.to(".logo", {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power4.inOut"
    })
    .to(".info-wrapper", {
        x: 0,
        duration: 1,
        ease: "power4.inOut"
    }, "<")
    .to(".match-info-wrapper", {
        opacity: 0,
        duration: 1,
        ease: "power4.inOut",
        x: -82
    } , "<");
});

function changeMatchInfoCasters(casters){
    let html = '<div class="segment"><span><img src="./assets/icons/mic.svg"><div style="font-weight: bold;">On the mic</div></span></div>';
    for (let i = 0; i < casters.length; i++){
        const caster = casters[i];
        html += `<div class="segment"><fitted-text max-width="290" text="${caster.name}"></fitted-text><span>`;
        if (caster.twitter != "@"){
            html += `<fitted-text class="small" max-width="290" text="${caster.twitter}"></fitted-text>`
        }
        if (caster.pronouns != ""){
            html += `<div class="pronouns">${caster.pronouns}</div>`;
        }
        html += `</span></div>`;
    }
    document.querySelector(".match-info-body").innerHTML = html;
}

function changeCasterScrollable(casters){
    let html = '';
    const scrollable1 = document.getElementById('caster-scrollable-1');
    const scrollable2 = document.getElementById('caster-scrollable-2');
    
    for (let i = 0; i < casters.length; i++){
        const caster = casters[i];
        html += '&nbsp&nbsp/&nbsp&nbsp';
        html += `${caster.name}`;
        if (caster.twitter != "@"){
            html += `&nbsp•&nbsp${caster.twitter}`;
        }
        if (caster.pronouns != ""){
            html += `&nbsp•&nbsp<span class="pronouns">${caster.pronouns}</span>`;
        }
    }

    scrollable1.innerHTML = html;
    scrollable2.innerHTML = html;

    const scroller = document.getElementById('caster-scroller');
    castersScrollTl.restart();
    castersScrollTl.clear();
    let width = scrollable1.scrollWidth;
    if (width < 275){
        scrollable1.style.marginRight = `${275-width}px`;
        width = 275;
    } else {
        scrollable1.style.marginRight = '0px';
    }
    console.log(width);
    castersScrollTl.to(scroller, {
        duration: width / 17,
        ease: "none",
        x: -width,
        repeat: -1
    });
}