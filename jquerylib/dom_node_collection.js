class DOMNodeCollection {
  constructor(elements){ //should only receive an array
    this.elements = elements
  }


  html(arg) {
    if (!arg) {
      return this.elements[0].textContent;
    } else {
      this.elements.forEach(node => {
        node.innerHTML = arg
      });
    }
  }

  empty() {
    this.elements.forEach(node => {
      node.innerHTML = "";
    });
  }

  append(arg) {
    this.elements.forEach(node => {
      node.innerHTML = node.innerHTML + arg;
    });
  }


  children() {
    let childrenArray = [];
    this.elements.forEach(node => {
      for (let i = 0; i < node.children.length; i++) {
        childrenArray.push(node.children[i])
      }
    });
    return new DOMNodeCollection(childrenArray);
  }

  parent() {
    let parentsArray = [];

    this.elements.forEach(node => {
      parentsArray.push(node.parentNode);
    });
    return new DOMNodeCollection(parentsArray);
  }

  find(arg) {
    let matchingDescendants = [];

    this.elements.forEach(node => {
      matchingDescendants.push(node.querySelectorAll(arg));
    });

    let matchingDescendantsArray = [];

    for(let i=0; i < matchingDescendants.length; i++) {
      for (let j=0; j < matchingDescendants[i].length; j++) {
        matchingDescendantsArray.push(matchingDescendants[i][j]);
      }
    }
    return new DOMNodeCollection(matchingDescendantsArray);
  }

  remove(arg) {

   this.elements.forEach(node => {
    if (!arg){
      node.remove();
      } else {
        arg === "." + node.className ? node.remove() : null
      }
   });
  }

  on(e, callback) {
    this.elements.forEach(node => {
      node.addEventListener(e, callback)
      node.callback = callback
    });
  }

  off(e) {
    this.elements.forEach(node => {
      node.removeEventListener(e, node.callback);
    });
  }

  attr(attribute, value) { //yesh li be'aya im zeh, aval oved.

      if (!value) {
        return this.elements[0].attributes[attribute].nodeValue
      } else {
        this.elements.forEach((element) => {
          element.attributes[attribute].nodeValue = value
        });
      }
  }

}

module.exports = DOMNodeCollection;
