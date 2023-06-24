class Sistema {
    constructor (empresas = [], rubros = []) {
        this.empresas = empresas;
        this.rubros = rubros;
    }
}

class Empresa {
    constructor (nombre, direccion, rubro, reclamos = []) {
        this.nombre = nombre;
        this.direccion = direccion;
        this.rubro = rubro;
        this.reclamos = reclamos;
    }
}

class Reclamo {
    constructor (nombre, empresa, tituloReclamo, textoReclamo, contador = 0) {
        this.nombre = nombre;
        this.empresa = empresa;
        this.tituloReclamo = tituloReclamo;
        this.textoReclamo = textoReclamo;
        this.contador = contador;
    }
}

class Rubro {
    constructor (nombre, cantidadReclamos = 0) {
        this.nombre = nombre;
        this.cantidadReclamos = cantidadReclamos;
    }
}
