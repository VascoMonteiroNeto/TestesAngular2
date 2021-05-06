import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Produto } from '../objetos/Produto';
import {ProdutoService} from './../service/produto.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  prod: any
  produtos: Array <Produto> = []
  carregarLoading: boolean = false

  constructor(
    private produtoService: ProdutoService,
    private router : Router) 
    { }

  ngOnInit(): void {
    this.produtoService.listar().subscribe(prods => {
      setTimeout(()=>{
        this.carregarLoading = true
        this.produtos = prods
      }, 100)
      
    }) 

  }

  excluirItem = (id: any) =>{
    console.log(id)
    this.produtoService.excluirItem(id).subscribe(
      success => this.ngOnInit(),
      error => console.log(`Deu ruim`),
      () => console.log("Requisição completa!")
    )
    this.ngOnInit();
  }

  editar = (id:any)=>{
    this.router.navigate(['cadastro', id])
  }

}
