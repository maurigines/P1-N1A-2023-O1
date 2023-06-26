/*
  Creado para Obligatorio Programacion 1 2023 / ORT Uruguay
  Autores: Alfonso Carvallo y Mauricio Martinez
*/

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
    constructor (
        nombre,
        numeroReclamo,
        empresa,
        tituloReclamo,
        textoReclamo,
        contador = 0
    ) {
        this.nombre = nombre;
        this.empresa = empresa;
        this.tituloReclamo = tituloReclamo;
        this.textoReclamo = textoReclamo;
        this.contador = contador;
        this.numeroReclamo = numeroReclamo;
    }
}

class Rubro {
    constructor (nombre, cantidadReclamos = 0) {
        this.nombre = nombre;
        this.cantidadReclamos = cantidadReclamos;
    }
}
