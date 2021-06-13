<?php 
    
require_once __DIR__ . '/vendor/autoload.php';
namespace Model;

class Digitacao {



    public function getDigitacao()
    {
        echo "chegou"; die;
        
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

    }

}
?>