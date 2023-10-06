import React, { useEffect, useState } from "react";
import { Button, Grid } from "@mui/material";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { fetchObjectList } from "../../services/objectApi";

const BtnCellRenderer = params => {
	console.log(params);
	return <Button size="small">View More</Button>;
};

const ObjectLists = () => {
	const [objectList, setObjectList] = useState([]);
	const [columnDefs] = useState([
		{ field: "OBJ_NAME" },
		{ field: "CREATED_ON" },
		{
			field: "athlete",
			cellRenderer: params => BtnCellRenderer(params),
			cellRendererParams: {
				clicked: function (field) {
					console.log(field);
					alert(`${field} was clicked`);
				},
			},
		},
	]);

	useEffect(() => {
		fetchObjectList()
			.then(res => {
				console.log(res.data);
				setObjectList(res.data);
			})
			.catch(err => console.log(err));
	}, []);
	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
					<AgGridReact
						rowData={objectList}
						columnDefs={columnDefs}
					></AgGridReact>
				</div>
			</Grid>
		</Grid>
	);
};

export default ObjectLists;
