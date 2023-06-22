class Sistema{
    constructor(empresas = [], reclamos = [] ){
        this.empresas = empresas;
        this.reclamos = reclamos;

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
    constructor(nombre, empresa, reclamo){
        this.nombre = nombre;
        this.empresa = empresa;
        this.reclamo = reclamo;
    }
}

