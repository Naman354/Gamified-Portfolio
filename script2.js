let level = parseInt(localStorage.getItem("level"));
if (isNaN(level)) level = 0;
console.log(`Current level: ${level}`);

const requiredLevel = 1;
  if (level < requiredLevel) {
    alert("You cannot access this level yet!");
    window.location.href = `index.html`;
  }
  document.getElementById('start1').addEventListener('click', function(){
        localStorage.setItem("level", 2); 
        window.location.href="page3.html";
});
