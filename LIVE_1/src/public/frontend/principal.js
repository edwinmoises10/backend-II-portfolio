"use strict";
document.getElementById('btnLogOut')?.addEventListener('click', async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:3005/logout', {
        method: 'GET',
        credentials: 'include'
    });
    const data = await response.json();
    if (data.status === 'ok') {
        console.log("Usuario deslogeado");
        // Esperamos 2 segundos antes de cambiar de frecuencia (URL)
        setTimeout(() => {
            location.href = '/';
        }, 2000);
    }
});
