let level = parseInt(localStorage.getItem("level"));
if (isNaN(level)) {
    level = 0;
    localStorage.setItem("level", level);
}
console.log(`Current level: ${level}`);


document.getElementById('start').addEventListener('click', function(){
    localStorage.setItem("level", 1);
    window.location.href="page2.html";
});
