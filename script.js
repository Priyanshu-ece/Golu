
const scenes=["welcome","game","letter","reasons","wish","ending"];

function showScene(id){
  document.querySelectorAll(".scene").forEach(s=>{
    s.classList.remove("active");
    s.classList.add("hidden");
  });
  const el=document.getElementById(id);
  el.classList.remove("hidden");
  setTimeout(()=>el.classList.add("active"),20);
}

const music=document.getElementById("bgMusic");
const musicBtn=document.getElementById("musicBtn");

let playing=false;
musicBtn?.addEventListener("click",()=>{
  if(!playing){
    music.play().catch(()=>{});
    musicBtn.textContent="⏸";
  }else{
    music.pause();
    musicBtn.textContent="🎵";
  }
  playing=!playing;
});

const stars=document.getElementById("stars");
for(let i=0;i<300;i++){
  const s=document.createElement("div");
  s.className="star";
  s.style.left=Math.random()*100+"vw";
  s.style.top=Math.random()*100+"vh";
  s.style.animationDelay=(Math.random()*4)+"s";
  stars.appendChild(s);
}

const heartLayer=document.getElementById("floating-hearts");
setInterval(()=>{
  const h=document.createElement("div");
  h.className="heart";
  h.innerHTML="❤";
  h.style.left=Math.random()*100+"vw";
  h.style.fontSize=(14+Math.random()*18)+"px";
  h.style.animationDuration=(8+Math.random()*5)+"s";
  heartLayer.appendChild(h);
  setTimeout(()=>h.remove(),13000);
},700);

const fire=document.getElementById("fireflies");
for(let i=0;i<25;i++){
  const f=document.createElement("div");
  f.className="firefly";
  f.style.left=Math.random()*100+"vw";
  f.style.top=Math.random()*100+"vh";
  f.style.animationDelay=(Math.random()*5)+"s";
  fire.appendChild(f);
}

const shooting=document.getElementById("shooting-stars");
setInterval(()=>{
  const sh=document.createElement("div");
  sh.className="shoot";
  sh.style.left=Math.random()*100+"vw";
  sh.style.top=Math.random()*40+"vh";
  shooting.appendChild(sh);
  setTimeout(()=>sh.remove(),2000);
},5000);

document.getElementById("startJourney").addEventListener("click", function () {

    const music = document.getElementById("bgMusic");

    music.play();

    showScene("game");

    startGame();

});
let gameStarted=false;
let score=0;
function startGame(){
  if(gameStarted) return;
  gameStarted=true;
  const area=document.getElementById("gameArea");
  const scoreEl=document.getElementById("score");

  const maker=setInterval(()=>{
    if(score>=5){
      clearInterval(maker);
      setTimeout(()=>showScene("letter"),800);
      return;
    }
    const h=document.createElement("div");
    h.className="game-heart";
    h.innerHTML="❤️";
    h.style.left=Math.random()*90+"%";
    h.style.top="-30px";
    area.appendChild(h);
    let y=-30;
    const fall=setInterval(()=>{
      y+=3;
      h.style.top=y+"px";
      if(y>350){
        clearInterval(fall);
        h.remove();
      }
    },20);
    h.onclick=()=>{
      clearInterval(fall);
      h.remove();
      score++;
      scoreEl.textContent=score+" / 5";
    };
  },900);
}

document.getElementById("nextReason")?.addEventListener("click",()=>showScene("reasons"));

const reasons=[
"Because your smile is my favorite place.",
"Because you believe in me.",
"Because you make ordinary days magical.",
"Because your voice calms me.",
"Because you are my home."
];
let idx=0;
const box=document.getElementById("reasonBox");
box.textContent=reasons[0];
setInterval(()=>{
  if(document.getElementById("reasons").classList.contains("active")){
    idx=(idx+1)%reasons.length;
    box.textContent=reasons[idx];
  }
},3000);

document.getElementById("nextWish")?.addEventListener("click",()=>showScene("wish"));
document.getElementById("finalBtn")?.addEventListener("click",()=>showScene("ending"));
document.getElementById("yesBtn")?.addEventListener("click",()=>{
  alert("❤️ Thank you, Golu.\nI will keep loving you forever. ❤️");
});

let moonClicks=0;
document.querySelector(".moon")?.addEventListener("click",()=>{
  moonClicks++;
  if(moonClicks===7){
    alert("Secret unlocked ❤️\nI can't wait to meet you on 13 July.");
    moonClicks=0;
  }
});
