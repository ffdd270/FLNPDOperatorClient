import React from 'react';
import { post } from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    hidden: {
        display: 'none'
    }
});

class CharacterAddForm extends React.Component
{
    default_state =
        {
            sprite: null,
            sprite_file_name: '',
            name: '',
            age: '',
            sex: '',
            user_id: 'test_account',
            story_id: 0, //TODO : 테스트 !
            max_hp: 5,
            max_ap: 100,
            skill_set_id: '스킬 셋은 아직 미지원입니다.',
        };

    constructor( props )
    {
        super(props);

        this.state = this.default_state;

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.handleFileChange = this.handleFileChange.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.createCharacter = this.createCharacter.bind(this);
    }

    handleFormSubmit( event )
    {
        event.preventDefault();

        this.createCharacter()
            .then((response) => {
                console.log(response.data);
                this.props.stateRefresh();
            });

        this.setState( this.default_state );
        this.setState( {open: false} );
    }

    handleFileChange( event )
    {
        this.setState({
            sprite: event.target.files[0],
            sprite_file_name: event.target.value
        });
    }

    handleValueChange(event)
    {
        let regex = /^[0-9]+$/;

        console.log( "regex.exec(event.target.value)?", regex.exec(event.target.value));

        if (event.target.type === "number" &&  ( regex.exec(event.target.value)  == null ) )
        {
            return;
        }

        let nextState = {};
        nextState[event.target.name] = event.target.value;

        this.setState(nextState);
    }

    createCharacter(){
        const url = '/api/create_character';
        const formData = new FormData();

        formData.append('sprite', this.state.sprite);
        formData.append('name', this.state.name);
        formData.append('age', this.state.age);
        formData.append('sex', this.state.sex);
        formData.append('user_id', this.state.user_id);
        formData.append('story_id', this.state.story_id);
        formData.append('file_name', this.state.sprite_file_name);

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };

        return post(url, formData, config)
    }

    handleClickOpen()
    {
        this.setState(
            {
                open: true
            }
        )
    }

    handleClose()
    {
        this.setState(
            {
                open: false
            }
        )
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
                    캐릭터 추가하기
                </Button>

                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>캐릭터 추가</DialogTitle>

                    <DialogContent>
                        <input className={classes.hidden} accept="image/*" id="raised-button-file" type="file" file={this.state.sprite} value={this.state.sprite_file_name} onChange={this.handleFileChange} />
                        <label htmlFor="raised-button-file">
                            <Button variant="contained" color="primary" component="span" name="file">
                                {this.state.sprite_file_name === ''? "프로필 이미지 선택" : this.state.sprite_file_name}
                            </Button>
                        </label><br/>

                        <TextField label="이름" type="text" name="name" value={this.state.name} onChange={this.handleValueChange} /><br/>
                        <TextField label="나이"
                                   type="number"
                                   name="age"
                                   placeholder={'[1-100]'}
                                   value={this.state.age}
                                   onChange={this.handleValueChange}
                        /><br/>

                        <TextField label="성별" type="text" name="sex" value={this.state.sex} onChange={this.handleValueChange} /><br/>
                    </DialogContent>

                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>추가</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(styles)(CharacterAddForm)
