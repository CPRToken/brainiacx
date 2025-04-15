    //client/index.js
    require('dotenv').config();
    const { twitterClient } = require("./twitterClient.js");
    const cron = require('node-cron');
    const fs = require('fs');
    const path = require('path');

    // Load videos from /client/videos folder
    function fetchLocalVideo() {
        const videoFolder = path.join(__dirname, 'videos');
        const videoFiles = fs.readdirSync(videoFolder).filter(file => file.endsWith('.mp4'));

        if (videoFiles.length === 0) {
            throw new Error("No MP4 videos found in videos folder.");
        }


    }


    const hardcodedTweets = [
        { text: "BrainiacMedia.ai helps you create unique content in seconds using AI. How do you think this could change your daily productivity? #AIContent #Productivity", video: "content.mp4" },
        { text: "BrainiacMedia.ai te ayuda a crear contenido único en segundos usando IA. ¿Cómo crees que esto podría cambiar tu productividad diaria? #ContenidoAI #Productividad", video: "contenido.mp4" },
        { text: "BrainiacMedia.ai generates original AI images instantly. Do you think this is better than using stock photo sites? #AIGeneratedImages #MarketingTools", video: "images.mp4" },
        { text: "BrainiacMedia.ai genera imágenes originales con IA al instante. ¿Crees que esto es mejor que usar sitios de fotos de stock? #ImágenesGeneradasPorIA #HerramientasDeMarketing", video: "imagenes.mp4" },
        { text: "Write song lyrics in seconds with BrainiacMedia.ai. Whether it's rap, pop, or ballads — our AI turns your ideas into full verses fast. #LyricWriting #AIMusic", video: "lyricwriter.mp4" },
        {text: "Escribe letras de canciones en segundos con BrainiacMedia.ai. Ya sea rap, pop o baladas, nuestra IA convierte tus ideas en versos completos rápidamente. #EscrituraDeLetras #MúsicaIA", video: "letrista.mp4"},
        {text: "Translate anything into 17 languages in seconds. BrainiacMedia.ai’s AI translator is perfect for websites, captions, or messages. No more Google Translate. #AITranslator #Multilingual", video: "translator.mp4"},
        { text: "Traduce cualquier cosa a 17 idiomas en segundos. El traductor de IA de BrainiacMedia.ai es perfecto para sitios web, subtítulos o mensajes. No más Google Translate. #TraductorAI #Multilingüe", video: "traductor.mp4" },
        {text: "Write SEO articles that pass Copyscape every time — instantly. BrainiacMedia.ai’s AI writer creates unique, keyword-rich content that passes copyscape and ranks in google. Try it free today. #SEO #AIContent #Copyscape", video: "SEO.mp4"},
        {text: "Escribe artículos SEO que pasen Copyscape cada vez — al instante. El escritor de IA de BrainiacMedia.ai crea contenido único y rico en palabras clave que pasa Copyscape y se posiciona en Google. Pruébalo gratis hoy. #SEO #ContenidoAI #Copyscape", video: "SEOSpan.mp4"},
        {text: "Stuck on homework? BrainiacMedia.ai solves it — and shows the working out. From math to essays, our AI does the heavy lifting so you don’t have to. #AI #HomeworkHelp #AIHomework", video: "homework.mp4"},
        { text: "¿Atascado en la tarea? BrainiacMedia.ai la resuelve y muestra el proceso. Desde matemáticas hasta ensayos, nuestra IA hace el trabajo pesado para que tú no tengas que hacerlo. #IA #AyudaConTareas #IATareas", video: "tareas.mp4" },






    ];


    let currentIndex = 0;

    function getNextTweet() {
        const tweet = hardcodedTweets[currentIndex];
        currentIndex = (currentIndex + 1) % hardcodedTweets.length;
        return tweet;
    }

    // Tweet function
    const tweet = async () => {
        try {
            const { text, video } = getNextTweet();

            const videoPath = path.join(__dirname, 'videos', video || 'default.mp4');

            const mediaId = await twitterClient.v1.uploadMedia(videoPath, {
                mimeType: 'video/mp4',
                longVideo: true
            });


            await twitterClient.v2.tweet({
                text,
                media: { media_ids: [mediaId] }
            });

            console.log(`✅ Tweeted: "${text}" with video: ${video}`);

        } catch (e) {
            console.error("❌ Error posting tweet:", e);
        }
    };

    // Run every hour
    cron.schedule('0 * * * *', tweet);



    console.log("Started scheduler to tweet every hour.");