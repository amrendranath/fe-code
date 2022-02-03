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

  $("#btn-search").on("click", function (e) {
    e.preventDefault();
    localStorage.clear(); //Clears storage for next request
    email = $('input[type="text"]').val().toLowerCase();

    var x, y;
    regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (email.match(regEx)) {
      x = true;
    } else {
      x = false;
    }

    if (x === true) {
      document.querySelector('input[type="text"]').parentNode.classList.remove("error");
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
      document.querySelector('input[type="text"]').parentNode.classList.add("error");
    }
  });

  $('input[type="text"]').keypress(function (event) {
    email = $('input[type="text"]').val().toLowerCase();
    regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (email.match(regEx)) {
      x = true;
      document.querySelector('input[type="text"]').parentNode.classList.remove("error");
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
        document.querySelector('input[type="text"]').parentNode.classList.add("error");
      }
    }
  });
});
