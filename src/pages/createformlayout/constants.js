import shortid from "shortid";
import TextFields from "@mui/icons-material/TextFields";

export const SIDEBAR_ITEM = "sidebarItem";
export const ROW = "row";
export const COLUMN = "column";
export const COMPONENT = "component";

export const SIDEBAR_ITEMS = [
	{
		id: shortid.generate(),
		type: SIDEBAR_ITEM,
		component: {
			type: "Password",
			content: "Password",
		},
	},
	{
		id: shortid.generate(),
		type: SIDEBAR_ITEM,
		component: {
			type: "Phone Number",
			content: "Phone Number",
		},
	},
	{
		id: shortid.generate(),
		type: SIDEBAR_ITEM,
		component: {
			type: "checkbox",
			content: "checkbox",
		},
	},
	{
		id: shortid.generate(),
		type: SIDEBAR_ITEM,
		component: {
			type: "Multiple Line Text",
			content: "Multiple Line",
		},
	},
	{
		id: shortid.generate(),
		type: SIDEBAR_ITEM,
		component: {
			type: "Multiple Select Dropdown",
			content: "Multiple Dropdown",
		},
	},
	{
		id: shortid.generate(),
		type: SIDEBAR_ITEM,
		component: {
			type: "Single Select Dropdown",
			content: "Single Select Dropdown",
		},
	},
	{
		id: shortid.generate(),
		type: SIDEBAR_ITEM,
		component: {
			type: "Radio Button",
			content: "Radio",
		},
	},

	{
		id: shortid.generate(),
		type: SIDEBAR_ITEM,
		component: {
			type: "Attachment",
			content: "Attachment",
		},
	},
	{
		id: shortid.generate(),
		type: SIDEBAR_ITEM,
		component: {
			type: "Date-Time",
			content: "Date-Time",
		},
	},
	{
		id: shortid.generate(),
		type: SIDEBAR_ITEM,
		component: {
			type: "Single Line Text",
			content: "Single Line Text",
		},
	},
	{
		id: shortid.generate(),
		type: SIDEBAR_ITEM,
		component: {
			type: "Number",
			content: "Number",
		},
	},
	{
		id: shortid.generate(),
		type: SIDEBAR_ITEM,
		component: {
			type: "Email",
			content: "Email",
		},
	},
];
