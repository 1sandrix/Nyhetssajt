async function getNews() {
    try {
        const response = await fetch(
            `https://gnews.io/api/v4/top-headlines?category=general&lang=sv&country=se&max=3&apikey=${apiKey}`
        );

        if (!response.ok) {
            throw new Error(`HTTP-fel: ${response.status}`);
        }

        const data = await response.json();

        const newsContainer = document.getElementById("news-container");

        newsContainer.innerHTML = "";

        data.articles.forEach(article => {
            const newsCard = document.createElement("article");

            newsCard.classList.add("news-card");

            newsCard.innerHTML = `
                <h3>${article.title}</h3>
                <p>${article.description}</p>
                <a href="${article.url}" target="_blank" rel="noopener noreferrer">
                    Läs mer
                </a>
            `;

            newsContainer.appendChild(newsCard);
        });

    } catch (error) {
        console.error("Fel:", error);

        const newsContainer = document.getElementById("news-container");

        newsContainer.innerHTML =
            "<p>Det gick inte att hämta nyheterna just nu.</p>";
    }
}

getNews();