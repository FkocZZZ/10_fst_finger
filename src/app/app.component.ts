import { NgClass, NgIf } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf, NgClass, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'myapp';
  time = 30;
  myWords = ['hello', 'world', 'name', 'int'];
  word = '';
  point = 0;

  input = '';
  buttons = [
    {
      top: ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    },
    {
      middle: ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    },
    {
      bottom: ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
    },
  ];

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key == 'Enter') {
      console.log(this.input)
      if (this.input == this.word) {
        this.input = '';
        this.point+=1;
        this.randomWord();
      } else {
        this.input = '';
        this.point -=1;
        this.point=Math.max(0,this.point -1);
        this.randomWord()
      }
    }
  }
  constructor() {}
  randomWord(){
    let index = Math.floor(Math.random() * this.myWords.length);
        console.log(index);
        this.word = this.myWords[index];
  }
  startGame() {
    this.randomWord();
    this.point=0;
    let timeInterval = setInterval(() => {
      this.time--;
      console.log(this.time);
      this.randomWord();
      if (this.time === 0) {
        clearInterval(timeInterval);
        this.time += 30;
      }
    }, 5000);
  }
}
