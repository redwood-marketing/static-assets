module.exports = (config) => {

	const setAttribute = (dictionary, key, value) => {
		dictionary[key] = value;
		return dictionary;
	};

	const mergeAttributes = (dictA, dictB) => {
		return {...dictA, ...dictB}
	}

	// Extend Nunjucks environment
	config.addNunjucksAsyncFilter('setAttribute', (dictionary, key, value, callback) => {
		const result = setAttribute(dictionary, key, value);
		callback(null, result);
	});

	config.addNunjucksAsyncFilter('mergeAttributes', (dictA, dictB, callback) => {
		const result = mergeAttributes(dictA, dictB);
		callback(null, result);
	});


	const passThrough = ['*.min.*', 'src/img', 'src/*.png', 'src/*.svg', 'src/*.ico', 'src/*.webmanifest'];

	passThrough.forEach((item) => {
		config.addPassthroughCopy(item);
	});

	config.addWatchTarget('src/**/*');

	return {
		markdownTemplateEngine: 'njk',
		dataTemplateEngine: 'njk',
		htmlTemplateEngine: 'njk',
		dir: {
			input: 'activebatch/src/pages',
			output: 'activebatch/dist/pages',
		},
	};
};
