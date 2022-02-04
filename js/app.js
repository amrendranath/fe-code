$(document).ready(function () {
  function showLoader() {
    document.querySelector(".above-the-fold")?.classList?.add("d-none");
    document.querySelector(".features")?.classList?.add("d-none");
    document.querySelector(".result")?.classList?.add("d-none");
    document.querySelector(".search-again")?.classList?.add("d-none");
    document.querySelector(".loading")?.classList?.add("d-flex");
  }

  function hideLoader() {
    document.querySelector(".above-the-fold")?.classList?.remove("d-none");
    document.querySelector(".features")?.classList?.remove("d-none");
    document.querySelector(".result")?.classList?.remove("d-none");
    document.querySelector(".search-again")?.classList?.remove("d-none");
    document.querySelector(".loading")?.classList?.remove("d-flex");
  }

  $("#btn-email-search").on("click", function (e) {
    e.preventDefault();
    localStorage.clear(); //Clears storage for next request
    email = $('input[type="email"]').val().toLowerCase();

    var x, y;
    regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (email.match(regEx)) {
      x = true;
    } else {
      x = false;
    }

    if (x === true) {
      document.querySelector('input[type="email"]').parentNode.classList.remove("error");
      const proxyurl = "";
      const url = "https://ltv-data-api.herokuapp.com/api/v1/records.json?email=" + email;
      showLoader();
      fetch(proxyurl + url)
        .then((response) => response.text())
        .then(function (contents) {
          localStorage.setItem("userObject", contents);
          hideLoader();
          window.location.href = "result.html";
        })
        .catch((e) => console.log(e));
    } else if (x !== true) {
      document.querySelector('input[type="email"]').parentNode.classList.add("error");
    }
  });

  $('input[type="email"]').keypress(function (event) {
    email = $('input[type="email"]').val().toLowerCase();
    regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (email.match(regEx)) {
      x = true;
      document.querySelector('input[type="email"]').parentNode.classList.remove("error");
    } else {
      x = false;
    }
    keycode = event.keyCode ? event.keyCode : event.which;
    if (keycode == "13") {
      /**
       * Makes a request to ltv API to search an specific email address.
       * If there's a response, it gets stored in the local storage and redirects to results page
       */
      event.preventDefault();
      localStorage.clear(); //Clears storage for next request

      var x, y;

      if (x === true) {
        const proxyurl = "";
        const url = "https://ltv-data-api.herokuapp.com/api/v1/records.json?email=" + email;
        showLoader();
        fetch(proxyurl + url)
          .then((response) => response.text())
          .then(function (contents) {
            localStorage.setItem("userObject", contents);
            hideLoader();
            window.location.href = "result.html";
          })
          .catch((e) => console.log(e));
      } else if (x !== true) {
        document.querySelector('input[type="email"]').parentNode.classList.add("error");
      }
    }
  });

  // Mobile
  $("#btn-phone-search").on("click", function (e) {
    e.preventDefault();
    localStorage.clear(); //Clears storage for next request
    phone = $('input[type="tel"]').val().toLowerCase();

    var x, y;
    regEx = /^\d{10}$/;
    if (phone.match(regEx)) {
      x = true;
    } else {
      x = false;
    }

    if (x === true) {
      document.querySelector('input[type="tel"]').parentNode.classList.remove("error");
      const proxyurl = "";
      const url = "https://ltv-data-api.herokuapp.com/api/v1/records.json?phone=" + phone;
      showLoader();
      fetch(proxyurl + url)
        .then((response) => response.text())
        .then(function (contents) {
          localStorage.setItem("userObject", contents);
          hideLoader();
          window.location.href = "result.html";
        })
        .catch((e) => console.log(e));
    } else if (x !== true) {
      document.querySelector('input[type="tel"]').parentNode.classList.add("error");
    }
  });

  $('input[type="tel"]').keypress(function (event) {
    phone = $('input[type="tel"]').val().toLowerCase();
    regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (phone.match(regEx)) {
      x = true;
      document.querySelector('input[type="tel"]').parentNode.classList.remove("error");
    } else {
      x = false;
    }
    keycode = event.keyCode ? event.keyCode : event.which;
    if (keycode == "13") {
      /**
       * Makes a request to ltv API to search an specific phone address.
       * If there's a response, it gets stored in the local storage and redirects to results page
       */
      event.preventDefault();
      localStorage.clear(); //Clears storage for next request

      var x, y;

      if (x === true) {
        const proxyurl = "";
        const url = "https://ltv-data-api.herokuapp.com/api/v1/records.json?phone=" + phone;
        showLoader();
        fetch(proxyurl + url)
          .then((response) => response.text())
          .then(function (contents) {
            localStorage.setItem("userObject", contents);
            hideLoader();
            window.location.href = "result.html";
          })
          .catch((e) => console.log(e));
      } else if (x !== true) {
        document.querySelector('input[type="tel"]').parentNode.classList.add("error");
      }
    }
  });
});
