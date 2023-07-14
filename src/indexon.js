const searchForm = document.querySelector('.js-search-form');

const res = searchForm.addEventListener('submit', onSearch);

function onSearch(e) {
  e.preventDefault();
  query = e.currentTarget.elements.query.value;
  console.log("1 ",query);
  if (query === '') {
    return alert('Введите что-то нормальное');
    };
    console.log("2 ",query);
    return query
    console.log("3 ",query);
}

