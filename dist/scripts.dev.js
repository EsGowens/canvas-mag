"use strict";

var barba = require("./barba");

var runScripts = function runScripts() {
  var headers = document.querySelectorAll("h2, h3");
  var imageHolders = document.querySelectorAll("div.image");
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.intersectionRatio >= 0.1) {
        entry.target.classList.add("in-view");
      } else {
        entry.target.classList.remove("in-view");
      }
    });
  }, {
    threshold: [0, 0.1, 1]
  });
  headers.forEach(function (header) {
    observer.observe(header);
  });
  imageHolders.forEach(function (holder) {
    observer.observe(holder);
  });
};

runScripts();
barba.init({
  transitions: [{
    name: "switch",
    leave: function leave(_ref) {
      var current = _ref.current,
          next = _ref.next,
          trigger = _ref.trigger;
      return new Promise(function (resolve) {
        var timeline = gsap.timeline({
          onComplete: function onComplete() {
            resolve();
          }
        });
        timeline.to("header", {
          y: "-100"
        });
      });
    },
    enter: function enter(_ref2) {
      var current = _ref2.current,
          next = _ref2.next,
          trigger = _ref2.trigger;
      return new Promise(function (resolve) {
        var timeline = gsap.timeline({
          onComplete: function onComplete() {
            runScripts();
            resolve();
          }
        });
        timeline.to("header", {
          y: "0%"
        });
      });
    }
  }],
  views: [],
  debug: true
});