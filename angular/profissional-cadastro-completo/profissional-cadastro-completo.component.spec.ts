import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProfissionalCadastroCompletoComponent } from './profissional-cadastro-completo.component';

describe('ProfissionalCadastroCompletoComponent', () => {
  let component: ProfissionalCadastroCompletoComponent;
  let fixture: ComponentFixture<ProfissionalCadastroCompletoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfissionalCadastroCompletoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfissionalCadastroCompletoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
