import React from 'react';
import ProductCategoryRow from './ProductCategoryRow';
import ProductRow from './ProductRow';

export default class ProductTable extends React.Component {

    constructor(props) {
        super(props);
        this.data = [];
    }

    componentDidUpdate(prevProps) {
        console.log('ProductTable componentDidUpdate()');
        console.log('old props:', prevProps);
        console.log('new props:', this.props);
        console.log('this.data:', this.data);
    }

    updateArticles(data) {
        console.log('ProductTable updateArticles() data', data);
        this.data = data;
        this.forceUpdate();
    }

    componentDidMount() {
        console.log('ProductTable componentDidMount() this.props.displayedArticles', this.props.displayedArticles);
    }

    render() {

        var rows = [];
        var i = 0;

        for(var category in this.data) {

            rows.push(<ProductCategoryRow key={i++} category={category} />);

            for(var j = 0; j < this.data[category].length; j++) {
                rows.push(<ProductRow key={i++} name={this.data[category][j].name} price={this.data[category][j].price} />);    
            }
        }

        return (
            <table>
                <thead>
                    <tr><th>Name</th><th>Price</th></tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        )
    }
}