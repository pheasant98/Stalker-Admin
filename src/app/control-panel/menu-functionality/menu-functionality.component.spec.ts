import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuFunctionalityComponent } from './menu-functionality.component';
import {DataService} from '../../services/data.service';
import {By} from '@angular/platform-browser';

describe('MenuFunctionalityComponent', () => {
  let component: MenuFunctionalityComponent;
  let fixture: ComponentFixture<MenuFunctionalityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuFunctionalityComponent ],
      providers: [ DataService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuFunctionalityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should tag span to contain "Tracciamento"', () => {
    expect(fixture.debugElement.query(By.css('#span1')).nativeElement.innerText).toContain('Tracciamento');
  });

  it('should tag span to contain "Monitoraggio utenti"', () => {
    expect(fixture.debugElement.query(By.css('#l1')).nativeElement.innerText).toContain('Monitoraggio utenti');
  });

  it('should tag span to contain "Informazioni sull\'organizzazione"', () => {
    expect(fixture.debugElement.query(By.css('#l2')).nativeElement.innerText).toContain('Informazioni sull\'organizzazione');
  });

  it('should call updateContent in "Tracciamento"', async(() => {
    spyOn(component, 'updateContent');
    const createButton = fixture.debugElement.query(By.css('#span1'));
    createButton.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.updateContent).toHaveBeenCalled();
  }));

  it('should call updateContent in "Monitoraggio utenti"', async(() => {
    spyOn(component, 'updateContent');
    const createButton = fixture.debugElement.query(By.css('#l1'));
    createButton.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.updateContent).toHaveBeenCalled();
  }));

  it('should call updateContent in "Informazioni sull\'organizzazione"', async(() => {
    spyOn(component, 'updateContent');
    const createButton = fixture.debugElement.query(By.css('#l2'));
    createButton.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.updateContent).toHaveBeenCalled();
  }));
});
