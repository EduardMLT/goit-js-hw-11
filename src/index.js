import "simplelightbox/dist/simple-lightbox.min.css"; 
import SimpleLightbox from 'simplelightbox'; 

let query = '';

const fetchUsersBtn = document.querySelector(".btn");
const userList = document.querySelector(".user-list");
const searchForm = document.querySelector(".search-form");
const btnLoadMore = document.querySelector('.load-more');

btnLoadMore.style.display = 'none';

function onSearch(e) {
   console.log(`3-query: ${query}`);
   e.preventDefault();
    
   query = e.currentTarget.elements.query.value;
  
  if (query === '') {
    return alert('Enter the word to search ...');
    };    
    console.log(`4-пошук: ${query}`);
  // e.currentTarget.reset();
  
   fetchUsers()
    .then((users) => renderUserList(users))
    .catch((error) => console.log(error));

    return ;  
}

function fetchUsers() {   
    console.log(`5-пошук: ${query}`);    
  const url = `https://pixabay.com/api/?key=38232376-4840eb4d2a32943b9bc00372c&q=${query}&image_type=photo&per_page=8`
  console.log(`5-URL: ${url}`);
  
  return fetch(url).then(
    (response) => {
      console.log(`6-пошук: ${query}`); 
      if (!response.ok) {
        throw new Error(response.status);
          }
      
      return response.json();
    }
  );
}

function renderUserList(users) {   
    console.log(`7-пошук: ${query}`,users.hits);
    // e.preventDefault();
  const markup = users.hits
    .map((user) => {
        return `<div class="gallery_card">
          <a class="gallery_info" href="${user.largeImageURL}">
            <img class="gallery_image" src="${user.webformatURL}" alt="">
              <div class="gallery_list">
                 <p class="gallery_item"><b class="gallery_item_info">likes</b>${user.likes}</p>
                 <p class="gallery_item"><b class="gallery_item_info">views</b>${user.views}</p>
                 <p class="gallery_item"><b class="gallery_item_info">comments</b>${user.comments}</p>          
                 <p class="gallery_item"><b class="gallery_item_info">downloads</b>${user.downloads}</p>
              </div>
          </a>
        </div>`;
    })
    .join("");
  userList.innerHTML = markup;
  
  btnLoadMore.style.display = 'block';

    const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt', captionPosition: 'bottom', captionDelay: 250
});
}

searchForm.addEventListener("submit", onSearch);
console.log(`0-query: ${query}`);
   
// fetchUsersBtn.addEventListener('click', () => {
//   console.log(`1-query: ${query}`);
//   if (query != '') {
//      fetchUsers()
//     .then((users) => renderUserList(users))
//     .catch((error) => console.log(error));
//   }
// });
  

