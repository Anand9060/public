import React, { useEffect, useState, useMemo, useRef } from "react";

import { Button, Grid } from "@mui/material";
import { useDrag } from "react-dnd";
import { ItemTypes } from "./ItemTypes";

const FieldCard = ({ ele }) => {
  const [{ isDragging, handlerId }, drag] = useDrag(() => ({
    type: ItemTypes.CARD,
    item: ele,
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        // console.log(dropResult.props);
        console.log("+++++++++++++++++++++++++++++++++++++++++", item);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));

  const opacity = isDragging ? 0.4 : 1;
  return (
    <Grid item xs={12} mt={1}>
      <Button fullWidth variant="outlined" ref={drag}>
        {ele.NAME}
      </Button>
    </Grid>
  );
};

export default FieldCard;
