import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpleoService } from '../services/empleo.service';
import { Empleo } from '../models/empleo';
import Swal from 'sweetalert2';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-detalle-empleo',
  templateUrl: './detalle-empleo.component.html',
  styleUrls: ['./detalle-empleo.component.css']
})
export class DetalleEmpleoComponent implements OnInit {

  isCandidato: boolean = false;
  titulo: string = '';
  empresa: string = '';
  tipoContrato: string = '';
  jornada: string = '';
  salario: number = 0;
  descripcion: string = '';
  idEmpresa: number = 0;
  ubicacion: string = '';
  telefono: number = 0;
  email: string = '';
  logo: string = '';
  candidatos: string[] = []; // actualizada a un array

  empleo: Empleo = new Empleo(this.titulo, this.empresa, this.descripcion, this.tipoContrato, this.jornada, this.salario, this.logo, this.idEmpresa, this.ubicacion, this.telefono, this.email, this.candidatos.join('\n')); // actualizada para unir los candidatos con saltos de línea

  constructor(
    private empleoService: EmpleoService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.isCandidato = this.tokenService.isCandidato()
    this.empleoService.detail(id).subscribe(
      data => {
        this.empleo = data;
        this.candidatos = this.empleo.candidatos ? this.empleo.candidatos.split('\n') : [];
      },
      err => {
        console.log(err)
        this.volver();
      }
    );
  }

  // guardarCandidato(event: any) {
  //   const file = event.target.files[0];
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onload = () => {
  //     let base64 = btoa(reader.result as string);
  //     this.candidatos.push("data:" + file.type + ";base64," + base64); 
  //   };
  //   console.log(this.candidatos)
  // }
  guardarCandidato(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      let base64 = reader.result as string;
      this.candidatos.push(base64);
    };
  }

  actualizar(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.empleo.logo = this.logo
    this.empleo.candidatos = this.candidatos.join('\n'); 
    console.log(this.empleo.candidatos = this.candidatos.join('\n'))
    this.empleoService.update(id, this.empleo).subscribe(
      data => {
        Swal.fire({
          icon: 'success',
          title: 'Oferta actualizada exitosamente!',
          showConfirmButton: false,
          timer: 3000
        })
        this.router.navigate(['/']);
      },
      err => {
        Swal.fire({
          icon: 'error',
          title: 'Error al actualizar la oferta',
          showConfirmButton: false,
          timer: 3000
        })
        console.log(err)
      }
    );
  }



  //funcion que devolvera cuanto hace que se creo la oferta y no la fecha de creacion
  publicado(createdAt: Date | undefined): string {
    if (!createdAt) {
      return '';
    }
    const created = new Date(createdAt);
    const now = new Date();
    const milisegundos = now.getTime() - (created.getTime() - 7200000);
    const minutos = Math.round(milisegundos / 60000);
    if (minutos === 0) {
      return 'justo ahora';
    } else
      if (minutos < 60) {
        return `hace ${minutos} ${minutos === 1 ? 'minuto' : 'minutos'}`;
      } else
        if (minutos < 1440) {
          const horas = Math.floor(minutos / 60);
          return `hace ${horas} ${horas === 1 ? 'hora' : 'horas'}`;
        } else {
          const dias = Math.floor(minutos / 1440);
          return `hace ${dias} ${dias === 1 ? 'día' : 'días'}`;
        }
  }

  volver(): void {
    this.router.navigate(['/']);
  }
}
