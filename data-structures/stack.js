/*

STACK

Abstract data type --> Last in, first out --> record stack
Collection of elements with push and pop operations.
Elements are removed in the reverse order of their addition.

DO NOT use an array and the native push/pop method.
Instead, use an object as the underlying data structure.


*** Operations:

myStack.push(value)
=> adds value to collection & returns count of stack

myStack.pop()
=> removes & returns last item in collection

myStack.peek()
=> returns last item in collection (without removing it)

myStack.count()
=> returns # of elements in stack


*** Additional Exercises:

Modify your stack to take a max capacity and return a string if you try to add an element when there's no more room:
-- myStack.push(value) => "Max capacity already reached. Remove element before adding a new one."

Create a contains method to check if a value is in the stack:
-- myStack.contains('findme') => true/false   (time complexity?)

Create an 'until' method geting # of pops until a certain value:
-- stack values - (first)2-5-7-3-6-9(last)
-- myStack.until(7) => 4    (time complexity?)

*/

function Stack(capacity) {
  this._capacity = capacity || Infinity;
  this._storage = {};
  this._count = 0;
}

Stack.prototype.push = function(value) { // under-the-hood push
  if (this._count < this._capacity) {
    this._storage[this._count++] = value; // 
    return this._count;
  }
  return `Max capacity already reached. 
          Remove element before adding a new one.`;
}; // O(1)

Stack.prototype.pop = function() { // under-the-hood pop
  if (this._count === 0) {
    return `No element inside the stack. 
            Add element before poping.`;
  }
  var value = this.storage[--this._count];
  delete this._storage[this._count];
  if (this._count < 0) {
    this._count = 0;
  }
  return value;
}; // O(1)

Stack.prototype.peek = function() {
  return this._storage[this._count - 1];
}; // O()

Stack.prototype.count = function() {
  return this._count;
}; // O()

/*
*** Exercises:

1. Implement a stack with a min method that returns the minimum
 element currently in the stack...with O(1) & handles duplicates.

2. Sort a stack's elements in ascending order.

3. Given a string, is the parenthesis in the string balanced?
Ex: balancedParens( 'sqrt(5*(3+8)/(4-2))' ) => true
Ex: balancedParens( 'Math.min(5,(6-3))(' ) => false

4. Towers of Hanoi --> https://en.wikipedia.org/wiki/Tower_of_Hanoi
-- Given three towers (stacks) and N disks, each of different
size... with three limitations:
   1. may only move one disk at a time.
   2. may only use pop (removes top element) & push (adds to the top).
   3. no disk may be placed on top of a smaller disk.
Disks begin on tower#1. 
-- Write a function that moves the disks from tower#1 to tower#3.
 */


// Write a min stack
function MinStack(capacity) {
  this._capacity = capacity;
  this._storage = {};
  this._count = 0;
  this._min = new Stack();
}

// O(1)
MinStack.prototype.push = function(value) {
  if (this._count < this._capacity) {
    if (this._min.peek() < value) {
      this._min.push(this._min.peek());
    } else {
      this._min.push(value);
    }
    this._storage[this._count++] = value;
    return this._count;
  }
  return 'Max capacity already reached. Remove element before adding a new one.';
};

// O(1)
MinStack.prototype.pop = function() {
  this._min.pop();
  var value = this._storage[--this._count];
  delete this._storage[this._count];
  if (this._count < 0) {
    this._count = 0;
  }
  return value;
};

// O(1)
MinStack.prototype.peek = function() {
  return this._storage[this._count-1];
};

// O(1)
MinStack.prototype.count = function() {
  return this._count;
};

// O(1)
MinStack.prototype.min = function() {
  return this._min.peek();
};