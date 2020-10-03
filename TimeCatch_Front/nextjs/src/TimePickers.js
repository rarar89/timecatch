import React from "react";
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';

export default function Index({selectedDateFrom, handleDateChangeFrom, selectedDateTo, handleDateChangeTo}) {
    
    return (<MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="date-picker-inline-from"
                        label="Date From"
                        value={selectedDateFrom}
                        onChange={handleDateChangeFrom}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                    <KeyboardTimePicker
                        margin="normal"
                        id="time-picker-from"
                        label="Time From"
                        value={selectedDateFrom}
                        onChange={handleDateChangeFrom}
                        KeyboardButtonProps={{
                            'aria-label': 'change time',
                        }}
                    />
                    <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog-to"
                        label="Date To"
                        format="MM/dd/yyyy"
                        value={selectedDateTo}
                        onChange={handleDateChangeTo}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                    <KeyboardTimePicker
                        margin="normal"
                        id="time-picker-to"
                        label="Time To"
                        value={selectedDateTo}
                        onChange={handleDateChangeTo}
                        KeyboardButtonProps={{
                            'aria-label': 'change time',
                        }}
                    />
                </Grid>
            </MuiPickersUtilsProvider>);

}