import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { Grid, Box, Button, IconButton } from "@mui/material";
import { fetchLayoutList } from "../../services/PageLayoutApi";
import Typography from "@mui/material/Typography";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ShareIcon from '@mui/icons-material/Share';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import { useLocation } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { getObjectDetails } from "../../services/objectApi";
import { deleteLayout } from "../../services/PageLayoutApi";
import { NavigateBefore } from "@mui/icons-material";

const lsitItemStyle = {
	display: "flex",
	padding: "1rem",
	justifyContent: "space-between",
	alignItems: "center",
	border: "1px solid #eee",
	margin: "0.2rem",
};

const Demo = styled("div")(({ theme }) => ({
	backgroundColor: theme.palette.background.paper,
}));

export default function LayoutList() {
	const [layoutList, setlayoutlist] = useState([]);
	const [objState, setobjState] = useState(null);
	const [reload, setreload] = useState(false);
	const location = useLocation();
	const object_id = location.state.object_id;
	console.log("Got object id", object_id)
	const navigate = useNavigate();

	const handledeleteLayout = async (LAYOUT_ID, OBJ_ID) => {
		const data = {
			LAYOUT_ID,
			OBJ_ID
		};
		console.log(data);
		try {
			const res = await deleteLayout(data);
			console.log(res);
			const filteredLayoutList = layoutList.filter(
				(layout) => layout.LAYOUT_ID === LAYOUT_ID
			  );
			  setlayoutlist(filteredLayoutList);
			setreload(!reload);
		} catch (err) {
			console.log(err.message);
		}
	};

	const handleEditLayout = (LAYOUT_ID, OBJ_ID) => {
		navigate("/mainlayout", {
			state: { object_id: object_id, layout_id: LAYOUT_ID, mode : 'EDIT' },
		})
	}

	/////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////

	const handlegetlayoutJSON = (LAYOUT_ID, OBJ_ID) => {
		navigate("/dataentry", {
			state: { object_id: object_id, layout_id: LAYOUT_ID, state: 'CREATE' ,main_obj:""},
		});
	};

	/////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////
	useEffect(() => {
		getObjectDetails({ OBJ_ID: object_id }).then(res => setobjState(res.data));
		fetchLayoutList({ OBJ_ID: object_id }).then(res => {setlayoutlist(res); console.log(res)});
		console.log(objState);
		console.log(layoutList);
		
	}, [reload]);
	return (
		<Box sx={{ flexGrow: 1, marginTop: "1rem" }}>
			<Grid container spacing={1}>
				<Grid item xs={10}>
					<h2>{objState && objState?.OBJ_NAME}</h2>
				</Grid>
				<Grid item xs={2}>
					<Button
						variant="contained"
						size="small"
						onClick={() =>
							navigate("/object_fields", {
								state: { object_id: object_id },
							})
						}
					>
						Return
					</Button>
				</Grid>
				<Grid item xs={12} md={12}>
					<Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
						List Items
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<Grid container>
						{layoutList &&
							layoutList?.map((ele, index) => (
								<Grid item xs={12} key={index} sx={lsitItemStyle}>
									<span>{ele.LAYOUT_NAME}</span>
									<span>{ele.LAYOUT_ID}</span>
									<span>
										<IconButton
											onClick={() =>
												handledeleteLayout(ele.LAYOUT_ID, object_id)
											}
										>
											<DeleteIcon />
										</IconButton>{" "}
										<IconButton
											onClick={() =>
												handleEditLayout(ele.LAYOUT_ID, object_id)
											}
										>
											<EditIcon />
										</IconButton>{" "}
										<IconButton
										/////////////////////////////////////////////////////////////////////////////////
										/////////////////////////////////////////////////////////////////////////////////
										/////////////////////////////////////////////////////////////////////////////////
										/////////////////////////////////////////////////////////////////////////////////
											onClick={() =>
												handlegetlayoutJSON(ele.LAYOUT_ID, object_id)
											}
										/////////////////////////////////////////////////////////////////////////////////
										/////////////////////////////////////////////////////////////////////////////////
										/////////////////////////////////////////////////////////////////////////////////
										/////////////////////////////////////////////////////////////////////////////////
										>
											<ShareIcon />

										</IconButton>
									</span>
								</Grid>
							))}
					</Grid>
				</Grid>
			</Grid>
		</Box>
	);
}
