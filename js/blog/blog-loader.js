async function loadBlogArticles() {
    try {
        const response = await fetch('resources/json/blog-articles.json');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const blogArticles = await response.json();
        
        const articlesGrid = document.querySelector('.articles-grid');
        const singleArticle = document.querySelector('.single-article');
        
        if (articlesGrid) {
            createBlogCards(blogArticles);
        } else if (singleArticle) {
            loadArticleContent(blogArticles);
        }
        
    } catch (error) {
        console.error('Error al cargar los artículos del blog:', error);
        const articlesGrid = document.querySelector('.articles-grid');
        if (articlesGrid) {
            articlesGrid.innerHTML = '<p style="text-align: center; color: #666;">Error al cargar los artículos. Por favor, intenta más tarde.</p>';
        }
    }
}

function createBlogCards(blogArticles) {
    const articlesGrid = document.querySelector('.articles-grid');
    
    if (!articlesGrid) {
        console.error('No se encontró el contenedor .articles-grid');
        return;
    }
    
    blogArticles.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB - dateA;
    });
    
    articlesGrid.innerHTML = '';
    
    blogArticles.forEach(article => {
        const articleCard = document.createElement('article');
        articleCard.className = 'article-card';
        
        articleCard.innerHTML = `
            <img src="${article.image}" alt="${article.imageAlt}">
            <div class="card-content">
                <h2>${article.title}</h2>
                <p class="article-date">Published: ${article.date}</p>
                <p class="article-summary">${article.summary}</p>
                <a href="article.html?id=${article.id}" class="read-more-button">Read More</a>
            </div>
        `;
        
        articlesGrid.appendChild(articleCard);
    });
}

function loadArticleContent(blogArticles) {
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id');
    
    if (!articleId) {
        console.error('No se especificó un ID de artículo en la URL');
        window.location.href = 'blog.html';
        return;
    }
    
    const article = blogArticles.find(a => a.id === articleId);
    
    if (!article) {
        console.error('No se encontró el artículo:', articleId);
        window.location.href = 'blog.html';
        return;
    }
    
    document.title = article.pageTitle;
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        metaDescription.setAttribute('content', article.metaDescription);
    }
    
    const articleTitle = document.querySelector('.article-title');
    if (articleTitle) {
        articleTitle.textContent = article.articleTitle;
    }
    
    const articleMeta = document.querySelector('.article-meta');
    if (articleMeta) {
        articleMeta.textContent = `Published: ${article.date} | By ${article.author}`;
    }
    
    const mainImage = document.querySelector('.article-main-image');
    if (mainImage) {
        mainImage.src = article.mainImage;
        mainImage.alt = article.mainImageAlt;
    }
    
    if (article.hasButton) {
        const ctaContainer = document.createElement('div');
        ctaContainer.className = article.buttonClass.includes('patreon') ? 'patreon-cta-container' : 'website-cta-container';
        
        ctaContainer.innerHTML = `
            <a href="${article.buttonLink}" target="_blank" class="${article.buttonClass}">${article.buttonText}</a>
        `;
        
        mainImage.parentNode.insertBefore(ctaContainer, mainImage.nextSibling);
    }
    
    const articleBody = document.querySelector('.article-body');
    if (articleBody) {
        articleBody.innerHTML = article.content.join('\n');
    }
}
document.addEventListener('DOMContentLoaded', loadBlogArticles);