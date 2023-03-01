import type { Socket } from "socket.io";

import { CardEvent } from "../common/enums";
import { CardPrototype } from "../utils/cardPrototype";
import { Card } from "../data/models/card";
import { SocketHandler } from "./socket.handler";

interface UpdateCard {
  card: Card;
  name?: string;
  description?: string;
}

export class CardHandler extends SocketHandler {
  public handleConnection(socket: Socket): void {
    socket.on(CardEvent.CREATE, this.createCard.bind(this));
    socket.on(CardEvent.REORDER, this.reorderCards.bind(this));
    socket.on(CardEvent.DELETE, this.removeCard.bind(this));
    socket.on(CardEvent.CHANGE_NAME, this.updateCardName.bind(this));
    socket.on(
      CardEvent.CHANGE_DESCRIPTION,
      this.updateCardDescription.bind(this)
    );
    socket.on(CardEvent.DUPLICATE, this.duplicateCard.bind(this));
  }

  public createCard(listId: string, cardName: string): void {
    const newCard = new Card(cardName, "");
    const lists = this.db.getData();
    const list = lists.find((list) => list.id === listId);

    if (!list) return;

    const updatedList = { ...list, cards: list.cards.concat(newCard) };
    this.db.setData(
      lists.map((list) => (list.id === listId ? updatedList : list))
    );
    this.updateLists();
  }

  private removeCard(listId: string, cardId: string): void {
    const lists = this.db.getData();
    const list = lists.find((list) => list.id === listId);

    if (!list) return;
    const updatedCards = list.cards.filter((card) => card.id !== cardId);
    const updatedList = { ...list, cards: updatedCards };
    this.db.setData(
      lists.map((list) => (list.id === listId ? updatedList : list))
    );
    this.updateLists();
  }

  private updateCardName({ listId, cardId, name }): void {
    const lists = this.db.getData();
    const list = lists.find((list) => list.id === listId);

    if (!list) return;

    const cardToUpdate = list.cards.find((card) => card.id === cardId);
    const updatedCard = this.updateCard({ card: cardToUpdate, name });
    const cardIndex = list.cards.indexOf(cardToUpdate);
    list.cards[cardIndex] = updatedCard;
    const updatedList = list;
    this.db.setData(
      lists.map((list) => (list.id === listId ? updatedList : list))
    );
    this.updateLists();
  }

  public updateCardDescription({ listId, cardId, description }): void {
    const lists = this.db.getData();
    const list = lists.find((list) => list.id === listId);

    if (!list) return;

    const cardToUpdate = list.cards.find((card) => card.id === cardId);
    const updatedCard = this.updateCard({ card: cardToUpdate, description });
    const cardIndex = list.cards.indexOf(cardToUpdate);
    list.cards[cardIndex] = updatedCard;
    const updatedList = list;
    this.db.setData(
      lists.map((list) => (list.id === listId ? updatedList : list))
    );
    this.updateLists();
  }

  public duplicateCard({ listId, cardId }): void {
    const lists = this.db.getData();
    const list = lists.find((list) => list.id === listId);
    const cardToDuplicate = list.cards.find((card) => card.id === cardId);

    const indexOfCard = list.cards.indexOf(cardToDuplicate);

    const cardCopy = new CardPrototype(cardToDuplicate);
    const newCard = cardCopy.clone();
    const updatedList = { ...list };
    updatedList.cards.splice(indexOfCard, 0, newCard);

    this.db.setData(
      lists.map((list) => (list.id === listId ? updatedList : list))
    );
    this.updateLists();
  }

  private updateCard({ card, name, description }: UpdateCard): Card {
    if (description) {
      card.description = description;
    }
    if (name) {
      card.name = name;
    }
    return card;
  }

  private reorderCards({
    sourceIndex,
    destinationIndex,
    sourceListId,
    destinationListId,
  }: {
    sourceIndex: number;
    destinationIndex: number;
    sourceListId: string;
    destinationListId: string;
  }): void {
    const lists = this.db.getData();
    const reordered = this.reorderService.reorderCards({
      lists,
      sourceIndex,
      destinationIndex,
      sourceListId,
      destinationListId,
    });
    this.db.setData(reordered);
    this.updateLists();
  }
}
