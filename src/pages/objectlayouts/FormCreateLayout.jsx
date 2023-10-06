import React, { useState } from "react";
import { useDrop } from "react-dnd";
import { ItemTypes } from "./ItemTypes";
import Section from "./Section";
import { Grid, Button } from "@mui/material";

const style = {
	height: "12rem",
	width: "12rem",
	marginRight: "1.5rem",
	marginBottom: "1.5rem",
	color: "white",
	padding: "1rem",
	textAlign: "center",
	fontSize: "1rem",
	lineHeight: "normal",
	float: "left",
};

const FormCreateLayout = () => {
	const [layoutJSON, setlayoutJSON] = useState({
		name: "Main Section",
		object_id: "",
		border_style: "",
		type: "Section",
		child: [],
	});
	return (
		<Grid container spacing={2}>
			{" "}
			<Grid item xs={12}>
				<Button variant="contained" onClick={() => console.log(layoutJSON)}>
					Save
				</Button>
			</Grid>
			<Grid item xs={12}>
				<Section
					layoutJSON={layoutJSON}
					setlayoutJSON={setlayoutJSON}
				></Section>
			</Grid>
		</Grid>
	);
};

export default FormCreateLayout;
