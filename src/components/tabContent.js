import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {updateSlider, addNewTabContent} from "../redux";
import Chart from "./chart";
import RangeSlider from "./slider";


function TabContent (props) {

    useEffect(()=>{
        props.addNewTabContent();
    }, [props.tabsNumber])


    return (
        <div>
            {/*<h2>{`Tab_${props.id}`}</h2>
            <h3>Counter - {props.counters.counters[props.id].contentCounter}</h3>
            <button onClick={() => {props.increment(props.id);}}>increment</button>
            <br/>*/}
            {props.display == true &&
            <table>
                <tbody>
                <tr>
                    <Chart sliderRange={props.contents.contents[props.id].sliderRange}/>
                </tr>
                <tr>
                    <td>
                        <RangeSlider onChange={value => {props.updateSlider(props.id, value)}}/>
                    </td>
                </tr>
                </tbody>
            </table>
            }


        </div>
    )
}

const mapStateToProps = state => {
    return {
        contents: state
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateSlider: (index, value) => dispatch(updateSlider(index, value)),
        addNewTabContent: () => dispatch(addNewTabContent())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TabContent)