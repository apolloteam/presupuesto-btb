// Hora y fecha 
<<<<<<< HEAD
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
            var currentStep = curIndex();

            if ($('.demo-form-2').parsley().validate({group: 'block-' + currentStep}))
            {
              if (currentStep==1) {
                 debugger;
                 postToAPI(
                    function(result){ // Success Call
                        navigateTo(currentStep + 1);     
                    },
                    function(error){  // Error Call
                        // TODO: Show Error Message
                        Alert ('Error on API Call')
                    }
                 );
              } else {
                 navigateTo(currentStep + 1);  
              }  
            }
             
          });

          $sections.each(function(index, section) {
            $(section).find(':input').attr('data-parsley-group', 'block-' + index);
          });
          navigateTo(0);
});


function postToAPI(postSuccess, postError) {

    var requestData = {
      contact: {
        firstName: $('#nombre').val(),
        lastName: $('#apellido').val(),
        eMail: $('#email').val(),
        phone: $('#telefono').val(),
        cellPhone: "",
        title: "",
        languageCode: i18n.options.language
      },
      services: [],
      clientType: $('input[name=cliente-categoria]:checked').val()
    };

    var dtId = '#fecha',
        $dt = $(dtId),
        dtValue = $dt.val(),
        sDate = Date.parseDate(dtValue, i18n.options.dateFormat),
        sTime = $("#hora").val();

    //var serviceDate = new Date(Date.UTC(sDate.substring(6),parseInt(sDate.substring(3,5))-1,sDate.substring(0,2),sTime.substring(0,2),sTime.substring(3)));
    // Arma el ISOString. Ej.("2014-8-31T22:00:00.000Z")
    var serviceDate = sDate.getFullYear()+'-'+(sDate.getMonth() + 1)+'-'+sDate.getDate()+'T'+sTime+':00.000Z';              


    // TODO: Hacer for con un servicio por cada cantidad de cada vehiculo
    var servicios = $("input[name='servicio[]']:checked");

    for (var i = 0, l = servicios.length; i < l; i++) {

        var service = {
          //scheduleDate: serviceDate.toISOString(),
          scheduleDate: serviceDate,
          serviceType: $("#horaschk").is(":checked") ? "TIME" : "PTP",
          passenger: {
            firstName: $('#nombre').val(),
            lastName: $('#apellido').val(),
            eMail:  $('#email').val(),
            phone: $('#telefono').val(),
            cellPhone: "",
            title: "" //$('#mr').val()
          },
          rutePoints: 
            [
                {
                  action: "PU",
                  order: 0,
                  location: {
                    searchText: $("#origen").val(),
                    name: "[ZONE]" + document.title,
                    summary: "-",
                    countryCode: "-",
                    latitude: "0",
                    longitude: "0",
                    category: "search"
                  }
                }
            ],
          vehicle:{
                category: servicios[i].value,
                quantity: parseInt($(servicios[i]).next().val()) // $("input[name='servicio[]']:checked").val()
            },                
          passengerCount: $(servicios[i]).prev().children('.qtyPass').html(),
          luggageCount: $(servicios[i]).prev().children('.qtyBag').html(),
          comments: $('#mensaje').val() 
        }

        if (service.serviceType=='PTP') {

            service.rutePoints.push(    
                {
                  action: "DO",
                  order: 1,
                  location: {
                    searchText: $("#destino").val(),
                    name: "-",
                    summary: "-",
                    countryCode: "-",
                    latitude: "0",
                    longitude: "0",
                    category: "search"
                  }
                }
            );
        } else {
            //service.timeRequired = parseInt(timeStringToFloat($('#horas').val()+":"+$('#minutos').val()));
            var horas   = parseInt($('#horas').val());
                //minutos = parseInt($('#minutos').val());                                  
            // Se calcula el tiempo de servicio en minutos.
            service.timeRequired = (horas * 60);                    
        }

        requestData.services.push(service);
    }
    

    console.log(requestData); //use the console for debugging, F12 in Chrome, not alerts


    //Post to API
    
    var requestDataJSON = JSON.stringify(requestData);
    //var APIurl =  "http://localhost:9200/quote/request"; // (Dev)
    //var APIurl =  "http://api.dottransfers.sommytech.com.ar/v1/quote/request"; // (Testing)
    //var APIurl =  "http://api.gototransfers.com/v1/quote/request"; // (Homo)
    var APIurl =  "http://api.dottransfers.com/v1/quote/request"; // (Live)
    $.ajax({
        type: "POST",
        url: APIurl,
        contentType: "application/json",
        data: requestDataJSON,
        success: postSuccess,
        error: postError,
        dataType: 'json',
        crossDomain: true
    });

}


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
=======
$(document).ready(function () {
  // Inicia los controles.
  $('#fecha').datepicker();
  $('#hora').timepicker();

  // Funciones del parsley para que avanze de instancias
  $('.previous').on('click', function () {
    var idx = curIndex();
    navigateTo(idx - 1);
  });

  $('.next').on('click', function () {
    var $demoForm = $('.demo-form-2');
    var parsley = $demoForm.parsley();
    var idx = curIndex();
    var data = {
      group: 'block-' + String(idx)
    };

    if (parsley.validate(data)) {
      navigateTo(idx + 1);
    }
  });

  // Cambio de cantidad de vehiculos.
  $('.vehicleQty').on('change', function () {
    var $this = $(this);
    if ($this.val() != i18n.QuantityText) {
      $this.prev().attr('checked', 'checked');
    }else {
      $this.prev().removeAttr('checked');
    }
  });

  // Al seleccionar un vehiculo activa el primer valor de la cantidad de vehiculos. 
  // Y si se seleciono una cantidad de vehiculos marca automaticamente el imput del vehiculo.
  // Selección de un servicio.
  $('.servicio').on('click', function (e) {
    if (e.target.className == 'radi' || e.target.nodeName == 'SELECT' || e.target.nodeName == 'OPTION') return // prevent to check/uncheck when click on inner controls
    var $this = $(this);
    var $radi =  $this.find('.radi');
    var $select = $this.find('select');
    var checked = $radi.prop('checked') || false;

    if (checked) {
      $radi.prop('checked', false);
      $select.val(i18n.QuantityText);
    } else {
      $radi.prop('checked', true);
      if ($select.val() == i18n.QuantityText) {
        $select.val('1');
      }
    }
  }).find(':checkbox').on('click', function () {
    var $this = $(this);
    var $combo = $this.next();
    if ($this.is(':checked')) {
      if ($combo.val() == i18n.QuantityText) {
        $combo.val('1');
      }
    } else {
      $combo.val(i18n.QuantityText);
    }
  });
  
  // Para la galeria de Autos
  $('#selectChange').on('change', function () {
    $('#option1, #option2, #option3, #option4, #option5').fadeOut(250);
    $('#' + $(this).val()).stop().fadeIn(1500);
  });

  // Efecto para los controles input.
  $('input.input__field').each(function () {
    var $this = $(this);
    if ($.trim($this.val()) !== '') {
      $this.parent().addClass('input--filled');
>>>>>>> origin/master
    }

    $this.on('focus', function () {
      var $this = $(this);
      $this.parent().addClass('input--filled');
    }).on('blur', function () {
      var $this = $(this);
      if ($.trim($this.val()) === '') {
        $this.parent().removeClass('input--filled');
      }
    });
  });

  // autocomplete de direcciones.
  $('#origen').geocomplete();

  $('#destino').geocomplete();

  // para mostrar el select de servicio por hora y ocultarlo si se seleciona por destino
  $('a div.servipresudes').on('click', mostrarDestino);
  $('a div.servipresuhor').on('click', mostrarHora);

  $('#enviausuario').on('click', function () {
    // Envia el nombre del usuario a la instacia 3 y 4 del formulario.
    var nombre = $('#nombre').val();
    $('#nombreusuarioa').val(nombre);
    $('#nombreusuariob').val(nombre);
  })

  $('.form-section-2').each(function (index, section) {
    $(section).find(':input').attr('data-parsley-group', 'block-' + String(index));
  })
  
  // Inicia la navecación.
  navigateTo(0);
})

function navigateTo (index) {
  var $sections = $('.form-section-2');
  $sections.removeClass('current')
    .eq(index)
    .addClass('current');

  var $formNavigation = $('.form-navigation-2');
  $formNavigation.find('.previous').toggle(index > 0);
  var atTheEnd = index >= $sections.length - 1;
  $formNavigation.find('.next').toggle(!atTheEnd);
  $formNavigation.find('[type=submit]').toggle(atTheEnd);
}

function curIndex () {
  var $formSection = $('.form-section-2');
  return $formSection.index($formSection.filter('.current'));  
}

/**
 * mostrarDestino
 */
function mostrarDestino () {
  $('.selehor').hide();
  $('.seledes').show();
  $('.servipresudes').css({'background-color': '#4accff', 'color': '#fff'});
  $('.servipresuhor').css({'background-color': 'rgba(24,91,117,.3)', 'color': '#b5b4b4'});
}

/**
 * mostrarHora
 */
function mostrarHora () {
  $('.servipresudes').css({'background-color': 'rgba(24,91,117,.3)', 'color': '#b5b4b4'});
  $('.servipresuhor').css({'background-color': '#4accff', 'color': '#fff'});
  $('.seledes').hide();
  $('.selehor').show();
}