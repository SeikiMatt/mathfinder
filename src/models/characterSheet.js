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
            modifier: new ModelModifier()
        },
        player: new ModelString(),
        campaign: new ModelString(),
    },
    stats: {
        health: {
            current: new ModelInteger(),
            maximum: new ModelInteger(),
            resistance: new ModelInteger(),
            nonlethal: new ModelInteger()
        },
        speed: {
            base: new ModelInteger(),
            armored: new ModelInteger()
        },
        initiative: {
            DEX: new ModelReference("stats.scores.DEX"),
            misc: new ModelList({
                list: [new ModelString("this is an instance")],
                type: ModelString
            }),
        },
        armorclass: {
            general: {
                base: new ModelInteger(10),
                gear: new ModelReference("gear.acitem"),
                DEX: new ModelReference("stats.scores.DEX"),
                size: new ModelReference("bio.size.modifier"),
                natural: new ModelModifier(),
                deflection: new ModelModifier(),
                misc: new ModelList({
                    list: [],
                    type: {
                        name: ModelString,
                        modifier: ModelModifier
                    }
                })
            },
            touch: {
                base: new ModelInteger(10),
                DEX: new ModelReference("stats.scores.DEX"),
                size: new ModelReference("bio.size.modifier"),
                deflection: new ModelModifier(),
                misc: new ModelList({
                    list: [],
                    type: {
                        name: ModelString,
                        modifier: ModelModifier
                    }
                })
            },
            flatfooted: {
                base: new ModelInteger(10),
                gear: new ModelReference("gear.acitem"),
                size: new ModelReference("bio.size.modifier"),
                natural: new ModelModifier(),
                deflection: new ModelModifier(),
                misc: new ModelList({
                    list: [],
                    type: {
                        name: ModelString,
                        modifier: ModelModifier
                    }
                })
            }
        },
        throws: {
            fortitude: {
                base: new ModelInteger(),
                abilitymod: new ModelReference("stats.abilities.CON"),
                magicmod: new ModelModifier(),
                misc: new ModelList({
                    list: [],
                    type: {
                        name: ModelString,
                        modifier: ModelModifier
                    }
                }),
                temp: new ModelList({
                    list: [],
                    type: {
                        name: ModelString,
                        modifier: ModelModifier
                    }
                })
            },
            reflex: {
                base: new ModelInteger(),
                abilitymod: new ModelReference("stats.abilities.DEX"),
                magicmod: new ModelModifier(),
                misc: new ModelList({
                    list: [],
                    type: {
                        name: ModelString,
                        modifier: ModelModifier
                    }
                }),
                temp: new ModelList({
                    list: [],
                    type: {
                        name: ModelString,
                        modifier: ModelModifier
                    }
                })
            },
            will: {
                base: new ModelInteger(),
                abilitymod: new ModelReference("stats.abilities.WIS"),
                magicmod: new ModelModifier(),
                misc: new ModelList({
                    list: [],
                    type: {
                        name: ModelString,
                        modifier: ModelModifier
                    }
                }),
                temp: new ModelList({
                    list: [],
                    type: {
                        name: ModelString,
                        modifier: ModelModifier
                    }
                })
            }
        },
        BAB: new ModelModifier(),
        spellresistance: new ModelInteger(),
        combatmaneuver: {
            bonus: {
                BAB: new ModelReference("stats.bab"),
                STR: new ModelReference("stats.scores.STR"),
                size: new ModelReference("bio.size.modifier"),
                misc: new ModelList({
                    list: [],
                    type: {
                        name: ModelString,
                        modifier: ModelModifier
                    }
                })
            },
            defence: {
                base: new ModelInteger(10),
                BAB: new ModelReference("stats.bab"),
                STR: new ModelReference("stats.scores.STR"),
                DEX: new ModelReference("stats.scores.DEX"),
                size: new ModelReference("bio.size.modifier"),
                misc: new ModelList({
                    list: [],
                    type: {
                        name: ModelString,
                        modifier: ModelModifier
                    }
                })
            }
        },
        scores: {
            STR: {
                score: new ModelInteger(),
                adjustment: new ModelInteger(),
            },
            DEX: {
                score: new ModelInteger(),
                adjustment: new ModelInteger(),
            },
            CON: {
                score: new ModelInteger(),
                adjustment: new ModelInteger(),
            },
            INT: {
                score: new ModelInteger(),
                adjustment: new ModelInteger(),
            },
            WIS: {
                score: new ModelInteger(),
                adjustment: new ModelInteger(),
            },
            CHA: {
                score: new ModelInteger(),
                adjustment: new ModelInteger(),
            }
        }
    },
    gear: {
        weapon: new ModelList({
            list: [],
            type: {
                name: ModelString,
                attack: ModelString,
                damage: ModelString,
                crit: ModelString,
                type: ModelString,
                range: ModelString,
                ammo: ModelString,
            }
        }),
        acitem: new ModelList({
            list: [],
            type: {
                name: ModelString,
                properties: ModelString,
                type: ModelString,
                bonus: ModelInteger,
                penalty: ModelInteger,
                spellfailure: ModelString,
                weight: ModelString,
            }
        })
    },
    magic: {
        stats: new ModelList({
            list: [
                {
                    savedc: new ModelInteger(),
                    known: new ModelInteger(),
                    days: new ModelInteger(Infinity),
                    bonus: new ModelInteger(Infinity),
                },
                {
                    savedc: new ModelInteger(),
                    known: new ModelInteger(),
                    days: new ModelInteger(),
                    bonus: new ModelInteger(),
                },
                {
                    savedc: new ModelInteger(),
                    known: new ModelInteger(),
                    days: new ModelInteger(),
                    bonus: new ModelInteger(),
                },
                {
                    savedc: new ModelInteger(),
                    known: new ModelInteger(),
                    days: new ModelInteger(),
                    bonus: new ModelInteger(),
                },
                {
                    savedc: new ModelInteger(),
                    known: new ModelInteger(),
                    days: new ModelInteger(),
                    bonus: new ModelInteger(),
                },
                {
                    savedc: new ModelInteger(),
                    known: new ModelInteger(),
                    days: new ModelInteger(),
                    bonus: new ModelInteger(),
                },
                {
                    savedc: new ModelInteger(),
                    known: new ModelInteger(),
                    days: new ModelInteger(),
                    bonus: new ModelInteger(),
                },
                {
                    savedc: new ModelInteger(),
                    known: new ModelInteger(),
                    days: new ModelInteger(),
                    bonus: new ModelInteger(),
                },
                {
                    savedc: new ModelInteger(),
                    known: new ModelInteger(),
                    days: new ModelInteger(),
                    bonus: new ModelInteger(),
                },
                {
                    savedc: new ModelInteger(),
                    known: new ModelInteger(),
                    days: new ModelInteger(),
                    bonus: new ModelInteger(),
                },
            ],
            type: {
                savedc: ModelInteger,
                known: ModelInteger,
                days: ModelInteger,
                bonus: ModelInteger,
            },
            options: {readonly: true}
        }),
        slots: new ModelList({
            list: [
                new ModelInteger(),
                new ModelInteger(),
                new ModelInteger(),
                new ModelInteger(),
                new ModelInteger(),
                new ModelInteger(),
                new ModelInteger(),
                new ModelInteger(),
                new ModelInteger(),
                new ModelInteger(),
            ],
            type: ModelInteger
        }),
        spells: new ModelList({
            list: [
                new ModelList({
                    list: [],
                    type: ModelString,
                }),
                new ModelList({
                    list: [],
                    type: ModelString,
                }),
                new ModelList({
                    list: [],
                    type: ModelString,
                }),
                new ModelList({
                    list: [],
                    type: ModelString,
                }),
                new ModelList({
                    list: [],
                    type: ModelString,
                }),
                new ModelList({
                    list: [],
                    type: ModelString,
                }),
                new ModelList({
                    list: [],
                    type: ModelString,
                }),
                new ModelList({
                    list: [],
                    type: ModelString,
                }),
                new ModelList({
                    list: [],
                    type: ModelString,
                }),
                new ModelList({
                    list: [],
                    type: ModelString,
                }),
            ],
            type: [
                ModelList,
                {type: ModelString}
            ]
        })
    },
    abilities: {
        specialabilities: new ModelList({
            list: [],
            type: ModelString
        }),
        feats: new ModelList({
            list: [],
            type: ModelString
        }),
    },
    skills: new ModelList({
        list: [
            {
                check: new ModelBoolean(false),
                checkrequired: new ModelBoolean(false),
                name: new ModelString("Acrobatics"),
                sub: new ModelString(""),
                modifier: {
                    abilitymodifier: new ModelReference("stats.scores.DEX"),
                    ranks: new ModelInteger(0),
                    misc: new ModelList({
                        list: [{
                            name: new ModelString(),
                            modifier: new ModelModifier()
                        }],
                        type: {
                            name: ModelString,
                            modifier: ModelModifier
                        }
                    })
                },
            },
            {
                check: new ModelBoolean(false),
                checkrequired: new ModelBoolean(false),
                name: new ModelString("Appraise"),
                sub: new ModelString(""),
                modifier: {
                    abilitymodifier: new ModelReference("stats.scores.INT"),
                    ranks: new ModelInteger(0),
                    misc: new ModelList({
                        list: [],
                        type: {
                            name: ModelString,
                            modifier: ModelModifier
                        }
                    })
                },
            },
            {
                check: new ModelBoolean(false),
                checkrequired: new ModelBoolean(false),
                name: new ModelString("Bluff"),
                sub: new ModelString(""),
                modifier: {
                    abilitymodifier: new ModelReference("stats.scores.CHA"),
                    ranks: new ModelInteger(0),
                    misc: new ModelList({
                        list: [],
                        type: {
                            name: ModelString,
                            modifier: ModelModifier
                        }
                    })
                },
            },
            {
                check: new ModelBoolean(false),
                checkrequired: new ModelBoolean(false),
                name: new ModelString("Climb"),
                sub: new ModelString(""),
                modifier: {
                    abilitymodifier: new ModelReference("stats.scores.STR"),
                    ranks: new ModelInteger(0),
                    misc: new ModelList({
                        list: [],
                        type: {
                            name: ModelString,
                            modifier: ModelModifier
                        }
                    })
                },
            },
            {
                check: new ModelBoolean(false),
                checkrequired: new ModelBoolean(false),
                name: new ModelString(""),
                sub: new ModelString("Craft"),
                modifier: {
                    abilitymodifier: new ModelReference("stats.scores.INT"),
                    ranks: new ModelInteger(0),
                    misc: new ModelList({
                        list: [],
                        type: {
                            name: ModelString,
                            modifier: ModelModifier
                        }
                    })
                },
            },
            {
                check: new ModelBoolean(false),
                checkrequired: new ModelBoolean(false),
                name: new ModelString(""),
                sub: new ModelString("Craft"),
                modifier: {
                    abilitymodifier: new ModelReference("stats.scores.INT"),
                    ranks: new ModelInteger(0),
                    misc: new ModelList({
                        list: [],
                        type: {
                            name: ModelString,
                            modifier: ModelModifier
                        }
                    })
                },
            },
            {
                check: new ModelBoolean(false),
                checkrequired: new ModelBoolean(false),
                name: new ModelString(""),
                sub: new ModelString("Craft"),
                modifier: {
                    abilitymodifier: new ModelReference("stats.scores.INT"),
                    ranks: new ModelInteger(0),
                    misc: new ModelList({
                        list: [],
                        type: {
                            name: ModelString,
                            modifier: ModelModifier
                        }
                    })
                },
            },
            {
                check: new ModelBoolean(false),
                checkrequired: new ModelBoolean(false),
                name: new ModelString("Diplomacy"),
                sub: new ModelString(""),
                modifier: {
                    abilitymodifier: new ModelReference("stats.scores.CHA"),
                    ranks: new ModelInteger(0),
                    misc: new ModelList({
                        list: [],
                        type: {
                            name: ModelString,
                            modifier: ModelModifier
                        }
                    })
                },
            },
            {
                check: new ModelBoolean(false),
                checkrequired: new ModelBoolean(true),
                name: new ModelString("Disable Device"),
                sub: new ModelString(""),
                modifier: {
                    abilitymodifier: new ModelReference("stats.scores.STR"),
                    ranks: new ModelInteger(0),
                    misc: new ModelList({
                        list: [],
                        type: {
                            name: ModelString,
                            modifier: ModelModifier
                        }
                    })
                },
            },
            {
                check: new ModelBoolean(false),
                checkrequired: new ModelBoolean(false),
                name: new ModelString("Disguise"),
                sub: new ModelString(""),
                modifier: {
                    abilitymodifier: new ModelReference("stats.scores.CHA"),
                    ranks: new ModelInteger(0),
                    misc: new ModelList({
                        list: [],
                        type: {
                            name: ModelString,
                            modifier: ModelModifier
                        }
                    })
                },
            },
            {
                check: new ModelBoolean(false),
                checkrequired: new ModelBoolean(false),
                name: new ModelString("Escape Artist"),
                sub: new ModelString(""),
                modifier: {
                    abilitymodifier: new ModelReference("stats.scores.DEX"),
                    ranks: new ModelInteger(0),
                    misc: new ModelList({
                        list: [],
                        type: {
                            name: ModelString,
                            modifier: ModelModifier
                        }
                    })
                },
            },
            {
                check: new ModelBoolean(false),
                checkrequired: new ModelBoolean(false),
                name: new ModelString("Fly"),
                sub: new ModelString(""),
                modifier: {
                    abilitymodifier: new ModelReference("stats.scores.DEX"),
                    ranks: new ModelInteger(0),
                    misc: new ModelList({
                        list: [],
                        type: {
                            name: ModelString,
                            modifier: ModelModifier
                        }
                    })
                },
            },
            {
                check: new ModelBoolean(false),
                checkrequired: new ModelBoolean(true),
                name: new ModelString("Handle Animal"),
                sub: new ModelString(""),
                modifier: {
                    abilitymodifier: new ModelReference("stats.scores.CHA"),
                    ranks: new ModelInteger(0),
                    misc: new ModelList({
                        list: [],
                        type: {
                            name: ModelString,
                            modifier: ModelModifier
                        }
                    })
                },
            },
            {
                check: new ModelBoolean(false),
                checkrequired: new ModelBoolean(false),
                name: new ModelString("Heal"),
                sub: new ModelString(""),
                modifier: {
                    abilitymodifier: new ModelReference("stats.scores.WIS"),
                    ranks: new ModelInteger(0),
                    misc: new ModelList({
                        list: [],
                        type: {
                            name: ModelString,
                            modifier: ModelModifier
                        }
                    })
                },
            },
            {
                check: new ModelBoolean(false),
                checkrequired: new ModelBoolean(false),
                name: new ModelString("Intimidate"),
                sub: new ModelString(""),
                modifier: {
                    abilitymodifier: new ModelReference("stats.scores.CHA"),
                    ranks: new ModelInteger(0),
                    misc: new ModelList({
                        list: [],
                        type: {
                            name: ModelString,
                            modifier: ModelModifier
                        }
                    })
                },
            },
            {
                check: new ModelBoolean(false),
                checkrequired: new ModelBoolean(true),
                name: new ModelString("Arcana"),
                sub: new ModelString("Knowledge"),
                modifier: {
                    abilitymodifier: new ModelReference("stats.scores.INT"),
                    ranks: new ModelInteger(0),
                    misc: new ModelList({
                        list: [],
                        type: {
                            name: ModelString,
                            modifier: ModelModifier
                        }
                    })
                },
            },
            {
                check: new ModelBoolean(false),
                checkrequired: new ModelBoolean(true),
                name: new ModelString("Dungeoneering"),
                sub: new ModelString("Knowledge"),
                modifier: {
                    abilitymodifier: new ModelReference("stats.scores.INT"),
                    ranks: new ModelInteger(0),
                    misc: new ModelList({
                        list: [],
                        type: {
                            name: ModelString,
                            modifier: ModelModifier
                        }
                    })
                },
            },
            {
                check: new ModelBoolean(false),
                checkrequired: new ModelBoolean(true),
                name: new ModelString("Engineering"),
                sub: new ModelString("Knowledge"),
                modifier: {
                    abilitymodifier: new ModelReference("stats.scores.INT"),
                    ranks: new ModelInteger(0),
                    misc: new ModelList({
                        list: [],
                        type: {
                            name: ModelString,
                            modifier: ModelModifier
                        }
                    })
                },
            },
            {
                check: new ModelBoolean(false),
                checkrequired: new ModelBoolean(true),
                name: new ModelString("Geography"),
                sub: new ModelString("Knowledge"),
                modifier: {
                    abilitymodifier: new ModelReference("stats.scores.INT"),
                    ranks: new ModelInteger(0),
                    misc: new ModelList({
                        list: [],
                        type: {
                            name: ModelString,
                            modifier: ModelModifier
                        }
                    })
                },
            },
            {
                check: new ModelBoolean(false),
                checkrequired: new ModelBoolean(true),
                name: new ModelString("History"),
                sub: new ModelString("Knowledge"),
                modifier: {
                    abilitymodifier: new ModelReference("stats.scores.INT"),
                    ranks: new ModelInteger(0),
                    misc: new ModelList({
                        list: [],
                        type: {
                            name: ModelString,
                            modifier: ModelModifier
                        }
                    })
                },
            },
            {
                check: new ModelBoolean(false),
                checkrequired: new ModelBoolean(true),
                name: new ModelString("Local"),
                sub: new ModelString("Knowledge"),
                modifier: {
                    abilitymodifier: new ModelReference("stats.scores.INT"),
                    ranks: new ModelInteger(0),
                    misc: new ModelList({
                        list: [],
                        type: {
                            name: ModelString,
                            modifier: ModelModifier
                        }
                    })
                },
            },
            {
                check: new ModelBoolean(false),
                checkrequired: new ModelBoolean(true),
                name: new ModelString("Nature"),
                sub: new ModelString("Knowledge"),
                modifier: {
                    abilitymodifier: new ModelReference("stats.scores.INT"),
                    ranks: new ModelInteger(0),
                    misc: new ModelList({
                        list: [],
                        type: {
                            name: ModelString,
                            modifier: ModelModifier
                        }
                    })
                },
            },
            {
                check: new ModelBoolean(false),
                checkrequired: new ModelBoolean(true),
                name: new ModelString("Nobility"),
                sub: new ModelString("Knowledge"),
                modifier: {
                    abilitymodifier: new ModelReference("stats.scores.INT"),
                    ranks: new ModelInteger(0),
                    misc: new ModelList({
                        list: [],
                        type: {
                            name: ModelString,
                            modifier: ModelModifier
                        }
                    })
                },
            },
            {
                check: new ModelBoolean(false),
                checkrequired: new ModelBoolean(true),
                name: new ModelString("Planes"),
                sub: new ModelString("Knowledge"),
                modifier: {
                    abilitymodifier: new ModelReference("stats.scores.INT"),
                    ranks: new ModelInteger(0),
                    misc: new ModelList({
                        list: [],
                        type: {
                            name: ModelString,
                            modifier: ModelModifier
                        }
                    })
                },
            },
            {
                check: new ModelBoolean(false),
                checkrequired: new ModelBoolean(true),
                name: new ModelString("Religion"),
                sub: new ModelString("Knowledge"),
                modifier: {
                    abilitymodifier: new ModelReference("stats.scores.INT"),
                    ranks: new ModelInteger(0),
                    misc: new ModelList({
                        list: [],
                        type: {
                            name: ModelString,
                            modifier: ModelModifier
                        }
                    })
                },
            },
            {
                check: new ModelBoolean(false),
                checkrequired: new ModelBoolean(true),
                name: new ModelString("Linguistics"),
                sub: new ModelString(""),
                modifier: {
                    abilitymodifier: new ModelReference("stats.scores.INT"),
                    ranks: new ModelInteger(0),
                    misc: new ModelList({
                        list: [],
                        type: {
                            name: ModelString,
                            modifier: ModelModifier
                        }
                    })
                },
            },
            {
                check: new ModelBoolean(false),
                checkrequired: new ModelBoolean(false),
                name: new ModelString("Perception"),
                sub: new ModelString(""),
                modifier: {
                    abilitymodifier: new ModelReference("stats.scores.WIS"),
                    ranks: new ModelInteger(0),
                    misc: new ModelList({
                        list: [],
                        type: {
                            name: ModelString,
                            modifier: ModelModifier
                        }
                    })
                },
            },
            {
                check: new ModelBoolean(false),
                checkrequired: new ModelBoolean(false),
                name: new ModelString(""),
                sub: new ModelString("Perform"),
                modifier: {
                    abilitymodifier: new ModelReference("stats.scores.CHA"),
                    ranks: new ModelInteger(0),
                    misc: new ModelList({
                        list: [],
                        type: {
                            name: ModelString,
                            modifier: ModelModifier
                        }
                    })
                },
            },
            {
                check: new ModelBoolean(false),
                checkrequired: new ModelBoolean(false),
                name: new ModelString(""),
                sub: new ModelString("Perform"),
                modifier: {
                    abilitymodifier: new ModelReference("stats.scores.CHA"),
                    ranks: new ModelInteger(0),
                    misc: new ModelList({
                        list: [],
                        type: {
                            name: ModelString,
                            modifier: ModelModifier
                        }
                    })
                },
            },
            {
                check: new ModelBoolean(false),
                checkrequired: new ModelBoolean(true),
                name: new ModelString(""),
                sub: new ModelString("Profession"),
                modifier: {
                    abilitymodifier: new ModelReference("stats.scores.WIS"),
                    ranks: new ModelInteger(0),
                    misc: new ModelList({
                        list: [],
                        type: {
                            name: ModelString,
                            modifier: ModelModifier
                        }
                    })
                },
            },
            {
                check: new ModelBoolean(false),
                checkrequired: new ModelBoolean(true),
                name: new ModelString(""),
                sub: new ModelString("Profession"),
                modifier: {
                    abilitymodifier: new ModelReference("stats.scores.WIS"),
                    ranks: new ModelInteger(0),
                    misc: new ModelList({
                        list: [],
                        type: {
                            name: ModelString,
                            modifier: ModelModifier
                        }
                    })
                },
            },
            {
                check: new ModelBoolean(false),
                checkrequired: new ModelBoolean(false),
                name: new ModelString("Ride"),
                sub: new ModelString(""),
                modifier: {
                    abilitymodifier: new ModelReference("stats.scores.DEX"),
                    ranks: new ModelInteger(0),
                    misc: new ModelList({
                        list: [],
                        type: {
                            name: ModelString,
                            modifier: ModelModifier
                        }
                    })
                },
            },
            {
                check: new ModelBoolean(false),
                checkrequired: new ModelBoolean(false),
                name: new ModelString("Sense Motive"),
                sub: new ModelString(""),
                modifier: {
                    abilitymodifier: new ModelReference("stats.scores.WIS"),
                    ranks: new ModelInteger(0),
                    misc: new ModelList({
                        list: [],
                        type: {
                            name: ModelString,
                            modifier: ModelModifier
                        }
                    })
                },
            },
            {
                check: new ModelBoolean(false),
                checkrequired: new ModelBoolean(true),
                name: new ModelString("Sleigh of Hand"),
                sub: new ModelString(""),
                modifier: {
                    abilitymodifier: new ModelReference("stats.scores.DEX"),
                    ranks: new ModelInteger(0),
                    misc: new ModelList({
                        list: [],
                        type: {
                            name: ModelString,
                            modifier: ModelModifier
                        }
                    })
                },
            },
            {
                check: new ModelBoolean(false),
                checkrequired: new ModelBoolean(true),
                name: new ModelString("Spellcraft"),
                sub: new ModelString(""),
                modifier: {
                    abilitymodifier: new ModelReference("stats.scores.INT"),
                    ranks: new ModelInteger(0),
                    misc: new ModelList({
                        list: [],
                        type: {
                            name: ModelString,
                            modifier: ModelModifier
                        }
                    })
                },
            },
            {
                check: new ModelBoolean(false),
                checkrequired: new ModelBoolean(false),
                name: new ModelString("Stealth"),
                sub: new ModelString(""),
                modifier: {
                    abilitymodifier: new ModelReference("stats.scores.DEX"),
                    ranks: new ModelInteger(0),
                    misc: new ModelList({
                        list: [],
                        type: {
                            name: ModelString,
                            modifier: ModelModifier
                        }
                    })
                },
            },
            {
                check: new ModelBoolean(false),
                checkrequired: new ModelBoolean(false),
                name: new ModelString("Survival"),
                sub: new ModelString(""),
                modifier: {
                    abilitymodifier: new ModelReference("stats.scores.WIS"),
                    ranks: new ModelInteger(0),
                    misc: new ModelList({
                        list: [],
                        type: {
                            name: ModelString,
                            modifier: ModelModifier
                        }
                    })
                },
            },
            {
                check: new ModelBoolean(false),
                checkrequired: new ModelBoolean(false),
                name: new ModelString("Swim"),
                sub: new ModelString(""),
                modifier: {
                    abilitymodifier: new ModelReference("stats.scores.STR"),
                    ranks: new ModelInteger(0),
                    misc: new ModelList({
                        list: [],
                        type: {
                            name: ModelString,
                            modifier: ModelModifier
                        }
                    })
                },
            },
            {
                check: new ModelBoolean(false),
                checkrequired: new ModelBoolean(true),
                name: new ModelString("Use Magic Device"),
                sub: new ModelString(""),
                modifier: {
                    abilitymodifier: new ModelReference("stats.scores.CHA"),
                    ranks: new ModelInteger(0),
                    misc: new ModelList({
                        list: [],
                        type: {
                            name: ModelString,
                            modifier: ModelModifier
                        }
                    })
                },
            },
        ],
        type: {
            check: ModelBoolean,
            checkrequired: ModelBoolean,
            name: ModelString,
            sub: ModelString,
            modifier: {
                abilitymodifier: ModelReference,
                ranks: ModelInteger,
                misc: ModelList,
            }

        }
    }),
    inventory: {
        money: {
            copper: new ModelInteger(),
            silver: new ModelInteger(),
            gold: new ModelInteger(),
            platinum: new ModelInteger(),
        },
        items: new ModelList({
            list: [],
            type: {
                item: ModelString,
                amount: ModelInteger,
                weight: ModelString
            }
        })
    }
})