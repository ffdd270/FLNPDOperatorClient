import React from 'react';
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import {DialogContent, DialogTitle} from "@material-ui/core";
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';


class CharacterDelete extends React.Component
{
    constructor(props) {
        super(props);

        this.state= {
            open: false
        };

        this.handleClickOpen = this.handleClickOpen.bind( this );
        this.handleClose = this.handleClose.bind( this );
    }

    handleClickOpen()
    {
        this.setState({
            open: true
        })
    }


    handleClose()
    {
        this.setState({
            open: false
        })
    }

    characterDelete( id )
    {
        const url = 'api/remove_character/' + id;

        fetch( url, {
           method: "DELETE"
        }).then(
            ()=>
            {
                this.props.stateRefresh();
            }
        );
    }

    render()
    {
        return (
            <div>
                <Button variant="contained" color="secondary" onClick= { this.handleClickOpen }> 삭제 </Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle onClose={this.handleClose}>
                        경고!
                    </DialogTitle>

                    <DialogContent>
                        <Typography gutterBottom>
                            선택한 캐릭터가 삭제됩니다. 복구는 지원하지 않습니다.
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={event => {this.characterDelete(this.props.id)} }> 삭제 </Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClose}> 닫기 </Button>
                    </DialogActions>

                </Dialog>
            </div>
        )
    }


}

export default CharacterDelete;
