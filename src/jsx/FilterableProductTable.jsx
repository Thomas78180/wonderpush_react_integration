import React from 'react';
import SearchBar from './SearchBar';
import ProductTable from './ProductTable';

export default class FilterableProductTable extends React.Component {

    constructor(props) {
        super(props);

        this.onUpdateSearch = this.onUpdateSearch.bind(this);
    }

    addCategoryArticle(displayedArticles, category, article) {
        
        if(!displayedArticles[category]) {
            displayedArticles[category] = [];
        }
        displayedArticles[category].push(article);
        return displayedArticles;
    }

    onUpdateSearch(search) {

        console.log('FilterableProductTable onUpdateSearch(search)', search);

        // reinit resultats
        var displayedArticles = [];
        var temp = this.props.articles;

        if(search.available) {

            // ne pas prendre en compte les articles indisponibles
            temp = this.props.articles.filter(function(article) {
                return article.stocked;
            });
        }

        // obtenir la liste des catégories
        var categories = [];
        temp.forEach(article => {
            if(categories.indexOf(article.category) == -1) {
                categories.push(article.category);
            }
        });

        // classer par categorie de produits
        categories.forEach(category => {

            temp.forEach(article => {

                if(article.category == category) { // test  si categorie concordante

                    if(search.value) { // test keyword

                        if(article.name.match(search.value) || article.price.match(search.value)) {
                        
                            displayedArticles = this.addCategoryArticle(displayedArticles, category, article);
                        }
                    }
                    else {
                        displayedArticles = this.addCategoryArticle(displayedArticles, category, article);
                    }
                }
            });
        });

        console.log('FilterableProductTable displayedArticles', displayedArticles);

        this.productTable.updateArticles(displayedArticles);
    }

    componentDidUpdate(prevProps) {
        console.log('FilterableProductTable componentDidUpdate');
        console.log('old props:', prevProps);
        console.log('new props:', this.props);
    }

    componentDidMount() {
        this.onUpdateSearch({}); // recherche sans critères au mount
    }

    render() {

        return (
            <div>
                <SearchBar onUpdateSearch={this.onUpdateSearch} />
                <ProductTable ref={ component => {
                    this.productTable = component;
                } } />
            </div>
        );
    }
}