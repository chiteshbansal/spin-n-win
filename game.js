let prizes = {
    count:12,
    prize_names : ["3000 Credits","35% Off on any course","Hard Luck","70% OFF on any course","Swagpack","100% OFF on all courses","Netflix Subscription","50% Off on foundation courses","Amazon Voucher worth Rs1000","2 Extra Spin", "CB Tshirt","CB Book"]
}




let config ={
    type : Phaser.CANVAS,
    width : 800,
    height:800,
//    backgroundColor :linear-gradient(120deg, rgb(255, 196, 86) 0, rgb(255, 196, 86) 40%, rgb(255, 185, 56) 40%),  
    scene:{
        preload:preload,
        create:create,
        update:update
    }
}

var game = new Phaser.Game(config);
var myMusic= document.getElementById("music");

var msg = document.getElementById('prizemsg');
myMusic.style.display='none';

var spinbtn = document.getElementById('spinNowBtn');

function preload () {
    this.load.image('background',"Assets/back3.jpg");
    this.load.image('wheel','Assets/wheel.png');
    this.load.image('pin','Assets/pin.png');
    this.load.image('stand','Assets/stand.png');
//    this.load.image('spin-n-win-logo','Assets/spin-n-win-logo.png');

}

var obj = config.scene;
var func;
function create(){
    //create that image
    let W = game.config.width;
    let H = game.config.height;
   
    msg.style.top=H/2-180;
    this.add.sprite(H/2,W/2,'background');
    
    let pin = this.add.sprite(W/2+240,H/2-230-50-30,'pin').setScale(0.18);
    pin.angle+=-4;
    pin.depth = 5;
    
    this.add.sprite(W/2+240,H/2+85-50-30,'stand').setScale(0.1);
    this.add.sprite(W/4,40,'spin-n-win-logo').setScale(0.25);
    
    
    //let create wheel
    this.wheel = this.add.sprite(W/2+240,H/2-70-50-30,"wheel");
    this.wheel.setScale(0.15); 
    console.log(this.wheel.depth);
    this.spinbtn = spinbtn;
    func = () =>{
        spinwheel(this);
    }
    
    this.spinbtn.addEventListener("click",func);
    
    
}

function update(){
    console.log("In Update");
    //this.wheel.angle -= 1; 
}


initial_dist_100 =(360/prizes.count)*6;
let round_100=initial_dist_100/30;
function spinwheel(obj){
    
    obj.spinbtn.removeEventListener('click',func);


    obj.spinbtn.innerText='Spinning'
    let rounds = Phaser.Math.Between(2,4);
    
    let prob_no = Math.random();
    let extra_degree_round ;
    
    //Handling probability for 100% off
    if(prob_no<=0.55&& prob_no>=0.54)
    {
        extra_degree_round=round_100;
    }else{
        let a , b;
        b= Phaser.Math.Between(0,round_100-1);
        a = Phaser.Math.Between(round_100+1 ,11)
        extra_degree_round =Math.random()>0.5?a:b;
    }
    
    let extra_degrees = extra_degree_round*30;
    initial_dist_100=initial_dist_100-extra_degrees;
    
    if(initial_dist_100<0)
        initial_dist_100+=360;
    round_100=initial_dist_100/30;
    console.log("initial_dist_100 is ",initial_dist_100 );
    console.log('round to 100 is ' , round_100);
    let total_angle = rounds*360 + extra_degrees;
    
    console.log(total_angle);
    console.log("extra degress are",extra_degrees);
    
    let idx = prizes.count - 1 - Math.floor(extra_degrees/(360/prizes.count));
    console.log("index is ",idx);
    myMusic.play();
    let tween = obj.tweens.add({
        targets: obj.wheel,
        angle: total_angle,
        ease:"Cubic.easeOut",
        duration: 6000,
        onComplete:function(){
            obj.spinbtn.innerText="Spin Now";
            if(idx!=2)
            {
                msg.innerText="Horray!! You won "+prizes.prize_names[idx];
                GeneratePrizeCard(prizes,idx);
            }
            else
                msg.innerText="Ohh! Sorry "+prizes.prize_names[idx];

            obj.spinbtn.addEventListener("click",func);
            }
    });
    
    
}
var prizewoncount =0;
function GeneratePrizeCard(prizes,index)
{
    let prizelist = document.getElementById('prizeContainer');
    if(prizewoncount==4)
    {
        prizewoncount=0;
        prizelist.innerHTML="";
    }
    
    let imgno = Math.floor(Math.random()*6+1);
    let imgcnt = document.createElement('div');
    let prizecardimg = document.createElement('img');
    prizecardimg.src='Assets/prize'+imgno+".jpg";
    imgcnt.appendChild(prizecardimg);
    
    let prizecard = document.createElement('div');
    prizecard.className='prizeCard';
    
    prizecard.appendChild(imgcnt);
    
    let prizecontent = document.createElement('div');
    prizecontent.className='prizeContent';
    
    let prize = document.createElement('div');
    prize.innerText="Hooray You won " +prizes.prize_names[index];
    prizecontent.appendChild(prize);
    
    let coupon = document.createElement('div');
    coupon.className='coupon';
    prizecontent.appendChild(coupon);
    
    prizecard.appendChild(prizecontent);
    prizelist.appendChild(prizecard);
    prizewoncount++;
    
    
}

