let allBooks = [];

// Fetch data from JSON file
fetch('books.json')
    .then(response => response.json())
    .then(data => {
        allBooks = data;
        displayBooks(allBooks);
    })
    .catch(error => console.error('Error loading books:', error));

// Function to display books
function displayBooks(books) {
    const bookList = document.getElementById('bookList');
    bookList.innerHTML = '';

    if (books.length === 0) {
        bookList.innerHTML = '<p style="text-align:center; grid-column: 1/-1;">No books found!</p>';
        return;
    }

    books.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card';
        
        // Card content
        bookCard.innerHTML = `
            <div>
                <h3>${book.title}</h3>
                <p><strong>Author:</strong> ${book.author}</p>
                <span class="category-tag">${book.category}</span>
            </div>
            <a href="${book.pdfUrl}" target="_blank" class="read-btn">Visit Website 🔗</a>
        `;

        bookList.appendChild(bookCard);
    });
}

// Real-time Search Filter
document.getElementById('searchInput').addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase().trim();
    const filteredBooks = allBooks.filter(book => 
        book.title.toLowerCase().includes(searchTerm) || 
        book.author.toLowerCase().includes(searchTerm) ||
        book.category.toLowerCase().includes(searchTerm)
    );
    displayBooks(filteredBooks);
});
