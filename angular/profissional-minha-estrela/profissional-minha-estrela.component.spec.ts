import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProfissionalMinhaEstrelaComponent } from './profissional-minha-estrela.component';

describe('ProfissionalMinhaEstrelaComponent', () => {
  let component: ProfissionalMinhaEstrelaComponent;
  let fixture: ComponentFixture<ProfissionalMinhaEstrelaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfissionalMinhaEstrelaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfissionalMinhaEstrelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
