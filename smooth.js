 document.querySelectorAll('a[href^="#"]').forEach(anchor => {
anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
});});

function fresherResume(){
    window.location.href = "fresherResume.html"
}

function professionalResume(){
    window.location.href  = "professionalResume.html"
}