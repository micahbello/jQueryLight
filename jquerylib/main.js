const DOMNodeCollection = require("./dom_node_collection.js");
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



window.$l = $l;

//solultion given by the course
// window.$l = (arg) => {
//   switch (typeof arg) {
//     case "function":
//       return registerDocReadyCallback(arg);
//     case "string":
//       // return getNodesFromDom(arg);
//       console.log("poop")
//     case "object":
//       if (arg instanceof HTMLElement) {
//         return new DomNodeCollection([arg]);
//       }
//   }
// };
