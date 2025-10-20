const starkData=[{
  "house": "Stark",
  "storyline": [
    {
      "decisionStep": 1,
      "questions": [
        {
          "id": "1.1",
          "question": "Winter is harsh, and food supplies are low. What do you do?",
          "options": [
            { "text": "Ration food equally among all.", "nextQuestion": "2.1", "effects": { "honor": 1, "stability": 1, "wealth": -1 } },
            { "text": "Feed warriors first to protect the realm.", "nextQuestion": "2.3", "effects": { "honor": -1, "power": 1 } },
            { "text": "Raid nearby lands for grain.", "nextQuestion": "2.2", "effects": { "honor": -1, "wealth": 1, "stability": -1 } }
          ]
        },
        {
          "id": "1.2",
          "question": "A messenger warns that wildlings gather beyond the Wall. What’s your move?",
          "options": [
            { "text": "Send a peaceful envoy to talk.", "nextQuestion": "2.2", "effects": { "diplomacy": 1, "stability": 1 } },
            { "text": "Prepare for war immediately.", "nextQuestion": "2.3", "effects": { "power": 1, "honor": -1 } },
            { "text": "Ignore them; it’s just rumors.", "nextQuestion": "2.1", "effects": { "stability": -1 } }
          ]
        },
        {
          "id": "1.3",
          "question": "Lord Umber refuses your command. How do you respond?",
          "options": [
            { "text": "Execute him publicly.", "nextQuestion": "2.3", "effects": { "honor": -1, "loyalty": -1 } },
            { "text": "Negotiate peace through diplomacy.", "nextQuestion": "2.1", "effects": { "diplomacy": 1, "stability": 1 } },
            { "text": "Ignore him; he’ll learn his place.", "nextQuestion": "2.2", "effects": { "honor": 1, "stability": -1 } }
          ]
        }
      ]
    },
    {
      "decisionStep": 2,
      "questions": [
        {
          "id": "2.1",
          "question": "King’s Landing requests troops. Your response?",
          "options": [
            { "text": "Send soldiers to aid them.", "nextQuestion": "3.1", "effects": { "honor": 1, "power": -1 } },
            { "text": "Refuse politely.", "nextQuestion": "3.3", "effects": { "diplomacy": 1, "stability": 1 } },
            { "text": "Mock the crown openly.", "nextQuestion": "3.2", "effects": { "honor": -1, "power": 1 } }
          ]
        },
        {
          "id": "2.2",
          "question": "A White Walker sighting is reported near the Wall.",
          "options": [
            { "text": "Lead the investigation yourself.", "nextQuestion": "3.2", "effects": { "honor": 1, "stability": -1 } },
            { "text": "Send Jon Snow to handle it.", "nextQuestion": "3.3", "effects": { "loyalty": 1, "power": 1 } },
            { "text": "Dismiss it as fearmongering.", "nextQuestion": "3.1", "effects": { "stability": 1 } }
          ]
        },
        {
          "id": "2.3",
          "question": "A Lannister envoy arrives in the North.",
          "options": [
            { "text": "Host them with courtesy.", "nextQuestion": "3.3", "effects": { "diplomacy": 1, "honor": 1 } },
            { "text": "Detain them for questioning.", "nextQuestion": "3.2", "effects": { "honor": -1, "power": 1 } },
            { "text": "Ignore their presence.", "nextQuestion": "3.1", "effects": { "stability": -1 } }
          ]
        }
      ]
    },
    {
      "decisionStep": 3,
      "questions": [
        {
          "id": "3.1",
          "question": "Famine spreads across the North.",
          "options": [
            { "text": "Distribute food equally.", "nextQuestion": "4.2", "effects": { "honor": 1, "loyalty": 1, "wealth": -1 } },
            { "text": "Favor allies first.", "nextQuestion": "4.3", "effects": { "loyalty": 1, "honor": -1 } },
            { "text": "Sell grain at high prices.", "nextQuestion": "4.1", "effects": { "honor": -1, "wealth": 1 } }
          ]
        },
        {
          "id": "3.2",
          "question": "Robb Stark is wounded in battle.",
          "options": [
            { "text": "Ride to his aid.", "nextQuestion": "4.1", "effects": { "honor": 1, "stability": -1 } },
            { "text": "Send a healer.", "nextQuestion": "4.2", "effects": { "honor": 1, "stability": 1 } },
            { "text": "Stay and defend Winterfell.", "nextQuestion": "4.3", "effects": { "honor": -1, "stability": 1 } }
          ]
        },
        {
          "id": "3.3",
          "question": "Rumors spread of rebellion among bannermen.",
          "options": [
            { "text": "Investigate quietly.", "nextQuestion": "4.2", "effects": { "stability": 1, "betrayal": -1 } },
            { "text": "Punish suspects publicly.", "nextQuestion": "4.3", "effects": { "honor": -1, "stability": -1 } },
            { "text": "Host a feast to ease tension.", "nextQuestion": "4.1", "effects": { "diplomacy": 1 } }
          ]
        }
      ]
    },
    {
      "decisionStep": 4,
      "questions": [
        {
          "id": "4.1",
          "question": "The Night’s Watch seeks supplies.",
          "options": [
            { "text": "Send aid immediately.", "nextQuestion": "5.1", "effects": { "honor": 1, "stability": 1 } },
            { "text": "Refuse; focus on your people.", "nextQuestion": "5.3", "effects": { "honor": -1, "wealth": 1 } },
            { "text": "Send minimal support.", "nextQuestion": "5.2", "effects": { "stability": 1 } }
          ]
        },
        {
          "id": "4.2",
          "question": "Arya returns from training. How do you treat her?",
          "options": [
            { "text": "Welcome her proudly.", "nextQuestion": "5.2", "effects": { "loyalty": 1, "honor": 1 } },
            { "text": "Question her loyalties.", "nextQuestion": "5.1", "effects": { "betrayal": -1, "stability": -1 } },
            { "text": "Send her south as a spy.", "nextQuestion": "5.3", "effects": { "power": 1, "loyalty": -1 } }
          ]
        },
        {
          "id": "4.3",
          "question": "A Bolton messenger arrives with gifts.",
          "options": [
            { "text": "Accept the gifts.", "nextQuestion": "5.1", "effects": { "wealth": 1, "betrayal": 1 } },
            { "text": "Refuse politely.", "nextQuestion": "5.3", "effects": { "honor": 1 } },
            { "text": "Detain the messenger.", "nextQuestion": "5.2", "effects": { "power": 1, "honor": -1 } }
          ]
        }
      ]
    },
    {
      "decisionStep": 5,
      "questions": [
        {
          "id": "5.1",
          "question": "An assassin infiltrates Winterfell.",
          "options": [
            { "text": "Kill him immediately.", "nextQuestion": "6.2", "effects": { "power": 1, "stability": 1 } },
            { "text": "Interrogate him first.", "nextQuestion": "6.1", "effects": { "honor": 1, "betrayal": -1 } },
            { "text": "Let him escape to follow him.", "nextQuestion": "6.3", "effects": { "stability": -1 } }
          ]
        },
        {
          "id": "5.2",
          "question": "A raven from the Vale offers alliance.",
          "options": [
            { "text": "Accept eagerly.", "nextQuestion": "6.1", "effects": { "diplomacy": 1, "power": 1 } },
            { "text": "Demand proof of loyalty.", "nextQuestion": "6.3", "effects": { "honor": 1 } },
            { "text": "Decline politely.", "nextQuestion": "6.2", "effects": { "stability": 1 } }
          ]
        },
        {
          "id": "5.3",
          "question": "Your maester warns of betrayal within the castle.",
          "options": [
            { "text": "Investigate quietly.", "nextQuestion": "6.3", "effects": { "betrayal": -1, "stability": 1 } },
            { "text": "Ignore him.", "nextQuestion": "6.1", "effects": { "stability": -1 } },
            { "text": "Purge suspicious servants.", "nextQuestion": "6.2", "effects": { "honor": -1 } }
          ]
        }
      ]
    },
    {
      "decisionStep": 6,
      "questions": [
        {
          "id": "6.1",
          "question": "Winterfell’s walls are weakening.",
          "options": [
            { "text": "Repair immediately.", "nextQuestion": "7.2", "effects": { "stability": 1, "wealth": -1 } },
            { "text": "Focus on offense instead.", "nextQuestion": "7.3", "effects": { "power": 1, "stability": -1 } },
            { "text": "Do nothing; trust the old stones.", "nextQuestion": "7.1", "effects": { "honor": -1 } }
          ]
        },
        {
          "id": "6.2",
          "question": "Jon Snow returns with news of the Night King.",
          "options": [
            { "text": "Unite the houses immediately.", "nextQuestion": "7.1", "effects": { "diplomacy": 1, "stability": 1 } },
            { "text": "Prepare your own army.", "nextQuestion": "7.2", "effects": { "power": 1 } },
            { "text": "Doubt his words.", "nextQuestion": "7.3", "effects": { "honor": -1, "stability": -1 } }
          ]
        },
        {
          "id": "6.3",
          "question": "Your treasury is nearly empty.",
          "options": [
            { "text": "Tax your people more.", "nextQuestion": "7.2", "effects": { "wealth": 1, "loyalty": -1 } },
            { "text": "Borrow from the Iron Bank.", "nextQuestion": "7.3", "effects": { "wealth": 1, "honor": -1 } },
            { "text": "Sell land for gold.", "nextQuestion": "7.1", "effects": { "wealth": 1, "stability": -1 } }
          ]
        }
      ]
    },
    {
      "decisionStep": 7,
      "questions": [
        {
          "id": "7.1",
          "question": "A raven arrives: the White Walkers breach the Wall.",
          "options": [
            { "text": "Send your army north.", "nextQuestion": "8.2", "effects": { "honor": 1, "power": 1 } },
            { "text": "Fortify Winterfell.", "nextQuestion": "8.3", "effects": { "stability": 1 } },
            { "text": "Evacuate south.", "nextQuestion": "8.1", "effects": { "honor": -1, "stability": -1 } }
          ]
        },
        {
          "id": "7.2",
          "question": "A secret Lannister proposal for truce arrives.",
          "options": [
            { "text": "Accept and negotiate peace.", "nextQuestion": "8.3", "effects": { "diplomacy": 1, "honor": -1 } },
            { "text": "Reject and march south.", "nextQuestion": "8.2", "effects": { "honor": 1, "power": 1 } },
            { "text": "Ignore it.", "nextQuestion": "8.1", "effects": { "stability": 1 } }
          ]
        },
        {
          "id": "7.3",
          "question": "An epidemic spreads among your soldiers.",
          "options": [
            { "text": "Quarantine and pray.", "nextQuestion": "8.1", "effects": { "stability": -1 } },
            { "text": "Burn the infected.", "nextQuestion": "8.2", "effects": { "honor": -1, "stability": 1 } },
            { "text": "Call the maesters.", "nextQuestion": "8.3", "effects": { "stability": 1 } }
          ]
        }
      ]
    },
    {
      "decisionStep": 8,
      "questions": [
        {
          "id": "8.1",
          "question": "Winterfell is under siege.",
          "options": [
            { "text": "Hold the castle at all costs.", "nextQuestion": "9.2", "effects": { "honor": 1, "stability": 1 } },
            { "text": "Call for northern allies.", "nextQuestion": "9.1", "effects": { "loyalty": 1 } },
            { "text": "Abandon the castle.", "nextQuestion": "9.3", "effects": { "honor": -1, "stability": -1 } }
          ]
        },
        {
          "id": "8.2",
          "question": "A dragon sighting near the Wall shocks your men.",
          "options": [
            { "text": "Try to communicate.", "nextQuestion": "9.3", "effects": { "diplomacy": 1 } },
            { "text": "Attack immediately.", "nextQuestion": "9.2", "effects": { "honor": 1, "power": 1 } },
            { "text": "Retreat to Winterfell.", "nextQuestion": "9.1", "effects": { "stability": 1 } }
          ]
        },
        {
          "id": "8.3",
          "question": "A raven from Bran warns of betrayal within.",
          "options": [
            { "text": "Trust Bran and act fast.", "nextQuestion": "9.2", "effects": { "betrayal": -1, "honor": 1 } },
            { "text": "Ignore visions and stay course.", "nextQuestion": "9.3", "effects": { "stability": -1 } },
            { "text": "Investigate quietly.", "nextQuestion": "9.1", "effects": { "stability": 1 } }
          ]
        }
      ]
    },
    {
      "decisionStep": 9,
      "questions": [
        {
          "id": "9.1",
          "question": "Allies begin to falter.",
          "options": [
            { "text": "Rally them with speech.", "nextQuestion": "10.1", "effects": { "loyalty": 1, "honor": 1 } },
            { "text": "Threaten deserters.", "nextQuestion": "10.2", "effects": { "stability": 1, "honor": -1 } },
            { "text": "Replace them quietly.", "nextQuestion": "10.3", "effects": { "betrayal": -1 } }
          ]
        },
        {
          "id": "9.2",
          "question": "The enemy breaches the outer walls.",
          "options": [
            { "text": "Lead the charge personally.", "nextQuestion": "10.3", "effects": { "honor": 1, "power": 1 } },
            { "text": "Send trusted generals.", "nextQuestion": "10.2", "effects": { "stability": 1 } },
            { "text": "Prepare fallback positions.", "nextQuestion": "10.1", "effects": { "stability": 1, "honor": -1 } }
          ]
        },
        {
          "id": "9.3",
          "question": "A raven arrives from the South offering reinforcements.",
          "options": [
            { "text": "Accept without question.", "nextQuestion": "10.1", "effects": { "stability": 1 } },
            { "text": "Test their loyalty first.", "nextQuestion": "10.2", "effects": { "betrayal": -1, "honor": 1 } },
            { "text": "Reject and rely on your own.", "nextQuestion": "10.3", "effects": { "honor": 1, "power": 1 } }
          ]
        }
      ]
    },
    {
      "decisionStep": 10,
      "questions": [
        {
          "id": "10.1",
          "question": "The final battle begins. What’s your strategy?",
          "options": [
            { "text": "Hold the line with honor.", "nextQuestion": null, "effects": { "honor": 2, "stability": 1 } },
            { "text": "Flank the enemy with surprise.", "nextQuestion": null, "effects": { "power": 2, "stability": -1 } },
            { "text": "Retreat and save survivors.", "nextQuestion": null, "effects": { "honor": -2, "stability": 2 } }
          ]
        },
        {
          "id": "10.2",
          "question": "Your army begins to fall. What do you do?",
          "options": [
            { "text": "Fight till the end.", "nextQuestion": null, "effects": { "honor": 2, "loyalty": 1 } },
            { "text": "Negotiate surrender.", "nextQuestion": null, "effects": { "diplomacy": 2, "honor": -1 } },
            { "text": "Abandon the battlefield.", "nextQuestion": null, "effects": { "stability": -2, "honor": -2 } }
          ]
        },
        {
          "id": "10.3",
          "question": "A traitor reveals himself mid-battle.",
          "options": [
            { "text": "Execute him publicly.", "nextQuestion": null, "effects": { "honor": -1, "stability": 1 } },
            { "text": "Use him to lure enemies.", "nextQuestion": null, "effects": { "betrayal": 1, "power": 1 } },
            { "text": "Forgive him for morale.", "nextQuestion": null, "effects": { "honor": 1, "stability": 1 } }
          ]
        }
      ]
    }
  ]
}]


export default starkData;