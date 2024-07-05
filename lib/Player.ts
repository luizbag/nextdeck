export class Player {
  id: string;
  name: string;
  done: boolean = false;
  choice: string | number = "";
  reveal: boolean = false;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}
