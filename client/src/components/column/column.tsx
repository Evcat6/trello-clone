import { colors } from "@atlaskit/theme";
import { useContext } from "react";
import type {
  DraggableProvided,
  DraggableStateSnapshot,
} from "@hello-pangea/dnd";
import { Draggable } from "@hello-pangea/dnd";

import type { Card } from "../../common/types";
import { CardsList } from "../card-list/card-list";
import { CardEvent } from "../../common/enums/card.enums";
import { DeleteButton } from "../primitives/delete-button";
import { Splitter } from "../primitives/styled/splitter";
import { Title } from "../primitives/title";
import { useSocket } from "../../hooks/useSocketContext";
import { Footer } from "./components/footer";
import { Container } from "./styled/container";
import { Header } from "./styled/header";
import { ListEvent } from "../../common/enums";

type Props = {
  listId: string;
  listName: string;
  cards: Card[];
  index: number;
};

export function Column({ listId, listName, cards, index }: Props) {
  const socket = useSocket();

  const onCreateCard = (cardName: string) => {
    socket.emit(CardEvent.CREATE, listId, cardName);
  };

  const onRemoveList = (): void => {
    socket.emit(ListEvent.DELETE, listId);
  };

  return (
    <Draggable draggableId={listId} index={index}>
      {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
        <Container
          className="column-container"
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <Header
            className="column-header"
            isDragging={snapshot.isDragging}
            {...provided.dragHandleProps}
          >
            <Title
              aria-label={listName}
              title={listName}
              onChange={() => {}}
              fontSize="large"
              width={200}
              bold
            />
            <Splitter />
            <DeleteButton color="#FFF0" onClick={onRemoveList} />
          </Header>
          <CardsList
            listId={listId}
            listType="CARD"
            style={{
              backgroundColor: snapshot.isDragging ? colors.G50 : "",
            }}
            cards={cards}
          />
          <Footer onCreateCard={onCreateCard} />
        </Container>
      )}
    </Draggable>
  );
}
