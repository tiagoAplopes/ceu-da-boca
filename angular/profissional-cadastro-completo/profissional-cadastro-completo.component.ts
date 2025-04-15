import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Sessao } from 'src/app/helpers/sessao';
import { Profissional } from 'src/app/models/profissional';
import { Servico } from 'src/app/helpers/servico';
import { Load } from 'src/app/helpers/load';
import { BuilderClass } from 'src/app/helpers/builderClass';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Location } from '@angular/common';

@Component({
  selector: 'app-profissional-cadastro-completo',
  templateUrl: './profissional-cadastro-completo.component.html',
  styleUrls: ['./profissional-cadastro-completo.component.scss'],
})
export class ProfissionalCadastroCompletoComponent implements OnInit {

  estadosBrasil = [
    { sigla: 'AC', nome: 'Acre' },
    { sigla: 'AL', nome: 'Alagoas' },
    { sigla: 'AP', nome: 'Amapá' },
    { sigla: 'AM', nome: 'Amazonas' },
    { sigla: 'BA', nome: 'Bahia' },
    { sigla: 'CE', nome: 'Ceará' },
    { sigla: 'DF', nome: 'Distrito Federal' },
    { sigla: 'ES', nome: 'Espírito Santo' },
    { sigla: 'GO', nome: 'Goiás' },
    { sigla: 'MA', nome: 'Maranhão' },
    { sigla: 'MT', nome: 'Mato Grosso' },
    { sigla: 'MS', nome: 'Mato Grosso do Sul' },
    { sigla: 'MG', nome: 'Minas Gerais' },
    { sigla: 'PA', nome: 'Pará' },
    { sigla: 'PB', nome: 'Paraíba' },
    { sigla: 'PR', nome: 'Paraná' },
    { sigla: 'PE', nome: 'Pernambuco' },
    { sigla: 'PI', nome: 'Piauí' },
    { sigla: 'RJ', nome: 'Rio de Janeiro' },
    { sigla: 'RN', nome: 'Rio Grande do Norte' },
    { sigla: 'RS', nome: 'Rio Grande do Sul' },
    { sigla: 'RO', nome: 'Rondônia' },
    { sigla: 'RR', nome: 'Roraima' },
    { sigla: 'SC', nome: 'Santa Catarina' },
    { sigla: 'SP', nome: 'São Paulo' },
    { sigla: 'SE', nome: 'Sergipe' },
    { sigla: 'TO', nome: 'Tocantins' }
  ];

  constructor(
    private http:HttpClient,
    private router:Router,
    private location: Location
  ) { }

  ngOnInit() {
    window.scrollTo(500, 0);
    this.profissional = new Profissional(this.http)
    BuilderClass.builder(this.profissional, Sessao.getProfissional())
    Servico.aplicarMascaras()
    this.verifyIOS()
  }

  profissional:Profissional
  editarSenha: boolean = false
  error:string
  public camera: Camera = new Camera()

  buscaCep(){
    Servico.buscaCep(this, 'profissional')
  }
  
  editarSenhaAgora(){
    this.editarSenha = true
  }

  async goBack(){
    this.location.back()
  }

  async salvar(){
    Load.start(true)
    try{
      if(this.profissional.nome == "" && this.profissional.razao_social == ""){
        throw "Nome ou Razão Social não pode ficar em branco"
      }

      if(this.profissional.cpf == "" && this.profissional.cnpj == ""){
        throw "CPF ou CNPJ não pode ficar em branco"
      }

      if(this.profissional.email == ""){
        throw "Email não pode ficar em branco"
      }
      
      if(this.profissional.cro == ""){
        throw "CRO não pode ficar em branco"
      }

      if(this.profissional.estado_cro == ""){
        throw "Estado CRO não pode ficar em branco"
      }

      if(this.profissional.whatsapp == ""){
        throw "Whatsapp não pode ficar em branco"
      }

      if(this.profissional.cep == ""){
        throw "CEP não pode ficar em branco"
      }

      if(this.profissional.bairro == ""){
        throw "Bairro não pode ficar em branco"
      }

      if(this.profissional.cidade == ""){
        throw "Cidade não pode ficar em branco"
      }

      if(this.editarSenha){
        if(this.profissional.senha == ""){
          throw "Senha não pode ficar em branco"
        }
  
        if(this.profissional.senha != this.profissional.csenha){
          throw "Senha não bate com a confirmação de senha"
        }
      }
  
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

  getCamera(){
    try{
      const options: CameraOptions = {
        quality: 80,
        destinationType: this.camera.DestinationType.DATA_URL,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        encodingType: this.camera.EncodingType.JPEG,
        saveToPhotoAlbum: false,
        allowEdit: true,
        targetWidth: 500,
        targetHeight: 500,
        correctOrientation:true
      }
  
      this.camera.getPicture(options).then(async (imageData) => {
        let base64Image = 'data:image/jpeg;base64,' + imageData;
        this.profissional.foto = base64Image
        Load.start()
        await this.profissional.salvar()
        Load.stop()
      }, (err) => {
        alert(JSON.stringify(err))
      });
    }
    catch(e){
      alert(JSON.stringify(e))
    }
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
