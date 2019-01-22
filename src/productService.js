import axios from 'axios';

//const baseURL = 'http://localhost:3000/article';
const baseURL =
  window.location.hostname === "localhost"
    ? "http://localhost:3000/article"
    : "https://liverpooltest-1.herokuapp.com";

// Create
export const saveArticle = (article, history) => {
	const formData = new FormData();
	Object.keys(article).forEach(key => {
		formData.append(key, article[key]);
	});
	axios
		.post(`${baseURL}/`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
		.then(() => {
			history.push('/');
		})
		.catch(err => {
			console.log('Error Storing Article =====> ', err.response);
		});
};

// Delete
export const deleteArticle = id => {
	axios
		.post(`${baseURL}/delete/${id}`)
		.then(() => {
			//   window.location.reload();
		})
		.catch(err => {
			console.log('Error Deleting Article =====> ', err.response);
		});
};

// Update
export const editArticle = (article, id, history) => {
	const formData = new FormData();
	Object.keys(article).forEach(key => {
		formData.append(key, article[key]);
	});
	axios
		.post(`${baseURL}/edit/${id}`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
		.then(() => {
			//   window.location.reload();
			history.push('/');
		})
		.catch(err => {
			console.log('Error Deleting Article =====> ', err.response);
		});
};
