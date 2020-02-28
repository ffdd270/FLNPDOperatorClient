import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from "@material-ui/core/TableCell";

import CharacterDelete from "./character_delete";

class CharacterTable extends React.Component
{
    render()
    {

        let sprite_path = this.props.image;
        sprite_path.replace("public", "express_public");
        console.log( "sprite_path? ", sprite_path);
        console.log( " this.props.image?",  this.props.image);
        return (
            <TableRow>
                <TableCell>{this.props.id}</TableCell>
                <TableCell><img src={this.props.image} alt="not loaded."/></TableCell>
                <TableCell>{this.props.name}</TableCell>
                <TableCell>{this.props.age}</TableCell>
                <TableCell>{this.props.sex}</TableCell>
                <TableCell>{this.props.max_hp}</TableCell>
                <TableCell>{this.props.max_ap}</TableCell>
                <TableCell>{this.props.skill_set_id}</TableCell>
                <TableCell><CharacterDelete stateRefresh={this.props.stateRefresh} id={this.props.id}/></TableCell>
            </TableRow>
        )
    }
}

export default CharacterTable;
