import React from 'react';


class CharacterDelete extends React.Component
{
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
            <button onClick={(e) => { this.characterDelete(this.props.id)}}> 삭제 </button>
        )
    }


}

export default CharacterDelete;
