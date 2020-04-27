"use strict";

function titleClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;

  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll(".titles a.active");

  for (let activeLink of activeLinks) {
    activeLink.classList.remove("active");
  }
  /* [DONE] add class 'active' to the clicked link */
  clickedElement.classList.add("active");
  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll("article");

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove("active");
  }
  /* [DONE] get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute("href");
  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  /* add class 'active' to the correct article */
  targetArticle.classList.add("active");
}

const links = document.querySelectorAll(".titles a");

for (let link of links) {
  link.addEventListener("click", titleClickHandler);
}

const optArticleSelector = ".post",
  optTitleSelector = ".post-title",
  optTitleListSelector = ".titles";

function generateTitleLinks() {
  /* [DONE] remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  function clearMessages() {
    titleList.innerHTML = "";
    console.log("czyszczenie wiadomości", clearMessages);
  }
  clearMessages();
  /* [DONE] for each article */

  const articles = document.querySelectorAll(optArticleSelector);
  /*[LOOP!?]*/
  for (let article of articles) {
  }
  console.log("wywołanie stałej articles ", articles);
  /*[TO FIX] get the article id */
  const articleSelector = clickedElement.getAttribute("href");
  /* find the title element */

  const articleTitle = (article.querySelector(optTitleSelector).innerHTML = "");
  /* get the title from the title element */
  /* create HTML of the link */
  /* insert link into titleList */
}
generateTitleLinks();
