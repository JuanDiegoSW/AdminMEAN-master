import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { delay } from 'rxjs/operators';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarionuevo',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  public usuarioForm : FormGroup;
  public usuario : Usuario;

  public usuarioSeleccionado : Usuario;

  public imagenSubir: File;
  public imgTemp: any = null;

  public imgSubs: Subscription;
  public desde: number = 0;
  public cargando: boolean = true;

  constructor(private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fileUploadService: FileUploadService) { }



  ngOnInit(): void {
    this.activatedRoute.params
        .subscribe( ({ id }) => this.cargarUsuario( id ) );

    this.usuarioForm = this.fb.group({
      nombre: ['', Validators.required ],
      email : ['', Validators.required ],
      role: ['', Validators.required ],
    });
  }

  cargarUsuario(id : string) {

    if ( id === 'nuevo' ) {
      return;
    }
    this.usuarioService.obtenerUsuarioPorId(id)
      .pipe(delay(100))
      .subscribe( usuario => {

        if ( !usuario ) {
          return this.router.navigateByUrl(`/dashboard/usuarios`);
        }

        const { nombre, email, password, role } = usuario;

        this.usuarioSeleccionado = usuario;
        console.log(this.usuarioSeleccionado);



        this.usuarioForm.setValue({ nombre, email,  role });
      });


  }
  cambiarRole( usuario:Usuario ) {

    this.usuarioService.guardarUsuario( usuario )
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
  guardarUsuario(){
    const { nombre } = this.usuarioForm.value;

    if ( this.usuarioSeleccionado ) {
      // actualizar
      const data = {
        ...this.usuarioForm.value,
        _id: this.usuarioSeleccionado.uid
      }
      console.log(data);

      this.usuarioService.actualizarPerfil( data )
        .subscribe( resp => {
          Swal.fire('Actualizado', `${ nombre } actualizado correctamente`, 'success');
        })

    }
  }

}
