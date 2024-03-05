module.exports = config => {

    const passThrough = [
        "src/css/*.min.*",
        "src/js/*.min.*",
        "src/img",
        "src/*.png",
        "src/*.svg",
        "src/*.ico",
        "src/*.webmanifest",
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
            input: "activebatch/src/pages",
            output: "activebatch/dist/pages"
        }
    }

}
