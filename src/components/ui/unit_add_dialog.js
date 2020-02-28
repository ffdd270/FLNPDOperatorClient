import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from "@material-ui/core/TableCell";
import CharacterDelete from "../character_delete";
import Button from "@material-ui/core/Button";



class UnitAddDialog extends React.Component
{

    constructor(props) {
        super(props);
    }


    handleOnClick( event )
    {

    }

    render() {
        const { classes } = this.props;

        return(
            <div>
                <Button variant={"contained"} color={"primary"} onClick={this.handleOnClick}></Button>

            </div>
        )

    }

}
