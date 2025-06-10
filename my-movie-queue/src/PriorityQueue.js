export class PriorityQueue {
  constructor() {
    this.queue = [];
  }

  enqueue(movie) {
    this.queue.push(movie);
    this.queue.sort((a, b) => b.priority - a.priority); // Descending
  }

  dequeue() {
    return this.queue.shift(); // Highest priority first
  }

  getAll() {
    return [...this.queue];
  }

  clear() {
    this.queue = [];
  }
}
