import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxCarouselComponent } from './ngx-carousel.component';
import { NgxHmCarouselModule } from 'ngx-hm-carousel';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from 'src/app/services/user.service';
import { ProjectService } from 'src/app/services/project.service';
import { MockProjectService } from 'src/app/mocks/mock-project-service';

describe('NgxCarouselComponent', () => {
	let component: NgxCarouselComponent;
	let fixture: ComponentFixture<NgxCarouselComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [NgxCarouselComponent],
			imports: [FormsModule, ReactiveFormsModule, NgxHmCarouselModule,
				HttpClientTestingModule, RouterTestingModule],
			providers: [{provide: ProjectService, useClass: MockProjectService}]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(NgxCarouselComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});
	afterEach(() =>{
        fixture.destroy();
    });

	it('should create', () => {
		expect(component).toBeTruthy();
	});
	
	it('should create stuff', () => {
		expect(component.index).toBe(0);
		expect(component.speed).toBe(2000);
		expect(component.infinite).toBe(true);
		expect(component.direction).toBe('right');
		expect(component.directionToggle).toBe(true);
		expect(component.autoplay).toBe(true);
		expect(component.avatars).toBeTruthy();
	});

	it('should add picture after pushing', () => {
		let frame = 'https://picsum.photos/600/400/1';
		component.ngOnInit();
		expect(component.avatars.length).toBe(5);
		component.push(frame);
		expect(component.avatars.length).toBe(6);
	});

	it('should change on indexChange', () => {
		let frame = 'https://picsum.photos/600/400/1';
		component.indexChanged(1)
		expect(component.testValue).toBe(1);
	});
});
