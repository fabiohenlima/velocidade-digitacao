$(function(document){
  $("#painel_de_digitacao").hide();

  $(".comeca").click(function(){
    var participante = prompt("INFORME SEUS NOME PARA PARTICIPAR!");


      if(participante != '') {
      

        $.get('../Model/Digiticao/getDigitacao', function(result) {
          console.log(result);

        });

      }
    
    });
  

      $("#painel_de_digitacao").show();

  });
  



function inicializaMarcadores()
{
  //  var frase = Document.getElementById('frase').innerHTML();
   campo.on("input", function() {
  
   });
}

