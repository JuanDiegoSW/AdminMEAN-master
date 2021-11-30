import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

import { Producto }from '../../../models/producto.model'
import { Categoria } from '../../../models/categoria.model'

import { ProductoService } from '../../../services/producto.service';
import { CategoriaService } from '../../../services/categoria.service';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  //styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  public productoForm : FormGroup;
  public categorias : Categoria[] = []

  constructor() { }

  ngOnInit(): void {
  }

}
