import { sequelize } from './database';
import { Content } from './models/Content';

const seedDatabase = async () => {
    const count = await Content.count();
    
    if (count === 0) {
        console.log('🌱 [Database]: Insertion de la base de connaissances complète...');
        
        await Content.bulkCreate([
            // --- ANOMALY FAQ ---
            { category: 'anomaly', order: 1, title: "What is an anomaly?", body: "XM Anomalies are large, competitive cross faction events run by Niantic. For a detailed explanation, please have a look at <a href=\"https://fevgames.net/ingress/ingress-guide/concepts/anomaly/\">the Fev-Games wiki</a>." },
            { category: 'anomaly', order: 2, title: "Why is there an Anomaly in Geneva?", body: "Following Niantic's selection of Geneva as a host city for the Q2 2026 Anomaly series... Geneva offers the perfect backdrop for an unforgettable operation." },
            { category: 'anomaly', order: 3, title: "What type of gameplay does the anomaly in Geneva have?", body: "While we await the final operational directives from NIA researchers, we anticipate the full ruleset for the Q2 series to be declassified by early April." },
            { category: 'anomaly', order: 4, title: "Why is there no Niantic registration?", body: "Niantic has streamlined the anomaly experience! Earning your event badge is now easier than ever: simply join us on the ground in Geneva." },

            // --- GENERAL FAQ ---
            { category: 'general', order: 1, title: "Will there be a Mission Day on Sunday?", body: "Mostly yes! Niantic usually does allow a Mission Day after an Anomaly. We are still in the early stages of planning that." },
            { category: 'general', order: 2, title: "Will the NL-1331 van be present in Geneva?", body: "We will request the NL-1331 van to be sent to Geneva in-game. However, the final decision rests with Niantic." },
            { category: 'general', order: 3, title: "Will there be lots of swag?", body: "Absolutely! You can buy all the swag you need from our swag shop when it's open. Pick up is in Geneva." },
            { category: 'general', order: 4, title: "I have specific mobility needs. Can I still participate?", body: "You can absolutely still participate! Let us know when you sign up. For specific questions: <a href=\"mailto:genfwillbeblue@gmail.com\">genfwillbeblue@gmail.com</a>." },
            { category: 'general', order: 5, title: "Can I bring my kids?", body: "Of course! If they want to participate they can either sign up themselves or you can inform your Team Lead." },

            // --- TRAVEL (Coming to Geneva) ---
            { category: 'travel', order: 1, icon: '✈️', title: 'By airplane', body: "<p>The nearest airport is <a href=\"https://www.gva.ch/fr/\">Genève Cointrin</a>. International hub, 7 min from city center by train.</p>" },
            { category: 'travel', order: 2, icon: '🚆', title: 'By train', body: "<p>Direct services to <strong>Genève Cornavin</strong> from Zurich, Lausanne, Paris (TGV Lyria). Use the <a href=\"https://www.sbb.ch/\">SBB app</a>.</p>" },
            { category: 'travel', order: 3, icon: '🚌', title: 'By coach', body: "<p>Served by <a href=\"https://www.flixbus.com/\">FlixBus</a> and <a href=\"https://www.blablacar.co.uk/bus\">BlaBlaCar Bus</a> at <strong>Genève Gare Routière</strong>.</p>" },
            { category: 'travel', order: 4, icon: '🚗', title: 'By car', body: "<p>Motorways require a <strong>vignette</strong>. Parking is limited; use <a href=\"https://www.parkopedia.fr/\">P+R</a> facilities.</p>" },
            { category: 'travel', order: 5, icon: '🏨', title: 'Where to stay', body: "<p>Hostels from €50, hotels from €130. <strong>Tip:</strong> Stay in Geneva for a free transport pass!</p>" }
        ]);
        
        console.log('✅ [Database]: Toutes les données ont été injectées avec succès !');
    }
};

export const connectDb = async () => {
    try {
        await sequelize.authenticate();
        console.log('🔵 [Database]: Connection established.');
        await sequelize.sync({ alter: true });
        await seedDatabase();
    } catch (error) {
        console.error('❌ [Database]: Connection failed:', error);
    }
};