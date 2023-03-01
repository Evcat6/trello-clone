import { List } from "../data/models/list";
import { ReorderService } from "../services/reorder.service";

class ReorderServiceProxy {
  private reorderService: ReorderService;

  constructor(reorderService: ReorderService) {
    this.reorderService = reorderService;
  }

  public reorderCards({
    lists,
    sourceIndex,
    destinationIndex,
    sourceListId,
    destinationListId,
  }: {
    lists: List[];
    sourceIndex: number;
    destinationIndex: number;
    sourceListId: string;
    destinationListId: string;
  }): List[] {
    console.info(
      lists,
      sourceIndex,
      destinationIndex,
      sourceListId,
      destinationListId
    );

    return this.reorderService.reorderCards({
      lists,
      sourceIndex,
      destinationIndex,
      sourceListId,
      destinationListId,
    });
  }

  public reorder<T>(items: T[], startIndex: number, endIndex: number): T[] {
    console.info(items, startIndex, endIndex);
    return this.reorderService.reorder(items, startIndex, endIndex);
  }
}

export { ReorderServiceProxy };