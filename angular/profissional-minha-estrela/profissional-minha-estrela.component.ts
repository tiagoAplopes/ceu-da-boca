import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Sessao } from 'src/app/helpers/sessao';
import { Router } from '@angular/router';
import { Profissional } from 'src/app/models/profissional';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { BuilderClass } from 'src/app/helpers/builderClass';
import { HttpClient } from '@angular/common/http';
import { Load } from 'src/app/helpers/load';
import { Location } from '@angular/common';

@Component({
  selector: 'app-profissional-minha-estrela',
  templateUrl: './profissional-minha-estrela.component.html',
  styleUrls: ['./profissional-minha-estrela.component.scss'],
})
export class ProfissionalMinhaEstrelaComponent implements OnInit {
  verTudo = false

  constructor(
    private http:HttpClient,
    private router:Router,
    private location: Location
  ) { }

  @ViewChild('galeriaContainer') galeriaContainer: ElementRef;
  @ViewChild('inputFile') inputFile: ElementRef<HTMLInputElement>;

  changeVerTudo(){
    this.verTudo = !this.verTudo
  }

  scrollLeft() {
    this.galeriaContainer.nativeElement.scrollLeft -= 100; // Ajuste o valor conforme necessário
  }

  scrollRight() {
    this.galeriaContainer.nativeElement.scrollLeft += 100; // Ajuste o valor conforme necessário
  }

  async adicionarFoto(): Promise<any> {
    // Simula o clique no botão de seleção de arquivo
    this.inputFile.nativeElement.click();
  }

  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;

    if (inputElement.files && inputElement.files.length > 0) {
      const selectedFile = inputElement.files[0];
      this.uploadFoto(selectedFile);
    }
  }

  async uploadFoto(imagem: File): Promise<any> {
    const profissionalId = this.profissional.id; // Substitua pelo ID do profissional

    const formData = new FormData();
    formData.append('imagem', imagem);
    Load.start(true)

    try {
      const response: any = await this.http.post(`https://admin-ceu-da-boca.herokuapp.com/profissionais/${profissionalId}/upload_galeria.json`, formData).toPromise();
      this.atualizarGaleriaLocalStorage(response.imagem.url);
      BuilderClass.builder(this.profissional, Sessao.getProfissional())
    } catch (error) {
      console.error('Erro ao enviar imagem:', error);
      throw error;
    }
    Load.stop()
  }

  atualizarGaleriaLocalStorage(novoUrl: string): void {
    // Obtém o profissional do localStorage
    const profissionalString = localStorage.getItem('profissional');
    if (profissionalString) {
      const profissional = JSON.parse(profissionalString);
      
      // Adiciona o novo URL à galeria
      profissional.galeria.push(novoUrl);

      // Atualiza o profissional no localStorage
      localStorage.setItem('profissional', JSON.stringify(profissional));
    }
  }

  public profissional:Profissional

  public camera: Camera = new Camera()

  async goBack(){
    this.location.back()
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

  ngOnInit() {
    window.scrollTo(500, 0);
    this.profissional = new Profissional(this.http)
    BuilderClass.builder(this.profissional, Sessao.getProfissional())
    this.verifyIOS()
  }

  sair(){
    Sessao.removerProfissional()
    this.router.navigateByUrl("/login")
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
