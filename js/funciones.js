window.onload = () => {
    // Inicializando el sistema
    const sistema = new Sistema();

    // Cargamos Rubros
    const rubros = ['viajes', 'restaurantes', 'bancos', 'muebles', 'autos', 'servicios', 'general'];
    for (let rubroNombre of rubros) {
        let rubro = new Rubro(rubroNombre);
        sistema.rubros.push(rubro);
    }; 
    
    // Traer elementos a usar despues
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

            // Limpiar visualizacion.
            form.reset();
        }
    });

    btnSeccionReclamo.addEventListener('click', () => {
        mostrarSeccion('agregarReclamo');
    });
    btnAgregarReclamo.addEventListener('click', () => {
        const form = document.getElementById('formReclamo');
        if (form.checkValidity()) {
            // Traemos los datos del form
            const nombre = document.getElementById('txtNombre').value;
            const empresa = document.getElementById('cmbEmpresa').value;
            const tituloReclamo = document.getElementById('txtReclamo').value;
            const textoReclamo = document.getElementById('txtAreaReclamo').value;
            
            // Creamos un reclamo nuevo
            const reclamo = new Reclamo(nombre, empresa, tituloReclamo, textoReclamo);
            sistema.reclamos.push(reclamo);

            // Recargamos los reclamos
            recargarReclamos(sistema);

            // Limpiar visualizacion
            form.reset();
        }
    });

    // Inicializacion Final.
    recargarRubros(sistema);
    mostrarSeccion('principal');
};

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

function recargarRubros (sistema) {
    let combo = document.getElementById('cmbRubro');
    combo.innerHTML = '';
    for (let rubro of sistema.rubros) {
        const option = document.createElement('option');
        option.value = rubro.nombre;
        option.innerHTML = rubro.nombre.charAt(0).toUpperCase() + rubro.nombre.slice(1);;
        combo.appendChild(option);
    }
}

function recargarReclamos(sistema){
    // Vaciamos contenedor.
    let cajaReclamos = document.getElementById('cajaReclamos');
    cajaReclamos.innerHTML = '';
    let indice = 0;

    for(let reclamo of sistema.reclamos){
        indice++;
        let reclamoId = 'reclamo' + indice;
        let elementoReclamo = document.createElement('div');
        elementoReclamo.className = "reclamoItem";
        elementoReclamo.id = reclamoId;

        // Armando H3
        let title = document.createElement('h3');
        title.innerHTML = 'Reclamo No.' + indice;

        // Armando primer P.
        let boxNombreTitulo = document.createElement('p');
        let tituloReclamo = document.createElement('span');
        tituloReclamo.className = 'asunto';
        tituloReclamo.innerHTML = reclamo.tituloReclamo;
        boxNombreTitulo.innerHTML = reclamo.nombre + ':';
        boxNombreTitulo.appendChild(tituloReclamo);
        
        // Armando el segundo P.
        let boxEmpresa = document.createElement('p');
        let empresaReclamo = document.createElement('span');
        empresaReclamo.className = 'empresa';
        empresaReclamo.innerHTML = reclamo.empresa;
        boxEmpresa.innerHTML = 'Empresa:';
        boxEmpresa.appendChild(empresaReclamo);

        // Armando el tercer P.
        let boxTextoReclamo = document.createElement('p');
        boxTextoReclamo.innerHTML = reclamo.textoReclamo;

        // Armando box acciones
        let boxAcciones = document.createElement('div');
        boxAcciones.className = 'actions';

        let botonAcciones = document.createElement('button');
        botonAcciones.setAttribute("onclick","incrementarReclamo(\""+reclamoId+"\");");
        botonAcciones.innerHTML = 'A mi tambien me pasó!';
        
        boxAcciones.appendChild(botonAcciones);
        boxAcciones.innerHTML += '<span>Contador:<span class="contador">0</span></span>';

        // Agregando elementos a la 
        elementoReclamo.appendChild(title)
        elementoReclamo.appendChild(boxNombreTitulo)
        elementoReclamo.appendChild(boxEmpresa)
        elementoReclamo.appendChild(boxTextoReclamo)
        elementoReclamo.appendChild(boxAcciones);

        cajaReclamos.appendChild(elementoReclamo);

        // Adding Event listener.
    }
}

function incrementarReclamo(reclamoId){
    console.log('Funca el boton');
    console.log(reclamoId);
    let reclamoAumentar = document.getElementById(reclamoId);
    console.log(reclamoAumentar);

    let reclamoCount = reclamoAumentar.getElementsByClassName('contador')[0];
    let reclamoTotal = parseInt(reclamoCount.innerHTML);
    reclamoTotal++;
    reclamoCount.innerHTML = reclamoTotal;
}