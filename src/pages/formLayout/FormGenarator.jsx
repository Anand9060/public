import { times } from "lodash";
import React, { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";

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
} from "@mui/material";

import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import Autocomplete from "@mui/material/Autocomplete";

import dayjs from "dayjs";

var node = null;
var count = 0;

const FormGenarator = ({
  layout,
  handleChange,
  handleDateChange,
  handleCheckboxChange,
  handleMultiSelectChange,
}) => {
  // const [layout, setLayout] = useState(layout);
  const selectedDate = useState(new Date("2022-04-17"));

  const showFieldOptionList = (id) => {
    let componenets = [];
    if (layout.child.length !== 0) {
      layout.child.map((element, index) => {
        if (element.type == "Section" && element.child > 0) {
          return showFieldOptionList(id);
        } else {
          if (element.field_id == id) {
            componenets = element.options.map((ele, indx) => (
              // console.log(ele.OPTION_NAME)
              <MenuItem value={ele.OPTION_NAME} key={ele.OPTION_ID}>
                {ele.OPTION_NAME}
              </MenuItem>
            ));
          }
        }
      });
    }
    return componenets;
  };
  const showFieldMulitOptionList = (id) => {
    let componenets = [];
    if (layout.child.length !== 0) {
      layout.child.map((element, index) => {
        if (element.type == "Section" && element.child > 0) {
          return showFieldMulitOptionList(id);
        } else {
          if (element.field_id == id) {
            element.options.map((ele) => {
              componenets.push(ele.OPTION_NAME);
            });
          }
        }
      });
    }
    // console.log(componenets);
    return componenets;
  };

  const allFieldListFun = () => {
    return (
      <>
        <Grid
          item
          xs={layout.width}
          id={layout.section_id}
          style={{ border: "1px", borderStyle: "dotted", borderColor: "green" }}
        >
          <Grid container fullWidth>
            {layout.child.map((ele) => {
              if (ele.type == "Section") {
                return (
                  <FormGenarator
                    layout={ele}
                    handleChange={handleChange}
                    handleDateChange={handleDateChange}
                    handleCheckboxChange={handleCheckboxChange}
                    handleMultiSelectChange={handleMultiSelectChange}
                  />
                );
              } else if (ele.type == "Date-Time") {
                return (
                  <Grid item xs={12}>
                    <InputLabel>{ele.name}</InputLabel>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        value={dayjs(ele.value).format('MM/DD/YYYY')}
                        renderInput={(params) => <TextField {...params} />}
                        onChange={(date) =>
                          handleDateChange(ele.field_id, ele.section_id)(date.format('YYYY-MM-DD'))
                        }
                      />
                    </LocalizationProvider>
                  </Grid>

                );
              } else if (ele.type == "Text Lookup Multiple Choice") {
                return (
                  <Autocomplete
                    multiple
                    limitTags={2}
                    size="small"
                    id="multiple-limit-tags"
                    options={showFieldMulitOptionList(ele.field_id)}
                    value={ele.value}
                    getOptionLabel={(option) => option}
                    onChange={handleMultiSelectChange(
                      ele.field_id,
                      ele.section_id
                    )}
                    renderInput={(params) => (
                      <TextField {...params} label="Select" placeholder="Add" />
                    )}
                    sx={{ width: "500px" }}
                  />
                );
              } else if (
                ele.type == "Text Lookup"
                /*|| ele.type == "Dynamic Lookup" || ele.type == "Dynamic Lookup Multiple Choice"||ele.type=="Dynamic Lookup"*/
              ) {
                return (
                  <>
                    <InputLabel id="demo-simple-select-label">
                      {ele.name}
                    </InputLabel>
                    <FormControl fullWidth>
                      <Select
                        id={ele.field_id}
                        size="small"
                        name={ele.field_id}
                        value={ele.value}
                        onChange={handleChange(ele.field_id, ele.section_id)}
                      >
                        {showFieldOptionList(ele.field_id)}
                      </Select>
                    </FormControl>
                  </>
                );
              } else if (
                ele.type == "Password" ||
                ele.type == "Phone Number" ||
                ele.type == "Single Line Text" ||
                ele.type == "Number" ||
                ele.type == "Email"
              ) {
                return (
                  <Grid item xs={12}>
                    <InputLabel>{ele.name}</InputLabel>
                    <TextField
                      margin="normal"
                      required
                      id={ele.field_id}
                      name={ele.field_id}
                      fullWidth
                      autoFocus
                      size="small"
                      value={ele.value}
                      onChange={handleChange(ele.field_id, ele.section_id)}
                    />
                  </Grid>
                );
              } else if (ele.type === "Multiple Line Text") {
                return (
                  <Grid item xs={12}>
                    <InputLabel>{ele.name}</InputLabel>
                    <TextField
                      margin="normal"
                      multiline
                      required
                      id={ele.field_id}
                      name={ele.field_id}
                      fullWidth
                      autoFocus
                      size="small"
                      value={ele.value}
                      onChange={handleChange(ele.field_id, ele.section_id)}
                    />
                  </Grid>
                );
              } else if (ele.type == "Checkbox") {
                return (
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label={ele.name}
                    fullWidth
                    checked={ele.value}
                    onChange={handleCheckboxChange(
                      ele.field_id,
                      ele.section_id
                    )}
                  />
                );
              } else if (ele.type == "Radio Button") {
                return <>Radio Button</>;
              } else if (ele.type == "Attachment") {
                return <>Attachment</>;
              }
            })}
          </Grid>
        </Grid>
      </>
    );
  };

  return <>{allFieldListFun()}</>;
};
const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: "Pulp Fiction", year: 1994 },
  {
    title: "The Lord of the Rings: The Return of the King",
    year: 2003,
  },
  { title: "The Good, the Bad and the Ugly", year: 1966 },
  { title: "Fight Club", year: 1999 },
  {
    title: "The Lord of the Rings: The Fellowship of the Ring",
    year: 2001,
  },
  {
    title: "Star Wars: Episode V - The Empire Strikes Back",
    year: 1980,
  },
  { title: "Forrest Gump", year: 1994 },
  { title: "Inception", year: 2010 },
  {
    title: "The Lord of the Rings: The Two Towers",
    year: 2002,
  },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { title: "Goodfellas", year: 1990 },
  { title: "The Matrix", year: 1999 },
  { title: "Seven Samurai", year: 1954 },
  {
    title: "Star Wars: Episode IV - A New Hope",
    year: 1977,
  },
  { title: "City of God", year: 2002 },
  { title: "Se7en", year: 1995 },
  { title: "The Silence of the Lambs", year: 1991 },
  { title: "It's a Wonderful Life", year: 1946 },
  { title: "Life Is Beautiful", year: 1997 },
  { title: "The Usual Suspects", year: 1995 },
  { title: "Léon: The Professional", year: 1994 },
  { title: "Spirited Away", year: 2001 },
  { title: "Saving Private Ryan", year: 1998 },
  { title: "Once Upon a Time in the West", year: 1968 },
  { title: "American History X", year: 1998 },
  { title: "Interstellar", year: 2014 },
  { title: "Casablanca", year: 1942 },
  { title: "City Lights", year: 1931 },
  { title: "Psycho", year: 1960 },
  { title: "The Green Mile", year: 1999 },
  { title: "The Intouchables", year: 2011 },
  { title: "Modern Times", year: 1936 },
  { title: "Raiders of the Lost Ark", year: 1981 },
  { title: "Rear Window", year: 1954 },
  { title: "The Pianist", year: 2002 },
  { title: "The Departed", year: 2006 },
  { title: "Terminator 2: Judgment Day", year: 1991 },
  { title: "Back to the Future", year: 1985 },
  { title: "Whiplash", year: 2014 },
  { title: "Gladiator", year: 2000 },
  { title: "Memento", year: 2000 },
  { title: "The Prestige", year: 2006 },
  { title: "The Lion King", year: 1994 },
  { title: "Apocalypse Now", year: 1979 },
  { title: "Alien", year: 1979 },
  { title: "Sunset Boulevard", year: 1950 },
  {
    title:
      "Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb",
    year: 1964,
  },
  { title: "The Great Dictator", year: 1940 },
  { title: "Cinema Paradiso", year: 1988 },
  { title: "The Lives of Others", year: 2006 },
  { title: "Grave of the Fireflies", year: 1988 },
  { title: "Paths of Glory", year: 1957 },
  { title: "Django Unchained", year: 2012 },
  { title: "The Shining", year: 1980 },
  { title: "WALL·E", year: 2008 },
  { title: "American Beauty", year: 1999 },
  { title: "The Dark Knight Rises", year: 2012 },
  { title: "Princess Mononoke", year: 1997 },
  { title: "Aliens", year: 1986 },
  { title: "Oldboy", year: 2003 },
  { title: "Once Upon a Time in America", year: 1984 },
  { title: "Witness for the Prosecution", year: 1957 },
  { title: "Das Boot", year: 1981 },
  { title: "Citizen Kane", year: 1941 },
  { title: "North by Northwest", year: 1959 },
  { title: "Vertigo", year: 1958 },
  {
    title: "Star Wars: Episode VI - Return of the Jedi",
    year: 1983,
  },
  { title: "Reservoir Dogs", year: 1992 },
  { title: "Braveheart", year: 1995 },
  { title: "M", year: 1931 },
  { title: "Requiem for a Dream", year: 2000 },
  { title: "Amélie", year: 2001 },
  { title: "A Clockwork Orange", year: 1971 },
  { title: "Like Stars on Earth", year: 2007 },
  { title: "Taxi Driver", year: 1976 },
  { title: "Lawrence of Arabia", year: 1962 },
  { title: "Double Indemnity", year: 1944 },
  {
    title: "Eternal Sunshine of the Spotless Mind",
    year: 2004,
  },
  { title: "Amadeus", year: 1984 },
  { title: "To Kill a Mockingbird", year: 1962 },
  { title: "Toy Story 3", year: 2010 },
  { title: "Logan", year: 2017 },
  { title: "Full Metal Jacket", year: 1987 },
  { title: "Dangal", year: 2016 },
  { title: "The Sting", year: 1973 },
  { title: "2001: A Space Odyssey", year: 1968 },
  { title: "Singin' in the Rain", year: 1952 },
  { title: "Toy Story", year: 1995 },
  { title: "Bicycle Thieves", year: 1948 },
  { title: "The Kid", year: 1921 },
  { title: "Inglourious Basterds", year: 2009 },
  { title: "Snatch", year: 2000 },
  { title: "3 Idiots", year: 2009 },
  { title: "Monty Python and the Holy Grail", year: 1975 },
];

export default FormGenarator;
