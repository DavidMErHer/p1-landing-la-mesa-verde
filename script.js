(function () {
  var params = new URLSearchParams(window.location.search);
  var sentState = params.get("sent");

  if (sentState !== "success" && sentState !== "error") {
    return;
  }

  var contactForm = document.querySelector("[data-contact-form]");
  if (!contactForm) {
    return;
  }

  var statusBox = contactForm.querySelector("[data-form-status]");
  if (!statusBox) {
    return;
  }

  var message =
    sentState === "success"
      ? contactForm.dataset.successMessage
      : contactForm.dataset.errorMessage;

  statusBox.textContent = message || "";
  statusBox.hidden = false;
  statusBox.classList.remove("is-success", "is-error");
  statusBox.classList.add(sentState === "success" ? "is-success" : "is-error");

  params.delete("sent");

  var cleanSearch = params.toString();
  var cleanUrl =
    window.location.pathname +
    (cleanSearch ? "?" + cleanSearch : "") +
    window.location.hash;

  window.history.replaceState({}, "", cleanUrl);
})();
