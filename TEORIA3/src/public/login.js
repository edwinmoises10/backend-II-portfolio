// Captura de elementos del DOM
const btnLoginSession = document.getElementById('btnLoginSession');
const createCount = document.getElementById('createCount');

if (btnLoginSession) {
    btnLoginSession.addEventListener('click', async (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (!email || !password) {
            Swal.fire({ icon: 'warning', title: 'Campos Obligatorios', text: 'Por favor llena todos los campos.' }); return
        }

        const payloaduser = { email, password };

        try {
            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payloaduser)
            });

            if (response.ok) {
                const data = await response.json();
                await Swal.fire({
                    icon: 'success',
                    title: '¡Bienvenido!',
                    text: 'Ingresando al sistema...',
                    timer: 1500,
                    showConfirmButton: false
                });
                location.href = '/personal-content'

                console.log(`Data Stringity ${JSON.stringify(data)}`);
            } else {
                const errorData = await response.json();

                Swal.fire({ icon: 'error', title: 'Error de Autenticación', text: errorData.message || 'Credenciales Incorrectas' });
                console.error('Error de credenciales o de servidor');
            }
        } catch (error) {
            Swal.fire("Credenciales Incorrectas");
            console.error('Error en la petición de login:', error);
        } finally {
            document.getElementById('email').value = "";
            document.getElementById('password').value = "";
        }
    });
}

if (createCount) {
    createCount.addEventListener('click', () => {
        location.href = '/create-user';
    });
}
