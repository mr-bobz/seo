/*
    Stateless Component, creates tile for a search result
    @author: Bobby Joseph <bobbyj79@gmail.com>
*/
import React from 'react';

import { StructuredListRow, StructuredListCell } from 'carbon-components-react';

class ResultTile extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <StructuredListRow>
                <StructuredListCell noWrap>
                    {this.props.position}
                </StructuredListCell>
                <StructuredListCell>
                    <a href={this.props.url} target="_blank" className='title'>
                        {this.props.title}
                    </a>
                    <div className="googleURL">{this.props.url}</div> 
                    <div className="googleSummary" dangerouslySetInnerHTML={{__html:this.props.summary}}/> 
                </StructuredListCell>
            </StructuredListRow> 
        )
    }
}

export default ResultTile;