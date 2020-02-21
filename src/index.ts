interface QueueStore {
  promise: () => Promise<any>;
  resolve: (v: any) => void;
  reject: (e: any) => void;
}

class Queue {
  private queue: QueueStore[] = [];

  private workingOnPromise = false;

  private stop = false;

  push = (promise: QueueStore['promise']) => {
    return new Promise<any>((resolve, reject) => {
      this.queue.push({
        promise,
        resolve,
        reject,
      });
      this.dequeue();
    });
  };

  private dequeue = () => {
    if (this.workingOnPromise) {
      return;
    }
    if (this.stop) {
      this.queue = [];
      this.stop = false;

      return;
    }
    const item = this.queue.shift();
    if (!item) {
      return;
    }
    try {
      this.workingOnPromise = true;
      item
        .promise()
        .then(value => {
          this.workingOnPromise = false;
          item.resolve(value);
          this.dequeue();
        })
        .catch(err => {
          this.workingOnPromise = false;
          item.reject(err);
          this.dequeue();
        });
    } catch (err) {
      this.workingOnPromise = false;
      item.reject(err);
      this.dequeue();
    }
  };
}

export function create() {
  return new Queue();
}

export default create();
