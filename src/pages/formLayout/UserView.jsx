import { times } from "lodash";
// import { Grid } from "ag-grid-community";
import React, { useState, useEffect, useMemo, useRef } from "react";
import { useSelector } from "react-redux";
// import UserFieldGenerator from "./UserFieldGenerator";
import UserFieldGenerator from "./UserFieldGenerator";
import { saveFromDataApi } from "../../services/PageLayoutApi";

import Moment from "moment";
import {
	Paper,
	Grid,
	Backdrop,
	CircularProgress,
	Container,
	Typography,
	TextField,
	Button,
	InputLabel,
	Box,
} from "@mui/material";
import MsgBox from "../../components/MsgBox.jsx";

import FormGenarator from "./FormGenarator";
import FormInline from "./FormInline";

var fieldValue = "";

function UserView() {
	const [inLineEdit, setInLineEdit] = useState(false);
	// const [layoutState, setlayoutState] = useState({
	//   name: "Main Section",
	//   object_id: "obj1",
	//   type: "Section",
	//   section_id: "lnxkkHe5nv",
	//   parent_section_id: "0",
	//   width: 12,
	//   child: [
	//     {
	//       name: "section",
	//       type: "Section",
	//       field_id: "",
	//       type_id: "",
	//       isUnique: false,
	//       section_id: "lnxkkHe5nv*dGMKkc2hz",
	//       parent_section_id: "lnxkkHe5nv",
	//       width: 8,
	//       child: [
	//         {
	//           name: "email",
	//           type: "Attachment",
	//           field_id: "2b609597-e191-498c-abee-dd5e0eba9d2f",
	//           type_id: "10",
	//           isUnique: false,
	//           section_id: "lnxkkHe5nv*dGMKkc2hz*BYwe2AiCl",
	//           parent_section_id: "lnxkkHe5nv*dGMKkc2hz",
	//           width: 12,
	//           isInLineEdit: false,
	//           value: "sasas",
	//           realValue: "sasas",
	//           child: [],
	//           options: [],
	//         },
	//         {
	//           name: "Select Date",
	//           type: "Date-Time",
	//           field_id: "e1b09b6c-4e99-44ae-a362-1942740edbbb",
	//           type_id: "12",
	//           isUnique: true,
	//           section_id: "lnxkkHe5nv*dGMKkc2hz*V9_j1Vxd7",
	//           parent_section_id: "lnxkkHe5nv*dGMKkc2hz",
	//           width: 12,
	//           isInLineEdit: false,
	//           value: "2022-04-14",
	//           realValue: "2022-04-14",
	//           child: [],
	//           options: [],
	//         },
	//       ],
	//       options: [],
	//     },
	//     {
	//       name: "section",
	//       type: "Section",
	//       field_id: "",
	//       type_id: "",
	//       isUnique: false,
	//       section_id: "lnxkkHe5nv*dGMKkc2hzaaa",
	//       parent_section_id: "lnxkkHe5nv",
	//       width: 4,
	//       child: [
	//         {
	//           name: "email-1",
	//           type: "Email",
	//           field_id: "2b609597-e191-498c-abee-dd5e0eba9d2f433",
	//           type_id: "10",
	//           isUnique: false,
	//           section_id: "lnxkkHe5nv*dGMKkc2hzaaa*BYwe2AiCl",
	//           parent_section_id: "lnxkkHe5nv*dGMKkc2hzaaa",
	//           width: 12,
	//           isInLineEdit: false,
	//           value: "",
	//           realValue: "",
	//           child: [],
	//           options: [],
	//         },
	//         {
	//           name: "Gender",
	//           type: "Text Lookup",
	//           field_id: "e1b09b6c-4e99-44ae-a362-1942740edbbb4343",
	//           type_id: "12",
	//           isUnique: true,
	//           section_id: "lnxkkHe5nv*dGMKkc2hzaaa*V9_j1Vxd7",
	//           parent_section_id: "lnxkkHe5nv*dGMKkc2hzaaa",
	//           width: 12,
	//           isInLineEdit: false,
	//           value: "",
	//           realValue: "",
	//           child: [],
	//           options: [
	//             {
	//               key: "male",
	//               value: "Male",
	//             },
	//             {
	//               key: "female",
	//               value: "Female",
	//             },
	//           ],
	//         },
	//       ],
	//       options: [],
	//     },
	//   ],
	// });

	/* const [layoutState, setlayoutState] = useState({
    name: "Main Section",
    object_id: "obj1",
    type: "Section",
    section_id: "qem-BJl-I3",
    parent_section_id: "0",
    child: [
      {
        name: "a",
        type: "Password",
        field_id: "d1c21217-1a45-4222-9f13-f5d6d9e76f70",
        type_id: "2",
        isUnique: true,
        section_id: "qem-BJl-I3*Q-3gIxBIof",
        parent_section_id: "qem-BJl-I3",
        width: 12,
        isInLineEdit: false,
        value: "2022-04-14",
        realValue: "2022-04-14",
        child: [],
        options: [],
      },
      {
        name: "g",
        type: "Radio Button",
        field_id: "af2c356c-5c21-4e47-81f9-dbb907ece728",
        type_id: "4",
        isUnique: false,
        section_id: "qem-BJl-I3*_TfwSP_gRm",
        parent_section_id: "qem-BJl-I3",
        width: 12,
        isInLineEdit: false,
        value: "2022-04-14",
        realValue: "2022-04-14",
        child: [],
        options: [],
      },
      {
        name: "f",
        type: "Text Lookup",
        field_id: "6c3ef979-83e0-4dc8-9b39-f0d57d63c9cd",
        type_id: "5",
        isUnique: false,
        section_id: "qem-BJl-I3*97cWL5-4k0",
        parent_section_id: "qem-BJl-I3",
        width: 12,
        isInLineEdit: false,
        value: "2022-04-14",
        realValue: "2022-04-14",
        child: [],
        options: [
          {
            OPTION_ID: "9139a65d-e965-47f7-a891-242b4b235b79",
            OPTION_NAME: "female",
          },
          {
            OPTION_ID: "23fa767d-63a2-4e43-9acb-c8f4660e8ac8",
            OPTION_NAME: "male",
          },
        ],
      },
      {
        name: "i",
        type: "Date-Time",
        field_id: "ec895c50-30a7-4005-81fb-26120975e524",
        type_id: "11",
        isUnique: false,
        section_id: "qem-BJl-I3*b0RAeYB1F",
        parent_section_id: "qem-BJl-I3",
        width: 12,
        isInLineEdit: false,
        value: "2022-04-14",
        realValue: "2022-04-14",
        child: [],
        options: [],
      },
      {
        name: "e",
        type: "Text Lookup Multiple Choice",
        field_id: "bf3741ba-3895-43d6-a26b-fc3f8781e141",
        type_id: "6",
        isUnique: true,
        section_id: "qem-BJl-I3*wrqQCF-nF",
        parent_section_id: "qem-BJl-I3",
        width: 12,
        isInLineEdit: false,
        value: [],
        realValue: [],
        child: [],
        options: [
          {
            OPTION_ID: "0bfa52bd-21f8-4cc6-a3b4-c7068878d5da",
            OPTION_NAME: "jio",
          },
          {
            OPTION_ID: "fc896cfc-feb7-4a52-b7e6-31be32d052ed",
            OPTION_NAME: "google ",
          },
          {
            OPTION_ID: "cc58425e-a2ab-4e02-8c97-53dd5c7ede61",
            OPTION_NAME: "apple",
          },
        ],
      },
      {
        name: "j",
        type: "Single Line Text",
        field_id: "638432d2-2660-4e17-b26b-332f3baa84dd",
        type_id: "3",
        isUnique: false,
        section_id: "qem-BJl-I3*yCn1kIRSy9",
        parent_section_id: "qem-BJl-I3",
        width: 12,
        isInLineEdit: false,
        value: "2022-04-14",
        realValue: "2022-04-14",
        child: [],

        options: [],
      },
      {
        name: "d",
        type: "Multiple Line Text",
        field_id: "09b0e24b-0478-4653-9e29-5d96b6195de0",
        type_id: "1",
        isUnique: true,
        section_id: "qem-BJl-I3*0qT07gs1t",
        parent_section_id: "qem-BJl-I3",
        isInLineEdit: false,
        value: "2022-04-14",
        realValue: "2022-04-14",
        width: 12,
        child: [],
        options: [],
      },
      {
        name: "c",
        type: "Checkbox",
        field_id: "333fa1cc-0c13-4c86-9ac5-b7e4658ad3c0",
        type_id: "9",
        isUnique: true,
        section_id: "qem-BJl-I3*_J5iYwFzkU",
        parent_section_id: "qem-BJl-I3",
        isInLineEdit: false,
        value: "2022-04-14",
        realValue: "2022-04-14",
        width: 12,
        child: [],
        options: [],
      },
      {
        name: "b",
        type: "Phone Number",
        field_id: "87d935bd-9615-4c18-a944-3bc17d7bb968",
        type_id: "8",
        isUnique: false,
        section_id: "qem-BJl-I3*cW9I-ROMo",
        isInLineEdit: false,
        value: "2022-04-14",
        realValue: "2022-04-14",
        parent_section_id: "qem-BJl-I3",
        width: 12,
        child: [],
        options: [],
      },
      {
        name: "h",
        type: "Attachment",
        field_id: "ae9ab64b-2350-422d-932c-f2f71be033b0",
        type_id: "7",
        isUnique: false,
        section_id: "qem-BJl-I3*YNZyKCXiK",
        parent_section_id: "qem-BJl-I3",
        isInLineEdit: false,
        value: "2022-04-14",
        realValue: "2022-04-14",
        width: 12,
        child: [],
        options: [],
      },
      {
        name: "l",
        type: "Email",
        field_id: "b3649e6c-2de2-474f-8bce-4a55f05fe6e9",
        type_id: "10",
        isUnique: false,
        section_id: "qem-BJl-I3*RR3qF9i9a",
        parent_section_id: "qem-BJl-I3",
        isInLineEdit: false,
        value: "2022-04-14",
        realValue: "2022-04-14",
        width: 12,
        child: [],
        options: [],
      },
      {
        name: "k",
        type: "Number",
        field_id: "f5546b57-4587-4658-9879-d824b691d4c2",
        type_id: "12",
        isUnique: false,
        section_id: "qem-BJl-I3*WtLCIJqa4",
        parent_section_id: "qem-BJl-I3",
        isInLineEdit: false,
        value: "2022-04-14",
        realValue: "2022-04-14",
        width: 12,
        child: [],
        options: [],
      },
    ],
  });
  */

	/*const [layoutState, setlayoutState] = useState({
    name: "Main Section",
    object_id: "obj1",
    type: "Section",
    section_id: "bRG7U03y_0",
    parent_section_id: "0",
    child: [
      {
        name: "mulitiple",
        type: "Text Lookup Multiple Choice",
        field_id: "fa5ae207-b64c-4574-b1ac-ab06ce242fe5",
        type_id: "6",
        isUnique: false,
        section_id: "bRG7U03y_0*Nl8j6u-n-5",
        parent_section_id: "bRG7U03y_0",
        isInLineEdit: false,
        value: [],
        realValue: [],
        width: 12,
        child: [],
        options: [
          {
            OPTION_ID: "c223d4a4-d1be-47b6-9e26-bd87c27adb7f",
            OPTION_NAME: "sumsung",
          },
          {
            OPTION_ID: "017acbdb-5f3b-4c78-8a85-c464d37d9f46",
            OPTION_NAME: "xaomi",
          },
          {
            OPTION_ID: "961f5e34-8515-496c-a20f-99ed3d882641",
            OPTION_NAME: "iphone",
          },
        ],
      },
      {
        name: "section",
        type: "Section",
        field_id: "",
        type_id: "",
        isUnique: false,
        section_id: "bRG7U03y_0*VU7U6osaJ",
        parent_section_id: "bRG7U03y_0",
        width: 12,
        child: [
          {
            name: "text mulitple",
            type: "Text Lookup Multiple Choice",
            field_id: "0a8096e8-4c11-473b-bce7-bf5be99af1a3",
            type_id: "6",
            isUnique: false,
            section_id: "bRG7U03y_0*VU7U6osaJ*GuBwpcPK1",
            parent_section_id: "bRG7U03y_0*VU7U6osaJ",
            isInLineEdit: false,
            value: [],
            realValue: [],
            width: 12,
            child: [],
            options: [
              {
                OPTION_ID: "cb43f721-e52e-44da-abfd-f7775c3e8306",
                OPTION_NAME: "tata",
              },
              {
                OPTION_ID: "35bbe41b-7836-4243-a5f1-b8721cfd1c71",
                OPTION_NAME: "afafa",
              },
              {
                OPTION_ID: "1d8fda24-c39c-4747-ba9b-78f19e906e45",
                OPTION_NAME: "tevaf",
              },
            ],
          },
        ],
        options: [],
      },
    ],
  });*/
	const [layoutState, setlayoutState] = useState({
		name: "Main Section",
		object_id: "obj1",
		type: "Section",
		section_id: "DXHnvh0EVy",
		parent_section_id: "0",
		child: [
			{
				name: "text mulitple",
				type: "Text Lookup Multiple Choice",
				field_id: "0a8096e8-4c11-473b-bce7-bf5be99af1a3",
				type_id: "6",
				isUnique: false,
				section_id: "DXHnvh0EVy*0uojQod8a-",
				parent_section_id: "DXHnvh0EVy",
				width: 12,
				isInLineEdit: false,
				value: [],
				realValue: [],
				child: [],
				options: [
					{
						OPTION_ID: "cb43f721-e52e-44da-abfd-f7775c3e8306",
						OPTION_NAME: "tata",
					},
					{
						OPTION_ID: "35bbe41b-7836-4243-a5f1-b8721cfd1c71",
						OPTION_NAME: "afafa",
					},
					{
						OPTION_ID: "1d8fda24-c39c-4747-ba9b-78f19e906e45",
						OPTION_NAME: "tevaf",
					},
				],
			},
			{
				name: "section",
				type: "Section",
				field_id: "",
				type_id: "",
				isUnique: false,
				section_id: "DXHnvh0EVy*Nx7MZxlds",
				parent_section_id: "DXHnvh0EVy",
				width: 12,
				child: [
					{
						name: "google mulitple",
						type: "Text Lookup Multiple Choice",
						field_id: "02460554-bcb2-4291-9eeb-fd8afbbab7b1",
						type_id: "6",
						isUnique: false,
						section_id: "DXHnvh0EVy*Nx7MZxlds*swh4Fxm0j",
						parent_section_id: "DXHnvh0EVy*Nx7MZxlds",
						width: 12,
						isInLineEdit: false,
						value: [],
						realValue: [],
						child: [],
						options: [
							{
								OPTION_ID: "f749e90e-fd19-4caa-9ae7-62ea8ac6509b",
								OPTION_NAME: "tatat",
							},
							{
								OPTION_ID: "28e8b4d4-d110-4ed9-91bd-382d5bc78fbc",
								OPTION_NAME: "dasra",
							},
							{
								OPTION_ID: "d0fa3df9-0f5e-4841-900b-2ec74ad68edd",
								OPTION_NAME: "feee",
							},
						],
					},
					{
						name: "section",
						type: "Section",
						field_id: "",
						type_id: "",
						isUnique: false,
						section_id: "DXHnvh0EVy*Nx7MZxlds*Nx7MZxlds",
						parent_section_id: "DXHnvh0EVy*Nx7MZxlds",
						width: 12,
						child: [
							{
								name: "mulitiple",
								type: "Text Lookup",
								field_id: "fa5ae207-b64c-4574-b1ac-ab06ce242fe5",
								type_id: "6",
								isUnique: false,
								section_id: "DXHnvh0EVy*Nx7MZxlds*Nx7MZxlds*deRtlKt2h",
								parent_section_id: "DXHnvh0EVy*Nx7MZxlds*Nx7MZxlds",
								width: 12,
								isInLineEdit: false,
								value: [],
								realValue: [],
								child: [],
								options: [
									{
										OPTION_ID: "c223d4a4-d1be-47b6-9e26-bd87c27adb7f",
										OPTION_NAME: "sumsung",
									},
									{
										OPTION_ID: "017acbdb-5f3b-4c78-8a85-c464d37d9f46",
										OPTION_NAME: "xaomi",
									},
									{
										OPTION_ID: "961f5e34-8515-496c-a20f-99ed3d882641",
										OPTION_NAME: "iphone",
									},
								],
							},
						],
						options: [],
					},
					{
						name: "l",
						type: "Checkbox",
						field_id: "b3649e6c-2de2-474f-8bce-4a55f05fe6e9",
						type_id: "10",
						isUnique: false,
						section_id: "DXHnvh0EVy*Nx7MZxlds*PnWRG2Yh-",
						parent_section_id: "DXHnvh0EVy*Nx7MZxlds",
						width: 12,
						isInLineEdit: false,
						value: false,
						realValue: false,
						child: [],
						options: [],
					},
					{
						name: "section",
						type: "Section",
						field_id: "",
						type_id: "",
						isUnique: false,
						section_id: "DXHnvh0EVy*Nx7MZxlds*Nx7MZxlds",
						parent_section_id: "DXHnvh0EVy*Nx7MZxlds",
						width: 12,
						child: [
							{
								name: "k",
								type: "Date-Time",
								field_id: "f5546b57-4587-4658-9879-d824b691d4c2",
								type_id: "12",
								isUnique: false,
								section_id: "DXHnvh0EVy*Nx7MZxlds*Nx7MZxlds*ojS9oPSq_",
								parent_section_id: "DXHnvh0EVy*Nx7MZxlds*Nx7MZxlds",
								width: 12,
								isInLineEdit: false,
								value: "Number",
								realValue: "Number",
								child: [],
								options: [],
							},
						],
						options: [],
					},
				],
				options: [],
			},
		],
	});

	/** Common State and function for all pages */
	/** Developer only need to append some code in handleAlertClose or handleAlertConfirm function  */

	const [backdrop, setBackdrop] = useState(false);
	const [msgBox, setMsgBox] = useState({
		open: false,
		action: "",
		alertTitle: "",
		alertBody: "",
		isAlertConfirm: false,
		alertConfirmTxt: "Ok",
		alertCloseTxt: "Close",
	});

	const handleBackdropClose = () => {
		setBackdrop(false);
	};
	const handleBackdropOpen = () => {
		setBackdrop(true);
	};

	const handleAlertClose = () => {
		let action = msgBox.action;
		setMsgBox({
			...msgBox,
			open: false,
			action: "",
			alertTitle: "",
			alertBody: "",
			isAlertConfirm: false,
			alertConfirmTxt: "Ok",
			alertCloseTxt: "Close",
		});

		// Custom action
		if (action == "redirectManageFileds") {
			navigate("/object_fields", {
				state: { object_id: state.object_id },
			});
		}
	};
	const handleAlertOpen = msgbody => {
		setMsgBox({
			...msgBox,
			open: true,
			action: "",
			alertTitle: "",
			alertBody: msgbody,
			isAlertConfirm: false,
			alertConfirmTxt: "Ok",
			alertCloseTxt: "Close",
		});
	};

	const handleAlertConfirm = () => {
		setMsgBox({
			...msgBox,
			open: false,
			action: "",
			alertTitle: "",
			alertBody: "",
			isAlertConfirm: false,
			alertConfirmTxt: "Ok",
			alertCloseTxt: "Close",
		});
	};
	const msgRef = useRef();
	/******************************** */

	/** Custom State and function for this page */
	useEffect(() => {}, []);

	const handleDateChange = field_id => newDate => {
		const newValue = updateValue(
			layoutState,
			field_id,
			newDate.$d.toString().slice(0, 15)
		);
		setlayoutState({ ...layoutState }, newValue);
	};

	const handleFieldClick = field_id => {
		const newValue = showHideFiled(layoutState, field_id, true);
		setlayoutState({ ...layoutState }, newValue);
	};

	const handleChange = field_id => event => {
		const newValue = updateValue(layoutState, field_id, event.target.value);
		setlayoutState({ ...layoutState }, newValue);
	};
	const handleMultiSelectChange = field_id => (event, value) => {
		const newValue = updateValue(layoutState, field_id, value);

		setlayoutState({ ...layoutState }, newValue);
	};
	const handleCheckboxChange = field_id => event => {
		const newValue = updateValue(layoutState, field_id, event.target.checked);
		setlayoutState({ ...layoutState }, newValue);
	};

	const handleCloseFieldData = field_id => {
		const newValue = setRealFiledValue(layoutState, field_id);
		setlayoutState({ ...layoutState }, newValue);
	};

	const handleSaveFieldData = field_id => {
		const newValue = getFiledValue(layoutState, field_id);

		setlayoutState({ ...layoutState }, newValue);

		// console.log("field_id=", field_id);
		// console.log(layoutState.object_id);
		// console.log("value=", fieldValue);

		const lineData = {
			OBJ_ID: layoutState.object_id,
			FIELD_ID: field_id,
			VALUE: fieldValue,
		};
		console.log(lineData);
		console.log("API CAll Here");
	};

	const handleSaveFormdData = () => {
		const separated = separateByType(layoutState);
		const sections = separated.sections;
		const fields = separated.fields;

		console.log(separated);
		console.log("fields=", fields);

		let objId = "";
		let DATA = [],
			DataList = [];

		handleBackdropOpen();

		sections.map(ele => {
			if (ele.name === "Main Section") {
				objId = ele.object_id;
			}
		});

		let dataArr = [];
		fields.map(ele => {
			DATA.push({ FIELD_ID: ele.field_id, VALUE: ele.value });
		});
		DataList.push({ OBJ_ID: objId, DATA });
		console.log(DataList);

		saveFromDataApi(DataList)
			.then(res => {
				console.log(res.data);
				handleBackdropClose();
			})
			.catch(err => {
				console.log(err.data);
				handleBackdropClose();
			});

		console.log("API CAll Here");
	};

	function updateValue(json, field_id, newValue) {
		if (json.type !== "Section" && json.field_id === field_id) {
			json.value = newValue;
			return json;
		}
		if (json.child) {
			for (let i = 0; i < json.child.length; i++) {
				updateValue(json.child[i], field_id, newValue);
			}
		}
		return json;
	}

	function showHideFiled(json, field_id) {
		if (json.type !== "Section" && json.field_id === field_id) {
			json.isInLineEdit = !json.isInLineEdit;
			return json;
		}
		if (json.child) {
			for (let i = 0; i < json.child.length; i++) {
				showHideFiled(json.child[i], field_id);
			}
		}
		return json;
	}

	function getFiledValue(json, field_id) {
		if (json.type !== "Section" && json.field_id === field_id) {
			json.isInLineEdit = !json.isInLineEdit;
			json.realValue = json.value;
			fieldValue = json.value;

			return json.value;
		}
		if (json.child) {
			for (let i = 0; i < json.child.length; i++) {
				getFiledValue(json.child[i], field_id);
			}
		}
		return json;
	}

	function setRealFiledValue(json, field_id) {
		if (json.type !== "Section" && json.field_id === field_id) {
			json.isInLineEdit = !json.isInLineEdit;
			json.value = json.realValue;

			return json.value;
		}
		if (json.child) {
			for (let i = 0; i < json.child.length; i++) {
				setRealFiledValue(json.child[i], field_id);
			}
		}
		return json;
	}

	function separateByType(json) {
		const sections = [];
		const fields = [];

		function recursiveParse(obj) {
			if (obj.type === "Section") {
				sections.push(obj);

				if (obj.child) {
					for (const child of obj.child) {
						recursiveParse(child);
					}
				}
			} else if (obj.type !== "Section") {
				fields.push(obj);
			}
		}

		recursiveParse(json);

		return { sections, fields };
	}

	return (
		<>
			<Grid container spacing={3}>
				<Grid item xs={3}></Grid>
				<Grid item xs={12}>
					<Grid
						container
						fullWidth
						style={{
							border: "1px",
							borderStyle: "dotted",
							borderColor: "green",
						}}
					>
						{inLineEdit ? (
							<FormInline
								layout={layoutState}
								handleChange={handleChange}
								handleFieldClick={handleFieldClick}
								handleSaveFieldData={handleSaveFieldData}
								handleCloseFieldData={handleCloseFieldData}
								handleDateChange={handleDateChange}
								handleCheckboxChange={handleCheckboxChange}
								handleMultiSelectChange={handleMultiSelectChange}
							/>
						) : (
							<>
								<FormGenarator
									layout={layoutState}
									handleChange={handleChange}
									handleDateChange={handleDateChange}
									handleCheckboxChange={handleCheckboxChange}
									handleMultiSelectChange={handleMultiSelectChange}
								/>
								<Button
									variant="text"
									fullWidth
									sx={{
										display: "flex",
										textAlign: "start",
										justifyContent: "flex-start",
									}}
									onClick={() => handleSaveFormdData()}
								>
									Save Form
								</Button>
							</>
						)}
					</Grid>
					{/*  */}
				</Grid>
				<Grid item xs={3}></Grid>
			</Grid>

			<Backdrop
				sx={{ color: "#fff", zIndex: theme => theme.zIndex.drawer + 1 }}
				open={backdrop}
			>
				<CircularProgress color="inherit" />
			</Backdrop>
			{msgBox.open && (
				<MsgBox
					ref={msgRef}
					open={msgBox.open}
					alertTitle={msgBox.alertTitle}
					alertBody={msgBox.alertBody}
					isAlertConfirm={msgBox.isAlertConfirm}
					alertConfirmTxt={msgBox.alertConfirmTxt}
					alertCloseTxt={msgBox.alertCloseTxt}
					alertConfirmBtn={() => handleAlertConfirm()}
					alertCloseBtn={() => handleAlertClose()}
				/>
			)}
		</>
	);
}

export default UserView;
