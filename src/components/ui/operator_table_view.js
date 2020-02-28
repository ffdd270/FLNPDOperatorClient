import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from "@material-ui/core/TableCell";
import CharacterDelete from "../character_delete";



class OperatorTableView extends React.Component
{


    render() {
        const { classes } = this.props;

        return(
            <TableRow>
                <TableCell>{this.props.id}</TableCell>
                <TableCell><img src={this.props.image} alt="not loaded."/></TableCell>
                <TableCell>{this.props.name}</TableCell>
                <TableCell>{this.props.max_hp}</TableCell>
                <TableCell>{this.props.max_ap}</TableCell>
                <TableCell>{this.props.skill_set_id}</TableCell>
                <TableCell><CharacterDelete id={this.props.id}/></TableCell>
            </TableRow>
        )

    }

}
