import React from "react";
import TextField from "@mui/material/TextField";
import Section from "./Section";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const renderField = (item, layoutJSON, setlayoutJSON) => {
	const type = item.DATA_TYPE;
	const fieldName = item.FIELD_NAME;
	if (type == "Single Line text" && fieldName != "Roll") {
		return (
			<TextField fullWidth label={fieldName} id={fieldName} size="small" />
		);
	} else if (type == "Email") {
		return (
			<TextField fullWidth label={fieldName} id={fieldName} size="small" />
		);
	} else if (type == "MultiLine Text") {
		return (
			<TextField
				id="outlined-multiline-static"
				label={type}
				multiline
				rows={4}
				fullWidth
				defaultValue={type}
			/>
		);
	} else if (type == "Single Line text" && fieldName == "Roll") {
		return (
			<TextField
				inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
				fullWidth
				label={fieldName}
				id={fieldName}
				size="small"
			/>
		);
	} else if (type == "Single Select Dropdown") {
		return (
			<FormControl size="small" fullWidth>
				<InputLabel id="demo-select-small">{fieldName}</InputLabel>
				<Select
					labelId="demo-select-small"
					id="demo-select-small"
					// value={age}
					label={fieldName}
					//onChange={handleChange}
				>
					<MenuItem value={20}>YES</MenuItem>
					<MenuItem value={30}>NO</MenuItem>
				</Select>
			</FormControl>
		);
	} else if (type == "section") {
		return <Section layoutJSON={layoutJSON} setlayoutJSON={setlayoutJSON} />;
	}
};

const FieldComponent = props => {
	const { item, layoutJSON, setlayoutJSON } = props;
	// console.log(item);
	return (
		<div style={{ marginTop: "1rem" }}>
			{renderField(item, layoutJSON, setlayoutJSON)}
		</div>
	);
};

export default FieldComponent;
