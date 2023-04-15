import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  ngOnInit(): void {
    mostrarMenu()
  }
  title = 'frontend';
}

function mostrarMenu(){
  const boton = document.getElementById("boton");
  const minimenu = document.getElementById("minimenu");
  if (boton) {
    boton.addEventListener("click", function() {
      if (minimenu && minimenu.style) {
        if (minimenu.style.display === "none") {
          minimenu.style.display = "block";
        } else {
          minimenu.style.display = "none";
        }
      }
      
    });
  }
}