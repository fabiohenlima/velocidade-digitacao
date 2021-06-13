$(function(document){
  $("#painel_de_digitacao").hide();

  $(".comeca").click(function(){
    var participante = prompt("INFORME SEUS NOME PARA PARTICIPAR!");


    if(participante != '') {
    
      alert($(".comeca").val());
      
      $("#painel_de_digitacao").show();
    }

  });
  



  $("#input-frase").blur(function(){

  });


});

function inicializaMarcadores()
{
  //  var frase = Document.getElementById('frase').innerHTML();
   campo.on("input", function() {
  
   });
}

