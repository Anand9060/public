import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, InputLabel, Slider } from "@mui/material";
import { setSectionWidth } from "./LayoutJsonSlice";

const ConfigSection = () => {
	const dispatch = useDispatch();
	const componentState = useSelector(
		state => state.layoutJsonState.currentSection
	);
	const handlewidthChange = e => {
		dispatch(setSectionWidth(e.target.value));
	};
	return (
		<Grid container>
			<Grid item xs={12}>
				<InputLabel>Type : {componentState?.type}</InputLabel>
			</Grid>
			<Grid item xs={12}>
				<InputLabel>
					isUnique : {componentState?.isUnique ? "true" : "false"}
				</InputLabel>
			</Grid>
			<Grid item xs={12}>
				<InputLabel>width</InputLabel>
				<Slider
					aria-label="Temperature"
					defaultValue={12}
					valueLabelDisplay="auto"
					step={2}
					size="small"
					marks
					min={2}
					max={12}
					value={componentState.width}
					onChange={handlewidthChange}
				/>
			</Grid>
		</Grid>
	);
};

export default ConfigSection;
