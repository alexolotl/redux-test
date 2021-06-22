import { EventEmitter } from 'events';

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export class FakeAPI extends EventEmitter {

  private interval: number = -1;
  private counter: number = 0;
  private name: string = 'initialName';

  constructor() {
    super();

    console.log('constructing fake api client');

    this.interval = setInterval(() => {
      this.counter = Math.floor(Math.random()*10000);
      this.emit('fake_api_increment_event', this.counter);
    }, 1000);
  }

  cleanup() {
    clearInterval(this.interval);
    this.interval = -1;
    this.name = 'initialName';
  }

  async asyncSetNameValue(newName: string) {
    await sleep(2000);
    this.name = newName;
    return newName;
  }

  async asyncGetNameValue() {
    await sleep(3000);
    return this.name;
  }
}