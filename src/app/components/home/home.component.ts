import { Component, OnInit, Inject } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  
})
export class HomeComponent implements OnInit {

  isLinear = false;
  generalFormGroup: FormGroup;
  personalFormGroup: FormGroup;
  ubicacionFormGroup: FormGroup;


  documento: string[] = [
    'Cedula de ciudadanía',
    'Pasaporte',
    'Cedula de extranjería'
  ];

  paises: string[]= [
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'Florida',
    'Georgia',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Pennsylvania',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming',
  ];

  genero: string[] = [
    'masculino',
    'femenino'
  ]

  fotoFrente: any;
  fotoReverso: any;

  constructor(
    private _formBuilder: FormBuilder,
    public dialogo: MatDialog
    ) {
    this.generalFormGroup = this._formBuilder.group({
      pais: [
        '',
        Validators.required
      ],
      genero: [
        '',
        Validators.required
      ],
      nombre: [
        '', 
        Validators.compose([
          Validators.maxLength(30),
          Validators.pattern('[a-zA-Z ]*'),
          Validators.required,
        ]),
      ],
      segundoNombre: [
        '',
        Validators.compose([
          Validators.maxLength(30),
          Validators.pattern('[a-zA-Z ]*'),
          Validators.required,
        ]),
      ],
      fecha: [
        '',
        Validators.required
      ],
      documento: [
        '',
        Validators.required,
      ],
      nDocumento: [
        '',
        Validators.compose([
          Validators.maxLength(15),
          Validators.minLength(5),
          Validators.pattern('^[0-9]+([.][0-9]*)?$'),
          Validators.required,
        ]),
      ],
      frente: [
        '',
        Validators.required,
      ],
      reverso: [
        '',
        Validators.required,
      ],
    });

    this.personalFormGroup = this._formBuilder.group({
      email: [
        '',
        Validators.compose([
          Validators.pattern('[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}'),
          Validators.required,
        ]),
      ],
      password: [
        '',
        Validators.compose([
          Validators.minLength(6),
          Validators.required
        ]),
      ],
      retype: [
        '',
        Validators.compose([
          Validators.minLength(6),
          Validators.required
        ]),
      ],
      telefono: [
        '',
        Validators.compose([
          Validators.pattern('[0-9]{1,10}' ),
          Validators.required,
        ]),
      ],
      celular: [
        '',
        Validators.compose([
          Validators.pattern('[0-9]{1,10}' ),
          Validators.required,
        ]),
      ],
    });

    this.ubicacionFormGroup= this._formBuilder.group({
      direccion: [
        '',
        Validators.compose([
          // Validators.pattern('a-zA-Z0-9'),
          Validators.required,
        ]),
      ],
      codigo: [
        '',
        Validators.compose([
          Validators.pattern('[0-9]{1,5}' ),
          // Validators.minLength(5),
          Validators.required,
        ]),
      ],
    });
  }

  ngOnInit(): void {

  }

  cargarFrente(event: any){
    this.fotoFrente = event.target.files[0].name;  
    console.log(this.fotoFrente);  
  }

  cargarReverso(event: any){
    this.fotoReverso = event.target.files[0].name
    // console.log(event);    
  }

  registro() {
    if (this.generalFormGroup && this.personalFormGroup && this.ubicacionFormGroup) {
      if (this.personalFormGroup.value.password == this.personalFormGroup.value.retype) {
        const form = {'pais': '', 'genero': '', 'primerNombre': '', 'segundoNombre': '', 'fecha' : '', 'documento': '', 'noDocumento': '', 'fotoFrente' : '', 'fotoReverso': '', 'correo': '', 'password': '', 'telefono': '', 'celular': '', 'direccion': '', 'codigo': '',};
        console.log(this.generalFormGroup.value.documento);
        
        form['pais'] = this.generalFormGroup.value.pais;
        form['genero'] = this.generalFormGroup.value.genero;
        form['primerNombre'] = this.generalFormGroup.value.nombre;
        form['segundoNombre'] = this.generalFormGroup.value.segundoNombre;
        form['fecha'] = this.generalFormGroup.value.fecha;
        form['documento'] = this.generalFormGroup.value.documento;
        form['noDocumento'] = this.fotoFrente;
        form['fotoFrente'] = this.fotoFrente;
        form['fotoReverso'] = this.fotoReverso;

        form['correo'] = this.personalFormGroup.value.email;
        form['password'] = this.personalFormGroup.value.password;
        form['telefono'] = this.personalFormGroup.value.telefono;
        form['celular'] = this.personalFormGroup.value.celular;

        form['direccion'] = this.ubicacionFormGroup.value.direccion;
        form['codigo'] = this.ubicacionFormGroup.value.codigo;

        console.log(form);

        this.mostrarDialogo();
        
      } else {
        alert('Los password no coinciden');
      }
    }
  }

  mostrarDialogo(): void {
    const dialogRef = this.dialogo.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: {name: 'Exisoto', },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }
  

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'confirmacion.html',
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
