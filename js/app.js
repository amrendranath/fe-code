$(document).ready(function () {
  const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  const PHONE_REGEX = /^\d{10}$/;

  /**
   * Validate the email
   * @param {string} email
   * @returns {boolean} true | false
   */
  const isEmailValid = (email) => {
    return !!email.match(EMAIL_REGEX);
  };

  /**
   * Validate the phone number
   * @param {string} phone
   * @returns {boolean} true | false
   */
  const isPhoneValid = (phone) => {
    return !!phone.match(PHONE_REGEX);
  };

  /**
   * Method used tp set value in local storage with respect to the key.
   * @param {string} key the key you wants to store in local storage
   * @param {*} value the data you wants to store in the key
   * @returns
   */
  const setItemInLocalStorage = (key, value) => localStorage.setItem(key, value);

  /**
   * Method used to retrive data
   * @param {string} key the dat
   * @returns {string} stringify data
   */
  const getItemFromLocalStorage = (key) => localStorage.getItem(key);

  /**
   * Used to clear the local storage
   * @returns
   */
  const clearLocalStorage = () => localStorage.clear();

  /**
   * To show the loader on the page.
   */
  function showLoader() {
    document.querySelector(".above-the-fold")?.classList?.add("d-none");
    document.querySelector(".features")?.classList?.add("d-none");
    document.querySelector(".result")?.classList?.add("d-none");
    document.querySelector(".search-again")?.classList?.add("d-none");
    document.querySelector(".loading")?.classList?.add("d-flex");
  }

  /**
   * To hide the loader on the page.
   */
  function hideLoader() {
    document.querySelector(".above-the-fold")?.classList?.remove("d-none");
    document.querySelector(".features")?.classList?.remove("d-none");
    document.querySelector(".result")?.classList?.remove("d-none");
    document.querySelector(".search-again")?.classList?.remove("d-none");
    document.querySelector(".loading")?.classList?.remove("d-flex");
  }

  /**
   * Method is used to get the user.
   * @param {string} url
   */
  const getUser = (url) => {
    const proxyurl = "";
    fetch(proxyurl + url)
      .then((response) => response.text())
      .then(function (contents) {
        setItemInLocalStorage("userObject", contents);
        hideLoader();
        window.location.href = "result.html";
      })
      .catch((e) => console.log(e));
  };

  $("#btn-email-search").on("click", function (e) {
    e.preventDefault();
    clearLocalStorage; //Clears storage for next request
    const email = $('input[type="email"]').val().toLowerCase();

    if (isEmailValid(email)) {
      document.querySelector('input[type="email"]').parentNode.classList.remove("error");
      const url = "https://ltv-data-api.herokuapp.com/api/v1/records.json?email=" + email;
      showLoader();
      getUser(url);
    } else {
      document.querySelector('input[type="email"]').parentNode.classList.add("error");
    }
  });

  $('input[type="email"]').keypress(function (event) {
    const email = $('input[type="email"]').val().toLowerCase();
    const keycode = event.keyCode ? event.keyCode : event.which;
    let x;
    if (isEmailValid(email)) {
      x = true;
      document.querySelector('input[type="email"]').parentNode.classList.remove("error");
    } else {
      x = false;
    }

    if (keycode === 13) {
      /**
       * Makes a request to ltv API to search an specific email address.
       * If there's a response, it gets stored in the local storage and redirects to results page
       */
      event.preventDefault();
      clearLocalStorage(); //Clears storage for next request

      if (x === true) {
        showLoader();
        const url = "https://ltv-data-api.herokuapp.com/api/v1/records.json?email=" + email;
        getUser(url);
      } else if (x !== true) {
        document.querySelector('input[type="email"]').parentNode.classList.add("error");
      }
    }
  });

  // Mobile
  $("#btn-phone-search").on("click", function (e) {
    e.preventDefault();
    clearLocalStorage; //Clears storage for next request
    const phone = $('input[type="tel"]').val().toLowerCase();

    if (isPhoneValid(phone)) {
      document.querySelector('input[type="tel"]').parentNode.classList.remove("error");
      showLoader();
      const url = "https://ltv-data-api.herokuapp.com/api/v1/records.json?phone=" + phone;
      getUser(url);
    } else {
      document.querySelector('input[type="tel"]').parentNode.classList.add("error");
    }
  });

  $('input[type="tel"]').keypress(function (event) {
    const phone = $('input[type="tel"]').val().toLowerCase();
    let x;
    if (isPhoneValid(phone)) {
      x = true;
      document.querySelector('input[type="tel"]').parentNode.classList.remove("error");
    } else {
      x = false;
    }
    const keycode = event.keyCode ? event.keyCode : event.which;

    if (keycode === 13) {
      /**
       * Makes a request to ltv API to search an specific phone address.
       * If there's a response, it gets stored in the local storage and redirects to results page
       */
      event.preventDefault();
      clearLocalStorage(); //Clears storage for next request

      if (x === true) {
        showLoader();
        const url = "https://ltv-data-api.herokuapp.com/api/v1/records.json?phone=" + phone;
        getUser(url);
      } else if (x !== true) {
        document.querySelector('input[type="tel"]').parentNode.classList.add("error");
      }
    }
  });
});
