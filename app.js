
/* DriftingDroids – HTML/JS-portti (kokeilu)
   Peruslauta + liike + syvyysrajallinen BFS.
   Kvadranttidata on poimittu Board.java:sta (DriftingDroids 1.3.10).
*/

const QUADS = [[["wall", 1, 0, "E"], ["wall", 4, 1, "NW"], ["goal", 4, 1, 0, "circle"], ["wall", 1, 2, "NE"], ["goal", 1, 2, 1, "triangle"], ["wall", 6, 3, "SE"], ["goal", 6, 3, 3, "star"], ["wall", 0, 5, "S"], ["wall", 3, 6, "SW"], ["goal", 3, 6, 2, "square"], ["wall", 7, 7, "NESW"]], [["wall", 3, 0, "E"], ["wall", 5, 1, "SE"], ["goal", 5, 1, 1, "star"], ["wall", 1, 2, "SW"], ["goal", 1, 2, 0, "square"], ["wall", 0, 3, "S"], ["wall", 6, 4, "NW"], ["goal", 6, 4, 3, "circle"], ["wall", 2, 6, "NE"], ["goal", 2, 6, 2, "triangle"], ["wall", 7, 7, "NESW"]], [["wall", 3, 0, "E"], ["wall", 5, 2, "SE"], ["goal", 5, 2, 2, "star"], ["wall", 0, 4, "S"], ["wall", 2, 4, "NE"], ["goal", 2, 4, 1, "circle"], ["wall", 7, 5, "SW"], ["goal", 7, 5, 0, "triangle"], ["wall", 1, 6, "NW"], ["goal", 1, 6, 3, "square"], ["wall", 7, 7, "NESW"]], [["wall", 3, 0, "E"], ["wall", 6, 1, "SW"], ["goal", 6, 1, 2, "circle"], ["wall", 1, 3, "NE"], ["goal", 1, 3, 3, "triangle"], ["wall", 5, 4, "NW"], ["goal", 5, 4, 1, "square"], ["wall", 2, 5, "SE"], ["goal", 2, 5, 0, "star"], ["wall", 7, 5, "SE"], ["goal", 7, 5, -1, "vortex"], ["wall", 0, 6, "S"], ["wall", 7, 7, "NESW"]], [["wall", 4, 0, "E"], ["wall", 6, 1, "SE"], ["goal", 6, 1, 3, "star"], ["wall", 1, 2, "NW"], ["goal", 1, 2, 1, "triangle"], ["wall", 0, 5, "S"], ["wall", 6, 5, "NE"], ["goal", 6, 5, 2, "square"], ["wall", 3, 6, "SW"], ["goal", 3, 6, 0, "circle"], ["wall", 7, 7, "NESW"]], [["wall", 4, 0, "E"], ["wall", 2, 1, "NW"], ["goal", 2, 1, 3, "circle"], ["wall", 6, 3, "SW"], ["goal", 6, 3, 2, "triangle"], ["wall", 0, 4, "S"], ["wall", 4, 5, "NE"], ["goal", 4, 5, 0, "square"], ["wall", 1, 6, "SE"], ["goal", 1, 6, 1, "star"], ["wall", 7, 7, "NESW"]], [["wall", 3, 0, "E"], ["wall", 1, 1, "SW"], ["goal", 1, 1, 0, "triangle"], ["wall", 6, 2, "NE"], ["goal", 6, 2, 1, "circle"], ["wall", 2, 4, "SE"], ["goal", 2, 4, 2, "star"], ["wall", 0, 5, "S"], ["wall", 7, 5, "NW"], ["goal", 7, 5, 3, "square"], ["wall", 7, 7, "NESW"]], [["wall", 4, 0, "E"], ["wall", 2, 1, "SE"], ["goal", 2, 1, 0, "star"], ["wall", 1, 3, "SW"], ["goal", 1, 3, 1, "square"], ["wall", 0, 4, "S"], ["wall", 6, 4, "NW"], ["goal", 6, 4, 3, "triangle"], ["wall", 5, 6, "NE"], ["goal", 5, 6, 2, "circle"], ["wall", 3, 7, "SE"], ["goal", 3, 7, -1, "vortex"], ["wall", 7, 7, "NESW"]], [["wall", 1, 0, "E"], ["wall", 3, 1, "NW"], ["goal", 3, 1, 1, "triangle"], ["wall", 6, 3, "SE"], ["goal", 6, 3, 3, "star"], ["wall", 1, 4, "SW"], ["goal", 1, 4, 0, "circle"], ["wall", 0, 6, "S"], ["wall", 4, 6, "NE"], ["goal", 4, 6, 2, "square"], ["wall", 7, 7, "NESW"]], [["wall", 5, 0, "E"], ["wall", 3, 2, "NW"], ["goal", 3, 2, 3, "circle"], ["wall", 0, 3, "S"], ["wall", 5, 3, "SW"], ["goal", 5, 3, 2, "triangle"], ["wall", 2, 4, "NE"], ["goal", 2, 4, 0, "square"], ["wall", 4, 5, "SE"], ["goal", 4, 5, 1, "star"], ["wall", 7, 7, "NESW"]], [["wall", 1, 0, "E"], ["wall", 4, 1, "NE"], ["goal", 4, 1, 1, "circle"], ["wall", 1, 3, "SW"], ["goal", 1, 3, 0, "triangle"], ["wall", 0, 5, "S"], ["wall", 5, 5, "NW"], ["goal", 5, 5, 3, "square"], ["wall", 3, 6, "SE"], ["goal", 3, 6, 2, "star"], ["wall", 7, 7, "NESW"]], [["wall", 2, 0, "E"], ["wall", 5, 1, "SW"], ["goal", 5, 1, 2, "circle"], ["wall", 7, 2, "SE"], ["goal", 7, 2, -1, "vortex"], ["wall", 0, 3, "S"], ["wall", 3, 4, "SE"], ["goal", 3, 4, 0, "star"], ["wall", 6, 5, "NW"], ["goal", 6, 5, 1, "square"], ["wall", 1, 6, "NE"], ["goal", 1, 6, 3, "triangle"], ["wall", 7, 7, "NESW"]], [["wall", 5, 0, "E"], ["wall", 1, 3, "NW"], ["goal", 1, 3, 0, "circle"], ["wall", 6, 4, "SE"], ["goal", 6, 4, 3, "star"], ["wall", 0, 5, "S"], ["wall", 2, 6, "NE"], ["goal", 2, 6, 1, "triangle"], ["wall", 3, 6, "SW"], ["goal", 3, 6, 2, "square"], ["wall", 7, 7, "NESW"]], [["wall", 2, 0, "E"], ["wall", 5, 2, "SE"], ["goal", 5, 2, 1, "star"], ["wall", 6, 2, "NW"], ["goal", 6, 2, 3, "circle"], ["wall", 1, 5, "SW"], ["goal", 1, 5, 0, "square"], ["wall", 0, 6, "S"], ["wall", 4, 7, "NE"], ["goal", 4, 7, 2, "triangle"], ["wall", 7, 7, "NESW"]], [["wall", 4, 0, "E"], ["wall", 0, 2, "S"], ["wall", 6, 2, "SE"], ["goal", 6, 2, 2, "star"], ["wall", 2, 4, "NE"], ["goal", 2, 4, 1, "circle"], ["wall", 3, 4, "SW"], ["goal", 3, 4, 0, "triangle"], ["wall", 5, 6, "NW"], ["goal", 5, 6, 3, "square"], ["wall", 7, 7, "NESW"]], [["wall", 4, 0, "E"], ["wall", 6, 2, "NW"], ["goal", 6, 2, 3, "triangle"], ["wall", 2, 3, "NE"], ["goal", 2, 3, 2, "circle"], ["wall", 3, 3, "SW"], ["goal", 3, 3, 1, "square"], ["wall", 1, 5, "SE"], ["goal", 1, 5, 0, "star"], ["wall", 0, 6, "S"], ["wall", 5, 7, "SE"], ["goal", 5, 7, -1, "vortex"], ["wall", 7, 7, "NESW"]]];

// --- Utility ---
const DIRS = ["N","E","S","W"];
const DIR_IDX = {N:0,E:1,S:2,W:3};
const DXY = [
  [0,-1], // N
  [1,0],  // E
  [0,1],  // S
  [-1,0], // W
];

const ROBOT_COLORS = ["#ff4d4d","#2ee88f","#4db8ff","#ffd84d","#c9d2dc"]; // r,g,b,y,s
const ROBOT_NAMES = ["Punainen","Vihreä","Sininen","Keltainen","Harmaa"];
const DIR_ARROW = {N:"↑",E:"→",S:"↓",W:"←"};

function randInt(n){ return (Math.random()*n)|0; }
function shuffle(a){ for(let i=a.length-1;i>0;i--){ const j=randInt(i+1); [a[i],a[j]]=[a[j],a[i]]; } return a; }

// --- Board ---
class Board {
  constructor(w=16,h=16,numRobots=4){
    this.w=w; this.h=h; this.size=w*h;
    // walls[dir][pos] => 1 means a wall blocks exiting pos in that dir
    this.walls = Array.from({length:4}, ()=> new Uint8Array(this.size));
    this.goals = []; // {x,y,pos,robot,shape}
    this.goal = null;
    this.startGoal = null; // initial goal (restored on reset)
    this.robots = new Int16Array(numRobots);
    this.startRobots = null;
    this.quadPick = null; // [qNW,qNE,qSE,qSW] indices 0..15
    this.addOuterWalls();
  }

  idx(x,y){ return x + y*this.w; }
  xy(pos){ return [pos%this.w, (pos/this.w)|0]; }

  addOuterWalls(){
    for(let x=0;x<this.w;x++){
      this.walls[DIR_IDX.N][this.idx(x,0)] = 1;
      this.walls[DIR_IDX.S][this.idx(x,this.h-1)] = 1;
    }
    for(let y=0;y<this.h;y++){
      this.walls[DIR_IDX.W][this.idx(0,y)] = 1;
      this.walls[DIR_IDX.E][this.idx(this.w-1,y)] = 1;
    }
  }

  addWall(x,y,dirs){
    // Mirror walls on both sides (like Board.setWalls() in the original Java).
    const setWall = (xx,yy,dir)=>{
      if(xx<0||yy<0||xx>=this.w||yy>=this.h) return;
      this.walls[dir][this.idx(xx,yy)] = 1;
    };
    for(const ch of dirs){
      if(ch==="N"){
        setWall(x,y, DIR_IDX.N);
        setWall(x, y-1, DIR_IDX.S);
      }
      if(ch==="E"){
        setWall(x,y, DIR_IDX.E);
        setWall(x+1, y, DIR_IDX.W);
      }
      if(ch==="S"){
        setWall(x,y, DIR_IDX.S);
        setWall(x, y+1, DIR_IDX.N);
      }
      if(ch==="W"){
        setWall(x,y, DIR_IDX.W);
        setWall(x-1, y, DIR_IDX.E);
      }
    }
    return this;
  }

  addGoal(x,y,robot,shape){
    const pos=this.idx(x,y);
    this.goals.push({x,y,pos,robot,shape});
    return this;
  }

  setGoalRandom(){
    this.goal = this.goals[randInt(this.goals.length)];
  }



  setRobotsRandom(){
    // Randomize starting positions (optional variant).
    // Avoid the 2×2 center block and avoid placing on goals to prevent instant solves.
    const blocked = new Set([
      this.idx(7,7), this.idx(8,7), this.idx(7,8), this.idx(8,8)
    ]);
    for(const g of this.goals) blocked.add(g.pos);

    const used = new Set(blocked);
    for(let i=0;i<this.robots.length;i++){
      let pos;
      do{
        pos = (Math.random()*this.size)|0;
      }while(used.has(pos));
      used.add(pos);
      this.robots[i] = pos;
    }
    this.startRobots = new Int16Array(this.robots);
  }


  isRobotAt(pos){
    for(let i=0;i<this.robots.length;i++) if(this.robots[i]===pos) return true;
    return false;
  }

  moveRobot(robo, dirChar){
    const dir = DIR_IDX[dirChar];
    let pos = this.robots[robo];
    const [dx,dy]=DXY[dir];
    while(true){
      if(this.walls[dir][pos]) break;
      const [x,y]=this.xy(pos);
      const nx=x+dx, ny=y+dy;
      const npos=this.idx(nx,ny);
      if(this.isRobotAt(npos)) break;
      pos = npos;
    }
    const moved = (pos !== this.robots[robo]);
    this.robots[robo]=pos;
    return moved;
  }

  isSolved(){
    if(!this.goal) return false;

    // Rule: cannot solve on the very first move
    if(totalMoves < 2) return false;

    if(this.goal.robot === -1){
      for(let i=0;i<this.robots.length;i++){
        if(this.robots[i]===this.goal.pos){
          // require at least one valid 90° turn for the robot that hits the goal
          return !!hasRightAngleTurn[i];
        }
      }
      return false;
    }

    const r = this.goal.robot;
    if(this.robots[r] !== this.goal.pos) return false;

    // require at least one valid 90° turn for the winning robot
    return !!hasRightAngleTurn[r];
  }

}

// Quadrant transform (copied from Java logic)
function transformQuadrantX(qx,qy,qPos, w=16){
  switch(qPos){
    case 1: return w-1-qy;
    case 2: return w-1-qx;
    case 3: return qy;
    default:return qx;
  }
}
function transformQuadrantY(qx,qy,qPos, h=16){
  switch(qPos){
    case 1: return qx;
    case 2: return h-1-qy;
    case 3: return h-1-qx;
    default:return qy;
  }
}

function buildQuadrantBoard(actions){
  const qb = new Board(16,16,4);
  qb.walls = Array.from({length:4}, ()=> new Uint8Array(qb.size));
  qb.goals = [];
  qb.goal=null;
  for(const a of actions){
    if(a[0]==="wall") qb.addWall(a[1],a[2],a[3]);
    else qb.addGoal(a[1],a[2],a[3],a[4]);
  }
  return qb;
}

const QUAD_BOARDS = QUADS.map(buildQuadrantBoard);

function addQuadrant(board, qNum, qPos){
  const quad = QUAD_BOARDS[qNum];
  const halfW = quad.w/2; // 8
  const halfH = quad.h/2; // 8

  for(let qy=0;qy<halfH;qy++){
    for(let qx=0;qx<halfW;qx++){
      const srcPos = quad.idx(qx,qy);
      const tx = transformQuadrantX(qx,qy,qPos,board.w);
      const ty = transformQuadrantY(qx,qy,qPos,board.h);
      const dstPos = board.idx(tx,ty);
      for(let dir=0;dir<4;dir++){
        const dstDir = (dir + qPos) & 3;
        if(quad.walls[dir][srcPos]) board.walls[dstDir][dstPos]=1;
      }
    }
    // boundary column
    const qx=halfW;
    const srcPosBoundary = quad.idx(qx-1,qy);
    const tx = transformQuadrantX(qx,qy,qPos,board.w);
    const ty = transformQuadrantY(qx,qy,qPos,board.h);
    const dstPos = board.idx(tx,ty);
    const dstDir = (DIR_IDX.W + qPos) & 3;
    if(quad.walls[DIR_IDX.E][srcPosBoundary]) board.walls[dstDir][dstPos]=1;
  }

  for(let qx=0;qx<halfW;qx++){
    const qy=halfH;
    const srcPosBoundary = quad.idx(qx,qy-1);
    const tx = transformQuadrantX(qx,qy,qPos,board.w);
    const ty = transformQuadrantY(qx,qy,qPos,board.h);
    const dstPos = board.idx(tx,ty);
    const dstDir = (DIR_IDX.N + qPos) & 3;
    if(quad.walls[DIR_IDX.S][srcPosBoundary]) board.walls[dstDir][dstPos]=1;
  }

  for(const g of quad.goals){
    const tx = transformQuadrantX(g.x,g.y,qPos,board.w);
    const ty = transformQuadrantY(g.x,g.y,qPos,board.h);
    board.addGoal(tx,ty,g.robot,g.shape);
  }
}

function createBoardRandom(numRobots=4){
  const pickedQuadrants = [];
  const b = new Board(16,16,numRobots);
  b.walls = Array.from({length:4}, ()=> new Uint8Array(b.size));
  b.goals = [];
  b.goal=null;

  // Quadrant groups A–D: pick exactly one from each group
  
// Valitaan aina 1,2,3,4 — kirjain (A–D) arvotaan erikseen jokaiselle
const pick = [0,1,2,3].map(num => {
  const letter = (Math.random()*4)|0; // 0=A,1=B,2=C,3=D
  return letter*4 + num;              // esim B2 = 1*4 + 1 = 5
});

shuffle(pick);



  for(let qPos=0;qPos<4;qPos++){ pickedQuadrants[qPos]=pick[qPos]; addQuadrant(b, pick[qPos], qPos); }
  b.quadPick = pickedQuadrants; b.pickedQuadrants = pickedQuadrants;

  b.addOuterWalls();
  b.setRobotsRandom();
  b.setGoalRandom();
  b.startGoal = b.goal;
  return b;
}

// --- Rendering ---
const cv = document.getElementById("cv");
const ctx = cv.getContext("2d");
const statusEl = document.getElementById("status");
const goalInfoEl = document.getElementById("goalInfo");
const selInfoEl = document.getElementById("selInfo");
const solList = document.getElementById("solList");

let board = createBoardRandom(4);
let selectedRobot = 0;

// --- Move-history for "must make at least one 90° turn" rule ---
let totalMoves = 0;                 // total moves since (re)start
let lastDir = [];                   // per robot: last direction char
let hasRightAngleTurn = [];         // per robot: has made a valid 90° turn

// --- Delayed start-capture for "Alkuasetelma" when a new goal is rolled ---
let pendingStartCapture = false;
let pendingStartRobots = null;
let pendingStartGoal = null;

function isOppositeDir(a,b){
  return (a==="N"&&b==="S")||(a==="S"&&b==="N")||(a==="E"&&b==="W")||(a==="W"&&b==="E");
}



function resetMoveHistory(){
  totalMoves = 0;
  lastDir = Array(board.robots.length).fill(null);
  hasRightAngleTurn = Array(board.robots.length).fill(false);
}

function updateMoveHistory(robotIndex, dirChar){
  totalMoves++;
  const prev = lastDir[robotIndex];
  if(prev && dirChar !== prev && !isOppositeDir(prev, dirChar)){
    hasRightAngleTurn[robotIndex] = true;
  }
  lastDir[robotIndex] = dirChar;
}

resetMoveHistory();


// Build mode: player can set quadrants, robot starts, and goal, then start play.
let isBuildMode = false;
let buildSelectedRobot = 0; // which robot is placed by clicking in build mode

function setBuildMode(on){
  isBuildMode = !!on;
  const bp = document.getElementById("buildPanel");
  if(bp) bp.style.display = isBuildMode ? "" : "none";
  // In build mode, solver controls are still visible, but you typically use "Aloita peli"
  setStatus(isBuildMode ? "Build-tila: aseta kvadrantit, robotit ja tavoite." : "Pelitila.");
  draw();
}

function labelForQuadrant(q){
  const g = Math.floor(q/4); // 0..3 => A..D
  const n = (q%4)+1;         // 1..4
  return String.fromCharCode(65+g) + String(n);
}

function goalLabel(g){
  const pos = `${g.x},${g.y}`;
  if(g.robot === -1) return `${g.shape} (mikä tahansa) @ ${pos}`;
  return `${g.shape} / ${ROBOT_NAMES[g.robot]} @ ${pos}`;
}


// Track used goals so the next target is always new (until all are used).
let usedGoals = new Set();
function goalKey(g){
  // Unique by position + robot + shape
  return g.pos + "|" + g.robot + "|" + g.shape;
}

function goalReachableInOneMove(g){
  if(!g) return false;
  const dirs = ["N","E","S","W"];
  const robotsToCheck = (g.robot === -1) ? [...Array(board.robots.length).keys()] : [g.robot];
  for(const r of robotsToCheck){
    const saved = board.robots[r];
    for(const d of dirs){
      board.moveRobot(r, d);
      const hit = (board.robots[r] === g.pos);
      board.robots[r] = saved;
      if(hit) return true;
    }
  }
  return false;
}								   
function pickNewGoalAvoidRepeats(){
  if(!board.goals || board.goals.length===0) return;
  // If everything was used, start over (but still avoid immediate repeat if possible)
  if(usedGoals.size >= board.goals.length){
    usedGoals.clear();
  }
  const prevKey = board.goal ? goalKey(board.goal) : null;
  const candidates = [];
  for(const g of board.goals){
    const k = goalKey(g);
    if(usedGoals.has(k)) continue;
	if(goalReachableInOneMove(g)) continue; // avoid trivial straight-line one-move goals																					 
    candidates.push(g);
  }

  // If empty due to straight-line filter, relax it (still keep usedGoals filter)
  let pool = candidates.length ? candidates : null;
  if(!pool){
    const cand2 = [];
    for(const g2 of board.goals){
      const k2 = goalKey(g2);
      if(usedGoals.has(k2)) continue;
      cand2.push(g2);
    }
    pool = cand2.length ? cand2 : board.goals.slice();
  }
  // Avoid immediate repeat if there is an alternative
  let g = pool[(Math.random()*pool.length)|0];
  if(prevKey && pool.length>1){
    for(let tries=0; tries<10 && goalKey(g)===prevKey; tries++){
      g = pool[(Math.random()*pool.length)|0];
    }
  }
  board.goal = g;
  usedGoals.add(goalKey(g));
}
// Seed with the initial goal
if(board.goal) usedGoals.add(goalKey(board.goal));

function setStatus(t){ statusEl.textContent=t; }


function drawRobotHead(cx, cy, r, color, isSelected){
  // Robot head: rounded square body + 2 antennas + eyes + grille mouth.
  const w = r*2.05;
  const h = r*1.90;
  const x = cx - w/2;
  const y = cy - h/2 + r*0.05;
  const rad = r*0.38;

  // Body path (rounded rect)
  ctx.beginPath();
  ctx.moveTo(x+rad, y);
  ctx.lineTo(x+w-rad, y);
  ctx.quadraticCurveTo(x+w, y, x+w, y+rad);
  ctx.lineTo(x+w, y+h-rad);
  ctx.quadraticCurveTo(x+w, y+h, x+w-rad, y+h);
  ctx.lineTo(x+rad, y+h);
  ctx.quadraticCurveTo(x, y+h, x, y+h-rad);
  ctx.lineTo(x, y+rad);
  ctx.quadraticCurveTo(x, y, x+rad, y);
  ctx.closePath();

  // Fill + stroke
  ctx.fillStyle = color;
  ctx.fill();

  ctx.lineWidth = isSelected ? Math.max(4, r*0.28) : Math.max(2, r*0.16);
  ctx.strokeStyle = isSelected ? "#ffffff" : "rgba(255,255,255,.55)";
  ctx.stroke();

  // Antennas
  ctx.lineWidth = Math.max(2, r*0.14);
  ctx.strokeStyle = "rgba(255,255,255,.85)";
  const ax1 = cx - w*0.18, ax2 = cx + w*0.18;
  const ay0 = y + r*0.05;
  const ay1 = y - r*0.55;
  ctx.beginPath();
  ctx.moveTo(ax1, ay0); ctx.lineTo(ax1, ay1);
  ctx.moveTo(ax2, ay0); ctx.lineTo(ax2, ay1);
  ctx.stroke();

  ctx.fillStyle = "rgba(255,255,255,.92)";
  ctx.beginPath();
  ctx.arc(ax1, ay1, r*0.18, 0, Math.PI*2);
  ctx.arc(ax2, ay1, r*0.18, 0, Math.PI*2);
  ctx.fill();

  // Eyes
  ctx.fillStyle = "rgba(0,0,0,.55)";
  const ey = cy - h*0.12;
  ctx.beginPath();
  ctx.arc(cx - w*0.16, ey, r*0.16, 0, Math.PI*2);
  ctx.arc(cx + w*0.16, ey, r*0.16, 0, Math.PI*2);
  ctx.fill();

  // Mouth grille (vertical slats)
  ctx.strokeStyle = "rgba(0,0,0,.35)";
  ctx.lineWidth = Math.max(1.5, r*0.10);
  const my = cy + h*0.18;
  const mw = w*0.40;
  const mh = h*0.18;
  const mx0 = cx - mw/2;
  // Outer mouth line (subtle)
  ctx.beginPath();
  ctx.moveTo(mx0, my); ctx.lineTo(mx0+mw, my);
  ctx.stroke();

  // Slats
  ctx.beginPath();
  for(let k=1;k<=3;k++){
    const sx = mx0 + (mw*(k/4));
    ctx.moveTo(sx, my - mh/2);
    ctx.lineTo(sx, my + mh/2);
  }
  ctx.stroke();
}


function drawShape(shape, x,y, r){
  ctx.beginPath();
  if(shape==="circle"){
    ctx.arc(x,y,r,0,Math.PI*2);
  } else if(shape==="triangle"){
    ctx.moveTo(x, y-r);
    ctx.lineTo(x-r*0.9, y+r*0.8);
    ctx.lineTo(x+r*0.9, y+r*0.8);
    ctx.closePath();
  } else if(shape==="square"){
    ctx.rect(x-r, y-r, 2*r, 2*r);
  } else if(shape==="vortex"){
    ctx.arc(x,y,r,0,Math.PI*2);
    ctx.moveTo(x, y);
    ctx.arc(x,y,r*0.6,0,Math.PI*1.5);
  } 
else if(shape==="star"){
    // 5-point star centered at (x,y)
    const r1 = r * 1.35;   // outer radius
					   
    const r2 = r * 0.60;   // inner radius

				  
    for(let i=0;i<10;i++){
      const a = -Math.PI/2 + i*Math.PI/5;
      const rr = (i%2===0) ? r1 : r2;
      const px = x + Math.cos(a)*rr;
      const py = y + Math.sin(a)*rr;
      if(i===0) ctx.moveTo(px,py);
      else ctx.lineTo(px,py);
    }
    ctx.closePath();
							   
  }
else {
    ctx.arc(x,y,r,0,Math.PI*2);
  }
  ctx.fill();
  ctx.stroke();
}

function draw(){
  const W=cv.width, H=cv.height;
  ctx.clearRect(0,0,W,H);
  const cell = W/board.w;

  // grid
  ctx.globalAlpha=0.22;
  ctx.lineWidth=1;
  ctx.strokeStyle="#ffffff";
  for(let i=0;i<=board.w;i++){
    ctx.beginPath(); ctx.moveTo(i*cell,0); ctx.lineTo(i*cell,H); ctx.stroke();
  }
  for(let j=0;j<=board.h;j++){
    ctx.beginPath(); ctx.moveTo(0,j*cell); ctx.lineTo(W,j*cell); ctx.stroke();
  }
  ctx.globalAlpha=1;

  // walls
  ctx.strokeStyle="#ffffff";
  ctx.lineWidth=Math.max(3, cell*0.08);
  ctx.lineCap="square";
  for(let y=0;y<board.h;y++){
    for(let x=0;x<board.w;x++){
      const pos=board.idx(x,y);
      const x0=x*cell, y0=y*cell, x1=x0+cell, y1=y0+cell;
      if(board.walls[DIR_IDX.N][pos]){ ctx.beginPath(); ctx.moveTo(x0,y0); ctx.lineTo(x1,y0); ctx.stroke(); }
      if(board.walls[DIR_IDX.E][pos]){ ctx.beginPath(); ctx.moveTo(x1,y0); ctx.lineTo(x1,y1); ctx.stroke(); }
      if(board.walls[DIR_IDX.S][pos]){ ctx.beginPath(); ctx.moveTo(x0,y1); ctx.lineTo(x1,y1); ctx.stroke(); }
      if(board.walls[DIR_IDX.W][pos]){ ctx.beginPath(); ctx.moveTo(x0,y0); ctx.lineTo(x0,y1); ctx.stroke(); }
    }
  }


  // quadrant codes in the center 2×2 (visual marker)
  // Map: (7,7)=NW, (8,7)=NE, (8,8)=SE, (7,8)=SW
  if(board.quadPick && board.quadPick.length===4){
    const cx0 = 7*cell, cy0 = 7*cell;
    ctx.save();
    ctx.globalAlpha = 0.95;
    ctx.fillStyle = "rgba(0,0,0,.35)";
    ctx.fillRect(cx0, cy0, 2*cell, 2*cell);
    ctx.strokeStyle = "rgba(255,255,255,.7)";
    ctx.lineWidth = Math.max(2, cell*0.05);
    ctx.strokeRect(cx0, cy0, 2*cell, 2*cell);
    ctx.beginPath();
    ctx.moveTo(cx0+cell, cy0);
    ctx.lineTo(cx0+cell, cy0+2*cell);
    ctx.moveTo(cx0, cy0+cell);
    ctx.lineTo(cx0+2*cell, cy0+cell);
    ctx.stroke();

    const label = (q)=>{
      const g = Math.floor(q/4); // 0..3 => A..D
      const n = (q%4)+1;         // 1..4
      return String.fromCharCode(65+g) + String(n);
    };

    ctx.fillStyle = "#ffffff";
    ctx.font = `bold ${Math.max(12, cell*0.28)}px system-ui, -apple-system, Segoe UI, Arial`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const tl = label(board.quadPick[0]);
    const tr = label(board.quadPick[1]);
    const br = label(board.quadPick[2]);
    const bl = label(board.quadPick[3]);

    ctx.fillText(tl, cx0 + cell*0.5, cy0 + cell*0.5);
    ctx.fillText(tr, cx0 + cell*1.5, cy0 + cell*0.5);
    ctx.fillText(br, cx0 + cell*1.5, cy0 + cell*1.5);
    ctx.fillText(bl, cx0 + cell*0.5, cy0 + cell*1.5);
    ctx.restore();
  }

  // goal
  if(board.goal){
    const g=board.goal;
    const gx=g.x*cell+cell/2, gy=g.y*cell+cell/2;
    ctx.save();
    ctx.globalAlpha=0.95;
    ctx.strokeStyle="#ffffff";
    ctx.lineWidth=Math.max(2, cell*0.05);
    ctx.fillStyle = (g.robot>=0) ? ROBOT_COLORS[g.robot] : "#d6e0ff";
    drawShape(g.shape, gx,gy, cell*0.23);
    ctx.restore();
  }

  
  // quadrant codes in center cross
  if(board.pickedQuadrants){
    ctx.save();
    ctx.fillStyle="rgba(255,255,255,0.9)";
    ctx.font = Math.floor(cell*0.45)+"px system-ui";
    ctx.textAlign="center";
    ctx.textBaseline="middle";
    const cx = board.w/2;
    const cy = board.h/2;
    const labels = board.pickedQuadrants.map(q=>{
      if(q<4) return "A"+(q+1);
      if(q<8) return "B"+(q-3);
      if(q<12) return "C"+(q-7);
      return "D"+(q-11);
    });
    /* NW, NE, SE, SW
    ctx.fillText(labels[0], (cx-1)*cell, (cy-1)*cell);
    ctx.fillText(labels[1], (cx)*cell, (cy-1)*cell);
    ctx.fillText(labels[2], (cx)*cell, (cy)*cell);
    ctx.fillText(labels[3], (cx-1)*cell, (cy)*cell);
    ctx.restore();*/
  }

  // robots
  for(let i=0;i<board.robots.length;i++){
    const pos=board.robots[i];
    const x=pos%board.w, y=(pos/board.w)|0;
    const cx=x*cell+cell/2, cy=y*cell+cell/2;
    const r=cell*0.28;
    drawRobotHead(cx, cy, r, ROBOT_COLORS[i], (isBuildMode ? (i===buildSelectedRobot) : (i===selectedRobot)));
  }

  goalInfoEl.textContent = board.goal
    ? ("Tavoite: " + board.goal.shape + (board.goal.robot===-1 ? " (mikä tahansa)" : (" / " + ROBOT_NAMES[board.goal.robot])))
    : "";
  selInfoEl.textContent = "Valittu robotti: " + ROBOT_NAMES[selectedRobot];
}

function pickRobotAtCanvas(px,py){
  const cell = cv.width/board.w;
  const x = Math.floor(px/cell);
  const y = Math.floor(py/cell);
  if(x<0||y<0||x>=board.w||y>=board.h) return -1;
  const pos = board.idx(x,y);
  for(let i=0;i<board.robots.length;i++) if(board.robots[i]===pos) return i;
  return -1;
}

cv.addEventListener("pointerdown", (e)=>{
  const r=cv.getBoundingClientRect();
  const px=(e.clientX-r.left)*(cv.width/r.width);
  const py=(e.clientY-r.top)*(cv.height/r.height);
  const hit = pickRobotAtCanvas(px,py);
  if(hit>=0){
    if(isBuildMode){
      buildSelectedRobot = hit;
      refreshBuildUIFromBoard();
      setStatus("Valittu robotti: " + ROBOT_NAMES[hit]);
      draw();
    }else{
      selectedRobot=hit;
      draw();
    }
  }
});

// --- Swipe controls (iPad / touch): drag the selected robot to move it ---
let swipePtrId = null;
let swipeStartX = 0, swipeStartY = 0;
let swipeStartedOnSelected = false;

function swipeDirFromDelta(dx, dy){
  if(Math.abs(dx) > Math.abs(dy)){
    return dx > 0 ? "E" : "W";
  }else{
    return dy > 0 ? "S" : "N";
  }
}

// Track pointer start on the selected robot, and on release perform a move if it was a swipe.
cv.addEventListener("pointerdown", (e)=>{
  if(isBuildMode) return;
  // Only start swipe if pointerdown hits the currently selected robot
  const r=cv.getBoundingClientRect();
  const px=(e.clientX-r.left)*(cv.width/r.width);
  const py=(e.clientY-r.top)*(cv.height/r.height);
  const hit = pickRobotAtCanvas(px,py);
  swipeStartedOnSelected = (hit === selectedRobot);
  if(!swipeStartedOnSelected) return;
  swipePtrId = e.pointerId;
  swipeStartX = e.clientX;
  swipeStartY = e.clientY;
  try{ cv.setPointerCapture(e.pointerId); }catch(_){}
});

cv.addEventListener("pointerup", (e)=>{
  if(isBuildMode) return;
  if(swipePtrId === null || e.pointerId !== swipePtrId) return;
  try{ cv.releasePointerCapture(e.pointerId); }catch(_){}
  const dx = e.clientX - swipeStartX;
  const dy = e.clientY - swipeStartY;
  swipePtrId = null;

  // Threshold in CSS pixels (avoid accidental moves)
  const TH = 26;
  if(!swipeStartedOnSelected) return;
  swipeStartedOnSelected = false;

  if(Math.abs(dx) < TH && Math.abs(dy) < TH) return; // tap, not swipe
  const dir = swipeDirFromDelta(dx, dy);
  doMove(dir);
});

cv.addEventListener("pointercancel", (e)=>{
  if(e.pointerId === swipePtrId){
    swipePtrId = null;
    swipeStartedOnSelected = false;
  }
});

window.addEventListener("keydown",(e)=>{
  let dir=null;
  if(e.key==="ArrowUp") dir="N";
  if(e.key==="ArrowRight") dir="E";
  if(e.key==="ArrowDown") dir="S";
  if(e.key==="ArrowLeft") dir="W";
  if(!dir) return;
  e.preventDefault();
  doMove(dir);
}, {passive:false});

document.querySelectorAll(".moveBtns .btn").forEach(btn=>{
  btn.addEventListener("click", ()=> doMove(btn.dataset.dir));
});

function doMove(dir){
  const moved = board.moveRobot(selectedRobot, dir);
  if(!moved) return;

  // If a new goal was rolled previously, the first *successful* move starts that goal.
  // Commit the stored start position for that goal (state right after the goal roll),
  // but only now so the player can still reset to the previous goal's start to hunt
  // for shorter solutions.
  if(pendingStartCapture && pendingStartRobots && pendingStartGoal){
    board.startRobots = new Int16Array(pendingStartRobots);
    board.startGoal = pendingStartGoal;
    pendingStartCapture = false;
    pendingStartRobots = null;
    pendingStartGoal = null;
  }

  updateMoveHistory(selectedRobot, dir);
  setStatus("Siirretty.");
  draw();

  if(board.isSolved()){
	solList.innerHTML = ""; // <-- TYHJENTÄÄ Ratkaisu-listan ruudulta
    setStatus("✅ Maali saavutettu! Uusi kohde arvottu.");

    pickNewGoalAvoidRepeats();

    // Prepare capturing a new start position for the next goal, but do NOT commit yet.
    // Commit happens only when the player makes the first successful move for that goal.
    pendingStartCapture = true;
    pendingStartRobots = new Int16Array(board.robots);
    pendingStartGoal = board.goal;

    // Keep robots where they are; only the goal changes
    resetMoveHistory();
    draw();
  }
}

document.getElementById("newBtn").addEventListener("click", ()=>{
  board = createBoardRandom(4);
  resetMoveHistory();
  usedGoals.clear();
  if(board.goal) usedGoals.add(goalKey(board.goal));
  selectedRobot=0;
  solList.innerHTML="";
  setStatus("Uusi lauta.");
  draw();
});

document.getElementById("resetBtn").addEventListener("click", ()=>{
  if(board.startRobots) board.robots = new Int16Array(board.startRobots);
  if(board.startGoal) board.goal = board.startGoal;
  usedGoals.clear();
  if(board.goal) usedGoals.add(goalKey(board.goal));
  solList.innerHTML="";
  pendingStartCapture = false; pendingStartRobots = null; pendingStartGoal = null;																			  
  setStatus("Alkuasetelma palautettu.");
  resetMoveHistory();
  draw();
});

// --- BFS solver (depth limited) ---
function validateSolutionTurnRule(moves, startRobots){
  // Simulate moves from the start position and check the "must make a 90° turn" rule.
  const robots = Array.from(startRobots || board.robots);
  const n = robots.length;
  let total = 0;
  const last = Array(n).fill(null);
  const hasTurn = Array(n).fill(false);

  const slide = (robo, dirChar)=>{
    const dir = DIR_IDX[dirChar];
    let pos = robots[robo];
    const [dx,dy]=DXY[dir];
    const isRobotAt = (p)=> robots.some(v=>v===p);
    while(true){
      if(board.walls[dir][pos]) break;
      const [x,y]=board.xy(pos);
      const nx=x+dx, ny=y+dy;
      const npos=board.idx(nx,ny);
      if(isRobotAt(npos)) break;
      pos = npos;
    }
    robots[robo]=pos;
  };

  for(const m of moves){
    total++;
    slide(m.r, m.dir);
    const prev = last[m.r];
    if(prev && m.dir !== prev && !isOppositeDir(prev, m.dir)) hasTurn[m.r] = true;
    last[m.r] = m.dir;
  }

  if(total < 2) return false;

  const goalPos = board.goal.pos;
  const goalRobot = board.goal.robot;
  if(goalRobot === -1){
    for(let i=0;i<n;i++){
      if(robots[i]===goalPos) return !!hasTurn[i];
    }
    return false;
  }
  return robots[goalRobot]===goalPos && !!hasTurn[goalRobot];
}

function encodeKey(robots){
  // Use BigInt to avoid collisions when there are 5 robots (32-bit packing would overflow).
  // Each robot position fits in 0..255, so 8 bits per robot is enough.
  let k = 0n;
  for(let i=0;i<robots.length;i++){
    k |= (BigInt(robots[i]) & 255n) << (8n * BigInt(i));
  }
  return k;
}
function cloneRobots(arr){ return new Int16Array(arr); }

function moveRobotStatic(boardRef, robotsArr, robo, dirChar){
  const dir = DIR_IDX[dirChar];
  let pos = robotsArr[robo];
  const dx = DXY[dir][0], dy = DXY[dir][1];
  const isRobotAt = (p)=>{ for(let i=0;i<robotsArr.length;i++) if(robotsArr[i]===p) return true; return false; };
  while(true){
    if(boardRef.walls[dir][pos]) break;
    const x = pos % boardRef.w;
    const y = (pos/boardRef.w)|0;
    const nx=x+dx, ny=y+dy;
    const npos = nx + ny*boardRef.w;
    if(isRobotAt(npos)) break;
    pos=npos;
  }
  const moved = (pos!==robotsArr[robo]);
  robotsArr[robo]=pos;
  return moved;
}

function reconstructSolution(goalKey, parent){
  const moves=[];
  let k=goalKey;
  while(true){
    const node = parent.get(k);
    if(!node) break;
    moves.push(node.m);
    k=node.p;
  }
  moves.reverse();
  return moves;
}

function solveBFS(maxDepth){
  const start = cloneRobots(board.robots);
  const startKey = encodeKey(start);

  const q = [];
  const parent = new Map(); // key -> {p, m:{r,dir}}
  const depth = new Map();

  parent.set(startKey, null);
  depth.set(startKey, 0);
  q.push(start);

  const goalPos = board.goal.pos;
  const goalRobot = board.goal.robot;

  const isSolvedRobots = (robots)=>{
    if(goalRobot===-1){
      for(let i=0;i<robots.length;i++) if(robots[i]===goalPos) return true;
      return false;
    }
    return robots[goalRobot]===goalPos;
  };

  while(q.length){
    const cur = q.shift();
    const curKey = encodeKey(cur);
    const d = depth.get(curKey);
    if(isSolvedRobots(cur)){
      const sol = reconstructSolution(curKey, parent);
      if(validateSolutionTurnRule(sol, start)) return sol;
      // otherwise ignore this too-straight solution and keep searching
    }
    if(d>=maxDepth) continue;

    for(let r=0;r<cur.length;r++){
      for(const dir of DIRS){
        const next = cloneRobots(cur);
        if(!moveRobotStatic(board, next, r, dir)) continue;
        const nk = encodeKey(next);
        if(parent.has(nk)) continue;
        parent.set(nk, {p:curKey, m:{r,dir}});
        depth.set(nk, d+1);
        q.push(next);
      }
    }
  }
  return null;
}

document.getElementById("solveBtn").addEventListener("click", ()=>{
  solList.innerHTML="";
  const maxDepth = Math.max(1, Math.min(25, parseInt(document.getElementById("depthInp").value||"12",10)));
  setStatus("Haetaan ratkaisua…");
  setTimeout(()=>{
    const res = solveBFS(maxDepth);
    if(!res){
      setStatus("Ei ratkaisua syvyysrajalla.");
      return;
    }
    setStatus("✅ Ratkaisu löytyi: " + res.length + " siirtoa");
    solList.innerHTML="";
res.forEach((m)=>{
  const li = document.createElement("li");

  // Väripallo
  const dot = document.createElement("span");
  dot.style.display = "inline-block";
  dot.style.width = "14px";
  dot.style.height = "14px";
  dot.style.borderRadius = "50%";
  dot.style.background = ["#ff4d4d","#2ee88f","#4db8ff","#ffd84d","#c9d2dc"][m.r];
  dot.style.marginRight = "10px";
  dot.style.verticalAlign = "middle";
  dot.style.border = "1px solid rgba(255,255,255,.55)";

  // Nuoli
  const arrow = document.createElement("span");
  arrow.textContent = ({"N":"↑","E":"→","S":"↓","W":"←"}[m.dir]);
  arrow.style.fontWeight = "900";
  arrow.style.fontSize = "18px";
  arrow.style.verticalAlign = "middle";

  li.appendChild(dot);
  li.appendChild(arrow);
  solList.appendChild(li);
});

  }, 20);
});



// --- Build mode UI wiring ---
const buildBtn = document.getElementById("buildBtn");
const startPlayBtn = document.getElementById("startPlayBtn");
const qNW = document.getElementById("qNW");
const qNE = document.getElementById("qNE");
const qSE = document.getElementById("qSE");
const qSW = document.getElementById("qSW");
const applyQuadrantsBtn = document.getElementById("applyQuadrantsBtn");
const robotPickEl = document.getElementById("robotPick");
const goalSel = document.getElementById("goalSel");

function populateQuadrantSelect(sel){
  if(!sel) return;
  sel.innerHTML = "";
  for(let q=0;q<16;q++){
    const opt = document.createElement("option");
    opt.value = String(q);
    opt.textContent = labelForQuadrant(q);
    sel.appendChild(opt);
  }
}

function refreshBuildUIFromBoard(){
  // quadrant dropdowns
  if(board.quadPick && board.quadPick.length===4){
    if(qNW) qNW.value = String(board.quadPick[0]);
    if(qNE) qNE.value = String(board.quadPick[1]);
    if(qSE) qSE.value = String(board.quadPick[2]);
    if(qSW) qSW.value = String(board.quadPick[3]);
  }

  // robot picker
  if(robotPickEl){
    robotPickEl.innerHTML = "";
    for(let i=0;i<board.robots.length;i++){
      const b = document.createElement("button");
      b.type = "button";
      b.className = "robotBtn" + (i===buildSelectedRobot ? " active" : "");
      b.addEventListener("click", ()=>{
        buildSelectedRobot = i;
        refreshBuildUIFromBoard();
      });
      const dot = document.createElement("span");
      dot.className = "dot";
      dot.style.background = ROBOT_COLORS[i];
      const t = document.createElement("span");
      t.textContent = "R" + (i+1);
      b.appendChild(dot);
      b.appendChild(t);
      robotPickEl.appendChild(b);
    }
  }

  // goal select
  if(goalSel){
    goalSel.innerHTML = "";
    for(let i=0;i<board.goals.length;i++){
      const g = board.goals[i];
      const opt = document.createElement("option");
      opt.value = String(i);
      opt.textContent = goalLabel(g);
      goalSel.appendChild(opt);
    }
    // select current goal
    if(board.goal){
      const idx = board.goals.findIndex(g => goalKey(g)===goalKey(board.goal));
      if(idx>=0) goalSel.value = String(idx);
    }
  }
}

function rebuildBoardWithQuadrants(qPick){
  // Build board from explicit quadrants (NW/NE/SE/SW) but keep current robots if possible.
  const b = new Board(16,16,4);
  b.walls = Array.from({length:4}, ()=> new Uint8Array(b.size));
  b.goals = [];
  b.goal = null;

  b.quadPick = qPick.slice();
  for(let qPos=0;qPos<4;qPos++){
    addQuadrant(b, b.quadPick[qPos], qPos);
  }
  b.addOuterWalls();

  // keep existing robot positions if possible, otherwise place random
  b.robots = new Int16Array(board.robots);
  b.startRobots = new Int16Array(b.robots);

  // keep goal if still exists, else pick first
  b.goal = b.goals[0] || null;
  b.startGoal = b.goal;

  board = b;
  usedGoals.clear();
  if(board.goal) usedGoals.add(goalKey(board.goal));
  resetMoveHistory();
  solList.innerHTML = "";
  draw();
  refreshBuildUIFromBoard();
}

if(buildBtn){
  buildBtn.addEventListener("click", ()=>{
    setBuildMode(!isBuildMode);
    if(isBuildMode){
      populateQuadrantSelect(qNW);
      populateQuadrantSelect(qNE);
      populateQuadrantSelect(qSE);
      populateQuadrantSelect(qSW);
      refreshBuildUIFromBoard();
    }
  });
}

if(applyQuadrantsBtn){
  applyQuadrantsBtn.addEventListener("click", ()=>{
    if(!(qNW&&qNE&&qSE&&qSW)) return;
    const qPick = [
      parseInt(qNW.value,10),
      parseInt(qNE.value,10),
      parseInt(qSE.value,10),
      parseInt(qSW.value,10),
    ];
    rebuildBoardWithQuadrants(qPick);
    setStatus("Kvadrantit asetettu. Aseta robotit ja tavoite.");
  });
}

if(goalSel){
  goalSel.addEventListener("change", ()=>{
    const idx = parseInt(goalSel.value,10);
    const g = board.goals[idx];
    if(g){
      board.goal = g;
      draw();
    }
  });
}

if(startPlayBtn){
  startPlayBtn.addEventListener("click", ()=>{
    // Freeze current as the "initial setup" for reset
    board.startRobots = new Int16Array(board.robots);
    board.startGoal = board.goal;
    usedGoals.clear();
    if(board.goal) usedGoals.add(goalKey(board.goal));
    solList.innerHTML = "";
    setBuildMode(false);
    setStatus("Peli aloitettu tästä asetelmasta.");
    draw();
  });
}

// In build mode, clicking a cell places the selected robot there (no legality checks beyond collisions)
function placeRobotAtCell(robo, x, y){
  const pos = board.idx(x,y);
  // forbid center 2x2
  if((x===7||x===8) && (y===7||y===8)) return false;
  // forbid landing on another robot
  for(let i=0;i<board.robots.length;i++){
    if(i!==robo && board.robots[i]===pos) return false;
  }
  board.robots[robo] = pos;
  draw();
  return true;
}

// Override/extend pointer handler: if build mode -> place robot, else normal select.
const _origPointer = cv.onpointerdown;
cv.addEventListener("pointerdown", (e)=>{
  if(!isBuildMode) return;

  const r=cv.getBoundingClientRect();
  const px=(e.clientX-r.left)*(cv.width/r.width);
  const py=(e.clientY-r.top)*(cv.height/r.height);

  // Jos klikattiin robottia -> valitse se (älä aseta uutta paikkaa)
  const hit = pickRobotAtCanvas(px,py);
  if(hit>=0){
    buildSelectedRobot = hit;
    refreshBuildUIFromBoard();
    setStatus("Valittu robotti: " + ROBOT_NAMES[hit]);
    draw();
    return;
  }

  const cell = cv.width/board.w;
  const x = Math.floor(px/cell);
  const y = Math.floor(py/cell);
  if(x<0||y<0||x>=board.w||y>=board.h) return;

  if(placeRobotAtCell(buildSelectedRobot, x, y)){
    setStatus("Robotti asetettu (" + ROBOT_NAMES[buildSelectedRobot] + ").");
  }
});

// Ensure build panel is hidden on load
setBuildMode(false);

draw();

/* SERVICE WORKER */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('./service-worker.js')
      .catch(err => console.warn('Service workerin rekisteröinti epäonnistui:', err));
  });
}
