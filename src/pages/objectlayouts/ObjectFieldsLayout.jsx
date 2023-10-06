import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "./LeftPanelLayout/Card";

const ObjectFieldsLayout = props => {
	const { fieldList } = props;
	console.log(fieldList);
	return (
		<Box
			component="span"
			sx={{
				p: 2,
				border: "1px dashed grey",
				display: "flex",
				flexDirection: "column",
			}}
		>
			{/* <Button>Section</Button> */}
			{fieldList &&
				fieldList.map(field => {
					return <Card field={field} />;
				})}
		</Box>
	);
};

export default ObjectFieldsLayout;
