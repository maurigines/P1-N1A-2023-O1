/*
  Creado para Obligatorio Programacion 1 2023 / ORT Uruguay
  Autores: Alfonso Carvallo y Mauricio Martinez
*/

// Inicializando el sistema
const sistema = new Sistema();
let identificadorReclamo = 1;
// Cargamos Rubros
const rubros = [
    'viajes',
    'restaurantes',
    'bancos',
    'muebles',
    'autos',
    'servicios',
    'general',
];
for (let rubroNombre of rubros) {
    let rubro = new Rubro(rubroNombre);
    sistema.rubros.push(rubro);
}

window.onload = () => {
    // Traer elementos a usar despues
    const enlacesNav = document.querySelectorAll('nav a');
    const btnAgregarReclamo = document.getElementById('btnAgregarReclamo');
    const btnSeccionReclamo = document.getElementById('btnSeccionReclamo');
    const btnAgregarEmpresa = document.getElementById('btnAgregarEmpresa');
    const radioCreciente = document.getElementById('opcionCreciente');
    const radioDecreciente = document.getElementById('opcionDecreciente');
    const btnSearchBox = document.getElementById('searchBoxButton');

    const formSearch = document.getElementById('formSearch');
    formSearch.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            buscarEnReclamos();
        }
    });

    const btnVolver = document.getElementById('btnVolver');
    btnVolver.addEventListener('click', function (e) {
       mostrarSeccion('principal');
    });

    btnSearchBox.addEventListener('click', () => {
        buscarEnReclamos();
    });

    radioCreciente.addEventListener('click', () => {
        let letraCargada = document
            .getElementById('letterSelectorsId')
            .getElementsByClassName('selected')[0].innerHTML;
        cargarTabla(letraCargada);
    });

    radioDecreciente.addEventListener('click', () => {
        let letraCargada = document
            .getElementById('letterSelectorsId')
            .getElementsByClassName('selected')[0].innerHTML;
        cargarTabla(letraCargada);
    });

    for (let enlace of enlacesNav) {
        enlace.addEventListener('click', function (evento) {
            evento.preventDefault();
            const seccionId = this.getAttribute('href').substring(1);
            mostrarSeccion(seccionId);
        });
    }
    btnAgregarEmpresa.addEventListener('click', () => {
        const form = document.getElementById('formEmpresa');
        if (form.checkValidity()) {
            const nombre = document.getElementById('txtDatosNombre').value;
            const direccion =
                document.getElementById('txtDatosDireccion').value;
            const rubro = document.getElementById('cmbRubro').value;

            // Checkeamos si existe una empresa con el mismo nombre.
            let encontramosEmpresas = sistema.empresas.filter(
                empresa => empresa.nombre.toLowerCase() === nombre.toLowerCase()
            ).length;
            if (encontramosEmpresas > 0) {
                alert(
                    'La empresa no puede tener el mismo nombre que una ya ingresada'
                );
                form.reset();
                return false;
            }

            const empresa = new Empresa(nombre, direccion, rubro);
            sistema.empresas.push(empresa);

            // Recargamos partes dinamicas.
            recargarEmpresas();
            recargarEmpresasSinReclamos();
            actualizarEmpresasRegistradas();
            actualizarEmpresasRegistradasConReclamos();
            actualizarPromedioEmpresas();
            cargarLetterSelectors();
            cargarTabla('*');

            // Limpiar visualizacion.
            form.reset();
        } else {
            form.reportValidity();
        }
    });

    btnSeccionReclamo.addEventListener('click', () => {
        if (sistema.empresas.length > 0) mostrarSeccion('agregarReclamo');
        else
            alert(
                'No hay ninguna empresa disponible. Agrega una empresa e intenta de nuevo.'
            );
    });
    btnAgregarReclamo.addEventListener('click', () => {
        const form = document.getElementById('formReclamo');
        if (form.checkValidity()) {
            // Traemos los datos del form
            const nombre = document.getElementById('txtNombre').value;
            const numeroReclamo = identificadorReclamo;
            const empresa = document.getElementById('cmbEmpresa').value;
            const tituloReclamo = document.getElementById('txtReclamo').value;
            const textoReclamo =
                document.getElementById('txtAreaReclamo').value;

            // Check for empresa no siendo valida.
            if (empresa == 'sin-datos') {
                alert(
                    'Se necesita una empresa para agregar un reclamo. Intenta nuevamente despues de haber agregado una Empresa.'
                );
                return false;
            }

            // Creamos un reclamo nuevo
            const reclamo = new Reclamo(
                nombre,
                numeroReclamo,
                empresa,
                tituloReclamo,
                textoReclamo
            );

            //Incrementamos Identificador Unico de reclamos
            identificadorReclamo++;
            // Sumar +1 a reclamos para esta empresa.
            sistema.empresas
                .find(item => {
                    return item.nombre == empresa;
                })
                .reclamos.push(reclamo);

            // Logica para actualizar valor de reclamos en rubros.
            let rubro = sistema.empresas.find(item => {
                return item.nombre == empresa;
            }).rubro;
            actualizarRubro(rubro);

            // Recargamos partes dinamicas.
            recargarReclamos();
            recargarEmpresasSinReclamos();
            recargarRubrosMaximaCantidad();
            actualizarEmpresasRegistradasConReclamos();
            actualizarPromedioEmpresas();
            cargarTabla('*');

            // Limpiar visualizacion
            form.reset();
        } else {
            form.reportValidity();
        }
    });

    // Inicializacion Final.
    recargarRubros();
    mostrarSeccion('principal');
};

function mostrarSeccion (section) {
    // Ocultamos todas las secciones.
    const secciones = document.querySelectorAll('section');
    for (const seccion of secciones) seccion.style.display = 'none';

    // Mostramos la que queremos.
    document.getElementById(section).style.display = 'block';
}

function recargarEmpresas () {
    // Vaciamos todas las empresas.
    let combo = document.getElementById('cmbEmpresa');
    combo.innerHTML = '';

    // Para todas las encontradas, le agregamos las opciones.
    for (let empresa of sistema.empresas) {
        const option = document.createElement('option');
        option.value = empresa.nombre;
        option.innerHTML = empresa.nombre;
        combo.appendChild(option);
    }
}

function recargarRubros () {
    // Vaciamos todos los rubros.
    let combo = document.getElementById('cmbRubro');
    combo.innerHTML = '';

    // Para cada rubro encontrado en el sistema, creamos las opciones.
    for (let rubro of sistema.rubros) {
        const option = document.createElement('option');
        option.value = rubro.nombre;
        option.innerHTML = uppercaseFirstLetter(rubro);
        combo.appendChild(option);
    }
}

function recargarReclamos (textoBusqueda = '') {
    // Vaciamos contenedor.
    let cajaReclamos = document.getElementById('cajaReclamos');
    cajaReclamos.innerHTML = '';

    // Traer reclamos de todas las empresaas y lo metemos en un array chato.
    let reclamos = sistema.empresas.flatMap(({ reclamos }) => reclamos);
    reclamos.sort((a, b) => b.numeroReclamo - a.numeroReclamo);

    // Si tenemos un texto que buscar, filtramos los resultados del flatMap.
    if (textoBusqueda != '') {
        let textoMinuscula = textoBusqueda.toLowerCase();

        let reclamosPorNombre = reclamos.filter(reclamo =>
            reclamo.nombre.toLowerCase().includes(textoMinuscula)
        );
        let reclamosPorEmpresa = reclamos.filter(reclamo =>
            reclamo.empresa.toLowerCase().includes(textoMinuscula)
        );
        let reclamosPorTitulo = reclamos.filter(reclamo =>
            reclamo.tituloReclamo.toLowerCase().includes(textoMinuscula)
        );
        let reclamosPorTexto = reclamos.filter(reclamo =>
            reclamo.textoReclamo.toLowerCase().includes(textoMinuscula)
        );

        // Unimos todo y de-duplicamos.
        reclamos = [
            ...reclamosPorNombre,
            ...reclamosPorEmpresa,
            ...reclamosPorTitulo,
            ...reclamosPorTexto,
        ].filter((value, index, self) => {
            return self.indexOf(value) === index;
        });
    }

    // Si no hay reclamos
    if (reclamos.length == 0) {
        cajaReclamos.innerHTML =
            '<div class="no-reclamos">No hay ningun reclamo :)</div>';
    } else {
        // Ordenamos y recorremos.
        reclamos.sort((a, b) => b.numeroReclamo - a.numeroReclamo);

        for (let reclamo of reclamos) {
            let elementoReclamo = document.createElement('div');
            elementoReclamo.className = 'reclamoItem';
            elementoReclamo.id = reclamo.nombre;
            elementoReclamo.setAttribute('indice', reclamo.numeroReclamo);

            // Armando H3
            let title = document.createElement('h3');
            title.innerHTML = 'Reclamo No.' + reclamo.numeroReclamo;

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
            botonAcciones.setAttribute(
                'onclick',
                'incrementarReclamo("' +
                    reclamo.empresa +
                    '","' +
                    reclamo.nombre +
                    '");'
            );
            botonAcciones.innerHTML = 'A mi tambien me pasó!';

            boxAcciones.appendChild(botonAcciones);
            boxAcciones.innerHTML +=
                '<span>Contador:<span class="contador">' +
                reclamo.contador +
                '</span></span>';

            // Agregando elementos a la
            elementoReclamo.appendChild(title);
            elementoReclamo.appendChild(boxNombreTitulo);
            elementoReclamo.appendChild(boxEmpresa);
            elementoReclamo.appendChild(boxTextoReclamo);
            elementoReclamo.appendChild(boxAcciones);

            // Finalmente agregamos el reclamo a la caja.
            cajaReclamos.appendChild(elementoReclamo);
        }
    }
}

function incrementarReclamo (empresaId, reclamoId) {
    // Traemos el reclamo que queremos aumentar.
    let reclamoAumentar = document.getElementById(reclamoId);
    let indice = reclamoAumentar.getAttribute('indice');

    // Buscamos el div donde le vamos a meter los reclamos.
    let reclamoCount = reclamoAumentar.getElementsByClassName('contador')[0];

    // Traemos la cantidad de reclamos actuales y sumamos 1.
    let empresaEncontrada = sistema.empresas.find(
        item => item.nombre == empresaId
    );
    empresaEncontrada.reclamos.find(item => item.nombre == reclamoId)
        .contador++;

    // Lo traemos para aumentarlo en la visualizacion.
    let reclamoTotal = empresaEncontrada.reclamos.find(
        item => item.nombre == reclamoId
    ).contador;
    reclamoCount.innerHTML = reclamoTotal;
}

function recargarEmpresasSinReclamos () {
    // Limpiamos.
    document.getElementById('empresasSinReclamos').innerHTML = '';

    let empresasSinReclamos = sistema.empresas.filter(
        empresa => empresa.reclamos.length == 0
    );

    if (empresasSinReclamos.length === 0) {
        document.getElementById('empresasSinReclamos').innerHTML +=
            '<li>No hay empresas sin reclamos :(</li>';
    } else {
        for (let empresa of empresasSinReclamos) {
            document.getElementById('empresasSinReclamos').innerHTML +=
                '<li>' +
                empresa.nombre +
                ', ' +
                empresa.direccion +
                ', ' +
                uppercaseFirstLetter({ nombre: empresa.rubro }) +
                '</li>';
        }
    }
}

function recargarRubrosMaximaCantidad () {
    // Limpiamos.
    document.getElementById('rubrosMaximaCantidad').innerHTML = '';

    //Traemos los rubros con mas reclamos:
    let rubros = sistema.rubros.sort(
        (a, b) => a.cantidadReclamos - b.cantidadReclamos
    );
    let rubrosValorAlto = rubros.slice(-1)[0];
    let rubrosFiltrados = rubros.filter(
        item => item.cantidadReclamos === rubrosValorAlto.cantidadReclamos
    );

    for (let rubro of rubrosFiltrados) {
        document.getElementById('rubrosMaximaCantidad').innerHTML +=
            '<li>' +
            uppercaseFirstLetter(rubro) +
            ': cantidad ' +
            rubro.cantidadReclamos +
            '</li>';
    }
}

function actualizarRubro (rubro) {
    //Encuentra el rubro y le suma++ a cantidadReclamos.
    sistema.rubros.find(item => item.nombre === rubro).cantidadReclamos++;
}

function actualizarEmpresasRegistradas () {
    document.getElementById('empresasRegistradas').innerHTML =
        sistema.empresas.length;
}

function actualizarEmpresasRegistradasConReclamos () {
    document.getElementById('empresasRegistradasConReclamos').innerHTML =
        sistema.empresas.filter(empresa => empresa.reclamos.length > 0).length;
}

function actualizarPromedioEmpresas () {
    // Traemos todos los reclamos, y las empresas sin reclamos.
    let cantidadReclamos = sistema.empresas.flatMap(
        ({ reclamos }) => reclamos
    ).length;
    let cantidadEmpresasSinReclamos = sistema.empresas.filter(
        empresa => empresa.reclamos.length > 0
    ).length;

    // Si llega a ser 0, es un caso borde y dejamos 0 (a menos que quieramos calcular limites de Fundamentos de Matematica)
    if (cantidadReclamos == 0 && cantidadEmpresasSinReclamos == 0) {
        document.getElementById('empresasPromedio').innerHTML = 0;
    } else {
        document.getElementById('empresasPromedio').innerHTML = Math.round(
            cantidadReclamos / cantidadEmpresasSinReclamos
        );
    }
}

function uppercaseFirstLetter (object) {
    return object.nombre.charAt(0).toUpperCase() + object.nombre.slice(1);
}

function cargarTabla (letra) {
    // Limpiamos Botones y marcamos estilos.
    let botones = document
        .getElementById('letterSelectorsId')
        .getElementsByTagName('button');
    for (let boton of botones) {
        boton.classList.remove('selected');
        if (boton.innerHTML === letra) boton.className = 'selected';
    }

    document
        .getElementById('tablaEmpresas')
        .getElementsByTagName('tbody')[0].innerHTML = '';
    let empresas;

    // Nos fijamos si no es la letra.
    if (letra == '*') {
        empresas = sistema.empresas;
    } else {
        empresas = sistema.empresas.filter(empresa =>
            uppercaseFirstLetter(empresa).startsWith(letra)
        );
    }

    if (empresas.length == 0) {
        document
            .getElementById('tablaEmpresas')
            .getElementsByTagName('tbody')[0].innerHTML =
            '<td colspan="4" class="centered"><p>No hay datos :(</p></td>';
        return false;
    }

    // Cambiamos string con letra
    document.getElementById('letra').innerHTML = letra;

    // Traemos opcion.
    let opcionCreciente = document.getElementById('opcionCreciente').checked;
    let opcionDecreciente =
        document.getElementById('opcionDecreciente').checked;

    // Checkeando opcion.
    if (opcionCreciente) {
        empresas.sort((a, b) => (a.nombre > b.nombre ? 1 : -1));
    } else if (opcionDecreciente) {
        empresas.sort((a, b) => (a.nombre > b.nombre ? -1 : 1));
    }

    for (let empresa of empresas) {
        document
            .getElementById('tablaEmpresas')
            .getElementsByTagName('tbody')[0].innerHTML +=
            '<tr>' +
            '<td>' +
            empresa.nombre +
            '</td>' +
            '<td>' +
            empresa.direccion +
            '</td>' +
            '<td>' +
            empresa.rubro +
            '</td>' +
            '<td>' +
            empresa.reclamos.length +
            '</td>' +
            '</tr>';
    }
}

function cargarLetterSelectors () {
    //Cargamos las letras cada una de las empresas.
    document.getElementById('letterSelectorsId').innerHTML = '';

    var letrasUnicas = sistema.empresas
        .map(item => item.nombre.toUpperCase().substring(0, 1))
        .filter((value, index, self) => {
            return self.indexOf(value) === index;
        })
        .sort();

    for (let letra of letrasUnicas)
        document.getElementById('letterSelectorsId').innerHTML +=
            '<button onclick="cargarTabla(\'' +
            letra +
            '\')">' +
            letra +
            '</button>';
    document.getElementById('letterSelectorsId').innerHTML +=
        '<button onclick="cargarTabla(\'*\')">*</button>';
}

function buscarEnReclamos () {
    let campo = document.getElementById('searchBoxTxt').value;
    recargarReclamos(campo);
    mostrarSeccion('verReclamos');
}
