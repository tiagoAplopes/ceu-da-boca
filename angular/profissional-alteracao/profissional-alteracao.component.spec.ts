import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProfissionalAlteracaoComponent } from './profissional-alteracao.component';

describe('ProfissionalAlteracaoComponent', () => {
  let component: ProfissionalAlteracaoComponent;
  let fixture: ComponentFixture<ProfissionalAlteracaoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfissionalAlteracaoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfissionalAlteracaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
