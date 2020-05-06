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
  optArticleTagsSelector = '.post-tags .list';


function generateTitleLinks() {
  /* [DONE] remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);

  /* [DONE] for each article */
  const articles = document.querySelectorAll(optArticleSelector);
  /*[DONE Loop]*/
  let html = '';
  for (let article of articles) {
    /*[DONE] get the article id */
    const articleId = article.getAttribute('id');
    /*[DONE] find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    /* [TO DO!]get the title from the title element */

    /* create HTML of the link */
    //const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + "</span></a></li>";
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
function generateTags() {
  /* [DONE] find all articles */
  const articles = document.querySelectorAll(optArticleTagsSelector);
  console.log(articles);
  /* START LOOP: for every article: */
  for (let article of articles) {
    /* [DONE] find tags wrapper */
    const titleList = article.querySelectorAll(optArticleTagsSelector);
    console.log(titleList);
    /* [DONE] make html variable with empty string */
    let html = '';
    console.log(html);
    /* [DONE] get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    console.log(articleTags);
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    console.log(articleTagsArray);
    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      /* generate HTML of the link */

      /* add generated code to html variable */

      /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */

    /* END LOOP: for every article: */
  }
}

generateTags();

