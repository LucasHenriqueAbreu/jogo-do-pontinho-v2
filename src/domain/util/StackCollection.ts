/**
 * Copy by this papper https://dev.to/glebirovich/typescript-data-structures-stack-and-queue-hld
 */

import Mark from "../game/entities/Mark/Mark";

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

// TODO: refactory to methods get;
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

  public pop(): T | undefined {
    return this.storage.pop();
  }

  public peek(): T | undefined {
    return this.storage[this.size() - 1];
  }

  public isFull(): boolean {
    return this.capacity === this.size();
  }

  public get length(): number {
    return this.storage.length;
  }

  // TODO: think in a better way, this way violate a POO principle
  public get list(): T[] {
    return this.storage;
  }

  public getSomeItem(index: number): T | undefined {
    return this.storage[index];
  }

}


export default StackCollection;