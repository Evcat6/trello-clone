import type {
  DraggableLocation,
  DroppableProvided,
  DropResult,
} from "@hello-pangea/dnd";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import React, { useContext, useEffect, useState } from "react";

import { CardEvent, ListEvent } from "../common/enums";
import type { List } from "../common/types";
import { Column } from "../components/column/column";
import { ColumnCreator } from "../components/column-creator/column-creator";
import { SocketContext } from "../context/socket";
import { reorderLists, reorderCards } from "../services/reorder.service";
import { Container } from "./styled/container";

export function Workspace() {
  const [lists, setLists] = useState<List[]>([]);

  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.emit(ListEvent.GET, (lists: List[]) => setLists(lists));
    socket.on(ListEvent.UPDATE, (lists: List[]) => setLists(lists));
  }, []);

  const onCreateList = (listName: string): void => {
    socket.emit(ListEvent.CREATE, listName);
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { source } = result;
    const { destination } = result;

    const isNotMoved =
      source.droppableId === destination.droppableId &&
      source.index === destination?.index;

    if (isNotMoved) return;

    const isReorderColumns = result.type === "COLUMN";

    if (isReorderColumns) {
      setLists(reorderLists(lists, source.index, destination.index));
      socket.emit(ListEvent.REORDER, source.index, destination.index);

      return;
    }

    setLists(reorderCards(lists, source, destination));
    socket.emit(CardEvent.REORDER, {
      sourceListId: source.droppableId,
      destinationListId: destination.droppableId,
      sourceIndex: source.index,
      destinationIndex: destination.index,
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="board" type="COLUMN" direction="horizontal">
        {(provided: DroppableProvided) => (
          <Container
            className="workspace-container"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {lists.map((list: List, index: number) => (
              <Column
                key={list.id}
                index={index}
                listName={list.name}
                cards={list.cards}
                listId={list.id}
              />
            ))}
            {provided.placeholder}
            <ColumnCreator onCreateList={onCreateList} />
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  );
}
