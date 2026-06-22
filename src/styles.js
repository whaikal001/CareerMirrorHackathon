/* ============================ THEME / STYLES ============================ */
export const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=Outfit:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500;700&display=swap');

.ct-root{
  --bg:#0a0e14; --bg2:#0d121b; --surf:#121925; --surf2:#171f2d;
  --line:rgba(255,255,255,.08); --line2:rgba(255,255,255,.14);
  --txt:#e9eef4; --muted:#8b98a8; --faint:#5d6877;
  --mint:#3ee9b4; --mint-dim:#1c9c77; --amber:#ffb347; --coral:#ff6b6b; --sky:#5cc8ff;
  --on-mint:#04140e;
  position:relative; min-height:100vh; width:100%;
  font-family:'Outfit',sans-serif; color:var(--txt);
  background:var(--bg); overflow-x:hidden; -webkit-font-smoothing:antialiased;
  transition:background .3s ease, color .3s ease;
}
.ct-root.light{
  --bg:#f3f6fa; --bg2:#ffffff; --surf:#ffffff; --surf2:#eef2f7;
  --line:rgba(15,30,45,.10); --line2:rgba(15,30,45,.18);
  --txt:#13202e; --muted:#51627a; --faint:#7c8aa0;
  --mint:#0aa37c; --mint-dim:#0c8767; --amber:#d98a00; --coral:#e05252; --sky:#0e87cc;
  --on-mint:#ffffff;
}
.ct-root *{box-sizing:border-box;}
.ct-bg{position:fixed; inset:0; z-index:0; pointer-events:none;
  background:
    radial-gradient(60vw 50vh at 12% -5%, rgba(62,233,180,.13), transparent 60%),
    radial-gradient(50vw 50vh at 95% 8%, rgba(92,200,255,.10), transparent 60%),
    radial-gradient(60vw 60vh at 50% 110%, rgba(255,179,71,.07), transparent 60%),
    var(--bg);}
.ct-root.light .ct-bg{
  background:
    radial-gradient(60vw 50vh at 12% -5%, rgba(10,163,124,.10), transparent 60%),
    radial-gradient(50vw 50vh at 95% 8%, rgba(14,135,204,.08), transparent 60%),
    radial-gradient(60vw 60vh at 50% 110%, rgba(217,138,0,.06), transparent 60%),
    var(--bg);}
.ct-grain{position:fixed; inset:0; z-index:1; pointer-events:none; opacity:.04;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");}
.ct-root.light .ct-grain{opacity:.025;}
.ct-wrap{position:relative; z-index:2; max-width:1320px; margin:0 auto; padding:0 28px 90px;}

.ct-top{display:flex; align-items:center; justify-content:space-between; padding:26px 0; gap:18px;}
.ct-brand{display:flex; align-items:center; gap:12px; min-width:max-content;}
.ct-logo{width:40px; height:40px; position:relative; flex:none;}
.ct-name{font-family:'Bricolage Grotesque'; font-weight:700; font-size:22px; letter-spacing:-.02em;}
.ct-name b{color:var(--mint);}
.ct-tag{font-family:'JetBrains Mono'; font-size:12px; color:var(--faint); letter-spacing:.14em; text-transform:uppercase;}
.ct-right{display:flex; align-items:center; gap:16px; min-width:0;}
.ct-steps{display:flex; align-items:center; gap:9px; flex-wrap:wrap; justify-content:flex-end;}
.ct-step{display:flex; align-items:center; gap:8px; font-family:'JetBrains Mono'; font-size:12.5px; color:var(--faint); letter-spacing:.05em; cursor:pointer;}
.ct-step:hover{color:var(--txt);}
.ct-dot{width:8px; height:8px; border-radius:50%; background:var(--line2); transition:.4s;}
.ct-step.on .ct-dot{background:var(--mint); box-shadow:0 0 12px var(--mint);}
.ct-step.on{color:var(--txt);}
.ct-step.done .ct-dot{background:var(--mint-dim);}
.ct-sep{color:var(--faint); opacity:.5;}
.ct-pfp,.ct-theme{width:44px; height:44px; border-radius:50%; flex:none; cursor:pointer; display:grid; place-items:center; transition:.2s;}
.ct-pfp{border:1px solid var(--line2); background:radial-gradient(circle at 35% 30%, var(--mint), var(--mint-dim)); color:var(--on-mint); font-family:'Bricolage Grotesque'; font-weight:700; font-size:18px;}
.ct-pfp:hover,.ct-theme:hover{transform:scale(1.06);}
.ct-theme{background:transparent; border:1px solid var(--line2); color:var(--muted);}
.ct-theme:hover{color:var(--txt); border-color:var(--mint);}

.ct-overlay{position:fixed; inset:0; z-index:50; background:rgba(4,8,12,.62); backdrop-filter:blur(5px); display:flex; justify-content:flex-end; animation:fade .25s ease;}
.ct-root.light .ct-overlay{background:rgba(30,45,60,.35);}
.ct-drawer{width:440px; max-width:92vw; height:100%; overflow-y:auto; padding:28px; background:linear-gradient(180deg,var(--surf),var(--bg2)); border-left:1px solid var(--line2); box-shadow:-30px 0 60px -20px rgba(0,0,0,.6); animation:slidein .32s cubic-bezier(.2,.7,.2,1);}
.ct-modal{width:470px; max-width:92vw; margin:auto; padding:28px; background:linear-gradient(180deg,var(--surf),var(--bg2)); border:1px solid var(--line2); border-radius:22px; box-shadow:0 30px 80px -30px rgba(0,0,0,.8); animation:pop .3s ease;}
.ct-detail{display:flex; flex-direction:column;}
.ct-drow{display:flex; align-items:center; justify-content:space-between; gap:18px; padding:12px 0; border-bottom:1px solid var(--line); font-size:15px;}

.ct-upload{display:flex; align-items:center; gap:10px; padding:14px 16px; border:1.5px dashed var(--line2); border-radius:12px; cursor:pointer; color:var(--muted); font-size:15px; font-family:'Outfit'; transition:.2s;}
.ct-upload:hover{border-color:var(--mint); color:var(--txt); background:rgba(62,233,180,.05);}
.ct-resume{display:flex; align-items:center; gap:11px; padding:13px 15px; border:1px solid var(--line2); border-radius:12px; background:rgba(62,233,180,.05); font-size:15px;}
.ct-thumb{height:200px; margin-bottom:10px; border:1px solid var(--line2); border-radius:12px; overflow:hidden; background:var(--bg); display:flex; align-items:center; justify-content:center; cursor:pointer; transition:.2s;}
.ct-thumb:hover{border-color:var(--mint);}
.ct-thumb img{width:100%; height:100%; object-fit:cover; object-position:top;}
.ct-thumb iframe{width:100%; height:100%; border:0; background:#fff; pointer-events:none;}
.ct-thumb-doc{display:flex; flex-direction:column; align-items:center; gap:8px; color:var(--faint); font-size:12px; font-family:'JetBrains Mono'; text-align:center; padding:0 16px;}

.ct-eyebrow{font-family:'JetBrains Mono'; font-size:12.5px; letter-spacing:.22em; text-transform:uppercase; color:var(--mint); margin-bottom:16px;}
h1.ct-h{font-family:'Bricolage Grotesque'; font-weight:700; letter-spacing:-.03em; line-height:1.02; margin:0;}
.ct-sub{color:var(--muted); font-size:18px; line-height:1.6; max-width:680px;}
.ct-card{background:linear-gradient(180deg,var(--surf),var(--bg2)); border:1px solid var(--line); border-radius:20px; padding:26px;}
.ct-mono{font-family:'JetBrains Mono';}
.ct-btn{display:inline-flex; align-items:center; gap:10px; cursor:pointer; border:none; font-family:'Outfit'; font-weight:600; font-size:17px; padding:15px 26px; border-radius:13px; transition:.2s;}
.ct-btn.pri{background:var(--mint); color:var(--on-mint); box-shadow:0 8px 30px -8px rgba(62,233,180,.6);}
.ct-btn.pri:hover{transform:translateY(-2px); box-shadow:0 14px 38px -8px rgba(62,233,180,.7);}
.ct-btn.ghost{background:transparent; color:var(--muted); border:1px solid var(--line2);}
.ct-btn.ghost:hover{color:var(--txt); border-color:var(--mint);}
.ct-btn:disabled{opacity:.55; cursor:not-allowed; transform:none!important;}

.ct-grid2{display:grid; grid-template-columns:1fr 1fr; gap:16px;}
.ct-grid3{display:grid; grid-template-columns:repeat(3,1fr); gap:18px;}
.ct-field label{display:block; font-size:13px; color:var(--muted); margin-bottom:7px; font-family:'JetBrains Mono'; letter-spacing:.04em;}
.ct-field input,.ct-field select{width:100%; background:var(--bg); border:1px solid var(--line2); color:var(--txt); border-radius:11px; padding:13px 15px; font-family:'Outfit'; font-size:15.5px; outline:none; transition:.2s;}
.ct-field input:focus,.ct-field select:focus{border-color:var(--mint);}
.ct-chips{display:flex; flex-wrap:wrap; gap:9px;}
.ct-chip{font-size:15px; padding:9px 16px; border-radius:99px; border:1px solid var(--line2); color:var(--muted); cursor:pointer; transition:.2s; font-family:'Outfit';}
.ct-chip.sel{background:rgba(62,233,180,.12); border-color:var(--mint); color:var(--mint);}
.ct-small-title{font-family:'JetBrains Mono'; font-size:11px; color:var(--faint); letter-spacing:2px; text-transform:uppercase;}

.ct-paths{display:grid; grid-template-columns:repeat(3,1fr); gap:18px;}
.ct-path{position:relative; overflow:hidden; transition:.25s; border:1px solid var(--line);}
.ct-path.clickable{cursor:pointer;}
.ct-path.clickable:hover{transform:translateY(-4px); border-color:var(--line2);}
.ct-path.sel{border-color:var(--mint); box-shadow:0 0 0 1px var(--mint), 0 20px 50px -20px rgba(62,233,180,.5);}
.ct-match{font-family:'Bricolage Grotesque'; font-weight:700; font-size:36px; letter-spacing:-.03em;}
.ct-tl{display:grid; grid-template-columns:repeat(4,1fr); gap:16px;}
.ct-age{font-family:'Bricolage Grotesque'; font-weight:700; font-size:32px; color:var(--mint);}
.ct-road{display:flex; flex-direction:column; gap:0;}
.ct-yr{display:flex; gap:20px; padding:18px 0; border-bottom:1px solid var(--line);}
.ct-yrn{font-family:'Bricolage Grotesque'; font-weight:700; font-size:17px; color:var(--amber); flex:none; width:74px;}
.ct-chat{display:flex; flex-direction:column; gap:13px; max-height:420px; overflow-y:auto; padding-right:6px;}
.ct-msg{max-width:78%; padding:13px 17px; border-radius:15px; font-size:16px; line-height:1.5; animation:pop .35s ease;}
.ct-msg.bot{background:var(--surf2); border:1px solid var(--line); border-bottom-left-radius:4px; align-self:flex-start;}
.ct-msg.me{background:var(--mint); color:var(--on-mint); border-bottom-right-radius:4px; align-self:flex-end; font-weight:500;}
.ct-avatar{width:52px; height:52px; border-radius:50%; flex:none; display:grid; place-items:center; background:radial-gradient(circle at 35% 30%, var(--mint), var(--mint-dim)); color:var(--on-mint); box-shadow:0 0 24px -4px var(--mint); animation:breathe 3s ease-in-out infinite;}
.ct-comp{display:flex; align-items:center; gap:13px; margin-bottom:13px;}
.ct-bar{height:8px; border-radius:9px; background:var(--line); flex:1; overflow:hidden;}
.ct-bar i{display:block; height:100%; border-radius:9px; background:linear-gradient(90deg,var(--mint-dim),var(--mint));}
.ct-alert{display:flex; gap:14px; padding:17px; border-radius:14px; border:1px solid var(--line); background:var(--surf);}
.ct-alert.warn{border-color:rgba(255,107,107,.4); background:rgba(255,107,107,.06);}
.ct-scan{font-family:'JetBrains Mono'; font-size:14.5px; color:var(--muted); display:flex; align-items:center; gap:11px; padding:8px 0;}

@keyframes fade{from{opacity:0;} to{opacity:1;}}
@keyframes slidein{from{transform:translateX(40px); opacity:.4;} to{transform:none; opacity:1;}}
@keyframes pop{from{opacity:0; transform:translateY(8px) scale(.98);} to{opacity:1; transform:none;}}
@keyframes breathe{0%,100%{transform:scale(1);} 50%{transform:scale(1.06);}}
@keyframes rise{from{opacity:0; transform:translateY(18px);} to{opacity:1; transform:none;}}
@keyframes spin{to{transform:rotate(360deg);}}
.reveal{animation:rise .6s cubic-bezier(.2,.7,.2,1) both;}
.ct-screen{animation:rise .5s ease both;}
.spin{animation:spin 1s linear infinite;}

@media(max-width:980px){
  .tw-grid{grid-template-columns:1fr!important;}
  .ct-paths,.ct-grid3{grid-template-columns:1fr 1fr;}
  .ct-steps{display:none;}
}
@media(max-width:760px){
  .ct-grid2,.ct-paths,.ct-grid3{grid-template-columns:1fr;}
  .ct-tl{grid-template-columns:1fr 1fr;}
  .ct-tag{display:none;}
  h1.ct-h{font-size:38px!important;}
  .ct-wrap{padding:0 18px 70px;}
}
`;
