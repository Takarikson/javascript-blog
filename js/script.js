'use strict';
/*eslint-disable no-empty*/

/* ProTipy:
Jeśli przed pętlą nie można dobrać się do zmiennej to prawdopodobnie trzeba będzie się odwołać na końcu poza pętlą
*. +=	| a += b	| a = a + b
*. .split(' ') rozdziela stringa na elementy oddzielone spacją(nawias)
*. .push()	dodaje element na końcu tablicy
*. .length	podaje liczbę elementów w tablicy
*. .slice()	tworzy nową tablicę z części elementów
*. params - parametry
*. opts - optiions
*. elem - elements
*/

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optAuthorSelector = '.post-author',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-';


function titleClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');
  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }
  /* [DONE] add class 'active' to the clicked link */
  clickedElement.classList.add('active');
  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('article');
  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }
  /* [DONE] get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');
  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  /* add class 'active' to the correct article */
  targetArticle.classList.add('active');
}
//doczytac nt customSelector
function generateTitleLinks(customSelector = '') {
  /* [DONE] remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  /* [DONE] for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  /*[DONE Loop]*/
  let html = '';
  for (let article of articles) {
    /*[DONE] get the article id */
    const articleId = article.getAttribute('id');
    /*[DONE] find the title element - .innerHTML wytwarza błąd. poprawny .textContent*/
    const articleTitle = article.querySelector(optTitleSelector).textContent;
    /* create HTML of the link */
    const linkHTML = `<li><a href="#${articleId}"><span>${articleTitle}</span></a></li>`;
    /* insert link into titleList */
    html = html + linkHTML;
  }
  titleList.innerHTML = html;
  const links = document.querySelectorAll('.titles a');

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}
generateTitleLinks();
/*Znalezienie skrajnych liczb wystąpień 2 klucze min,max*/
function calculateTagsParams(tags) {
  const params = { max: 0, min: 999999 };
  /*Iteracja przez cały obiekt*/
  for (let tag in tags) {
    //console.log(tag + ' is used ' + tags[tag] + ' times');
    /* z ifem: if(tags[tag] > params.max){params.max = tags[tag];}
               if(tags[tag] < params.min){params.min = tags[tag];} */
    params.max = tags[tag] > params.max ? tags[tag] : params.max;
    params.min = tags[tag] < params.min ? tags[tag] : params.min;
  }
  return params;
}

function calculateTagClass(count, params) {
  //const classNumber = Math.floor(((count - params.min) / (params.max - params.min)) * optCloudClassCount + 1);

  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
  return optCloudClassPrefix + classNumber;
}


//GENERATE TAGS [DONE]
function generateTags() {
  /* [NEW] create a new variable allTags with an empty OBJECT */
  let allTags = {};
  /* [DONE] find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
  for (let article of articles) {
    /* [DONE] find tags wrapper */
    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    /* [DONE] make html variable with empty string */
    let html = '';
    /* 1. Dla każdego artykułu znajdujemy jego tagi - [DONE] get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    /* [DONE] split tags into array */
    const articleTagsArray = articleTags.split(' ');
    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      /* 2. Dla każdego z tych tagów jest generowany kod HTML linka -
      [DONE] generate HTML of the link */
      const linkHTML = `<li><a href="#tag-${tag}">${tag}</a>, </li>`;
      /* add generated code to html variable */
      html = html + linkHTML;
      /* 3. Sprawdzamy, czy dokładnie taki link mamy już w tablicy allTags"jeśli allTags NIE MA klucza tag" -
      [NEW] check if this link is NOT already in allTags */
      if (!allTags.hasOwnProperty(tag)) {
        /* 4. Jeśli go nie mamy, dodajemy go do tej tablicy -
        [NEW] add generated code to allTags array */
        //allTags.push(linkHTML);
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
      /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;
    /* END LOOP: for every article: */
  }
  /*5. Na końcu funkcji znajdujemy listę tagów -
  [NEW] find list of tags in right column */
  const tagList = document.querySelector('.tags');
  /*6. dodajemy do niej wszystkie linki znajdujące się w tablicy allTagsLinks,łącząc je ze sobą za pomocą spacji join()	łączy elementy tablicy w tekst MUSI TO ZNAJDOWAĆ SIE POZA PĘTLĄ
  ---------------------------------*/
  /*znalezienie skrajnych liczb wystąpień*/
  const tagsParams = calculateTagsParams(allTags);
  /* [NEW] create variable for all links HTML code*/
  let allTagsHTML = '';
  /* [NEW] START LOOP: for each tag in allTags: */
  for (let tag in allTags) {
    /* [NEW] genereate code of a link and add it to allTagsHTML */
    //allTagsHTML += tag + ' (' + allTags[tag] + ')';
    //allTagsHTML += `<li><a href="#tag-${tag}">${tag} (${allTags[tag]})</a>, </li>`;
    const tagLinkHTML = `<li><a href="#tag-${tag}" class="${calculateTagClass(allTags[tag], tagsParams)}">${tag}(${allTags[tag]})</a>,</li>`;
    //const tagLinkHTML = `<li><a href="#tag-${tag}" class="${calculateTagClass(allTags[tag], tagsParams)}">${tag}</a>,</li>`;
    allTagsHTML += tagLinkHTML;
    /* [NEW] END LOOP: for each tag in allTags */
  }
  /* [NEW] add html from allTagsHTML to tagList */
  tagList.innerHTML = allTagsHTML;

}
generateTags();
//AFTER CLICK
function tagClickHandler(event) {
  /* [DONE] prevent default action for this event */
  event.preventDefault();
  /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* [DONE] make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  /* [DONE] find all tag links with class actve */
  const activeLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  /* START LOOP: [DONE] for each active tag lnk */
  for (let activeLink of activeLinks) {    /*[DONE] remove class active */
    activeLink.classList.remove('active');
    /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const hrefLink = document.querySelectorAll('href');
  /* START LOOP: for each found tag link */
  for (let link of hrefLink) {
    /* add class active */
    link.classList.add('active');
    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
  /* find all links to tags */
  const links = document.querySelectorAll('a[href^="#tag-"]');
  /* START LOOP: for each link */
  for (let link of links) {
    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
  }
}
addClickListenersToTags();

/*[DONE]*/
function generateAuthors() {
  /* [NEW] create a new variable allAuthors with an empty OBJECT */
  const allAuthors = {};
  /* [DONE] find all authors */
  const articles = document.querySelectorAll(optArticleSelector);
  /*Szukanie z listy po prawej stronie (html)*/
  const articleListWrapper = document.querySelectorAll('.list.authors');
  /* START LOOP: for every authors: */
  for (let article of articles) {
    /* find author wrapper */
    const authorsWrapper = article.querySelector(optAuthorSelector);
    /* [DONE] make html variable with empty string */
    let html = '';
    /* get tags from data-author attribute*/
    const articleAuthor = article.getAttribute('data-author');
    /* insert HTML of all the links into the tags wrapper */
    const linkHTML = `<a href = "#author-${articleAuthor}"> ${articleAuthor}</a>`;
    if (!allAuthors[articleAuthor]) {
      /*[NEW] add generated code to allTags array */
      allAuthors[articleAuthor] = 1;
    } else {
      allAuthors[articleAuthor]++;
    }
    /* END LOOP: for every authors: */
    authorsWrapper.innerHTML = linkHTML;
  }
}
generateAuthors();

function addClickListenersToAuthors() {
  /* find all links to tags */
  const links = document.querySelectorAll('a[href^="#author-"]');
  /* START LOOP: for each link */
  for (let link of links) {
    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', authorClickHandler);
    /* END LOOP: for each link */
  }
}
addClickListenersToAuthors();

function authorClickHandler(event) {
  /* [DONE] prevent default action for this event */
  event.preventDefault();
  /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* [DONE] make a new constant "tag" and extract tag from the "href" constant */
  const tagAuthor = href.replace('#author-', '');
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + tagAuthor + '"]');
}
