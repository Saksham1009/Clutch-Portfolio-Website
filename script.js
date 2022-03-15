const canvas  = document.getElementById('canvas1');
const cntx = canvas.getContext('2d');
canvas.width=window.innerWidth;
canvas.height = window.innerHeight;
let adjustX = 1;
let adjustY =-8;
let particleArray = [];

const mouse = {
    x:null,
    y:null,
    radius:250
}
window.addEventListener('mousemove',function(event){
    mouse.x=event.x;
    mouse.y=event.y;
    mouse.radius=100;
})
cntx.fillStyle = 'white';
cntx.font = '20px Oswald';
cntx.fillText('CLUTCH',0,30);
const textCoordinates = cntx.getImageData(0,0,100,100);

class Particle{
    constructor(x,y){
        this.x=x;
        this.y=y;
        this.size=3;
        this.baseX=this.x;
        this.baseY = this.y;
        this.density = (Math.random() *30) +1;
    }
    draw(){
        cntx.fillStyle='yellow';
        cntx.beginPath();
        cntx.arc(this.x,this.y,this.size,0,Math.PI * 2);
        cntx.closePath();
        cntx.fill();
    }
    update(){
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx*dx+dy*dy);
        let forcedX = dx / distance;
        let forcedY = dy / distance;
        let maxDistance = mouse.radius;
        let force = (maxDistance - distance) / maxDistance;
        let directionX = forcedX * force * this.density;
        let directionY = forcedY * force * this.density;
        if(distance<mouse.radius){
            this.x-=directionX;
            this.y-=directionY;
        }else{
            if(this.x!=this.baseX){
                let dx = this.x-this.baseX;
                this.x -=dx/10;
            }
            if(this.y!=this.baseY){
                let dy = this.y-this.baseY;
                this.y -=dy/10;
            }
        }
    }
}

console.log(textCoordinates);
function init(){
    particleArray = [];
    for(let i=0;i<1000;i++){
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        particleArray.push(new Particle(x,y));
    }
    //  for (let y=0,y2 = textCoordinates.height; y<y2;y++){
    //      for(let x=0,x2=textCoordinates.width;x<x2;x++){
    //         if(textCoordinates.data[(y*4*textCoordinates.width)+(x*4)+3]>128){
    //             let positionx = x + adjustX;
    //             let positiony= y + adjustY;
    //             particleArray.push(new Particle(positionx*20,positiony*20));

    //         }

    //         }
    //  }
}
init();
console.log(particleArray);

function animate(){
    cntx.clearRect(0,0,canvas.width,canvas.height);
    for(let i=0;i<particleArray.length;i++){
        particleArray[i].draw();
        particleArray[i].update();
    }
    connect();
    requestAnimationFrame(animate);
}
animate();
function connect(){
    let opacity=1;
    for(let a=0;a<particleArray.length;a++){
        for(let b = a;b<particleArray.length;b++){
            let dx = particleArray[a].x-particleArray[b].x;
            let dy = particleArray[a].y-particleArray[b].y;
            let distance = Math.sqrt(dx*dx+dy*dy);

            if(distance<40){
                opacity=1-(distance/50);
                cntx.strokeStyle = 'rgba(255,255,255,'+opacity+')';
                cntx.strokeStyle='white';
                cntx.lineWidth=2;
                cntx.beginPath();
                cntx.moveTo(particleArray[a].x,particleArray[a].y);
                cntx.lineTo(particleArray[b].x,particleArray[b].y);
                cntx.stroke();

            }
        }
    }
}
// let counter1 = 0;
// let counter2=0;
// let counter3 = 0;
// function overlay1(id){
//     let classtoadd = 'imgoverlay1';
//     counter1++;
//     let existing = document.getElementById(id);
//     let classes = existing.className;
//     let index = classes.indexOf(classtoadd);
//     if(index<0 && (counter1%2)!=0){
//         existing.className+=" "+classtoadd;
//     }else{
//         classes=classes.replace(classtoadd, " ");
//         existing.className=classes;
//     }
// }

// function overlay2(id){
//     let classtoadd = 'dolo';
//     counter2++;
//     let existing = document.getElementById(id);
//     let classes = existing.className;
//     let index = classes.indexOf(classtoadd);
//     if(index<0 && (counter2%2)!=0){
//         existing.className+=" "+classtoadd;
//     }else{
//         classes=classes.replace(classtoadd, " ");
//         existing.className=classes;
//     }
// }
// function overlay3(id){
//     let classtoadd = 'teenlo';
//     counter3++;
//     let existing = document.getElementById(id);
//     let classes = existing.className;
//     let index = classes.indexOf(classtoadd);
//     if(index<0 && (counter3%2)!=0){
//         existing.className+=" "+classtoadd;
//     }else{
//         classes=classes.replace(classtoadd, " ");
//         existing.className=classes;
//     }
// }

