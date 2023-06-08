import { useState } from "react";
import { DndContext } from "@dnd-kit/core";

import Draggable from "./draggable";
import Droppable from "./droppable";

const DragAndDropPage = () => {
  const [isDropped, setIsDropped] = useState(false);
  const draggableMarkup = (
    <Draggable>
      <div>Drag me</div>
    </Draggable>
  );

  const handleDragEnd:any = (e: any) => {
    if(e.over && e.over.id === 'droppable') {
      setIsDropped(true);
    }}
  

  return(
    <DndContext onDragEnd={handleDragEnd}>
        {!isDropped? draggableMarkup : null}
        <Droppable id="droppable">
            {isDropped? draggableMarkup : 'Drop here'}
        </Droppable>

    </DndContext>
  )
};

export default DragAndDropPage;