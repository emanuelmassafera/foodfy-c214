function generateTxtFile(text){
    var textFile = null;
    var data = new Blob([text], {type: 'text/plain'}); 
    if (textFile !== null) {  
      window.URL.revokeObjectURL(textFile);  
    }  
    textFile = window.URL.createObjectURL(data);  
    return textFile; 
}

(function () {  
    var btnCreateFile = document.getElementById('btnCreateFile'),  
    dummyText = document.getElementById('dummyText');  
    btnCreateFile.addEventListener('click', function () {
        var link = document.getElementById('downloadFile');  
        link.href = generateTxtFile(dummyText.innerText);  
        link.style.display = 'inline-block';  
    }, false);
})(); 