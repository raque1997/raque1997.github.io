// carpetaJs/date.js

document.addEventListener("DOMContentLoaded", function() {
    var yearSpan = document.getElementById("currentYear");
    var currentYear = new Date().getFullYear();
    yearSpan.textContent = currentYear;
  });
  