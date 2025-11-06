// import { Component, signal } from '@angular/core';
// import { Api } from './api';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.html',
//   standalone: false,
//   styleUrl: './app.css'
// })
// export class App {
//   protected readonly title = signal('Aichatbot');

//   constructor(public a: Api) {}

//   apiinput = '';
//   response = '';
//   chatdata:any[]=[];

//   askAi() {
//     this.a.generateText(this.apiinput).subscribe((res: any) => {
//       //console.log(res);
//       this.response = res.candidates[0].content.parts[0].text;
//             //this.apiRes= res.candidates[0].content.parts[0].text
// this.chatdata.push({
//       user:this.apiinput,
//       answer:this.response
//     });
//     this.apiinput='';
//     })

//   }
// }


// import { Component, signal, ChangeDetectorRef } from '@angular/core';
// import { Api } from './api';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.html',
//   standalone: false,
//   styleUrl: './app.css'
// })
// export class App {
//   protected readonly title = signal('Aichatbot');

//   constructor(public a: Api, private cdr: ChangeDetectorRef) {}

//   apiinput = '';
//   response = '';
//   chatdata: any[] = [];

//   askAi() {
//     this.a.generateText(this.apiinput).subscribe((res: any) => {
//       console.log(res); // check structure here
//       const answer =
//         res.candidates?.[0]?.content?.parts?.[0]?.text ||
//         res.candidates?.[0]?.content?.[0]?.parts?.[0]?.text ||
//         'No response';
//       this.response = answer;
//       this.chatdata.push({
//         user: this.apiinput,
//         answer: this.response
//       });
//       this.apiinput = '';
//       this.cdr.detectChanges(); // force refresh if needed
//     });
//   }
// }



import { Component, signal, ChangeDetectorRef } from '@angular/core';
import { Api } from './api';
import { FormsModule } from '@angular/forms';  // ✅ Import this
import { CommonModule } from '@angular/common'; // ✅ For *ngIf, *ngFor etc.

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule], // ✅ Add here
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Aichatbot');

  constructor(public a: Api, private cdr: ChangeDetectorRef) {}

  apiinput = '';
  response = '';
  chatdata: any[] = [];
  isLoading = false;

  askAi() {
    if (!this.apiinput.trim()) return;

    this.isLoading = true;
    this.response = '';

    this.a.generateText(this.apiinput).subscribe({
      next: (res: any) => {
        const answer =
          res.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';
        this.response = answer;
        this.chatdata.push({
          user: this.apiinput,
          answer: this.response
        });
        this.apiinput = '';
      },
      error: (err) => {
        console.error('Error:', err);
        this.response = '⚠️ Something went wrong.';
      },
      complete: () => {
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }
}
