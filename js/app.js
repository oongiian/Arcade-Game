// 这是我们的玩家要躲避的敌人 
//一个方格宽101，高80
const width = 101;
const height = 80;
const delta = 20;

/**
 * 
 * @param {*} speed 起始速度
 * @param {*} row   起始行
 * @param {*} starPosition 起始位置（-5~-1）避免虫子一窝蜂涌出来
 */
class Enemy{
    constructor(speed,row,starPosition) {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多
    //x=0 的话虫子突然出现，有点突兀。
    this.x = starPosition * width;
    this.y = height * row - delta;
    this.speed = speed;
    this.starPosition = starPosition;
    // 敌人的图片，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/enemy-bug.png';
    }
    // 此为游戏必须的函数，用来更新敌人的位置
    // 参数: dt ，表示时间间隙
    update(dt){
        // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
        // 都是以同样的速度运行的
        this.x =this.x + this.speed * dt;
        if(this.x > 5 * width ){
            this.x = this.starPosition * width;
        }
    }
    // 此为游戏必须的函数，用来在屏幕上画出敌人，
    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}




// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数

class Player{
    constructor() {
        this.x = 2 * width;
        this.y = 4 * height-delta;
        this.sprite = 'images/char-boy.png'
    }
    update(dt){
        if(this.x < 0){
            this.x = 0;
        }else if(this.x > 4 * width  ){
            this.x = 4 * width
        }else if(this.y < 0){
            alert('恭喜你成功过河啦~~');
            this.y = 4 * height - delta;
            creatEnemies();
        }else if(this.y > 5 * height){
            this.y = 5 * height - delta
        }
    }
    render(){
        ctx.drawImage(Resources.get(this.sprite),this.x,this.y)
    }
    handleInput(key){
            //根据获取到的键盘点击事件去移动玩家
        switch(key){
            case "left":
            this.x = this.x - width;
            break;
            case "up":
            this.y = this.y - height;
            break;
            case "right":
            this.x = this.x + width;
            break;
            case "down":
            this.y = this.y + height;
            break;
        }
    }
}

// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面
const player = new Player();
let allEnemies = [];


const creatEnemies=()=>{
    allEnemies = [];
    for(let i = 0; i < 6; i++){
        const row = randomNum(1,3);
        const speed = randomNum(80,250);
        const starPosition = randomNum(-5,-1);
        allEnemies.push(new Enemy(speed,row,starPosition));
    }
}
creatEnemies();

//生成从minNum到maxNum的随机数
function randomNum(minNum,maxNum){ 
    switch(arguments.length){ 
        case 1: 
            return parseInt(Math.random()*minNum+1,10); 
        break; 
        case 2: 
            return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
        break; 
            default: 
                return 0; 
            break; 
    } 
} 
// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Player.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
