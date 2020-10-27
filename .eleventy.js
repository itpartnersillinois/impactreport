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
    return `<span style='text-transform: uppercase;'>${title.slice(0, start)}<span class='orange bold'>${title.slice(start, end)}</span>${title.slice(end)}<\span>`; 
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
      returnValue = returnValue + `<li><a href="https://education.illinois.edu/faculty/${element.username}"><img src="${element.image}" alt="${element.header}"></a><p class="header"><a href="https://education.illinois.edu/faculty/${element.username}">${element.header}</a></p><p class="subheader">${element.subheader}</p>${element.text}</li>`;
    });
    returnValue = returnValue + '</ul>';
    return returnValue;
  });

  eleventyConfig.addFilter("transformListWithImagesSimple", function (item) {
    var returnValue = '<ul class="imagelist">';
    item.forEach(element => {
      returnValue = returnValue + `<li><a href="https://education.illinois.edu/faculty/${element.username}"><img class="simple" src="${element.image}" alt="${element.header}"></a><p><a href="https://education.illinois.edu/faculty/${element.username}"><span style="font-weight: bold;">${element.header}</span></a>, ${element.text}</li>`;
    });
    returnValue = returnValue + '</ul>';
    return returnValue;
  });

  eleventyConfig.addFilter("transformGridWithImagesSimple", function (item) {
    var returnValue = '<ul class="imagegrid text">';
    item.forEach(element => {
      returnValue = returnValue + `<li><a href="https://education.illinois.edu/faculty/${element.username}"><img src="${element.image}" alt="${element.header}"></a><p><a href="https://education.illinois.edu/faculty/${element.username}"><span style="font-weight: bold;">${element.header},</span></a> ${element.text}</p></li>`;
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

  eleventyConfig.addFilter("transformCovid19Projects", function (item) {
    var returnValue = '<ul class="imagegrid text extrawide">';
    item.forEach(element => {
      returnValue = returnValue + `<li class="nopadding"><h3>${element.title}</h3><p class="pi">${element.pi}</p><p>${element.description}</p></li>`;
    });
    returnValue = returnValue + '</ul>';
    return returnValue;
  });


  eleventyConfig.addFilter("transformOutreach", function (item) {
    var returnValue = '<ul class="imagegrid text">';
    item.forEach(element => {
      returnValue = returnValue + `<li><a href="${element.link}">${element.title}</a> ${element.description}</li>`;
    });
    returnValue = returnValue + '</ul>';
    return returnValue;
  });

  eleventyConfig.addFilter("transformRoundtableTopics", function (item) {
    var returnValue = '<ul class="imagegrid text wide">';
    item.forEach(element => {
      returnValue = returnValue + `<li class="nopadding"><h3>${element.speaker}</h3><p class="pi">${element.title}</p><p>${element.description}</p></li>`;
    });
    returnValue = returnValue + '</ul>';
    return returnValue;
  });
});
