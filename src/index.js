'use strict';
import { GalleryAPI } from './js/input-api';
import Notiflix from 'notiflix';
import "simplelightbox/dist/simple-lightbox.min.css"; 
import SimpleLightbox from 'simplelightbox'; 

let query = '';
let page = 1;

const fetchUsersBtn = document.querySelector(".btn");
const userList = document.querySelector(".user-list");
const searchForm = document.querySelector(".search-form");
const btnLoadMore = document.querySelector('.load-more');

const galleryInstance = new GalleryAPI();

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt', captionPosition: 'bottom', captionDelay: 250
});
const totalImages = 0;
btnLoadMore.style.display = 'none';

function onSearch(e) {
   console.log(`3-query: ${query}`);
  e.preventDefault();
  
    
  query = e.currentTarget.elements.query.value;
  galleryInstance.q = query;
  galleryInstance.page = 1;
  
  
  
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
  const url = `https://pixabay.com/api/?key=38232376-4840eb4d2a32943b9bc00372c&q=${query}&image_type=photo&per_page=40&page=${page}&orientation=horizontal`
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
    
  userList.innerHTML = createGalleryCards(users);
  lightbox.refresh();
  btnLoadMore.style.display = 'block';
    
}

// function onBtnLoadMoreClick() {
//   console.log("galleryInstance= ", galleryInstance.fetchImages());
//   page += 1;
//   fetchUsers(page);
// }
 
function onBtnLoadMoreClick() {
  galleryInstance.page += 1;
  console.log("galleryInstance= ", galleryInstance.fetchImages());
  galleryInstance.fetchImages().then(data => {
    if (data.data.total === data.data.totalHits) {
      btnLoadMore.style.display = 'none';
      onFetchInfo();
    }
    console.log("data data= ", data);
    userList.insertAdjacentHTML(
      'beforeend',
      newGreateGalleryCards(data.data.hits)
    );
    lightbox.refresh();
  });
}

function onFetchInfo() {
  Notiflix.Report.info(
    'We are sorry',
    'but you have reached the end of search results.',
    'Okay',
    {
      position: 'center-center',
      timeout: 3000,
      width: '400px',
      titleFontSize: '30px',
      messageFontSize: '30px',
    }
  );
}

function onFetchSuccess(totalImages) {
  Notiflix.Report.success(
    'O-o!',
    `'We found ${totalImages} images.'`,
    'Okay',
    {
      position: 'center-center',
      timeout: 3000,
      width: '400px',
      titleFontSize: '30px',
      messageFontSize: '30px',
    }
  );
}

function createGalleryCards(users) {
  console.log(`7-пошук - users.total: ${query}`, users.total);
  totalImages = users.total;
  onFetchSuccess(totalImages);
  const markup = users.hits
    .map((user) => {
        return `<div class="gallery_card">
          <a class="gallery_info" href="${user.largeImageURL}">
            <img class="gallery_image" src="${user.webformatURL}" alt="${user.tags}">
          </a>
              <div class="gallery_list">
                 <p class="gallery_item"><b class="gallery_item_info">likes</b>${user.likes}</p>
                 <p class="gallery_item"><b class="gallery_item_info">views</b>${user.views}</p>
                 <p class="gallery_item"><b class="gallery_item_info">comments</b>${user.comments}</p>          
                 <p class="gallery_item"><b class="gallery_item_info">downloads</b>${user.downloads}</p>
              </div>          
        </div>`;
    })
    .join("");
  return markup;
}

function newGreateGalleryCards(arr) {
  return arr
    .map(
      ({
        largeImageURL,
        webformatURL,        
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<div class="gallery_card">
  <a class="gallery_info" href="${largeImageURL}">
    <img class="gallery_image" src="${webformatURL}" alt="${tags}"/>
      </a>
  <div class="gallery_list">
      <p class="gallery_item">
        <b class="gallery_item_info">Likes</b>${likes}
      </p>
      <p class="gallery_item">
        <b class="gallery_item_info">Views</b>${views}
      </p>
      <p class="gallery_item">
        <b class="gallery_item_info">Comments</b>${comments}
      </p>
      <p class="gallery_item">
        <b class="gallery_item_info">Downloads</b>${downloads}
      </p>
    </div>
</div>`
    )
    .join('');   
}

searchForm.addEventListener("submit", onSearch);
console.log(`0-query: ${query}`);
   
btnLoadMore.addEventListener('click', onBtnLoadMoreClick);


  

