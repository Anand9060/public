import React from "react";
import { ItemTypes } from "../ItemTypes";
import { useDrag } from "react-dnd";
import Button from "@mui/material/Button";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

const Card = props => {
	const { field } = props;
	const [{ isDragging }, drag] = useDrag(() => ({
		type: ItemTypes.CARD,
		item: field,
		end: (item, monitor) => {
			const dropResult = monitor.getDropResult();
			if (item && dropResult) {
				//console.log(item); // When The Item is Dropped
				// alert(`You dropped ${item.name} into ${dropResult.name}!`);
			}
		},
		collect: monitor => ({
			isDragging: monitor.isDragging(),
			handlerId: monitor.getHandlerId(),
		}),
	}));
	const opacity = isDragging ? 0.4 : 1;
	return (
		<Button
			ref={drag}
			style={{ opacity }}
			variant="outlined"
			data-testid={`card`}
			sx={{
				display: "flex",
				justifyContent: "flex-start",
				margin: "0.25rem",
			}}
		>
			{" "}
			<DragIndicatorIcon fontSize="small" />
			{field.FIELD_NAME}
		</Button>
	);
};

export default Card;
