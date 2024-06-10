document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:3000/api/posts', {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(posts => {
            const container = document.querySelector('.grid-blog'); // Obtenemos el contenedor de publicaciones

            // Limitamos las publicaciones a 4
            posts.slice(0, 4).forEach(post => {
                const blogItem = document.createElement('div');
                blogItem.classList.add('w-dyn-item');

                const postLink = document.createElement('a');
                postLink.href = `/blog/${encodeURIComponent(post.title.toLowerCase().replace(/\s+/g, '-'))}`;
                postLink.classList.add('blog-item', 'w-inline-block');

                const blogImageWrap = document.createElement('div');
                blogImageWrap.classList.add('blog-image-wrap');

                const image = document.createElement('img');
                image.src = `http://localhost:3000/${post.imageUrl}`;
                image.alt = post.title;
                image.classList.add('blog-image');
                image.style.maxWidth = '200px'; // Ajusta el tamaño máximo de la imagen

                const imageLink = document.createElement('a'); // Create anchor element for image link
                imageLink.href = `http://localhost:3000/posts/${encodeURIComponent(post.title.toLowerCase().replace(/\s+/g, '-'))}.html`; // Set the href attribute to the post URL
                imageLink.classList.add('blog-image-link'); // Add class to the image link
                imageLink.appendChild(image); // Append the image to the image link

                blogImageWrap.appendChild(imageLink); // Append the image link to the image wrapper

                const blogInfoContent = document.createElement('div');
                blogInfoContent.classList.add('blog-info-content');

                const postTitle = document.createElement('h6'); // Cambiado a h6 para un tamaño de título más pequeño
                postTitle.classList.add('blog-title', 'heading-h6');

                const titleLink = document.createElement('a'); // Enlace para el título
                titleLink.href = `http://localhost:3000/posts/${encodeURIComponent(post.title.toLowerCase().replace(/\s+/g, '-'))}.html `;
                titleLink.textContent = post.title;
                postTitle.appendChild(titleLink);

                const authorInfo = document.createElement('div');
                authorInfo.classList.add('author-info');

                blogInfoContent.appendChild(postTitle);
                blogInfoContent.appendChild(authorInfo);

                postLink.appendChild(blogImageWrap);
                postLink.appendChild(blogInfoContent);

                blogItem.appendChild(postLink);

                container.appendChild(blogItem);
            });
        })
        .catch(error => console.error('Error:', error));
});