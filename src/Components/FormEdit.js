import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { editArticle } from '../productService';
import axios from 'axios';

export default class FormEdit extends Component {
	constructor() {
		super();
		this.state = {
			file: null,
			image: null,
			article: {},
		};
	}
	componentWillMount = () => {
		// Get articles on DB this.props.match.params.id
		const baseURL =
			window.location.hostname === 'localhost'
				? 'http://localhost:3000/article'
				: 'https://liverpooltest-1.herokuapp.com';
		axios
			.get(`${baseURL}/${this.props.match.params.id}`)
			.then(res => {
				const article = res.data.article;
				this.setState({ article });
			});
	};
	imageHandler = e => {
		console.log(e.target.files[0]);
		if (e.target.files[0]) {
			this.setState({
				image: e.target.files[0],
			});
			this.setState({
				file: URL.createObjectURL(e.target.files[0]),
			});
		} else {
			this.setState({
				file: null,
			});
		}
	};
	handleChange = e => {
		const { article } = this.state;
		let field = e.target.name;
		article[field] = e.target.value;
		this.setState({ article });
	};
	handleSubmit = e => {
		e.preventDefault();
		let { article } = this.state;
		let { image } = this.state;
		if (image) {
			article.photo = image;
		}
		editArticle(
			this.state.article,
			this.state.article._id,
			this.props.history,
		);
	};
	render() {
		const { file } = this.state;
		let image = this.state.article.photo;
		return (
			<div className="container">
				<div className="card text-center">
					<div className="card-body">
						<h5 className="card-title">Edit this product</h5>
						<form
							className="text-left"
							onSubmit={this.handleSubmit}
						>
							<div className="form-group row">
								<label
									htmlFor="exampleInputEmail1"
									className="col-sm-2 col-form-label"
								>
									Name
								</label>
								<div className="col-sm-10">
									<input
										type="text"
										className="form-control"
										id="signupUsername"
										aria-describedby="signupUsername"
										name="name"
										onChange={this.handleChange}
										defaultValue={this.state.article.name}
									/>
								</div>
							</div>
							<div className="form-group row">
								<label
									htmlFor="exampleInputEmail1"
									className="col-sm-2 col-form-label"
								>
									Price
								</label>
								<div className="col-sm-10">
									<input
										type="text"
										className="form-control"
										id="signupPass"
										aria-describedby="signupPass"
										name="price"
										onChange={this.handleChange}
										defaultValue={this.state.article.price}
									/>
								</div>
							</div>
							<div className="form-group row">
								<label
									htmlFor="exampleInputEmail1"
									className="col-sm-2 col-form-label"
								>
									Photos
								</label>
								<input
									type="file"
									className="col-sm-10"
									id="signupPass"
									aria-describedby="signupPass"
									name="photos"
									multiple
									onChange={this.imageHandler}
								/>
							</div>
							<div className="form-group row">
								<label
									htmlFor=""
									className="col-sm-2 col-form-label"
								/>
								{file ? (
									<img
										responsive="true"
										// className="img-fluid"
										src={this.state.file}
										alt="alt"
										width="200"
										height="200"
									/>
								) : (
									<img
                                        responsive="true"
										// className="img-thumbnail"
										src={image}
                                        alt="alt"
                                        width="200"
										height="200"
									/>
								)}
							</div>
							<div className="form-group row">
								<label
									htmlFor=""
									className="col-sm-2 col-form-label"
								/>
								<div className="col-sm-10">
									<button
										type="submit"
										className="btn btn-primary"
									>
										Actualizar
									</button>
									<Link to="/">
										<button
											type="submit"
											className="btn btn-danger"
										>
											Cancelar
										</button>
									</Link>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}
