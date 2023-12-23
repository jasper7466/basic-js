const { NotImplementedError } = require('../extensions/index.js');

class ChainLink {
  constructor(value) {
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

/**
 * Implement chainMaker object according to task description
 *
 */
const chainMaker = {
  length: 0,
  head: null,
  tail: null,
  getLength() {
    return this.length;
  },
  addLink(value) {
    const newLink = new ChainLink(value);

    newLink.prev = this.tail;
    newLink.next = null;

    if (this.tail !== null) {
      this.tail.next = newLink;
    }

    this.tail = newLink;

    if (!this.head) {
      this.head = newLink;
    }

    this.length++;

    return this;
  },
  removeLink(position) {
    if (
      typeof position !== 'number' ||
      position < 1 ||
      position > this.length
    ) {
      this._flush();
      throw new Error(`You can't remove incorrect link!`);
    }

    const linkToRemove = this._getLinkByIndex(position);

    if (linkToRemove.prev) {
      linkToRemove.prev.next = linkToRemove.next;
    }

    if (linkToRemove.next) {
      linkToRemove.next.prev = linkToRemove.prev;
    }

    if (linkToRemove === this.head) {
      this.head = linkToRemove.next;
    }

    if (linkToRemove === this.tail) {
      this.tail = linkToRemove.prev;
    }

    this.length--;

    return this;
  },
  reverseChain() {
    let currentLink = this.head;

    while (currentLink) {
      const nextLink = currentLink.next;

      currentLink.next = currentLink.prev;
      currentLink.prev = nextLink;

      currentLink = nextLink;
    }

    [this.head, this.tail] = [this.tail, this.head];

    return this;
  },
  finishChain() {
    let values = [];

    let link = this.head;

    while (link) {
      values.push(link.value);
      link = link.next;
    }

    values = values.map((item) => `( ${item} )`);

    this._flush();

    return values.join('~~');
  },

  _getLinkByIndex(index) {
    if (index < 0 || index >= this.length) {
      throw new Error(`Link index out of range`);
    }

    let link = this.head;

    while (link.next && index > 1) {
      link = link.next;
      index--;
    }

    return link;
  },

  _flush() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  },
};

module.exports = {
  chainMaker,
};
