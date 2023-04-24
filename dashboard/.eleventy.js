module.exports = config => {

    const passThrough = [
        "src/assets/**/*"
    ]

    passThrough.forEach( item => {
        config.addPassthroughCopy(item);
    });

    config.addWatchTarget("src/**/*");

    return {
        markdownTemplateEngine: 'njk',
        dataTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk',
        dir: {
            input: "src",
            output: "public"
        }
    }

}