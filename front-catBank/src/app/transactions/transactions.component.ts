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
         document.getElementById('cbuValue').innerHTML = `${resp.valueOf()['cbu']}`
         document.getElementById('cvuValue').innerHTML = `${resp.valueOf()['cvu']}`
         document.getElementById('aliasValue').innerHTML = `${resp.valueOf()['alias']}`
        document.getElementById('saldoActual').innerHTML = `${resp.valueOf()['saldoPesos']}`
        const detalleCont= document.getElementById('detalleOperacion')
        console.log(detalleCont)
        console.log(resp)
        console.log(resp.valueOf()['alias'])
        resp['OPerCuenta'].forEach(o => {
          const detalleRowCont = document.createElement("div")
          detalleCont.appendChild(detalleRowCont)
          const fecha = document.createElement('div')
          fecha.classList.add('col-md-3')
          fecha.innerHTML = `${o['Fecha']}`
          const movimiento = document.createElement('div')
          movimiento.classList.add('col-md-4')
          movimiento.innerHTML = `${o['NombreOperacion']}`
          const destino = document.createElement('div')
          destino.classList.add('col-md-3')
          destino.innerHTML = `${o['Destino']}`
          const monto = document.createElement('div')
          monto.classList.add('col-md-3')
          monto.innerHTML = `${o['MontoPesos']}`
          detalleRowCont.classList.add('d-flex')
          detalleRowCont.classList.add('flex-row')
          detalleRowCont.classList.add('my-2') 
          detalleRowCont.appendChild(fecha)
          detalleRowCont.appendChild(movimiento)
          detalleRowCont.appendChild(destino)
          detalleRowCont.appendChild(monto)
          console.log(o['Destino'])
        });     
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
        document.getElementById('saldoActual').innerHTML = `${resp}`
        this.transactionsService.accountInfo()
      .subscribe( resp =>{
        const detalleCont= document.getElementById('detalleOperacion')
        detalleCont.innerHTML = ''
        resp['OPerCuenta'].forEach(o => {
          const detalleRowCont = document.createElement("div")
          detalleCont.appendChild(detalleRowCont)
          const fecha = document.createElement('div')
          fecha.classList.add('col-md-3')
          fecha.innerHTML = `${o['Fecha']}`
          const movimiento = document.createElement('div')
          movimiento.classList.add('col-md-4')
          movimiento.innerHTML = `${o['NombreOperacion']}`
          const destino = document.createElement('div')
          destino.classList.add('col-md-3')
          destino.innerHTML = `${o['Destino']}`
          const monto = document.createElement('div')
          monto.classList.add('col-md-3')
          monto.innerHTML = `${o['MontoPesos']}`
          detalleRowCont.classList.add('d-flex')
          detalleRowCont.classList.add('flex-row')
          detalleRowCont.classList.add('my-2') 
          detalleRowCont.appendChild(fecha)
          detalleRowCont.appendChild(movimiento)
          detalleRowCont.appendChild(destino)
          detalleRowCont.appendChild(monto)
          console.log(o['Destino'])
        });     
    },
    err =>{
      console.log(err)
    });
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
        document.getElementById('saldoActual').innerHTML = `${resp}`
        this.Modal()
        MsjeOperación.textContent =  `Operacíon sealizada con éxito. Su saldo es ${await resp}`
        this.transactionsService.accountInfo()
      .subscribe( resp =>{
        const detalleCont= document.getElementById('detalleOperacion')
        detalleCont.innerHTML = ''
        resp['OPerCuenta'].forEach(o => {
          const detalleRowCont = document.createElement("div")
          detalleCont.appendChild(detalleRowCont)
          const fecha = document.createElement('div')
          fecha.classList.add('col-md-3')
          fecha.innerHTML = `${o['Fecha']}`
          const movimiento = document.createElement('div')
          movimiento.classList.add('col-md-4')
          movimiento.innerHTML = `${o['NombreOperacion']}`
          const destino = document.createElement('div')
          destino.classList.add('col-md-3')
          destino.innerHTML = `${o['Destino']}`
          const monto = document.createElement('div')
          monto.classList.add('col-md-3')
          monto.innerHTML = `${o['MontoPesos']}`
          detalleRowCont.classList.add('d-flex')
          detalleRowCont.classList.add('flex-row')
          detalleRowCont.classList.add('my-2') 
          detalleRowCont.appendChild(fecha)
          detalleRowCont.appendChild(movimiento)
          detalleRowCont.appendChild(destino)
          detalleRowCont.appendChild(monto)
          console.log(o['Destino'])
        });     
    },
    err =>{
      console.log(err)
    });
       
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
    const MsjeOperación = document.querySelector('.MsjeOperación')
    var ingresarMont = document.getElementById('ingresar_giro')
    ingresarMont.classList.add("noVisible");
    this.transactionsService.giroAlDescubierto()
      .subscribe( async resp =>{
        this.Modal()
        MsjeOperación.textContent =  `Operacíon realizada con éxito. Retiró $${resp}`
        this.transactionsService.accountInfo()
      .subscribe( resp =>{
        const detalleCont= document.getElementById('detalleOperacion')
        document.getElementById('saldoActual').innerHTML = `${resp.valueOf()['saldoPesos']}`
        detalleCont.innerHTML = ''
        resp['OPerCuenta'].forEach(o => {
          const detalleRowCont = document.createElement("div")
          detalleCont.appendChild(detalleRowCont)
          const fecha = document.createElement('div')
          fecha.classList.add('col-md-3')
          fecha.innerHTML = `${o['Fecha']}`
          const movimiento = document.createElement('div')
          movimiento.classList.add('col-md-4')
          movimiento.innerHTML = `${o['NombreOperacion']}`
          const destino = document.createElement('div')
          destino.classList.add('col-md-3')
          destino.innerHTML = `${o['Destino']}`
          const monto = document.createElement('div')
          monto.classList.add('col-md-3')
          monto.innerHTML = `${o['MontoPesos']}`
          detalleRowCont.classList.add('d-flex')
          detalleRowCont.classList.add('flex-row')
          detalleRowCont.classList.add('my-2') 
          detalleRowCont.appendChild(fecha)
          detalleRowCont.appendChild(movimiento)
          detalleRowCont.appendChild(destino)
          detalleRowCont.appendChild(monto)
        });     
        
       
    },
    err =>{
      console.log(err)
    });
        
       
    },
    err =>{
      this.Modal()
      MsjeOperación.textContent =  `Lo sentimos, no se puede realizar esta operación.`
    });

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
        document.getElementById('saldoActual').innerHTML = resp
        this.transactionsService.accountInfo()
      .subscribe( resp =>{  
        const detalleCont= document.getElementById('detalleOperacion')
        detalleCont.innerHTML = ''
        resp['OPerCuenta'].forEach(o => {
          const detalleRowCont = document.createElement("div")
          detalleCont.appendChild(detalleRowCont)
          const fecha = document.createElement('div')
          fecha.classList.add('col-md-3')
          fecha.innerHTML = `${o['Fecha']}`
          const movimiento = document.createElement('div')
          movimiento.classList.add('col-md-4')
          movimiento.innerHTML = `${o['NombreOperacion']}`
          const destino = document.createElement('div')
          destino.classList.add('col-md-3')
          destino.innerHTML = `${o['Destino']}`
          const monto = document.createElement('div')
          monto.classList.add('col-md-3')
          monto.innerHTML = `${o['MontoPesos']}`
          detalleRowCont.classList.add('d-flex')
          detalleRowCont.classList.add('flex-row')
          detalleRowCont.classList.add('my-2') 
          detalleRowCont.appendChild(fecha)
          detalleRowCont.appendChild(movimiento)
          detalleRowCont.appendChild(destino)
          detalleRowCont.appendChild(monto)
        });     
    },
    err =>{
      console.log(err)
    });
       
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
