import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Usuario } from 'src/app/models/usuario.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-newusuario',
  templateUrl: './newusuario.component.html',
  styles: []
})
export class NewusuarioComponent implements OnInit {


  public usuario: Usuario;
  public usuarioForm : FormGroup;
  public imagenSubir: File;
  public imgSubs: Subscription;
  public imgTemp: any = 'http://localhost:8081/api/v1/upload/usuarios/no-image';

  opcionSeleccionado: string

  public cargando: boolean = true;

  constructor( private fb: FormBuilder,
               private router: Router,
               private usuarioService: UsuarioService,
               private fileUploadService: FileUploadService) {}
  ngOnDestroy(): void {
    //this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {

      this.usuarioForm = this.fb.group({
        nombre: ['', Validators.required ],
        email : ['', Validators.required ],
        password : ['', Validators.required ],
        role: ['', Validators.required ],
      });
  }

  guardarUsuario() {

    const { nombre } = this.usuarioForm.value;

      // crear
      console.log(this.usuarioForm.value);

      this.usuarioService.crearUsuario( this.usuarioForm.value )

          .subscribe( (resp: any) => {
            Swal.fire('Creado', `${ nombre } creado correctamente`, 'success');
            this.router.navigateByUrl(`/dashboard/usuarios`)
        })
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
        .actualizarFoto( this.imagenSubir, 'usuarios', this.usuario.uid )
        .then( img => {
          this.usuario.img = img;
          Swal.fire('Guardado', 'Imagen de usuario actualizada', 'success');
        }).catch( err => {
          console.log(err);
          Swal.fire('Error', 'No se pudo subir la imagen', 'error');
        })

    }
    cambiarRole(){

    }


}
