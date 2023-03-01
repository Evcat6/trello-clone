import { AddIcon } from "../icons/add-icon";
import { Button } from "./styled/button";

type Props = {
  onClick: () => void;
};

function AddButton({ onClick }: Props) {
  return (
    <Button className="add-btn" onClick={onClick}>
      <AddIcon />
    </Button>
  );
}

export { AddButton };
