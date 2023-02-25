class App {
  _publishIdeaBtn = document.querySelector(".publish-idea__btn");

  constructor() {
    this._publishIdeaBtn.addEventListener("click", this._togglePublishIdea);
  }

  _togglePublishIdea(e) {
    e.preventDefault();

    this.setAttribute(
      "aria-expanded",
      this.getAttribute("aria-expanded") === "true" ? "false" : "true"
    );
  }
}

const application = new App();
