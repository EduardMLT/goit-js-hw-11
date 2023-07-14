// fetch('https://pixabay.com/api/?key=38232376-4840eb4d2a32943b9bc00372c&q=yellow+flowers&image_type=photo',)
//     .then(r => r.json())
//     .then(console.log);


import "simplelightbox/dist/simple-lightbox.min.css"; 
import SimpleLightbox from 'simplelightbox'; 

let query = 'hello';

const fetchUsersBtn = document.querySelector(".btn");
const userList = document.querySelector(".user-list");

fetchUsersBtn.addEventListener('click', () => {
  console.log(`1-query: ${query}`);
  if (query != '') {
     fetchUsers()
    .then((users) => renderUserList(users))
    .catch((error) => console.log(error));
  }
  
});
// --------------------------------

function inputSearch() {
   console.log(`2-query: ${query}`);
   const searchForm = document.querySelector(".search-form");
   searchForm.addEventListener("submit", onSearch);
}

inputSearch();

function onSearch(e) {
   console.log(`3-query: ${query}`);
   e.preventDefault();
    
   query = e.currentTarget.elements.query.value;
  
  if (query === '') {
    return alert('Введите что-то нормальное');
    };
    
    console.log(`4-пошук: ${query}`);
  e.currentTarget.reset();
  
    return ;
  
}

// --------------------------------
// https://jsonplaceholder.typicode.com/users
function fetchUsers() {   
    console.log(`5-пошук: ${query}`);    
    const url = `https://pixabay.com/api/?key=38232376-4840eb4d2a32943b9bc00372c&q=${query}&image_type=photo&per_page=8`
  
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
    console.log("7-пошук",users.hits);
    // e.preventDefault();
  const markup = users.hits
    .map((user) => {
        return `<div class="gallery_card">
          <a class="gallery_info" href="${user.largeImageURL}">
            <img class="gallery_image" src="${user.webformatURL}" alt="">
              <div class="gallery_list">
                 <p class="gallery_item"><b>likes</b>: ${user.likes}</p>
                 <p class="gallery_item"><b>views</b>: ${user.views}</p>
                 <p class="gallery_item"><b>comments</b>: ${user.comments}</p>          
                 <p class="gallery_item"><b>downloads</b>: ${user.downloads}</p>
              </div>
          </a>
        </div>`;
    })
    .join("");
    userList.innerHTML = markup;
    const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt', captionPosition: 'bottom', captionDelay: 250
});
}

