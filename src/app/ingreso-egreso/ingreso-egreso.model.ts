
export class IngresoEgreso {
    public descripcion: string;
    public monto: number;
    public tipo: string;
    public uid?: string;

    constructor(Obj: DataObj) {
        this.descripcion = Obj && Obj.descripcion || null;
        this.monto = Obj && Obj.monto || null;
        this.tipo = Obj && Obj.tipo || null;

    }

}

interface DataObj {
    uid?: string;
    descripcion: string;
    tipo: string;
    monto: number;
}