
document.getElementById('saveUser').addEventListener('click', async (e) => {

    e.preventDefault()
    console.log("Click dio click en guardar  ");

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



    const response = await fetch('http://localhost:3000/api/create-user', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(payloadNewUser)
    })

    if (response.ok) {
        const data = await response.json()
        console.log('Cliente almacenado en DB Mongo ');

        await Swal.fire({
            icon: 'success',
            title: 'Usuario Creado',
            text: 'Cliente almacenado en DB.',
            confirmButtonColor: '#198754',
            timer: 5000,
            showConfirmButton: false
        });

        location.href = '/'
        return data
    } else {
        console.log('No se almaceno cliente..');

    }


})

