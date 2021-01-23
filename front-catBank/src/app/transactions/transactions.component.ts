import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { OperatoriaPesos } from '../models/operatoriaPesos';
import { OperatoriaPesosService } from '../services/operatoria-pesos.service';
import { HttpRequest } from '@angular/common/http';
import { TransferenciaPesos } from '../models/transferenciaModel';


@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  public OperatoriaPesos: OperatoriaPesos[];
  public TransferenciaPesos: TransferenciaPesos[];
  selectedingresarSaldo: OperatoriaPesos = new OperatoriaPesos();
  selectedTransferirSaldo: TransferenciaPesos = new TransferenciaPesos();
  setValue() {
    this.selectedTransferirSaldo.Id = localStorage.getItem('Cliente')
    this.selectedingresarSaldo.Id = localStorage.getItem('Cliente')
  }
  transferirSaldoForm = new FormGroup({
    Id: new FormControl(localStorage.getItem('Cliente')),
    Monto: new FormControl(),
    Alias: new FormControl({value: null}),
    Cbu: new FormControl({value: null}),
  })

  ingresarSaldoForm = new FormGroup({
    Id: new FormControl(localStorage.getItem('Cliente')),
    Monto: new FormControl(),
  })

  constructor(private transactionsService: OperatoriaPesosService,  private router: Router) { }

  ngOnInit(): void {
    this.transactionsService.accountInfo()
      .subscribe( resp =>{
        console.log(resp)
        console.log(resp.valueOf()['alias'])
        resp['OPerCuenta'].forEach(o => {
          console.log(o['Destino'])
        });
        
        function getPropertyNames(resp) {
          var proto = Object.getPrototypeOf(resp);
          return (
              (typeof proto === 'object' && proto !== null ? getPropertyNames(proto) : [])
              .concat(Object.getOwnPropertyNames(resp))
              .filter(function(item, pos, result) { return result.indexOf(item) === pos; })
              .sort()
          );
      }
      
        
    },
    err =>{
      console.log(err)
    });
  }


  //Hace visible el input para ingresar dinero 

  //Hace visible el input para ingresar dinero 
  public verRetirarMonto() {
    var ingresarMont = document.getElementById('ingresar_monto')
    ingresarMont.classList.remove("noVisible");
    var ingresarMont = document.getElementById('ingresar_monto_retirar')
    ingresarMont.classList.add("noVisible");
  }

  //Hace visible el input para retirar dinero 

  public verIngresarMonto() {
    var ingresarMont = document.getElementById('ingresar_monto_retirar')
    ingresarMont.classList.remove("noVisible");
    var ingresarMont = document.getElementById('ingresar_monto')
    ingresarMont.classList.add("noVisible");
  }

  //Acepta el monto ingresado   

  public ingresarAceptarMonto(form: NgForm, IngresarSaldo: OperatoriaPesos ) {
    var ingresarMont = document.getElementById('ingresar_monto')
    const MsjeOperación = document.querySelector('.MsjeOperación')
    ingresarMont.classList.add("noVisible");
    this.setValue() 
    console.log(IngresarSaldo)
    console.log(form)
    this.transactionsService.ingresarSaldo(IngresarSaldo)
      .subscribe( resp =>{
        this.Modal()
        MsjeOperación.textContent =  `Operacíon sealizada con éxito. Su saldo es ${resp}`
        const saldoActual = document.getElementById('saldoActual')
        console.log(saldoActual)
        saldoActual.innerHTML = resp
    },
    err =>{
      this.Modal()
      MsjeOperación.textContent =  `Lo sentimos, no se puede realizar esta operación.`
    });
  }
  // Cancela el ingreso de saldo 
  public cancelarAceptarMonto( ) {
    var ingresarMont = document.getElementById('ingresar_monto')
    ingresarMont.classList.add("noVisible");
  }

  //Acepta el monto a retirar   

  public retirarAceptarMonto(form: NgForm, IngresarSaldo: OperatoriaPesos) {
    var ingresarMont = document.getElementById('ingresar_monto_retirar')
    const MsjeOperación = document.querySelector('.MsjeOperación')
    ingresarMont.classList.add("noVisible");
    this.setValue() 
    this.transactionsService.retirarSaldo(IngresarSaldo)
      .subscribe( async resp =>{
        this.Modal()
        MsjeOperación.textContent =  `Operacíon sealizada con éxito. Su saldo es ${await resp}`
        const saldoActual = document.getElementById('saldoActual')
        console.log(saldoActual)
        saldoActual.innerHTML = resp
       
    },
    err =>{
      this.Modal()
      MsjeOperación.textContent =  `Lo sentimos, no se puede realizar esta operación.`
    });
  }

  // Cancela retiro
  public cancelarRetiro() {
    var ingresarMont = document.getElementById('ingresar_monto_retirar')
    ingresarMont.classList.add("noVisible");
  }
  //Hace visible el input del giro 

  public giro() {
    var ingresarMont = document.getElementById('ingresar_giro')
    ingresarMont.classList.remove("noVisible");
  }

  //Acepta el monto ingresado   

  public aceptarGiro() {
    var ingresarMont = document.getElementById('ingresar_giro')
    ingresarMont.classList.add("noVisible");
  }

  //Cancela el monto ingresado   

  public cancelarGiro() {
    var ingresarMont = document.getElementById('ingresar_giro')
    ingresarMont.classList.add("noVisible");
  }


   //Hace visible el input del prestamo

   public prestamo() {
    var ingresarMont = document.getElementById('ingresar_prestamo')
    ingresarMont.classList.remove("noVisible");
  }

  //Acepta el monto ingresado   

  public aceptarPrestamo(form: NgForm, TransferirSaldo: TransferenciaPesos) {
    const MsjeOperación = document.querySelector('.MsjeOperación')
    var ingresarMont = document.getElementById('ingresar_prestamo')
    console.log(form)
    console.log(TransferirSaldo)
    ingresarMont.classList.add("noVisible");
    this.setValue() 
    this.transactionsService.transferenciaSaldo(TransferirSaldo)
      .subscribe( async resp =>{
        this.Modal()
        MsjeOperación.textContent =  `Operacíon sealizada con éxito. Su saldo es ${await resp}`
        const saldoActual = document.getElementById('saldoActual')
        console.log(saldoActual)
        saldoActual.innerHTML = resp
       
    },
    err =>{
      this.Modal()
      MsjeOperación.textContent =  `Lo sentimos, no se puede realizar esta operación.`
    });
  }

  //Cancela el monto ingresado   

  public cancelarPrestamo() {
    var ingresarMont = document.getElementById('ingresar_prestamo')
    ingresarMont.classList.add("noVisible");
  }
  public Modal(){
    let mailInput= document.getElementById("modal_popup")
    console.log(mailInput)
    mailInput.style.display = "flex"
    document.querySelector('.close-btn').addEventListener('click', ()=> {
    mailInput.style.display = "none"
  })
}








}
