// Hora y fecha 
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