import React from "react";
import axios from "./axios";
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';


const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 4000,
  },
});

const currencies = [
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },
  {
    value: 'BTC',
    label: '฿',
  },
  {
    value: 'JPY',
    label: '¥',
  },
];

class Bio extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            bioEditorIsVisible: false

        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.hideBioEditor = this.hideBioEditor.bind(this);
        this.showBioEditor = this.showBioEditor.bind(this);

    }

    handleChange(e) {
    // console.log("this.props.bio", this.props.bio)

     this.setState({
         bio: e.target.value
    })
    }

    handleSubmit(e) {
        e.preventDefault();


        axios.post("/bio", {bio: this.state.bio}).then(resp => {
            // console.log("resp in axios.post", resp)
             this.props.setBio(resp.data.bio)

        }).catch(err => console.log("Error in axios.post /bio", err));
        }


    showBioEditor() {
            this.setState({
                bioEditorIsVisible: true
            });
    }

    hideBioEditor() {
            this.setState({
                bioEditorIsVisible: false
            });
    }

    render() {

         const { classes } = this.props;
        return (
            <div id="bio-container">

            { this.props.bio &&
            <div className="bio">
                <h4>Über dich: {this.props.bio }</h4>
                <div >
                    <div onClick={this.showBioEditor}>
                    <button className="button-one">Edit Bio</button>
                    </div>
                </div>
            </div>
                }

                { !this.props.bio &&
                    <div>
                        <div>
                            <div onClick={this.showBioEditor}>
                            <button className="button-one">Add Bio</button>
                            </div>
                        </div>
                    </div>
                                }


                {this.state.bioEditorIsVisible &&
                    <div className="bio-form">
                        <div onClick={this.hideBioEditor}> X </div>
                        <form onSubmit={this.handleSubmit}>
                        <TextField
                            onChange={this.handleChange}
                                  id="outlined-multiline-static"
                                  label="Your Story"
                                  multiline
                                  rows="6"
                                  defaultValue={this.props.bio}
                                  className={classes.textField}
                                  margin="normal"
                                  variant="outlined"
                                />
                        <button className="button-one">Send</button>
                        </form>
                    </div>
                }
                </div>
            );
        }
    }

    Bio.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Bio);
