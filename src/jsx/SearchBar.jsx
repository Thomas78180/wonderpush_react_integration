import React from 'react';

export default class SearchBar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            available: false
        };

        this.handleChangeKeyword = this.handleChangeKeyword.bind(this);
        this.handleChangeAvailable = this.handleChangeAvailable.bind(this);
    }

    handleChangeKeyword(event) {
        this.props.onUpdateSearch({value: event.target.value});
    }

    handleChangeAvailable(event) {
        this.setState({available: !this.state.available}, function() {
            this.props.onUpdateSearch({available: this.state.available});
        });
        
    }

    render() {
        return (
            <div>
                <input type="text" name="keyword" onChange={this.handleChangeKeyword} />
                <br />
                <input type="checkbox" id="inStock" name="inStock" onChange={this.handleChangeAvailable} />
                <label id="txt" htmlFor="inStock">Only show products in stock</label>
            </div>
        );
    }
}