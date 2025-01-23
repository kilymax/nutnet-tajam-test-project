class Reviews {
    defaultIndex = 2;

    selectors = {
        root: "[data-js-reviews]",
        carousel: "[data-js-reviews-carousel]",
        controls: "[data-js-reviews-controls]",
    };

    stateClasses = {
        isActive: "is-active",
    };

    constructor() {
        this.rootElement = document.querySelector(this.selectors.root);

        this.carouselElements = this.rootElement
            .querySelector(this.selectors.carousel)
            .querySelectorAll(".reviews__carousel-item");

        this.reviewTexts = this.rootElement
            .querySelector(this.selectors.carousel)
            .querySelectorAll(".reviews__review-wrapper");

        this.controlElements = this.rootElement
            .querySelector(this.selectors.controls)
            .querySelectorAll(".reviews__controls-item");

        this.bindEvents();
    }

    hideReviews = () => {
        this.carouselElements.forEach((review) => {
            review.classList.remove("is-active");
        });
        this.controlElements.forEach((control) => {
            control.classList.remove("is-active");
        });
    };

    showReview = (index) => {
        this.carouselElements[index].classList.add("is-active");
        this.controlElements[index].classList.add("is-active");
    };

    calcReviewMaxHeight = () => {
        let maxHeight = 0;
        let height = 0;
        this.reviewTexts.forEach((text, index) => {
            this.carouselElements[index].classList.add("is-active");
            text.style.height = "auto";
            height = parseFloat(getComputedStyle(text, null).height);
            this.carouselElements[index].classList.remove("is-active");

            if (maxHeight < height) {
                maxHeight = height;
            }
        });

        console.log(maxHeight);

        this.reviewTexts.forEach((text) => {
            text.style.height = `${maxHeight}px`;
        });

        this.showReview(this.defaultIndex);
    };

    bindEvents() {
        this.hideReviews();
        this.calcReviewMaxHeight();
        this.showReview(this.defaultIndex);

        this.controlElements.forEach((control, index) =>
            control.addEventListener("click", () => {
                this.hideReviews();
                this.showReview(index);
                this.defaultIndex = index;
            }),
        );

        window.addEventListener("resize", this.calcReviewMaxHeight);
    }
}

export default Reviews;
