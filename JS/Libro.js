var UrlLibros = 'http://localhost:90/G10_20/Controller/Libro.php?opc=GetLibros';

//http://localhost:90/G10_20/Controller/Libro.php?opc=GetLibros
//
var UrlInsertLibro = 'http://localhost:90/G10_20/Controller/Libro.php?opc=InsertLibro';

//var UrlLibro = 'http://20.216.41.245:90/G10_20/Controller/Libro.php?opc=GetLibro';

var UrlGetLibro = 'http://localhost:90/G10_20/Controller/Libro.php?opc=GetLibro';

//var UrlLibro = 'http://20.216.41.245:90/G10_20/Controller/Libro.php?opc=DeleteLibro';

var UrlUpdateLibro = 'http://localhost:90/G10_20/Controller/Libro.php?opc=UpdateLibro';

//var UrlLibro = 'http://20.216.41.245:90/G10_20/Controller/Libro.php?opc=UpdateLibro';

var UrlEliminarLibro = 'http://localhost:90/G10_20/Controller/Libro.php?opc=DeleteLibro';


//___________Funcion anónima que se va a ejecutar cada vez que el documento esté listo//
$(document).ready(function(){
    InicioLibreria();
});


//___________Función para mostrar los registros ya existentes
function InicioLibreria(){

    
    $.ajax({
        url: UrlLibros,
        type:'GET',
        datatype:'JSON',
        
        success: function(reponse){
            var MiItems = reponse;
            var Valores = '';

            //Iterar el conjunto de arreglos de la Api
            for(i=0; i < MiItems.length; i++){
                    //Construcción del HTML
                Valores += '<tr>'+

                    '<td>'+ MiItems[i].Cod_Libro +'</td>' +
                    '<td>'+ MiItems[i].Nombre_libro +'</td>' +
                    '<td>'+ MiItems[i].Nombre_escritor +'</td>' +
                    '<td>'+ MiItems[i].FechaPublicacion +'</td>' +
                    '<td>'+ MiItems[i].ISBN +'</td>'+
                    '<td>'+ MiItems[i].Precio +'</td>'+
                    '<td>'+ MiItems[i].Editorial +'</td>'+

                    '<td>'+  //Agregar un botón en la última columna para editar o actualizar
                    '<button class="btn btn-link" onclick="CargarLibro('+ MiItems[i].Cod_Libro +')">EDITAR</button'+
                    '</td>'+

                    '<td>'+  //Agregar un botón en la última columna eliminar 
                    '<button class="btn btn-link" onclick="EliminarLibro('+ MiItems[i].Cod_Libro +')">ELIMINAR</button'+
                    '</td>'+



                '</tr>'; 

                //Cargar la estructura HTML
                $('#DataLibros').html(Valores);
            }
        }

    })
}

//___________Función para agregar un registro nuevo
function InsertarLibro(){
    var infoLibro = {
        Cod_Libro :$('#Cod_Libro').val(),
        Nombre_libro :$('#Nombre_libro').val(),
        Nombre_escritor :$('#Nombre_escritor').val(),
        FechaPublicacion :$('#FechaPublicacion').val(),
        ISBN :$('#ISBN').val(),
        Precio :$('#Precio').val(),
        Editorial :$('#Editorial').val()
    };

    //Variable datosLibrosJson guardará la conversión de la cadena infoLibro a tipo JSON
    var datosLibrosJson = JSON.stringify(infoLibro)

    $.ajax({
        url: UrlInsertLibro, 
        type: 'POST',                    //Indicar el tipo de método
        data: datosLibrosJson,           //inidcar los datos a usarse
        datatype: 'JSON',                //Especificar que será tipo JSON      
        contenttype: 'aplication/json',  
        success: function(reponse){
            console.log(reponse);
            alert('Libro agregado con éxito.');         //Mensaje de confirmación
        },
        error: function(textStatus, errorThrown) {
            alert('Error al ingresar registro nuevo.' + textStatus + errorThrown)    //Mensaje de error
        }
    });

    alert('Aviso');
}


//___________Función para mostrar un registro específico 
function CargarLibro(Codigo_Libro) {

    var datosLibro = {
        Cod_Libro: Codigo_Libro
    };

    var datosLibrosJson = JSON.stringify(datosLibro);
    //alert(datos);

    $.ajax({
        url: UrlGetLibro,
        type: 'POST',
        data: datosLibrosJson,
        datatype: 'JSON',
        contentType: 'application/json',

        success: function (response) {  //Cargar los datos del libro seleccionado
            var MiItems = response;
            $('#Cod_Libro').val(MiItems[0].Cod_Libro);
            $('#Nombre_libro').val(MiItems[0].Nombre_libro);
            $('#Nombre_escritor').val(MiItems[0].Nombre_escritor);
            $('#FechaPublicacion').val(MiItems[0].FechaPublicacion);
            $('#ISBN').val(MiItems[0].ISBN);
            $('#Precio').val(MiItems[0].Precio);
            $('#Editorial').val(MiItems[0].Editorial);
            //Crear el botón actualizar
            var btnActualizar = '<input type="submit" id="btn_actualizar" onclick="ActualizarLibro(' + MiItems[0].Cod_Libro + ')"'+
            'value="ACTUALIZAR LIBRO" class="btn btn-link"></input>';
            $('#btnAgregarLibro').html(btnActualizar);   
        }
    });
}

//___________Función para actualizar un registro existente

function ActualizarLibro(Codigo_Libro) {
    var datosLibro = {
        Cod_Libro :Codigo_Libro,
        //Cod_Libro:$('#Cod_Libro').val(),
        Nombre_libro:$('#Nombre_libro').val(),
        Nombre_escritor:$('#Nombre_escritor').val(),
        FechaPublicacion:$('#FechaPublicacion').val(),
        ISBN:$('#ISBN').val(),
        Precio:$('#Precio').val(),
        Editorial:$('#Editorial').val()
    };
    
    var datosLibrosJson = JSON.stringify(datosLibro);

    alert(datosLibrosJson);

    $.ajax({
        url: UrlUpdateLibro,
        type: 'PUT',
        data: datosLibrosJson,
        datatype: 'JSON',
        contentType: 'application/json',

        success: function (reponse){
            console.log(reponse);
            alert("Libro actualizado con éxito");
        },
        error: function(textStatus, errorThrown) {
            alert('Error al actualizar información.' + textStatus + errorThrown)    //Mensaje de error
        }
        
    });

    alert('Aviso');

}


function EliminarLibro(Codigo_Libro){
    var datosLibro = {
        Cod_Libro: Codigo_Libro
    };

    var datosLibrosJson = JSON.stringify(datosLibro);

    $.ajax({
        url: UrlEliminarLibro,
        type: 'DELETE',
        data: datosLibrosJson,
        datatype: 'JSON',
        contenttype: 'aplication/json',

        success: function(response) {
            console.log(response);
        }
    });

    alert("Libro eliminado.");
    InicioLibreria();

}
