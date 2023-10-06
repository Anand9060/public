import React, { useRef } from "react";
import { useDrag } from "react-dnd";
import { COMPONENT } from "./constants";
import RenderComponent from "./RenderComponent";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

const style = {
	backgroundColor: "white",
	cursor: "move",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
};

const Component = ({ data, components, path }) => {
	const ref = useRef(null);

	const [{ isDragging }, drag] = useDrag({
		type: COMPONENT,
		item: { id: data.id, path },
		collect: monitor => ({
			isDragging: monitor.isDragging(),
		}),
	});

	const opacity = isDragging ? 0 : 1;
	drag(ref);

	const component = components[data.id];
	// console.log(component);

	return (
		<div
			ref={ref}
			style={{ ...style, opacity }}
			className="component draggable"
		>
			{/* <div>{data.id}</div> */}
			<DragIndicatorIcon fontSize="small" />
			<RenderComponent component={component} />
		</div>
	);
};
export default Component;
