module.exports = (function (eleventyConfig) {
  let options = {
    html: true,
    breaks: true,
    linkify: true
  };
  var markdownIt = require("markdown-it")(options);
  var markdownItAttrs = require('markdown-it-attrs');

  markdownIt.use(markdownItAttrs, {
    leftDelimiter: '{',
    rightDelimiter: '}',
    allowedAttributes: []
  });

  eleventyConfig.setLibrary("md", markdownIt);

  eleventyConfig.addPassthroughCopy("img");

  eleventyConfig.addFilter("transformArrows", function (title, menu) {
    if (title == '') {
      return '';
    }
    var returnValue = -1;
    var i = 0;
    menu.forEach(item => {
      if (item.title === title || item.longtitle === title) {
        returnValue = i;
      } 
      i++;
    });

    if (returnValue == -1) {
      return `<nav class="arrows" aria-label="forward and back navigation">
      <a class="next" href="/${menu[0].url}/index.html" class="next"><ilw-icon type="solid" icon="next" size="32px"></ilw-icon></a>
      </nav>`;
    } else if (returnValue == 0) {
      return `<nav class="arrows" aria-label="forward and back navigation">
      <a class="next" href="/${menu[1].url}/index.html" class="next"><ilw-icon type="solid" icon="next" size="32px"></ilw-icon></a>
      </nav>`;
    } else if (returnValue == menu.length - 1) {
      return `<nav class="arrows" aria-label="forward and back navigation">
      <a class="back" href="/${menu[menu.length - 1].url}/index.html"><ilw-icon type="solid" icon="back" size="32px"></ilw-icon></a>
      </nav>`;
    } else {
      return `<nav class="arrows" aria-label="forward and back navigation">
      <a class="back" href="/${menu[returnValue - 1].url}/index.html"><ilw-icon type="solid" icon="back" size="32px"></ilw-icon></a>
      <a class="next" href="/${menu[returnValue + 1].url}/index.html"><ilw-icon type="solid" icon="next" size="32px"></ilw-icon></a>
      </nav>`;
    }
  });
});
