import CustomNode from "../utils/node";

type NodeType = null | CustomNode<any>;

/**
 * Singly Linked List
 * @class
 * @author Andrew Savelev <https://github.com/savelevcorr>
 * @version 1.0.0
 */
class SinglyLinkedList {
  head: NodeType;
  tail: NodeType;
  length: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  /**
   * Push a value in the list.
   * <ol>
   *     <li>Create a new node using the value passed as an argument</li>
   *     <li>
   *         If there is no head property on the list. set the head and tail
   *         to be the newly created node
   *     </li>
   *     <li>
   *         Otherwise set the next property on the tail to be the new node
   *         and set the tail property on the list to be the newly created node
   *     </li>
   *     <li>Increment the length by 1</li>
   *  </ol>
   * @param {any} value - a peace of data
   */
  push(value: unknown) {
    const newNode = new CustomNode(value);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail!.next = newNode;
      this.tail = newNode;
    }

    this.length++;
  }

  /**
   * Remove a node from the end of the Linked List
   * <ol>
   *     <li>If there are no nodes in the list, return undefined</li>
   *     <li>Otherwise, loop through the list until you reach the tail</li>
   *     <li>Set the next property of the 2nd to last node to be null</li>
   *     <li>Set the tail to be the 2nd to last node</li>
   *     <li>Decrement the length of the list by 1</li>
   *     <li>Return the value of the node removed</li>
   * </ol>
   */
  pop(): NodeType {
    let current: NodeType = this.head;
    let newTail = current;

    if (!this.length) {
      return null;
    }

    while (current!.next) {
      newTail = current;
      // @ts-ignore
      current = current!.next;
    }

    this.tail = newTail;
    this.tail!.next = null;
    this.length--;

    if (this.length === 0) {
      this.head = null;
      this.tail = null;
    }

    return current;
  }

  /**
   * <ol>
   *     <li>If there are no nodes, return undefined</li>
   *     <li>Store the current head property in a variable</li>
   *     <li>Set the current head property to be current's head next property</li>
   *     <li>Decrement the length by 1</li>
   *     <li>Return the value of the node removed</li>
   * </ol>
   */
  shift(): NodeType {
    if (!this.head) {
      return null;
    }

    let head: NodeType = this!.head;
    this.head = head!.next as CustomNode<any>;

    this.length--;

    return head;
  }

  /**
   * Set a new node to be the new head of the list
   * <ol>
   *     <li>Create a new node using the value passed to the function</li>
   *     <li>If there is no head property on the list, set the head and tail to be the newly created node</li>
   *     <li>
   *         Otherwise set the newly created node's <b><i>next</i></b> property
   *         to be the current head property on the list
   *     </li>
   *     <li>Set the head property on the list to be that newly created node</li>
   *     <li>Increment the length property by 1</li>
   *     <li>Return the linked list</li>
   * </ol>
   * @since 1.0.0
   * @param value - a peace of any data
   */
  unshift(value: unknown): this {
    const newHead = new CustomNode(value);

    if (!this.head) {
      this.head = newHead;
      this.tail = newHead;
    } else {
      newHead.next = this.head;

      this.head = newHead;
    }

    this.length++;

    return this;
  }

  /**
   * Get an element by index
   * <ol>
   *     <li>
   *         If the index is less than zero or greater than
   *         or equal to the length of the list return <b><i>null</i></b>
   *     </li>
   *     <li>Loop through the list until you reach the index</li>
   *     <li>Return the node at that specific index</li>
   * </ol>
   * @since 1.0.0
   * @param {number} index
   */
  get(index: number): NodeType {
    let current: NodeType = this.head;
    let counter = 0;
    if (index < 0 || index >= this.length) {
      return null;
    }

    while (counter !== index) {
      current = current!.next as CustomNode<any>;
      counter++;
    }

    return current;
  }

  /**
   * Changing the <b><i>value</i></b> of a node
   * based on it's position in the List;
   * <ol>
   *     <li>Use [get]{@link SinglyLinkedList#get} function to find the specific node</li>
   *     <li>If the node is not found, return false</li>
   *     <li>
   *         If the node is found, set the value of that node
   *         to be the value passed to the function and return true
   *     </li>
   * </ol>
   * @param {number} index
   * @param {any} value
   * @return {boolean}
   */
  set(index: number, value: unknown): boolean {
    const node = this.get(index);

    if (!node) {
      return false;
    }

    node.value = value;
    return true;
  }

  /**
   * Adding a node to the Linked List at a <b><i>specific</i></b> position
   * <ol>
   *     <li>
   *         If the index is less than zero or greater than the [length]{@link SinglyLinkedList#length}, return false
   *     </li>
   *     <li>
   *         If the index is the same as the length,
   *         [push]{@link SinglyLinkedList#push} a new node to the end of the list
   *     </li>
   *     <li>
   *         If the index is 0, [unshift]{@link SinglyLinkedList#unshift} a new node to the start of the list
   *     </li>
   *     <li>
   *         Otherwise, using the [get]{@link SinglyLinkedList#get} method, access the node at the index - 1
   *     </li>
   *     <li>
   *         Set the next property on that node to be the new node
   *     </li>
   *     <li>
   *         Set the next property on the new node to be the previous next
   *     </li>
   *     <li>
   *         Increment the [length]{@link SinglyLinkedList#length}
   *     </li>
   *     <li>
   *         Return true
   *     </li>
   * </ol>
   * @param index
   * @param value
   */
  insert(index: number, value: unknown): boolean {
    if (index < 0 || index > this.length) {
      return false;
    } else if (index === 0) {
      this.unshift(value);
      return true;
    } else if (index === this.length) {
      this.push(value);
      return true;
    } else {
      const node = this.get(index - 1);
      const prevNext = node!.next;
      const newNode = new CustomNode(value);

      node!.next = newNode;
      newNode.next = prevNext;

      this.length++;

      return true;
    }
  }

  /**
   * Removing a node form the Linked List at a <b><i>specific</i></b> position
   * <ol>
   *     <li>
   *         If the index if less than zero o greater than the [this.length]{@link SinglyLinkedList#length}, return undefined
   *     </li>
   *     <li>
   *         If the index is the same as the length -1, use [this.pop]{@link SinglyLinkedList#pop}
   *     </li>
   *     <li>
   *         If the index is zero, [this.shift]{@link SinglyLinkedList#shift}
   *     </li>
   *     <li>
   *         Otherwise, using the [this.get]{@link SinglyLinkedList#get} method, access the node at the index - 1
   *     </li>
   *     <li>
   *         Set the next property on that to be the next of the next node
   *     </li>
   *     <li>
   *        Decrement the length
   *     </li>
   *     <li>
   *         Return the value of the node removed
   *     </li>
   * </ol>
   * @param {number} index
   */
  remove(index: number): NodeType {
    if (index < 0 || index >= this.length) {
      return null;
    } else if (index === this.length - 1) {
      return this.pop();
    } else if (index === 0) {
      return this.shift();
    } else {
      let previousNode = this.get(index - 1);
      let removed = previousNode!.next as CustomNode<any>;

      previousNode!.next = removed?.next;

      this.length--;

      return removed;
    }
  }

  /**
   * Reversing the Linked List in place
   * <ol>
   *     <li>Swap the head and tail</li>
   *     <li>Create a variable called next</li>
   *     <li>Create a variable called prev</li>
   *     <li>
   *         Create a variable called node and initialize it
   *         to the [this.head]{@link SinglyLinkedList#head} property
   *     </li>
   *     <li>Loop through the list</li>
   *     <li>
   *         Set next to be the next property on whatever node is
   *     </li>
   *     <li>
   *         Set the next property on the node to be whatever prev is
   *     </li>
   *     <li>
   *         Set next to be the next property on whatever node is
   *     </li>
   *     <li>
   *         Set the prev to be the value of the node variable
   *     </li>
   *     <li>
   *         Set the node variable to be the value of the next variable
   *     </li>
   * </ol>
   */
  reverse() {
    let node: NodeType = this.head;
    let prev: NodeType = null;
    let next: NodeType;

    this.head = this.tail;
    this.tail = node;

    for (let i = 0; i < this.length; i++) {
      next = node!.next;
      node!.next = prev;
      prev = node;
      node = next;
    }
  }
}

export default SinglyLinkedList;
