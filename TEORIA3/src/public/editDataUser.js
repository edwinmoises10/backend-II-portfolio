// Al cargar la página edit_document
const editData = JSON.parse(sessionStorage.getItem('editData'))

if (editData) {
    console.log('Datos para editar:', editData)
    document.getElementById('firstname').value = editData.firstname
    document.getElementById('lastname').value = editData.lastname
    document.getElementById('email').value = editData.email
    document.getElementById('city').value = editData.city
    document.getElementById('stateValue').value = editData.stateValue
    document.getElementById('zipCode').value = editData.zipCode
    document.getElementById('password').value = editData.password
    sessionStorage.removeItem('editData')
}


document.getElementById('saveUser').addEventListener('click', async (e) => {

    e.preventDefault()
    console.log("Click para actualizar  ");

    const firstname = document.getElementById('firstname')
    const lastname = document.getElementById('lastname')
    const email = document.getElementById('email')
    const city = document.getElementById('city')
    const stateValue = document.getElementById('stateValue')
    const zipCode = document.getElementById('zipCode')
    const password = document.getElementById('password')
    const invalidCheck = document.getElementById('invalidCheck')

    if (!invalidCheck.checked) {
        console.warn('Debes aceptar los términos y condiciones antes de continuar.');

        Swal.fire({
            icon: 'warning',
            title: 'Atención',
            text: 'Debes aceptar los términos y condiciones para poder registrarte.',
            confirmButtonColor: '#198754',
            confirmButtonText: 'Entendido'
        });

        return;
    }

    const payloadNewUser = {
        firstname: firstname.value,
        lastname: lastname.value,
        email: email.value,
        city: city.value,
        stateValue: stateValue.value,
        zipCode: zipCode.value,
        password: password.value
    }



    const response = await fetch('http://localhost:3000/api/edituser', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(payloadNewUser)
    })

    if (response.ok) {
        const data = await response.json()
        console.log('Cliente actualizado en DB Mongo ');

        await Swal.fire({
            icon: 'success',
            title: 'Usuario Actualizado',
            text: 'Cliente Actualizado en DB.',
            confirmButtonColor: '#198754',
            timer: 5000,
            showConfirmButton: false
        });

        location.href = '/personal-content'
        return data
    } else {
        console.log('No se almaceno cliente..');

    }


})
