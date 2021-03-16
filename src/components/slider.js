import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
    root: {
        width: 300,
    },
});

function valuetext(value) {
    return `${value}`;
}

function RangeSlider(props) {
    const classes = useStyles();
    const min = 1, max = 8
    const [value, setValue] = React.useState([min, max]);


    const handleChange = (event, newValue) => {
        setValue(newValue);
        props.onChange(newValue);
    };

    return (
        <div className={classes.root}>
            <Typography id="range-slider" gutterBottom>
                Configuration Slider
            </Typography>
            <Slider
                value={value}
                max = {max}
                min = {min}
                onChange={handleChange}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                getAriaValueText={valuetext}
            />
        </div>
    );
}

export default RangeSlider