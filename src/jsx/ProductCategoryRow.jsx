import React from 'react';

export default class ProductCategoryRow extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <tr>
                <td colSpan="2"><b>{this.props.category}</b></td>
            </tr>
        );
    }
}