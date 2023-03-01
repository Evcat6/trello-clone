import type { DraggableProvided } from "@hello-pangea/dnd";

import { useSocket } from "../../hooks/useSocketContext";
import type { Card } from "../../common/types";
import { CopyButton } from "../primitives/copy-button";
import { DeleteButton } from "../primitives/delete-button";
import { Splitter } from "../primitives/styled/splitter";
import { Text } from "../primitives/text";
import { Title } from "../primitives/title";
import { Container } from "./styled/container";
import { Content } from "./styled/content";
import { Footer } from "./styled/footer";
import { CardEvent } from "../../common/enums";

type Props = {
  card: Card;
  isDragging: boolean;
  provided: DraggableProvided;
  listId: string;
};

export function CardItem({ card, isDragging, provided, listId }: Props) {
  const socket = useSocket();

  const onDuplicate = (): void => {
    socket.emit(CardEvent.DUPLICATE, { listId, cardId: card.id });
  };

  const onDeleteCard = (): void => {
    socket.emit(CardEvent.DELETE, listId, card.id);
  };

  const onNameUpdate = (name: string): void => {
    socket.emit(CardEvent.CHANGE_NAME, { listId, cardId: card.id, name });
  };

  const onDescriptionUpdate = (description: string): void => {
    socket.emit(CardEvent.CHANGE_DESCRIPTION, {
      listId,
      cardId: card.id,
      description,
    });
  };

  return (
    <Container
      className="card-container"
      isDragging={isDragging}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      data-is-dragging={isDragging}
      data-testid={card.id}
      aria-label={card.name}
    >
      <Content>
        <Title
          onChange={onNameUpdate}
          title={card.name}
          fontSize="large"
          bold
        />
        <Text text={card.description} onChange={onDescriptionUpdate} />
        <Footer>
          <DeleteButton onClick={onDeleteCard} />
          <Splitter />
          <CopyButton onClick={onDuplicate} />
        </Footer>
      </Content>
    </Container>
  );
}
