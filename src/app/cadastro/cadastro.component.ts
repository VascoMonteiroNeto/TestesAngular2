import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { DiasDaSemana } from './../dias-da-semana.enum';
import { Produto } from './../objetos/Produto';
import { ProdutoService } from './../service/produto.service';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  id: any;
  produto: Produto = new Produto( 0,'', 0)
  opt: string = "Salvar"

  constructor(
    private router: Router, 
    private activateRoute: ActivatedRoute,
    private prodService: ProdutoService
    ) {    }

  ngOnInit(): void {
    
    this.activateRoute.params.subscribe(parametros =>{
      if(parametros['id']){
        this.opt = "Editar"
        this.id=parametros['id']
        this.prodService.buscarItemId(this.id).subscribe(prod =>{
          this.produto = prod
        })
      }
    })

    
  }

  testeOpt = () =>{
    if (this.opt=='Salvar'){
      this.adicionar();
    } else {
      this.editar();
    }
  }

  adicionar = () => {
    this.prodService.adicionar(this.produto).subscribe(
      success => this.navegar('home'),
      error => console.log(`Deu ruim`),
      () => console.log("Requisição completa!")
    )
  }

  editar = () =>{
    this.prodService.editar(this.produto).subscribe(
      success => this.navegar('home'),
      error => console.log(`Deu ruim`),
      () => console.log("Requisição completa!")
    )
  }
  

  navegar = (rota: any) => {
    this.router.navigate([rota]);
  }
}
