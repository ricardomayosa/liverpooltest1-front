import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { saveArticle } from '../productService';

export default class Form extends Component {
	constructor() {
		super();
		this.state = {
			file: null,
			image: null,
			article: {
				name: '',
				price: '',
				photo: null,
			},
		};
	}

	imageHandler = e => {
		this.setState({
			image: e.target.files[0],
		});
		this.setState({
			file: URL.createObjectURL(e.target.files[0]),
		});
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
		article.photo = image;
		saveArticle(this.state.article, this.props.history);
	};
	render() {
        const { file } = this.state;
		return (
			<div className="container">
				<div className="card text-center">
					<div className="card-body">
						<h5 className="card-title">Add a new product here</h5>
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
										className="img-thumbnail"
										src={this.state.file}
										alt="alt"
									/>
								) : (
									<div />
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
										Guardar
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
