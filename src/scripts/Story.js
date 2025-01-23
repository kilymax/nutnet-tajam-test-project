class Story {
    selectors = {
        root: "[data-js-story]",
        playButton: "[data-js-story-play-button]",
        overlay: "[data-js-story-overlay]",
        exitButton: "[data-js-story-exit-button]",
    };

    stateClasses = {
        isActive: "is-active",
        isLock: "is-lock",
    };

    constructor() {
        this.rootElement = document.querySelector(this.selectors.root);

        this.playButtonElement = this.rootElement.querySelector(
            this.selectors.playButton,
        );

        this.overlayElement = this.rootElement.querySelector(
            this.selectors.overlay,
        );

        this.playerElement = document.getElementById("rutube-iframe");

        this.exitButtonElement = this.rootElement.querySelector(
            this.selectors.exitButton,
        );

        this.bindEvents();
    }

    onPlayButtonClick = () => {
        this.overlayElement.classList.add(this.stateClasses.isActive);
        document.documentElement.classList.add(this.stateClasses.isLock);
        // this.playerElement.contentWindow.postMessage(
        //     JSON.stringify({ type: "player:play", data: {} }),
        //     "*",
        // );
    };

    onOverlayExit = () => {
        this.overlayElement.classList.remove(this.stateClasses.isActive);
        document.documentElement.classList.remove(this.stateClasses.isLock);
        this.playerElement.contentWindow.postMessage(
            JSON.stringify({ type: "player:pause", data: {} }),
            "*",
        );
    };

    bindEvents() {
        this.exitButtonElement.addEventListener("click", (event) => {
            this.onOverlayExit();
            event.stopPropagation();
        });
        this.overlayElement.addEventListener(
            "click",
            (event) => {
                if (event.target === event.currentTarget) {
                    this.onOverlayExit();
                    event.stopPropagation();
                }
            },
            true,
        );
        this.playButtonElement.addEventListener(
            "click",
            this.onPlayButtonClick,
        );
    }
}

export default Story;
