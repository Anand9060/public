import { Component, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Popover } from "rsuite";
import {
	Grid,
	Button,
	InputLabel,
	Paper,
	Popper,
	FormControl,
	IconButton,
	Select,
	MenuItem,
} from "@mui/material";
import { useDrop } from "react-dnd";
import { ItemTypes } from "./ItemTypes";
import { useDispatch, useSelector } from "react-redux";
import SectionProperties from "./SectionProperties";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import shortid from "shortid";
import FieldGenerator from "./FieldGenerator";
import Divider from "@mui/material/Divider";
import { setcurrentConfig } from "./LayoutJsonSlice";
import { deleteSectionLayout } from "../../services/PageLayoutApi";

const mainBoxStyle = {
	width: "100%",
	minHeight: "5rem",
	marginTop: "0.1rem",
};

const Section = props => {
	let { layout, mainlayoutState, setlayoutState, rerender, setrerender, handleDelete } =
		props;
	const dispatch = useDispatch();
	const configState = useSelector(state => state.layoutJsonState.savedata);
	const configWidth = useSelector(
		state => state.layoutJsonState.currentSection.width
	);
	const [hasDropped, setHasDropped] = useState(false);
	const [hasDroppedOnChild, setHasDroppedOnChild] = useState(false);
	const [openPoper, setopenPoper] = useState(false);

	// useEffect(() => {
	//   // layout.width = configWidth;
	//   addWidthToSection(mainlayoutState, layout.section_id, configWidth);
	// }, [configWidth]);

	const addItemToLayout = _item => {
		const itemObj = {
			..._item,
			CHILDREN: [],
			PARENT_SECTION_ID: layout.SECTION_ID,
			SECTION_ID: `${layout.SECTION_ID}*${new Date().getTime()}`,
		};
		if (layout["CHILDREN"]?.length === 0) {
			layout.CHILDREN = [itemObj];
		} else {
			const childArr = Object.values(layout.CHILDREN);
			childArr.push(itemObj);
			layout.CHILDREN = childArr;
		}
		// console.log(layout);
		// console.log(configState);
		// addChildToMainObj(layout, configState);
	};

	function addWidthToSection(obj, SECTION_ID, WIDTH) {
		if (obj.SECTION_ID === SECTION_ID) {
			console.log(obj);
			obj["WIDTH"] = WIDTH;
		} else if (obj.CHILDREN) {
			for (let i = 0; i < obj.CHILDREN.length; i++) {
				addWidthToSection(obj.CHILDREN[i], SECTION_ID, WIDTH);
			}
		}
	}

	const handleChangeWidth = (mainLayout, layout) => {
		console.log(mainLayout);
		let componentWidth = 6;
		addWidthToSection(mainLayout, layout.section_id, componentWidth);
		setlayoutState(mainLayout);
		mainlayoutState = mainLayout;
		setrerender(!rerender);
	};

	const handleChangeWidthSelect = widthValue => {
		addWidthToSection(mainlayoutState, layout.SECTION_ID, widthValue);
		console.log(mainlayoutState);
		setlayoutState(mainlayoutState);
		mainlayoutState = mainlayoutState;
		setrerender(!rerender);
	};

	const [{ isOver, isOverCurrent }, drop] = useDrop(
		() => ({
			accept: ItemTypes.CARD,
			drop(_item, monitor) {
				const didDrop = monitor.didDrop();
				if (didDrop) {
					return;
				}
				// console.log(_item);

				addItemToLayout(_item);

				setHasDropped(true);
				setHasDroppedOnChild(didDrop);
				// return { props };
			},
			collect: monitor => ({
				isOver: monitor.isOver(),
				isOverCurrent: monitor.isOver({ shallow: true }),
				canDrop: monitor.canDrop(),
			}),
		}),
		[setHasDropped, setHasDroppedOnChild]
	);

	return (
		<Grid
			ref={drop}
			item
			xs={layout?.WIDTH ? layout.WIDTH : 12}
			sx={{
				...mainBoxStyle,
				// border: "0.3px dashed #eee",
				backgroundColor: isOverCurrent ? "#ECF9FF" : "white",
			}}
		// onClick={() => handleChangeWidth(mainlayoutState, layout)}
		>
			{" "}
			<Paper elevation={isOverCurrent ? 8 : 1}>
				<div
					style={{
						display: "flex",
						justifyContent: "flex-end",
						alignItems: "center",
						overflow: "hidden",
					}}
				>
					<small>Section_id : {layout.SECTION_ID}</small>
					<IconButton
						onClick={() => handleDelete(layout)}
					>
						<DeleteTwoToneIcon fontSize="small" /> 
					</IconButton>
					<SectionProperties
						handleChangeWidthSelect={handleChangeWidthSelect}
						layoutWidth={layout?.WIDTH}
					/>
				</div>
				<Grid container spacing={1}>
					{layout?.CHILDREN.length > 0
						? layout?.CHILDREN.map((ele, index) => {
							{
								/* console.log(layout); */
							}
							if (ele.TYPE === "section") {
								return (
									<Section
										key={index}
										layout={ele}
										mainlayoutState={mainlayoutState}
										setlayoutState={setlayoutState}
										rerender={rerender}
										setrerender={setrerender}
										handleDelete={handleDelete}
									></Section>
								);
							} else {
								return (
									<div key={index}>
										<FieldGenerator key={index} ele={ele} handleFieldDelete={handleDelete}/>
									</div>
								);
							}
						})
						: ""}
				</Grid>
			</Paper>
		</Grid>
	);
};

export default Section;
