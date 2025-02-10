import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalculatorService } from '../../../services/calculator.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css',
  providers: [CalculatorService],
})
export class CalculatorComponent {
  numbers: number[] = [];
  operators: string[] = [];
  result: string = '';
  error: string = '';
  isComplete: boolean = false;

  constructor(private calculatorService: CalculatorService) {}

  calculate() {
    if (this.result != '') {
      this.calculatorService.calculate(this.result).subscribe({
        next: (result: any) => {
          if (result.status == 'Ok') {
            this.result = result.result;
          } else if (result.status == 'Error') {
            this.error = result.message;
            this.result = '';
          }
          console.log(result.message);
        },
        error: (error: any) => console.log('Error al hacer el calculo', error),
      });
      this.error = '';
      this.isComplete = true;
    } else {
      this.error = 'Agrega valores';
    }
  }

  addValue(event: Event) {
    const btnValue = (event.target as HTMLButtonElement).value;
    const isNumber = !isNaN(Number(btnValue)) && btnValue.trim() !== '';
    const isFactorial = this.verifyFactorial(btnValue);

    if (this.isComplete) {
      this.resetValues();
      this.isComplete = false;
    }

    if (!isNumber) {
      if (this.result == '') {
        return;
      } else {
        if (isFactorial) {
          this.result += '!';
          this.calculate();
        } else {
          this.result += btnValue;
        }
      }
    } else if (isNumber) {
      this.result += btnValue;
    }

    const isValid = this.verifyDuplicatesOperations(this.result);
    if (!isValid) {
      this.error =
        'No es valida la entrada que se está recibiendo, reiniciando en 2 seg...';
      setTimeout(() => {
        this.resetValues();
      }, 2000);
    }
  }

  verifyFactorial(btnValue: string) {
    const factorialWord = 'FACTORIAL';
    const isFactorial: boolean = btnValue.includes(factorialWord);

    return isFactorial;
  }

  verifyDuplicatesOperations(values: string) {
    const operators = new Set(['+', '-', '*', '/', '!']);
    let lastChar = '';

    for (const char of values) {
      if (operators.has(char)) {
        if (operators.has(lastChar)) {
          return false;
        }
      }
      lastChar = char;
    }

    return true;
  }

  resetValues() {
    this.result = '';
    this.error = '';
    this.operators = [];
    this.numbers = [];
  }

  // completeCalc() {
  //   this.error = '';
  //   this.operators = [];
  //   this.numbers = [];
  // }

  deleteValue() {
    this.result = this.result.slice(0, -1);
  }
}
