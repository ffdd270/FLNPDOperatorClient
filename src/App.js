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
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
    paper: {
        marginLeft: 18,
        marginRight: 18
    },
   tableHead:{
     fontSize: '1.0rem'
   },
   menuButton:{
       marginRight: theme.spacing(2)
    },
    title: {
        flexGrow: 1,
    },
  table: {
    minWidth: 1080
  }
});

class App extends Component {

  state = {
    characters: ''
  };


  constructor( props )
  {
      super( props );

      this.state = {
          characters: '',
          completed: 0,
      }

      this.stateRefresh = this.stateRefresh.bind(this);
  }


  stateRefresh()
  {
      this.setState(
          {
              characters: '',
              completed: 0,
          }
      );

      this.callApi().then( res  => this.setState( {characters: res } ))
  }

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

    const cellList = ["번호", "이미지", "이름", "나이", "성별", "최대 채력", "최대 AP", "스킬 셋", "Action"];

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        FLNPD Operator Client
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Paper className={classes.paper}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                    {
                        cellList.map( c=> {
                            return <TableCell className={classes.tableHead}>{c}</TableCell>
                        })
                    }
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.characters ? this.state.characters.map(c =>
                {
                  console.log("c.image>?", c.image);
                  c.image = c.image ? c.image : "./test.png";

                  return <CharacterTable key={c.id} id={c.id} image={c.image} name={c.name} age={c.age}
                                         sex={c.sex} max_hp={c.max_hp} max_ap={c.max_ap}
                                         skill_set_id={c.skill_set_id} stateRefresh={this.stateRefresh} />
                }) : ''}
              </TableBody>
            </Table>
          </Paper>
          <CharacterAddForm stateRefresh={this.stateRefresh}/>
        </div>
    );
  }
}

export default withStyles(styles)(App);
