import { Typography } from "@mui/material";
import React from "react";
import { useDrag } from "react-dnd";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

const SideBarItem = ({ data }) => {
	const [{ opacity }, drag] = useDrag({
		type: data.type,
		item: data,
		collect: monitor => ({
			opacity: monitor.isDragging() ? 0.4 : 1,
		}),
	});

	return (
		<div className="sideBarItem" ref={drag} style={{ opacity }}>
			<DragIndicatorIcon fontSize="small" />
			<div>
				<Typography variant="button" display="block">
					{data.component.contnent}
				</Typography>
				<Typography variant="caption">{data.component.type}</Typography>
			</div>
		</div>
	);
};

export default SideBarItem;
