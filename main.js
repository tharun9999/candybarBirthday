const PERSON_NAME = "Candybar";
const MUSIC_URL = "assets/music/ab.mp3"; 
const IMAGE_URL = "assets/images/birthday.jpeg"; 
const WISH_GIF_URL = "assets/images/doa.png"; 
const DEFAULT_SCHEDULE_ISO = "2025-10-31T00:00:00+05:30"; 
const IS_CREATOR = true;

// ---------- MAIN SCRIPT ----------
(function(){
  const beginBtn = document.getElementById('beginBtn');
  const stopMusicBtn = document.getElementById('stopMusicBtn');
  const backBtn1 = document.getElementById('backBtn1');
  const backBtn2 = document.getElementById('backBtn2');
  const toScene3 = document.getElementById('toScene3');
  const mainMedia = document.getElementById('mainMedia');
  const openMedia = document.getElementById('openMedia');
  const overlay = document.getElementById('overlay');
  const popupImg = document.getElementById('popupImg');
  const closePopup = document.getElementById('closePopup');
  const giftTextPara = document.getElementById('giftTextPara');
  const wishGif = document.getElementById('wishGif');
  const saveBtn = document.getElementById('saveBtn');
  const scheduleText = document.getElementById('scheduleText');
  const editTimeBtn = document.getElementById('editTimeBtn');
  const saveTimeBtn = document.getElementById('saveTimeBtn');
  const scheduleInput = document.getElementById('scheduleInput');
  const bgAudio = document.getElementById('bgAudio');
  const bgSource = document.getElementById('bgSource');
  const scenes = [document.getElementById('scene1'), document.getElementById('scene2'), document.getElementById('scene3')];
  const countdownDiv = document.createElement('div');
  countdownDiv.style.marginTop = "10px";
  countdownDiv.style.fontWeight = "600";
  countdownDiv.style.fontSize = "16px";
  countdownDiv.style.color = "rgba(0,0,0,0.7)";
  scheduleText.parentNode.insertBefore(countdownDiv, scheduleText.nextSibling);

  let current = 0;

  //document.getElementById('introName').textContent = PERSON_NAME;
  //document.getElementById('sampleImg1').src = IMAGE_URL;
  mainMedia.src = IMAGE_URL;
  openMedia.href = IMAGE_URL;
  wishGif.src = WISH_GIF_URL || IMAGE_URL;
  giftTextPara.textContent = "This ticket grants you three wishes — use it whenever you wish my dear moon🌙💖";

  bgSource.src = MUSIC_URL;
  bgAudio.load();
  bgAudio.play().catch(()=>{});

  const SCHEDULE_KEY = 'birthday_schedule_iso';
  let scheduleISO = localStorage.getItem(SCHEDULE_KEY) || DEFAULT_SCHEDULE_ISO;
  
  function formatLocal(iso){ return new Date(iso).toLocaleString('en-GB'); }
  function renderSchedule(){
    //scheduleText.textContent = formatLocal(scheduleISO) + " (local)";
    scheduleInput.value = new Date(scheduleISO).toISOString().slice(0,16);
  }

  // --- Countdown + button enable ---
// function updateCountdown() {
//   const now = new Date();
//   const scheduled = new Date(scheduleISO);
//   const diff = scheduled - now;

//   if (diff > 0) {
//     // Disable main button while waiting
//     beginBtn.disabled = true;

//     const days = Math.floor(diff / (1000*60*60*24));
//     const hours = Math.floor((diff % (1000*60*60*24)) / (1000*60*60));
//     const mins = Math.floor((diff % (1000*60*60)) / (1000*60));
//     const secs = Math.floor((diff % (1000*60)) / 1000);
//     countdownDiv.textContent = `Countdown: ${days}d ${hours}h ${mins}m ${secs}s`;

//     // 🟢 Start music automatically when 2 minutes remain
//     if (diff <= 2 * 60 * 1000 && bgAudio.paused) {
//       bgAudio.volume = 0.4;
//       bgAudio.muted = false;
//       bgAudio.play().catch(()=>{});
//       stopMusicBtn.style.display = "inline-block";
//       console.log("🎵 Music started automatically (2 min remaining)");
//     }

//   } else {
//     // 🎉 Enable button when countdown completes
//     beginBtn.disabled = false;
//     countdownDiv.textContent = "🎉 It's time! You can click Begin now.";

//     // If music isn’t already playing, start it here too
//     if (bgAudio.paused) {
//       bgAudio.volume = 0.4;
//       bgAudio.play().catch(()=>{});
//     }
//   }
// }
//      stopMusicBtn.addEventListener('click',()=>{
  

    // // 🎵 Manual music toggle button
    // stopMusicBtn.addEventListener("click", () => {
    //   if (bgAudio.paused) {
    //     bgAudio.play();
    //     stopMusicBtn.textContent = "Stop Music ⏸️";
    //   } else {
    //     bgAudio.pause();
    //     stopMusicBtn.textContent = "Play Music ▶️";
    //   }
    // });

// setInterval(updateCountdown, 1000);
// updateCountdown();
  function updateCountdown(){
    const now = new Date();
    const scheduled = new Date(scheduleISO);
    const diff = scheduled - now;
    if(diff > 0){
      beginBtn.disabled = true;
      const days = Math.floor(diff / (1000*60*60*24));
      const hours = Math.floor((diff % (1000*60*60*24)) / (1000*60*60));
      const mins = Math.floor((diff % (1000*60*60)) / (1000*60));
      const secs = Math.floor((diff % (1000*60)) / 1000);
      countdownDiv.textContent = `Countdown: ${days}d ${hours}h ${mins}m ${secs}s`;
    } else {
      beginBtn.disabled = false;
      countdownDiv.textContent = "🎉 It's time! You can click Begin now.";
    }
  }

  setInterval(updateCountdown, 1000);
  renderSchedule();
  updateCountdown();

  // --- Schedule edit logic (same) ---
  function saveScheduleFromInput(){
    if(!scheduleInput.value){ alert('Please pick a date/time'); return; }
    scheduleISO = new Date(scheduleInput.value).toISOString();
    localStorage.setItem(SCHEDULE_KEY, scheduleISO);
    renderSchedule();
    scheduleInput.style.display = 'none';
    saveTimeBtn.style.display = 'none';
    editTimeBtn.style.display = 'inline-block';
    updateCountdown();
  }

  if(IS_CREATOR){
    //time edit here
    editTimeBtn.disabled = true;
    editTimeBtn.style.display='none';
    editTimeBtn.addEventListener('click', ()=>{
      scheduleInput.style.display='block';
      saveTimeBtn.style.display='inline-block';
      editTimeBtn.style.display='none';
    });
    saveTimeBtn.addEventListener('click', saveScheduleFromInput);
    scheduleInput.addEventListener('keydown', e=>{ if(e.key==='Enter'){ e.preventDefault(); saveScheduleFromInput(); }});
  } else {
    editTimeBtn.disabled = true;
  }

  // Scene switching
  function showScene(idx){
    scenes.forEach((s,i)=> s.classList.toggle('active', i===idx));
    current = idx;
  }

  // Hearts animation (unchanged)
  let heartInterval=null;
  function spawnHearts(){
    if(heartInterval) return;
    heartInterval=setInterval(()=>{
      if(current!==1) return;
      const h=document.createElement('div');
      h.className='heart';
      h.style.left=Math.random()*(window.innerWidth-16)+'px';
      h.style.top=(window.innerHeight+30)+'px';
      const dur=3+Math.random()*3;
      h.style.animationDuration=dur+'s';
      document.body.appendChild(h);
      setTimeout(()=>{h.remove();},dur*1000+800);
    },400);
  }
  function stopHearts(){
    if(heartInterval){ clearInterval(heartInterval); heartInterval=null; }
    document.querySelectorAll('.heart').forEach(h=>h.remove());
  }
  function spawnConfetti(n){
    for(let i=0;i<n;i++){
      const el = document.createElement('div');
      el.style.position='fixed'; el.style.left = (10 + Math.random()*80) + '%'; el.style.top = '-40px';
      const w = 6 + Math.random()*14; el.style.width = w + 'px'; el.style.height = (w*0.6) + 'px';
      el.style.background = `hsl(${Math.random()*360} 80% 60%)`; el.style.opacity = 0.95; el.style.zIndex=50;
      el.style.transform = `rotate(${Math.random()*360}deg)`;
      document.body.appendChild(el);
      const dur = 3000 + Math.random()*2500;
      el.animate([{transform:`translateY(0) rotate(${Math.random()*360}deg)`, opacity:1},{transform:`translateY(${window.innerHeight + 200}px) rotate(${Math.random()*720}deg)`, opacity:0}], {duration:dur, easing:'cubic-bezier(.2,.8,.2,1)'});
      setTimeout(()=>{ try{ el.remove(); } catch(e){} }, dur+120);
    }
  }
  beginBtn.addEventListener('click',()=>{ showScene(1); spawnHearts(); bgAudio.play(); });
  backBtn1.addEventListener('click',()=>{ stopHearts(); showScene(0); });
  toScene3.addEventListener('click',()=>{ stopHearts(); showScene(2); spawnConfetti(82);});
  backBtn2.addEventListener('click',()=>{ showScene(1); spawnHearts(); });

  mainMedia.addEventListener('click',e=>{
    e.preventDefault();
    popupImg.src=mainMedia.src;
    overlay.classList.add('show');
  });
  closePopup.addEventListener('click',()=>overlay.classList.remove('show'));

  stopMusicBtn.addEventListener('click',()=>{
    if(bgAudio.paused){ bgAudio.play(); stopMusicBtn.textContent='Stop Music ⏸️'; }
    else{ bgAudio.pause(); stopMusicBtn.textContent='Play Music ▶️'; }
  });

  // --- Fix Save PNG ---
  saveBtn.addEventListener('click',()=>{
    const container = document.getElementById('scene3');
    html2canvas(container, {useCORS:true, scale:2}).then(canvas=>{
      const link = document.createElement('a');
      link.download = `${PERSON_NAME}_wish.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  });

})();