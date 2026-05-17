

const logout = document.getElementById('logout')
const editInformation = document.getElementById('editInformation')


logout.addEventListener('click', async (e) => {
    e.preventDefault()

    const response = await fetch('http://localhost:3000/api/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    })

    if (response.ok) {
        sessionStorage.clear();

        await Swal.fire({
            icon: 'success',
            title: '¡Adiós!',
            text: 'Has cerrado sesión correctamente.',
            timer: 1500,
            showConfirmButton: false
        });

        location.href = '/';
    } else {
        Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudo cerrar la sesión.' });
    }

    await Swal.fire("Adios");

    location.href = '/'

})


editInformation.addEventListener('click', async (e) => {
    e.preventDefault()

    const response = await fetch('http://localhost:3000/api/getData', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    })

    if (response.ok) {
        const data = await response.json()
        console.log('Obteniendo datos de Mongo', data.payload);

        sessionStorage.setItem('editData', JSON.stringify(data.payload))

        await Swal.fire({
            icon: 'success',
            title: 'Datos Recibidos',
            text: `Se han recuperado ${data.payload.length} registros con éxito.`, confirmButtonColor: '#198754',
            timer: 5000,
            showConfirmButton: false
        });
        location.href = '/edit_document'
        return data


    } else {
        console.log('No se puede obtener datos');

    }

})