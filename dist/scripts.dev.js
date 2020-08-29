"use strict";

var bodyTag = document.querySelector("body");

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
    once: function once(_ref) {
      var current = _ref.current,
          next = _ref.next,
          trigger = _ref.trigger;
      return new Promise(function (resolve) {
        var images = document.querySelectorAll("img");
        gsap.set(next.container, {
          opacity: 0
        });
        imagesLoaded(images, function () {
          var timeline = gsap.timeline({
            onComplete: function onComplete() {
              resolve();
            }
          });
          timeline.to(next.container, {
            opacity: 1,
            delay: 1
          });
        });
      });
    },
    leave: function leave(_ref2) {
      var current = _ref2.current,
          next = _ref2.next,
          trigger = _ref2.trigger;
      return new Promise(function (resolve) {
        var timeline = gsap.timeline({
          onComplete: function onComplete() {
            current.container.remove();
            resolve();
          }
        });
        timeline.to("header", {
          y: "-100%"
        }, 0).to("footer", {
          y: "100%"
        }, 0).to(current.container, {
          opacity: 0
        });
      });
    },
    enter: function enter(_ref3) {
      var current = _ref3.current,
          next = _ref3.next,
          trigger = _ref3.trigger;
      return new Promise(function (resolve) {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
        var timeline = gsap.timeline({
          onComplete: function onComplete() {
            runScripts();
            resolve();
          }
        });
        timeline.set(next.container, {
          opacity: 0
        }).to("header", {
          y: "0%"
        }, 0).to("footer", {
          y: "0%"
        }, 0).to(next.container, {
          opacity: 1
        });
      });
    }
  }],
  views: [{
    namespace: "product",
    beforeEnter: function beforeEnter() {
      bodyTag.classList.add("product");
    },
    afterLeave: function afterLeave() {
      bodyTag.classList.remove("product");
    }
  }],
  debug: true
});