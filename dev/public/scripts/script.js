"use strict";

import {
  UPDATE_REMAINING_TIME_SECONDS,
  PASSWORD_VALIDATION_ERROR,
  WATCH_IDEAS_CONFIG
} from "./config.js";

/**
 * The class which contains all the business logic, presentation logic, application logic, state and HTTP Library
 */
class App {
  _remainingTopicTime = document.querySelector(".summary__remaining-time");
  _publishIdeaBtn = document.querySelector(".publish-idea__btn");
  _themesBtn = document.querySelector(".shop-category-selector-button--themes");
  _iconsBtn = document.querySelector(".shop-category-selector-button--icons");
  _editProfileContainer = document.querySelector('.edit-profile-main');
  _inputLengthContainers = document.querySelectorAll(
    ".input-length--container"
  );
  _editProfileTabLinksContainer = document.querySelector(".edit-profile__tabs");
  _passwordInputs = document.querySelectorAll('input[type="password"]');
  _ideas = document.querySelectorAll('.idea');

  /**
   * The constructor function of the App class which makes the basic setup of the project.
   */
  constructor() {
    this._seenIdeas = [];
    this._loadingIdeas = false;

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

    if (this._editProfileContainer) {
      this._fixEditProfileTabs()
      this._setupEditProfileTabs()
    }

    this._setupPasswordValidations();

    if (this._ideas && this._ideas.length >= 1) 
    this._watchIdeas();
  }

  /**
   * A function that sends an AJAX request to back-end services, in order to show/load more ideas.
   * @returns undefined
   * @this {Object} App object
   */
  _loadIdeas() {
    // TODO: Back-end request will be sent here, also spinner
    console.log('More ideas is loading from back-end services...')
    this._loadingIdeas = true;
  }

  /**
   * A function that adds the idea seen by user, to the seenIdeas array.
   * @param {IntersectionObserverEntry} entry 
   * @returns undefined
   * @this {Object} App object
   */
  _addSeenIdea(entry) {
    if (entry.isIntersecting && !this._seenIdeas.includes(entry.target)) {
      this._seenIdeas.push(entry.target)
    }
  }

  /**
   * A function that manages the ideas that user's seen.
   * @param {Array} entries 
   * @param {IntersectionObserver} observer 
   * @returns undefined
   * @this {Object} App object
   */
  _manageSeenIdea(entries, observer) {
    entries.forEach(this._addSeenIdea.bind(this))

    if (!this._loadingIdeas && this._seenIdeas.length === this._ideas.length) {
      this._loadIdeas()
    } 
  }

  /**
   * A function that watches for ideas (waiting them to be seen).
   * @returns undefined
   * @this {Object} App object 
   */
  _watchIdeas() {
    const ideasObserver = new IntersectionObserver(this._manageSeenIdea.bind(this), WATCH_IDEAS_CONFIG)
    this._ideas.forEach((idea) => 
      ideasObserver.observe(idea)
    )
  }

  /**
   * A function that applies password validation for desired inputs. 
   * @returns undefined
   * @this {Object} App object
   */
  _setupPasswordValidations() {
    this._passwordInputs.forEach((passwordInput) => {
      passwordInput.addEventListener("input", function () {
        this.setCustomValidity("");
      });

      passwordInput.addEventListener("invalid", function () {
        this.setCustomValidity(PASSWORD_VALIDATION_ERROR);
      });
    });
  }

  /**
   * Does the cruical setup of changing between setting tabs.
   * @returns undefined
   * @this {Object} App object
   */
  _setupEditProfileTabs() {
    this._editProfileTabLinksContainer.addEventListener(
      "click",
      this._updateEditProfileTabs.bind(this)
    );
  }

  /**
   * Updates the tab and its content (according to the e param.)
   * @param {PointerEvent} e
   * @returns undefined
   * @this {Object} App object
   */
  _updateEditProfileTabs(e) {
    const editProfileItem = e.target.closest(".edit-profile__tabs-item");
    if (!editProfileItem) return;

    this._resetEditProfileTabs(true);

    const editProfileLink = editProfileItem.querySelector(
      ".edit-profile__tabs-link"
    );

    window.history.pushState(null, "", editProfileLink.href);
    editProfileLink.setAttribute("aria-current", "true");

    const newTabSection = document.querySelector(
      `.edit-profile__content${editProfileLink.getAttribute("href")}`
    );
    newTabSection.setAttribute("aria-current", "true");
  }

  /**
   * Resets all the tabs.
   * @returns undefined
   * @this {Object} App object
   */
  _resetEditProfileTabs(resetContent = false) {
    this._editProfileTabLinksContainer
      .querySelectorAll(".edit-profile__tabs-link")
      .forEach((editProfileLink) =>
        editProfileLink.setAttribute("aria-current", "false")
      );

    if (resetContent)
      document
        .querySelectorAll(".edit-profile__content")
        .forEach((editProfileContent) =>
          editProfileContent.setAttribute("aria-current", "false")
        );
  }

  /**
   * Fixes the problem of active states not showing.
   * @returns undefined
   * @this {Object} App object
   */
  _fixEditProfileTabs() {
    this._resetEditProfileTabs(true);

    const tabHash = window.location.hash;
    let currentTab = this._editProfileTabLinksContainer.querySelector(
      `.edit-profile__tabs-link[href="${tabHash}"]`
    );

    if (!currentTab)
      currentTab = this._editProfileTabLinksContainer.querySelector(
        ".edit-profile__tabs-link"
      );

    currentTab.setAttribute("aria-current", "true");

    document
      .querySelector(`.edit-profile__content${tabHash}`)
      .setAttribute("aria-current", "true");
  }

  /**
   * Does the cruical setup of incrementing the input/textarea counters.
   * @param {HTMLElement} inputLengthContainer
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
   * @param {HTMLElement} inputLengthContainer
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
   * @param {PointerEvent} e
   * @returns undefined
   * @this {Object} App object
   */
  _changeTab(e) {
    this._themesBtn.classList.toggle("active");
    this._iconsBtn.classList.toggle("active");
  }

  /**
   * Toggles the visibility of the publish idea container.
   * @param {PointerEvent} e Pointer Event
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
   * @returns undefined
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
   * @param {Date | Intl} firstDate the sooner date object
   * @param {Date | Intl} secondDate the earlier date object
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
