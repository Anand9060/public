import React from "react";
import { Button, Grid } from "@mui/material";
import { useDrag } from "react-dnd";
import { ItemTypes } from "./ItemTypes";
const ReferenceMasterObject = ({ ele }) => {
  //   console.log(ele);
  const [{ isDragging, handlerId }, drag] = useDrag(() => ({
    type: ItemTypes.CARD,
    item: ele,
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        console.log(dropResult);
        console.log("+++++++++++++++++++++++++++++++++++++++++", item);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));

  return (
    <div>
      <Grid item xs={12} mt={1}>
        <Button fullWidth variant="outlined" ref={drag}>
          {ele.REFERENCE_OBJ_NAME}
        </Button>
      </Grid>
    </div>
  );
};

export default ReferenceMasterObject;
