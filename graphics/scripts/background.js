import gsap from "../../node_modules/gsap/all.js";

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