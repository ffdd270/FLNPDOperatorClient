import React from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';
import TableCell from "@material-ui/core/TableCell";
import CharacterDelete from "../character_delete";
import OperatorUnitAddList from "./operator_unit_add_list";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";

const styles = (theme) =>(
    {
        root: {
            position: "fixed",
            bottom: "200px"
        },

        tableHead: {

        }
    }
);


class OperatorView extends React.Component
{

    render() {
        const { classes } = this.props;
        const cellList = [ "ID", "Image", "Name", "MaxHP", "MaxAP", "Skill SET ID", "ADD!" ];


        return (
            <div className={classes.root}>
                반가워오
                <Table>
                    <TableHead>
                        <TableRow>
                            {
                                cellList.map( c=> {
                                    return <TableCell>{c}</TableCell>
                                })
                            }
                        </TableRow>
                    </TableHead>

                </Table>
            </div>
        )
    }

}


export default withStyles(styles)(OperatorView)