const modelCharacterSheet = new Model({
    bio: {
        name: new ModelString(),
        alignment: new ModelString(),
        level: new ModelString(),
        deity: new ModelString(),
        homeland: new ModelString(),
        race: new ModelString(),
        gender: new ModelString(),
        height: new ModelString(),
        weight: new ModelString(),
        hair: new ModelString(),
        eyes: new ModelString(),
        age: new ModelString(),
        size: {
            name: new ModelString(),
            modifier: new ModelModifier("-99")
        },
        player: new ModelString(),
        campaign: new ModelString(),
    },
    stats: {
        health: {
            current: new ModelInteger(),
            maximum: new ModelInteger(),
            resistance: new ModelInteger(),
            nonlethal: new ModelInteger(),
        },
        armorclass: {
            base: new ModelModifier(),
            items: new ModelModifier(),
            dex: new ModelModifier(),
            size: new ModelReference("bio.size.modifier"),
            natural: new ModelModifier(),
            deflection: new ModelModifier(),
            misc: new ModelInteger(),
        },
    },
    gear: {
        weapon: new ModelList(
            {
                list: [],
                type: {
                    name: new ModelString(),
                    bonus: new ModelString(),
                    damage: new ModelString(),
                    crit: new ModelString(),
                    type: new ModelString(),
                    range: new ModelString(),
                    ammo: new ModelString(),
                }
            }
        )
    }
})