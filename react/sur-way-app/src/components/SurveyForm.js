import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Axios from 'axios'
import { Redirect } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';


class SurveyForm extends Component {

    state = {
        working_hours: 10, work_days_in_week: 5, company: 'uber', redirect: false
    }

    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault()
        const url = "http://localhost:3000/cabbie-surveys";

        const data = {
            working_hours: this.state.working_hours,
            work_days_in_week: this.state.work_days_in_week,
            company: this.state.company,
        }

        Axios.post(url, data).then((res) => {
            console.log(data);
            this.setState({ redirect: true });

        }).catch((e) => {
            alert("Failed to Submit the form! - " + e)
        });
    }

    render() {
        const { classes } = this.props;
        const padding = {
            margin: "10px",
        };

        const { redirect } = this.state;

        if (redirect) {
            return <Redirect to='/thanks' />;
        }

        this.state.companies = {
            'uber': 'Uber', 'ola': "Ola", 'meru': "Meru", 'carzonrent': "Carz On Rent", 'savaaricarrentals': "Savaari Car Rentals",
            'tabcab': "Tab Cab", 'megacabs': "Mega Cabs", 'ntltaxi': "Ntl Taxi", 'mytaxiindia': "My Taxi India"
        }

        return (
            <Container fixed>

                <form onSubmit={this.handleSubmit}>

                    <div>
                        <TextField
                            id="standard-basic"
                            className={classes.textField}
                            label="Your Name?"
                            margin="normal"
                        />
                    </div>

                    <label>
                        How many hours a day do I work?
              <input
                            type="number"
                            defaultValue={this.state.working_hours}
                            onChange={this.handleInputChange}
                            name="working_hours"
                            style={padding}
                        />
                    </label>

                    <br></br>

                    <label>
                        How many days a week do I work?
              <input
                            type="number"
                            defaultValue={this.state.work_days_in_week}
                            onChange={this.handleInputChange}
                            name="work_days_in_week"
                            style={padding}
                        />
                    </label>
                    <br></br>

                    <label>
                        Company that I work for?
          <select value={this.state.value} defaultValue={this.state.company} onChange={this.handleInputChange} name='company'
                            style={padding}>
                            {/* <option value="other">Other</option> */}
                            {/* <option value="uber">Uber</option> */}
                            {/* <option value="ola">Ola</option> */}
                            {Object.keys(this.state.companies).map((key, index) => (
                                <option value={key}>{this.state.companies[key]} </option>
                            ))}

                        </select>
                    </label>

                    <br></br>

                    <Button variant="contained" type="submit" color="primary">
                        Submit
        </Button>

                </form>
            </Container>
        )
    }

}

const useStyles = makeStyles(theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  }));
  
// This injects, with styles into survey form, ig?
export default withStyles(useStyles)(SurveyForm)
