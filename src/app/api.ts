import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Api {
  private apiKey = 'AIzaSyBE2GH__D21p5u1-pXkj3_lDE7qrh1_2ZM';
  private model = 'gemini-1.5-flash'; // ✅ use existing model
  private url ='https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyBE2GH__D21p5u1-pXkj3_lDE7qrh1_2ZM';
//private url = `https://generativelanguage.googleapis.com/v1beta/models/${this.model}:generateContent?key=${this.apiKey}`;

  constructor(private hc: HttpClient) {}

  generateText(prompt: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-goog-api-key': this.apiKey,
    });

    const body = {
      contents: [
        {
          role: 'user',
          parts: [{ text: prompt }],
        },
      ],
    };

    return this.hc.post(this.url, body, { headers });
  }


}


// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { environment } from '../environments/environment';

// @Injectable({
//   providedIn: 'root',
// })
// export class Api {
//   private apiKey = environment.geminiApiKey;
//   private url = `${environment.geminiApiUrl}?key=${this.apiKey}`;

//   constructor(private hc: HttpClient) {}

//   generateText(prompt: string) {
//     const headers = new HttpHeaders({
//       'Content-Type': 'application/json',
//       'x-goog-api-key': this.apiKey,
//     });

//     const body = {
//       contents: [
//         {
//           role: 'user',
//           parts: [{ text: prompt }],
//         },
//       ],
//     };

//     return this.hc.post(this.url, body, { headers });
//   }
// }
