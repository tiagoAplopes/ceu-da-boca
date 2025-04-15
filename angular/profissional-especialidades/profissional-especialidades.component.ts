import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router} from '@angular/router';
import { Profissional } from 'src/app/models/profissional';
import { BuilderClass } from 'src/app/helpers/builderClass';
import { Sessao } from 'src/app/helpers/sessao';
import { Load } from 'src/app/helpers/load';
import { Especialidade } from 'src/app/models/Especialidade';
import { Urgencia } from 'src/app/models/Urgencia';
import { Servico } from 'src/app/helpers/servico';
import { Location } from '@angular/common';

@Component({
  selector: 'app-profissional-especialidades',
  templateUrl: './profissional-especialidades.component.html',
  styleUrls: ['./profissional-especialidades.component.scss'],
})
export class ProfissionalEspecialidadesComponent implements OnInit {

  constructor(
    private http:HttpClient,
    private router:Router,
    private location: Location
    ) { }

  ngOnInit() {
    window.scrollTo(500, 0);
    this.profissional = new Profissional(this.http)
    BuilderClass.builder(this.profissional, Sessao.getProfissional())
    this.carregaAlteracoes()
    this.verifyIOS()
  }

  especialidades: Especialidade[]
  urgencias: Urgencia[]
  error:string

  async goBack(){
    this.location.back()
  }

  async carregaAlteracoes(){
    Load.start()
    this.especialidades = await new Especialidade(this.http).todos()
    this.urgencias = await new Urgencia(this.http).todos()
    Load.stop()
  }

  existeEspecialidade(especialidade:Especialidade){
    for(let a of this.profissional.especialidades){
      if(parseInt(a.id) == parseInt(especialidade.id)){
        return true
      }
    }
    return false
  }

  existeUrgencia(urgencia:Urgencia){
    for(let a of this.profissional.urgencias){
      if(parseInt(a.id) == parseInt(urgencia.id)){
        return true
      }
    }
    return false
  }

  async salvar(){
    Load.start(true)

    this.profissional.especialidades = []
    //@ts-ignore
    for(let obj of document.querySelectorAll(".especialidade")){
      if(obj.checked){
        let especialidade = new Especialidade()
        especialidade.id = obj.value
        this.profissional.especialidades.push(especialidade)
      }
    }

    this.profissional.urgencias = []
    //@ts-ignore
    for(let obj of document.querySelectorAll(".urgencia")){
      if(obj.checked){
        let urgencia = new Urgencia()
        urgencia.id = obj.value
        this.profissional.urgencias.push(urgencia)
      }
    }

    try{
      this.profissional.csenha = this.profissional.senha
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
  profissional: Profissional

}
