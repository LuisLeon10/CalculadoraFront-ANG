import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CalculatorComponent } from './components/calculator/calculator/calculator.component';

export const routes: Routes = [
  { path: 'calculator', component: CalculatorComponent },
  { path: '**', redirectTo: 'calculator' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
