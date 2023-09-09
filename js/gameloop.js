function gameLoop(that){

    // TABS

const tabs = document.querySelectorAll('[data-tab-target]')
const tabContents = document.querySelectorAll('[data-tab-content]')

tabs.forEach(tab => {
tab.addEventListener('click', () => {
    const target = document.querySelector(tab.dataset.tabTarget)
    tabContents.forEach(tabContent => tabContent.classList.remove('active'))
    tabs.forEach(tab => tab.classList.remove('active'))
    target.classList.add('active')
    tab.classList.add('active')
})
})

// LIMIT SUBTABS

const subtabs = document.querySelectorAll('[data-subtab-target]')
const subtabContents = document.querySelectorAll('[data-subtab-content]')

subtabs.forEach(subtab => {
subtab.addEventListener('click', () => {
    const target = document.querySelector(subtab.dataset.subtabTarget)
    subtabContents.forEach(subtabContent => subtabContent.classList.remove('subactive'))
    subtabs.forEach(subtab => subtab.classList.remove('subactive'))
    target.classList.add('subactive')
    subtab.classList.add('subactive')
})
})

// LEGACY SUBTABS

const legacysubtabs = document.querySelectorAll('[data-legacysubtab-target]')
const legacysubtabContents = document.querySelectorAll('[data-legacysubtab-content]')

legacysubtabs.forEach(legacysubtab => {
    legacysubtab.addEventListener('click', () => {
    const target = document.querySelector(legacysubtab.dataset.legacysubtabTarget)
    legacysubtabContents.forEach(legacysubtabContent => legacysubtabContent.classList.remove('legacysubactive'))
    legacysubtabs.forEach(legacysubtab => legacysubtab.classList.remove('legacysubactive'))
    target.classList.add('legacysubactive')
    legacysubtab.classList.add('legacysubactive')
})
})




    // LOOP BEFORE LIMIT
    if (that.player.limit >= that.player.points || that.player.limitBroken == true) {


        if ( ch.inCh != 2 ){
            that.player.points += that.player.basicUpgrades[0].amount * that.player.basicUpgrades[0].mult;
        
        } else if ( ch.inCh == 2 ) {
            that.player.points += Math.pow(that.player.basicUpgrades[0].amount * that.player.basicUpgrades[0].mult, 0.25)
        }

        that.player.basicUpgrades[0].amount += that.player.basicUpgrades[1].amount * that.player.basicUpgrades[1].mult  

        that.player.basicUpgrades[0].amount += that.player.basicUpgrades[1].amount * that.player.basicUpgrades[1].mult
        that.player.basicUpgrades[1].amount += that.player.basicUpgrades[2].amount * that.player.basicUpgrades[2].mult
        that.player.basicUpgrades[2].amount += that.player.basicUpgrades[3].amount * that.player.basicUpgrades[3].mult
        that.player.basicUpgrades[3].amount += that.player.basicUpgrades[4].amount * that.player.basicUpgrades[4].mult
        that.player.basicUpgrades[4].amount += that.player.basicUpgrades[5].amount * that.player.basicUpgrades[5].mult * that.player.lU6Effect
    
    }

    // BASIC UPGRADES AUTOBUY STUFF
    for (let i = 1; i < 7; i++) {

            if ( that.player.limitUpgrades[4].bought == true ){
            let element = document.getElementById("autobuy"+i)
            element.classList.remove('autobuy-not-unlocked')
            }

            if ( this.player.basicUpgrades[i-1].auto == true) {
                document.getElementById("autobuy"+i).innerHTML = "AutoBuy: ON";
            } else{
                document.getElementById("autobuy"+i).innerHTML = "AutoBuy: OFF"
            }
    }

    for (let i = 0; i < 6; i++){
        if ( that.player.basicUpgrades[i].auto == true){
            that.buyBasicUpgrade(i);
        }
        
    }

player.limitUpgrades[0].text = "Limit Point gain is doubled every Reset" 
player.limitUpgrades[1].text = "Point Upgrade 1 boosts itself by number of upgrades bought"
player.limitUpgrades[2].text = "Lower the Point Upgrades cost scaling"
player.limitUpgrades[3].text = "do not buy this"
player.limitUpgrades[4].text = "Unlock Point Upgrades AutoBuyers"
player.limitUpgrades[5].text = "Point Upgrade 6 produces double"
player.limitUpgrades[6].text = "Unlock AutoReset"
player.limitUpgrades[7].text = "Point Upgrades no longer spend Points"
player.limitUpgrades[8].text = "Increase the multiplier you get from buying Point Upgrades"
player.limitUpgrades[9].text = "Gain 1 Decay Point"

    // LIMIT UPGRADE 6
    if ( that.player.limitUpgrades[5].bought == true ){
        that.player.lU6Effect = 2;
    }

    // LIMIT UPGRADE 7

    if ( that.player.limitUpgrades[6].bought == true){
        let element = document.getElementById('autoreset-button')
        element.classList.remove('autoreset-not-unlocked')
    }

    // LIMIT UPGRADE 8

    if ( that.player.autoReset == true){
        that.reset();
    }

    if ( that.player.autoReset == true) {
        document.getElementById('autoreset-button').innerHTML = "AutoReset: ON"
    } else {
        document.getElementById('autoreset-button').innerHTML = "AutoReset: OFF"
    }


    // DECAY
        that.player.limit -= 1.2 * that.player.decayPower

    // DECAY GENERATORS

    that.player.decayPower += that.player.decayGenerators[0].amount
    that.player.decayGenerators[0].amount += that.player.decayGenerators[1].amount
    that.player.decayGenerators[1].amount += that.player.decayGenerators[2].amount

    // UNLOCKING BREAK LIMIT

    if ( that.player.decayGenerators[0].bought >= 1 ){
        let element = document.getElementById('br-button')
        element.classList.remove('not-unlocked')

        let element2 = document.getElementById('reset-decay-button')
        element2.classList.remove('not-unlocked')
    }

    // DECAY POINTS GAIN

    if ( that.player.points >= 1e20 ){
        that.player.decayPointsGain = Math.floor(5^(Math.floor(Math.log10(that.player.points))/that.player.decayGain))
    }

    // LEGACY MILESTONES

    if ( that.player.legacyTimes >= 1 ){
        that.player.limitPoints += that.player.lpGain
    }

    if ( that.player.legacyTimes >= 2 ){
        for (let i = 0; i < 10; i++) {
            buyLimitUpgrades(i)
        }
    }

    // LEGACY RESOURCES

    that.player.coins += that.player.coinsPerSec;
    that.player.diamonds += that.player.diamondsPerSec;
    that.player.rubies += that.player.rubiesPerSec;

    // LEGACY REWARDS

    if (that.player.coinsTier >=2){
        that.player.coinsPerSec += 0.1
    }
}