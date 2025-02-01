document.addEventListener("DOMContentLoaded", () => {
  // Ejemplo: si deseas agregar smooth scrolling solo a enlaces con '#' en su href
  const navLinks = document.querySelectorAll('nav ul li a');
  navLinks.forEach(link => {
    if(link.getAttribute('href').charAt(0) === '#'){
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  });

  // Si el enlace es a otra página (por ejemplo, "informacion.html"), se ejecutará la acción por defecto y recargará la página.
  
  // Ejemplo de código para el canvas en la página de Sorpresa
  const canvas = document.getElementById('easterCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let radius = 20;
    let growing = true;
    
    function animateCanvas() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, radius, 0, Math.PI * 2);
      ctx.fillStyle = '#e91e63';
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 4;
      ctx.stroke();
      
      if (growing) {
        radius += 0.8;
        if (radius > 50) growing = false;
      } else {
        radius -= 0.8;
        if (radius < 20) growing = true;
      }
      requestAnimationFrame(animateCanvas);
    }
    animateCanvas();
  }
});

document.addEventListener("DOMContentLoaded", () => {

  // Función para cargar y mostrar los posts desde localStorage
  function loadPosts() {
    // Recupera los posts (se almacenan en formato JSON)
    let posts = JSON.parse(localStorage.getItem('posts')) || [];
    // Ordenar por fecha descendente (los más nuevos primero)
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    // Inyectar los posts en el contenedor
    const container = document.getElementById('postsContainer');
    container.innerHTML = '';
    posts.forEach((post, index) => {
      // Crear un contenedor para cada post (acordeón)
      const postItem = document.createElement('div');
      postItem.classList.add('post-item');

      // Botón con el título y fecha
      const postTitle = document.createElement('button');
      postTitle.classList.add('post-title');
      postTitle.textContent = `${post.date} - ${post.title}`;
      postTitle.setAttribute('data-index', index);

      // Contenedor oculto para la imagen y la descripción
      const postContent = document.createElement('div');
      postContent.classList.add('post-content');
      // Inserta la imagen y descripción
      postContent.innerHTML = `
        <img src="${post.image}" alt="${post.title}">
        <p>${post.description}</p>
      `;

      // Agrega el título y el contenido al item
      postItem.appendChild(postTitle);
      postItem.appendChild(postContent);
      container.appendChild(postItem);

      // Configura el comportamiento de acordeón
      postTitle.addEventListener('click', () => {
        // Alterna la visibilidad del contenido
        if (postContent.style.display === 'block') {
          postContent.style.display = 'none';
        } else {
          postContent.style.display = 'block';
        }
      });
    });
  }

  // Función para guardar un nuevo post
  function savePost(post) {
    let posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.push(post);
    localStorage.setItem('posts', JSON.stringify(posts));
  }

  // Procesar el formulario para postear un nuevo recuerdo
  const form = document.getElementById('newPostForm');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();

      // Obtén los valores del formulario
      const title = document.getElementById('postTitle').value.trim();
      const date = document.getElementById('postDate').value;
      const description = document.getElementById('postDescription').value.trim();
      const fileInput = document.getElementById('postImage');

      if (fileInput.files && fileInput.files[0]) {
        const file = fileInput.files[0];
        const reader = new FileReader();
        reader.onload = function(event) {
          const imageData = event.target.result; // Base64 de la imagen
          const newPost = {
            title,
            date,
            description,
            image: imageData
          };
          savePost(newPost);
          loadPosts(); // Actualiza la lista de posts
          // Reinicia el formulario
          form.reset();
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // Carga los posts al iniciar
  loadPosts();

  // (Opcional) Agregar otras funciones comunes...
});
