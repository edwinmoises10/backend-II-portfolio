//FRONTEND WORKS WITH MY BACKEND!!!

// const btnSubmit = document.getElementById('btnSubmit')
// const btnReadCookie = document.getElementById('btnReadCookie')

// if (btnSubmit) {

//     const email = document.getElementById('email') as HTMLInputElement
//     const password = document.getElementById('password') as HTMLInputElement



//     btnSubmit.addEventListener('click', async (e) => {

//         const userValues = {
//             email: email.value,
//             password: password.value
//         }

//         e.preventDefault()

//         const response = await fetch('http://localhost:3005/setcookie', {
//             method: 'POST',
//             credentials: 'include',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(userValues)
//         }
//         )
//         //Debug
//         // console.log(response.headers.get('Content-Type'));

//         let data: any = ""
//         if (response.ok || response.status === 400) {
//             data = await response.json()
//         } else {
//             console.log('Data from backend not received');
//         }
//         console.log('Cookie Created', data);
//     })

// }

// if (btnReadCookie) {
//     btnReadCookie.addEventListener('click', async (e) => {

//         e.preventDefault()

//         const response = await fetch('http://localhost:3005/readcookie')
//         //Debug
//         // console.log(response.headers.get('Content-Type'));

//         let data: any = ""
//         if (response.ok || response.status === 400) {
//             data = await response.json()
//             console.log(data);

//         } else {
//             console.log('Data from backend not received');
//         }
//         console.log('Read Cookie', data);
//     })

// }




document.getElementById('btnLoginSession')?.addEventListener('click', async (e) => {

    e.preventDefault(); // <--- ¡ESTE ES EL INTERRUPTOR QUE FALTA!

    const email = document.getElementById('email') as HTMLInputElement
    const password = document.getElementById('password') as HTMLInputElement

    const login_session = {
        email: email.value,
        password: password.value
    }
    console.log("PROCESO INICIADO DESDE EL FRONTEND");

    const response = await fetch('http://localhost:3005/login', {
        method: 'POST',
        credentials: 'include',
        headers:
            { 'Content-Type': 'application/json' },
        body: JSON.stringify(login_session)
    })

    let data = await response.json()

    if (response.ok) {
        console.log("Data Recibida", data);
        location.href='/principal'
    } else {
        console.log(data);

    }
    email.value = ""
    password.value = ""

})