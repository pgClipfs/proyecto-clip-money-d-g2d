--insertando datos

use dbHomeBank;
go

--en tabla Clientes
insert into Clientes (nombre, apellido, dni, pais, localidad, mail, telefono, pass, usuario) values
	('Juan', 'Topo', 235698528, 'Argentina', 'Córdoba', 'juantopo@hotmail.com', '3512006985', 'xxxx', 'usuariotopo'),
	('Maria', 'Gambarte', 40123698, 'Chile', 'La Serena', 'mariagambarte@hotmail.com', '3516987102', 'maria', 'maria'),
	('Fernando', 'Martinez', 36211025, 'Argentina', 'Corrientes', 'fernandomartinez@hotmail.com', '3514562014', 'fer', 'ferty');

--en tabla Cuentas
insert into Cuentas (historial, cbu, alias, saldoPesos, estado, saldoDolares, cvu, idCliente) values
	('historial 1', '5698741025896321578521', 'fernandoalia1', 2000, 'estado1', 2, '6584120258965410148520', 3),
	('historial 2', '7520136985210456752013', 'mariaalias2', 3000, 'estado', 5, '9874102569852102365489', 2);

--en tabla Tipo de Transacciones
insert into TipoDeTransacciones (nombreTransaccion) values
	('compra'),
	('venta');

--en tabla Transacciones
insert into Transacciones (idTipoDeTransaccion, idCuenta) values
	(2, 1),
	(1, 2);

--en tabla Detalle de Transacciones
insert into DetalleTransacciones (idTransacciones, montoPesos, tiempoPlazo, destino, fecha, montoDolares) values
	(1, 2500, convert(datetime, '03-10-2020'), 1202, convert(datetime, '01-10-2020'), 2500),
	(1, 2500, convert(datetime, '03-09-2020'), 1202, convert(datetime, '10-09-2020'), 4000);


	select * from DetalleTransacciones


	



