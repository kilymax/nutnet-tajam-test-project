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
    this.playButtonElement.addEventListener("click", this.onPlayButtonClick);
  }
}

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
      review.style.classList;
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

class Feedback {
  selectors = {
    form: "[data-js-form]",
    fieldErrors: "[data-js-form-field-errors]",
  };

  errorMessages = {
    valueMissing: () => "Поле обязательно для заполнения",
    patternMismatch: ({ title }) => title || "Данные не соответствуют формату",
    tooShort: ({ minLength }) =>
      `Слишком короткое значение (минимум символов – ${minLength})`,
    tooLong: ({ maxLength }) =>
      `Слишком длинное значение (максимум символов – ${maxLength})`,
  };

  constructor() {
    this.bindEvents();
  }

  manageErrors = (fieldElement, errorMessages) => {
    const fieldErrorsElement = fieldElement.parentElement.querySelector(
      this.selectors.fieldErrors,
    );

    const fieldInputElement =
      fieldElement.parentElement.querySelector("input") ||
      fieldElement.parentElement.querySelector("textarea");

    fieldErrorsElement.innerHTML = errorMessages
      .map((message) => `<span class="field__error">${message}</span>`)
      .join("");

    fieldInputElement.style.borderColor =
      errorMessages.length > 0 ? "#ff5500" : "rgba(0, 0, 0, 0.1)";
  };

  validateField = (fieldElement) => {
    const errors = fieldElement.validity;
    const errorMessages = [];

    Object.entries(this.errorMessages).forEach(
      ([errorType, getErrorMessage]) => {
        if (errors[errorType]) {
          errorMessages.push(getErrorMessage(fieldElement));
        }
      },
    );

    this.manageErrors(fieldElement, errorMessages);
    const isValid = errorMessages.length === 0;
    fieldElement.areaInvalid = !isValid;

    return isValid;
  };

  onBlur = (event) => {
    const { target } = event;
    const isFormField = target.closest(this.selectors.form);
    const isRequired = target.required;

    if (isRequired && isFormField) {
      this.validateField(target);
    }
  };

  onSubmit = (event) => {
    const isFormElement = event.target.matches(this.selectors.form);

    if (!isFormElement) {
      return;
    }

    const requiredElements = [...event.target.elements].filter(
      (element) => element.required,
    );
    let isFormValid = true;
    let firstInvalidField = null;

    requiredElements.forEach((element) => {
      const isFieldValid = this.validateField(element);

      if (!isFieldValid) {
        isFormValid = false;

        if (!firstInvalidField) {
          firstInvalidField = element;
        }
      }
    });

    if (!isFormValid) {
      firstInvalidField.focus();
      event.preventDefault();
    }
  };

  bindEvents = () => {
    document.addEventListener("blur", this.onBlur, true);
    document.addEventListener("submit", this.onSubmit);
  };
}

class Team {
  data = {
    team_card_list: [
      {
        number: "1",
        name: "Mickey Pearson",
        position: "CEO & Founder",
        image_path: "/images/team/1.jpg",
      },
      {
        number: "2",
        name: "Raymond Smith",
        position: "Engineering",
        image_path: "/images/team/2.jpg",
      },
      {
        number: "3",
        name: "Coach",
        position: "Designer",
        image_path: "/images/team/3.jpg",
      },
      {
        number: "4",
        name: "Fletcher",
        position: "Marketing",
        image_path: "/images/team/4.jpg",
      },
    ],
  };

  constructor() {
    this.bindEvents();
  }

  fillTemplate = () => {
    var template = Handlebars.compile(
      document.querySelector("#template").innerHTML,
    );
    var filled = template(this.data);
    document.querySelector(".team__list").innerHTML = filled;
  };

  bindEvents = () => {
    document.addEventListener("DOMContentLoaded", () => {
      this.fillTemplate();
    });
  };
}

new Header();
new Story();
new Team();
new Reviews();
new Feedback();
