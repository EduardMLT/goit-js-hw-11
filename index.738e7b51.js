!function(){var n=document.querySelector(".btn"),t=document.querySelector(".user-list");n.addEventListener("click",(function(){fetch("https://pixabay.com/api/?key=38232376-4840eb4d2a32943b9bc00372c&q=yellow+flowers&image_type=photo").then((function(n){if(!n.ok)throw new Error(n.status);return n.json()})).then((function(n){return function(n){console.log(n.hits);var e=n.hits.map((function(n){})).join("");t.innerHTML=e}(n)})).catch((function(n){return console.log(n)}))}))}();
//# sourceMappingURL=index.738e7b51.js.map
