"use strict";

class App {
  _remainingTopicTime = document.querySelector(".summary__remaining-time");
  _topicRefreshDate = new Date(this._remainingTopicTime.dataset.target);
  _publishIdeaBtn = document.querySelector(".publish-idea__btn");

  constructor() {
    this._publishIdeaBtn.addEventListener("click", this._togglePublishIdea);
    App.setTimerInterval(this._updateRemainingTime, 60, this);
  }

  // Making publish idea interface pop up.
  _togglePublishIdea(e) {
    e.preventDefault();

    this.setAttribute(
      "aria-expanded",
      this.getAttribute("aria-expanded") === "true" ? "false" : "true"
    );
  }

  // Updating the remaining time DOM element.
  _updateRemainingTime() {
    const [remainingMins, remainingHours] = App.substractDates(
      this._topicRefreshDate,
      new Date()
    );
    this._remainingTopicTime.textContent = `Konunun bitimine ${remainingHours} saat ${remainingMins} dakika kaldı.`;
  }

  // Implemented Promisfying in order to prevent Microtasks Queue & Callback Queue issue.
  static setTimerInterval(callBack, seconds, preferedThis = this) {
    return new Promise(async (resolve) => {
      try {
        await callBack.apply(preferedThis);
        setInterval(async () => {
          if (await callBack.apply(preferedThis)) resolve();
        }, seconds * 1000);
      } catch (err) {
        App.showError(err, 41);
      }
    });
  }

  // Substracting two given dates, returning the result in a min/hour format.
  static substractDates(firstDate, secondDate) {
    const difMins = (firstDate - secondDate) / 1000 / 60;

    return [Math.round(difMins) % 60, Math.floor(difMins / 60)];
  }

  // Displaying custom error messages
  static showError(
    errorMessage = "Bilinmeyen bir hata meydana geldi. [scripts/script.js]",
    errorCode = 54
  ) {
    console.error(`HATA: ${errorCode} - ${errorMessage}`);
  }
}

const application = new App();
