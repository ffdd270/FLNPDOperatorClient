import React from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import {Card, DialogContent, DialogTitle, Paper, TextField} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {Socket} from "../system/socket";
import ChatBox from "./chat_box";
import {ChatLog} from "../system/chat_log";
import List from "@material-ui/core/List";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import axios from 'axios';
import qs from "querystring";



const styles = (theme) =>(
    {
         //여기에 코드 추가
    }
);



class OperatorUnitAddList extends React.Component
{
    state = {
        open: false
    };

    constructor( props ) {
        super( props );
        this.onAddButton = this.onAddButton.bind( this );
        this.onClose = this.onClose.bind( this );
        this.onUnitAdd = this.onUnitAdd.bind( this );
        this.query = this.query.bind(this);
    }


    onAddButton( )
    {
        this.setState( {
            open: true
        });
    }

    onClose()
    {
        this.setState( {
            open: false
        });
    }

    query( id )
    {
        const url = '/api/create_party_unit';

        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        // 쿼리문 쏘기! stringify fh qkRNjwnsek. 
        return axios.post(url, qs.stringify({
            char_id: id,
            battle_id: "Sample"
        }), config);
    }

    onUnitAdd( id )
    {
        this.query( id ).then( (res) =>
        {
            console.log( res.data );
        });
        this.setState( {
            open: false
        });

    }

    render() {
        const { classes } = this.props;

        return(
            <div>
                <Button variant={"contained"} color={"inherit"} onClick={ this.onAddButton }> 추가 </Button>

                <Dialog open={this.state.open} onClose={this.onClose}>
                    <DialogTitle onClose={this.onClose}>
                        경고!
                    </DialogTitle>

                    <DialogContent>
                        <Typography gutterBottom>
                            선택한 캐릭터가 삭제됩니다. 복구는 지원하지 않습니다.
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={event =>
                        {
                            this.onUnitAdd(this.props.id);
                        } }> 추가 </Button>
                        <Button variant="outlined" color="primary" onClick={this.onClose}> 닫기 </Button>
                    </DialogActions>
                </Dialog>

            </div>
        )

    }

}


export default withStyles(styles)(OperatorUnitAddList)