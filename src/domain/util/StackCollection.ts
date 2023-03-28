/**
 * Copy by this papper https://dev.to/glebirovich/typescript-data-structures-stack-and-queue-hld
 */

interface IStack<T> {
  push(item: T): void;
  pop(): T | undefined;
  peek(): T | undefined;
  size(): number;
}

abstract class Collection<T> {
  protected storage: T[] = [];

  size(): number {
    return this.storage.length;
  }
  abstract isFull(): boolean;
}

class StackCollection<T> extends Collection<T> implements IStack<T> {
  constructor(private capacity: number = Infinity) {
    super();
  }

  push(item: T) {
    if (this.isFull()) {
      throw Error("Stack has reached max capacity, you cannot add more items");
    }
    this.storage.push(item);
  }

  pop(): T | undefined {
    return this.storage.pop();
  }

  peek(): T | undefined {
    return this.storage[this.size() - 1];
  }

  isFull(): boolean {
    return this.capacity === this.size();
  }

  public getSomeItem(index: number): T | undefined {
    return this.storage[index];
  }
}


export default StackCollection;