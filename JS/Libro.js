var UrlLibros = 'http://localhost:90/G10_20/Controller/Libro.php?opc=GetLibros';

//http://20.216.41.245:90/G10_20/Controller/Libro.php?opc=GetLibros

var UrlInsertLibro = 'http://localhost:90/G10_20/Controller/Libro.php?opc=InsertLibro';

//var UrlLibro = 'http://20.216.41.245:90/G10_20/Controller/Libro.php?opc=GetLibro';

//var UrlLibro = 'http://20.216.41.245:90/G10_20/Controller/Libro.php?opc=DeleteLibro';

//var UrlLibro = 'http://20.216.41.245:90/G10_20/Controller/Libro.php?opc=UpdateLibro';


//___________Funcion anónima que se va a ejecutar cada vez que el documento esté listo//
$(document).ready(function(){
    InicioLibreria();
});

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
                '</tr>'; 

                //Cargar la estructura HTML
                $('#DataLibros').html(Valores);
            }
        }

    })
}

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
        type: 'POST',
        data: datosLibrosJson,
        datatype: 'JSON',
        contenttype: 'aplication/json',
        success: function(reponse){
            console.log(reponse);
            alert('Libro agregado con éxito.');
        },
        error: function(textStatus, errorThrown) {
            alert('Error al ingresar registro nuevo.' + textStatus + errorThrown)
        }
    });

    alert('Aviso');
}

