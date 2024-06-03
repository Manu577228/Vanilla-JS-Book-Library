document.getElementById('search-button').addEventListener('click', function () {
    const query = document.getElementById('search-input').value;
    searchBooks(query);
});

document.getElementById('search-input').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        const query = document.getElementById('search-input').value;
        searchBooks(query);
    }
});

function searchBooks(query) {
    fetch(`https://openlibrary.org/search.json?q=${query}`)
        .then(response => response.json())
        .then(data => {
            displayBooks(data.docs);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function displayBooks(books) {
    const container = document.getElementById('books-container');
    container.innerHTML = '';
    books.slice(0, 16).forEach(book => {
        const bookElement = document.createElement('div');
        bookElement.className = 'book';
        const coverId = book.cover_i ? book.cover_i : null;
        const coverUrl = coverId
            ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
            : 'https://media.istockphoto.com/id/1055079680/vector/black-linear-photo-camera-like-no-image-available.jpg?s=612x612&w=0&k=20&c=P1DebpeMIAtXj_ZbVsKVvg-duuL0v9DlrOZUvPG6UJk=';

        bookElement.innerHTML = `
            <img src="${coverUrl}" alt="${book.title}">
            <h3>${book.title}</h3>
            <p>by ${book.author_name ? book.author_name.join(', ') : 'Unknown Author'}</p>
        `;
        container.appendChild(bookElement);
    });
}
