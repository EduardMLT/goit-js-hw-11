// fetch('https://pixabay.com/api/?key=38232376-4840eb4d2a32943b9bc00372c&q=yellow+flowers&image_type=photo',)
//     .then(r => r.json())
//     .then(console.log);

    

const fetchUsersBtn = document.querySelector(".btn");
const userList = document.querySelector(".user-list");

fetchUsersBtn.addEventListener("click", () => {
  fetchUsers()
    .then((users) => renderUserList(users))
    .catch((error) => console.log(error));
});

// https://jsonplaceholder.typicode.com/users
function fetchUsers() {
  return fetch("https://pixabay.com/api/?key=38232376-4840eb4d2a32943b9bc00372c&q=yellow+flowers&image_type=photo").then(
    (response) => {
      if (!response.ok) {
        throw new Error(response.status);
          }
      
      return response.json();
    }
  );
}

function renderUserList(users) {
  console.log(users.hits);  
  const markup = users.hits
    .map((user) => {
        return `<li class="info">
          <img class="gallery_image" src="${user.webformatURL}" alt="">
            <div class="gallery_list">
               <p class="info-item"><b>likes</b>: ${user.likes}</p>
               <p class="info-item"><b>views</b>: ${user.views}</p>
               <p class="info-item"><b>comments</b>: ${user.comments}</p>          
               <p class="info-item"><b>downloads</b>: ${user.downloads}</p>
            </div>
        </li>`;
    })
    .join("");
  userList.innerHTML = markup;
}