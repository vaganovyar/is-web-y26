"use strict";

// create watcher of loader
let loader_watcher = scrollMonitor.create(document.getElementById("shop_loader"));

let batch_size = 0;
const min_photo_id = 1;
const max_photo_id = 1000;

window.addEventListener("load", handleLoading);

// load new articles when user see loader
loader_watcher.enterViewport(handleLoading);

async function handleLoading() {
    if (window.innerWidth > 1000)
        batch_size = 5;
    else if (window.innerWidth > 600)
        batch_size = 3;
    else
        batch_size = 1;
    try {
        let photo_response = null;
        await fetch(`https://jsonplaceholder.typicode.com/photos/`)
            .then(response => response.json())
            .then(json => photo_response = json);
        let comment_response = null;
        await fetch(`https://jsonplaceholder.typicode.com/comments/`)
            .then(response => response.json())
            .then(json => comment_response = json);

        while (loader_watcher.isInViewport) {
            let photo_id = Math.round(Math.random() * (max_photo_id - min_photo_id) + min_photo_id);
            let cur_photo_response = photo_response[photo_id - 1];
            let cur_comment_response = comment_response[Math.floor((photo_id - 1) / 10)];
            let data = {};
            data.header = cur_photo_response.title.split(" ").slice(0, 3).join(" ");
            data.image = cur_photo_response.url;
            data.price = photo_id;
            data.text = cur_comment_response.body;

            loadArticle(data);
            // Update monitors because page changed
            scrollMonitor.update();
        }
        for (let i = 0; i < batch_size - 1; i++) {
            let photo_id = Math.round(Math.random() * (max_photo_id - min_photo_id) + min_photo_id);
            let cur_photo_response = photo_response[photo_id - 1];
            let cur_comment_response = comment_response[Math.floor((photo_id - 1) / 10)];
            let data = {};
            data.header = cur_photo_response.title.split(" ").slice(0, 3).join(" ");
            data.image = cur_photo_response.url;
            data.price = photo_id;
            data.text = cur_comment_response.body;
            loadArticle(data);
        }
    } catch (err) {
        let icon = document.getElementById("shop_loader");
        icon.className = "loader_error";
        icon.innerHTML = "X";

        // Destory watcher of loader because it changed to error
        loader_watcher.destroy();
    }
}

function loadArticle(data) {
    let new_article = document.createElement("a");
    new_article.setAttribute("href", "#");
    new_article.className = "article";

    let article_header = document.createElement("h3");
    article_header.className = "article__header";
    article_header.innerHTML = data.header;
    let article_image = document.createElement("img");
    article_image.className = "article__image";
    article_image.setAttribute("alt", "image");
    article_image.setAttribute("src", data.image);
    let article_price = document.createElement("p");
    article_price.className = "article__price";
    article_price.innerHTML = `${data.price} ₽`;
    let article_text = document.createElement("p");
    article_text.className = "article__text";
    article_text.innerHTML = data.text;

    new_article.appendChild(article_header);
    new_article.appendChild(article_image);
    new_article.appendChild(article_price);
    new_article.appendChild(article_text);

    let loader = document.getElementById("shop_loader");
    loader.parentNode.insertBefore(new_article, loader);

    return new_article;
}
