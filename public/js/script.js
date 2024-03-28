document.addEventListener('DOMContentLoaded', (event) => {
    const socket = io();
    socket.on('photoAdded', (data) => {
        console.log('A new photo has been added!', data);
        
        const alert = document.createElement('div');
        alert.classList.add('alert', 'alert-primary');
        alert.textContent = 'A new photo has been added!';
        document.getElementById('alert').appendChild(alert);
        setTimeout(() => {
            alert.remove();
        }, 5000);                
    });
});