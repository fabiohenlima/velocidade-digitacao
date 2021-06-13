<?php 
    try {
        
        $pdo = NEW PDO(
            "mysql:host=localhost;dbname=digitacao",
            "root",
            "123456",
            [
                PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8",
                // PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_OBJ,
                // PDO::ATTR_CASE => PDO::CASE_NATURAL
            ]
        );

        $stmt = $pdo->query("select * from songs");
        $songs = $stmt->fetchAll();

     
    } catch(PDOException $excption ) {

    }

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <head>
        <meta charset="UTF-8">
        <title>Projeto Typer</title>
        <link rel="stylesheet" href="css/libs/materialize.min.css">
        <link rel="stylesheet" href="css/libs/icons.css">
        <link rel="stylesheet" href="css/libs/google-fonts.css">
        <link rel="stylesheet" href="css/libs/styles.css">
       </head>
    <title>Document</title>
</head>
<body>

    <div class="row">
        <div class="col s10 m6">
          <div class="card blue-grey darken-4">
            <div class="card-content white-text">
              <span class="card-title center">MÚSICAS DISPONÍVEIS</span>
                <p>Separamos trechos de algumas músicas para testar a sua velocidade digitando. Escolha uma música, nós mostraremos a letra a ser digitada, e digite
              </p>
            </div>
                          
            <div class="card-action">
                <ul class="collection">
              
                  <?php foreach($songs as $music){ ?>
                    <li class="collection-item avatar">

                      <img src="img/<?php echo $music->img?>.jpg" alt="" class="circle">
                      <span class="title"><strong><?php echo $music->canto; ?></strong></span>
                      <p><?php echo $music->musica; ?></p> 
                      <a class="secondary-content"><a class="waves-effect waves-light red btn-small comeca">Começar</a></a>
                    </li>
                    <?php } ?>
                  
                    <!-- <li class="collection-item avatar">
                        <img src="img/ch.jpg" alt="" class="circle">
                        <span class="title"><strong>Chitãozinho & Xororó</strong></span>
                        <p>Evidências</p>
                        <a  class="secondary-content"><a class="waves-effect waves-light red btn-small comeca">Começar</a></a>
                      </li>
                  
                                            
                      <li class="collection-item avatar">
                        <img src="img/rc.jpg" alt="" class="circle">
                        <span class="title"><strong>Racionais MC's</strong></span>
                        <p> </p>
                        <a  class="secondary-content comeca"><a class="waves-effect waves-light red btn-small comeca">Começar</a></a>
                      </li>
                  
                      
                      <li class="collection-item avatar">
                        <img src="img/zc.jpg" alt="" class="circle">
                        <span class="title"><strong>Zé Neto e Cristiano</strong></span>
                        <p> </p>
                        <a  class="secondary-content comeca"><a class="waves-effect waves-light red btn-small comeca">Começar</a></a>
                      </li> -->
                    
                  </ul>
                        
            </div>
          </div>
        </div>

        <div class="col s10 m6" id="painel_de_digitacao">
            <div class="card blue-grey darken-4">
              <div class="card-content white-text">
                <span class="card-title center">Aquele 1%<br><p>Wesley Safadão</p></span>
              
          
                <div class="row">
                    <i class="material-icons">access_time</i>
                    <p>00:00:00</p>
                    <p>Participanete:Fábio Henrique</p>
                </div>
             
              </div>
                            
              <div class="card-action white-text">
                  <h5>Descrição</h5>
                  
                  <br>
                    <hr>
                      <h6 class="frase" id="frase">Tô namorando todo mundo! 99% anjo, perfeito, mas aquele 1% é vagabundo. Mas aquele 1% é vagabundo. Safado e elas gostam.</h6>
                   <hr>
                 <br>
  
                  <div class="row">
                    <form class="col s12">
                      <div class="row">
                        <div class="input-field col s12">
                          <textarea  id="input-frase" class="materialize-textarea"></textarea>
                          <label for="textarea1">Quando estiver pronto, comece a digitar, o tempo começará a contar:</label>
                        </div>
                      </div>
                      <a class="waves-effect waves-light btn-small red"><i class="material-icons left">autorenew</i>Reiniciar</a>
                      <button class="btn waves-effect waves-light btn-small" type="submit" name="action">Salvar
                        <i class="material-icons right">send</i>
                      </button>
                    </form>
                  </div>

                </div>          
              </div>
            </div>
          </div>
      </div>
              

      
       
</body>

    <script src="js/materialize.min.js"></script>
    <script src="js/jquery-3.5.1.min.js"></script>
    <script src="js/function.js"></script>
</html>
