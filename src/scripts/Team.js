class Team {
  data = {
    team_card_list: [
      {
        number: "1",
        name: "Mickey Pearson",
        position: "CEO & Founder",
        image_path: "/nutnet-tajam-test-project/images/team/1.jpg",
      },
      {
        number: "2",
        name: "Raymond Smith",
        position: "Engineering",
        image_path: "/nutnet-tajam-test-project/images/team/2.jpg",
      },
      {
        number: "3",
        name: "Coach",
        position: "Designer",
        image_path: "/nutnet-tajam-test-project/images/team/3.jpg",
      },
      {
        number: "4",
        name: "Fletcher",
        position: "Marketing",
        image_path: "/nutnet-tajam-test-project/images/team/4.jpg",
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
