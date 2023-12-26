<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Node Documentation Tool</title>
    
    <link href="https://cdn.jsdelivr.net/npm/remixicon@2.2.0/fonts/remixicon.css" rel="stylesheet">
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <link href="index.css" rel="stylesheet">
    <link href="linked-list-colors.css" rel="stylesheet">
    <link href="tailwind2.no.normalizer.css" rel="stylesheet">

</head>
<body>
  <h3>Node Documentation Tool</h3>
  <p>By Weng. A new way to document node connections for Unreal Engine, Da Vinci Resolve, Tech Stacks, etc. Click the hand pointers for explanations of a previous/next connection or the current node. As a venn diagram further contains another diagram, it's connecting to the right.</p>
  <p>
    <?php
      include("./global-message.txt");
    ?>
  </p>
    <div id="linkedListsContainer">
      <?php
        include("./resulted.php");
      ?>
    </div>
    <!-- <script src="experiment.js"></script> -->
</body>
</html>