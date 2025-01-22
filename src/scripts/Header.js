class Header {
    selectors = {
        root: "[data-js-header]",
        overlay: "[data-js-header-overlay]",
        burgerButton: "[data-js-header-burger-button]",
        menuLink: "[data-js-header-menu-link]",
    };

    stateClasses = {
        isActive: "is-active",
        isLock: "is-lock",
    };

    constructor() {
        this.rootElement = document.querySelector(this.selectors.root);
        this.overlayElement = this.rootElement.querySelector(
            this.selectors.overlay,
        );
        this.burgerButtonElement = this.rootElement.querySelector(
            this.selectors.burgerButton,
        );
        this.menuLinksElements = this.rootElement.querySelectorAll(
            this.selectors.menuLink,
        );

        this.bindEvents();
    }

    onBurgerButtonClick = () => {
        this.burgerButtonElement.classList.toggle(this.stateClasses.isActive);
        this.overlayElement.classList.toggle(this.stateClasses.isActive);
        document.documentElement.classList.toggle(this.stateClasses.isLock);
    };

    onMenuLinkClick = () => {
        if (!(this.stateClasses.isActive in this.overlayElement.classList)) {
            this.burgerButtonElement.classList.remove(
                this.stateClasses.isActive,
            );
            this.overlayElement.classList.remove(this.stateClasses.isActive);
            document.documentElement.classList.remove(this.stateClasses.isLock);
        }
    };

    bindEvents() {
        this.burgerButtonElement.addEventListener(
            "click",
            this.onBurgerButtonClick,
        );
        this.menuLinksElements.forEach((link) => {
            link.addEventListener("click", this.onMenuLinkClick);
        });
    }
}

export default Header;
