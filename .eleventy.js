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

  eleventyConfig.addFilter("transformTitle", function (title, start, end) {
    if (start == null || start == undefined) {
      return title;
    }
    return `<span>${title.slice(0, start)}<span class='orange bold'>${title.slice(start, end)}</span>${title.slice(end)}<\span>`; 
  });

  eleventyConfig.addFilter("transformStat", function (stat) {
    first = stat.slice(0, stat.indexOf(' ')).replace('number', '#');
    last = stat.slice(stat.indexOf(' '));

    if (!stat.length)
      return stat;

    return `<span>${first}</span>${last}`;
  });

  eleventyConfig.addFilter("transformListWithImages", function (item) {
    var returnValue = '<ul class="imagelist">';
    item.forEach(element => {
      returnValue = returnValue + `<li><a href="https://education.illinois.edu/faculty/${element.username}"><img class="round" src="${element.image}" alt="${element.header}"></a><p class="header"><a href="https://education.illinois.edu/faculty/${element.username}">${element.header}</a></p><p class="subheader">${element.subheader}</p>${element.text}<div>"${element.quote}"</div></li>`;
    });
    returnValue = returnValue + '</ul>';
    return returnValue;
  });

  eleventyConfig.addFilter("transformGridBooks", function (item) {
    var returnValue = '<ul class="imagegrid">';
    item.forEach(element => {
      returnValue = returnValue + `<li><img src="${element.image}" alt="Book by ${element.author}"><p><strong>${element.author}</strong> ${element.byline}</p></li>`;
    });
    returnValue = returnValue + '</ul>';
    return returnValue;
  });

  eleventyConfig.addFilter("transformGridWithImagesSimple", function (item) {
    var returnValue = '<ul class="imagegrid text">';
    item.forEach(element => {
      if (element.username == '') {
        returnValue = returnValue + `<li><img src="${element.image}" alt="${element.header}"><p>${element.text}</p></li>`;
      } else {
        returnValue = returnValue + `<li><a href="https://education.illinois.edu/faculty/${element.username}"><img src="${element.image}" alt="${element.header}"></a><p><a href="https://education.illinois.edu/faculty/${element.username}"><span style="font-weight: bold;">${element.header},</span></a> ${element.text}</p></li>`;
      }
    });
    returnValue = returnValue + '</ul>';
    return returnValue;
  });

  eleventyConfig.addFilter("transformGridWithImages", function (item) {
    var returnValue = '<ul class="imagegrid">';
    item.forEach(element => {
      returnValue = returnValue + `<li><a href="https://education.illinois.edu/faculty/${element.url}"><img src="${element.image}" alt="${element.header}"></a><p><a href="https://education.illinois.edu/faculty/${element.url}">${element.header},</a> ${element.subheader}</p></li>`;
    });
    returnValue = returnValue + '</ul>';
    return returnValue;
  });

  eleventyConfig.addFilter("transformGridWithImagesWide", function (item) {
    var returnValue = '<ul class="imagegrid wide">';
    item.forEach(element => {
      returnValue = returnValue + `<li><a href="https://education.illinois.edu/faculty/${element.url}"><img src="${element.image}" alt="${element.header}"></a><p><a href="https://education.illinois.edu/faculty/${element.url}">${element.header},</a> ${element.subheader}</p></li>`;
    });
    returnValue = returnValue + '</ul>';
    return returnValue;
  });
  
  eleventyConfig.addFilter("transformGridEmit", function (item) {
    var returnValue = '<ul class="imagegrid emit">';
    item.forEach(element => {
      returnValue = returnValue + `<li><img src="${element.image}" alt="${element.header}"></a><p><span>${element.header}</span> ${element.subheader}</p></li>`;
    });
    returnValue = returnValue + '</ul>';
    return returnValue;
  });

  eleventyConfig.addFilter("transformOutreach", function (item) {
    var returnValue = '<ul class="imagegrid text outreach">';
    item.forEach(element => {
      returnValue = returnValue + `<li><a href="${element.link}">${element.title}</a> ${element.description}</li>`;
    });
    returnValue = returnValue + '</ul>';
    return returnValue;
  });

  
  eleventyConfig.addFilter("transformMenu", function (url, menu) {
    if (url == '') {
      return '';
    }
    var returnValue = 0;
    var leadership = '';
    var facts = "";
    var research = "";
    var stories = "";
    var programs = "";
    var donors = "";
    var i = 0;
    menu.forEach(item => {
      if (item.url === url) {
        returnValue = i;
      } 
      if (item.menu == "Our Leadership") {
        if (leadership == '') {
          leadership = '<il-nav-section><a href="/' + item.url + '/index.html" slot="label">' + item.menu + '</a><ul class="il-subnav">';
        }
        leadership = leadership + `<li><a href="/${item.url}/index.html">${item.title}</a></li>`;
      }
      if (item.menu == "College Facts") {
        if (facts == '') {
          facts = '<il-nav-section><a href="/' + item.url + '/index.html" slot="label">' + item.menu + '</a><ul class="il-subnav">';
        }
        facts = facts + `<li><a href="/${item.url}/index.html">${item.title}</a></li>`;
      }
      if (item.menu == "Our Stories") {
        if (stories == '') {
          stories = '<il-nav-section><a href="/' + item.url + '/index.html" slot="label">' + item.menu + '</a><ul class="il-subnav">';
        }
        stories = stories + `<li><a href="/${item.url}/index.html">${item.title}</a></li>`;
      }
      if (item.menu == "Our Research") {
        if (research == '') {
          research = '<il-nav-section><a href="/' + item.url + '/index.html" slot="label">' + item.menu + '</a><ul class="il-subnav">';
        }
        research = research + `<li><a href="/${item.url}/index.html">${item.title}</a></li>`;
      }
      if (item.menu == "Our Programs") {
        if (programs == '') {
          programs = '<il-nav-section><a href="/' + item.url + '/index.html" slot="label">' + item.menu + '</a><ul class="il-subnav">';
        }
        programs = programs + `<li><a href="/${item.url}/index.html">${item.title}</a></li>`;
      }
      if (item.menu == "Alumni and Donors") {
        if (donors == '') {
          donors = '<il-nav-section><a href="/' + item.url + '/index.html" slot="label">' + item.menu + '</a><ul class="il-subnav">';
        }
        donors = donors + `<li><a href="/${item.url}/index.html">${item.title}</a></li>`;
      }
      i++;
    });
    leadership = leadership + '</ul></il-nav-section>';
    facts = facts + '</ul></il-nav-section>';
    stories = stories + '</ul></il-nav-section>';
    research = research + '</ul></il-nav-section>';
    programs = programs + '</ul></il-nav-section>';
    donors = donors + '</ul></il-nav-section>';
    return `${leadership}${facts}${stories}${research}${programs}${donors}
    <il-nav-section><a href="/archive2021/index.html" slot="label">Previous Years</a><ul class="il-subnav">
    <li><a href="/archive2022/index.html">2022 Impact Report</a></li><li><a href="/archive2021/index.html">2021 Impact Report</a></li><li><a href="/archive2020/index.html">2020 Impact Report</a></li>
    </ul></il-nav-section>`;
  });

  eleventyConfig.addFilter("transformArrows", function (url, menu) {
    if (url == '') {
      return '';
    }
    var returnValue = -1;
    var i = 0;
    menu.forEach(item => {
      if (item.url === url) {
        returnValue = i;
      } 
      i++;
    });

    if (returnValue == -1) {
      return `<nav class="arrows" aria-label="forward navigation for title">
      <a href="/${menu[0].url}/index.html" class="next" aria-label="next page"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" role="presentation">
      <path d="M8 24l2.83 2.83L22 15.66V40h4V15.66l11.17 11.17L40 24 24 8 8 24z"></path>
    </svg></a>
      </nav>`;
    } else if (returnValue == 0) {
      return `<nav class="arrows" aria-label="forward navigation">
      <a href="/${menu[1].url}/index.html" class="next" aria-label="next page"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" role="presentation">
      <path d="M8 24l2.83 2.83L22 15.66V40h4V15.66l11.17 11.17L40 24 24 8 8 24z"></path>
    </svg></a>
      </nav>`;
    } else if (returnValue == menu.length - 1) {
      return `<nav class="arrows" aria-label="back navigation">
      <a href="/${menu[menu.length - 2].url}/index.html" class="back" aria-label="back one page"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" role="presentation">
      <path d="M8 24l2.83 2.83L22 15.66V40h4V15.66l11.17 11.17L40 24 24 8 8 24z"></path>
    </svg></a>
      </nav>`;
    } else {
      return `<nav class="arrows" aria-label="forward and back navigation">
      <a href="/${menu[returnValue - 1].url}/index.html" class="back" aria-label="back one page"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" role="presentation">
      <path d="M8 24l2.83 2.83L22 15.66V40h4V15.66l11.17 11.17L40 24 24 8 8 24z"></path>
    </svg></a>
      <a href="/${menu[returnValue + 1].url}/index.html" class="next" aria-label="next page"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" role="presentation">
      <path d="M8 24l2.83 2.83L22 15.66V40h4V15.66l11.17 11.17L40 24 24 8 8 24z"></path>
    </svg></a>
      </nav>`;
    }
  });
});
