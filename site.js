(()=>{
 const chapters=[...document.querySelectorAll('.chapter')],links=[...document.querySelectorAll('[data-chapter]')];
 const $=id=>document.getElementById(id);let index=0,presenting=false,scheduled=false;
 function reflect(){for(const [n,c] of chapters.entries())c.classList.toggle('current',n===index);for(const a of links){a.classList.toggle('active',Number(a.dataset.chapter)===index);if(Number(a.dataset.chapter)===index)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');}$('chapterCounter').textContent=String(index).padStart(2,'0')+' / 14';$('previous').disabled=index===0;$('next').disabled=index===14;$('progress').style.width=((index+1)/chapters.length*100)+'%';}
 function go(n,push=true){index=Math.min(14,Math.max(0,n));reflect();if(push)history.pushState(null,'','#'+chapters[index].id);if(presenting)window.scrollTo({top:0,behavior:'instant'});else chapters[index].scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});$('contents').classList.remove('open');$('contentsButton').setAttribute('aria-expanded','false');updateFrames();}
 for(const a of links)a.onclick=e=>{e.preventDefault();go(Number(a.dataset.chapter));};
 $('previous').onclick=()=>go(index-1);$('next').onclick=()=>go(index+1);
 $('presentButton').onclick=()=>{presenting=!presenting;document.body.classList.toggle('presenting',presenting);$('presentButton').textContent=presenting?'Read continuously':'Present';$('presentButton').setAttribute('aria-pressed',String(presenting));go(index,false);};
 $('contentsButton').onclick=()=>{const open=$('contents').classList.toggle('open');$('contentsButton').setAttribute('aria-expanded',String(open));};
 $('fullscreenButton').onclick=async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen();}catch{$('fullscreenButton').textContent='Use browser full screen';}};
 document.addEventListener('fullscreenchange',()=>{$('fullscreenButton').textContent=document.fullscreenElement?'Exit full screen':'Full screen';});
 window.addEventListener('keydown',e=>{if(/INPUT|BUTTON|SELECT|TEXTAREA|A/.test(e.target.tagName)||e.ctrlKey||e.metaKey||e.altKey)return;if(e.key==='ArrowRight'){e.preventDefault();go(index+1);}if(e.key==='ArrowLeft'){e.preventDefault();go(index-1);}if(e.key==='Escape'&&presenting)$('presentButton').click();});
 function fromHash(){const found=chapters.findIndex(c=>c.id===location.hash.slice(1));if(found>=0)go(found,false);}window.addEventListener('hashchange',fromHash);window.addEventListener('popstate',fromHash);
 function updateFrames(){for(const f of document.querySelectorAll('iframe')){const r=f.getBoundingClientRect(),visible=r.height>0&&r.bottom>0&&r.top<innerHeight&&!document.hidden;f.contentWindow?.postMessage({type:'diffusion-visibility',visible},'*');}}
 for(const f of document.querySelectorAll('iframe'))f.addEventListener('load',updateFrames);
 new IntersectionObserver(updateFrames,{threshold:[0,.01,.2]}).observe(document.querySelector('main'));
 window.addEventListener('scroll',()=>{if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{scheduled=false;if(!presenting){for(let i=0;i<chapters.length;i++)if(chapters[i].getBoundingClientRect().top<180)index=i;reflect();}updateFrames();});},{passive:true});
 window.addEventListener('resize',updateFrames);document.addEventListener('visibilitychange',updateFrames);
 reflect();if(location.hash)fromHash();updateFrames();
})();
