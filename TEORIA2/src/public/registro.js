"use strict";
const checkbox = document.getElementById('checkbox');
const checkUser = document.getElementById('checkUser');
document.getElementById('btnSaveData')?.addEventListener('click', async (e) => {
    e.preventDefault();
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const user_age = document.getElementById('user_age');
    const user_email = document.getElementById('user_email');
    const user_password = document.getElementById('user_password');
    const checkbox = document.getElementById('checkbox');
    const checkUser = document.getElementById('checkUser');
    if (!checkbox.checked) {
        checkUser.innerHTML = 'Acepta las condiciones ';
        return;
    }
    if (checkbox)
        checkUser.innerHTML = '';
    const payload_newUser = {
        firstName: firstName.value,
        lastName: lastName.value,
        user_age: Number(user_age.value),
        user_email: user_email.value,
        user_password: user_password.value,
    };
    try {
        const response = await fetch('http://localhost:3010/registro', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload_newUser)
        });
        let data = "";
        if (response.ok) {
            //Obtener data
            data = await response.json();
            console.log("Data", JSON.stringify(data));
            //!Borrar Form...
            firstName.value = '';
            lastName.value = '';
            user_age.value = '';
            user_email.value = '';
            user_password.value = '';
        }
        else {
            console.warn('Sin data de registro Fronend..');
        }
    }
    catch (e) {
        console.log('Error al guardar', e.message);
    }
});
checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
        checkUser.innerHTML = '';
    }
});
