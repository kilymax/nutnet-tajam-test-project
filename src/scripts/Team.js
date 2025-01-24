class Team {
  data = {
    team_card_list: [
      {
        number: "1",
        name: "Mickey Pearson",
        position: "CEO & Founder",
      },
      {
        number: "2",
        name: "Raymond Smith",
        position: "Engineering",
      },
      {
        number: "3",
        name: "Coach",
        position: "Designer",
      },
      {
        number: "4",
        name: "Fletcher",
        position: "Marketing",
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

export default Team;
