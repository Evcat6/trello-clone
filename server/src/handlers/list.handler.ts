import type { Socket } from "socket.io";

import { ListEvent } from "../common/enums";
import { List } from "../data/models/list";
import { SocketHandler } from "./socket.handler";

export class ListHandler extends SocketHandler {
  public handleConnection(socket: Socket): void {
    socket.on(ListEvent.CREATE, this.createList.bind(this));
    socket.on(ListEvent.GET, this.getLists.bind(this));
    socket.on(ListEvent.REORDER, this.reorderLists.bind(this));
    socket.on(ListEvent.DELETE, this.removeList.bind(this));
    socket.on(ListEvent.CHANGE_NAME, this.updateListName.bind(this));
  }

  private getLists(callback: (cards: List[]) => void): void {
    callback(this.db.getData());
  }

  private reorderLists(sourceIndex: number, destinationIndex: number): void {
    const lists = this.db.getData();
    const reorderedLists = this.reorderService.reorder(
      lists,
      sourceIndex,
      destinationIndex
    );
    this.db.setData(reorderedLists);
    this.updateLists();
  }

  private createList(name: string): void {
    const lists = this.db.getData();
    const newList = new List(name);
    this.db.setData(lists.concat(newList));
    this.updateLists();
  }

  private removeList(id: string): void {
    const lists = this.db.getData();
    const filteredLists = lists.filter((list) => list.id !== id);
    this.db.setData(filteredLists);
    this.updateLists();
  }

  private updateListName({ name, listId }): void {
    const lists = this.db.getData();
    const listToUpdate = lists.find((list) => list.id === listId);
    listToUpdate.name = name;
    this.db.setData(
      lists.map((list) => (list.id === listId ? listToUpdate : list))
    );
    this.updateLists();
  }
}
