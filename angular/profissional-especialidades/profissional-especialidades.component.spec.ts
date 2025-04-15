import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProfissionalEspecialidadesComponent } from './profissional-especialidades.component';

describe('ProfissionalEspecialidadesComponent', () => {
  let component: ProfissionalEspecialidadesComponent;
  let fixture: ComponentFixture<ProfissionalEspecialidadesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfissionalEspecialidadesComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfissionalEspecialidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
