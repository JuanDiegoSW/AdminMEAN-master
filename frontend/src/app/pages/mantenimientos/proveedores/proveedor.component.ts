import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

import { Proveedor } from '../../../models/proveedor.model';
import { ProveedorService } from '../../../services/proveedor.service';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.css']
})
export class ProveedorComponent implements OnInit {

  public proveedor : Proveedor;

  public proveedorForm : FormGroup;
  public proveedorSeleccionado : Proveedor;

  constructor(private fb: FormBuilder,
              private router: Router,
              private proveedorService: ProveedorService,
              private activatedRoute: ActivatedRoute ) { }

  ngOnInit(): void {
    this.activatedRoute.params
    .subscribe( ({ id }) => this.cargarProveedores( id ) );

    this.proveedorForm = this.fb.group({
      ruc: ['', Validators.required ],
      nombre : ['', Validators.required ],
      direccion: ['', Validators.required ],
      telefono: ['', Validators.required ],
      email: ['', Validators.required ],
    });

  }

  cargarProveedores(id: string) {

    if ( id === 'nuevo' ) {
      return;
    }

     this.proveedorService.obtenerProveedorPorId( id )
      .pipe(
        delay(100)
      )
      .subscribe( proveedor => {

        if ( !proveedor ) {
          return this.router.navigateByUrl(`/dashboard/proveedores`);
        }

        const { ruc, nombre, direccion, telefono, email } = proveedor;

        this.proveedorSeleccionado = proveedor;

        this.proveedorForm.setValue({ ruc, nombre, direccion, telefono, email });
      });

  }

  guardarProveedor() {

    const { nombre } = this.proveedorForm.value;

    if ( this.proveedorSeleccionado ) {
      // actualizar
      const data = {
        ...this.proveedorForm.value,
        _id: this.proveedorSeleccionado._id
      }
      this.proveedorService.actualizarProveedor( data )
        .subscribe( resp => {
          Swal.fire('Actualizado', `${ nombre } actualizado correctamente`, 'success');
        })

    } else {
      // crear
      console.log(this.proveedorForm.value);

      this.proveedorService.crearProveedor( this.proveedorForm.value )

          .subscribe( (resp: any) => {
            Swal.fire('Creado', `${ nombre } creado correctamente`, 'success');
            this.router.navigateByUrl(`/dashboard/proveedores`)
        })
    }
  }

}
