import { useDraggable } from "@dnd-kit/core";
import { Card } from "antd";

const Draggable = ({ children }: { children: React.ReactNode }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: "draggable",
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <Card ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </Card>
  );
};

export default Draggable;
