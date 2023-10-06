import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { IconButton } from "@mui/material";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Button } from "rsuite";
import {
	Dialog,
	DialogActions,
	DialogContent,
	InputLabel,
	Slider,
} from "@mui/material";
const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
};

const SectionProperties = props => {
	const { handleChangeWidthSelect, layoutWidth } = props;
	const [sectionWidth, setsectionWidth] = useState(3);
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const handleSave = () => {
		handleChangeWidthSelect(sectionWidth);
		handleClose();
	};

	useEffect(() => {
		setsectionWidth(layoutWidth);
	}, []);
	return (
		<div>
			<IconButton onClick={handleOpen}>
				<MoreVertIcon fontSize="small" />
			</IconButton>
			<Dialog
				open={open}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<DialogContent>
					<Typography id="modal-modal-title" variant="h6" component="h2">
						Section Properties
					</Typography>
					<InputLabel sx={{ m: 1 }}>Section Width</InputLabel>
					<Slider
						size="small"
						// getAriaValueText={e => {
						// 	setsectionWidth(e);
						// }}
						onChange={e => setsectionWidth(e.target.value)}
						value={sectionWidth}
						valueLabelDisplay="auto"
						step={1}
						marks
						min={2}
						max={12}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Close</Button>
					<Button onClick={handleSave}>Save</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default SectionProperties;
