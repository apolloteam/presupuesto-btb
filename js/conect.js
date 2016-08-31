// Hora y fecha 
$(function() {
    $('#hora').timepicker();
});

$( document ).ready(function() {
    $('#fecha').datepicker();
});



//funciones del parsley para que avanze de instancias
$(function () {
          var $sections = $('.form-section-2');
          function navigateTo(index) {
            $sections
              .removeClass('current')
              .eq(index)
                .addClass('current');
            $('form-navigation-2 .previous').toggle(index > 0);
            var atTheEnd = index >= $sections.length - 1;
            $('.form-navigation-2 .next').toggle(!atTheEnd);
            $('.form-navigation-2 [type=submit]').toggle(atTheEnd);
          }

          function curIndex() {
            return $sections.index($sections.filter('.current'));
          }
          $('.previous').click(function() {
            navigateTo(curIndex() - 1);
          });
          $('.next').click(function() {
            if ($('.demo-form-2').parsley().validate({group: 'block-' + curIndex()}))
              navigateTo(curIndex() + 1);
          });
          $sections.each(function(index, section) {
            $(section).find(':input').attr('data-parsley-group', 'block-' + index);
          });
          navigateTo(0);
});



// Para la galeria de Autos
function pagoOnChange(sel) {
        if (sel.value == "option1") {
            $("#option1").fadeIn(1500);
            $("#option2").fadeOut(250);
            $("#option3").fadeOut(250);
            $("#option4").fadeOut(250);
            $("#option5").fadeOut(250);

        }

        if (sel.value == "option2") {
            $("#option2").fadeIn(1500);
            $("#option1").fadeOut(250);
            $("#option3").fadeOut(250);
            $("#option4").fadeOut(250);
            $("#option5").fadeOut(250);

        }

        if (sel.value == "option3") {
            $("#option3").fadeIn(1500);
            $("#option1").fadeOut(250);
            $("#option2").fadeOut(250);
            $("#option4").fadeOut(250);
            $("#option5").fadeOut(250);

        }

        if (sel.value == "option4") {
            $("#option4").fadeIn(1500);
            $("#option1").fadeOut(250);
            $("#option2").fadeOut(250);
            $("#option3").fadeOut(250);
            $("#option5").fadeOut(250);

        }


        if (sel.value == "option5") {
            $("#option5").fadeIn(1500);
            $("#option1").fadeOut(250);
            $("#option2").fadeOut(250);
            $("#option3").fadeOut(250);
            $("#option4").fadeOut(250);

        }
    }




// al seleccionar un vehiculo activa el primer valor de la cantidad de vehiculos. Y si se seleciono una cantidad de vehiculos marca automaticamente el imput del vehiculo.

    $('.servicio').find(':checkbox').click(function () {
        var $this = $(this),
            $combo = $this.next();
        if ($this.is(":checked")) {
            if ($combo.val() == i18n.QuantityText) {
                $combo.val("1");
            }
        } else {
            $combo.val(i18n.QuantityText);
        }
    });

    $('.vehicleQty').change(function () {
        if ($(this).val() != i18n.QuantityText)
            $(this).prev().attr("checked", "checked");
        else
            $(this).prev().removeAttr("checked");
    });

    $('.servicio').click(function (e) {
        if (e.target.className == "radi" || e.target.nodeName == 'SELECT' || e.target.nodeName == 'OPTION') return; // prevent to check/uncheck when click on inner controls
        var $this = $(this);
        var checked = $('.radi', $this).prop('checked') || false;

        if (checked) {
            $('.radi', $this).prop('checked', false);
            $('select', $this).val(i18n.QuantityText);
        } else {
            $('.radi', $this).prop('checked', true);
            if ($('select', $this).val() == i18n.QuantityText) {
                $('select', $this).val("1");
            }
        }
    });

   

// para hacer el los efectos en los input
$(document).ready(function(){
    $('input.input__field').each(function() { 
        var $this = $(this);
        if($.trim($this.val()) !== '') {
            $this.parent().addClass('input--filled');
        }

        $this.on('focus', function(){
            var $this = $(this);
            // $this.data('hasValue', $.trim($this.val()) !== '');
            $this.parent().addClass('input--filled');
        }).on('blur', function(){
            var $this = $(this);
            if($.trim($this.val()) === '') {
                $this.parent().removeClass('input--filled');
            }
        });
    });
});



// autocomplete de direcciones
$(function(){
$("#origen").geocomplete()
 .bind("geocode:result", function(event, result){
$.log("Result: " + result.formatted_address);
})
});

$(function(){
$("#destino").geocomplete()
 .bind("geocode:result", function(event, result){
$.log("Result: " + result.formatted_address);
})
});



// para mostrar el select de servicio por hora y ocultarlo si se seleciona por destino
function mostrarDestino() {
    $(".selehor").css({"display": "none"});
    $(".seledes").css({"display": "block"});

    $(".servipresudes").css({"background-color": "#4accff"});
    $(".servipresudes").css({"color": "#fff"});

    $(".servipresuhor").css({"background-color": "rgba(24,91,117,.3)"});
    $(".servipresuhor").css({"color": "#b5b4b4"});
}

function mostrarHora() {
    $(".servipresudes").css({"background-color": "rgba(24,91,117,.3)"});
    $(".servipresudes").css({"color": "#b5b4b4"});

    $(".servipresuhor").css({"background-color": "#4accff"});
    $(".servipresuhor").css({"color": "#fff"});

    $(".seledes").css({"display": "none"});
    $(".selehor").css({"display": "block"});
}



// Enviar el nombre del usuario a la instacia 3 y 4 del formulario
$(document).ready(function()
	{
	$("#enviausuario").click(function () {
	$("#nombreusuarioa").val($("#nombre").val());
	});		
});
$(document).ready(function()
	{
	$("#enviausuario").click(function () {
	$("#nombreusuariob").val($("#nombre").val());
	});		
});






