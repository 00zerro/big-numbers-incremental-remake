player = {
    points: 10,
    costIncrease: 1.7,
    multIncrease: 1.05,

    limit: 1e16,
    autoReset: false,
    lpGain: 1,
    limitPoints: 0,
    limitBroken: false,

    basicUpgrades: [],
    limitUpgrades: [],
    lU6Effect: 1,

    textShowing: "Hover over an upgrade to see its cost and effect!",
    costShowing: 1,
    boughtShowing: "not bought",
    ticks: 100,

    // DECAY

    decayPoints: 1,
    decayPower: 0,
    decayGenerators: [],
    decayPointsGain: 0,
    decayGain: 240,

    // LEGACY

    legacyTimes: 0,
    legacyPoints: 0,
    legacyGain: 0,

    // LEGACY RESOURCES

    coins: 0,
    diamonds: 0,
    rubies: 0,

    coinsPerSec: 1,
    diamondsPerSec: 0,
    rubiesPerSec: 0,

    coinsNeeded: 300,
    diamondsNeeded: 9000,
    rubiesNeeded: 20000,

    coinsTier: 0,
    diamondsTier: 0,
    rubiesTier: 0,
}

firstBasicUpgrade = {
    cost: 10,
    amount: 0,
    bought: 0,
    mult: 1,
    auto: false,
}

player.basicUpgrades.push(firstBasicUpgrade);

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

firstLimitUpgrade = {
    cost: 1,
    bought: false,
    text: ""
}


player.limitUpgrades.push(firstLimitUpgrade);

for (let i = 1; i < 10; i++) {
    let LU = {
        cost: Math.ceil(Math.pow(i * 10, i/3)),
        bought: false,
        text: ""
    }

    player.limitUpgrades.push(LU)
    
}


// DECAY POWER

for (i = 0; i < 3; i++){
    generator = {
        cost: Math.pow(10, i),
        amount: 0,
        bought: 0,
        mult: 1

    }

    player.decayGenerators.push(generator)
}

if ( player.coinsTier >= 1 ){
    player.coinsPerSec *= 2
}