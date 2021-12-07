import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { ClienteService } from 'src/app/services/cliente.service';
import Swal from 'sweetalert2';
import { Cliente } from 'src/app/models/cliente.model';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styles:[
  ]
})
export class ClienteComponent implements OnInit {

  public cliente: Cliente
  public clienteForm : FormGroup;
  public imagenSubir: File;
  public imgSubs: Subscription;
  public imgTemp: any = 'http://localhost:8081/api/v1/upload/usuarios/no-image';

  opcionSeleccionado: string


  public clienteSeleccionado : Cliente;

  constructor( private fb: FormBuilder,
    private router: Router,
    private clienteService: ClienteService,
    private activatedRoute: ActivatedRoute,
    private fileUploadService: FileUploadService) {}
  ngOnDestroy(): void {
  //this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {

    this.activatedRoute.params
        .subscribe( ({ id }) => this.cargarCliente( id ) );

    this.clienteForm = this.fb.group({
      nombre: ['', Validators.required ],
      email : ['', Validators.required ],
      dni : ['', Validators.required ],
      telefono : ['', Validators.required ],
      direccion : ['', Validators.required ],
    });
  }
  actualizarCliente() {

    const { nombre } = this.clienteForm.value;

    if ( this.clienteSeleccionado ) {
      // actualizar
      const data = {
        ...this.clienteForm.value,
        _id: this.clienteSeleccionado._id
      }

      this.clienteService.actualizarCliente( data )
        .subscribe( resp => {
          Swal.fire('Actualizado', `${ nombre } actualizado correctamente`, 'success');
          this.router.navigateByUrl(`/dashboard/clientes`)
        })

    } else {
      // crear
      console.log(this.clienteForm.value);

      this.clienteService.crearCliente( this.clienteForm.value )

          .subscribe( (resp: any) => {
            Swal.fire('Creado', `${ nombre } creado correctamente`, 'success');
            this.router.navigateByUrl(`/dashboard/clientes`)
        })
    }
    }

    cargarCliente(id: string) {

      if ( id === 'nuevo' ) {
        return;
      }

       this.clienteService.obtenerClientePorId( id )
        .pipe(
          delay(100)
        )
        .subscribe( cliente => {

          if ( !cliente ) {
            return this.router.navigateByUrl(`/dashboard/clientes`);
          }

          const { nombre,email,dni,telefono,direccion } = cliente;

          this.clienteSeleccionado = cliente;

          console.log(cliente);



          this.clienteForm.setValue({ nombre,email,dni,telefono,direccion });
        });

    }

    cambiarImagen( file: File ) {
      this.imagenSubir = file;

      if ( !file ) {
        return this.imgTemp = null;
      }

      const reader = new FileReader();
      reader.readAsDataURL( file );

      reader.onloadend = () => {
        this.imgTemp = reader.result;
      }

    }
    subirImagen() {

      this.fileUploadService
        .actualizarFoto( this.imagenSubir, 'clientes', this.cliente._id )
        .then( img => {
          this.cliente.img = img;
          Swal.fire('Guardado', 'Imagen de usuario actualizada', 'success');
        }).catch( err => {
          console.log(err);
          Swal.fire('Error', 'No se pudo subir la imagen', 'error');
        })

    }
    cambiarRole(){

    }
}
