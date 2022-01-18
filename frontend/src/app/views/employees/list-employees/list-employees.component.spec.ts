// import { MatTableModule } from "@angular/material/table";
// import { ListEmployeesComponent } from "./list-employees.component";
// import { RouterTestingModule } from '@angular/router/testing';
// import { EmployeesService } from "src/app/services/employees.service";
// import { of } from "rxjs";
// import { Employee } from "src/app/models/employee.model";

// describe(ListEmployeesComponent.name, () => {
//     let fixture: ComponentFixture<ListEmployeesComponent:
//     let componet: ListEmployeesComponent;
//     let employeesService: EmployeesService;

//     beforeEach(() => {
//         TestBed.configureModule({
//             declares: [ListEmployeesComponent]
//             imports: [
//                 MatTableModule,
//                 RouterTestingModule,
//             ]
//         })
//     });
    

//     beforeEach(() => {
//         fixture = TestBed.createComponent(ListEmployeesComponent);
//         componet = fixture.componentInstance;
//         employeesService= TestBed.inject(EmployeesService);

//         fixture.detectChanges():
//     });
    

//     it('should be initialize',() => {
//         spyOn(employeesService, 'findEmployees').and.returnValue(of([new Employee()]))

//         componet.loadEmployees();

//         expect(employeesService.findEmployees).toHaveBeCalled();
//         expect(componet.employees[0].length).toEqual(1);
//     })
// });