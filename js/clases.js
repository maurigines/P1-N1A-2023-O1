class Sistema{
    constructor(empresas = [], reclamos = [], rubros = []){
        this.empresas = empresas;
        this.reclamos = reclamos;
        this.rubros = rubros;
    }
}

class Empresa{
    constructor(nombre, direccion, rubro){

        this.nombre = nombre;
        this.direccion = direccion;
        this.rubro = rubro;
    }
}

class Reclamo{
    constructor(nombre, empresa, tituloReclamo, textoReclamo){
        this.nombre = nombre;
        this.empresa = empresa;
        this.tituloReclamo = tituloReclamo;
        this.textoReclamo = textoReclamo;
    }
}

class Rubro {
    constructor(nombre){
        this.nombre = nombre;
    }
}