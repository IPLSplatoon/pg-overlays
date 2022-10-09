import gsap from "../../../node_modules/gsap/all.js";
import { musicShown } from '../helpers/replicants.js';

var bottomBarTl;
var infoScrollableTl;

export function animInit(){
    const bgTl = gsap.timeline({repeat: -1});

    bgTl.fromTo(".background", {
        backgroundPositionY: "0px"
    }, {
        backgroundPositionY: "-241px",
        ease: "linear",
        duration: 12
    });

    NodeCG.waitForReplicants(musicShown).then(() => {

        bottomBarTl = gsap.timeline({
            onComplete: function () {
                bottomBarTl.add(animBottomBar());
            }
        });
        bottomBarTl.add(animBottomBar());

        infoScrollableTl = gsap.timeline({
            onComplete: function () {
                infoScrollableTl.add(animInfoScrollable());
            }
        });
        infoScrollableTl.add(animInfoScrollable());

    });
}

function animBottomBar(){
    const tl = gsap.timeline();
    const elements = document.querySelectorAll(".bottom-bar-wrapper");

    for (var i = 0; i < elements.length; i++){
        elements[i].style.display = "none";

        if (!(elements[i].id == "bottom-bar-music-wrapper" && !musicShown.value)){
            tl.fromTo(elements[i],{
                display: "none",
                opacity: 0,
                x: 30
            }, {
                display: "flex",
                opacity: 1,
                x: 0,
                ease: "power4.out",
                duration: .5
            })
            .to(elements[i], {
                x: -30,
                opacity: 0,
                display: "none",
                ease: "power4.in",
                duration: .5
            }, "+=7");
        }
    }

    return tl;
}

function animInfoScrollable(){
    const tl = gsap.timeline();
    const elements = document.querySelectorAll(".info-scrollable-wrapper");

    for (var i = 0; i < elements.length; i++){
        elements[i].style.display = "none";

        if (!(elements[i].id == "info-scrollable-music-wrapper" && !musicShown.value)){
            tl.fromTo(elements[i],{
                display: "none",
                opacity: 0,
                x: 30
            }, {
                display: "flex",
                opacity: 1,
                x: 0,
                ease: "power4.out",
                duration: .3
            })
            .to(elements[i], {
                x: -30,
                opacity: 0,
                display: "none",
                ease: "power4.in",
                duration: .3
            }, "+=7");
        }
    }

    return tl;
}