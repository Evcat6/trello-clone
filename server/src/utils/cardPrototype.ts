// PATTERN:{Prototype}

import { randomUUID } from "crypto";
import { Card } from "../data/models/card";

class CardPrototype {
  card: Card;

  constructor(card: Card) {
    this.card = card;
  }

  public clone(): Card {
    let copy = {};
    copy["name"] = this.card.name;
    copy["description"] = this.card.description;
    copy["id"] = randomUUID();
    copy["createAt"] = new Date();
    return copy as Card;
  }
}

export { CardPrototype };
