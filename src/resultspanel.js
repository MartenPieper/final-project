import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import SimpleCard from "./resultscard"



const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(20),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  tertiaryHeading: {
      fontSize: theme.typography.pxToRem(13),
      color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '33.33%',
  },
  bigColumn: {
      flexBasis: '66.66%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
});

function DetailedExpansionPanel(props) {
  const { classes } = props;
  console.log("props in resultsspan", props)
  return (
      <div className={classes.root}>



      {props.resultsArray && props.resultsArray.map(
                  res => { // console.log("res in map", res)
                  return res.map(result => {
// console.log("result:", result)

                      return (
                          <div className="online-user" key={result.id}>

       <ExpansionPanel >
         <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
           <div className={classes.column}>
             <Typography className={classes.heading}>
             {result.name}
             </Typography>

             {result.place &&
             <Typography className={classes.secondaryHeading}>
             {result.place}
             </Typography>
             }
             </div>
           <div className={classes.column}>
             <Typography className={classes.secondaryHeading}>
             {result.description.split(" ").splice(0,10).join(" ") + "..."}
             </Typography>
           </div>
            <div className={classes.column}>
            </div>
           <div className={classes.column}>


           {result.event_date &&
             <Typography className={classes.tertiaryHeading}>
             Date: {result.event_date}
             </Typography>
            }
             <br/>
              {result.ts_event &&
             <Typography className={classes.tertiaryHeading}>
            Posted: {result.ts_event}
             </Typography>
            }

           </div>
         </ExpansionPanelSummary>
         <ExpansionPanelDetails className={classes.details}>

           <div className={classes.bigColumn}>
             <Typography className={classes.secondaryHeading}>{"..." + result.description.split(" ").splice(10,result.description.length).join(" ")}</Typography>
           </div>



           <div className={classNames(classes.column, classes.helper)}>
             <Typography className={classes.tertiaryHeading} variant="caption">
               Interested?
               <br />
               <a href={result.link} className={classes.link} target="_blank">
                 Go to Website
               </a>
             </Typography>
           </div>
         </ExpansionPanelDetails>
         <Divider />
         <ExpansionPanelActions>
           <Button size="small">Cancel</Button>
           <Button size="small" color="primary">
             Save
           </Button>
         </ExpansionPanelActions>
       </ExpansionPanel>


       </div>
     )
 })
 })
}
    </div>
)
}







DetailedExpansionPanel.propTypes = {
  classes: PropTypes.object.isRequired,
};


function mapStateToProps(state) {
    console.log("State in mapStateToProps in resultspanel", state)
var list = state.results;
return {
    resultsArray: state.results
};
}

export default withStyles(styles)(DetailedExpansionPanel);
