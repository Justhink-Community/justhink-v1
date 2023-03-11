"use strict";

import { UPDATE_REMAINING_TIME_SECONDS } from "./config.js";

/**
 * The class which contains all the business logic, presentation logic, application logic, state and HTTP Library
 */
class App {
  _remainingTopicTime = document.querySelector(".summary__remaining-time");
  _publishIdeaBtn = document.querySelector(".publish-idea__btn");
  _themesBtn = document.querySelector(".shop-category-selector-button--themes");
  _iconsBtn = document.querySelector(".shop-category-selector-button--icons");
  _inputLengthContainers = document.querySelectorAll(
    ".input-length--container"
  );

  /**
   * The constructor function of the App class which makes the basic setup of the project.
   */
  constructor() {
    if (this._publishIdeaBtn)
      this._publishIdeaBtn.addEventListener("click", this._togglePublishIdea);

    if (this._remainingTopicTime && this._remainingTopicTime?.dataset?.target) {
      this._topicRefreshDate = new Date(
        this._remainingTopicTime.dataset.target
      );

      App.setTimerInterval(
        this._updateRemainingTime,
        UPDATE_REMAINING_TIME_SECONDS,
        this
      );
    }

    if (this._themesBtn && this._iconsBtn) {
      this._themesBtn.addEventListener("click", this._changeTab.bind(this));
      this._iconsBtn.addEventListener("click", this._changeTab.bind(this));
    }

    this._inputLengthContainers.forEach(
      this._setupInputLengthCounters.bind(this)
    );
  }

  /**
   * Does the cruical setup of incrementing the input/textarea counters.
   * @param {Object} inputLengthContainer
   * @returns undefined
   * @this {Object} App object
   */
  _setupInputLengthCounters(inputLengthContainer) {
    inputLengthContainer.addEventListener(
      "input",
      this._updateInputLengthCounter.bind(this, inputLengthContainer)
    );
  }

  /**
   * Updates the textarea/input counters.
   * @param {Object} inputLengthContainer
   * @returns undefined
   * @this {Object} App object
   */
  _updateInputLengthCounter(inputLengthContainer) {
    const input = inputLengthContainer.querySelector(".input-length");
    const inputLength = input.value.length;

    inputLengthContainer.querySelector(
      ".input-length--counter"
    ).textContent = `${inputLength}/${input.getAttribute("maxlength")}`;
  }

  /**
   * Changes the current active tab between "icons" and "themes" tabs.
   * @param {Object} e Pointer Event
   * @returns undefined
   * @this {Object} App object
   */
  _changeTab(e) {
    this._themesBtn.classList.toggle("active");
    this._iconsBtn.classList.toggle("active");
  }

  /**
   * Toggles the visibility of the publish idea container.
   * @param {Object} e Pointer Event
   * @returns undefined
   * @this {Object} App object
   */
  _togglePublishIdea(e) {
    e.preventDefault();

    this.setAttribute(
      "aria-expanded",
      this.getAttribute("aria-expanded") === "true" ? "false" : "true"
    );
  }

  /**
   * Updates the remaining time to the next topic.
   * @returns undefined
   * @this {Object} App object
   */
  _updateRemainingTime() {
    const [remainingMins, remainingHours] = App.substractDates(
      this._topicRefreshDate,
      new Date()
    );
    this._remainingTopicTime.textContent = `Konunun bitimine ${remainingHours} saat ${remainingMins} dakika kaldı.`;
  }

  /**
   * A function which creates an interval which runs in Microtasks Queue rather than the Callback Queue.
   * @param {Function} callBack The callback function that will get executed in every seconds parameter.
   * @param {Number} seconds The seconds between interval calls.
   * @param {*} preferredThis The preferred this keyword.
   * @returns
   */
  static setTimerInterval(callBack, seconds, preferredThis = this) {
    return new Promise(async (resolve) => {
      try {
        await callBack.apply(preferredThis);
        setInterval(async () => {
          if (await callBack.apply(preferredThis)) resolve();
        }, seconds * 1000);
      } catch (err) {
        App.showError(err, 41);
      }
    });
  }

  /**
   * A function which substracts the two given dates.
   * @param {Object} firstDate the sooner date object
   * @param {Object} secondDate the earlier date object
   * @returns {Array} an array that contains differed min and hour
   */
  static substractDates(firstDate, secondDate) {
    const difMins = (firstDate - secondDate) / 1000 / 60;

    return [Math.round(difMins) % 60, Math.floor(difMins / 60)];
  }

  /**
   * A function which handles any given error and logs to the console.
   * @param {String} [errorMessage="Bilinmeyen bir hata meydana geldi. [scripts/script.js]"] The error message itself
   * @param {Number} [errorCode=54] The error code itself
   */
  static showError(
    errorMessage = "Bilinmeyen bir hata meydana geldi. [scripts/script.js]",
    errorCode = 54
  ) {
    console.error(`HATA: ${errorCode} - ${errorMessage}`);
  }
}

const application = new App();
