import axios from 'axios';

const baseURL = 'http://localhost:3000/article';

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

export const deleteArticle = id => {
    axios.post(`${baseURL}/delete/${id}`)
    .then(() => {
    //   window.location.reload();
    })
    .catch(err => {
        console.log('Error Deleting Article =====> ', err.response);
    });
}
