import React, { useEffect, useState, useMemo, forwardRef, useRef, useImperativeHandle } from "react";
import axios from 'axios';
import _ from 'lodash';


import Button from '@mui/material/Button';

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { auto } from "@popperjs/core";


const styles = theme => ({

});


const ManageCase = (props) => {

     const [age, setAge] = React.useState('');

     const handleChange = (event) => {
          setAge(event.target.value);
     };
     console.log(props);
     return (
          <Dialog
               open={props.open}
               keepMounted
               aria-labelledby="alert-dialog-slide-title"
               aria-describedby="alert-dialog-slide-description"
               maxWidth={"md"}
               fullWidth={true}
               onClose={props.closeManageCase}
          >
               <DialogTitle id="alert-dialog-slide-title">Add Case</DialogTitle>
               <Divider variant="middle" mt={0} />
               <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                         <Grid container spacing={2}>
                              <Grid item xs={6}>
                                   <InputLabel>Name 1</InputLabel>
                                   <TextField
                                        size="small"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        name="email"
                                        autoComplete="email"
                                        autoFocus
                                   />
                              </Grid>
                              <Grid item xs={6}>
                              <InputLabel>Name 2</InputLabel>
                                   <FormControl fullWidth>
                                   
                                        <Select
                                             labelId="demo-simple-select-label"
                                             id="demo-simple-select"
                                             value={age}
                                             onChange={handleChange}
                                             size="small"
                                        >
                                             <MenuItem value={10}>Ten</MenuItem>
                                             <MenuItem value={20}>Twenty</MenuItem>
                                             <MenuItem value={30}>Thirty</MenuItem>
                                        </Select>
                                   </FormControl>
                              </Grid>
                         </Grid>
                    </DialogContentText>
               </DialogContent>
               <Divider variant="middle" mt={0} />
               <DialogActions>
                    <Button color="primary">
                         Save
                    </Button>
                    <Button onClick={() => props.closeManageCase()} color="primary">
                         Close
                    </Button>
               </DialogActions>
          </Dialog>

     );

}

export default ManageCase;





