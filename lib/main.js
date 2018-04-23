const DOMNodeCollection = require("./dom_node_collection.js");

function $l(selector) {

  let nodelist = document.querySelectorAll(selector);
  nodelistArray = Array.from(nodelist);
  return new DOMNodeCollection(nodelistArray)
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
