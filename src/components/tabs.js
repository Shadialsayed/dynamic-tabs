import React, {useState} from 'react';
import TabContent from "./tabContent";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Close from "@material-ui/icons/Clear";
import Add from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {<Box p={3}>{children}</Box>}
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
}));

const initialTabs = [
        {id: 0, displayedContent: false},
    ]

function ScrollableTabsButtonAuto() {
    const classes = useStyles();
    const [selectedTab, setSelectedTab] = useState(0);
    const [tabs, setTab] = useState(initialTabs);


    const [target, setTarget] = useState(null);

    const handleChange = (event, newValue) => {

        if(event.target.tagName == 'SPAN'){
            setSelectedTab(newValue);
            setTarget(event.target)
        }

        else if (event.target.tagName !== 'SPAN' && event.target != target){
            setSelectedTab(tabs[0].id);
            setTarget(event.target)
        }
        else{
            setSelectedTab(newValue);
        }
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <Tabs
                    value={selectedTab}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"

                >
                    {tabs.map((tab, index) =>
                    {
                        return (
                                <Tab key={tab.id} className={'tab_id'} value={tab.id} label={<span>{`TAB${tab.id}`}
                                    <IconButton onClick={() => {

                                        if(tabs.length !== 1){
                                            // To keep track of the tabs indexes, hide the closed tab
                                            document.getElementsByClassName(`tab_id`)[tab.id].style.display = "none";
                                            let item = tabs[index];
                                            item.displayedContent = "removed";
                                            tabs[index] = item;
                                            setTab(tabs);
                                        }

                                    }}>
                                      <Close fontSize="small"/>
                                    </IconButton>
                                </span>}
                                     {...a11yProps(index)}>

                                </Tab>
                        )
                    })}
                    <IconButton
                        onClick={() => {
                            // Append a new tab object on add button
                            setTab([...tabs, {id: tabs.length, displayedContent: false}]);
                        }}
                    >
                        <Add/>
                    </IconButton>
                </Tabs>

            </AppBar>
            {tabs.map((tab, index) =>
            {
                return (
                    <TabPanel value={selectedTab} index={index}>
                        <div className={`chart${index}`}>
                           <TabContent id={index} tabsNumber={tabs.length} display={tab.displayedContent}/>
                        </div>
                        {
                            // show tab's content only for those whose show button was clicked
                            !tab.displayedContent &&
                            <div>
                                No charts available, please click on{<IconButton
                                onClick={() => {
                                    let item = tabs[index];
                                    item.displayedContent = true;
                                    tabs[index] = item;
                                    setTab(tabs);
                                    setTarget(index);
                                }}
                            >
                                <Add/>
                            </IconButton>}to add a new chart
                            </div>
                        }
                    </TabPanel>
                )
            })}
        </div>

    );
}

export default ScrollableTabsButtonAuto;