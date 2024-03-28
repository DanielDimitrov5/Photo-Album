document.addEventListener('DOMContentLoaded', (event) => {
    const socket = io();
    socket.on('photoAdded', (data) => {
        console.log('A new photo has been added!', data);

        const alert = document.createElement('div');
        alert.classList.add('alert', 'alert-primary');
        alert.innerHTML = `A new photo has been added! <a href="/photos/${data.photoId}" class="alert-link">View</a>`;
        document.getElementById('alert').appendChild(alert);
        setTimeout(() => {
            alert.remove();
        }, 10000);                
    });
});