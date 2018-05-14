const DOMNodeCollection = require("./dom_node_collection.js");
// import DOMNodeCollection from './dom_node_collection.js';
//
function $l(selector) {

  if(document.readyState === "complete" && typeof selector === "function") {
    selector();
  }

  let queue = [];

  if (typeof selector === "string") {
    let nodelist = document.querySelectorAll(selector);
    nodelistArray = Array.from(nodelist);
    return new DOMNodeCollection(nodelistArray)
  } else if (typeof selector === "function") {
    queue.push(selector)
  }

  document.addEventListener("DOMContentLoaded", () => {
    for(let i = 0; i < queue.length; i++){
      queue[i]();
    }
  });
}

  $l.extend = (...args) => {
    return Object.assign(...args);
  }

  $l.ajax = (optionsObject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(optionsObject.type, optionsObject.url);
    xhr.send();
    xhr.onload = function () {
    console.log(xhr.status);
    console.log(JSON.parse(xhr.response));
    }
  }

window.$l = $l
