// Cargar los 3 últimos artículos del blog en la home

async function loadHomeBlogPosts() {
    try {
        const response = await fetch('resources/json/blog-articles.json');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const blogArticles = await response.json();
        
        blogArticles.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateB - dateA;
        });
        
        // Obtener los 3 primeros artículos
        const latestArticles = blogArticles.slice(0, 3);
        
        createHomeBlogCards(latestArticles);
        
    } catch (error) {
    }
}

function createHomeBlogCards(articles) {
    const blogGrid = document.querySelector('.home-blog-grid');
    
    if (!blogGrid) {
        console.error('❌ No se encontró el contenedor .home-blog-grid');
        return;
    }
    
    blogGrid.innerHTML = '';
        articles.forEach((article, index) => {
        const blogCard = document.createElement('article');
        blogCard.className = 'home-blog-card';
        
        const shortDate = formatDate(article.date);
        
        blogCard.innerHTML = `
            <div class="blog-card-image">
                <img src="${article.image}" alt="${article.imageAlt}">
            </div>
            <div class="blog-card-content">
                <span class="blog-date">${shortDate}</span>
                <h3>${article.title}</h3>
                <p>${article.summary}</p>
                <a href="article.html?id=${article.id}" class="blog-link">Read More ➜</a>
            </div>
        `;
        
        blogGrid.appendChild(blogCard);
    });
    
}

function formatDate(dateString) {
    const months = {
        'January': 'Jan',
        'February': 'Feb',
        'March': 'Mar',
        'April': 'Apr',
        'May': 'May',
        'June': 'Jun',
        'July': 'Jul',
        'August': 'Aug',
        'September': 'Sep',
        'October': 'Oct',
        'November': 'Nov',
        'December': 'Dec'
    };
    
    for (let [full, short] of Object.entries(months)) {
        if (dateString.includes(full)) {
            return dateString.replace(full, short);
        }
    }
    
    return dateString;
}

document.addEventListener('DOMContentLoaded', loadHomeBlogPosts);