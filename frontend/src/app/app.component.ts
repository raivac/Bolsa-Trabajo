import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  router: any;
  ngOnInit(): void {
    mostrarMenu();
    ocultarPolitica();
  }
  title = 'frontend';
}


function mostrarMenu() {
  const boton = document.getElementById("boton");
  const minimenu = document.getElementById("minimenu");
  if (boton) {
    boton.addEventListener("click", function () {
      if (minimenu && minimenu.style) {
        if (minimenu.style.display == "none") {
          minimenu.style.display = "block";
        } else {
          minimenu.style.display = "none";
        }
      }

    });
  }
}


// localStorage.setItem("poli", "0");
const poli = parseInt(localStorage.getItem("poli") ?? "0");
//funcion que oculara el div de los cookies
function ocultarPolitica() {
  const boton = document.getElementById("botonPolitica");
  const politica = document.getElementById("politica");
  if (boton) {
      const poli = parseInt(localStorage.getItem("poli") ?? "0");
      boton.addEventListener("click", function () {
          if (politica && politica.style) {
              politica.style.display = "none";
              localStorage.setItem("poli", "1");
          }
      });
      if (poli == 1 && politica && politica.style) {
          politica.style.display = "none";
      }
  }
}

  