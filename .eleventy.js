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
  eleventyConfig.addPassthroughCopy("script");

  eleventyConfig.addFilter("createMenu", function (title, menu) {
    if (title == '') {
      return '';
    }
    let returnValue = '';
    let counter = 0;
    let currentMenu = '';
    menu.forEach(item => {
      if (currentMenu != item.menu) {
        if (currentMenu != '') {
           returnValue += `</ul></li>`;
        }
        currentMenu = item.menu;
        returnValue += `<li>
          <button type="button" aria-expanded="true" aria-controls="menu${counter}"><span class="text">${currentMenu}</span>
          <span class="icon">
            <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40.4 23.82">
               <path d="m39.34,1.06c-1.41-1.41-3.7-1.41-5.12,0l-14.02,14.02L6.18,1.06C4.76-.35,2.47-.35,1.06,1.06s-1.41,3.7,0,5.12l16.58,16.58c1.41,1.41,3.7,1.41,5.12,0L39.34,6.18c1.41-1.41,1.41-3.7,0-5.12Z"></path>
            </svg>
          </span>
          </button>
          <ul id="menu${counter}" class="submenu">`;
        counter++;
      }
      let ariaCurrent = item.title === title || item.longtitle === title ? ' aria-current="page"' : '';
      returnValue += `<li><a href="/${item.url}/index.html"${ariaCurrent}>${item.title}</a></li>`;
    });
    returnValue += `</ul></li>`;
    return returnValue;
  });

  eleventyConfig.addFilter("transformArrows", function (title, menu) {
    if (title == '') {
      return '';
    }
    let returnValue = -1;
    let i = 0;
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
      <a class="back" href="/${menu[menu.length - 2].url}/index.html"><ilw-icon type="solid" icon="back" size="32px"></ilw-icon></a>
      </nav>`;
    } else {
      return `<nav class="arrows" aria-label="forward and back navigation">
      <a class="back" href="/${menu[returnValue - 1].url}/index.html"><ilw-icon type="solid" icon="back" size="32px"></ilw-icon></a>
      <a class="next" href="/${menu[returnValue + 1].url}/index.html"><ilw-icon type="solid" icon="next" size="32px"></ilw-icon></a>
      </nav>`;
    }
  });
});
