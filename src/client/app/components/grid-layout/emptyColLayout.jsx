import React from 'react';



class EmptyCol extends React.Component  {
    render () {
        return(
            <div>
                <span>I am an empty layout</span>
            </div>
        )
    }
}

export const EmptyColLayout ={
    "id":"panel-empty",
    "title": "Empty Layout",
    "subtitle":"Subtitles",
    "minHeight": 300,
    "colSpan": 8,
    "content":<EmptyCol />
}
