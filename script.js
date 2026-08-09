let allBooks = [];

// JSON File-லிருந்து தரவுகளை எடுத்தல்
fetch('books.json')
    .then(response => response.json())
    .then(data => {
        allBooks = data;
        displayBooks(allBooks);
    })
    .catch(error => console.error('Error loading books:', error));

// புத்தகங்களைக் காண்பிக்கும் Function
function displayBooks(books) {
    const bookList = document.getElementById('bookList');
    bookList.innerHTML = '';

    if (books.length === 0) {
        bookList.innerHTML = '<p style="text-align:center; grid-column: 1/-1;">புத்தகங்கள் எதுவும் கிடைக்கவில்லை!</p>';
        return;
    }

    books.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card';
        bookCard.innerHTML = `
            <div>
                <h3>${book.title}</h3>
                <p><strong>ஆசிரியர்:</strong> ${book.author}</p>
                <span class="category-tag">${book.category}</span>
            </div>
            <a href="${book.pdfUrl}" target="_blank" class="read-btn">PDF வாசிக்க 📖</a>
        `;
        bookList.appendChild(bookCard);
    });
}

// Search Filter செயல்பாடு
document.getElementById('searchInput').addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredBooks = allBooks.filter(book => 
        book.title.toLowerCase().includes(searchTerm) || 
        book.author.toLowerCase().includes(searchTerm) ||
        book.category.toLowerCase().includes(searchTerm)
    );
    displayBooks(filteredBooks);
});
