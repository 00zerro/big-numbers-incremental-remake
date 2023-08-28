const app = Vue.createApp({
    data(){
        return{
            player: player,
        }
    },

    methods: {
        format(amount) {
                let power = Math.floor(Math.log10(amount))
                let mantissa = amount / Math.pow(10, power)
                if (power < 3) return amount.toFixed(2)
                return mantissa.toFixed(2) + "e" + power
        },

        buyBasicUpgrade(i){

                if ( this.player.points >= this.player.basicUpgrades[i].cost ){

                    // LIMIT UPGRADE 8

                    if ( this.player.limitUpgrades[7].bought == true ){
                    this.player.points += this.player.basicUpgrades[i].cost
                    } 

                    this.player.points -= this.player.basicUpgrades[i].cost;
                    this.player.basicUpgrades[i].cost *= this.player.costIncrease;
                    this.player.basicUpgrades[i].amount++;
                    this.player.basicUpgrades[i].bought++;
                    this.player.basicUpgrades[i].mult *= this.player.multIncrease;

                // LIMIT UPGRADE 2

                    if ( this.player.limitUpgrades[1].bought == true && i == 0 && this.player.basicUpgrades[0].bought >= 2){
                    this.player.basicUpgrades[0].mult += 0.0025 * this.player.basicUpgrades[0].bought
                    }

                // LIMIT UPGRADE 9

                    if ( this.player.limitUpgrades[8].bought == true){
                        this.player.basicUpgrades[i].mult += 0.05
                    }
                    
                }



        },

        buyLimitUpgrades(i){

            if ( this.player.limitPoints >= this.player.limitUpgrades[i].cost && this.player.limitUpgrades[i].bought == false){
                this.player.limitPoints -= this.player.limitUpgrades[i].cost;
                this.player.limitUpgrades[i].bought = true;
            

            // LIMIT UPGRADE 3

            if ( this.player.limitUpgrades[2].bought == true && i == 2 ){
            this.player.costIncrease -= 0.3
                }

            // LIMIT UPGRADE 4

            // TO BE DONE

            // LIMIT UPGRADE 10

            if ( this.player.limitUpgrades[9].bought == true && i == 9){
                this.player.decayPoints++;
            }
            
            }

            

    },

        buyPowerGen(i){
            if ( this.player.decayPoints >= this.player.decayGenerators[i].cost){
                this.player.decayGenerators[i].amount++;
                this.player.decayGenerators[i].bought++;
                this.player.decayPoints -= this.player.decayGenerators[i].cost;
                this.player.decayGenerators[i].cost *= 1.2
            }
        },

        gameLoop(){
            gameLoop(this) 
        },

        saveGame(){
            localStorage.setItem("data", JSON.stringify(this.player))
        },
        
        loadGame(){
            this.player = JSON.parse(localStorage.getItem("data"))
        },

        reset(){
            if ( this.player.points >= this.player.limit ){
                this.player.limitPoints += this.player.lpGain;
                this.player.points = 10;

                // LIMIT UPGRADE 1
                if (this.player.limitUpgrades[0].bought == true) {
                    this.player.lpGain *= 2
                }

                this.player.basicUpgrades = [];

                firstBasicUpgrade = {
                    cost: 10,
                    amount: 0,
                    bought: 0,
                    mult: 1,
                    auto: false,
                }
                
                this.player.basicUpgrades.push(firstBasicUpgrade);
                
                for (let i = 1; i < 6; i++) {
                    let g = {
                        cost: Math.pow(100, i),
                        amount: 0,
                        bought: 0,
                        mult: 1,
                        auto: false,
                    }
                
                    this.player.basicUpgrades.push(g)

            }}
        },

        showUpgradeText(i){
                this.player.textShowing = this.player.limitUpgrades[i].text
                this.player.costShowing = this.player.limitUpgrades[i].cost
                if ( this.player.limitUpgrades[i].bought == true ){
                    this.player.boughtShowing = "bought"
                } else {
                    this.player.boughtShowing = "not bought"
                }
        },

        autoBuySwitch(i){
            this.player.basicUpgrades[i].auto = !this.player.basicUpgrades[i].auto
        },

        autoReset(){
            this.player.autoReset = !this.player.autoReset
        },

        breakLimit(){
            this.player.limitBroken = !this.player.limitBroken;
        },

        prestige(){

            this.player.points = 10;
            this.costIncrease = 1.7,
            this.multIncrease = 1.05,
        
            this.player.basicUpgrades = [];

            firstBasicUpgrade = {
                cost: 10,
                amount: 0,
                bought: 0,
                mult: 1,
                auto: false,
            }
            
            this.player.basicUpgrades.push(firstBasicUpgrade);
            
            for (let i = 1; i < 6; i++) {
                let g = {
                    cost: Math.pow(100, i),
                    amount: 0,
                    bought: 0,
                    mult: 1,
                    auto: false,
                }
            
                player.basicUpgrades.push(g)
            
            }

            this.player.limitUpgrades = [];

            firstLimitUpgrade = {
                cost: 1,
                bought: false,
                text: ""
            }
            
            this.player.limitUpgrades.push(firstLimitUpgrade);
            
            for (let i = 1; i < 10; i++) {
                let LU = {
                    cost: Math.ceil(Math.pow(i * 10, i/3)),
                    bought: false,
                    text: ""
                }
            
                player.limitUpgrades.push(LU)
                
            }

            this.player.limitPoints = 0;
            this.player.lpGain = 1;
            this.player.lU6Effect = 1;

            this.player.decayGenerators = [];

            for (i = 0; i < 3; i++){
                generator = {
                    cost: Math.pow(10, i),
                    amount: 0,
                    bought: 0,
                    mult: 1
            
                }
            
                player.decayGenerators.push(generator)
            };

            this.player.decayPower = 0;

            this.player.decayPoints += this.player.decayPointsGain;
            this.player.decayPointsGain = 0;
               }
        

    },

    mounted(){

        setInterval(this.gameLoop, this.player.ticks)
        setInterval(this.saveGame, 30000) // = 30 seconds
    }

})

app.mount('#app')