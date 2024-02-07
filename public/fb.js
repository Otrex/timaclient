(function (d, s, id) {
  var js,
    fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {
    return;
  }
  js = d.createElement(s);
  js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
})(document, "script", "facebook-jssdk");

window.fbAsyncInit = function (fields = "name, email") {
  return {
    FB,
    init: () =>
      FB.init({ appId: "1871358313281038", xfbml: true, version: "v18.0" }),
    login: (loginCb, meCb, errorCb) => {
      FB.login(function (response) {
        if (response.authResponse) {
          console.log("Welcome!  Fetching your information.... ");
          loginCb(response);
          FB.api("/me", { fields }, function (response) {
            meCb(response);
            return;
          });
        } else {
          errorCb(new Error("Login failed"));
          console.log("User cancelled login or did not fully authorize.");
        }
      });
    },
  };
};

window.FB = FB;
