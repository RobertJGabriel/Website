module.exports = {
	url:
		process.env.ELEVENTY_ENV === 'development'
			? 'http://localhost:3000'
			: 'https://www.robertgabriel.ninja'
};
