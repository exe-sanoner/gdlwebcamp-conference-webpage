// 1) PROBAMOS QUE SE EJECUTE UNA SOLA VEZ
(function (){
    "use strict";

    var regalo = document.getElementById('regalo');

    document.addEventListener('DOMContentLoaded', function(){


        // MAPA DE LEAFLETJS.COM

        if( document.getElementById('mapa') ) {                         // Solo para que funcione en las paginas donde este el DIV MAPA
            var map = L.map('mapa').setView([-31.648896, -60.711006], 15);   // 'mapa' es un DIV o SECTION ya creado. 15 es el ZOOM

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            L.marker([-31.648896, -60.711006]).addTo(map)                       // Coordenadas del PIN, las mismas que el mapa arriba
                .bindPopup('GDLWebCamp 2020 <br> Boletos ya disponibles')    // POPUP: Texto que aparece en el PIN siempre FIJO
                .openPopup()
                .bindTooltip('byExequielSanoner')    // Agrego un Tooltip, cuando me paro arriba aparece el texto
                .openTooltip()
        }

        // 2) AGREGO VARIABLES

        // CAMPOS DATOS USUARIO
        var nombre = document.getElementById('nombre');
        var apellido = document.getElementById('apellido');
        var email = document.getElementById('email');

        // CAMPOS PASES
        var pase_dia = document.getElementById('pase_dia');
        var pase_dosdias = document.getElementById('pase_dosdias');
        var pase_completo = document.getElementById('pase_completo');

        // BOTONES Y DIAS
        var calcular = document.getElementById('calcular');
        var errorDiv = document.getElementById('error');
        var botonRegistro = document.getElementById('btnRegistro');
        var lista_productos = document.getElementById('lista-productos');
        var suma = document.getElementById('suma-total');

        // EXTRAS
        var etiquetas = document.getElementById('etiquetas');
        var camisas = document.getElementById('camisa_evento');

        if(document.getElementById('calcular')) {         /* Si existe este elemento, entonces sigo. Corrijo error en la web */

        calcular.addEventListener('click', calcularMontos);

             // 6) FUNCION BLUR: TOMA EL ULTIMO VALOR QUE COMPLETA EL USUARIO

        pase_dia.addEventListener('blur', mostrarDias);
        pase_dosdias.addEventListener('blur', mostrarDias);
        pase_completo.addEventListener('blur', mostrarDias);

             // 7) VALIDAR DATOS

        nombre.addEventListener('blur', validarCampos);
        apellido.addEventListener('blur', validarCampos);
        email.addEventListener('blur', validarCampos);
        email.addEventListener('blur', validarMail);

        function validarCampos() {
            if(this.value == ''){
                errorDiv.style.display = 'block';
                errorDiv.innerHTML = "este campo es obligatorio";
                this.style.border = '2px solid red';
                errorDiv.style.border = '1px solid red'
            } else {
                errorDiv.style.display = 'none';           // Desaparezca el error cuando complete
                this.style.border = '1px solid #cccccc';
            }
        }

        function validarMail() {
            if(this.value.indexOf("@") > -1) {             // Busca el caracter que le pase, arroja -1 si detecta por ese debe ser >
                errorDiv.style.display = 'none';           // Desaparezca el error cuando complete
                this.style.border = '1px solid #cccccc';
            } else {
                errorDiv.style.display = 'block';
                errorDiv.innerHTML = "debe tener al menos una @";
                this.style.border = '2px solid red';
                errorDiv.style.border = '1px solid red'
            }
        }

        // 3) COMIENZO CON LA CALCULADORA DE COSTOS DEL EVENTO (agrego ParseINT para asegurarme que devuelva numeros)

        function calcularMontos(event){
            event.preventDefault();                 // Cancela el evento si es cancelable (completar campo)
            if(regalo.value === '') {
                alert("Debes elegir un regalo");
                regalo.focus();                     // Enfoca donde esta el alerta para completar
            } else {
                var boletosDia = parseInt(pase_dia.value, 10) || 0,
                    boletos2Dias = parseInt(pase_dosdias.value, 10) || 0,
                    boletoCompleto = parseInt(pase_completo.value, 10) || 0,
                    cantCamisas = parseInt(camisas.value, 10) || 0,
                    cantEtiquetas = parseInt(etiquetas.value, 10) || 0;

                var totalPagar = (boletosDia * 30) + (boletos2Dias * 45) + (boletoCompleto * 50) + ((cantCamisas * 10)*.93) + (cantEtiquetas*2);


            // 4) RESUMEN / uso Arreglo

                var listadoProductos = [];

                if(boletosDia >= 1) {
                    listadoProductos.push(boletosDia + ' Pases por día');
                }
                if(boletos2Dias >= 1) {
                    listadoProductos.push(boletos2Dias + ' Pases por 2 días');
                }
                if(boletoCompleto >= 1) {
                    listadoProductos.push(boletoCompleto + ' Pases Completos');
                }
                if(cantCamisas >= 1) {
                    listadoProductos.push(cantCamisas + ' Camisas');
                }
                if(cantEtiquetas >= 1) {
                    listadoProductos.push(cantEtiquetas + ' Etiquetas');
                }

                lista_productos.style.display = "block";
                lista_productos.innerHTML = '';    // antes del for para que cuando cambio alguna seleccion no vuelva a escribirse todo
                for(var i = 0; i< listadoProductos.length;i++) {
                    lista_productos.innerHTML += listadoProductos[i] + '<br/>' ;   // imprimo todo en la web
                }

            // 5) SUMA TOTAL

                suma.innerHTML = "$ " + totalPagar.toFixed(2);   // toFixed(2) recordo en 2 decimales

        }
    }

    function mostrarDias() {
        var boletosDia = parseInt(pase_dia.value, 10) || 0,
            boletos2Dias = parseInt(pase_dosdias.value, 10) || 0,
            boletoCompleto = parseInt(pase_completo.value, 10) || 0;

            var diasElegidos = [];

            if(boletosDia > 0) {
                diasElegidos.push('viernes');
            }
            if(boletos2Dias > 0) {
                diasElegidos.push('viernes', 'sabado');
            }
            if(boletoCompleto > 0) {
                diasElegidos.push('viernes', 'sabado', 'domingo');
            }
            for(var i = 0; i < diasElegidos.length; i++) {
                document.getElementById(diasElegidos[i]).style.display = 'block';         // En CSS oculto los dias
            }
    }
    }



    }); // DOM CONTENT LOADED
})();


/* FORMA DE PROBAR SI FUNCIONA:

$(function(){
    alert("funciona");
});
*/


$(function(){

    // Lettering (titulo)

    $('.nombre-sitio').lettering();

    // MENU FIJO
    // console.log(scroll)  --->  me detecta cuantos pixels baje

    var windowHeight = $(window).height();  // Saber cuanto mide la ventana
    var barraAltura = $('.barra').innerHeight();

    /* console.log(barraAltura); */
    /* console.log(windowHeight); */

    $(window).scroll(function() {
        var scroll = $(window).scrollTop();
        if(scroll > windowHeight) {
            $('.barra').addClass('fixed');
            $('body').css({'margin-top': barraAltura+'px'});
        } else {
            $('.barra').removeClass('fixed');
            $('body').css({'margin-top': '0.px'});
        }
    });


    // MENU RESPONSIVE (DE HAMBURGUESA)

    $('.menu-movil').on('click', function (){
        $('.navegacion-principal').slideToggle();
    });


    $('.ocultar').hide();                   // o en CSS ocultar el DIV con DISPLAY:NONE

    // Programa de Conferencias: ACTIVAS con addClass para activar el triangulito abajo (hecho en CSS)
    $('.programa-evento .info-curso:first').show();
    $('.menu-programa a:first').addClass('activo');

    $('.menu-programa a').on('click', function() {
        $('.menu-programa a').removeClass('activo');
        $(this).addClass('activo');
        $('.ocultar').hide();

        var enlace = $(this).attr('href');
        $(enlace).fadeIn(1000);

        return false;
    });

    // Animaciones para los numeros (CONTADOR)
    // nth-child: seleccionar el elemento 1,2,3 o 4

    $('.resumen-evento li:nth-child(1) p').animateNumber({number: 6}, 1200); // 1200 son los segundos
    $('.resumen-evento li:nth-child(2) p').animateNumber({number: 15}, 1200);
    $('.resumen-evento li:nth-child(3) p').animateNumber({number: 3}, 1500);
    $('.resumen-evento li:nth-child(4) p').animateNumber({number: 9}, 1500);

    // Cuenta Regresiva
    // Documentacion del Plugin:
    // strftime = resetea el tiempo
    // %D,%H,%M,%S = directivas para hacer referencia

    $('.cuenta-regresiva').countdown('2023/04/20 09:00:00', function(event) {
        $('#dias').html(event.strftime('%D'));
        $('#horas').html(event.strftime('%H'));
        $('#minutos').html(event.strftime('%M'));
        $('#segundos').html(event.strftime('%S'));
    });



});









