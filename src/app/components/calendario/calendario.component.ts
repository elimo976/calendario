import { Component, ViewEncapsulation } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [MatToolbar, MatDatepickerModule, MatCardModule, CommonModule],
  templateUrl: './calendario.component.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './calendario.component.css',
  encapsulation: ViewEncapsulation.None
})
export class CalendarioComponent {
   arr1 : string[] = ['01-01-2025', '02-01-2025', '03-01-2025', '04-01-2025'];
   arr2 : string[] = ['09-02-2025', '10-02-2025'];
   arr3 : string[] = [];

   selected: Date | null = null;

   myTestDate = new Date(2025, 1, 9); // 09-02-2025


   ngOnInit() {
      // Converto arr1 e arr2 in array di oggetti Date
      const stringToDateArr1: Date[] = this.arr1.map(d => {
        return this.stringToDate(d);
      })

      const stringToDateArr2: Date[]= this.arr2.map( d => {
        return this.stringToDate(d);
      })

      // Trovo la data più piccola in arr1
      const minDate = new Date(Math.min(...stringToDateArr1.map(d => d.getTime())));

      const maxDate = new Date(Math.max(...stringToDateArr2.map( d => d.getTime())));

      // Converto di nuovo le date in stringa e le aggiungo ad arr3
      this.arr3.push(this.dateToString(minDate), this.dateToString(maxDate));

      console.log(this.arr3); // Debug

      // Converto arr3 in array di oggetti Date
      const stringToDateArr3: Date[] = this.arr3.map(d => {
        return this.stringToDate(d);
      })
      // Calcolo 30 giorni indietro nella data più piccola di arr3
      const minDateArr3 = new Date(Math.min(...stringToDateArr3.map(d => d.getTime())));
      const minDateMinus30 = new Date (minDateArr3);
      minDateMinus30.setDate(minDateMinus30.getDate() -30);

      this.arr3.push(this.dateToString(minDateMinus30));
      console.log('arr3 con la terza data anticipata di 30 giorni:', this.arr3); // Debug

      // Calcolo 30 giorni avanti nella data più grande di arr3
      const maxDateArr3 = new Date(Math.max(...stringToDateArr3.map(d => d.getTime())));
      const maxDatePlus30 = new Date (maxDateArr3);
      maxDatePlus30.setDate(maxDatePlus30.getDate() +30);

      this.arr3.push(this.dateToString(maxDatePlus30));
      console.log('arr3 con la quarta data posticipata di 30 giorni: ', this.arr3); // Debug

      // Elimino i doppioni da arr3
      this.arr3 = this.arr3.filter(date => !this.arr1.includes(date) && !this.arr2.includes(date));
      console.log('arr3 senza le date già presenti in arr1 e arr2: ', this.arr3);

   }

    // Assegno le classi CSS per le date degli array
    getDateClass(date: Date): string {
      const dateStr = this.dateToString(date);
      console.log('Checking date:', dateStr); // Per debugging

      let cssClass = '';

      if (this.arr1.includes(dateStr)) {
        cssClass = 'color-arr1';
      } else if (this.arr2.includes(dateStr)) {
        cssClass = 'color-arr2';
      } else if (this.arr3.includes(dateStr)) {
        cssClass = 'color-arr3';
      }

      console.log('Applying class:', cssClass); // Per debugging
      return cssClass; // Restituisce la classe
    }




   // Converto la stringa in oggetto Date per poter eseguire operazioni sulle date.
   private stringToDate(dateStr: string): Date {
    // Uso il destructuring per un codice più snello e leggibile, estraendo giorno, mese e anno separatamente
    const [day, month, year] = dateStr.split('-').map(Number);
    return new Date( year, month -1, day);
   }

   // Converto la data in stringa per poterla andare a gestire all'interno dell'array vuoto
   private dateToString(date: Date): string {
    // Uso padStart per riempire la stringa col carattere aggiuntivo 0 fino a raggiungere un massimo di 2 caratteri
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() +1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
   }
}
