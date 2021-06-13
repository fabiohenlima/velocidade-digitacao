// const { Alert } = require("bootstrap");


function send(id) {
  $(`#form_delete${id}`).submit();
}

$('#users').on('change', function(user) {
  var userId = user.target.value;
  $.get('/admin/configuration/accessLevel/user?userId=' + userId, function(data){
    $.each(data,function(index,dataset) {
        $('#name').attr('value',dataset.name);
        $('#last_name').attr('value',dataset.last_name);
        $('#email').attr('value',dataset.email);
    })
  });
});

$("#userId").on('change', function(user){
    $userId = user.target.value;
    $.get('/admin/configuration/users/getUser?userId=' + $userId,function(data){
      $.each(data,function(index,dataset){
        $('#name').attr('value',dataset.name);
        $('#email').attr('value',dataset.email);
      });
    });
});

$("#state").on('change', function(state){
    $state_id = state.target.value;
    $.get('/admin/registrations/student/getState?state_id=' + $state_id, function(city_data){
      var cities;
      for(var count = 0; count < city_data.length; count++){
          cities += "<option value="+ city_data[count].id +" > "+ city_data[count].name +"</option>";
      }
      $('#city').html(cities).show();

    });
});


$("#cep").on("change", function(zip_code_data) {
    $zip_code_data = zip_code_data.target.value;
  $.get('https://viacep.com.br/ws/'+ $zip_code_data +'/json/', function(zip_code_data){
        var datas;
        datas = zip_code_data;
        if(datas.logradouro !== null && datas.logradouro !== undefined){
          $("#street").attr('value',datas.logradouro);
          $("#complement").attr('value',datas.complemento);
          $("#barrio").attr('value',datas.bairro);
          $("#state").append('<option selected>'+datas.uf+'</option>');
          $("#city").append('<option value="ibge'+datas.ibge+'"selected>'+datas.localidade+'</option>');
        }else{

        }
  });
});



$(".add-discipline").on("click",function(data) {
    $id = data.target.value;
    $.get('/admin/get/discipline?discipline_id='+ $id +'/json/', function(dataJson){

    $("#add-disciplines-list").append("<div id='discipline"+$id+"-remove' style='margin-left: 250px;'>"
          +"<div class='add-disciplines-list-close row'>"
          +"<button  type='button'  id='discipline"+$id+"' class='btn btn-danger btn-sm again-discipline remove-discipline"+$id+"'   onclick='again_discipline("+$id+")' style='margin-top:31px; margin-left:33px; width:29px; height:39px;'>X</button>"
          +"<div class='form-group col-4'>"
            +"<label for='discipline' class='form-control-label'>Disciplina<span class='text-danger'>*</span></label>"
            +"<input class='form-control form-control-sm is-valid' type='text' value='"+ dataJson.descricao +"' readonly required>"
            +"<input type='hidden' name='disciplines[]' value='"+ dataJson.id +"'>"
          +"</div>"
          +"<div class='form-group col-3'>"
            +"<label for='block' class='form-control-label'>Bloco<span class='text-danger'>*</span></label>"
            +"<input class='form-control' type='number' name='blocks[]' required>"
          +"</div>"
          +"</div>"
          +"</div>"
          );

          $(".remove-discipline"+$id+"").on('click',function(data){
            var disciplineId = $(this).attr("id");
            $("#"+disciplineId+"-remove").remove();
          });
          $(".discad-discipline"+$id+"").remove();
      });
});

function again_discipline(id) {
          $id = id;
            $("#"+$id+"remove").remove();
          $.get('/admin/get/discipline?discipline_id='+$id+'/json/', function(data) {

            $(".discipline-again-list").append(
              +"<tbody>"
            +"<tr class='discad-"+$id+"  again-discad-discipline-"+$id+"'>"
            +"<td></td>"
            +"<td>"
                +"<div class='form-check'>"
                    +"<button  type='button'  class='btn btn-success btn-sm' onclick='remove_discipline("+data.id+")' value='"+data.id+"'>+</button>"
                +"</div>"
            +"</td>"+
            +"<td></td>"
            +"<td>"+data.descricao+"</td>"
            +"<td>"+data.descricao_reduzida+"</td>"
            +"<td data-mask='00:00:00'>"+data.carga_horaria_teorica+"</td>"
            +"<td data-mask='00:00:00'>"+data.carga_horaria_pratica+"</td>"
          +"</tr>"
          +"</tbody>"
        );
      });

}

function remove_discipline(id)
{
    $id  = id;
    $.get('/admin/get/discipline?discipline_id='+ $id +'/json/', function(dataJson){

    $(".add-disciplines-list").append("<div id='discipline"+$id+"-remove' style='margin-left: 250px;'>"
          +"<div class='add-disciplines-list-close row'>"
          +"<button  type='button'  id='discipline"+$id+"' class='btn btn-danger btn-sm again-discipline remove-discipline"+$id+"'   onclick='again_discipline("+$id+")' style='margin-top:31px; margin-left:33px; width:29px; height:39px;'>X</button>"
          +"<div class='form-group col-4'>"
            +"<label for='discipline' class='form-control-label'>Disciplina<span class='text-danger'>*</span></label>"
            +"<input class='form-control form-control-sm is-valid' type='text' value='"+ dataJson.descricao +"' readonly required>"
            +"<input type='hidden' name='disciplines[]' value='"+ $id +"'>"
          +"</div>"
          +"<div class='form-group col-3'>"
            +"<label for='block' class='form-control-label'>Bloco<span class='text-danger'>*</span></label>"
            +"<input class='form-control' type='number' name='blocks[]' required>"
          +"</div>"
          +"</div>"
          +"</div>"
          );

          $(".remove-discipline"+$id+"").on('click',function(data){
            var disciplineId = $(this).attr("id");
            $("#"+disciplineId+"-remove").remove();

          });
          $(".again-discad-discipline-"+$id+"").remove();
      });
}

$(".remove-discipline-list").on("click",function(data) {

  $.get('/admin/get/discipline?discipline_id='+ $id +'/json/', function(dataJson){

    });
    var disciplineId = $(this).attr("id");
    $("#"+disciplineId+"-remove").remove();
});

$(".remove-discipline-list-update").on("click",function(data) {
  var disciplineId = $(this).attr("id");

    $.get('/admin/remove/discipline?discipline_id='+ disciplineId +'/json/', function(data){
      $("#"+disciplineId+"remove").remove();
    });
});

function delete_item(id) {
  //alert(id);
  $('#form_delete'+id).submit();
}

function gerar_boleto(id) {
  $.get('/admin/boleto/generating_boleto?id='+id, function(data) {
    window.open(data, '_blank');
  });
}


function gerar_todos_boletos(id) {
  $.get('/admin/boleto/generating_todos_boletos?id='+id, function(data) {
    window.open(data, '_blank')

    // data.forEach(linksBoleto)
  });
}

// function linksBoleto(links, index) {
//   window.open(links, '_blank')
// }


$('#curriculum_get_discipline').on('change', function(id){
  $.get('/admin/get/discipline/disciplineRelatingToCurriculum?curriculum_id='+id.target.value, function(disciplines_data) {
      var disciplines;
      for(var count = 0; count < disciplines_data.length; count++){
        disciplines += "<option value="+ disciplines_data[count].id +" > "+ disciplines_data[count].descricao +"</option>";
      }
      $('.discipline_relating_to_curriculum').html(disciplines).show();
  })
})

// $("#student_add_discipline").on('change', function(student){
//   $student_id = student.target.value;
//   $.get('/admin/get/discipline/offerClasses?student_id='+$student_id, function(discipline){
//     var disciplines;
//     for(var count = 0; count < discipline.length; count++){
//       disciplines +=
//           "<tr id='OfferClassAndStudentExists"+$student_id+discipline[count].offer_class_id+"'>"
//           +"<td>"
//           +"<div class='input-group-prepend'>"
//           +"<div class='input-group-text' id='add-exist"+$student_id+discipline[count].offer_class_id+"'>"
//             +"<input type='checkbox' id='checkbox"+$student_id+discipline[count].offer_class_id+"'name='offer_class[]' aria-label='Checkbox for following text input' value='"+discipline[count].offer_class_id+"'>"
//           +"</div>"
//           +"</div>"
//         +"</td>"
//         +"<td></td>"
//         +"<td>"+discipline[count].descricao+"</td>"
//         +"<td>"+discipline[count].descricao_reduzida+"</td>"
//         +"<td>"+discipline[count].carga_horaria_teorica+"</td>"
//         +"<td>"+discipline[count].carga_horaria_pratica+"</td>"
//       +"</tr>";

//       $.get('/admin/offerClassAndStudent/ExistenceCheck?student_id='+$student_id+'&offerClass_id='+discipline[count].offer_class_id, function(response){
//         if(response.verify){
//           $("#checkbox"+response.id_remove).hide();
//           $("#add-exist"+response.id_remove).append('<i class="fa fa-check" style="font-size:13px;color:blue"></i>');
//           $("#OfferClassAndStudentExists"+response.id_remove).css("color","blue");
//         };
//       });

//     }

//     $('.disciplines_offer_classes').html(disciplines).show();

//     $('.hidden-discipline-offerClass').hide();
//   });
// });

$(".js-example-responsive").select2({width:'resolve'});



$("#campoMensalidades").hide();
$("#campoFormaDePagamento").hide();
$("#campoData").hide();
$("#campoValor").hide();
$("#campoValorPago").hide();
$("#campoJuros").hide();

$("#student").on('change',function(id){
    $id = id.target.value;
  

    $.get('/admin/caixa/student/tuition?student_id='+$id ,function(data){

        if(data.count === 0 ){

            $("#caixaCampos").hide();
            $("#buttonCadastraCaixa").hide();
            $("#butaoParaSelecionaOutroAluno").append("<a href='/admin/caixa/create' class='btn btn-primary btn-sm'>Seleciona Outro Aluno</a>");
            $("#AlertAlunoSemMensalidade").append("<div class='alert alert-warning' role='alert'>"
            +"<div class='text-center'>"
                +"<h1>:(</h1>"
                +"<h5>ALUNO(A) <strong>"+data.fullName+"</strong> SEM MENSALIDADES</h5>"
                +"<p>Faça Cadastro de Mensalidade Para Aluno(a):<strong> "+data.fullName.toLowerCase() +"</strong></p>"
                +"<p>Após isso Tente novamente!</p>"
                +"<a href='/admin/tuition/create' class='btn btn-dark'>Cadastra Mensalidades</a>"
            +"</div>"
            +"</div>");
            
        }else{
       
          $("#campoMensalidades").show();
          $("#campoFormaDePagamento").show();
          $("#campoData").show();
          $("#campoValor").show();
          $("#campoValorPago").show();
          $("#campoJuros").show();

          $("#mensalidadeId").val(data.idMensalidade);
          $("#showMensalidades").attr('href','/admin/caixa/mensalidades/'+data.student_id);
          $("#valor_mensalidade_show").val(data.valor).mask("R$ 00000000");
      
          $("#date").val(data.date);
          $("#student_id").val(data.students_id);
        
          $.get('/admin/caixa/student/tuition/show?student_id='+data.student_id ,function(mensalidade){
                    var $mensalidades;
                    
                    for(m = 0; m < mensalidade.length; m++)
                    {
                        $mensalidades += "<option value="+mensalidade[m].id+">"+mensalidade[m].numero+"/"+mensalidade[m].mes+"/"+mensalidade[m].ano+"</option>";
                    }
          
              $("#mensalidadesShow").html($mensalidades).show();
          });
        }
    });

    $(document).ready(function(){

      var maxLength = '-0.000.000,00'.length;
      $('.date').mask('11/11/1111');
      $('.time').mask('00:00:00');
      $('.date_time').mask('00/00/0000 00:00:00');
      $('.cep').mask('00000-000');
      $('.phone').mask('0000-0000');
      $('.phone_with_ddd').mask('(00) 0000-0000');
      $('.phone_us').mask('(000) 000-0000');
      $('.mixed').mask('AAA 000-S0S');
      $('.cpf').mask('000.000.000-00', {reverse: true});
      $('.money').maskMoney({
        allowNegative: true,
        prefix: "R$ ",
        thousands: '.',
        decimal: ',',
        affixesStay: true
      }).attr('maxlength', maxLength).trigger('mask.maskMoney');
      });

    });
    
    var maxLength = '-0.000.000,00'.length;
    $('.money').maskMoney({
      allowNegative: true,
      prefix: "R$ ",
      thousands: '.',
      decimal: ',',
      affixesStay: true
    }).attr('maxlength', maxLength);
  

    //MOVIMENTAÇÃO -> Matricular Curricular

  $("#course_add_version").prop('disabled',true);
  $(".view_versions_input").hide();
  $(".view_input_students").hide();

  $("#institution").on('change', function(institution_date){    
     
      $institution_id      = institution_date.target.value;

      if($institution_id != "") {     
        $("#course_add_version").prop('disabled',false);
        $("#course_add_version").on('change',function(course_data){
          $course_id      = course_data.target.value;
          $.get('/admin/get/CurricularEnrollment/version/'+$course_id+'/'+$institution_id, function(versions){
            var $versions;

            if(versions.length){

              $versions = "<option value='' selected>Selecione</option>";
              for(v = 0; v < versions.length; v++)
              {
                  $versions += "<option value="+versions[v].versao+">"+versions[v].versao+"</option>";
              }
              $(".view_versions_input").show();
              $(".add_versions").append($versions);
              // $(".add_versions").html($versions).show();
            } else {

              $(".view_versions_input").hide();
              alert("Nenhuma Resultado da Filtragem");
              window.location.reload(true);
              // location.reload(); //funciona tbm
            }
           
          });
        });

      } else {

        $(".view_versions_input").hide();
        $("#course_add_version").prop('disabled',true);
        window.location.reload(true);
      }
  });

  $("#version").on('change',function(data){
   
    $(".view_input_students").show();
    $institution = $("#institution").val();
    $course      = $("#course_add_version").val();
    $version     = data.target.value;
    
    $.get('/admin/get/CurricularEnrollment/version/'+$course+'/'+$institution+'/'+$version,function(ver){
        var matriz_curricular_id = [];
        for(m = 0; m < ver.length; m++ ){
          matriz_curricular_id.push(ver[m].id);
        }

      $.get('/admin/get/CurricularEnrollment/getDiscipline/'+matriz_curricular_id+"/"+$course, function(OfferClasses){
         
        if(OfferClasses.length) {
          var disciplines;
         
          for(var count = 0; count < OfferClasses.length; count++) {

            disciplines +=
                "<tr id='OfferClassAndStudentExists"+OfferClasses[count].id+"'>"
                +"<td>"
                +"<div class='input-group-prepend'>"
                +"<div class='input-group-text' id='add-exist"+OfferClasses[count].id+"'>"
                  +"<input type='checkbox' id='checkbox"+OfferClasses[count].id+"'name='offer_class[]' aria-label='Checkbox for following text input' value='"+OfferClasses[count].id+"'>"
                +"</div>"
                +"</div>"
              +"</td>"
              +"<td></td>"
              +"<td>"+OfferClasses[count].discipline.descricao+"</td>"
              +"<td>"+OfferClasses[count].discipline.descricao_reduzida+"</td>"
              +"<td>"+OfferClasses[count].discipline.carga_horaria_teorica+"</td>"
              +"<td>"+OfferClasses[count].discipline.carga_horaria_pratica+"</td>"
            +"</tr>";
          }

          $("#student_check").on('change', function(student) {

            $student_id = student.target.value;
            for(var count = 0; count < OfferClasses.length; count++) {
            $.get('/admin/offerClassAndStudent/ExistenceCheck?student_id='+$student_id+'&offerClass_id='+OfferClasses[count].id, function(response){
                if(response.verify){
                  $("#checkbox"+response.id_remove).hide();
                  $("#add-exist"+response.id_remove).html('<i class="fa fa-check" style="font-size:13px;color:blue"></i>').show();
                  $("#OfferClassAndStudentExists"+response.id_remove).css("color","blue");
                };
            });
          }
         });

          $('.disciplines').html(disciplines).show();
          $('.hidden-discipline-offerClass').hide();

        } else {

         alert("Nenhuma Resultado da Filtragem");
         window.location.reload(true);

        }

      });
    });
  });
  