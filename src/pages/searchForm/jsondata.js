
// give me an api for all field list where there is a checkbox for searchable true 
export const empFieldList =[
    {
        "FIELD_NAME": "ID",
        "FIELD_ID": "c8d6132b-3abc-40b5-8c95-8b228ec7cafd",
        "FIELD_POSITION": 1,
        "DATA_TYPE_ID": "3",
        "IS_UNIQUE": false,
        "IS_SEARCHABLE":true,
        "OBJ_ID": "c0e6f107-daf0-401e-a6e3-c0f267414b1b",
        "DATA_TYPE": 'AutoID',
        "OPTIONS": []
    },
    {
        "FIELD_NAME": "Employee Name",
        "FIELD_ID": "c8d6135b-3abc-40b5-8c95-8b228ec7safw",
        "FIELD_POSITION": 2,
        "DATA_TYPE_ID": "3",
        "IS_UNIQUE": false,
        "IS_SEARCHABLE":true,
        "OBJ_ID": "c0e6f107-daf0-401e-a6e3-c0f267414b1b",
        "DATA_TYPE": 'Single Line Text',
        "OPTIONS": []
    },
    {
        "FIELD_NAME": "Salary",
        "FIELD_ID": "b5b1d907-95a1-4465-b0c3-e1d1190888ce",
        "FIELD_POSITION": 2,
        "DATA_TYPE_ID": "3",
        "IS_UNIQUE": false,
        "IS_SEARCHABLE":true,
        "OBJ_ID": "c0e6f107-daf0-401e-a6e3-c0f267414b1b",
        "DATA_TYPE": 'Number',
        "LESS" : "",
        "GREATER" : "",
        "EQUALS" : "",
        "OPTIONS": []
    },
    {
        "FIELD_NAME": "Date Of Joining",
        "FIELD_ID": "126696ad-6286-493a-a85c-b17da5c6d37d",
        "FIELD_POSITION": 1,
        "DATA_TYPE_ID": "3",
        "IS_UNIQUE": false,
        "IS_SEARCHABLE":true,
        "OBJ_ID": "c0e6f107-daf0-401e-a6e3-c0f267414b1b",
        "DATA_TYPE": 'Date-Time',
        "OPTIONS": []
    },
    {
        "FIELD_NAME": "Designation",
        "FIELD_ID": "8a170f72-403f-4cdc-a859-0dbae0ad9b17",
        "FIELD_POSITION": 4,
        "DATA_TYPE_ID": "3",
        "IS_UNIQUE": false,
        "IS_SEARCHABLE":true,
        "OBJ_ID": "c0e6f107-daf0-401e-a6e3-c0f267414b1b",
        "DATA_TYPE": "Dropdown",
        "OPTIONS": [{label:"None", value:"None"}, {label:"Role 1", value:"Role 1"}, {label:'Role 2', value:'Role 2'}, {label:'Role 3', value:'Role 3'}]
    },
    {
        "FIELD_NAME": "Shift",
        "FIELD_ID": "8a170f72-403f-4cdc-a859-0dbae0ad9a17",
        "FIELD_POSITION": 4,
        "DATA_TYPE_ID": "3",
        "IS_UNIQUE": false,
        "IS_SEARCHABLE":true,
        "OBJ_ID": "c0e6f107-daf0-401e-a6e3-c0f267414b1b",
        "DATA_TYPE": "Radio Button",
        "OPTIONS": ["None", "Day", "Night","Evening"],
    },
    {
        "FIELD_NAME": "Active Status",
        "FIELD_ID": "2eb7bda4-ecf2-48ce-9cf7-d2cc1788a397",
        "FIELD_POSITION": 1,
        "DATA_TYPE_ID": "3",
        "IS_UNIQUE": false,
        "IS_SEARCHABLE":true,
        "OBJ_ID": "c0e6f107-daf0-401e-a6e3-c0f267414b1b",
        "DATA_TYPE": "Radio Button",
        "OPTIONS": ["None", "Yes", "No"],
    }
]

//give me an api where this is the searched result according to the searched value 

export const gridData = [
    {
      empId : "739232131",
      Name: "Anirban Ghosh", 
      Role: "Dev",
      Designation: "ASE",
      DOJ:'01/01/0001',
      Gender:"Male",
      Salary:"9999999999",
      Email:"anirban.ghosh@simpsoftsolutions.com",
      Active:'YES'
    },
    {
        empId : "73923212241",
        Name: "Kaif Hasan",
        Role: "Dev",
        Designation: "Intrn",
        DOJ:'01/01/2000',
        Gender:"Male",
        Salary:"300/day",
        Email:"kaifhasan222@gmail.com",
        Active:'YES'
      },
      {
        empId : "3222241",
        Name: "Sourav Dutto",
        Role: "Dev",
        Designation: "MD",
        DOJ:'30/02/1939',
        Gender: "Female",
        Salary:"855555",
        Email:"souravdutto244@gmail.com",
        Active:'YES'
      },
      {
        empId : "2221241",
        Name: " Ajay Devgan",
        Role: "Backend",
        Designation: "Intrn",
        DOJ:'30/02/2110',
        Gender: "other",
        Salary:"84455",
        Email:"ajaydevgan1999@gmail.com",
        Active:'YES'
      },
      {
        empId : "12222241",
        Name: "Altab Raja",
        Role: " Bathroom Singer",
        Designation: "ASE",
        DOJ:'30/02/2013',
        Gender: "Male",
        Salary:"855555",
        Email:"altabraja399@gmail.com",
        Active:'NO'
      },
]


//give me an api where this is the column api where all the column names while returning the search result 
//the autoId or empID should always at the fist index 

export const gridColDefs = [
    {field : "ID"},
    {field : "Name"},
    {field : "Role"},
    {field : "Designation"},
    {field : "DOJ"},
    {field : "Gender"},
    {field : "Salary"},
    {field : "Email"},
    {field : "Active"},
]