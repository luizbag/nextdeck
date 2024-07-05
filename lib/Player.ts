export class Player {
  name: string;
  done: boolean = false;
  choice: string | number = "";
  reveal: boolean = false;

  constructor(name: string) {
    this.name = name;
  }
}
