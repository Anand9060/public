import React from "react";
import TextField from "@mui/material/TextField";

const RenderComponent = ({ component }) => {
	console.log(component);
	return (
		<TextField
			id="outlined-basic"
			label="Outlined"
			variant="outlined"
			fullWidth
			size="small"
			sx={{ backgroundColor: "#fff", borderRadius: "0.2rem" }}
		/>
	);
};

export default RenderComponent;
