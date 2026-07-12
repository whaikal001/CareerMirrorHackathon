export const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&family=Fraunces:ital,wght@0,600;0,700;1,600;1,700&display=swap');

.ct-root{
  --bg:#14181d; --bg2:#181d23; --surf:#1c2229; --surf2:#232a33;
  --line:rgba(255,255,255,.09); --line2:rgba(255,255,255,.16);
  --txt:#e8ecf0; --muted:#98a4b0; --faint:#6b7684;
  --mint:#3cc492; --mint-dim:#2a9770; --amber:#d9a441; --coral:#d97070; --sky:#5aa7d6;
  --on-mint:#0b1512;
  position:relative; min-height:100vh; width:100%;
  font-family:'Outfit',sans-serif; color:var(--txt);
  background:var(--bg); overflow-x:hidden; -webkit-font-smoothing:antialiased;
  transition:background .3s ease, color .3s ease;
}
.ct-root.light{
  --bg:#f6f7f9; --bg2:#ffffff; --surf:#ffffff; --surf2:#eef1f4;
  --line:rgba(20,35,50,.10); --line2:rgba(20,35,50,.18);
  --txt:#21303d; --muted:#5b6b7c; --faint:#8593a2;
  --mint:#0e9f6e; --mint-dim:#0b7f58; --amber:#c98a12; --coral:#d95c5c; --sky:#177fbf;
  --on-mint:#ffffff;
}
.ct-root *{box-sizing:border-box;}
.ct-bg{position:fixed; inset:0; z-index:0; pointer-events:none; background:var(--bg);}
.ct-grain{display:none;}
.ct-wrap{position:relative; z-index:2; max-width:1320px; margin:0 auto; padding:0 28px 90px;}

.ct-top{display:flex; align-items:center; justify-content:space-between; padding:26px 0; gap:18px;}
.ct-brand{display:flex; align-items:center; gap:12px; min-width:max-content;}
.ct-logo{width:40px; height:40px; position:relative; flex:none;}
.ct-name{font-weight:700; font-size:21px; letter-spacing:-.01em;}
.ct-name b{color:var(--mint);}
.ct-tag{font-size:12px; color:var(--faint); letter-spacing:.08em; text-transform:uppercase;}
.ct-right{display:flex; align-items:center; gap:16px; min-width:0;}
.ct-steps{display:flex; align-items:center; gap:9px; flex-wrap:wrap; justify-content:flex-end;}
.ct-step{display:flex; align-items:center; gap:8px; font-size:13px; color:var(--faint); letter-spacing:.02em; cursor:pointer;}
.ct-step:hover{color:var(--txt);}
.ct-dot{width:8px; height:8px; border-radius:50%; background:var(--line2); transition:.4s;}
.ct-step.on .ct-dot{background:var(--mint);}
.ct-step.on{color:var(--txt);}
.ct-step.done .ct-dot{background:var(--mint-dim);}
.ct-sep{color:var(--faint); opacity:.5;}
.ct-pfp,.ct-theme{width:44px; height:44px; border-radius:50%; flex:none; cursor:pointer; display:grid; place-items:center; transition:.2s;}
.ct-pfp{border:1px solid var(--line2); background:var(--mint); color:var(--on-mint); font-weight:700; font-size:18px;}
.ct-pfp:hover,.ct-theme:hover{transform:scale(1.04);}
.ct-theme{background:transparent; border:1px solid var(--line2); color:var(--muted);}
.ct-theme:hover{color:var(--txt); border-color:var(--mint);}

.ct-overlay{position:fixed; inset:0; z-index:50; background:rgba(15,25,35,.45); display:flex; justify-content:flex-end; animation:fade .25s ease;}
.ct-drawer{width:440px; max-width:92vw; height:100%; overflow-y:auto; padding:28px; background:var(--bg2); border-left:1px solid var(--line2); box-shadow:-16px 0 40px -24px rgba(0,0,0,.35); animation:slidein .32s cubic-bezier(.2,.7,.2,1);}
.ct-modal{width:470px; max-width:92vw; margin:auto; padding:28px; background:var(--bg2); border:1px solid var(--line2); border-radius:14px; box-shadow:0 20px 50px -25px rgba(0,0,0,.4); animation:pop .3s ease;}
.ct-detail{display:flex; flex-direction:column;}
.ct-drow{display:flex; align-items:center; justify-content:space-between; gap:18px; padding:12px 0; border-bottom:1px solid var(--line); font-size:15px;}

.ct-upload{display:flex; align-items:center; gap:10px; padding:14px 16px; border:1.5px dashed var(--line2); border-radius:10px; cursor:pointer; color:var(--muted); font-size:15px; font-family:'Outfit'; transition:.2s;}
.ct-upload:hover{border-color:var(--mint); color:var(--txt);}
.ct-resume{display:flex; align-items:center; gap:11px; padding:13px 15px; border:1px solid var(--line2); border-radius:10px; background:var(--surf2); font-size:15px;}
.ct-thumb{height:200px; margin-bottom:10px; border:1px solid var(--line2); border-radius:10px; overflow:hidden; background:var(--bg); display:flex; align-items:center; justify-content:center; cursor:pointer; transition:.2s;}
.ct-thumb:hover{border-color:var(--mint);}
.ct-thumb img{width:100%; height:100%; object-fit:cover; object-position:top;}
.ct-thumb iframe{width:100%; height:100%; border:0; background:#fff; pointer-events:none;}
.ct-thumb-doc{display:flex; flex-direction:column; align-items:center; gap:8px; color:var(--faint); font-size:12px; text-align:center; padding:0 16px;}

.ct-eyebrow{font-size:12.5px; font-weight:600; letter-spacing:.09em; text-transform:uppercase; color:var(--mint); margin-bottom:16px;}
h1.ct-h{font-weight:700; letter-spacing:-.015em; line-height:1.08; margin:0;}
.ct-sub{color:var(--muted); font-size:18px; line-height:1.6; max-width:680px;}
.ct-card{background:var(--surf); border:1px solid var(--line); border-radius:12px; padding:24px;}
.ct-mono{font-family:'JetBrains Mono';}
.ct-btn{display:inline-flex; align-items:center; gap:10px; cursor:pointer; border:none; font-family:'Outfit'; font-weight:600; font-size:16.5px; padding:14px 24px; border-radius:10px; transition:.2s;}
.ct-btn.pri{background:var(--mint); color:var(--on-mint);}
.ct-btn.pri:hover{filter:brightness(1.06);}
.ct-btn.ghost{background:transparent; color:var(--muted); border:1px solid var(--line2);}
.ct-btn.ghost:hover{color:var(--txt); border-color:var(--mint);}
.ct-btn:disabled{opacity:.55; cursor:not-allowed;}

.ct-grid2{display:grid; grid-template-columns:1fr 1fr; gap:16px;}
.ct-grid3{display:grid; grid-template-columns:repeat(3,1fr); gap:18px;}
.ct-field label{display:block; font-size:12.5px; font-weight:600; color:var(--muted); margin-bottom:7px; letter-spacing:.05em; text-transform:uppercase;}
.ct-field input,.ct-field select{width:100%; background:var(--bg2); border:1px solid var(--line2); color:var(--txt); border-radius:9px; padding:12px 14px; font-family:'Outfit'; font-size:15.5px; outline:none; transition:.2s;}
.ct-field input:focus,.ct-field select:focus{border-color:var(--mint);}
.ct-field textarea{width:100%; background:var(--bg2); border:1px solid var(--line2); color:var(--txt); border-radius:9px; padding:12px 14px; font-family:'Outfit'; font-size:15.5px; line-height:1.55; outline:none; transition:.2s; min-height:150px; resize:vertical;}
.ct-field textarea:focus{border-color:var(--mint);}
.ct-chips{display:flex; flex-wrap:wrap; gap:9px;}
.ct-chip{font-size:14.5px; padding:8px 15px; border-radius:99px; border:1px solid var(--line2); color:var(--muted); cursor:pointer; transition:.2s; font-family:'Outfit'; background:var(--surf);}
.ct-chip.sel{background:rgba(46,164,120,.12); border-color:var(--mint); color:var(--mint);}
.ct-small-title{font-size:11px; font-weight:600; color:var(--faint); letter-spacing:.09em; text-transform:uppercase;}

.ct-serif{font-family:'Fraunces','Georgia',serif;}
.ct-accent{font-family:'Fraunces','Georgia',serif; font-style:italic; color:var(--amber);}
.ct-pills{display:inline-flex; background:var(--bg2); border:1px solid var(--line2); border-radius:99px; padding:4px; gap:2px;}
.ct-pill{padding:9px 18px; border-radius:99px; font-size:14px; cursor:pointer; color:var(--muted); font-weight:600; transition:.2s;}
.ct-pill:hover{color:var(--txt);}
.ct-pill.on{background:var(--txt); color:var(--bg2);}
.ct-pill.on:hover{color:var(--bg2);}
.ct-search{display:flex; align-items:center; gap:10px; background:var(--bg2); border:1px solid var(--line2); border-radius:14px; padding:6px 6px 6px 16px; max-width:600px;}
.ct-search input{border:none; background:transparent; outline:none; flex:1; font-family:'Outfit'; font-size:15px; color:var(--txt); min-width:0;}
.ct-grid4{display:grid; grid-template-columns:repeat(4,1fr); gap:16px;}
.ct-marquee{overflow:hidden; -webkit-mask-image:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent); mask-image:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent);}
.ct-marquee-track{display:flex; width:max-content; animation:marquee 38s linear infinite;}
.ct-marquee:hover .ct-marquee-track{animation-play-state:paused;}
.ct-marquee-set{display:flex; gap:12px; padding-right:12px;}
.ct-marquee .ct-chip{white-space:nowrap; flex:none;}
@keyframes marquee{from{transform:translateX(0);} to{transform:translateX(-50%);}}

.ct-paths{display:grid; grid-template-columns:repeat(3,1fr); gap:18px;}
.ct-path{position:relative; overflow:hidden; transition:.2s; border:1px solid var(--line);}
.ct-path.clickable{cursor:pointer;}
.ct-path.clickable:hover{transform:translateY(-2px); border-color:var(--line2);}
.ct-path.sel{border-color:var(--mint); box-shadow:0 0 0 1px var(--mint);}
.ct-match{font-weight:700; font-size:34px; letter-spacing:-.02em;}
.ct-tl{display:grid; grid-template-columns:repeat(4,1fr); gap:16px;}
.ct-age{font-weight:700; font-size:30px; color:var(--mint);}
.ct-road{display:flex; flex-direction:column; gap:0;}
.ct-yr{display:flex; gap:20px; padding:18px 0; border-bottom:1px solid var(--line);}
.ct-yrn{font-weight:700; font-size:17px; color:var(--amber); flex:none; width:74px;}
.ct-chat{display:flex; flex-direction:column; gap:13px; max-height:420px; overflow-y:auto; padding-right:6px;}
.ct-msg{max-width:78%; padding:13px 17px; border-radius:12px; font-size:16px; line-height:1.5; animation:pop .35s ease;}
.ct-msg.bot{background:var(--surf2); border:1px solid var(--line); border-bottom-left-radius:4px; align-self:flex-start;}
.ct-msg.me{background:var(--mint); color:var(--on-mint); border-bottom-right-radius:4px; align-self:flex-end; font-weight:500;}
.ct-avatar{width:52px; height:52px; border-radius:50%; flex:none; display:grid; place-items:center; background:var(--mint); color:var(--on-mint);}
.ct-comp{display:flex; align-items:center; gap:13px; margin-bottom:13px;}
.ct-bar{height:8px; border-radius:9px; background:var(--line); flex:1; overflow:hidden;}
.ct-bar i{display:block; height:100%; border-radius:9px; background:var(--mint);}
.ct-alert{display:flex; gap:14px; padding:17px; border-radius:11px; border:1px solid var(--line); background:var(--surf2);}
.ct-alert.warn{border-color:rgba(217,92,92,.4); background:rgba(217,92,92,.07);}
.ct-scan{font-family:'JetBrains Mono'; font-size:14.5px; color:var(--muted); display:flex; align-items:center; gap:11px; padding:8px 0;}

.ct-kanban{display:grid; grid-template-columns:repeat(5,1fr); gap:12px; margin-top:14px;}
.ct-kcol{background:var(--bg2); border:1px solid var(--line); border-radius:11px; padding:12px; min-height:130px; transition:.2s;}
.ct-kcol.over{border-color:var(--mint); background:var(--surf2);}
.ct-kcard{background:var(--surf2); border:1px solid var(--line); border-radius:9px; padding:11px 12px; margin-top:10px; cursor:grab; transition:.2s;}
.ct-kcard:active{cursor:grabbing;}
.ct-kcard:hover{border-color:var(--line2);}
.ct-kstatus{margin-top:9px; width:100%; background:transparent; border:1px solid var(--line2); border-radius:99px; padding:5px 10px; font-family:'Outfit'; font-size:12.5px; font-weight:600; cursor:pointer; outline:none; transition:.2s;}
.ct-kstatus option{background:var(--surf); color:var(--txt);}
.ct-kaction{margin-top:8px; font-size:13px; font-weight:600; color:var(--mint); cursor:pointer;}
.ct-kaction:hover{text-decoration:underline;}
.ct-knote{margin-top:8px; font-size:12.5px; color:var(--faint); font-family:'JetBrains Mono';}

@keyframes fade{from{opacity:0;} to{opacity:1;}}
@keyframes slidein{from{transform:translateX(40px); opacity:.4;} to{transform:none; opacity:1;}}
@keyframes pop{from{opacity:0; transform:translateY(8px) scale(.98);} to{opacity:1; transform:none;}}
@keyframes rise{from{opacity:0; transform:translateY(18px);} to{opacity:1; transform:none;}}
@keyframes spin{to{transform:rotate(360deg);}}
.reveal{animation:rise .6s cubic-bezier(.2,.7,.2,1) both;}
.ct-screen{animation:rise .5s ease both;}
.spin{animation:spin 1s linear infinite;}

@media print{
  body *{visibility:hidden;}
  .ct-sharecard, .ct-sharecard *{visibility:visible;}
  .ct-sharecard{position:fixed; inset:0; margin:0; max-width:none; border-radius:0; box-shadow:none;
    background:#ffffff!important; color:#16212c!important; border:none;}
  .ct-sharecard .ct-print-hide{display:none!important;}
}

@media(max-width:980px){
  .tw-grid{grid-template-columns:1fr!important;}
  .ct-paths,.ct-grid3{grid-template-columns:1fr 1fr;}
  .ct-grid4{grid-template-columns:repeat(2,1fr);}
  .ct-kanban{grid-template-columns:repeat(2,1fr);}
  .ct-steps{display:none;}
}
@media(max-width:760px){
  .ct-grid2,.ct-paths,.ct-grid3,.ct-grid4,.ct-kanban{grid-template-columns:1fr;}
  .ct-tl{grid-template-columns:1fr 1fr;}
  .ct-tag{display:none;}
  h1.ct-h{font-size:38px!important;}
  .ct-wrap{padding:0 18px 70px;}
}
`;
