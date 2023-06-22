window.addEventListener('load', function () {
    const sistema = new Sistema();
    const enlacesNav = document.querySelectorAll('nav a');
    const btnAgregarReclamo = document.getElementById('btnAgregarReclamo');
    const btnSeccionReclamo = document.getElementById('btnSeccionReclamo');
    const btnAgregarEmpresa = document.getElementById('btnAgregarEmpresa');

    enlacesNav.forEach(function (enlace) {
        enlace.addEventListener('click', function (evento) {
            evento.preventDefault();

            const seccionId = this.getAttribute('href').substring(1);

            mostrarSeccion(seccionId);
        });
    });

    btnAgregarEmpresa.addEventListener('click', () => {
        const form = document.getElementById('formEmpresa');
        if (form.checkValidity()) {
            const nombre = document.getElementById('txtDatosNombre').value;
            const direccion =
                document.getElementById('txtDatosDireccion').value;
            const rubro = document.getElementById('cmbRubro').value;
            const empresa = new Empresa(nombre, direccion, rubro);
            sistema.empresas.push(empresa);
            recargarEmpresas(sistema);
        }
    });

    btnSeccionReclamo.addEventListener('click', () => {
        mostrarSeccion('agregarReclamo');
    });
    btnAgregarReclamo.addEventListener('click', () => {
        const form = document.getElementById('formReclamo');
        if (form.checkValidity()) {
        }
    });
    mostrarSeccion('principal');
});

function mostrarSeccion (section) {
    const secciones = document.querySelectorAll('section');
    for (const seccion of secciones) seccion.style.display = 'none';
    console.log(section);
    document.getElementById(section).style.display = 'block';
}

function recargarEmpresas (sistema) {
    let combo = document.getElementById('cmbEmpresa');
    combo.innerHTML = '';
    for (let empresa of sistema.empresas) {
        const option = document.createElement('option');
        option.value = empresa.nombre;
        option.innerHTML = empresa.nombre;
        combo.appendChild(option);
    }
}
