import { useDroppable } from "@dnd-kit/core";
import { Card } from "antd";
import { CSSProperties } from "react";

const Droppable: React.FC<any> = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { isOver, setNodeRef } = useDroppable({
    id: "droppable",
  });

  const style: CSSProperties = {
    color: isOver ? "green" : undefined,
  };

  return (
    <Card ref={setNodeRef} style={style}>
      {children}
    </Card>
  );
};

export default Droppable;
