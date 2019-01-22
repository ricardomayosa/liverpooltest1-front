import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { deleteArticle } from '../productService';

export default class Home extends Component {
	constructor() {
		super();
		this.state = {
			articles: [],
		};
    }
    
    getArticles() {
        axios.get('http://localhost:3000/article')
			.then(res => {
				const articles = res.data.articles;
				this.setState({ articles });
			});
    }

	componentWillMount = () => {
        // Get articles on DB
		this.getArticles();
    };
    
    deleteArticle = id => {
        console.log('ID: ', id);
        deleteArticle(id);
        this.getArticles();
    }

    editArticle = id => {
        console.log('ID: ', id);
    }

	render() {
		const { articles } = this.state;
		return (
			<div>

				<hr />
				<Link className="navbar-brand" to="/new">
					<button type="button" className="btn btn-outline-danger">
						Agrega un nuevo producto
					</button>
				</Link>
				<hr />

                {/* check if there are articles on DB */}
				{articles ? (
					<div className="card-columns">
                        {/* generate a card for each article */}
						{this.state.articles.map((article, index) => (
							<div className="card p-3" key={index}>
								<blockquote className="blockquote mb-0 card-body">
									<h5 className="card-title">
										{article.name}
									</h5>
                                    <img className="img-thumbnail" src={article.photo} alt={article.name}/>
									<p>
										${article.price}
										.00
									</p>
									<Link to={`/edit/${article._id}`} className="card-link">
										Editar
									</Link>
									<Link
										to="."
                                        className="card-link text-danger"
                                        onClick={() => this.deleteArticle(article._id)}
									>
										Eliminar
									</Link>
								</blockquote>
							</div>
						))}
					</div>
				) : (
                    // show this if no articles are found on DB
					<h3>No hay articulos que mostrar</h3>
				)}
			</div>
		);
	}
}