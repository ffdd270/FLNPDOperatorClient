import React from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';
import TableCell from "@material-ui/core/TableCell";
import CharacterDelete from "../character_delete";
import OperatorUnitAddList from "./operator_unit_add_button";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import OperatorTableView from "./operator_table_view";

const styles = (theme) =>(
    {
        root: {
            position: "fixed",
            bottom: "0%",
            width : "calc( 100% - 500px )",
            height: "20%",
            background: "#edf2ff"
        },

        table: {
            tableLayout: "fixed"
        }
    }
);


class OperatorView extends React.Component
{
    state = {
        characters: "",
    };

    constructor(props) {
        super( props );
    }

    async callApi()
    {
        const response = await fetch( "/api/get_characters");
        return await response.json();
    }

    componentDidMount() {
        this.callApi().then( res => this.setState( { characters: res } ) )
    }

    render() {
        const { classes } = this.props;
        const cellList = [ "ID", "Image", "Name", "MaxHP", "MaxAP", "Skill SET ID", "ADD!" ];


        return (



            <div className={classes.root} style={{ overflow: 'auto'}}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            {
                                cellList.map( c=> {
                                    return <TableCell>{c}</TableCell>
                                })
                            }
                        </TableRow>
                    </TableHead>

                    <TableBody style={{ overflow: 'auto', height: '100%'}}>
                        {
                            this.state.characters ? this.state.characters.map( c =>
                            {
                                return <OperatorTableView id={c.id} image={c.image} name={c.name} max_hp={c.max_hp}
                                                          max_ap={c.max_ap} skill_set_id={c.skill_set_id} battle_id={this.props.battle_id} />
                            }) : ''
                        }
                    </TableBody>
                </Table>
            </div>
        )
    }

}


export default withStyles(styles)(OperatorView)