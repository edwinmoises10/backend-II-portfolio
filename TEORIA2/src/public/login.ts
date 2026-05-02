
//Boton
document.getElementById('btnLoginSession')?.addEventListener('click', async (e: any) => {
    //Evitar recargar 
    e.preventDefault()
    const email = document.getElementById('email') as HTMLInputElement
    const password = document.getElementById('password') as HTMLInputElement

    const payloaduser = {
        email: email.value,
        password: password.value
    }

    const response = await fetch('http://localhost:3010/login', {

        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payloaduser)
    })

    let data = ''
    if (response.ok) {
        data = await response.json()
        console.log(`Data Stringity ${JSON.stringify(data)}`);

    } else {
        console.error('Sin resultado desde el front')
    }

    email.value = ""
    password.value = ""

})