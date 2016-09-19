var tipoServicio = "PTP";

// Adding Custom validator
window.Parsley.addValidator('destinohora', function (value, requirement) {
    if (tipoServicio=="TIME" && $('#horas').val()!="0") return true;
        if (!(tipoServicio=="TIME") && $('#destino').val()!="") return true;
        return false;
  }, 32)
  .addMessage('es', 'destinohora', 'Ingrese destino u hora')
  .addMessage('en', 'destinohora', 'Provide target or hours');



$(document).ready(function () {
  // Inicia los controles.
  $('#fecha').datepicker({language: i18n.options.language});
  $('#hora').timepicker({ timeFormat: i18n.options.timeFormat });

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
      if (idx==1) {
        postToAPI(
          function(result){ // Success Call
              navigateTo(idx + 1);     
          },
          function(error){  // Error Call
              // TODO: Show Error Message
              console.log(arguments)
              var response = JSON.parse(error.responseText);
              $('#errorMsg').html(i18n.messages.quoteRequestError + ' (' + response.errorUniqueId + ')')
              $('#error').fadeIn();
          }
        );
      } else {
        navigateTo(idx + 1);
      }
      
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
  tipoServicio = "PTP";

  $('.selehor').hide();
  $('.seledes').show();
  $('.servipresudes').css({'background-color': '#4accff', 'color': '#fff'});
  $('.servipresuhor').css({'background-color': 'rgba(24,91,117,.3)', 'color': '#b5b4b4'});
}

/**
 * mostrarHora
 */
function mostrarHora () {
  tipoServicio = "TIME";
  
  $('.servipresudes').css({'background-color': 'rgba(24,91,117,.3)', 'color': '#b5b4b4'});
  $('.servipresuhor').css({'background-color': '#4accff', 'color': '#fff'});
  $('.seledes').hide();
  $('.selehor').show();
}

function postToAPI(postSuccess, postError) {

    var requestData = {
      contact: {
        firstName: $('#nombre').val(),
        lastName: $('#apellido').val(),
        eMail: $('#email').val(),
        phone: "",
        cellPhone: "",
        title: "",
        languageCode: i18n.options.language
      },
      services: [],
      clientType: "Agency"
    };

    var dtId = '#fecha',
        $dt = $(dtId),
        dtValue = $dt.val(),
        sDate = Date.parseDate(dtValue, i18n.options.dateFormat),
        sTime = $("#hora").val();

    //var serviceDate = new Date(Date.UTC(sDate.substring(6),parseInt(sDate.substring(3,5))-1,sDate.substring(0,2),sTime.substring(0,2),sTime.substring(3)));
    // Arma el ISOString. Ej.("2014-8-31T22:00:00.000Z")
    var serviceDate = sDate.getFullYear()+'-'+(sDate.getMonth() + 1)+'-'+sDate.getDate()+'T'+sTime+':00.000Z';              


    // Hacer loop con un servicio por cada cantidad de cada vehiculo
    var servicios = $("input[name='servicio[]']:checked");

    for (var i = 0, l = servicios.length; i < l; i++) {

        var service = {
          //scheduleDate: serviceDate.toISOString(),
          scheduleDate: serviceDate,
          serviceType: tipoServicio,
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
          passengerCount: $(servicios[i]).prev().children('.passQty').html(), //TODO: get
          luggageCount:  $(servicios[i]).prev().children('.baggQty').html(), //TODO: get
          comments: '' //$('#mensaje').val() 
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
    //var APIurl =  "https://api.dottransfers.com/v1/quote/request"; // (Live)
    var APIurl =  "https://api.dottransfers.com/v2/quote/request"; // (Live)
    
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