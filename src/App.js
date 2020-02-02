import React, { Component } from 'react';

import Paper from '@material-ui/core/Paper';

import { withStyles } from '@material-ui/core/styles';

import './App.css';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';


import CharacterTable from './components/character_table_view';
import CharacterAddForm from "./components/character_add_form";


const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 1080
  }
});

class App extends Component {

  state = {
    characters: ''
  };

  async callApi( )
  {
    const response = await fetch("/api/get_characters");
    const body = await response.json();

    return body;
  }

  componentDidMount()
  {
    this.callApi().then(
        res=>
        {
          this.setState({ characters: res} )
        }
    );
  }

  render() {
    const { classes } = this.props;


    return (
        <div>
          <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>번호</TableCell>
                  <TableCell>이미지</TableCell>
                  <TableCell>이름</TableCell>
                  <TableCell>나이</TableCell>
                  <TableCell>성별</TableCell>
                  <TableCell>최대 채력</TableCell>
                  <TableCell>최대 AP</TableCell>
                  <TableCell>스킬 셋</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.characters ? this.state.characters.map(c => {
                  console.log("c.image>?", c.image);
                  c.image = c.image ? c.image : "./test.png";

                  return <CharacterTable key={c.id} id={c.id} image={c.image} name={c.name} age={c.age} sex={c.sex} max_hp={c.max_hp} max_ap={c.max_ap} skill_set_id={c.skill_set_id} />
                }) : ''}
              </TableBody>
            </Table>
          </Paper>
          <CharacterAddForm/>
        </div>
    );
  }
}

export default withStyles(styles)(App);
