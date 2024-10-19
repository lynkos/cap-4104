fetch("menubar.html") 
.then(response => response.text()) 
.then(data => { 
    document.getElementById("menubar").innerHTML = data; 
}) 
.catch(error => console.error("Error loading menubar:", error)); 