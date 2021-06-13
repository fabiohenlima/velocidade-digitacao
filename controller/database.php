<?php 

    try {
        
        $pdo = NEW PDO(
            "mysql:host=localhost;dbname=digitacao",
            "root",
            "123456",
            [
                PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"
            ]
        );

        $stmt = $pdo->query("SHOW DATABASES");
        while($result = $stmt->fetch()) {
            var_dump($result);
        }

    } catch(PDOException $excption ) {
        var_dump($excption);
    }



?>