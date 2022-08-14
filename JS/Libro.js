var UrlLibros = 'http://localhost:90/G10_20/Controller/Libro.php?opc=GetLibros';

//var UrlLibro = 'http://20.216.41.245:90/G10_20/Controller/Libro.php?opc=InsertLibro';

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

