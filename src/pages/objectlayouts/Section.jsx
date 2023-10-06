import { useState } from "react";
import { useDrop } from "react-dnd";
import { ItemTypes } from "./ItemTypes.js";
import { Grid } from "@mui/material";
import FieldComponent from "./FieldComponent.jsx";
import { Typography } from "@mui/material";

function getStyle(backgroundColor) {
	return {
		border: "1px solid rgba(0,0,0,0.2)",
		minHeight: "8rem",
		minWidth: "8rem",
		color: "white",
		backgroundColor,
		padding: "2rem",
		paddingTop: "1rem",
		margin: "1rem",
		textAlign: "center",
		float: "left",
		fontSize: "1rem",
	};
}
const Section = props => {
	const { layoutJSON, setlayoutJSON, children } = props;

	const [hasDropped, setHasDropped] = useState(false);
	const [hasDroppedOnChild, setHasDroppedOnChild] = useState(false);
	const [state, setState] = useState([]);

	const [{ isOver, isOverCurrent }, drop] = useDrop(
		() => ({
			accept: ItemTypes.CARD,
			drop(_item, monitor) {
				const didDrop = monitor.didDrop();
				if (didDrop) {
					return;
				}
				if (layoutJSON.name == "Main Section" && layoutJSON.object_id == "") {
					const childObj = {
						name: _item.FIELD_NAME,
						object_id: _item.OBJ_ID,
						border_style: "",
						type: _item.DATA_TYPE,
						field_id: _item.FIELD_ID,
						isUnique: _item.IS_UNIQUE,
						child: [],
					};
					// console.log({
					// 	...layoutJSON,
					// child: [...layoutJSON.child, childObj],
					// });
					layoutJSON.child.push(childObj);
					console.log(layoutJSON);
					// console.log(layoutJSON.child.push(childObj));
					// } else {
					// 	console.log("masterField");
					// }
				} else {
					console.log("h");
					// const childObj = {
					// 	name: _item.FIELD_NAME,
					// 	object_id: _item.OBJ_ID,
					// 	border_style: "",
					// 	type: _item.DATA_TYPE,
					// 	field_id: _item.FIELD_ID,
					// 	isUnique: _item.IS_UNIQUE,
					// 	child: [],
					// };
					// // console.log({
					// // 	...layoutJSON,
					// // child: [...layoutJSON.child, childObj],
					// // });
					// layoutJSON.child.push(childObj);
				}

				console.log("----------");
				console.log(_item);
				const fieldComponent = (
					<FieldComponent
						layoutJSON={layoutJSON}
						setlayoutJSON={setlayoutJSON}
						item={_item}
					/>
				);
				state.push(fieldComponent);
				// console.log(state);

				setHasDropped(true);
				setHasDroppedOnChild(didDrop);
			},
			collect: monitor => ({
				isOver: monitor.isOver(),
				isOverCurrent: monitor.isOver({ shallow: true }),
			}),
		}),
		[setHasDropped, setHasDroppedOnChild]
	);

	return (
		<Grid
			item
			xs={12}
			ref={drop}
			sx={{
				padding: "1rem",
				marginTop: "1rem",
				borderRadius: "0.3rem",
				"&:hover": {
					borderColor: "red",
				},
				border: "2px dashed #7B8FA1",
			}}
		>
			<div
			// style={{
			// 	padding: "1rem",
			// }}
			// className="section-class"
			// onClick={e => {
			// 	console.log("Clicked");
			// 	e.target.classList.add("section-active");
			// }}
			// e.classList.add("section-active");
			>
				<Typography variant="h8" component="h8">
					Section
				</Typography>
				<br />
				{/* {hasDropped && <span>dropped {hasDroppedOnChild && " on child"}</span>} */}
				{state.map(ele => ele)}
				<div>{children}</div>
			</div>
		</Grid>
	);
};

export default Section;
