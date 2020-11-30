use master
go

if exists (select * from sysdatabases where name = 'dbHomeBank')
	begin
		drop database dbHomeBank				
end
go

create database dbHomeBank
go

use dbHomeBank;
go

create table Clientes(
	idCliente int primary key identity(1,1),
	nombre varchar (50) not null,
	apellido varchar (50) not null, 
	dni int not null,
	pais varchar(50) not null,
	localidad varchar(50) not null,
	mail varchar(50) not null,
	telefono varchar(30) not null,
	pass varchar(50) not null,
	usuario varchar(50) not null	
	);
	go

create table Cuentas(
	idCuenta int primary key identity(1,1),
	historial varchar(50) null,
	cbu varchar(50) not null, 
	alias varchar(50) not null,
	saldoPesos money null,
	estado varchar(50) not null,
	saldoDolares money null,
	cvu varchar(50) not null,
	idCliente int not null
	);
	go

create table Transacciones(
	idTransacciones int primary key identity(1,1),
	idTipoDeTransaccion int not null,	
	idCuenta int not null
	);
	go

create table TipoDeTransacciones(
	idTipoDeTransaccion int primary key identity(1,1),
	nombreTransaccion varchar(50) not null
	);
	go

create table DetalleTransacciones(
	idDetalleTransaccion int primary key identity(1,1),
	idTransacciones int not null,
	montoPesos money,
	tiempoPlazo date,
	destino bigint not null,
	fecha datetime not null,
	montoDolares money null
	);
	go

--creando relaciones entre tablas

--relacion clientes y cuentas
alter table Cuentas
	add constraint fk_Cuentas_reference_Clientes
	foreign key (idCliente) references Clientes(idCliente)
	go

--relacion cuenta transacciones
alter table Transacciones
	add constraint fk_Transacciones_reference_Cuentas
	foreign key (idCuenta) references Cuentas(idCuenta)
	go

--relacion transacciones y detalle transacciones
alter table DetalleTransacciones
	add constraint fk_DetalleTransacciones_reference_Transacciones
	foreign key (idTransacciones) references Transacciones(idTransacciones)
	go

--relacion transacciones y tipo de transacciones
alter table Transacciones
	add constraint fk_Transacciones_reference_TipoDeTransacciones
	foreign key (idTipoDeTransaccion) references TipoDeTransacciones(idTipoDeTransaccion)
	go



	


