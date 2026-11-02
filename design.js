const audio=document.querySelector('#audio'),music=document.querySelector('#music');audio.volume=.3;
function sync(){music.textContent=audio.paused?'♪':'Ⅱ';music.setAttribute('aria-pressed',String(!audio.paused));music.setAttribute('aria-label',audio.paused?'Музыканы күйгүзүү':'Музыканы өчүрүү')}
music.onclick=()=>{if(audio.paused)audio.play().then(sync).catch(()=>toast('Музыканы кайра күйгүзүп көрүңүз'));else{audio.pause();sync()}};
const enter=document.querySelector('#enter'),entry=document.querySelector('#entry'),main=document.querySelector('.invitation'),floating=document.querySelector('.floating');
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
let entering=false;
enter.onclick=()=>{if(entering)return;entering=true;enter.disabled=true;entry.classList.add('open');audio.play().then(sync).catch(sync);setTimeout(()=>{entry.hidden=true;document.body.classList.remove('entrance-active');document.body.classList.add('inside-yurt');main.inert=false;floating.inert=false;document.querySelector('h1').focus({preventScroll:true});entering=false},reduced?120:2900)};
document.querySelector('#replay').onclick=()=>{if(entering)return;scrollTo({top:0,behavior:'instant'});main.inert=true;floating.inert=true;document.body.classList.add('entrance-active');document.body.classList.remove('inside-yurt');entry.classList.remove('open');entry.hidden=false;enter.disabled=false;enter.focus({preventScroll:true})};
function toast(t){let e=document.createElement('div');e.className='toast';e.textContent=t;document.body.append(e);setTimeout(()=>e.remove(),3000)}
document.querySelector('#share').onclick=async()=>{try{await navigator.clipboard.writeText(location.href);toast('Ссылка скопирована ✓')}catch{prompt('Ссылканы көчүрүңүз',location.href)}};
function tick(){const n=Math.max(0,Date.parse(document.body.dataset.weddingDate)-Date.now());document.querySelector('#days').textContent=String(Math.ceil(n/86400000)).padStart(2,'0')}tick();setInterval(tick,60000);
const observer=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.12});document.querySelectorAll('.reveal').forEach(e=>observer.observe(e));
