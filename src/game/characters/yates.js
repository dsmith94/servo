Game.yates = {

    name: 'Yates',
    location: 'start',
    hasMet: true,

    talk: {

        desc: `
        
        Yates peers blandly at you from under the damaged bulkhead.

        `,

        look: `

        "Hey, I'm kind of busy here," Yates says with mild annoyance.

        `,

        bye: [
            [`Well, keep working, we need to get off this rock`, `
            
            "Keep working," you say, "We need to get off this rock."

            "I know, I'm on it," says Yates. @end @set-name {Blobby}
            
            `],

            [`I wish you'd hurry up`, `
            
            "I wish you'd hurry up," you say.
            
            Yates only grumbles in response. $annoyed @end
            
            `]
        ]

    },

    annoyed: {

        desc: `
        
        Yates is apparently ignoring you.

        `,

        look: `

        "Hey, I'm kind of busy here," Yates says with mild annoyance.

        `,

    }
}