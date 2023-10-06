import React from "react";
import FieldListComp from "./FieldListComp";
import FormBuilder from "./FormBuilder";
import { Button, Grid, Paper } from "@mui/material";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ConfigSection from "./ConfigSection";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const MainPage = () => {
	const navigate = useNavigate();
	const handlepreview = () => {
		navigate("/userview");
	};

	const location = useLocation();

	const mode = location.state.mode;
	const object_id = location.state.object_id;
	return (
		<div>
			<DndProvider backend={HTML5Backend}>
				<Grid container spacing={2} mt={3}>
					<Grid item xs={2}>
						<Paper elevation={1} sx={{ minHeight: "80vh" }}>
							<Button onClick={() => handlepreview()}>Preview</Button>
							<FieldListComp />
						</Paper>
					</Grid>
					<Grid item xs={10}>
						<Paper
							elevation={1}
							sx={{ minHeight: "80vh", marginBottom: "2rem" }}
						>
							<FormBuilder mode={mode} objId={object_id}/>
						</Paper>
					</Grid>
				</Grid>
			</DndProvider>
		</div>
	);
};

export default MainPage;
