import React from 'react';
import { post } from 'axios';


class CharacterAddForm extends React.Component
{


    constructor(props )
    {
        super(props);

        this.state =
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

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.createCharacter = this.createCharacter.bind(this);
    }

    handleFormSubmit( event )
    {
        event.preventDefault();

        this.createCharacter()
            .then((response) => {
                console.log(response.data);
            });

        this.setState(
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
            });
        window.location.reload();
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


    render() {

        return (
            <form onSubmit={this.handleFormSubmit}>
                <h1>캐릭터 추가</h1>
                프로필 이미지: <input type="file" name="sprite" file={this.state.sprite} value={this.state.sprite_file_name} onChange={this.handleFileChange} /><br/>
                이름: <input type="text" name="name" value={this.state.name} onChange={this.handleValueChange} /><br/>
                나이: <input type="text" name="age" value={this.state.age} onChange={this.handleValueChange} /><br/>
                성별: <input type="text" name="sex" value={this.state.sex} onChange={this.handleValueChange} /><br/>
                <button type="submit">추가하기</button>
            </form>
        )
    }
}

export default CharacterAddForm
