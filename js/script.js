'use strict';

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

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optAuthorSelector = '.post-author';

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
    /*[DONE] find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    /* [TO DO!]get the title from the title element */
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

//GENERATE TAGS [DONE!]
function generateTags() {
  /* [DONE] find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
  for (let article of articles) {
    /* [DONE] find tags wrapper */
    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    /* [DONE] make html variable with empty string */
    let html = '';
    /* [DONE] get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    /* [DONE] split tags into array */
    const articleTagsArray = articleTags.split(' ');
    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      /* generate HTML of the link */
      const linkHTML = `<li><a href="#tag-${tag}">${tag}</a>, </li>`;
      /* add generated code to html variable */
      html = html + linkHTML;
      /* insert link into titleList */
      //console.log(tagsWrapper);
      /* END LOOP: for each tag */
    }
    tagsWrapper.innerHTML = html;
    /* insert HTML of all the links into the tags wrapper */
    article.querySelectorAll('.post-tags');
    /* END LOOP: for every article: */
  }
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
  //console.log(tag);
  /* [DONE] find all tag links with class active */
  const activeLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  /* START LOOP: [DONE] for each active tag link */
  for (let activeLink of activeLinks) {
    /*[DONE] remove class active */
    activeLink.classList.remove('active');
    /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const hrefLink = document.querySelectorAll('href');
  /* START LOOP: for each found tag link */
  for (link of hrefLink) {
    /* add class active */
    link.classList.add('active');
    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}
//43, 78 funkcja ponoc skonczona, lecimy dalej z autorami
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

//GENERATE AUTHORS napisac funkcje na wzór generateTags
function generateAuthors() {
  /* [DONE] find all authors */
  const authors = document.querySelectorAll(optAuthorSelector);
  /* START LOOP: for every authors: */
  for (let author of authors) {
    /* find author wrapper */
    const authorWrapper = author.querySelector(optAuthorSelector);
    /* get tags from data-author attribute*/
    const articleAuthors = author.getAttribute('data-author');
    /* insert HTML of all the links into the tags wrapper */
    article.querySelectorAll('.post-author');
    /* END LOOP: for every authors: */
  }
  articleAuthors.innerHTML = html;

}

generateAuthors();
