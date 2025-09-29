let level = parseInt(localStorage.getItem("level"));
if (isNaN(level)) {
    level = 0;
    localStorage.setItem("level", level);
}
console.log(`Current level: ${level}`);

document.getElementById('start').addEventListener('click', function(){
    if(level == 0) level++;
    localStorage.setItem("level", level);
    window.location.href="page2.html";
});
