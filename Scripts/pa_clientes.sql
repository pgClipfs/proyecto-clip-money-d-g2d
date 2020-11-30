use dbHomeBank;
go

--Procedimiento mostrar
create proc pa_mostrar_clientes
as
select idCliente as ID, nombre as Nombre, apellido as Apellido, dni as DNI, pais as Pais, localidad as Localidad,
mail as Mail, telefono as Telefono, pass as Pass, usuario as Usuario
from Clientes
order by idCliente desc
go

--Procedimiento buscar por apellido
create proc pa_buscar_cliente
@valor varchar(50)
as
select idCliente as ID, nombre as Nombre, apellido as Apellido, dni as DNI, pais as Pais, localidad as Localidad,
mail as Mail, telefono as Telefono, pass as Pass, usuario as Usuario
from Clientes
where apellido like '%' + @valor + '%'
order by apellido desc;
go

--Procedimiento insertar
create proc pa_insertar_cliente
@nombre varchar(50), 
@apellido varchar (50), 
@dni int,
@pais varchar(50),
@localidad varchar(50),
@mail varchar(50),
@telefono varchar(30),
@pass varchar(50),
@usuario varchar(50)	
as
insert into Clientes (nombre, apellido, dni, pais, localidad, mail, telefono, pass, usuario)
values (@nombre, @apellido, @dni, @pais, @localidad, @mail, @telefono, @pass, @usuario)
go

--Procedimiento modificar
create proc pa_modificar_cliente
@idCliente bigint,
@nombre varchar(50),
@apellido varchar(50),
@dni int,
@pais varchar(25),
@localidad varchar(25),
@mail varchar(25),
@telefono bigint,
@pass varchar(10),
@usuario varchar(10)
as
update Clientes set nombre = @nombre,
apellido = @apellido,
dni = @dni,
pais = @pais,
localidad = @localidad,
mail = @mail,
telefono = @telefono,
usuario = @usuario,
pass = @pass
where dni = @dni
go

--Procedimiento eliminar
create proc pa_eliminar_cliente
@dni int
as
delete from Clientes
where dni = @dni
go

--Procedimiento insertar usuario (inserta un solo usuario con nombre y apellido
create procedure pa_insertar_usuario
@nombre varchar(50),
@apellido varchar(50)
as
insert into Clientes (nombre, apellido, dni, pais, localidad, mail, telefono, pass, usuario)
values (@nombre, @apellido, 35200123, 'argentina', 'Córdoba', 'test@gmail.com', '555555555', 'mypass', @nombre); 
go

--Procedimiento obtener login
create procedure pa_obtener_login
@usuario varchar(50),
@pass varchar(50)
as 
select idCliente as ID, nombre as Nombre, apellido as Apellido, dni as DNI, pais as Pais, localidad as Localidad,
mail as Mail, telefono as Telefono, pass as Pass, usuario as Usuario
from Clientes
where usuario like '%' + @usuario + '%' 
and pass = @pass;
go

