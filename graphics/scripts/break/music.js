import { nowPlaying } from '../helpers/replicants.js';
import gsap from '../../../node_modules/gsap/all.js';

const mainMusic = document.getElementById("main-music");
const barMusic = document.getElementById("bottom-bar-music");

nowPlaying.on('change', newValue => {
    const tl = gsap.timeline();
    tl.to([mainMusic.parentElement, barMusic.parentElement], {
        opacity: 0,
        duration: .25,
        ease: "power4.out",
        onComplete: function () {
            mainMusic.setAttribute("text", `${newValue.artist} - ${newValue.song}`);
            barMusic.setAttribute("text", `${newValue.artist} - ${newValue.song}`);
        }
    })
        .to([mainMusic.parentElement, barMusic.parentElement], {
        opacity: 1,
        duration: .25,
        ease: "power4.in"
    });
});