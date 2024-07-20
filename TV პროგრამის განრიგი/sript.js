document.addEventListener('DOMContentLoaded', function() {
    const today = new Date().getDay(); 
    const headers = document.querySelectorAll('#schedule thead th');
    
    if (today > 0) { 
        headers[today].style.backgroundColor = '#FF5722';
    }
});