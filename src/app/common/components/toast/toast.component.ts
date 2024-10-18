import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { N3000 } from '../../utils/enum';

type ToastProps = {
  icon: './assets/img/error.png' | './assets/img/success.png' | './assets/img/warning.png';
  color: 'text-green-500' | 'text-red-500' | 'text-orange-500';
  spam: 'Check icon' | 'Error icon' | 'Warning icon';
  bgColor: 'bg-teal-100' | 'bg-red-100' | 'bg-orange-100';
}


@Component({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  standalone: true,
  imports: [CommonModule]
})

export class ToastComponent implements OnInit{

  @Input() message = '';
  @Input() type = 'success';
  @Output() close = new EventEmitter<boolean>();
  public dataTaoast: ToastProps = {
    icon: './assets/img/success.png',
    color: 'text-green-500',
    spam: 'Check icon',
    bgColor: 'bg-teal-100'
  };

  ngOnInit(): void {
    this.dataToastAsing();
    this.automaticClose();
  }

  dataToastAsing(){
    switch (this.type) {
      case 'success':
        this.datadefault();
        break;
      case 'error':
        this.dataTaoast = {
          icon: './assets/img/error.png',
          color: 'text-red-500',
          spam: 'Error icon',
          bgColor: 'bg-red-100'
        };
        break;
      case 'warning':
        this.dataTaoast = {
          icon: './assets/img/warning.png',
          color: 'text-orange-500',
          spam: 'Warning icon',
          bgColor: 'bg-orange-100'
        };
        break;
      default: 
        this.datadefault();
        break;
    }
  }

  datadefault(){
    this.dataTaoast = {
      icon: './assets/img/success.png',
      color: 'text-green-500',
      spam: 'Check icon',
      bgColor: 'bg-teal-100'
    };
  }

  automaticClose(){
    setTimeout(() => {
      this.close.emit(true);
    }, N3000);
  }

}
