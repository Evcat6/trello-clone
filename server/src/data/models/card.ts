import { randomUUID } from "crypto";

class Card {
  public id: string;

  public name: string;

  public description: string;

  public createAt: Date;

  public constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
    this.createAt = new Date();
    this.id = randomUUID();
  }

  // PATTERN:{Prototype}
  public clone(): Card {
    const clone = Object.create(this);
    clone.name = this.name;
    clone.description = this.description;
    clone.id = randomUUID();
    clone.createAt = new Date();

    return clone;
  }
}

export { Card };
