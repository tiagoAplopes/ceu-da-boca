import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Profissional } from 'src/app/models/profissional';
import { BuilderClass } from 'src/app/helpers/builderClass';
import { Sessao } from 'src/app/helpers/sessao';
import { Servico } from 'src/app/helpers/servico';
import { Alteracao } from 'src/app/models/alteracao';
import { Load } from 'src/app/helpers/load';
import { Location } from '@angular/common';

@Component({
  selector: 'app-profissional-alteracao',
  templateUrl: './profissional-alteracao.component.html',
  styleUrls: ['./profissional-alteracao.component.scss'],
})
export class ProfissionalAlteracaoComponent implements OnInit {

  constructor(
    private http:HttpClient,
    private router:Router,
    private location:Location
    ) { }

  ngOnInit() {
    window.scrollTo(500, 0);
    this.profissional = new Profissional(this.http)
    BuilderClass.builder(this.profissional, Sessao.getProfissional())
    Servico.aplicarMascaras()
    this.carregaAlteracoes()
    this.verifyIOS()
  }

  async goBack(){
    this.location.back()
  }

  profissional: Profissional
  alteracoes: Alteracao[]
  error:string

  async carregaAlteracoes(){
    Load.start()
    this.alteracoes = await new Alteracao(this.http).todos()
    Load.stop()
  }

  existeAlteracao(alteracao:Alteracao){
    for(let a of this.profissional.alteracoes){
      if(parseInt(a.id) == parseInt(alteracao.id)){
        return true
      }
    }
    return false
  }

  async salvar(){
    Load.start(true)

    this.profissional.alteracoes = []
    //@ts-ignore
    for(let obj of document.querySelectorAll(".alteracao")){
      if(obj.checked){
        let alteracao = new Alteracao()
        alteracao.id = obj.value
        this.profissional.alteracoes.push(alteracao)
      }
    }

    try{
      await this.profissional.salvar()
      Sessao.setProfissional(this.profissional)
      this.router.navigateByUrl("/dentista/dados-salvo-sucesso")
    }
    catch(e){
      console.log(e)
      let erro = e.error
      if(!erro) erro = e
      this.error = Servico.formataMensagemErro(erro)
    }

    Load.stop()
  }
  getIOS(){
    var ua = navigator.userAgent;
    return ( ua.toLowerCase().match(/ipad/i) != null || ua.toLowerCase().match(/iphone/i) != null )
  }
  verifyIOS(){
    if(this.getIOS()){
      const dataContainer= document.querySelector("[data-js='container']")
      dataContainer.classList.add("padding-top-IOS")
    }
  }
}
